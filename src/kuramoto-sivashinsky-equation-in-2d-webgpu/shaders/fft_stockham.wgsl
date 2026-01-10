// Stockham FFT Compute Shader
//
// Performs 1D FFT on rows using the Stockham algorithm with shared memory.
// This processes entire rows in parallel instead of one pixel at a time.
//
// For N=256, this requires log2(256)=8 butterfly stages per row.
// Using shared memory, all stages can be computed in a single dispatch.

// Complex number operations
fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

// Twiddle factor: exp(-2πi * k / N) for forward FFT
// or exp(2πi * k / N) for inverse FFT
fn twiddle(k: u32, N: u32, forward: bool) -> vec2<f32> {
  let sign = select(1.0, -1.0, forward);
  let angle = sign * 2.0 * 3.14159265359 * f32(k) / f32(N);
  return vec2<f32>(cos(angle), sin(angle));
}

// Uniforms
struct FFTParams {
  N: u32,              // FFT size (256)
  num_rows: u32,       // Number of rows to process
  forward: u32,        // 1 for forward, 0 for inverse
  split_norm: u32,     // 1 to split normalization, 0 to normalize on inverse only
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: FFTParams;

// Shared memory for one row (256 complex numbers = 2KB)
var<workgroup> shared_data: array<vec2<f32>, 256>;

@compute @workgroup_size(256, 1, 1)
fn fft_horizontal(@builtin(global_invocation_id) global_id: vec3<u32>,
                   @builtin(local_invocation_id) local_id: vec3<u32>,
                   @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let thread_id = local_id.x;
  let N = params.N;

  // Early exit if out of bounds
  if (row >= params.num_rows) {
    return;
  }

  // Load data from global memory to shared memory
  let input_idx = row * N + thread_id;
  shared_data[thread_id] = input[input_idx];
  workgroupBarrier();

  // Stockham FFT algorithm
  // Process log2(N) stages
  let num_stages = 8u;  // log2(256)
  var is_forward = params.forward != 0u;

  for (var stage = 0u; stage < num_stages; stage++) {
    let block_size = 1u << (stage + 1u);
    let half_block = block_size >> 1u;
    let num_blocks = N / block_size;

    // Determine which block and position within block this thread handles
    let block_idx = thread_id / half_block;
    let pos_in_block = thread_id % half_block;

    // Input indices
    let idx_even = block_idx * block_size + pos_in_block;
    let idx_odd = idx_even + half_block;

    // Twiddle factor
    let w = twiddle(pos_in_block, block_size, is_forward);

    // Butterfly operation
    let even_val = shared_data[idx_even];
    let odd_val = shared_data[idx_odd];
    let t = cmul(w, odd_val);

    // Store results (in-place via barrier synchronization)
    let output_even = even_val + t;
    let output_odd = even_val - t;

    workgroupBarrier();

    shared_data[idx_even] = output_even;
    shared_data[idx_odd] = output_odd;

    workgroupBarrier();
  }

  // Apply normalization if needed
  var result = shared_data[thread_id];

  if (params.split_norm != 0u) {
    // Split normalization: divide by sqrt(N) on both forward and inverse
    result = result / sqrt(f32(N));
  } else {
    // Standard normalization: divide by N on inverse only
    if (!is_forward) {
      result = result / f32(N);
    }
  }

  // Write back to global memory
  output[input_idx] = result;
}

// Alternative entry point for processing columns (after transpose)
// This is identical to horizontal but WGSL doesn't allow calling entry points
@compute @workgroup_size(256, 1, 1)
fn fft_vertical(@builtin(global_invocation_id) global_id: vec3<u32>,
                @builtin(local_invocation_id) local_id: vec3<u32>,
                @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let thread_id = local_id.x;
  let N = params.N;

  // Early exit if out of bounds
  if (row >= params.num_rows) {
    return;
  }

  // Load data from global memory to shared memory
  let input_idx = row * N + thread_id;
  shared_data[thread_id] = input[input_idx];
  workgroupBarrier();

  // Stockham FFT algorithm
  let num_stages = 8u;  // log2(256)
  var is_forward = params.forward != 0u;

  for (var stage = 0u; stage < num_stages; stage++) {
    let block_size = 1u << (stage + 1u);
    let half_block = block_size >> 1u;
    let num_blocks = N / block_size;

    // Determine which block and position within block this thread handles
    let block_idx = thread_id / half_block;
    let pos_in_block = thread_id % half_block;

    // Input indices
    let idx_even = block_idx * block_size + pos_in_block;
    let idx_odd = idx_even + half_block;

    // Twiddle factor
    let w = twiddle(pos_in_block, block_size, is_forward);

    // Butterfly operation
    let even_val = shared_data[idx_even];
    let odd_val = shared_data[idx_odd];
    let t = cmul(w, odd_val);

    // Store results (in-place via barrier synchronization)
    let output_even = even_val + t;
    let output_odd = even_val - t;

    workgroupBarrier();

    shared_data[idx_even] = output_even;
    shared_data[idx_odd] = output_odd;

    workgroupBarrier();
  }

  // Apply normalization if needed
  var result = shared_data[thread_id];

  if (params.split_norm != 0u) {
    // Split normalization: divide by sqrt(N) on both forward and inverse
    result = result / sqrt(f32(N));
  } else {
    // Standard normalization: divide by N on inverse only
    if (!is_forward) {
      result = result / f32(N);
    }
  }

  // Write back to global memory
  output[input_idx] = result;
}
