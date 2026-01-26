/**
 * WebGPU context creation for Stable Fluids
 */

export async function createWebGPUContext() {
  if (!navigator.gpu) {
    throw new Error('WebGPU is not supported in this browser');
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error('Failed to get WebGPU adapter');
  }

  const info = await (adapter as any).requestAdapterInfo?.();
  if (info) {
    console.log('WebGPU Adapter:', info.vendor, info.architecture);
  }

  const device = await adapter.requestDevice({
    requiredFeatures: adapter.features.has('timestamp-query')
      ? ['timestamp-query' as GPUFeatureName]
      : []
  });

  device.lost.then((info) => {
    console.error('WebGPU device lost:', info.message, info.reason);
  });

  device.addEventListener?.('uncapturederror', (event: any) => {
    console.error('WebGPU uncaptured error:', event.error.message);
  });

  return { adapter, device };
}
