/**
 * 2D FFT implementation using Stockham algorithm with compute shaders
 *
 * This performs 2D FFT in 4 passes:
 * 1. Horizontal FFT (all rows in parallel)
 * 2. Transpose
 * 3. Vertical FFT (columns become rows after transpose)
 * 4. Transpose back
 */

import { generateFFTShader, generateTransposeShader } from './fft-generator.js';

export interface FFTPipelines {
  fftHorizontal: GPUComputePipeline;
  fftVertical: GPUComputePipeline;
  transpose: GPUComputePipeline;
  bindGroupLayouts: {
    fft: GPUBindGroupLayout;
    transpose: GPUBindGroupLayout;
  };
  N: number;
}

/**
 * Create all FFT-related compute pipelines for a given size N
 */
export function createFFTPipelines(device: GPUDevice, N: number): FFTPipelines {
  if (N < 2 || (N & (N - 1)) !== 0) {
    throw new Error(`N must be a power of 2, got ${N}`);
  }

  // Check device limits
  const maxWorkgroupSize = device.limits.maxComputeWorkgroupSizeX;
  if (N > maxWorkgroupSize) {
    throw new Error(`N=${N} exceeds device maxComputeWorkgroupSizeX=${maxWorkgroupSize}`);
  }

  // Generate shader code
  const fftCode = generateFFTShader(N);
  const transposeCode = generateTransposeShader();

  // Create shader modules
  const fftShaderModule = device.createShaderModule({
    label: `FFT Stockham shader N=${N}`,
    code: fftCode
  });

  const transposeShaderModule = device.createShaderModule({
    label: 'Transpose shader',
    code: transposeCode
  });

  // Create bind group layouts
  const fftBindGroupLayout = device.createBindGroupLayout({
    label: 'FFT bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' as GPUBufferBindingType }
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      }
    ]
  });

  const transposeBindGroupLayout = device.createBindGroupLayout({
    label: 'Transpose bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' as GPUBufferBindingType }
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      }
    ]
  });

  // Create pipeline layouts
  const fftPipelineLayout = device.createPipelineLayout({
    label: 'FFT pipeline layout',
    bindGroupLayouts: [fftBindGroupLayout]
  });

  const transposePipelineLayout = device.createPipelineLayout({
    label: 'Transpose pipeline layout',
    bindGroupLayouts: [transposeBindGroupLayout]
  });

  // Create compute pipelines
  const fftHorizontal = device.createComputePipeline({
    label: `FFT horizontal pipeline N=${N}`,
    layout: fftPipelineLayout,
    compute: {
      module: fftShaderModule,
      entryPoint: 'fft_horizontal'
    }
  });

  const fftVertical = device.createComputePipeline({
    label: `FFT vertical pipeline N=${N}`,
    layout: fftPipelineLayout,
    compute: {
      module: fftShaderModule,
      entryPoint: 'fft_vertical'
    }
  });

  const transpose = device.createComputePipeline({
    label: 'Transpose pipeline',
    layout: transposePipelineLayout,
    compute: {
      module: transposeShaderModule,
      entryPoint: 'transpose'
    }
  });

  return {
    fftHorizontal,
    fftVertical,
    transpose,
    bindGroupLayouts: {
      fft: fftBindGroupLayout,
      transpose: transposeBindGroupLayout
    },
    N
  };
}

export interface FFT2DParams {
  device: GPUDevice;
  pipelines: FFTPipelines;
  input: GPUBuffer;
  output: GPUBuffer;
  temp: [GPUBuffer, GPUBuffer];
  N: number;
  forward: boolean;
  splitNormalization: boolean;
}

/**
 * Execute 2D FFT
 *
 * Performs complete 2D FFT via 4 passes:
 * - Horizontal FFT
 * - Transpose
 * - Vertical FFT (on transposed data)
 * - Transpose back
 *
 * @param params FFT parameters
 */
export function executeFFT2D(params: FFT2DParams) {
  const { device, pipelines, input, output, temp, N, forward, splitNormalization } = params;

  // Verify N matches pipeline
  if (N !== pipelines.N) {
    throw new Error(`N=${N} doesn't match pipeline N=${pipelines.N}`);
  }

  // Create uniform buffers for this FFT
  const fftParamsBuffer = device.createBuffer({
    label: 'FFT params uniform',
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  const fftParamsData = new Uint32Array([
    N,                              // N
    N,                              // num_rows
    forward ? 1 : 0,                // forward flag
    splitNormalization ? 1 : 0      // split normalization flag
  ]);
  device.queue.writeBuffer(fftParamsBuffer, 0, fftParamsData);

  const transposeParamsBuffer = device.createBuffer({
    label: 'Transpose params uniform',
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  const transposeParamsData = new Uint32Array([N]);
  device.queue.writeBuffer(transposeParamsBuffer, 0, transposeParamsData);

  // Create bind groups
  const fftHorizontalBindGroup = device.createBindGroup({
    label: 'FFT horizontal bind group',
    layout: pipelines.bindGroupLayouts.fft,
    entries: [
      { binding: 0, resource: { buffer: input } },
      { binding: 1, resource: { buffer: temp[0] } },
      { binding: 2, resource: { buffer: fftParamsBuffer } }
    ]
  });

  const transpose1BindGroup = device.createBindGroup({
    label: 'Transpose 1 bind group',
    layout: pipelines.bindGroupLayouts.transpose,
    entries: [
      { binding: 0, resource: { buffer: temp[0] } },
      { binding: 1, resource: { buffer: temp[1] } },
      { binding: 2, resource: { buffer: transposeParamsBuffer } }
    ]
  });

  const fftVerticalBindGroup = device.createBindGroup({
    label: 'FFT vertical bind group',
    layout: pipelines.bindGroupLayouts.fft,
    entries: [
      { binding: 0, resource: { buffer: temp[1] } },
      { binding: 1, resource: { buffer: temp[0] } },
      { binding: 2, resource: { buffer: fftParamsBuffer } }
    ]
  });

  const transpose2BindGroup = device.createBindGroup({
    label: 'Transpose 2 bind group',
    layout: pipelines.bindGroupLayouts.transpose,
    entries: [
      { binding: 0, resource: { buffer: temp[0] } },
      { binding: 1, resource: { buffer: output } },
      { binding: 2, resource: { buffer: transposeParamsBuffer } }
    ]
  });

  // Encode compute passes
  const commandEncoder = device.createCommandEncoder({ label: 'FFT 2D command encoder' });

  // Pass 1: Horizontal FFT
  {
    const pass = commandEncoder.beginComputePass({ label: 'FFT horizontal pass' });
    pass.setPipeline(pipelines.fftHorizontal);
    pass.setBindGroup(0, fftHorizontalBindGroup);
    pass.dispatchWorkgroups(N, 1, 1);  // N workgroups, each processing one row
    pass.end();
  }

  // Pass 2: Transpose
  {
    const pass = commandEncoder.beginComputePass({ label: 'Transpose 1 pass' });
    pass.setPipeline(pipelines.transpose);
    pass.setBindGroup(0, transpose1BindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(N / 16), 1);  // 16×16 tiles
    pass.end();
  }

  // Pass 3: Vertical FFT (now processing columns as rows)
  {
    const pass = commandEncoder.beginComputePass({ label: 'FFT vertical pass' });
    pass.setPipeline(pipelines.fftVertical);
    pass.setBindGroup(0, fftVerticalBindGroup);
    pass.dispatchWorkgroups(N, 1, 1);  // N workgroups
    pass.end();
  }

  // Pass 4: Transpose back
  {
    const pass = commandEncoder.beginComputePass({ label: 'Transpose 2 pass' });
    pass.setPipeline(pipelines.transpose);
    pass.setBindGroup(0, transpose2BindGroup);
    pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(N / 16), 1);
    pass.end();
  }

  // Submit commands
  device.queue.submit([commandEncoder.finish()]);

  // Note: Uniform buffers are NOT destroyed here because the GPU may still be using them.
  // They will be garbage collected when no longer referenced.
}
