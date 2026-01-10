/**
 * Execution module for KS equation solver
 *
 * Handles initialization and iteration logic for the simulation.
 */

import { SimulationBuffers, cycleBuffers } from './buffers.js';
import { KSPipelines } from './pipeline.js';
import { executeFFT2D } from './fft.js';

export interface ExecutionContext {
  device: GPUDevice;
  pipelines: KSPipelines;
  buffers: SimulationBuffers;
  config: {
    N: [number, number];
    dx: [number, number];
    dt: number;
    nu: [number, number];
  };
}

/**
 * Helper to create a temporary vec4 buffer for differentiation output
 */
function createVec4TempBuffer(device: GPUDevice, N: [number, number]): GPUBuffer {
  const size = N[0] * N[1] * 4 * Float32Array.BYTES_PER_ELEMENT;
  return device.createBuffer({
    label: 'Temporary vec4 buffer',
    size,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
  });
}

/**
 * Initialize simulation with initial conditions
 */
export function performInitialization(ctx: ExecutionContext, n: number) {
  const { device, pipelines, buffers, config } = ctx;
  const [Nx, Ny] = config.N;

  // Create uniform buffer for initialization parameters
  const initParamsBuffer = device.createBuffer({
    label: 'Initialize params',
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  const initParamsData = new Uint32Array([Nx, Ny]);
  const initParamsDataF32 = new Float32Array([0, 0, n, 0]);  // resolution (u32×2) + n (f32)
  device.queue.writeBuffer(initParamsBuffer, 0, initParamsData);
  device.queue.writeBuffer(initParamsBuffer, 8, initParamsDataF32.buffer, 8, 4);

  // Create bind group for initialization
  const initBindGroup = device.createBindGroup({
    label: 'Initialize bind group',
    layout: pipelines.bindGroupLayouts.initialize,
    entries: [
      { binding: 0, resource: { buffer: buffers.V[0] } },
      { binding: 1, resource: { buffer: initParamsBuffer } }
    ]
  });

  // Execute initialization
  const commandEncoder = device.createCommandEncoder({ label: 'Initialize encoder' });
  const pass = commandEncoder.beginComputePass({ label: 'Initialize pass' });
  pass.setPipeline(pipelines.initialize);
  pass.setBindGroup(0, initBindGroup);
  pass.dispatchWorkgroups(Math.ceil(Nx / 16), Math.ceil(Ny / 16), 1);
  pass.end();

  device.queue.submit([commandEncoder.finish()]);

  // Forward FFT: V[0] -> Vhat[0]
  executeFFT2D({
    device,
    pipelines: pipelines.fft,
    input: buffers.V[0],
    output: buffers.Vhat[0],
    temp: buffers.fftTemp,
    N: Nx,
    forward: true,
    splitNormalization: true
  });

  // Compute ABhat[0] from Vhat[0]
  computeABhat(ctx, buffers.Vhat[0], buffers.V[0], buffers.ABhat[0]);

  // Copy to create history for BDF2
  copyBuffer(device, buffers.V[0], buffers.V[1]);
  copyBuffer(device, buffers.Vhat[0], buffers.Vhat[1]);
  copyBuffer(device, buffers.ABhat[0], buffers.ABhat[1]);

  // Cleanup
  initParamsBuffer.destroy();
}

/**
 * Compute Ahat and Bhat from Vhat
 *
 * This performs:
 * 1. Differentiate: Vhat -> (Vhat, dVhat/dx, dVhat/dy)
 * 2. Inverse FFT: -> (V, Vx, Vy) in spatial domain
 * 3. Compute nonlinear: (Vx, Vy) -> (A, B) = (-0.5*Vx², -0.5*Vy²)
 * 4. Forward FFT: (A, B) -> ABhat
 */
function computeABhat(
  ctx: ExecutionContext,
  Vhat: GPUBuffer,
  V: GPUBuffer,  // Output: will contain V and derivatives
  ABhat: GPUBuffer
) {
  const { device, pipelines, buffers, config } = ctx;
  const [Nx, Ny] = config.N;

  // Create temporary vec4 buffer for differentiation output
  const diffOutput = createVec4TempBuffer(device, config.N);

  // Create parameter buffers
  const diffParamsBuffer = device.createBuffer({
    label: 'Differentiate params',
    size: 32,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  const diffParamsData = new Uint32Array(8);
  diffParamsData[0] = Nx;
  diffParamsData[1] = Ny;
  new Float32Array(diffParamsData.buffer)[2] = config.dx[0];
  new Float32Array(diffParamsData.buffer)[3] = config.dx[1];
  device.queue.writeBuffer(diffParamsBuffer, 0, diffParamsData);

  // Step 1: Differentiate
  const diffBindGroup = device.createBindGroup({
    layout: pipelines.bindGroupLayouts.differentiate,
    entries: [
      { binding: 0, resource: { buffer: Vhat } },
      { binding: 1, resource: { buffer: diffOutput } },
      { binding: 2, resource: { buffer: diffParamsBuffer } }
    ]
  });

  const encoder1 = device.createCommandEncoder();
  const pass1 = encoder1.beginComputePass();
  pass1.setPipeline(pipelines.differentiate);
  pass1.setBindGroup(0, diffBindGroup);
  pass1.dispatchWorkgroups(Math.ceil(Nx / 16), Math.ceil(Ny / 16), 1);
  pass1.end();
  device.queue.submit([encoder1.finish()]);

  // Step 2: Inverse FFT (diffOutput -> V)
  // Note: This is a vec4 FFT, but we'll treat it as 2 parallel vec2 FFTs
  executeFFT2D({
    device,
    pipelines: pipelines.fft,
    input: diffOutput,
    output: V,
    temp: buffers.fftTemp,
    N: Nx,
    forward: false,
    splitNormalization: true
  });

  // Step 3: Compute nonlinear terms
  const nonlinearParamsBuffer = device.createBuffer({
    label: 'Nonlinear params',
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  const nonlinearParamsData = new Uint32Array([Nx, Ny]);
  device.queue.writeBuffer(nonlinearParamsBuffer, 0, nonlinearParamsData);

  const nonlinearBindGroup = device.createBindGroup({
    layout: pipelines.bindGroupLayouts.computeNonlinear,
    entries: [
      { binding: 0, resource: { buffer: V } },
      { binding: 1, resource: { buffer: diffOutput } },  // Reuse as AB output
      { binding: 2, resource: { buffer: nonlinearParamsBuffer } }
    ]
  });

  const encoder2 = device.createCommandEncoder();
  const pass2 = encoder2.beginComputePass();
  pass2.setPipeline(pipelines.computeNonlinear);
  pass2.setBindGroup(0, nonlinearBindGroup);
  pass2.dispatchWorkgroups(Math.ceil(Nx / 16), Math.ceil(Ny / 16), 1);
  pass2.end();
  device.queue.submit([encoder2.finish()]);

  // Step 4: Forward FFT (AB -> ABhat)
  executeFFT2D({
    device,
    pipelines: pipelines.fft,
    input: diffOutput,
    output: ABhat,
    temp: buffers.fftTemp,
    N: Nx,
    forward: true,
    splitNormalization: true
  });

  // Cleanup
  diffOutput.destroy();
  diffParamsBuffer.destroy();
  nonlinearParamsBuffer.destroy();
}

/**
 * Perform one iteration of the simulation
 */
export function performIteration(ctx: ExecutionContext, useStripImag: boolean = true) {
  const { device, pipelines, buffers, config } = ctx;
  const [Nx, Ny] = config.N;

  // Compute ABhat[1] from Vhat[1]
  computeABhat(ctx, buffers.Vhat[1], buffers.V[1], buffers.ABhat[1]);

  // BDF2 update: Vhat[0], Vhat[1], ABhat[0], ABhat[1] -> Vhat[2]
  const bdfParamsBuffer = device.createBuffer({
    label: 'BDF params',
    size: 32,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  const bdfParamsData = new Uint32Array(8);
  bdfParamsData[0] = Nx;
  bdfParamsData[1] = Ny;
  new Float32Array(bdfParamsData.buffer)[2] = config.dx[0];
  new Float32Array(bdfParamsData.buffer)[3] = config.dx[1];
  new Float32Array(bdfParamsData.buffer)[4] = config.dt;
  new Float32Array(bdfParamsData.buffer)[5] = 0;  // padding
  new Float32Array(bdfParamsData.buffer)[6] = config.nu[0];
  new Float32Array(bdfParamsData.buffer)[7] = config.nu[1];
  device.queue.writeBuffer(bdfParamsBuffer, 0, bdfParamsData);

  const bdfBindGroup = device.createBindGroup({
    layout: pipelines.bindGroupLayouts.bdfUpdate,
    entries: [
      { binding: 0, resource: { buffer: buffers.Vhat[0] } },
      { binding: 1, resource: { buffer: buffers.Vhat[1] } },
      { binding: 2, resource: { buffer: buffers.ABhat[0] } },
      { binding: 3, resource: { buffer: buffers.ABhat[1] } },
      { binding: 4, resource: { buffer: buffers.Vhat[2] } },
      { binding: 5, resource: { buffer: bdfParamsBuffer } }
    ]
  });

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipelines.bdfUpdate);
  pass.setBindGroup(0, bdfBindGroup);
  pass.dispatchWorkgroups(Math.ceil(Nx / 16), Math.ceil(Ny / 16), 1);
  pass.end();
  device.queue.submit([encoder.finish()]);

  // Cycle buffers: [0,1,2] -> [1,2,0]
  cycleBuffers(buffers.Vhat);
  cycleBuffers(buffers.V);
  cycleBuffers(buffers.ABhat);

  // Strip imaginary component workaround (if needed)
  if (useStripImag) {
    const tempBuffer = createVec4TempBuffer(device, config.N);

    // Inverse FFT: Vhat[1] -> temp
    executeFFT2D({
      device,
      pipelines: pipelines.fft,
      input: buffers.Vhat[1],
      output: tempBuffer,
      temp: buffers.fftTemp,
      N: Nx,
      forward: false,
      splitNormalization: true
    });

    // Extract real: temp -> buffers.fftTemp[0]
    const extractRealParamsBuffer = device.createBuffer({
      label: 'Extract real params',
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const extractRealParamsData = new Uint32Array([Nx, Ny]);
    device.queue.writeBuffer(extractRealParamsBuffer, 0, extractRealParamsData);

    const extractRealBindGroup = device.createBindGroup({
      layout: pipelines.bindGroupLayouts.extractReal,
      entries: [
        { binding: 0, resource: { buffer: tempBuffer } },
        { binding: 1, resource: { buffer: buffers.fftTemp[0] } },
        { binding: 2, resource: { buffer: extractRealParamsBuffer } }
      ]
    });

    const encoder2 = device.createCommandEncoder();
    const pass2 = encoder2.beginComputePass();
    pass2.setPipeline(pipelines.extractReal);
    pass2.setBindGroup(0, extractRealBindGroup);
    pass2.dispatchWorkgroups(Math.ceil(Nx / 16), Math.ceil(Ny / 16), 1);
    pass2.end();
    device.queue.submit([encoder2.finish()]);

    // Forward FFT: buffers.fftTemp[0] -> Vhat[1]
    executeFFT2D({
      device,
      pipelines: pipelines.fft,
      input: buffers.fftTemp[0],
      output: buffers.Vhat[1],
      temp: [buffers.fftTemp[1], tempBuffer],
      N: Nx,
      forward: true,
      splitNormalization: true
    });

    tempBuffer.destroy();
    extractRealParamsBuffer.destroy();
  }

  bdfParamsBuffer.destroy();
}

/**
 * Copy buffer contents
 */
function copyBuffer(device: GPUDevice, src: GPUBuffer, dst: GPUBuffer) {
  const encoder = device.createCommandEncoder({ label: 'Copy buffer encoder' });
  encoder.copyBufferToBuffer(src, 0, dst, 0, src.size);
  device.queue.submit([encoder.finish()]);
}
