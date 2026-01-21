/**
 * Pipeline creation for Multiscale Turing Patterns
 *
 * Sets up all compute and render pipelines used in the simulation.
 */

import { FFTPipelines, createFFTPipelines } from './lib/webgpu-fft/fft.js';
import type { FFTPrecision } from './lib/webgpu-fft/fft.js';

// Import shaders as raw strings at build time
import initializeSource from './shaders/initialize.wgsl?raw';
import extractSource from './shaders/extract.wgsl?raw';
import convolveSource from './shaders/convolve.wgsl?raw';
import extractPairSource from './shaders/extract-pair.wgsl?raw';
import combinePairSource from './shaders/combine-pair.wgsl?raw';
import updateSource from './shaders/update.wgsl?raw';
import fullscreenSource from './shaders/fullscreen.wgsl?raw';
import visualizeSource from './shaders/visualize.wgsl?raw';

export interface TuringPipelines {
  // FFT pipelines
  fft: FFTPipelines;

  // Compute pipelines
  initialize: GPUComputePipeline;
  extract: GPUComputePipeline;
  convolve: GPUComputePipeline;
  extractPair: GPUComputePipeline;
  combinePair: GPUComputePipeline;
  update: GPUComputePipeline;

  // Visualization render pipeline
  visualize: GPURenderPipeline;

  // Bind group layouts
  bindGroupLayouts: {
    initialize: GPUBindGroupLayout;
    extract: GPUBindGroupLayout;
    convolve: GPUBindGroupLayout;
    extractPair: GPUBindGroupLayout;
    combinePair: GPUBindGroupLayout;
    update: GPUBindGroupLayout;
    visualize: GPUBindGroupLayout;
  };
}

/**
 * Create all pipelines for the Turing pattern simulation
 * @param precision Storage precision for FFT buffers: 'f16' for half-precision, 'f32' for single precision
 */
export async function createTuringPipelines(
  device: GPUDevice,
  canvasFormat: GPUTextureFormat,
  N: number,
  precision: FFTPrecision = 'f32'
): Promise<TuringPipelines> {
  // Create FFT pipelines with specified precision
  const fft = createFFTPipelines(device, N, precision);

  // Create shader modules
  const initializeModule = device.createShaderModule({
    label: 'Initialize shader',
    code: initializeSource
  });

  const extractModule = device.createShaderModule({
    label: 'Extract shader',
    code: extractSource
  });

  const convolveModule = device.createShaderModule({
    label: 'Convolve shader',
    code: convolveSource
  });

  const extractPairModule = device.createShaderModule({
    label: 'Extract pair shader',
    code: extractPairSource
  });

  const combinePairModule = device.createShaderModule({
    label: 'Combine pair shader',
    code: combinePairSource
  });

  const updateModule = device.createShaderModule({
    label: 'Update shader',
    code: updateSource
  });

  const fullscreenModule = device.createShaderModule({
    label: 'Fullscreen vertex shader',
    code: fullscreenSource
  });

  const visualizeModule = device.createShaderModule({
    label: 'Visualize shader',
    code: visualizeSource
  });

  // ============================================================================
  // Bind Group Layouts
  // ============================================================================

  // Initialize: output buffer + params
  const initializeBindGroupLayout = device.createBindGroupLayout({
    label: 'Initialize bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' as GPUBufferBindingType }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      }
    ]
  });

  // Extract: solution input + complex output + params
  const extractBindGroupLayout = device.createBindGroupLayout({
    label: 'Extract bind group layout',
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

  // Convolve: fhat input + output + params
  const convolveBindGroupLayout = device.createBindGroupLayout({
    label: 'Convolve bind group layout',
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

  // Extract pair: vec4 input + vec2 output + params
  const extractPairBindGroupLayout = device.createBindGroupLayout({
    label: 'Extract pair bind group layout',
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

  // Combine pair: two vec2 inputs + vec4 output + params
  const combinePairBindGroupLayout = device.createBindGroupLayout({
    label: 'Combine pair bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' as GPUBufferBindingType }
      },
      {
        binding: 3,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      }
    ]
  });

  // Update: solution_in + activator_inhibitor + solution_out + params + scaleParams
  const updateBindGroupLayout = device.createBindGroupLayout({
    label: 'Update bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' as GPUBufferBindingType }
      },
      {
        binding: 3,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      },
      {
        binding: 4,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      }
    ]
  });

  // Visualize: solution buffer + params + viewInverse
  const visualizeBindGroupLayout = device.createBindGroupLayout({
    label: 'Visualize bind group layout',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      }
    ]
  });

  // ============================================================================
  // Pipeline Layouts
  // ============================================================================

  const initializePipelineLayout = device.createPipelineLayout({
    label: 'Initialize pipeline layout',
    bindGroupLayouts: [initializeBindGroupLayout]
  });

  const extractPipelineLayout = device.createPipelineLayout({
    label: 'Extract pipeline layout',
    bindGroupLayouts: [extractBindGroupLayout]
  });

  const convolvePipelineLayout = device.createPipelineLayout({
    label: 'Convolve pipeline layout',
    bindGroupLayouts: [convolveBindGroupLayout]
  });

  const extractPairPipelineLayout = device.createPipelineLayout({
    label: 'Extract pair pipeline layout',
    bindGroupLayouts: [extractPairBindGroupLayout]
  });

  const combinePairPipelineLayout = device.createPipelineLayout({
    label: 'Combine pair pipeline layout',
    bindGroupLayouts: [combinePairBindGroupLayout]
  });

  const updatePipelineLayout = device.createPipelineLayout({
    label: 'Update pipeline layout',
    bindGroupLayouts: [updateBindGroupLayout]
  });

  const visualizePipelineLayout = device.createPipelineLayout({
    label: 'Visualize pipeline layout',
    bindGroupLayouts: [visualizeBindGroupLayout]
  });

  // ============================================================================
  // Compute Pipelines
  // ============================================================================

  const initialize = device.createComputePipeline({
    label: 'Initialize pipeline',
    layout: initializePipelineLayout,
    compute: {
      module: initializeModule,
      entryPoint: 'initialize'
    }
  });

  const extract = device.createComputePipeline({
    label: 'Extract pipeline',
    layout: extractPipelineLayout,
    compute: {
      module: extractModule,
      entryPoint: 'extract'
    }
  });

  const convolve = device.createComputePipeline({
    label: 'Convolve pipeline',
    layout: convolvePipelineLayout,
    compute: {
      module: convolveModule,
      entryPoint: 'convolve'
    }
  });

  const extractPair = device.createComputePipeline({
    label: 'Extract pair pipeline',
    layout: extractPairPipelineLayout,
    compute: {
      module: extractPairModule,
      entryPoint: 'extract_pair'
    }
  });

  const combinePair = device.createComputePipeline({
    label: 'Combine pair pipeline',
    layout: combinePairPipelineLayout,
    compute: {
      module: combinePairModule,
      entryPoint: 'combine_pair'
    }
  });

  const update = device.createComputePipeline({
    label: 'Update pipeline',
    layout: updatePipelineLayout,
    compute: {
      module: updateModule,
      entryPoint: 'update'
    }
  });

  // ============================================================================
  // Render Pipeline
  // ============================================================================

  const visualize = device.createRenderPipeline({
    label: 'Visualize pipeline',
    layout: visualizePipelineLayout,
    vertex: {
      module: fullscreenModule,
      entryPoint: 'fullscreen'
    },
    fragment: {
      module: visualizeModule,
      entryPoint: 'visualize',
      targets: [
        {
          format: canvasFormat
        }
      ]
    },
    primitive: {
      topology: 'triangle-list'
    }
  });

  return {
    fft,
    initialize,
    extract,
    convolve,
    extractPair,
    combinePair,
    update,
    visualize,
    bindGroupLayouts: {
      initialize: initializeBindGroupLayout,
      extract: extractBindGroupLayout,
      convolve: convolveBindGroupLayout,
      extractPair: extractPairBindGroupLayout,
      combinePair: combinePairBindGroupLayout,
      update: updateBindGroupLayout,
      visualize: visualizeBindGroupLayout
    }
  };
}
