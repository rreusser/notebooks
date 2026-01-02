/**
 * WebGPU compute pipeline for LSAO with parent tile support
 */

import { LSAO_SHADER, createShaderModule } from './lsao-shaders.js';

/**
 * Create compute pipeline for LSAO
 *
 * Sets up the complete compute pipeline including:
 * - Shader module compilation
 * - Bind group layout (uniforms, target/parent buffers, output)
 * - Pipeline layout and compilation
 *
 * @param {GPUDevice} device - WebGPU device
 * @param {Object} options - Pipeline options
 * @param {number} options.tileSize - Target tile size in pixels (default: 512)
 * @param {number} options.tileBuffer - Buffer pixels on each edge (default: 1)
 * @param {number} options.parentSize - Parent buffer size (default: 768)
 * @param {number} options.workgroupSize - Workgroup size (default: 128)
 * @returns {{pipeline: GPUComputePipeline, bindGroupLayout: GPUBindGroupLayout}}
 */
export function createLSAOPipeline(device, options = {}) {
  const tileSize = options.tileSize || 512;
  const tileBuffer = options.tileBuffer || 1;
  const parentSize = options.parentSize || 768;
  const workgroupSize = options.workgroupSize || 128;

  // Create shader module
  const shaderModule = createShaderModule(device, LSAO_SHADER);

  // Create bind group layout
  // Binding 0: Uniform buffer (sweep params, offsets)
  // Binding 1: Read-only storage buffer (target terrain data 514×514)
  // Binding 2: Read-write storage buffer (output AO data 512×512)
  // Binding 3: Read-only storage buffer (parent terrain data 768×768)
  const bindGroupLayout = device.createBindGroupLayout({
    label: 'LSAO bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "uniform", hasDynamicOffset: true }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "read-only-storage" }
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "storage" }
      },
      {
        binding: 3,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "read-only-storage" }
      }
    ]
  });

  // Create pipeline layout
  const pipelineLayout = device.createPipelineLayout({
    label: 'LSAO pipeline layout',
    bindGroupLayouts: [bindGroupLayout]
  });

  // Create compute pipeline
  const pipeline = device.createComputePipeline({
    label: 'LSAO compute pipeline',
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: "main",
      constants: {
        tileSize,
        tileBuffer,
        parentSize,
        workgroupSize
      }
    }
  });

  return { pipeline, bindGroupLayout };
}

/**
 * Pack uniform data for a single sweep direction
 *
 * @param {Object} params
 * @param {[number, number]} params.tileSize - Tile dimensions [width, height]
 * @param {[number, number]} params.step - Sweep direction [dx, dy]
 * @param {number} params.buffer - Tile buffer size
 * @param {number} params.pixelSize - Target pixel size in meters
 * @param {number} params.normalization - Normalization factor (1/num_directions)
 * @param {[number, number]} params.targetOffsetInParent - Target tile offset in parent space
 * @param {number} params.parentPixelSize - Parent pixel size in meters
 * @returns {Uint8Array} Packed uniform data
 */
export function packLSAOUniforms({
  tileSize,
  step,
  buffer,
  pixelSize,
  normalization,
  targetOffsetInParent,
  parentPixelSize
}) {
  // Align to 256 bytes for dynamic offset
  const uniformSize = 256;
  const bytes = new Uint8Array(uniformSize);
  const i32 = new Int32Array(bytes.buffer);
  const u32 = new Uint32Array(bytes.buffer);
  const f32 = new Float32Array(bytes.buffer);

  // struct UniformStruct layout:
  u32[0] = tileSize[0];                    // tilesize.x
  u32[1] = tileSize[1];                    // tilesize.y
  i32[2] = step[0];                        // step.x
  i32[3] = step[1];                        // step.y
  u32[4] = buffer;                         // buffer
  f32[5] = pixelSize;                      // pixelSize
  f32[6] = normalization;                  // normalization
  i32[7] = targetOffsetInParent[0];        // targetOffsetInParent.x
  i32[8] = targetOffsetInParent[1];        // targetOffsetInParent.y
  f32[9] = parentPixelSize;                // parentPixelSize
  f32[10] = 0;                             // padding

  return bytes;
}

/**
 * Calculate target tile offset in parent buffer space based on quadrant
 *
 * The target tile (512×512 at z) occupies 256×256 in parent space (z-1).
 * Position depends on which quadrant the target is in within its parent.
 *
 * Analysis of assembly layout:
 * - 4 parent tiles assembled into 1024×1024
 * - Target is in one quadrant of parent-base (256×256 region at parent res)
 * - Extraction takes 768×768 from 1024×1024
 * - Target position in 768×768 depends on extraction offset and target quadrant
 *
 * @param {'nw'|'ne'|'sw'|'se'} quadrant - Target's quadrant within parent
 * @returns {[number, number]} Offset [x, y] in parent buffer space (768×768)
 */
export function getTargetOffsetInParent(quadrant) {
  // Grid layout and extraction logic (see parent-tile-assembly.js):
  //
  // NW quadrant: parent-base at (512, 512) in assembly, extraction (256, 256)
  //   → target in NW of parent-base: (512+0, 512+0) to (512+256, 512+256) in assembly
  //   → after extraction: (512-256, 512-256) to (768-256, 768-256) = (256, 256) to (512, 512)
  //
  // NE quadrant: parent-base at (0, 512) in assembly, extraction (0, 256)
  //   → target in NE of parent-base: (0+256, 512+0) to (0+512, 512+256) in assembly
  //   → after extraction: (256-0, 512-256) to (512-0, 768-256) = (256, 256) to (512, 512)
  //
  // SW quadrant: parent-base at (512, 0) in assembly, extraction (256, 0)
  //   → target in SW of parent-base: (512+0, 0+256) to (512+256, 0+512) in assembly
  //   → after extraction: (512-256, 256-0) to (768-256, 512-0) = (256, 256) to (512, 512)
  //
  // SE quadrant: parent-base at (0, 0) in assembly, extraction (0, 0)
  //   → target in SE of parent-base: (0+256, 0+256) to (0+512, 0+512) in assembly
  //   → after extraction: (256-0, 256-0) to (512-0, 512-0) = (256, 256) to (512, 512)

  // All quadrants result in target at (256, 256) to (512, 512) in the 768×768 buffer!
  // This is because the extraction is specifically designed to center the target.
  return [256, 256];
}
