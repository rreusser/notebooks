/**
 * LSAO computation execution
 *
 * Manages GPU buffers and executes LSAO compute passes with parent tile support
 */

import { packLSAOUniforms, getTargetOffsetInParent } from './lsao-pipeline.js';

/**
 * Compute LSAO for a tile using parent buffer for horizon initialization
 *
 * @param {Object} params
 * @param {GPUDevice} params.device - WebGPU device
 * @param {GPUComputePipeline} params.pipeline - LSAO compute pipeline
 * @param {GPUBindGroupLayout} params.bindGroupLayout - Bind group layout
 * @param {Float32Array} params.targetData - Target tile terrain data (514×514)
 * @param {Float32Array} params.parentData - Parent buffer data (768×768)
 * @param {number} params.tileSize - Target tile size (512)
 * @param {number} params.pixelSize - Target pixel size in meters
 * @param {'nw'|'ne'|'sw'|'se'} params.quadrant - Target quadrant in parent
 * @param {number} [params.workgroupSize=128] - Workgroup size
 * @param {Array<[number, number]>} [params.directions] - Sweep directions
 * @returns {Promise<Float32Array>} AO values [0,1] for each pixel
 */
export async function computeLSAO({
  device,
  pipeline,
  bindGroupLayout,
  targetData,
  parentData,
  tileSize,
  pixelSize,
  quadrant,
  workgroupSize = 128,
  directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
}) {
  const tileBuffer = 1;
  const parentSize = 768;

  // Calculate dimensions
  const bufferedSize = tileSize + 2 * tileBuffer;
  const outputSize = tileSize * tileSize;

  // Validate input sizes
  if (targetData.length !== bufferedSize * bufferedSize) {
    throw new Error(`Target data size mismatch: expected ${bufferedSize}×${bufferedSize}, got ${targetData.length}`);
  }
  if (parentData.length !== parentSize * parentSize) {
    throw new Error(`Parent data size mismatch: expected ${parentSize}×${parentSize}, got ${parentData.length}`);
  }

  // Create GPU buffers
  const targetBuffer = device.createBuffer({
    size: targetData.byteLength,
    label: 'Target terrain buffer',
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true
  });
  new Float32Array(targetBuffer.getMappedRange()).set(targetData);
  targetBuffer.unmap();

  const parentBuffer = device.createBuffer({
    size: parentData.byteLength,
    label: 'Parent terrain buffer',
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true
  });
  new Float32Array(parentBuffer.getMappedRange()).set(parentData);
  parentBuffer.unmap();

  const outputBuffer = device.createBuffer({
    size: outputSize * Float32Array.BYTES_PER_ELEMENT,
    label: 'AO output buffer',
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true
  });
  new Float32Array(outputBuffer.getMappedRange()).fill(0);
  outputBuffer.unmap();

  // Create uniform buffer (one set per direction with dynamic offset)
  const uniformSizePerDirection = 256;
  const uniformBuffer = device.createBuffer({
    size: uniformSizePerDirection * directions.length,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  // Pack uniforms for each direction
  const targetOffsetInParent = getTargetOffsetInParent(quadrant);
  const parentPixelSize = pixelSize * 2; // Parent is z-1, 2× coarser
  const normalization = 1.0 / directions.length;

  for (let i = 0; i < directions.length; i++) {
    const uniformData = packLSAOUniforms({
      tileSize: [tileSize, tileSize],
      step: directions[i],
      buffer: tileBuffer,
      pixelSize,
      normalization,
      targetOffsetInParent,
      parentPixelSize
    });

    device.queue.writeBuffer(
      uniformBuffer,
      i * uniformSizePerDirection,
      uniformData
    );
  }

  // Create bind group
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    label: 'LSAO bind group',
    entries: [
      {
        binding: 0,
        resource: {
          buffer: uniformBuffer,
          offset: 0,
          size: uniformSizePerDirection
        }
      },
      { binding: 1, resource: { buffer: targetBuffer } },
      { binding: 2, resource: { buffer: outputBuffer } },
      { binding: 3, resource: { buffer: parentBuffer } }
    ]
  });

  // Encode compute passes
  const encoder = device.createCommandEncoder({ label: 'LSAO encoder' });

  // Clear output buffer
  encoder.clearBuffer(outputBuffer);

  // Single compute pass with all directions
  const pass = encoder.beginComputePass({ label: 'LSAO compute pass' });
  pass.setPipeline(pipeline);

  // Dispatch all directions
  const numWorkgroups = Math.ceil(tileSize / workgroupSize);
  for (let i = 0; i < directions.length; i++) {
    pass.setBindGroup(0, bindGroup, [i * uniformSizePerDirection]);
    pass.dispatchWorkgroups(numWorkgroups);
  }

  pass.end();

  // Create staging buffer for readback
  const stagingBuffer = device.createBuffer({
    size: outputSize * Float32Array.BYTES_PER_ELEMENT,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    label: 'Staging buffer'
  });

  // Copy output to staging
  encoder.copyBufferToBuffer(
    outputBuffer,
    0,
    stagingBuffer,
    0,
    outputSize * Float32Array.BYTES_PER_ELEMENT
  );

  // Submit commands
  device.queue.submit([encoder.finish()]);

  // Read back results
  await stagingBuffer.mapAsync(GPUMapMode.READ);
  const result = new Float32Array(stagingBuffer.getMappedRange()).slice();
  stagingBuffer.unmap();

  // Cleanup
  targetBuffer.destroy();
  parentBuffer.destroy();
  outputBuffer.destroy();
  uniformBuffer.destroy();
  stagingBuffer.destroy();

  return result;
}
