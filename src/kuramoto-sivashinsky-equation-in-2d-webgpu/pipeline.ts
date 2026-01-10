/**
 * Pipeline creation for KS equation solver
 *
 * Sets up all compute and render pipelines used in the simulation.
 */

import { FFTPipelines, createFFTPipelines } from './fft.js';

export interface KSPipelines {
  // FFT pipelines
  fft: FFTPipelines;

  // Physics compute pipelines
  initialize: GPUComputePipeline;
  differentiate: GPUComputePipeline;
  computeNonlinear: GPUComputePipeline;
  bdfUpdate: GPUComputePipeline;
  extractReal: GPUComputePipeline;

  // Visualization render pipeline
  visualize: GPURenderPipeline;

  // Bind group layouts
  bindGroupLayouts: {
    initialize: GPUBindGroupLayout;
    differentiate: GPUBindGroupLayout;
    computeNonlinear: GPUBindGroupLayout;
    bdfUpdate: GPUBindGroupLayout;
    extractReal: GPUBindGroupLayout;
    visualize: GPUBindGroupLayout;
  };
}

/**
 * Load WGSL shader source from file
 */
async function loadShader(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load shader: ${path}`);
  }
  return response.text();
}

/**
 * Create all pipelines for the KS equation solver
 */
export async function createKSPipelines(
  device: GPUDevice,
  canvasFormat: GPUTextureFormat
): Promise<KSPipelines> {
  // Create FFT pipelines
  const fft = await createFFTPipelines(device);

  // Load all shader sources
  const [
    initializeSource,
    differentiateSource,
    computeNonlinearSource,
    bdfUpdateSource,
    extractRealSource,
    fullscreenSource,
    visualizeSource
  ] = await Promise.all([
    loadShader('./shaders/initialize.wgsl'),
    loadShader('./shaders/differentiate.wgsl'),
    loadShader('./shaders/compute_nonlinear.wgsl'),
    loadShader('./shaders/bdf_update.wgsl'),
    loadShader('./shaders/extract_real.wgsl'),
    loadShader('./shaders/fullscreen.wgsl'),
    loadShader('./shaders/visualize.wgsl')
  ]);

  // Create shader modules
  const initializeModule = device.createShaderModule({
    label: 'Initialize shader',
    code: initializeSource
  });

  const differentiateModule = device.createShaderModule({
    label: 'Differentiate shader',
    code: differentiateSource
  });

  const computeNonlinearModule = device.createShaderModule({
    label: 'Compute nonlinear shader',
    code: computeNonlinearSource
  });

  const bdfUpdateModule = device.createShaderModule({
    label: 'BDF update shader',
    code: bdfUpdateSource
  });

  const extractRealModule = device.createShaderModule({
    label: 'Extract real shader',
    code: extractRealSource
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

  // Differentiate: Vhat input + vec4 output + params
  const differentiateBindGroupLayout = device.createBindGroupLayout({
    label: 'Differentiate bind group layout',
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

  // Compute nonlinear: V_VxVy input + AB output + params
  const computeNonlinearBindGroupLayout = device.createBindGroupLayout({
    label: 'Compute nonlinear bind group layout',
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

  // BDF update: 4 input buffers + 1 output buffer + params
  const bdfUpdateBindGroupLayout = device.createBindGroupLayout({
    label: 'BDF update bind group layout',
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
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 3,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' as GPUBufferBindingType }
      },
      {
        binding: 4,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' as GPUBufferBindingType }
      },
      {
        binding: 5,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' as GPUBufferBindingType }
      }
    ]
  });

  // Extract real: input + output + params
  const extractRealBindGroupLayout = device.createBindGroupLayout({
    label: 'Extract real bind group layout',
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

  // Visualize: V buffer + params + colorscale texture + sampler
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
        texture: { sampleType: 'float' as GPUTextureSampleType }
      },
      {
        binding: 3,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: { type: 'filtering' as GPUSamplerBindingType }
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

  const differentiatePipelineLayout = device.createPipelineLayout({
    label: 'Differentiate pipeline layout',
    bindGroupLayouts: [differentiateBindGroupLayout]
  });

  const computeNonlinearPipelineLayout = device.createPipelineLayout({
    label: 'Compute nonlinear pipeline layout',
    bindGroupLayouts: [computeNonlinearBindGroupLayout]
  });

  const bdfUpdatePipelineLayout = device.createPipelineLayout({
    label: 'BDF update pipeline layout',
    bindGroupLayouts: [bdfUpdateBindGroupLayout]
  });

  const extractRealPipelineLayout = device.createPipelineLayout({
    label: 'Extract real pipeline layout',
    bindGroupLayouts: [extractRealBindGroupLayout]
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

  const differentiate = device.createComputePipeline({
    label: 'Differentiate pipeline',
    layout: differentiatePipelineLayout,
    compute: {
      module: differentiateModule,
      entryPoint: 'differentiate'
    }
  });

  const computeNonlinear = device.createComputePipeline({
    label: 'Compute nonlinear pipeline',
    layout: computeNonlinearPipelineLayout,
    compute: {
      module: computeNonlinearModule,
      entryPoint: 'compute_nonlinear'
    }
  });

  const bdfUpdate = device.createComputePipeline({
    label: 'BDF update pipeline',
    layout: bdfUpdatePipelineLayout,
    compute: {
      module: bdfUpdateModule,
      entryPoint: 'bdf_update'
    }
  });

  const extractReal = device.createComputePipeline({
    label: 'Extract real pipeline',
    layout: extractRealPipelineLayout,
    compute: {
      module: extractRealModule,
      entryPoint: 'extract_real'
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
    differentiate,
    computeNonlinear,
    bdfUpdate,
    extractReal,
    visualize,
    bindGroupLayouts: {
      initialize: initializeBindGroupLayout,
      differentiate: differentiateBindGroupLayout,
      computeNonlinear: computeNonlinearBindGroupLayout,
      bdfUpdate: bdfUpdateBindGroupLayout,
      extractReal: extractRealBindGroupLayout,
      visualize: visualizeBindGroupLayout
    }
  };
}
