// Satellite imagery fetch manager with request deduplication, consumer tracking, and cancellation

const MAX_CONCURRENT = 8;

export class ImageryManager {
  constructor({ tileUrl } = {}) {
    this.tileUrl = tileUrl || ((z, x, y) => `sentinel_tiles/${z}/${x}/${y}.webp`);
    this.fetched = new Map();           // satKey -> ImageBitmap
    this.pending = new Map();           // satKey -> Promise
    this.abortControllers = new Map();  // satKey -> AbortController
    this.failed = new Set();            // satKeys that 404'd
    this.consumers = new Map();         // satKey -> Set<terrainKey>
    this.terrainToSat = new Map();      // terrainKey -> Set<satKey> (reverse map)
    this.activeRequests = 0;
    this.requestQueue = [];
    this.onTileLoaded = null;           // callback(sz, sx, sy)
    this.bounds = null;
  }

  setBounds(bounds) {
    this.bounds = bounds;
  }

  _key(z, x, y) {
    return `${z}/${x}/${y}`;
  }

  getBitmap(z, x, y) {
    return this.fetched.get(this._key(z, x, y)) || null;
  }

  isFailed(z, x, y) {
    return this.failed.has(this._key(z, x, y));
  }

  /**
   * Request a satellite tile and register a terrain tile as a consumer.
   * Deduplicates fetch requests. When the bitmap arrives, onTileLoaded fires
   * and the caller can look up consumers via getConsumers().
   */
  requestTile(z, x, y, terrainKey) {
    const key = this._key(z, x, y);

    // Track forward: satellite -> terrain consumers
    let consumerSet = this.consumers.get(key);
    if (!consumerSet) {
      consumerSet = new Set();
      this.consumers.set(key, consumerSet);
    }
    consumerSet.add(terrainKey);

    // Track reverse: terrain -> satellite tiles
    let satSet = this.terrainToSat.get(terrainKey);
    if (!satSet) {
      satSet = new Set();
      this.terrainToSat.set(terrainKey, satSet);
    }
    satSet.add(key);

    // Already fetched or failed — no new request needed
    if (this.fetched.has(key) || this.failed.has(key) || this.pending.has(key)) return;

    if (this.bounds && this._isOutOfBounds(z, x, y)) {
      this.failed.add(key);
      return;
    }

    this.requestQueue.push({ z, x, y, key });
    this._processQueue();
  }

  _isOutOfBounds(z, x, y) {
    const b = this.bounds;
    if (z < b.minZoom || z > b.maxZoom) return true;
    const s = 1 / (1 << z);
    const tileMinX = x * s;
    const tileMaxX = (x + 1) * s;
    const tileMinY = y * s;
    const tileMaxY = (y + 1) * s;
    if (tileMaxX < b.minX || tileMinX > b.maxX ||
        tileMaxY < b.minY || tileMinY > b.maxY) return true;
    return false;
  }

  getConsumers(z, x, y) {
    return this.consumers.get(this._key(z, x, y)) || null;
  }

  /**
   * Remove a terrain tile as a consumer of all its satellite tiles.
   * Cancels in-flight fetches and removes queued requests that have no remaining consumers.
   */
  removeConsumer(terrainKey) {
    const satKeys = this.terrainToSat.get(terrainKey);
    if (!satKeys) return;

    for (const satKey of satKeys) {
      const consumerSet = this.consumers.get(satKey);
      if (!consumerSet) continue;
      consumerSet.delete(terrainKey);

      if (consumerSet.size === 0) {
        this.consumers.delete(satKey);
        // Cancel in-flight fetch if no consumers remain
        const ac = this.abortControllers.get(satKey);
        if (ac) {
          ac.abort();
          this.abortControllers.delete(satKey);
        }
        // Release bitmap when no terrain tiles reference it
        const bitmap = this.fetched.get(satKey);
        if (bitmap) {
          bitmap.close();
          this.fetched.delete(satKey);
        }
      }
    }

    this.terrainToSat.delete(terrainKey);
  }

  /**
   * Clear the request queue (call at the start of each frame before new requests).
   */
  beginFrame() {
    this.requestQueue = [];
  }

  _processQueue() {
    while (this.activeRequests < MAX_CONCURRENT && this.requestQueue.length > 0) {
      const { z, x, y, key } = this.requestQueue.shift();
      if (this.fetched.has(key) || this.pending.has(key) || this.failed.has(key)) continue;

      // Skip if no consumers remain (cancelled while queued)
      const consumerSet = this.consumers.get(key);
      if (!consumerSet || consumerSet.size === 0) continue;

      this.activeRequests++;
      const ac = new AbortController();
      this.abortControllers.set(key, ac);
      const promise = this._loadTile(z, x, y, key, ac.signal);
      this.pending.set(key, promise);
      promise.finally(() => {
        this.pending.delete(key);
        this.abortControllers.delete(key);
        this.activeRequests--;
        this._processQueue();
      });
    }
  }

  async _loadTile(z, x, y, key, signal) {
    try {
      const url = this.tileUrl(z, x, y);
      const response = await fetch(url, { signal });
      if (!response.ok) {
        this.failed.add(key);
        return;
      }
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);
      this.fetched.set(key, bitmap);

      if (this.onTileLoaded) this.onTileLoaded(z, x, y);
    } catch (e) {
      if (e.name === 'AbortError') return; // cancelled, not a failure
      this.failed.add(key);
    }
  }
}
