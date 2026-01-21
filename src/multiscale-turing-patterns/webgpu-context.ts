/**
 * WebGPU context creation for Multiscale Turing Patterns
 *
 * Handles WebGPU adapter and device initialization with required features.
 */

import type { FFTPrecision } from './lib/webgpu-fft/fft.js';

export interface WebGPUContext {
  adapter: GPUAdapter;
  device: GPUDevice;
  precision: FFTPrecision;
}

/**
 * Create WebGPU context with adapter and device
 *
 * @returns {Promise<WebGPUContext>}
 */
export async function createWebGPUContext(): Promise<WebGPUContext> {
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

  // Build list of required features
  const requiredFeatures: GPUFeatureName[] = [];

  if (adapter.features.has('timestamp-query')) {
    requiredFeatures.push('timestamp-query' as GPUFeatureName);
  }

  // Request f16 support for reduced memory usage
  const hasF16 = adapter.features.has('shader-f16');
  if (hasF16) {
    requiredFeatures.push('shader-f16' as GPUFeatureName);
  } else {
    console.warn('shader-f16 not supported, using f32 buffers (higher memory usage)');
  }

  // Request device with features and higher buffer limits for large grids
  const device = await adapter.requestDevice({
    requiredFeatures,
    requiredLimits: {
      maxStorageBufferBindingSize: adapter.limits.maxStorageBufferBindingSize,
      maxBufferSize: adapter.limits.maxBufferSize
    }
  });

  // Set up error handling
  device.lost.then((info) => {
    console.error('WebGPU device lost:', info.message, info.reason);
  });

  device.addEventListener?.('uncapturederror', (event: any) => {
    console.error('WebGPU uncaptured error:', event.error.message);
  });

  const precision: FFTPrecision = hasF16 ? 'f16' : 'f32';
  console.log(`WebGPU using ${precision} precision for storage buffers`);

  return { adapter, device, precision };
}

/**
 * Check if WebGPU is available in current browser
 *
 * @returns {boolean} True if WebGPU is available
 */
export function isWebGPUAvailable() {
  return typeof navigator !== 'undefined' && navigator.gpu !== undefined;
}
