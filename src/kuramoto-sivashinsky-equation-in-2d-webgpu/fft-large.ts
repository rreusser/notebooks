/**
 * Large FFT implementation using hierarchical/four-step algorithm
 *
 * For N > maxWorkgroupSize, decomposes N = R × C where C ≤ maxWorkgroupSize
 *
 * Four-step algorithm for 1D FFT of size N = R × C:
 * 1. View data as R sub-rows of C elements
 * 2. C-point FFT on each sub-row (uses small FFT, fits in workgroup)
 * 3. Twiddle multiply: element at sub-row r, position c *= W_N^(r*c)
 * 4. R-point FFT on each column (across the R sub-rows)
 *
 * For 2D FFT of M×N grid:
 * - Horizontal: Apply 1D FFT to each of M rows (using hierarchical if N > maxWorkgroupSize)
 * - Transpose
 * - Vertical: Apply 1D FFT to each of N rows (columns become rows)
 * - Transpose back
 */

import { generateFFTShader, generateTransposeShader } from './fft-generator.js';
import {
  generateSubRowFFTShader,
  generateSubRowTwiddleShader,
  generateSubRowColumnFFTShader,
  generateUnscrambleShader,
  generateScrambleShader
} from './fft-large-generator.js';

export interface LargeFFTPipelines {
  // For large N: sub-row FFT, twiddle, column FFT
  subRowFFT: GPUComputePipeline | null;
  twiddle: GPUComputePipeline | null;
  columnFFT: GPUComputePipeline | null;

  // Unscramble/scramble for reordering four-step output
  unscramble: GPUComputePipeline | null;
  scramble: GPUComputePipeline | null;

  // For small N or as fallback
  simpleFFT: GPUComputePipeline;

  // Transpose (always needed for 2D)
  transpose: GPUComputePipeline;

  bindGroupLayouts: {
    subRowFFT: GPUBindGroupLayout | null;
    twiddle: GPUBindGroupLayout | null;
    columnFFT: GPUBindGroupLayout | null;
    unscramble: GPUBindGroupLayout | null;
    scramble: GPUBindGroupLayout | null;
    simpleFFT: GPUBindGroupLayout;
    transpose: GPUBindGroupLayout;
  };

  // Decomposition parameters
  N: number;
  R: number;  // number of sub-rows per original row (N/C)
  C: number;  // sub-row size (small FFT size)
  isLarge: boolean;  // true if N > maxWorkgroupSize
}

/**
 * Factor N into R × C where C is the largest power of 2 ≤ maxSize
 */
function factorN(N: number, maxSize: number): { R: number; C: number } {
  // Find largest power of 2 ≤ maxSize and ≤ N
  let C = 1;
  while (C * 2 <= maxSize && C * 2 <= N) {
    C *= 2;
  }

  const R = N / C;
  if (!Number.isInteger(R) || (R & (R - 1)) !== 0) {
    throw new Error(`Cannot factor N=${N} with maxSize=${maxSize}: R=${R} is not a power of 2`);
  }

  return { R, C };
}

/**
 * Create pipelines for large FFT (N > maxWorkgroupSize)
 */
export function createLargeFFTPipelines(
  device: GPUDevice,
  N: number,
  maxWorkgroupSize: number = device.limits.maxComputeWorkgroupSizeX
): LargeFFTPipelines {
  const isLarge = N > maxWorkgroupSize;

  // Always create transpose pipeline and simple FFT for the smaller dimension
  const transposeCode = generateTransposeShader();
  const transposeModule = device.createShaderModule({
    label: 'Transpose',
    code: transposeCode
  });

  const transposeBindGroupLayout = device.createBindGroupLayout({
    label: 'Transpose bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  const transposePipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [transposeBindGroupLayout]
  });

  const transpose = device.createComputePipeline({
    label: 'Transpose pipeline',
    layout: transposePipelineLayout,
    compute: { module: transposeModule, entryPoint: 'transpose' }
  });

  if (!isLarge) {
    // Simple case: N ≤ maxWorkgroupSize
    const simpleFFTCode = generateFFTShader(N);
    const simpleFFTModule = device.createShaderModule({
      label: `Simple FFT N=${N}`,
      code: simpleFFTCode
    });

    const simpleFFTBindGroupLayout = device.createBindGroupLayout({
      label: 'Simple FFT bind group layout',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
      ]
    });

    const simpleFFTPipelineLayout = device.createPipelineLayout({
      bindGroupLayouts: [simpleFFTBindGroupLayout]
    });

    const simpleFFT = device.createComputePipeline({
      label: `Simple FFT pipeline N=${N}`,
      layout: simpleFFTPipelineLayout,
      compute: { module: simpleFFTModule, entryPoint: 'fft_horizontal' }
    });

    return {
      subRowFFT: null,
      twiddle: null,
      columnFFT: null,
      unscramble: null,
      scramble: null,
      simpleFFT,
      transpose,
      bindGroupLayouts: {
        subRowFFT: null,
        twiddle: null,
        columnFFT: null,
        unscramble: null,
        scramble: null,
        simpleFFT: simpleFFTBindGroupLayout,
        transpose: transposeBindGroupLayout
      },
      N,
      R: 1,
      C: N,
      isLarge: false
    };
  }

  // Large case: N > maxWorkgroupSize, need hierarchical FFT
  const { R, C } = factorN(N, maxWorkgroupSize);
  console.log(`Large FFT: N=${N} = ${R}×${C}, maxWorkgroup=${maxWorkgroupSize}`);

  // Generate shaders for hierarchical FFT
  const subRowFFTCode = generateSubRowFFTShader(C, R);
  const twiddleCode = generateSubRowTwiddleShader(N, R, C);
  const columnFFTCode = generateSubRowColumnFFTShader(R, C);
  const unscrambleCode = generateUnscrambleShader(N, R, C);
  const scrambleCode = generateScrambleShader(N, R, C);

  // Also create simple FFT for C-point transforms (used in 2D after transpose)
  const simpleFFTCode = generateFFTShader(C);

  // Create shader modules
  const subRowFFTModule = device.createShaderModule({
    label: `Sub-row FFT C=${C}`,
    code: subRowFFTCode
  });

  const twiddleModule = device.createShaderModule({
    label: `Twiddle N=${N}`,
    code: twiddleCode
  });

  const columnFFTModule = device.createShaderModule({
    label: `Column FFT R=${R}`,
    code: columnFFTCode
  });

  const unscrambleModule = device.createShaderModule({
    label: `Unscramble N=${N}`,
    code: unscrambleCode
  });

  const scrambleModule = device.createShaderModule({
    label: `Scramble N=${N}`,
    code: scrambleCode
  });

  const simpleFFTModule = device.createShaderModule({
    label: `Simple FFT C=${C}`,
    code: simpleFFTCode
  });

  // Bind group layouts
  const subRowFFTBindGroupLayout = device.createBindGroupLayout({
    label: 'Sub-row FFT bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  const twiddleBindGroupLayout = device.createBindGroupLayout({
    label: 'Twiddle bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  const columnFFTBindGroupLayout = device.createBindGroupLayout({
    label: 'Column FFT bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  const simpleFFTBindGroupLayout = device.createBindGroupLayout({
    label: 'Simple FFT bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  const unscrambleBindGroupLayout = device.createBindGroupLayout({
    label: 'Unscramble bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  const scrambleBindGroupLayout = device.createBindGroupLayout({
    label: 'Scramble bind group layout',
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }
    ]
  });

  // Pipeline layouts
  const subRowFFTPipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [subRowFFTBindGroupLayout]
  });

  const twiddlePipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [twiddleBindGroupLayout]
  });

  const columnFFTPipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [columnFFTBindGroupLayout]
  });

  const simpleFFTPipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [simpleFFTBindGroupLayout]
  });

  const unscramblePipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [unscrambleBindGroupLayout]
  });

  const scramblePipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [scrambleBindGroupLayout]
  });

  // Create pipelines
  const subRowFFT = device.createComputePipeline({
    label: `Sub-row FFT pipeline C=${C}`,
    layout: subRowFFTPipelineLayout,
    compute: { module: subRowFFTModule, entryPoint: 'sub_row_fft' }
  });

  const twiddle = device.createComputePipeline({
    label: `Twiddle pipeline N=${N}`,
    layout: twiddlePipelineLayout,
    compute: { module: twiddleModule, entryPoint: 'twiddle_multiply' }
  });

  const columnFFT = device.createComputePipeline({
    label: `Column FFT pipeline R=${R}`,
    layout: columnFFTPipelineLayout,
    compute: { module: columnFFTModule, entryPoint: 'column_fft' }
  });

  const simpleFFT = device.createComputePipeline({
    label: `Simple FFT pipeline C=${C}`,
    layout: simpleFFTPipelineLayout,
    compute: { module: simpleFFTModule, entryPoint: 'fft_horizontal' }
  });

  const unscramble = device.createComputePipeline({
    label: `Unscramble pipeline N=${N}`,
    layout: unscramblePipelineLayout,
    compute: { module: unscrambleModule, entryPoint: 'unscramble' }
  });

  const scramble = device.createComputePipeline({
    label: `Scramble pipeline N=${N}`,
    layout: scramblePipelineLayout,
    compute: { module: scrambleModule, entryPoint: 'scramble' }
  });

  return {
    subRowFFT,
    twiddle,
    columnFFT,
    unscramble,
    scramble,
    simpleFFT,
    transpose,
    bindGroupLayouts: {
      subRowFFT: subRowFFTBindGroupLayout,
      twiddle: twiddleBindGroupLayout,
      columnFFT: columnFFTBindGroupLayout,
      unscramble: unscrambleBindGroupLayout,
      scramble: scrambleBindGroupLayout,
      simpleFFT: simpleFFTBindGroupLayout,
      transpose: transposeBindGroupLayout
    },
    N,
    R,
    C,
    isLarge
  };
}

export interface LargeFFT2DParams {
  device: GPUDevice;
  pipelines: LargeFFTPipelines;
  input: GPUBuffer;
  output: GPUBuffer;
  temp: [GPUBuffer, GPUBuffer];  // Two temp buffers for ping-pong
  N: number;
  forward: boolean;
  splitNormalization: boolean;
}

/**
 * Execute 2D FFT using hierarchical algorithm
 *
 * For N > maxWorkgroupSize:
 * 1. Horizontal hierarchical 1D FFT on all N rows
 * 2. Transpose
 * 3. Horizontal hierarchical 1D FFT on all N rows (was columns)
 * 4. Transpose back
 *
 * For N ≤ maxWorkgroupSize:
 * 1. Simple horizontal FFT on all N rows
 * 2. Transpose
 * 3. Simple horizontal FFT on all N rows
 * 4. Transpose back
 */
export function executeLargeFFT2D(params: LargeFFT2DParams): void {
  const { device, pipelines, input, output, temp, N, forward, splitNormalization } = params;
  const { R, C, isLarge } = pipelines;

  // Create transpose params buffer
  const transposeParamsBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(transposeParamsBuffer, 0, new Uint32Array([N]));

  if (!isLarge) {
    // Simple path for N ≤ maxWorkgroupSize
    executeSimple2DFFT(device, pipelines, input, output, temp, N, forward, splitNormalization, transposeParamsBuffer);
    return;
  }

  // Hierarchical path for N > maxWorkgroupSize
  executeHierarchical2DFFT(device, pipelines, input, output, temp, N, R, C, forward, splitNormalization, transposeParamsBuffer);
}

function executeSimple2DFFT(
  device: GPUDevice,
  pipelines: LargeFFTPipelines,
  input: GPUBuffer,
  output: GPUBuffer,
  temp: [GPUBuffer, GPUBuffer],
  N: number,
  forward: boolean,
  splitNormalization: boolean,
  transposeParamsBuffer: GPUBuffer
): void {
  // Create FFT params
  const fftParamsBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(fftParamsBuffer, 0, new Uint32Array([
    N, N, forward ? 1 : 0, splitNormalization ? 1 : 0
  ]));

  const encoder = device.createCommandEncoder({ label: 'Simple 2D FFT' });

  // Pass 1: Horizontal FFT (input → temp[0])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.simpleFFT,
      entries: [
        { binding: 0, resource: { buffer: input } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: fftParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'Horizontal FFT' });
    pass.setPipeline(pipelines.simpleFFT);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(N, 1, 1);
    pass.end();
  }

  // Pass 2: Transpose (temp[0] → temp[1])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.transpose,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: temp[1] } },
        { binding: 2, resource: { buffer: transposeParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'Transpose 1' });
    pass.setPipeline(pipelines.transpose);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(N / 16), 1);
    pass.end();
  }

  // Pass 3: Vertical FFT (temp[1] → temp[0])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.simpleFFT,
      entries: [
        { binding: 0, resource: { buffer: temp[1] } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: fftParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'Vertical FFT' });
    pass.setPipeline(pipelines.simpleFFT);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(N, 1, 1);
    pass.end();
  }

  // Pass 4: Transpose back (temp[0] → output)
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.transpose,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: output } },
        { binding: 2, resource: { buffer: transposeParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'Transpose 2' });
    pass.setPipeline(pipelines.transpose);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(N / 16), 1);
    pass.end();
  }

  device.queue.submit([encoder.finish()]);
}

function executeHierarchical2DFFT(
  device: GPUDevice,
  pipelines: LargeFFTPipelines,
  input: GPUBuffer,
  output: GPUBuffer,
  temp: [GPUBuffer, GPUBuffer],
  N: number,
  R: number,
  C: number,
  forward: boolean,
  splitNormalization: boolean,
  transposeParamsBuffer: GPUBuffer
): void {
  // Four-step FFT produces output in scrambled order (frequency k at position (k%R)*C + k/R)
  // We need to unscramble after each 1D FFT pass to get natural frequency order

  // Create params buffers
  const subRowParamsBuffer = device.createBuffer({
    size: 32,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(subRowParamsBuffer, 0, new Uint32Array([
    C,           // C: sub-row size
    R,           // R: sub-rows per original row
    N,           // N: elements per original row
    N * R,       // num_sub_rows: total sub-rows
    forward ? 1 : 0,
    splitNormalization ? 1 : 0
  ]));

  const twiddleParamsBuffer = device.createBuffer({
    size: 32,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(twiddleParamsBuffer, 0, new Uint32Array([
    C,           // C
    R,           // R
    N,           // N
    N,           // num_original_rows
    forward ? 1 : 0
  ]));

  const columnParamsBuffer = device.createBuffer({
    size: 32,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(columnParamsBuffer, 0, new Uint32Array([
    C,           // C: stride
    R,           // R: FFT size
    N,           // N: elements per original row
    N,           // num_original_rows
    forward ? 1 : 0,
    splitNormalization ? 1 : 0
  ]));

  const unscrambleParamsBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(unscrambleParamsBuffer, 0, new Uint32Array([
    C,           // C
    R,           // R
    N,           // N
    N            // num_original_rows
  ]));

  const encoder = device.createCommandEncoder({ label: 'Hierarchical 2D FFT' });

  // ========== Horizontal FFT (all N rows) ==========
  // Four-step: Column FFT -> Twiddle -> Sub-row FFT -> Unscramble

  // Step H1: Column FFT (R-point) on input → temp[0]
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.columnFFT!,
      entries: [
        { binding: 0, resource: { buffer: input } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: columnParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'H Column FFT' });
    pass.setPipeline(pipelines.columnFFT!);
    pass.setBindGroup(0, bindGroup);
    if (R <= 8) {
      pass.dispatchWorkgroups(Math.ceil(N * C / 256), 1, 1);
    } else {
      pass.dispatchWorkgroups(N * C, 1, 1);
    }
    pass.end();
  }

  // Step H2: Twiddle multiply (temp[0] → temp[1])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.twiddle!,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: temp[1] } },
        { binding: 2, resource: { buffer: twiddleParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'H Twiddle' });
    pass.setPipeline(pipelines.twiddle!);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(C / 16), Math.ceil(N * R / 16), 1);
    pass.end();
  }

  // Step H3: Sub-row FFT (C-point) on temp[1] → temp[0]
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.subRowFFT!,
      entries: [
        { binding: 0, resource: { buffer: temp[1] } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: subRowParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'H Sub-row FFT' });
    pass.setPipeline(pipelines.subRowFFT!);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(N * R, 1, 1);
    pass.end();
  }

  // Step H4: Unscramble (temp[0] → temp[1])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.unscramble!,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: temp[1] } },
        { binding: 2, resource: { buffer: unscrambleParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'H Unscramble' });
    pass.setPipeline(pipelines.unscramble!);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 256), N, 1);
    pass.end();
  }

  // ========== Transpose (temp[1] → temp[0]) ==========
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.transpose,
      entries: [
        { binding: 0, resource: { buffer: temp[1] } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: transposeParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'Transpose 1' });
    pass.setPipeline(pipelines.transpose);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(N / 16), 1);
    pass.end();
  }

  // ========== Vertical FFT (all N rows after transpose) ==========
  // Four-step: Column FFT -> Twiddle -> Sub-row FFT -> Unscramble

  // Step V1: Column FFT (temp[0] → temp[1])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.columnFFT!,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: temp[1] } },
        { binding: 2, resource: { buffer: columnParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'V Column FFT' });
    pass.setPipeline(pipelines.columnFFT!);
    pass.setBindGroup(0, bindGroup);
    if (R <= 8) {
      pass.dispatchWorkgroups(Math.ceil(N * C / 256), 1, 1);
    } else {
      pass.dispatchWorkgroups(N * C, 1, 1);
    }
    pass.end();
  }

  // Step V2: Twiddle multiply (temp[1] → temp[0])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.twiddle!,
      entries: [
        { binding: 0, resource: { buffer: temp[1] } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: twiddleParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'V Twiddle' });
    pass.setPipeline(pipelines.twiddle!);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(C / 16), Math.ceil(N * R / 16), 1);
    pass.end();
  }

  // Step V3: Sub-row FFT (temp[0] → temp[1])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.subRowFFT!,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: temp[1] } },
        { binding: 2, resource: { buffer: subRowParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'V Sub-row FFT' });
    pass.setPipeline(pipelines.subRowFFT!);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(N * R, 1, 1);
    pass.end();
  }

  // Step V4: Unscramble (temp[1] → temp[0])
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.unscramble!,
      entries: [
        { binding: 0, resource: { buffer: temp[1] } },
        { binding: 1, resource: { buffer: temp[0] } },
        { binding: 2, resource: { buffer: unscrambleParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'V Unscramble' });
    pass.setPipeline(pipelines.unscramble!);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 256), N, 1);
    pass.end();
  }

  // ========== Transpose back (temp[0] → output) ==========
  {
    const bindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.transpose,
      entries: [
        { binding: 0, resource: { buffer: temp[0] } },
        { binding: 1, resource: { buffer: output } },
        { binding: 2, resource: { buffer: transposeParamsBuffer } }
      ]
    });
    const pass = encoder.beginComputePass({ label: 'Transpose 2' });
    pass.setPipeline(pipelines.transpose);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(N / 16), 1);
    pass.end();
  }

  device.queue.submit([encoder.finish()]);
}
