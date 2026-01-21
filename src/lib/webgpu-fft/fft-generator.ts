/**
 * FFT Shader Generator
 *
 * Generates WGSL compute shader code for FFT of a given size N.
 * N must be a power of 2.
 */

export type FFTPrecision = 'f16' | 'f32';

export function generateFFTShader(N: number, precision: FFTPrecision = 'f32'): string {
  if (N == null || !Number.isInteger(N) || N < 2 || (N & (N - 1)) !== 0) {
    throw new Error(`N must be a power of 2 integer >= 2, got ${N}`);
  }

  const log2N = Math.log2(N);
  const storageType = precision === 'f16' ? 'vec2<f16>' : 'vec2<f32>';
  const enableF16 = precision === 'f16' ? 'enable f16;\n' : '';
  const loadConvert = precision === 'f16' ? 'vec2<f32>' : '';
  const storeConvert = precision === 'f16' ? 'vec2<f16>' : '';

  return `
// Generated FFT Shader for N=${N}
// Cooley-Tukey Radix-2 DIT FFT with bit-reversal permutation
// Storage: ${precision}, Computation: f32

${enableF16}
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

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: FFTParams;

var<workgroup> buffer_a: array<vec2<f32>, ${N}>;
var<workgroup> buffer_b: array<vec2<f32>, ${N}>;

// Bit-reverse for ${log2N} bits
fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${log2N}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

@compute @workgroup_size(${N}, 1, 1)
fn fft_horizontal(@builtin(local_invocation_id) local_id: vec3<u32>,
                  @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = ${N}u;

  if (row >= params.num_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal into buffer_a
  let input_idx = row * N + bitrev(j);
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  // ${log2N} stages of butterflies using ping-pong buffers
  for (var s = 0u; s < ${log2N}u; s++) {
    let m = 1u << (s + 1u);       // butterfly group size
    let half_m = 1u << s;         // half of group size

    let group = j / m;            // which group am I in
    let idx_in_group = j % m;     // position within group
    let is_first_half = idx_in_group < half_m;
    let k = select(idx_in_group - half_m, idx_in_group, is_first_half);
    let base = group * m + k;

    // Twiddle factor: exp(sign * 2πi * k / m)
    let angle = sign * 2.0 * PI * f32(k) / f32(m);
    let w = vec2<f32>(cos(angle), sin(angle));

    // Read from source buffer
    var a: vec2<f32>;
    var b: vec2<f32>;
    if ((s & 1u) == 0u) {
      a = buffer_a[base];
      b = cmul(w, buffer_a[base + half_m]);
    } else {
      a = buffer_b[base];
      b = cmul(w, buffer_b[base + half_m]);
    }

    // Compute butterfly result
    let result = select(a - b, a + b, is_first_half);

    workgroupBarrier();

    // Write to destination buffer
    if ((s & 1u) == 0u) {
      buffer_b[j] = result;
    } else {
      buffer_a[j] = result;
    }

    workgroupBarrier();
  }

  // Get result from correct buffer (depends on whether log2N is odd or even)
  // After log2N stages, result is in buffer_a if last stage (log2N-1) is odd
  // Last stage is odd when log2N is even
  var result = select(buffer_b[j], buffer_a[j], ${log2N % 2 === 0 ? 'true' : 'false'});

  // Normalization
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  // Write output
  let output_idx = row * N + j;
  output[output_idx] = ${storeConvert}(result);
}

@compute @workgroup_size(${N}, 1, 1)
fn fft_vertical(@builtin(local_invocation_id) local_id: vec3<u32>,
                @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = ${N}u;

  if (row >= params.num_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal
  let input_idx = row * N + bitrev(j);
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  for (var s = 0u; s < ${log2N}u; s++) {
    let m = 1u << (s + 1u);
    let half_m = 1u << s;
    let group = j / m;
    let idx_in_group = j % m;
    let is_first_half = idx_in_group < half_m;
    let k = select(idx_in_group - half_m, idx_in_group, is_first_half);
    let base = group * m + k;

    let angle = sign * 2.0 * PI * f32(k) / f32(m);
    let w = vec2<f32>(cos(angle), sin(angle));

    var a: vec2<f32>;
    var b: vec2<f32>;
    if ((s & 1u) == 0u) {
      a = buffer_a[base];
      b = cmul(w, buffer_a[base + half_m]);
    } else {
      a = buffer_b[base];
      b = cmul(w, buffer_b[base + half_m]);
    }

    let result = select(a - b, a + b, is_first_half);

    workgroupBarrier();

    if ((s & 1u) == 0u) {
      buffer_b[j] = result;
    } else {
      buffer_a[j] = result;
    }

    workgroupBarrier();
  }

  // After log2N stages, result is in buffer_a if last stage (log2N-1) is odd
  // Last stage is odd when log2N is even
  var result = select(buffer_b[j], buffer_a[j], ${log2N % 2 === 0 ? 'true' : 'false'});

  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  // Write output
  let output_idx = row * N + j;
  output[output_idx] = ${storeConvert}(result);
}
`;
}

/**
 * Generate transpose shader (same for all sizes)
 */
export function generateTransposeShader(precision: FFTPrecision = 'f32'): string {
  const storageType = precision === 'f16' ? 'vec2<f16>' : 'vec2<f32>';
  const enableF16 = precision === 'f16' ? 'enable f16;\n' : '';
  const loadConvert = precision === 'f16' ? 'vec2<f32>' : '';
  const storeConvert = precision === 'f16' ? 'vec2<f16>' : '';

  return `
// Matrix transpose shader
// Uses 16x16 tiles for coalesced memory access
// Storage: ${precision}, Computation: f32

${enableF16}
struct TransposeParams {
  N: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: TransposeParams;

var<workgroup> tile: array<array<vec2<f32>, 17>, 16>;  // 17 to avoid bank conflicts

@compute @workgroup_size(16, 16, 1)
fn transpose(@builtin(local_invocation_id) local_id: vec3<u32>,
             @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let N = params.N;
  let tile_x = workgroup_id.x * 16u;
  let tile_y = workgroup_id.y * 16u;

  let x = tile_x + local_id.x;
  let y = tile_y + local_id.y;

  // Load tile (coalesced read)
  if (x < N && y < N) {
    tile[local_id.y][local_id.x] = ${loadConvert}(input[y * N + x]);
  }

  workgroupBarrier();

  // Write transposed (coalesced write)
  let out_x = tile_y + local_id.x;
  let out_y = tile_x + local_id.y;

  if (out_x < N && out_y < N) {
    output[out_y * N + out_x] = ${storeConvert}(tile[local_id.x][local_id.y]);
  }
}
`;
}
