/**
 * WebGPU context creation for Kuramoto-Sivashinsky equation solver
 *
 * Handles WebGPU adapter and device initialization with required features.
 */

/**
 * Create WebGPU context with adapter and device
 *
 * @returns {Promise<{adapter: GPUAdapter, device: GPUDevice}>}
 */
export async function createWebGPUContext() {
  if (!navigator.gpu) {
    throw new Error('WebGPU is not supported in this browser');
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error('Failed to get WebGPU adapter');
  }

  // Log adapter info
  const info = await (adapter as any).requestAdapterInfo?.();
  if (info) {
    console.log('WebGPU Adapter:', info.vendor, info.architecture);
  }

  // Request device with optional timestamp queries for profiling
  const device = await adapter.requestDevice({
    requiredFeatures: adapter.features.has('timestamp-query')
      ? ['timestamp-query' as GPUFeatureName]
      : []
  });

  // Set up error handling
  device.lost.then((info) => {
    console.error('WebGPU device lost:', info.message, info.reason);
  });

  device.addEventListener?.('uncapturederror', (event: any) => {
    console.error('WebGPU uncaptured error:', event.error.message);
  });

  return { adapter, device };
}

/**
 * Check if WebGPU is available in current browser
 *
 * @returns {boolean} True if WebGPU is available
 */
export function isWebGPUAvailable() {
  return typeof navigator !== 'undefined' && navigator.gpu !== undefined;
}
