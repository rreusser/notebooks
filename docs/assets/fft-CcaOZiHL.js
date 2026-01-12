function y(e){if(e==null||!Number.isInteger(e)||e<2||(e&e-1)!==0)throw new Error(`N must be a power of 2 integer >= 2, got ${e}`);const r=Math.log2(e);return`
// Generated FFT Shader for N=${e}
// Cooley-Tukey Radix-2 DIT FFT using Stockham algorithm

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

var<workgroup> buffer_a: array<vec2<f32>, ${e}>;
var<workgroup> buffer_b: array<vec2<f32>, ${e}>;

// Bit-reverse for ${r} bits
fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${r}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

@compute @workgroup_size(${e}, 1, 1)
fn fft_horizontal(@builtin(local_invocation_id) local_id: vec3<u32>,
                  @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = ${e}u;

  if (row >= params.num_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal into buffer_a
  let input_idx = row * N + bitrev(j);
  buffer_a[j] = input[input_idx];
  workgroupBarrier();

  // ${r} stages of butterflies using ping-pong buffers
  for (var s = 0u; s < ${r}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${r%2===0?"true":"false"});

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

@compute @workgroup_size(${e}, 1, 1)
fn fft_vertical(@builtin(local_invocation_id) local_id: vec3<u32>,
                @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = ${e}u;

  if (row >= params.num_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  let input_idx = row * N + bitrev(j);
  buffer_a[j] = input[input_idx];
  workgroupBarrier();

  for (var s = 0u; s < ${r}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${r%2===0?"true":"false"});

  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  let output_idx = row * N + j;
  output[output_idx] = result;
}
`}function x(){return`
// Matrix transpose shader
// Uses 16x16 tiles for coalesced memory access

struct TransposeParams {
  N: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
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
    tile[local_id.y][local_id.x] = input[y * N + x];
  }

  workgroupBarrier();

  // Write transposed (coalesced write)
  let out_x = tile_y + local_id.x;
  let out_y = tile_x + local_id.y;

  if (out_x < N && out_y < N) {
    output[out_y * N + out_x] = tile[local_id.x][local_id.y];
  }
}
`}function A(e,r,t){return`
// Unscramble shader for N=${e} = ${r}×${t}
// Maps from four-step output order to natural frequency order
// Input position (r % R) * C + (r / R) -> Output position r

struct UnscrambleParams {
  C: u32,           // Sub-row size
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Elements per original row
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: UnscrambleParams;

@compute @workgroup_size(256, 1, 1)
fn unscramble(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let k = global_id.x;  // Natural frequency index within row
  let row = global_id.y;  // Original row index

  let C = params.C;
  let R = params.R;
  let N = params.N;

  if (k >= N || row >= params.num_original_rows) {
    return;
  }

  // Four-step output: frequency k is at position (k % R) * C + (k / R)
  let scrambled_pos = (k % R) * C + (k / R);

  let input_idx = row * N + scrambled_pos;
  let output_idx = row * N + k;

  output[output_idx] = input[input_idx];
}
`}function V(e,r,t){return`
// Scramble shader for N=${e} = ${r}×${t}
// Maps from natural order to four-step input order (inverse of unscramble)
// Input position r -> Output position (r % R) * C + (r / R)

struct ScrambleParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: ScrambleParams;

@compute @workgroup_size(256, 1, 1)
fn scramble(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let k = global_id.x;  // Natural frequency index within row
  let row = global_id.y;  // Original row index

  let C = params.C;
  let R = params.R;
  let N = params.N;

  if (k >= N || row >= params.num_original_rows) {
    return;
  }

  // Map to four-step order: natural k -> position (k % R) * C + (k / R)
  let scrambled_pos = (k % R) * C + (k / R);

  let input_idx = row * N + k;
  let output_idx = row * N + scrambled_pos;

  output[output_idx] = input[input_idx];
}
`}function Y(e,r){if(e<2||(e&e-1)!==0)throw new Error(`C must be a power of 2 >= 2, got ${e}`);const t=Math.log2(e),p=r*e;return`
// Sub-row FFT shader for C=${e}-point FFTs
// Handles 2D grid with N=${p} = ${r}×${e} elements per original row
// Each workgroup processes one sub-row

struct SubRowFFTParams {
  C: u32,           // Sub-row size (FFT size)
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Total elements per original row (R * C)
  num_sub_rows: u32, // Total sub-rows to process (M * R for M original rows)
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: SubRowFFTParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${t}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

var<workgroup> buffer_a: array<vec2<f32>, ${e}>;
var<workgroup> buffer_b: array<vec2<f32>, ${e}>;

@compute @workgroup_size(${e}, 1, 1)
fn sub_row_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
               @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let sub_row = workgroup_id.x;  // Global sub-row index
  let j = local_id.x;            // Position within sub-row
  let C = ${e}u;
  let R = params.R;
  let N = params.N;

  if (sub_row >= params.num_sub_rows) {
    return;
  }

  // Compute memory offset for this sub-row
  // Sub-row w = sub-row (w % R) of original row (w / R)
  let original_row = sub_row / R;
  let sub_row_index = sub_row % R;
  let base_offset = original_row * N + sub_row_index * C;

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal
  let input_idx = base_offset + bitrev(j);
  buffer_a[j] = input[input_idx];
  workgroupBarrier();

  // ${t} stages of butterflies
  for (var s = 0u; s < ${t}u; s++) {
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

  // Get result from correct buffer
  var result = select(buffer_b[j], buffer_a[j], ${t%2===0?"true":"false"});

  // Normalization (only sqrt(C) since this is one dimension of a 2D FFT)
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(C));
  } else if (!is_forward) {
    result = result / f32(C);
  }

  // Write output at same offset structure
  let output_idx = base_offset + j;
  output[output_idx] = result;
}
`}function J(e,r,t){return`
// Twiddle factor multiplication for hierarchical FFT
// For each original row, multiplies element at sub-row r, position c by W_N^(r*c)

struct TwiddleParams {
  C: u32,           // Sub-row size
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Total elements per original row
  num_original_rows: u32,
  forward: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: TwiddleParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

@compute @workgroup_size(16, 16, 1)
fn twiddle_multiply(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let c = global_id.x;  // column within sub-row (0 to C-1)
  let combined = global_id.y;  // combined index: original_row * R + r

  let C = params.C;
  let R = params.R;
  let N = params.N;

  let original_row = combined / R;
  let r = combined % R;  // sub-row index within original row

  if (c >= C || original_row >= params.num_original_rows) {
    return;
  }

  // Linear index in memory
  let idx = original_row * N + r * C + c;
  let val = input[idx];

  // Twiddle factor: W_N^(r*c)
  let sign = select(1.0, -1.0, params.forward != 0u);
  let PI = 3.14159265358979;
  let angle = sign * 2.0 * PI * f32(r) * f32(c) / f32(N);
  let w = vec2<f32>(cos(angle), sin(angle));

  output[idx] = cmul(val, w);
}
`}function K(e,r){if(e<2||(e&e-1)!==0)throw new Error(`R must be a power of 2, got ${e}`);const t=Math.log2(e);return e<=8?Q(e):`
// Column FFT shader for hierarchical FFT
// For each original row, does R=${e}-point FFTs on C=${r} columns
// Elements at positions c, c+C, c+2C, ..., c+(R-1)*C form one column

struct ColumnFFTParams {
  C: u32,           // Stride between column elements
  R: u32,           // FFT size
  N: u32,           // Elements per original row
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${t}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

var<workgroup> buffer_a: array<vec2<f32>, ${e}>;
var<workgroup> buffer_b: array<vec2<f32>, ${e}>;

@compute @workgroup_size(${e}, 1, 1)
fn column_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  // workgroup_id.x = original_row * C + column
  let combined = workgroup_id.x;
  let original_row = combined / params.C;
  let col = combined % params.C;
  let j = local_id.x;  // position within column (0 to R-1)

  let C = params.C;
  let R = ${e}u;
  let N = params.N;

  if (original_row >= params.num_original_rows) {
    return;
  }

  let base_offset = original_row * N;

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal - column elements are at stride C
  let input_idx = base_offset + bitrev(j) * C + col;
  buffer_a[j] = input[input_idx];
  workgroupBarrier();

  // ${t} stages of butterflies
  for (var s = 0u; s < ${t}u; s++) {
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

  // Get result from correct buffer
  var result = select(buffer_b[j], buffer_a[j], ${t%2===0?"true":"false"});

  // Normalization
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(R));
  } else if (!is_forward) {
    result = result / f32(R);
  }

  // Write output - column elements are at stride C
  let output_idx = base_offset + j * C + col;
  output[output_idx] = result;
}
`}function Q(e,r){if(e===2)return`
// Optimized 2-point column FFT for hierarchical FFT

struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  // global_id.x = original_row * C + column
  let combined = global_id.x;
  let original_row = combined / params.C;
  let col = combined % params.C;

  if (original_row >= params.num_original_rows) {
    return;
  }

  let base = original_row * params.N + col;
  let x0 = input[base];
  let x1 = input[base + params.C];

  var X0 = x0 + x1;
  var X1 = x0 - x1;

  if (params.split_norm != 0u) {
    let norm = 1.0 / sqrt(2.0);
    X0 = X0 * norm;
    X1 = X1 * norm;
  } else if (params.forward == 0u) {
    X0 = X0 * 0.5;
    X1 = X1 * 0.5;
  }

  output[base] = X0;
  output[base + params.C] = X1;
}
`;if(e===4)return`
// Optimized 4-point column FFT for hierarchical FFT

struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let combined = global_id.x;
  let original_row = combined / params.C;
  let col = combined % params.C;

  if (original_row >= params.num_original_rows) {
    return;
  }

  let C = params.C;
  let base = original_row * params.N + col;

  let x0 = input[base];
  let x1 = input[base + C];
  let x2 = input[base + 2u * C];
  let x3 = input[base + 3u * C];

  let sign = select(1.0, -1.0, params.forward != 0u);
  let W1 = vec2<f32>(0.0, sign);  // ±i

  // Radix-4 butterfly
  let a0 = x0 + x2;
  let a1 = x0 - x2;
  let a2 = x1 + x3;
  let a3 = x1 - x3;

  var X0 = a0 + a2;
  var X1 = a1 + cmul(W1, a3);
  var X2 = a0 - a2;
  var X3 = a1 - cmul(W1, a3);

  if (params.split_norm != 0u) {
    let norm = 0.5;
    X0 = X0 * norm;
    X1 = X1 * norm;
    X2 = X2 * norm;
    X3 = X3 * norm;
  } else if (params.forward == 0u) {
    let norm = 0.25;
    X0 = X0 * norm;
    X1 = X1 * norm;
    X2 = X2 * norm;
    X3 = X3 * norm;
  }

  output[base] = X0;
  output[base + C] = X1;
  output[base + 2u * C] = X2;
  output[base + 3u * C] = X3;
}
`;throw new Error(`Unsupported small R: ${e}`)}function Z(e,r){let t=1;for(;t*2<=r&&t*2<=e;)t*=2;const p=e/t;if(!Number.isInteger(p)||(p&p-1)!==0)throw new Error(`Cannot factor N=${e} with maxSize=${r}: R=${p} is not a power of 2`);return{R:p,C:t}}function ee(e,r,t=e.limits.maxComputeWorkgroupSizeX){const p=r>t,u=x(),a=e.createShaderModule({label:"Transpose",code:u}),i=e.createBindGroupLayout({label:"Transpose bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),b=e.createPipelineLayout({bindGroupLayouts:[i]}),m=e.createComputePipeline({label:"Transpose pipeline",layout:b,compute:{module:a,entryPoint:"transpose"}});if(!p){const q=y(r),D=e.createShaderModule({label:`Simple FFT N=${r}`,code:q}),C=e.createBindGroupLayout({label:"Simple FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),H=e.createPipelineLayout({bindGroupLayouts:[C]});return{subRowFFT:null,twiddle:null,columnFFT:null,unscramble:null,scramble:null,simpleFFT:e.createComputePipeline({label:`Simple FFT pipeline N=${r}`,layout:H,compute:{module:D,entryPoint:"fft_horizontal"}}),transpose:m,bindGroupLayouts:{subRowFFT:null,twiddle:null,columnFFT:null,unscramble:null,scramble:null,simpleFFT:C,transpose:i},N:r,R:1,C:r,isLarge:!1}}const{R:l,C:s}=Z(r,t);console.log(`Large FFT: N=${r} = ${l}×${s}, maxWorkgroup=${t}`);const d=Y(s,l),n=J(),_=K(l,s),w=A(r,l,s),g=V(r,l,s),f=y(s),o=e.createShaderModule({label:`Sub-row FFT C=${s}`,code:d}),c=e.createShaderModule({label:`Twiddle N=${r}`,code:n}),S=e.createShaderModule({label:`Column FFT R=${l}`,code:_}),U=e.createShaderModule({label:`Unscramble N=${r}`,code:w}),B=e.createShaderModule({label:`Scramble N=${r}`,code:g}),k=e.createShaderModule({label:`Simple FFT C=${s}`,code:f}),F=e.createBindGroupLayout({label:"Sub-row FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),P=e.createBindGroupLayout({label:"Twiddle bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),h=e.createBindGroupLayout({label:"Column FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),T=e.createBindGroupLayout({label:"Simple FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),G=e.createBindGroupLayout({label:"Unscramble bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),v=e.createBindGroupLayout({label:"Scramble bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),L=e.createPipelineLayout({bindGroupLayouts:[F]}),M=e.createPipelineLayout({bindGroupLayouts:[P]}),$=e.createPipelineLayout({bindGroupLayouts:[h]}),R=e.createPipelineLayout({bindGroupLayouts:[T]}),O=e.createPipelineLayout({bindGroupLayouts:[G]}),E=e.createPipelineLayout({bindGroupLayouts:[v]}),z=e.createComputePipeline({label:`Sub-row FFT pipeline C=${s}`,layout:L,compute:{module:o,entryPoint:"sub_row_fft"}}),j=e.createComputePipeline({label:`Twiddle pipeline N=${r}`,layout:M,compute:{module:c,entryPoint:"twiddle_multiply"}}),X=e.createComputePipeline({label:`Column FFT pipeline R=${l}`,layout:$,compute:{module:S,entryPoint:"column_fft"}}),N=e.createComputePipeline({label:`Simple FFT pipeline C=${s}`,layout:R,compute:{module:k,entryPoint:"fft_horizontal"}}),W=e.createComputePipeline({label:`Unscramble pipeline N=${r}`,layout:O,compute:{module:U,entryPoint:"unscramble"}}),I=e.createComputePipeline({label:`Scramble pipeline N=${r}`,layout:E,compute:{module:B,entryPoint:"scramble"}});return{subRowFFT:z,twiddle:j,columnFFT:X,unscramble:W,scramble:I,simpleFFT:N,transpose:m,bindGroupLayouts:{subRowFFT:F,twiddle:P,columnFFT:h,unscramble:G,scramble:v,simpleFFT:T,transpose:i},N:r,R:l,C:s,isLarge:p}}function re(e){const{device:r,pipelines:t,input:p,output:u,temp:a,N:i,forward:b,splitNormalization:m}=e,{R:l,C:s,isLarge:d}=t,n=r.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});if(r.queue.writeBuffer(n,0,new Uint32Array([i])),!d){oe(r,t,p,u,a,i,b,m,n);return}te(r,t,p,u,a,i,l,s,b,m,n)}function oe(e,r,t,p,u,a,i,b,m){const l=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(l,0,new Uint32Array([a,a,i?1:0,b?1:0]));const s=e.createCommandEncoder({label:"Simple 2D FFT"});{const d=e.createBindGroup({layout:r.bindGroupLayouts.simpleFFT,entries:[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:l}}]}),n=s.beginComputePass({label:"Horizontal FFT"});n.setPipeline(r.simpleFFT),n.setBindGroup(0,d),n.dispatchWorkgroups(a,1,1),n.end()}{const d=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:u[1]}},{binding:2,resource:{buffer:m}}]}),n=s.beginComputePass({label:"Transpose 1"});n.setPipeline(r.transpose),n.setBindGroup(0,d),n.dispatchWorkgroups(Math.ceil(a/16),Math.ceil(a/16),1),n.end()}{const d=e.createBindGroup({layout:r.bindGroupLayouts.simpleFFT,entries:[{binding:0,resource:{buffer:u[1]}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:l}}]}),n=s.beginComputePass({label:"Vertical FFT"});n.setPipeline(r.simpleFFT),n.setBindGroup(0,d),n.dispatchWorkgroups(a,1,1),n.end()}{const d=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:p}},{binding:2,resource:{buffer:m}}]}),n=s.beginComputePass({label:"Transpose 2"});n.setPipeline(r.transpose),n.setBindGroup(0,d),n.dispatchWorkgroups(Math.ceil(a/16),Math.ceil(a/16),1),n.end()}e.queue.submit([s.finish()])}function te(e,r,t,p,u,a,i,b,m,l,s){const d=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(d,0,new Uint32Array([b,i,a,a*i,m?1:0,l?1:0]));const n=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(n,0,new Uint32Array([b,i,a,a,m?1:0]));const _=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(_,0,new Uint32Array([b,i,a,a,m?1:0,l?1:0]));const w=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(w,0,new Uint32Array([b,i,a,a]));const g=e.createCommandEncoder({label:"Hierarchical 2D FFT"});{const f=e.createBindGroup({layout:r.bindGroupLayouts.columnFFT,entries:[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:_}}]}),o=g.beginComputePass({label:"H Column FFT"});o.setPipeline(r.columnFFT),o.setBindGroup(0,f),i<=8?o.dispatchWorkgroups(Math.ceil(a*b/256),1,1):o.dispatchWorkgroups(a*b,1,1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.twiddle,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:u[1]}},{binding:2,resource:{buffer:n}}]}),o=g.beginComputePass({label:"H Twiddle"});o.setPipeline(r.twiddle),o.setBindGroup(0,f),o.dispatchWorkgroups(Math.ceil(b/16),Math.ceil(a*i/16),1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.subRowFFT,entries:[{binding:0,resource:{buffer:u[1]}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:d}}]}),o=g.beginComputePass({label:"H Sub-row FFT"});o.setPipeline(r.subRowFFT),o.setBindGroup(0,f),o.dispatchWorkgroups(a*i,1,1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.unscramble,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:u[1]}},{binding:2,resource:{buffer:w}}]}),o=g.beginComputePass({label:"H Unscramble"});o.setPipeline(r.unscramble),o.setBindGroup(0,f),o.dispatchWorkgroups(Math.ceil(a/256),a,1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:u[1]}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:s}}]}),o=g.beginComputePass({label:"Transpose 1"});o.setPipeline(r.transpose),o.setBindGroup(0,f),o.dispatchWorkgroups(Math.ceil(a/16),Math.ceil(a/16),1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.columnFFT,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:u[1]}},{binding:2,resource:{buffer:_}}]}),o=g.beginComputePass({label:"V Column FFT"});o.setPipeline(r.columnFFT),o.setBindGroup(0,f),i<=8?o.dispatchWorkgroups(Math.ceil(a*b/256),1,1):o.dispatchWorkgroups(a*b,1,1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.twiddle,entries:[{binding:0,resource:{buffer:u[1]}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:n}}]}),o=g.beginComputePass({label:"V Twiddle"});o.setPipeline(r.twiddle),o.setBindGroup(0,f),o.dispatchWorkgroups(Math.ceil(b/16),Math.ceil(a*i/16),1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.subRowFFT,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:u[1]}},{binding:2,resource:{buffer:d}}]}),o=g.beginComputePass({label:"V Sub-row FFT"});o.setPipeline(r.subRowFFT),o.setBindGroup(0,f),o.dispatchWorkgroups(a*i,1,1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.unscramble,entries:[{binding:0,resource:{buffer:u[1]}},{binding:1,resource:{buffer:u[0]}},{binding:2,resource:{buffer:w}}]}),o=g.beginComputePass({label:"V Unscramble"});o.setPipeline(r.unscramble),o.setBindGroup(0,f),o.dispatchWorkgroups(Math.ceil(a/256),a,1),o.end()}{const f=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:u[0]}},{binding:1,resource:{buffer:p}},{binding:2,resource:{buffer:s}}]}),o=g.beginComputePass({label:"Transpose 2"});o.setPipeline(r.transpose),o.setBindGroup(0,f),o.dispatchWorkgroups(Math.ceil(a/16),Math.ceil(a/16),1),o.end()}e.queue.submit([g.finish()])}function ie(e,r){if(r<2||(r&r-1)!==0)throw new Error(`N must be a power of 2, got ${r}`);const t=e.limits.maxComputeWorkgroupSizeX;if(r>t){const g=ee(e,r);return{fftHorizontal:null,fftVertical:null,transpose:g.transpose,bindGroupLayouts:{fft:null,transpose:g.bindGroupLayouts.transpose},N:r,largePipelines:g,isLarge:!0}}const u=y(r),a=x(),i=e.createShaderModule({label:`FFT Stockham shader N=${r}`,code:u}),b=e.createShaderModule({label:"Transpose shader",code:a}),m=e.createBindGroupLayout({label:"FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),l=e.createBindGroupLayout({label:"Transpose bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),s=e.createPipelineLayout({label:"FFT pipeline layout",bindGroupLayouts:[m]}),d=e.createPipelineLayout({label:"Transpose pipeline layout",bindGroupLayouts:[l]}),n=e.createComputePipeline({label:`FFT horizontal pipeline N=${r}`,layout:s,compute:{module:i,entryPoint:"fft_horizontal"}}),_=e.createComputePipeline({label:`FFT vertical pipeline N=${r}`,layout:s,compute:{module:i,entryPoint:"fft_vertical"}}),w=e.createComputePipeline({label:"Transpose pipeline",layout:d,compute:{module:b,entryPoint:"transpose"}});return{fftHorizontal:n,fftVertical:_,transpose:w,bindGroupLayouts:{fft:m,transpose:l},N:r,largePipelines:null,isLarge:!1}}function ue(e){const{device:r,pipelines:t,input:p,output:u,temp:a,N:i,forward:b,splitNormalization:m}=e;if(i!==t.N)throw new Error(`N=${i} doesn't match pipeline N=${t.N}`);if(t.isLarge&&t.largePipelines){re({device:r,pipelines:t.largePipelines,input:p,output:u,temp:a,N:i,forward:b,splitNormalization:m});return}if(!t.fftHorizontal||!t.fftVertical||!t.bindGroupLayouts.fft)throw new Error("Simple FFT pipelines not available");const l=r.createBuffer({label:"FFT params uniform",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s=new Uint32Array([i,i,b?1:0,m?1:0]);r.queue.writeBuffer(l,0,s);const d=r.createBuffer({label:"Transpose params uniform",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),n=new Uint32Array([i]);r.queue.writeBuffer(d,0,n);const _=r.createBindGroup({label:"FFT horizontal bind group",layout:t.bindGroupLayouts.fft,entries:[{binding:0,resource:{buffer:p}},{binding:1,resource:{buffer:a[0]}},{binding:2,resource:{buffer:l}}]}),w=r.createBindGroup({label:"Transpose 1 bind group",layout:t.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:a[0]}},{binding:1,resource:{buffer:a[1]}},{binding:2,resource:{buffer:d}}]}),g=r.createBindGroup({label:"FFT vertical bind group",layout:t.bindGroupLayouts.fft,entries:[{binding:0,resource:{buffer:a[1]}},{binding:1,resource:{buffer:a[0]}},{binding:2,resource:{buffer:l}}]}),f=r.createBindGroup({label:"Transpose 2 bind group",layout:t.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:a[0]}},{binding:1,resource:{buffer:u}},{binding:2,resource:{buffer:d}}]}),o=r.createCommandEncoder({label:"FFT 2D command encoder"});{const c=o.beginComputePass({label:"FFT horizontal pass"});c.setPipeline(t.fftHorizontal),c.setBindGroup(0,_),c.dispatchWorkgroups(i,1,1),c.end()}{const c=o.beginComputePass({label:"Transpose 1 pass"});c.setPipeline(t.transpose),c.setBindGroup(0,w),c.dispatchWorkgroups(Math.ceil(i/16),Math.ceil(i/16),1),c.end()}{const c=o.beginComputePass({label:"FFT vertical pass"});c.setPipeline(t.fftVertical),c.setBindGroup(0,g),c.dispatchWorkgroups(i,1,1),c.end()}{const c=o.beginComputePass({label:"Transpose 2 pass"});c.setPipeline(t.transpose),c.setBindGroup(0,f),c.dispatchWorkgroups(Math.ceil(i/16),Math.ceil(i/16),1),c.end()}r.queue.submit([o.finish()])}export{ie as createFFTPipelines,ue as executeFFT2D};
