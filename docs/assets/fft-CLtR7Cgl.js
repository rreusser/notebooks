function F(e,r="f32"){if(e==null||!Number.isInteger(e)||e<2||(e&e-1)!==0)throw new Error(`N must be a power of 2 integer >= 2, got ${e}`);const t=Math.log2(e),u=r==="f16"?"vec2<f16>":"vec2<f32>",n=r==="f16"?`enable f16;
`:"",o=r==="f16"?"vec2<f32>":"",i=r==="f16"?"vec2<f16>":"";return`
// Generated FFT Shader for N=${e}
// Cooley-Tukey Radix-2 DIT FFT with bit-reversal permutation
// Storage: ${r}, Computation: f32

${n}
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

@group(0) @binding(0) var<storage, read> input: array<${u}>;
@group(0) @binding(1) var<storage, read_write> output: array<${u}>;
@group(0) @binding(2) var<uniform> params: FFTParams;

var<workgroup> buffer_a: array<vec2<f32>, ${e}>;
var<workgroup> buffer_b: array<vec2<f32>, ${e}>;

// Bit-reverse for ${t} bits
fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${t}u; i++) {
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
  buffer_a[j] = ${o}(input[input_idx]);
  workgroupBarrier();

  // ${t} stages of butterflies using ping-pong buffers
  for (var s = 0u; s < ${t}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${t%2===0?"true":"false"});

  // Normalization
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  // Write output
  let output_idx = row * N + j;
  output[output_idx] = ${i}(result);
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

  // Load with bit-reversal
  let input_idx = row * N + bitrev(j);
  buffer_a[j] = ${o}(input[input_idx]);
  workgroupBarrier();

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

  // After log2N stages, result is in buffer_a if last stage (log2N-1) is odd
  // Last stage is odd when log2N is even
  var result = select(buffer_b[j], buffer_a[j], ${t%2===0?"true":"false"});

  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  // Write output
  let output_idx = row * N + j;
  output[output_idx] = ${i}(result);
}
`}function $(e="f32"){const r=e==="f16"?"vec2<f16>":"vec2<f32>";return`
// Matrix transpose shader
// Uses 16x16 tiles for coalesced memory access
// Storage: ${e}, Computation: f32

${e==="f16"?`enable f16;
`:""}
struct TransposeParams {
  N: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${r}>;
@group(0) @binding(1) var<storage, read_write> output: array<${r}>;
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
    tile[local_id.y][local_id.x] = ${e==="f16"?"vec2<f32>":""}(input[y * N + x]);
  }

  workgroupBarrier();

  // Write transposed (coalesced write)
  let out_x = tile_y + local_id.x;
  let out_y = tile_x + local_id.y;

  if (out_x < N && out_y < N) {
    output[out_y * N + out_x] = ${e==="f16"?"vec2<f16>":""}(tile[local_id.x][local_id.y]);
  }
}
`}function y(e){return{storageType:e==="f16"?"vec2<f16>":"vec2<f32>",enableF16:e==="f16"?`enable f16;
`:"",loadConvert:e==="f16"?"vec2<f32>":"",storeConvert:e==="f16"?"vec2<f16>":""}}function Y(e,r,t,u="f32"){const{storageType:n,enableF16:o}=y(u);return`
// Unscramble shader for N=${e} = ${r}×${t}
// Maps from four-step output order to natural frequency order
// Input position (r % R) * C + (r / R) -> Output position r
// Storage: ${u}

${o}
struct UnscrambleParams {
  C: u32,           // Sub-row size
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Elements per original row
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${n}>;
@group(0) @binding(1) var<storage, read_write> output: array<${n}>;
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
`}function J(e,r,t,u="f32"){const{storageType:n,enableF16:o}=y(u);return`
// Scramble shader for N=${e} = ${r}×${t}
// Maps from natural order to four-step input order (inverse of unscramble)
// Input position r -> Output position (r % R) * C + (r / R)
// Storage: ${u}

${o}
struct ScrambleParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${n}>;
@group(0) @binding(1) var<storage, read_write> output: array<${n}>;
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
`}function K(e,r,t="f32"){if(e<2||(e&e-1)!==0)throw new Error(`C must be a power of 2 >= 2, got ${e}`);const u=Math.log2(e),n=r*e,{storageType:o,enableF16:i,loadConvert:f,storeConvert:c}=y(t);return`
// Sub-row FFT shader for C=${e}-point FFTs
// Handles 2D grid with N=${n} = ${r}×${e} elements per original row
// Each workgroup processes one sub-row
// Storage: ${t}

${i}
struct SubRowFFTParams {
  C: u32,           // Sub-row size (FFT size)
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Total elements per original row (R * C)
  num_sub_rows: u32, // Total sub-rows to process (M * R for M original rows)
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${o}>;
@group(0) @binding(1) var<storage, read_write> output: array<${o}>;
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
  for (var i = 0u; i < ${u}u; i++) {
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
  // 2D dispatch: x = sub-row within original row, y = original row
  let sub_row_index = workgroup_id.x;
  let original_row = workgroup_id.y;
  let sub_row = original_row * params.R + sub_row_index;  // Global sub-row index
  let j = local_id.x;            // Position within sub-row
  let C = ${e}u;
  let R = params.R;
  let N = params.N;

  if (sub_row >= params.num_sub_rows) {
    return;
  }
  let base_offset = original_row * N + sub_row_index * C;

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal
  let input_idx = base_offset + bitrev(j);
  buffer_a[j] = ${f}(input[input_idx]);
  workgroupBarrier();

  // ${u} stages of butterflies
  for (var s = 0u; s < ${u}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${u%2===0?"true":"false"});

  // Normalization (only sqrt(C) since this is one dimension of a 2D FFT)
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(C));
  } else if (!is_forward) {
    result = result / f32(C);
  }

  // Write output at same offset structure
  let output_idx = base_offset + j;
  output[output_idx] = ${c}(result);
}
`}function Q(e,r,t,u="f32"){const{storageType:n,enableF16:o,loadConvert:i,storeConvert:f}=y(u);return`
// Twiddle factor multiplication for hierarchical FFT
// For each original row, multiplies element at sub-row r, position c by W_N^(r*c)
// Storage: ${u}

${o}
struct TwiddleParams {
  C: u32,           // Sub-row size
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Total elements per original row
  num_original_rows: u32,
  forward: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${n}>;
@group(0) @binding(1) var<storage, read_write> output: array<${n}>;
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
  let val = ${i}(input[idx]);

  // Twiddle factor: W_N^(r*c)
  let sign = select(1.0, -1.0, params.forward != 0u);
  let PI = 3.14159265358979;
  let angle = sign * 2.0 * PI * f32(r) * f32(c) / f32(N);
  let w = vec2<f32>(cos(angle), sin(angle));

  output[idx] = ${f}(cmul(val, w));
}
`}function Z(e,r,t="f32"){if(e<2||(e&e-1)!==0)throw new Error(`R must be a power of 2, got ${e}`);const u=Math.log2(e);if(e<=8)return ee(e,r,t);const{storageType:n,enableF16:o,loadConvert:i,storeConvert:f}=y(t);return`
// Column FFT shader for hierarchical FFT
// For each original row, does R=${e}-point FFTs on C=${r} columns
// Elements at positions c, c+C, c+2C, ..., c+(R-1)*C form one column
// Storage: ${t}

${o}
struct ColumnFFTParams {
  C: u32,           // Stride between column elements
  R: u32,           // FFT size
  N: u32,           // Elements per original row
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${n}>;
@group(0) @binding(1) var<storage, read_write> output: array<${n}>;
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
  for (var i = 0u; i < ${u}u; i++) {
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
  // 2D dispatch: workgroup_id.x = column, workgroup_id.y = original_row
  let col = workgroup_id.x;
  let original_row = workgroup_id.y;
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
  buffer_a[j] = ${i}(input[input_idx]);
  workgroupBarrier();

  // ${u} stages of butterflies
  for (var s = 0u; s < ${u}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${u%2===0?"true":"false"});

  // Normalization
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(R));
  } else if (!is_forward) {
    result = result / f32(R);
  }

  // Write output - column elements are at stride C
  let output_idx = base_offset + j * C + col;
  output[output_idx] = ${f}(result);
}
`}function ee(e,r,t){const{storageType:u,enableF16:n,loadConvert:o,storeConvert:i}=y(t);if(e===2)return`
// Optimized 2-point column FFT for hierarchical FFT
// Storage: ${t}

${n}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${u}>;
@group(0) @binding(1) var<storage, read_write> output: array<${u}>;
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
  let x0 = ${o}(input[base]);
  let x1 = ${o}(input[base + params.C]);

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

  output[base] = ${i}(X0);
  output[base + params.C] = ${i}(X1);
}
`;if(e===4)return`
// Optimized 4-point column FFT for hierarchical FFT
// Storage: ${t}

${n}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${u}>;
@group(0) @binding(1) var<storage, read_write> output: array<${u}>;
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

  let x0 = ${o}(input[base]);
  let x1 = ${o}(input[base + C]);
  let x2 = ${o}(input[base + 2u * C]);
  let x3 = ${o}(input[base + 3u * C]);

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

  output[base] = ${i}(X0);
  output[base + C] = ${i}(X1);
  output[base + 2u * C] = ${i}(X2);
  output[base + 3u * C] = ${i}(X3);
}
`;if(e===8)return`
// Optimized 8-point column FFT for hierarchical FFT (radix-2, 3 stages)
// Storage: ${t}

${n}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${u}>;
@group(0) @binding(1) var<storage, read_write> output: array<${u}>;
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

  // Load in bit-reversed order: 0,4,2,6,1,5,3,7
  let x0 = ${o}(input[base]);
  let x1 = ${o}(input[base + 4u * C]);
  let x2 = ${o}(input[base + 2u * C]);
  let x3 = ${o}(input[base + 6u * C]);
  let x4 = ${o}(input[base + C]);
  let x5 = ${o}(input[base + 5u * C]);
  let x6 = ${o}(input[base + 3u * C]);
  let x7 = ${o}(input[base + 7u * C]);

  let sign = select(1.0, -1.0, params.forward != 0u);
  let PI = 3.14159265358979;

  // Twiddle factors
  let W8_1 = vec2<f32>(cos(sign * PI / 4.0), sin(sign * PI / 4.0));  // W_8^1
  let W8_2 = vec2<f32>(0.0, sign);  // W_8^2 = ±i
  let W8_3 = vec2<f32>(cos(sign * 3.0 * PI / 4.0), sin(sign * 3.0 * PI / 4.0));  // W_8^3

  // Stage 1: 4 butterflies of size 2
  let a0 = x0 + x1;
  let a1 = x0 - x1;
  let a2 = x2 + x3;
  let a3 = x2 - x3;
  let a4 = x4 + x5;
  let a5 = x4 - x5;
  let a6 = x6 + x7;
  let a7 = x6 - x7;

  // Stage 2: 2 butterflies of size 4
  let b0 = a0 + a2;
  let b1 = a1 + cmul(W8_2, a3);
  let b2 = a0 - a2;
  let b3 = a1 - cmul(W8_2, a3);
  let b4 = a4 + a6;
  let b5 = a5 + cmul(W8_2, a7);
  let b6 = a4 - a6;
  let b7 = a5 - cmul(W8_2, a7);

  // Stage 3: 1 butterfly of size 8 with twiddles
  var X0 = b0 + b4;
  var X1 = b1 + cmul(W8_1, b5);
  var X2 = b2 + cmul(W8_2, b6);
  var X3 = b3 + cmul(W8_3, b7);
  var X4 = b0 - b4;
  var X5 = b1 - cmul(W8_1, b5);
  var X6 = b2 - cmul(W8_2, b6);
  var X7 = b3 - cmul(W8_3, b7);

  // Normalization
  if (params.split_norm != 0u) {
    let norm = 0.35355339059;  // 1/sqrt(8)
    X0 = X0 * norm;
    X1 = X1 * norm;
    X2 = X2 * norm;
    X3 = X3 * norm;
    X4 = X4 * norm;
    X5 = X5 * norm;
    X6 = X6 * norm;
    X7 = X7 * norm;
  } else if (params.forward == 0u) {
    let norm = 0.125;  // 1/8
    X0 = X0 * norm;
    X1 = X1 * norm;
    X2 = X2 * norm;
    X3 = X3 * norm;
    X4 = X4 * norm;
    X5 = X5 * norm;
    X6 = X6 * norm;
    X7 = X7 * norm;
  }

  output[base] = ${i}(X0);
  output[base + C] = ${i}(X1);
  output[base + 2u * C] = ${i}(X2);
  output[base + 3u * C] = ${i}(X3);
  output[base + 4u * C] = ${i}(X4);
  output[base + 5u * C] = ${i}(X5);
  output[base + 6u * C] = ${i}(X6);
  output[base + 7u * C] = ${i}(X7);
}
`;throw new Error(`Unsupported small R: ${e}`)}function re(e,r){let t=1;for(;t*2<=r&&t*2<=e;)t*=2;const u=e/t;if(!Number.isInteger(u)||(u&u-1)!==0)throw new Error(`Cannot factor N=${e} with maxSize=${r}: R=${u} is not a power of 2`);return{R:u,C:t}}function oe(e,r,t=e.limits.maxComputeWorkgroupSizeX,u="f32"){const n=r>t,o=$(u),i=e.createShaderModule({label:"Transpose",code:o}),f=e.createBindGroupLayout({label:"Transpose bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),c=e.createPipelineLayout({bindGroupLayouts:[f]}),g=e.createComputePipeline({label:"Transpose pipeline",layout:c,compute:{module:i,entryPoint:"transpose"}});if(!n){const H=F(r,u),A=e.createShaderModule({label:`Simple FFT N=${r}`,code:H}),G=e.createBindGroupLayout({label:"Simple FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),V=e.createPipelineLayout({bindGroupLayouts:[G]});return{subRowFFT:null,twiddle:null,columnFFT:null,unscramble:null,scramble:null,simpleFFT:e.createComputePipeline({label:`Simple FFT pipeline N=${r}`,layout:V,compute:{module:A,entryPoint:"fft_horizontal"}}),transpose:g,bindGroupLayouts:{subRowFFT:null,twiddle:null,columnFFT:null,unscramble:null,scramble:null,simpleFFT:G,transpose:f},N:r,R:1,C:r,isLarge:!1}}const{R:p,C:s}=re(r,t);console.log(`Large FFT: N=${r} = ${p}×${s}, maxWorkgroup=${t}, precision=${u}`);const l=K(s,p,u),_=Q(r,p,s,u),w=Z(p,s,u),m=Y(r,p,s,u),b=J(r,p,s,u),a=F(s,u),d=e.createShaderModule({label:`Sub-row FFT C=${s}`,code:l}),S=e.createShaderModule({label:`Twiddle N=${r}`,code:_}),U=e.createShaderModule({label:`Column FFT R=${p}`,code:w}),B=e.createShaderModule({label:`Unscramble N=${r}`,code:m}),k=e.createShaderModule({label:`Scramble N=${r}`,code:b}),L=e.createShaderModule({label:`Simple FFT C=${s}`,code:a}),P=e.createBindGroupLayout({label:"Sub-row FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),T=e.createBindGroupLayout({label:"Twiddle bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),h=e.createBindGroupLayout({label:"Column FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),C=e.createBindGroupLayout({label:"Simple FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),v=e.createBindGroupLayout({label:"Unscramble bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),x=e.createBindGroupLayout({label:"Scramble bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),M=e.createPipelineLayout({bindGroupLayouts:[P]}),X=e.createPipelineLayout({bindGroupLayouts:[T]}),R=e.createPipelineLayout({bindGroupLayouts:[h]}),O=e.createPipelineLayout({bindGroupLayouts:[C]}),z=e.createPipelineLayout({bindGroupLayouts:[v]}),W=e.createPipelineLayout({bindGroupLayouts:[x]}),E=e.createComputePipeline({label:`Sub-row FFT pipeline C=${s}`,layout:M,compute:{module:d,entryPoint:"sub_row_fft"}}),j=e.createComputePipeline({label:`Twiddle pipeline N=${r}`,layout:X,compute:{module:S,entryPoint:"twiddle_multiply"}}),N=e.createComputePipeline({label:`Column FFT pipeline R=${p}`,layout:R,compute:{module:U,entryPoint:"column_fft"}}),I=e.createComputePipeline({label:`Simple FFT pipeline C=${s}`,layout:O,compute:{module:L,entryPoint:"fft_horizontal"}}),q=e.createComputePipeline({label:`Unscramble pipeline N=${r}`,layout:z,compute:{module:B,entryPoint:"unscramble"}}),D=e.createComputePipeline({label:`Scramble pipeline N=${r}`,layout:W,compute:{module:k,entryPoint:"scramble"}});return{subRowFFT:E,twiddle:j,columnFFT:N,unscramble:q,scramble:D,simpleFFT:I,transpose:g,bindGroupLayouts:{subRowFFT:P,twiddle:T,columnFFT:h,unscramble:v,scramble:x,simpleFFT:C,transpose:f},N:r,R:p,C:s,isLarge:n}}function te(e){const{device:r,pipelines:t,input:u,output:n,temp:o,N:i,forward:f,splitNormalization:c}=e,{R:g,C:p,isLarge:s}=t,l=r.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});if(r.queue.writeBuffer(l,0,new Uint32Array([i])),!s){ae(r,t,u,n,o,i,f,c,l);return}ue(r,t,u,n,o,i,g,p,f,c,l)}function ae(e,r,t,u,n,o,i,f,c){const g=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(g,0,new Uint32Array([o,o,i?1:0,f?1:0]));const p=e.createCommandEncoder({label:"Simple 2D FFT"});{const s=e.createBindGroup({layout:r.bindGroupLayouts.simpleFFT,entries:[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:g}}]}),l=p.beginComputePass({label:"Horizontal FFT"});l.setPipeline(r.simpleFFT),l.setBindGroup(0,s),l.dispatchWorkgroups(o,1,1),l.end()}{const s=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:n[1]}},{binding:2,resource:{buffer:c}}]}),l=p.beginComputePass({label:"Transpose 1"});l.setPipeline(r.transpose),l.setBindGroup(0,s),l.dispatchWorkgroups(Math.ceil(o/16),Math.ceil(o/16),1),l.end()}{const s=e.createBindGroup({layout:r.bindGroupLayouts.simpleFFT,entries:[{binding:0,resource:{buffer:n[1]}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:g}}]}),l=p.beginComputePass({label:"Vertical FFT"});l.setPipeline(r.simpleFFT),l.setBindGroup(0,s),l.dispatchWorkgroups(o,1,1),l.end()}{const s=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:u}},{binding:2,resource:{buffer:c}}]}),l=p.beginComputePass({label:"Transpose 2"});l.setPipeline(r.transpose),l.setBindGroup(0,s),l.dispatchWorkgroups(Math.ceil(o/16),Math.ceil(o/16),1),l.end()}e.queue.submit([p.finish()])}function ue(e,r,t,u,n,o,i,f,c,g,p){const s=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(s,0,new Uint32Array([f,i,o,o*i,c?1:0,g?1:0]));const l=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(l,0,new Uint32Array([f,i,o,o,c?1:0]));const _=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(_,0,new Uint32Array([f,i,o,o,c?1:0,g?1:0]));const w=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(w,0,new Uint32Array([f,i,o,o]));const m=e.createCommandEncoder({label:"Hierarchical 2D FFT"});{const b=e.createBindGroup({layout:r.bindGroupLayouts.columnFFT,entries:[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:_}}]}),a=m.beginComputePass({label:"H Column FFT"});a.setPipeline(r.columnFFT),a.setBindGroup(0,b),i<=8?a.dispatchWorkgroups(Math.ceil(o*f/256),1,1):a.dispatchWorkgroups(f,o,1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.twiddle,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:n[1]}},{binding:2,resource:{buffer:l}}]}),a=m.beginComputePass({label:"H Twiddle"});a.setPipeline(r.twiddle),a.setBindGroup(0,b),a.dispatchWorkgroups(Math.ceil(f/16),Math.ceil(o*i/16),1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.subRowFFT,entries:[{binding:0,resource:{buffer:n[1]}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:s}}]}),a=m.beginComputePass({label:"H Sub-row FFT"});a.setPipeline(r.subRowFFT),a.setBindGroup(0,b),a.dispatchWorkgroups(i,o,1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.unscramble,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:n[1]}},{binding:2,resource:{buffer:w}}]}),a=m.beginComputePass({label:"H Unscramble"});a.setPipeline(r.unscramble),a.setBindGroup(0,b),a.dispatchWorkgroups(Math.ceil(o/256),o,1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:n[1]}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:p}}]}),a=m.beginComputePass({label:"Transpose 1"});a.setPipeline(r.transpose),a.setBindGroup(0,b),a.dispatchWorkgroups(Math.ceil(o/16),Math.ceil(o/16),1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.columnFFT,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:n[1]}},{binding:2,resource:{buffer:_}}]}),a=m.beginComputePass({label:"V Column FFT"});a.setPipeline(r.columnFFT),a.setBindGroup(0,b),i<=8?a.dispatchWorkgroups(Math.ceil(o*f/256),1,1):a.dispatchWorkgroups(f,o,1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.twiddle,entries:[{binding:0,resource:{buffer:n[1]}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:l}}]}),a=m.beginComputePass({label:"V Twiddle"});a.setPipeline(r.twiddle),a.setBindGroup(0,b),a.dispatchWorkgroups(Math.ceil(f/16),Math.ceil(o*i/16),1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.subRowFFT,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:n[1]}},{binding:2,resource:{buffer:s}}]}),a=m.beginComputePass({label:"V Sub-row FFT"});a.setPipeline(r.subRowFFT),a.setBindGroup(0,b),a.dispatchWorkgroups(i,o,1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.unscramble,entries:[{binding:0,resource:{buffer:n[1]}},{binding:1,resource:{buffer:n[0]}},{binding:2,resource:{buffer:w}}]}),a=m.beginComputePass({label:"V Unscramble"});a.setPipeline(r.unscramble),a.setBindGroup(0,b),a.dispatchWorkgroups(Math.ceil(o/256),o,1),a.end()}{const b=e.createBindGroup({layout:r.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:n[0]}},{binding:1,resource:{buffer:u}},{binding:2,resource:{buffer:p}}]}),a=m.beginComputePass({label:"Transpose 2"});a.setPipeline(r.transpose),a.setBindGroup(0,b),a.dispatchWorkgroups(Math.ceil(o/16),Math.ceil(o/16),1),a.end()}e.queue.submit([m.finish()])}function ne(e,r,t="f32"){if(r<2||(r&r-1)!==0)throw new Error(`N must be a power of 2, got ${r}`);const u=e.limits.maxComputeWorkgroupSizeX;if(r>u){const b=oe(e,r,u,t);return{fftHorizontal:null,fftVertical:null,transpose:b.transpose,bindGroupLayouts:{fft:null,transpose:b.bindGroupLayouts.transpose},N:r,largePipelines:b,isLarge:!0}}const o=F(r,t),i=$(t),f=e.createShaderModule({label:`FFT Cooley-Tukey shader N=${r}`,code:o}),c=e.createShaderModule({label:"Transpose shader",code:i}),g=e.createBindGroupLayout({label:"FFT bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),p=e.createBindGroupLayout({label:"Transpose bind group layout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),s=e.createPipelineLayout({label:"FFT pipeline layout",bindGroupLayouts:[g]}),l=e.createPipelineLayout({label:"Transpose pipeline layout",bindGroupLayouts:[p]}),_=e.createComputePipeline({label:`FFT horizontal pipeline N=${r}`,layout:s,compute:{module:f,entryPoint:"fft_horizontal"}}),w=e.createComputePipeline({label:`FFT vertical pipeline N=${r}`,layout:s,compute:{module:f,entryPoint:"fft_vertical"}}),m=e.createComputePipeline({label:"Transpose pipeline",layout:l,compute:{module:c,entryPoint:"transpose"}});return{fftHorizontal:_,fftVertical:w,transpose:m,bindGroupLayouts:{fft:g,transpose:p},N:r,largePipelines:null,isLarge:!1}}function se(e){const{device:r,pipelines:t,input:u,output:n,temp:o,N:i,forward:f,splitNormalization:c}=e;if(i!==t.N)throw new Error(`N=${i} doesn't match pipeline N=${t.N}`);if(t.isLarge&&t.largePipelines){te({device:r,pipelines:t.largePipelines,input:u,output:n,temp:o,N:i,forward:f,splitNormalization:c});return}if(!t.fftHorizontal||!t.fftVertical||!t.bindGroupLayouts.fft)throw new Error("Simple FFT pipelines not available");const g=r.createBuffer({label:"FFT params uniform",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),p=new Uint32Array([i,i,f?1:0,c?1:0]);r.queue.writeBuffer(g,0,p);const s=r.createBuffer({label:"Transpose params uniform",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=new Uint32Array([i]);r.queue.writeBuffer(s,0,l);const _=r.createBindGroup({label:"FFT horizontal bind group",layout:t.bindGroupLayouts.fft,entries:[{binding:0,resource:{buffer:u}},{binding:1,resource:{buffer:o[0]}},{binding:2,resource:{buffer:g}}]}),w=r.createBindGroup({label:"Transpose 1 bind group",layout:t.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:o[0]}},{binding:1,resource:{buffer:o[1]}},{binding:2,resource:{buffer:s}}]}),m=r.createBindGroup({label:"FFT vertical bind group",layout:t.bindGroupLayouts.fft,entries:[{binding:0,resource:{buffer:o[1]}},{binding:1,resource:{buffer:o[0]}},{binding:2,resource:{buffer:g}}]}),b=r.createBindGroup({label:"Transpose 2 bind group",layout:t.bindGroupLayouts.transpose,entries:[{binding:0,resource:{buffer:o[0]}},{binding:1,resource:{buffer:n}},{binding:2,resource:{buffer:s}}]}),a=r.createCommandEncoder({label:"FFT 2D command encoder"});{const d=a.beginComputePass({label:"FFT horizontal pass"});d.setPipeline(t.fftHorizontal),d.setBindGroup(0,_),d.dispatchWorkgroups(i,1,1),d.end()}{const d=a.beginComputePass({label:"Transpose 1 pass"});d.setPipeline(t.transpose),d.setBindGroup(0,w),d.dispatchWorkgroups(Math.ceil(i/16),Math.ceil(i/16),1),d.end()}{const d=a.beginComputePass({label:"FFT vertical pass"});d.setPipeline(t.fftVertical),d.setBindGroup(0,m),d.dispatchWorkgroups(i,1,1),d.end()}{const d=a.beginComputePass({label:"Transpose 2 pass"});d.setPipeline(t.transpose),d.setBindGroup(0,b),d.dispatchWorkgroups(Math.ceil(i/16),Math.ceil(i/16),1),d.end()}r.queue.submit([a.finish()])}export{ne as createFFTPipelines,se as executeFFT2D};
