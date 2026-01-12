// Small FFT Compute Shader (N=8)
//
// Classic Cooley-Tukey radix-2 DIT algorithm for testing.
// Uses bit-reversal permutation followed by butterfly stages.

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

struct FFTParams {
  N: u32,
  num_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: FFTParams;

var<workgroup> buffer: array<vec2<f32>, 8>;

// Bit-reverse a 3-bit number (for N=8)
fn bitrev3(x: u32) -> u32 {
  return ((x & 1u) << 2u) | (x & 2u) | ((x & 4u) >> 2u);
}

@compute @workgroup_size(8, 1, 1)
fn fft_row(@builtin(local_invocation_id) local_id: vec3<u32>,
           @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = 8u;

  if (row >= params.num_rows) {
    return;
  }

  // Load with bit-reversal
  let input_idx = row * N + bitrev3(j);
  buffer[j] = input[input_idx];
  workgroupBarrier();

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Stage 0: butterflies of size 2
  if ((j & 1u) == 0u) {
    let a = buffer[j];
    let b = buffer[j + 1u];
    buffer[j] = a + b;
    buffer[j + 1u] = a - b;
  }
  workgroupBarrier();

  // Stage 1: butterflies of size 4
  let pair1 = (j / 4u) * 4u + (j % 2u);
  if ((j % 4u) < 2u) {
    let k = j % 2u;  // 0 or 1
    let angle = sign * PI * f32(k) / 2.0;  // k * 2π/4 = k * π/2
    let w = vec2<f32>(cos(angle), sin(angle));
    let a = buffer[pair1];
    let b = cmul(w, buffer[pair1 + 2u]);
    buffer[pair1] = a + b;
    buffer[pair1 + 2u] = a - b;
  }
  workgroupBarrier();

  // Stage 2: butterflies of size 8
  if (j < 4u) {
    let angle = sign * PI * f32(j) / 4.0;  // j * 2π/8 = j * π/4
    let w = vec2<f32>(cos(angle), sin(angle));
    let a = buffer[j];
    let b = cmul(w, buffer[j + 4u]);
    buffer[j] = a + b;
    buffer[j + 4u] = a - b;
  }
  workgroupBarrier();

  // Get result
  var result = buffer[j];

  // Normalization
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  // Write output
  let output_idx = row * N + j;
  output[output_idx] = result;
}
