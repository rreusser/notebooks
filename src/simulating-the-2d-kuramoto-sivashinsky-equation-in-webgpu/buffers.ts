/**
 * Buffer management utilities for KS equation solver
 *
 * Handles creation and lifecycle of WebGPU storage buffers for simulation state.
 */

export interface SimulationBuffers {
  // Spatial domain (real-valued with padding for FFT)
  V: GPUBuffer[];  // [2] for ping-pong

  // Frequency domain (complex-valued)
  Vhat: GPUBuffer[];  // [3] for BDF2 history (n, n+1, n+2)

  // Nonlinear terms (complex-valued, separate A and B components)
  ABhat: GPUBuffer[];  // [2] for BDF2 history

  // FFT working memory
  fftTemp: GPUBuffer[];  // [2] for transpose operations

  // Uniform buffers
  params: GPUBuffer;  // Simulation parameters (dx, dt, nu)
  fftParams: GPUBuffer;  // FFT parameters (N, forward/inverse flag)
}

export interface SimulationConfig {
  N: [number, number];  // Grid resolution [Nx, Ny]
  device: GPUDevice;
}

/**
 * Create all buffers needed for the simulation
 */
export function createSimulationBuffers(config: SimulationConfig): SimulationBuffers {
  const { N, device } = config;
  const [Nx, Ny] = N;

  // Size calculations
  const spatialSize = Nx * Ny * 2 * Float32Array.BYTES_PER_ELEMENT;  // vec2<f32>
  const frequencySize = Nx * Ny * 2 * Float32Array.BYTES_PER_ELEMENT;  // vec2<f32> (complex)
  const nonlinearSize = Nx * Ny * 4 * Float32Array.BYTES_PER_ELEMENT;  // vec4<f32> (A.xy, B.xy)
  const vec4Size = Nx * Ny * 4 * Float32Array.BYTES_PER_ELEMENT;  // vec4<f32> for derivatives

  // Create spatial domain buffers (V) - vec2 for FFT compatibility
  const V = [0, 1, 2].map((i) =>
    device.createBuffer({
      label: `V[${i}] buffer (spatial domain)`,
      size: spatialSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
    })
  );

  // Create frequency domain buffers (Vhat) - need 3 for BDF2
  const Vhat = [0, 1, 2].map((i) =>
    device.createBuffer({
      label: `Vhat[${i}] buffer (frequency domain)`,
      size: frequencySize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
    })
  );

  // Create nonlinear term buffers (ABhat)
  const ABhat = [0, 1].map((i) =>
    device.createBuffer({
      label: `ABhat[${i}] buffer (nonlinear terms)`,
      size: nonlinearSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
    })
  );

  // Create FFT temporary buffers - need vec4 size for derivative transforms
  const fftTemp = [0, 1].map((i) =>
    device.createBuffer({
      label: `FFT temp[${i}] buffer`,
      size: vec4Size,  // Large enough for vec4 operations
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
    })
  );

  // Create uniform buffer for simulation parameters
  const params = device.createBuffer({
    label: 'Simulation parameters',
    size: 64,  // Enough for dx (vec2), dt (f32), nu (vec2), padding
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  // Create uniform buffer for FFT parameters
  const fftParams = device.createBuffer({
    label: 'FFT parameters',
    size: 16,  // N (u32), direction (i32), padding
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  return {
    V,
    Vhat,
    ABhat,
    fftTemp,
    params,
    fftParams
  };
}

/**
 * Clean up all buffers
 */
export function destroySimulationBuffers(buffers: SimulationBuffers) {
  buffers.V.forEach(b => b.destroy());
  buffers.Vhat.forEach(b => b.destroy());
  buffers.ABhat.forEach(b => b.destroy());
  buffers.fftTemp.forEach(b => b.destroy());
  buffers.params.destroy();
  buffers.fftParams.destroy();
}

/**
 * Cycle buffer arrays forward (for maintaining history)
 * e.g., [0,1,2] -> [1,2,0]
 */
export function cycleBuffers(array: GPUBuffer[]) {
  const tmp = array[0];
  for (let i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  array[array.length - 1] = tmp;
}

/**
 * Upload simulation parameters to uniform buffer
 */
export function updateSimulationParams(
  device: GPUDevice,
  buffer: GPUBuffer,
  params: {
    dx: [number, number];
    dt: number;
    nu: [number, number];
  }
) {
  const data = new Float32Array([
    params.dx[0], params.dx[1],  // vec2<f32> dx
    params.dt, 0,                 // f32 dt + padding
    params.nu[0], params.nu[1],   // vec2<f32> nu
    0, 0                          // padding
  ]);

  device.queue.writeBuffer(buffer, 0, data);
}

/**
 * Upload FFT parameters to uniform buffer
 */
export function updateFFTParams(
  device: GPUDevice,
  buffer: GPUBuffer,
  params: {
    N: number;
    direction: number;  // 1 for forward, -1 for inverse
  }
) {
  const data = new Uint32Array([
    params.N,
    params.direction === 1 ? 1 : 0xFFFFFFFF  // -1 as u32
  ]);

  device.queue.writeBuffer(buffer, 0, data);
}
