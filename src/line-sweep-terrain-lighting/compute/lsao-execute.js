/**
 * LSAO computation execution
 *
 * Manages GPU buffers and executes LSAO compute passes with parent tile support
 */

import { packLSAOUniforms } from './lsao-pipeline.js';

/**
 * Compute multi-level LSAO for a tile
 *
 * @param {Object} params
 * @param {GPUDevice} params.device - WebGPU device
 * @param {GPUComputePipeline} params.pipeline - LSAO compute pipeline
 * @param {GPUBindGroupLayout} params.bindGroupLayout - Bind group layout
 * @param {Float32Array} params.targetData - Target tile terrain data (514×514)
 * @param {Array<Float32Array>} params.parentLevels - Parent buffer data (one per level)
 * @param {Array<Object>} params.levelInfo - Metadata for each level
 * @param {number} params.tileSize - Target tile size (512)
 * @param {number} params.pixelSize - Target pixel size in meters
 * @param {number} [params.workgroupSize=128] - Workgroup size
 * @param {Array<[number, number]>} [params.directions] - Sweep directions
 * @returns {Promise<Float32Array>} AO values [0,1] for each pixel
 */
export async function computeLSAO({
  device,
  pipeline,
  bindGroupLayout,
  targetData,
  parentLevels,
  levelInfo,
  tileSize,
  pixelSize,
  workgroupSize = 128,
  directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
}) {
  const tileBuffer = 1;
  const numLevels = parentLevels.length;

  if (numLevels < 1 || numLevels > 4) {
    throw new Error(`numLevels must be 1-4, got ${numLevels}`);
  }

  // Calculate dimensions
  const bufferedSize = tileSize + 2 * tileBuffer;
  const outputSize = tileSize * tileSize;

  // Validate input sizes
  if (targetData.length !== bufferedSize * bufferedSize) {
    throw new Error(`Target data size mismatch: expected ${bufferedSize}×${bufferedSize}, got ${targetData.length}`);
  }

  for (let i = 0; i < numLevels; i++) {
    const expectedSize = levelInfo[i].bufferSize * levelInfo[i].bufferSize;
    if (parentLevels[i].length !== expectedSize) {
      throw new Error(`Parent level ${i} size mismatch: expected ${expectedSize}, got ${parentLevels[i].length}`);
    }
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

  // Create parent buffers for each level
  const parentBuffers = parentLevels.map((data, i) => {
    const buffer = device.createBuffer({
      size: data.byteLength,
      label: `Parent level ${i} buffer`,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true
    });
    new Float32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();
    return buffer;
  });

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
  const normalization = 1.0 / directions.length;

  for (let i = 0; i < directions.length; i++) {
    const uniformData = packLSAOUniforms({
      tileSize: [tileSize, tileSize],
      step: directions[i],
      buffer: tileBuffer,
      pixelSize,
      normalization,
      levels: levelInfo
    });

    device.queue.writeBuffer(
      uniformBuffer,
      i * uniformSizePerDirection,
      uniformData
    );
  }

  // Create bind group with all parent buffers
  const bindGroupEntries = [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
        offset: 0,
        size: uniformSizePerDirection
      }
    },
    { binding: 1, resource: { buffer: targetBuffer } },
    { binding: 2, resource: { buffer: outputBuffer } }
  ];

  // Add parent buffer bindings (3, 4, 5, 6)
  for (let i = 0; i < numLevels; i++) {
    bindGroupEntries.push({
      binding: 3 + i,
      resource: { buffer: parentBuffers[i] }
    });
  }

  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    label: 'Multi-level LSAO bind group',
    entries: bindGroupEntries
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
  parentBuffers.forEach(b => b.destroy());
  outputBuffer.destroy();
  uniformBuffer.destroy();
  stagingBuffer.destroy();

  return result;
}
