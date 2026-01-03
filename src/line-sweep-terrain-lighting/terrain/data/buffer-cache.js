// LRU cache for WebGPU buffers
import { LRUCache } from 'lru-cache';

/**
 * LRU cache for WebGPU buffers
 *
 * Automatically destroys GPU buffers when they are evicted from the cache.
 * This prevents GPU memory leaks and manages limited GPU memory efficiently.
 */
export class BufferCache {
  /**
   * @param {GPUDevice} device - WebGPU device
   * @param {Object} options - Cache configuration
   * @param {number} options.maxBuffers - Maximum number of buffers to cache (default: 50)
   */
  constructor(device, options = {}) {
    this.device = device;
    this.cache = new LRUCache({
      max: options.maxBuffers || 50,
      dispose: (buffer, key) => {
        // Automatically destroy GPU buffer when evicted
        if (buffer && !buffer.destroyed) {
          buffer.destroy();
        }
      }
    });
  }

  /**
   * Get buffer from cache or create if not present
   *
   * @param {string} key - Cache key
   * @param {Function} creator - Function to create buffer if not cached: () => GPUBuffer
   * @returns {GPUBuffer}
   */
  getOrCreate(key, creator) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const buffer = creator();
    this.cache.set(key, buffer);
    return buffer;
  }

  /**
   * Check if buffer is in cache
   *
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Get buffer from cache
   *
   * @param {string} key - Cache key
   * @returns {GPUBuffer | undefined}
   */
  get(key) {
    return this.cache.get(key);
  }

  /**
   * Set buffer in cache
   *
   * @param {string} key - Cache key
   * @param {GPUBuffer} buffer - Buffer to cache
   */
  set(key, buffer) {
    this.cache.set(key, buffer);
  }

  /**
   * Remove buffer from cache and destroy it
   *
   * @param {string} key - Cache key
   */
  delete(key) {
    const buffer = this.cache.get(key);
    if (buffer && !buffer.destroyed) {
      buffer.destroy();
    }
    this.cache.delete(key);
  }

  /**
   * Clear all buffers and destroy them
   */
  destroy() {
    // Dispose will be called for each buffer
    this.cache.clear();
  }

  /**
   * Get cache statistics
   *
   * @returns {{size: number}} Cache stats
   */
  getStats() {
    return {
      size: this.cache.size
    };
  }
}
