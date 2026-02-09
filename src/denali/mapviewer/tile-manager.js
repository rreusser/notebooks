import { buildElevationQuadtree } from './elevation-quadtree.js';

// Async tile loading, LRU cache, GPU texture management

const MAX_CACHE = 150;
const MAX_CONCURRENT = 8;

const decodeCanvas = new OffscreenCanvas(514, 514);
const decodeCtx = decodeCanvas.getContext('2d', { willReadFrequently: true });

function decodeTerrain(bitmap) {
  decodeCtx.drawImage(bitmap, 0, 0);
  const { data } = decodeCtx.getImageData(0, 0, 514, 514);
  const elevations = new Float32Array(514 * 514);
  let minElevation = Infinity;
  let maxElevation = -Infinity;
  for (let i = 0; i < 514 * 514; i++) {
    const j = i * 4;
    const elev = -10000 + (data[j] * 65536 + data[j + 1] * 256 + data[j + 2]) * 0.1;
    elevations[i] = elev;
    if (elev < minElevation) minElevation = elev;
    if (elev > maxElevation) maxElevation = elev;
  }
  return { elevations, minElevation, maxElevation };
}

export class TileManager {
  constructor(device, { tileUrl } = {}) {
    this.device = device;
    this.tileUrl = tileUrl || ((z, x, y) => `tiles/${z}/${x}/${y}.webp`);
    this.cache = new Map(); // key -> { texture, bindGroup, lastUsed }
    this.pending = new Map(); // key -> AbortController
    this.failed = new Set(); // keys that 404'd
    this.activeRequests = 0;
    this.requestQueue = [];
    this.bindGroupLayout = null; // set by main.js
    this.onTileResolved = null; // callback when a tile is loaded or 404s
    this.wantedKeys = new Set();
    this.bounds = null;
    this.aabbCache = new Map(); // key -> { minElevation, maxElevation } — persists across GPU eviction
  }

  getElevationBounds(z, x, y) {
    return this.aabbCache.get(this._key(z, x, y)) || null;
  }

  setBounds(bounds) {
    this.bounds = bounds;
  }

  setBindGroupLayout(layout) {
    this.bindGroupLayout = layout;
  }

  _key(z, x, y) {
    return `${z}/${x}/${y}`;
  }

  hasTile(z, x, y) {
    const key = this._key(z, x, y);
    this.wantedKeys.add(key);
    const entry = this.cache.get(key);
    if (entry) {
      entry.lastUsed = performance.now();
      return true;
    }
    return false;
  }

  // Tile is resolved: either loaded or known to not exist (404)
  isResolved(z, x, y) {
    const key = this._key(z, x, y);
    this.wantedKeys.add(key);
    return this.cache.has(key) || this.failed.has(key);
  }

  getTile(z, x, y) {
    const key = this._key(z, x, y);
    const entry = this.cache.get(key);
    if (entry) {
      entry.lastUsed = performance.now();
      return entry;
    }
    return null;
  }

  requestTile(z, x, y) {
    const key = this._key(z, x, y);
    this.wantedKeys.add(key);
    if (this.cache.has(key) || this.pending.has(key) || this.failed.has(key)) return;

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

  _processQueue() {
    while (this.activeRequests < MAX_CONCURRENT && this.requestQueue.length > 0) {
      const { z, x, y, key } = this.requestQueue.shift();
      if (this.cache.has(key) || this.pending.has(key) || this.failed.has(key)) continue;

      this.activeRequests++;
      const controller = new AbortController();
      this.pending.set(key, controller);
      const promise = this._loadTile(z, x, y, key, controller.signal);
      promise.finally(() => {
        this.pending.delete(key);
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
        if (this.onTileResolved) this.onTileResolved(z, x, y);
        return;
      }
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob, { colorSpaceConversion: 'none' });

      const { elevations, minElevation, maxElevation } = decodeTerrain(bitmap);
      bitmap.close();

      // Store AABB before abort check so even aborted tiles contribute bounds
      this.aabbCache.set(key, { minElevation, maxElevation });

      // If aborted while loading, discard
      if (signal.aborted) return;

      // Create r32float texture
      const texture = this.device.createTexture({
        size: [514, 514],
        format: 'r32float',
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      });

      // Upload with row padding to 256-byte alignment
      // 514 pixels * 4 bytes = 2056 bytes per row, padded to 2304 (= 256 * 9)
      const bytesPerRow = 2304;
      const paddedData = new Uint8Array(bytesPerRow * 514);
      const srcBytes = new Uint8Array(elevations.buffer);
      for (let row = 0; row < 514; row++) {
        paddedData.set(
          srcBytes.subarray(row * 514 * 4, (row + 1) * 514 * 4),
          row * bytesPerRow
        );
      }
      this.device.queue.writeTexture(
        { texture },
        paddedData,
        { bytesPerRow },
        [514, 514]
      );

      const bindGroup = this.device.createBindGroup({
        layout: this.bindGroupLayout,
        entries: [
          { binding: 0, resource: texture.createView() },
        ],
      });

      this.cache.set(key, {
        texture,
        bindGroup,
        elevations,
        quadtree: null,
        minElevation,
        maxElevation,
        lastUsed: performance.now(),
      });

      if (this.onTileResolved) this.onTileResolved(z, x, y);
    } catch (e) {
      if (e.name === 'AbortError') return;
      this.failed.add(key);
      if (this.onTileResolved) this.onTileResolved(z, x, y);
    }
  }

  ensureQuadtree(z, x, y) {
    const entry = this.cache.get(this._key(z, x, y));
    if (!entry) return null;
    if (!entry.quadtree) {
      entry.quadtree = buildElevationQuadtree(entry.elevations);
    }
    return entry;
  }

  stripQuadtrees() {
    for (const [key, entry] of this.cache) {
      if (!this.wantedKeys.has(key) && entry.quadtree) {
        entry.quadtree = null;
      }
    }
  }

  // Abort pending fetches for tiles not requested by the latest selectTiles
  cancelStale() {
    for (const [key, controller] of this.pending) {
      if (!this.wantedKeys.has(key)) {
        controller.abort();
      }
    }
  }

  evict() {
    while (this.cache.size > MAX_CACHE) {
      let oldestKey = null, oldestTime = Infinity;
      for (const [key, entry] of this.cache) {
        if (this.wantedKeys.has(key)) continue;
        if (entry.lastUsed < oldestTime) {
          oldestTime = entry.lastUsed;
          oldestKey = key;
        }
      }
      if (!oldestKey) break; // all remaining tiles are wanted
      this.cache.get(oldestKey).texture.destroy();
      this.cache.delete(oldestKey);
    }
  }

  // Clear stale requests at the start of a coverage recomputation
  beginFrame() {
    this.requestQueue = [];
    this.wantedKeys = new Set();
  }
}
