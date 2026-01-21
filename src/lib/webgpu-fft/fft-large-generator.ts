/**
 * Large FFT Shader Generator (Hierarchical/Four-Step approach)
 *
 * For N > maxWorkgroupSize, we decompose N = R × C where:
 * - C ≤ maxWorkgroupSize (column count, handled by existing FFT)
 * - R = N/C (row count, small FFT done across rows)
 *
 * Four-step algorithm for 1D FFT of size N = R × C:
 * 1. C-point FFT on each of R sub-rows (uses small FFT)
 * 2. Twiddle multiply: element (r,c) *= W_N^(r*c)
 * 3. R-point FFT on each of C columns
 *
 * For 2D FFT of an M×N grid (M rows of N elements each):
 * - Each row of N elements is viewed as R sub-rows of C elements
 * - Total sub-rows = M * R
 * - Sub-row indexing must account for the original row structure
 */

import { FFTPrecision } from './fft-generator';

// Helper to get shader type strings based on precision
function getPrecisionStrings(precision: FFTPrecision) {
  return {
    storageType: precision === 'f16' ? 'vec2<f16>' : 'vec2<f32>',
    enableF16: precision === 'f16' ? 'enable f16;\n' : '',
    loadConvert: precision === 'f16' ? 'vec2<f32>' : '',
    storeConvert: precision === 'f16' ? 'vec2<f16>' : '',
  };
}

/**
 * Generate unscramble shader to reorder four-step FFT output to natural order
 *
 * The four-step algorithm produces output where frequency k ends up at
 * position (k % R) * C + (k / R) instead of position k.
 * This shader permutes back to natural order.
 *
 * For 2D grids, this operates on each row independently.
 */
export function generateUnscrambleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Unscramble shader for N=${N} = ${R}×${C}
// Maps from four-step output order to natural frequency order
// Input position (r % R) * C + (r / R) -> Output position r
// Storage: ${precision}

${enableF16}
struct UnscrambleParams {
  C: u32,           // Sub-row size
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Elements per original row
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
`;
}

/**
 * Generate scramble shader to reorder natural order to four-step input order
 * (inverse of unscramble, used before inverse FFT)
 */
export function generateScrambleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16 } = getPrecisionStrings(precision);

  return `
// Scramble shader for N=${N} = ${R}×${C}
// Maps from natural order to four-step input order (inverse of unscramble)
// Input position r -> Output position (r % R) * C + (r / R)
// Storage: ${precision}

${enableF16}
struct ScrambleParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
`;
}

/**
 * Generate twiddle factor multiplication shader
 * Multiplies element at (row r, col c) by W_N^(r*c) = exp(-2πi*r*c/N)
 */
export function generateTwiddleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Twiddle factor multiplication for N=${N} = ${R}×${C}
// Multiplies element (r,c) by W_N^(r*c) = exp(-2πi*r*c/N)
// Storage: ${precision}

${enableF16}
struct TwiddleParams {
  N: u32,
  R: u32,
  C: u32,
  forward: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: TwiddleParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

@compute @workgroup_size(16, 16, 1)
fn twiddle_multiply(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let c = global_id.x;  // column index
  let r = global_id.y;  // row index

  if (c >= params.C || r >= params.R) {
    return;
  }

  let idx = r * params.C + c;
  let val = ${loadConvert}(input[idx]);

  // Twiddle factor: W_N^(r*c) = exp(sign * 2πi * r * c / N)
  let sign = select(1.0, -1.0, params.forward != 0u);
  let PI = 3.14159265358979;
  let angle = sign * 2.0 * PI * f32(r) * f32(c) / f32(params.N);
  let w = vec2<f32>(cos(angle), sin(angle));

  output[idx] = ${storeConvert}(cmul(val, w));
}
`;
}

/**
 * Generate sub-row FFT shader for C-point FFTs on sub-rows of a 2D grid
 *
 * For a 2D grid of M rows × N columns where N = R × C:
 * - Each original row is viewed as R sub-rows of C elements
 * - Total sub-rows = M * R
 * - Sub-row w corresponds to: original row (w / R), sub-row index (w % R)
 * - Memory offset = (w / R) * N + (w % R) * C
 */
export function generateSubRowFFTShader(C: number, R: number, precision: FFTPrecision = 'f32'): string {
  if (C < 2 || (C & (C - 1)) !== 0) {
    throw new Error(`C must be a power of 2 >= 2, got ${C}`);
  }

  const log2C = Math.log2(C);
  const N = R * C;
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Sub-row FFT shader for C=${C}-point FFTs
// Handles 2D grid with N=${N} = ${R}×${C} elements per original row
// Each workgroup processes one sub-row
// Storage: ${precision}

${enableF16}
struct SubRowFFTParams {
  C: u32,           // Sub-row size (FFT size)
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Total elements per original row (R * C)
  num_sub_rows: u32, // Total sub-rows to process (M * R for M original rows)
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
  for (var i = 0u; i < ${log2C}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

var<workgroup> buffer_a: array<vec2<f32>, ${C}>;
var<workgroup> buffer_b: array<vec2<f32>, ${C}>;

@compute @workgroup_size(${C}, 1, 1)
fn sub_row_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
               @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  // 2D dispatch: x = sub-row within original row, y = original row
  let sub_row_index = workgroup_id.x;
  let original_row = workgroup_id.y;
  let sub_row = original_row * params.R + sub_row_index;  // Global sub-row index
  let j = local_id.x;            // Position within sub-row
  let C = ${C}u;
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
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  // ${log2C} stages of butterflies
  for (var s = 0u; s < ${log2C}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${log2C % 2 === 0 ? 'true' : 'false'});

  // Normalization (only sqrt(C) since this is one dimension of a 2D FFT)
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(C));
  } else if (!is_forward) {
    result = result / f32(C);
  }

  // Write output at same offset structure
  let output_idx = base_offset + j;
  output[output_idx] = ${storeConvert}(result);
}
`;
}

/**
 * Generate twiddle shader for 2D grid with hierarchical FFT
 * Processes M original rows, each with N = R × C elements
 */
export function generateSubRowTwiddleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Twiddle factor multiplication for hierarchical FFT
// For each original row, multiplies element at sub-row r, position c by W_N^(r*c)
// Storage: ${precision}

${enableF16}
struct TwiddleParams {
  C: u32,           // Sub-row size
  R: u32,           // Number of sub-rows per original row
  N: u32,           // Total elements per original row
  num_original_rows: u32,
  forward: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
  let val = ${loadConvert}(input[idx]);

  // Twiddle factor: W_N^(r*c)
  let sign = select(1.0, -1.0, params.forward != 0u);
  let PI = 3.14159265358979;
  let angle = sign * 2.0 * PI * f32(r) * f32(c) / f32(N);
  let w = vec2<f32>(cos(angle), sin(angle));

  output[idx] = ${storeConvert}(cmul(val, w));
}
`;
}

/**
 * Generate column FFT shader for 2D grid with hierarchical FFT
 * For each original row, does R-point FFTs on C columns
 */
export function generateSubRowColumnFFTShader(R: number, C: number, precision: FFTPrecision = 'f32'): string {
  if (R < 2 || (R & (R - 1)) !== 0) {
    throw new Error(`R must be a power of 2, got ${R}`);
  }

  const log2R = Math.log2(R);
  const N = R * C;

  // For small R, use optimized direct computation
  if (R <= 8) {
    return generateSmallSubRowColumnFFT(R, C, precision);
  }

  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Column FFT shader for hierarchical FFT
// For each original row, does R=${R}-point FFTs on C=${C} columns
// Elements at positions c, c+C, c+2C, ..., c+(R-1)*C form one column
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,           // Stride between column elements
  R: u32,           // FFT size
  N: u32,           // Elements per original row
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
  for (var i = 0u; i < ${log2R}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

var<workgroup> buffer_a: array<vec2<f32>, ${R}>;
var<workgroup> buffer_b: array<vec2<f32>, ${R}>;

@compute @workgroup_size(${R}, 1, 1)
fn column_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  // 2D dispatch: workgroup_id.x = column, workgroup_id.y = original_row
  let col = workgroup_id.x;
  let original_row = workgroup_id.y;
  let j = local_id.x;  // position within column (0 to R-1)

  let C = params.C;
  let R = ${R}u;
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
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  // ${log2R} stages of butterflies
  for (var s = 0u; s < ${log2R}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${log2R % 2 === 0 ? 'true' : 'false'});

  // Normalization
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(R));
  } else if (!is_forward) {
    result = result / f32(R);
  }

  // Write output - column elements are at stride C
  let output_idx = base_offset + j * C + col;
  output[output_idx] = ${storeConvert}(result);
}
`;
}

function generateSmallSubRowColumnFFT(R: number, C: number, precision: FFTPrecision): string {
  const N = R * C;
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  if (R === 2) {
    return `
// Optimized 2-point column FFT for hierarchical FFT
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
  let x0 = ${loadConvert}(input[base]);
  let x1 = ${loadConvert}(input[base + params.C]);

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

  output[base] = ${storeConvert}(X0);
  output[base + params.C] = ${storeConvert}(X1);
}
`;
  } else if (R === 4) {
    return `
// Optimized 4-point column FFT for hierarchical FFT
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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

  let x0 = ${loadConvert}(input[base]);
  let x1 = ${loadConvert}(input[base + C]);
  let x2 = ${loadConvert}(input[base + 2u * C]);
  let x3 = ${loadConvert}(input[base + 3u * C]);

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

  output[base] = ${storeConvert}(X0);
  output[base + C] = ${storeConvert}(X1);
  output[base + 2u * C] = ${storeConvert}(X2);
  output[base + 3u * C] = ${storeConvert}(X3);
}
`;
  } else if (R === 8) {
    return `
// Optimized 8-point column FFT for hierarchical FFT (radix-2, 3 stages)
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
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
  let x0 = ${loadConvert}(input[base]);
  let x1 = ${loadConvert}(input[base + 4u * C]);
  let x2 = ${loadConvert}(input[base + 2u * C]);
  let x3 = ${loadConvert}(input[base + 6u * C]);
  let x4 = ${loadConvert}(input[base + C]);
  let x5 = ${loadConvert}(input[base + 5u * C]);
  let x6 = ${loadConvert}(input[base + 3u * C]);
  let x7 = ${loadConvert}(input[base + 7u * C]);

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

  output[base] = ${storeConvert}(X0);
  output[base + C] = ${storeConvert}(X1);
  output[base + 2u * C] = ${storeConvert}(X2);
  output[base + 3u * C] = ${storeConvert}(X3);
  output[base + 4u * C] = ${storeConvert}(X4);
  output[base + 5u * C] = ${storeConvert}(X5);
  output[base + 6u * C] = ${storeConvert}(X6);
  output[base + 7u * C] = ${storeConvert}(X7);
}
`;
  }

  throw new Error(`Unsupported small R: ${R}`);
}

/**
 * Generate small column FFT shader for R-point FFTs across columns
 * Each workgroup handles one column, doing an R-point FFT
 */
export function generateColumnFFTShader(R: number, precision: FFTPrecision = 'f32'): string {
  if (R < 2 || (R & (R - 1)) !== 0) {
    throw new Error(`R must be a power of 2, got ${R}`);
  }

  const log2R = Math.log2(R);
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Column FFT shader for R=${R}-point FFTs
// Each workgroup processes one column
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,      // number of columns (stride)
  R: u32,      // FFT size (number of rows)
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x
  );
}

// Bit-reverse for ${log2R} bits
fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${log2R}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

var<workgroup> buffer_a: array<vec2<f32>, ${R}>;
var<workgroup> buffer_b: array<vec2<f32>, ${R}>;

@compute @workgroup_size(${R}, 1, 1)
fn column_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let col = workgroup_id.x;  // which column
  let j = local_id.x;        // position within column
  let R = ${R}u;
  let C = params.C;

  if (col >= C) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal - stride is C (column-major within our R rows)
  let input_idx = bitrev(j) * C + col;
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  // ${log2R} stages of butterflies
  for (var s = 0u; s < ${log2R}u; s++) {
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
  var result = select(buffer_b[j], buffer_a[j], ${log2R % 2 === 0 ? 'true' : 'false'});

  // Normalization (only for column FFT, row FFT handles its own)
  if (params.split_norm != 0u) {
    result = result / sqrt(f32(R));
  } else if (!is_forward) {
    result = result / f32(R);
  }

  // Write output - stride is C
  let output_idx = j * C + col;
  output[output_idx] = ${storeConvert}(result);
}
`;
}

/**
 * For very small R (2, 4, 8), generate an optimized direct shader
 * that doesn't need workgroup shared memory
 */
export function generateSmallColumnFFTShader(R: number, precision: FFTPrecision = 'f32'): string {
  if (R === 2) {
    return generate2PointColumnFFT(precision);
  } else if (R === 4) {
    return generate4PointColumnFFT(precision);
  } else if (R === 8) {
    return generate8PointColumnFFT(precision);
  }
  throw new Error(`Unsupported small R: ${R}. Use 2, 4, or 8.`);
}

function generate2PointColumnFFT(precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Optimized 2-point column FFT
// X[0] = x[0] + x[1], X[1] = x[0] - x[1]
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let col = global_id.x;
  let C = params.C;

  if (col >= C) {
    return;
  }

  let x0 = ${loadConvert}(input[col]);          // row 0
  let x1 = ${loadConvert}(input[C + col]);      // row 1

  var X0 = x0 + x1;
  var X1 = x0 - x1;

  // Normalization
  if (params.split_norm != 0u) {
    let norm = 1.0 / sqrt(2.0);
    X0 = X0 * norm;
    X1 = X1 * norm;
  } else if (params.forward == 0u) {
    X0 = X0 * 0.5;
    X1 = X1 * 0.5;
  }

  output[col] = ${storeConvert}(X0);
  output[C + col] = ${storeConvert}(X1);
}
`;
}

function generate4PointColumnFFT(precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Optimized 4-point column FFT (radix-4)
// Uses standard DFT matrix for 4 points
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let col = global_id.x;
  let C = params.C;

  if (col >= C) {
    return;
  }

  let x0 = ${loadConvert}(input[col]);
  let x1 = ${loadConvert}(input[C + col]);
  let x2 = ${loadConvert}(input[2u * C + col]);
  let x3 = ${loadConvert}(input[3u * C + col]);

  let sign = select(1.0, -1.0, params.forward != 0u);

  // W_4^1 = exp(sign * 2πi/4) = (0, sign) = sign * i
  // For forward: -i, for inverse: +i
  let W1 = vec2<f32>(0.0, sign);

  // Radix-4 butterfly (Cooley-Tukey)
  // Stage 1: 2-point butterflies
  let a0 = x0 + x2;
  let a1 = x0 - x2;
  let a2 = x1 + x3;
  let a3 = x1 - x3;

  // Stage 2: combine with twiddles
  // X[0] = a0 + a2
  // X[1] = a1 + W1*a3 = a1 - i*a3 (forward)
  // X[2] = a0 - a2
  // X[3] = a1 - W1*a3 = a1 + i*a3 (forward)
  var X0 = a0 + a2;
  var X1 = a1 + cmul(W1, a3);
  var X2 = a0 - a2;
  var X3 = a1 - cmul(W1, a3);

  // Normalization
  if (params.split_norm != 0u) {
    let norm = 0.5;  // 1/sqrt(4)
    X0 = X0 * norm;
    X1 = X1 * norm;
    X2 = X2 * norm;
    X3 = X3 * norm;
  } else if (params.forward == 0u) {
    let norm = 0.25;  // 1/4
    X0 = X0 * norm;
    X1 = X1 * norm;
    X2 = X2 * norm;
    X3 = X3 * norm;
  }

  output[col] = ${storeConvert}(X0);
  output[C + col] = ${storeConvert}(X1);
  output[2u * C + col] = ${storeConvert}(X2);
  output[3u * C + col] = ${storeConvert}(X3);
}
`;
}

function generate8PointColumnFFT(precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getPrecisionStrings(precision);

  return `
// Optimized 8-point column FFT (radix-2, 3 stages)
// Storage: ${precision}

${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let col = global_id.x;
  let C = params.C;

  if (col >= C) {
    return;
  }

  // Load in bit-reversed order: 0,4,2,6,1,5,3,7
  let x0 = ${loadConvert}(input[col]);
  let x1 = ${loadConvert}(input[4u * C + col]);
  let x2 = ${loadConvert}(input[2u * C + col]);
  let x3 = ${loadConvert}(input[6u * C + col]);
  let x4 = ${loadConvert}(input[C + col]);
  let x5 = ${loadConvert}(input[5u * C + col]);
  let x6 = ${loadConvert}(input[3u * C + col]);
  let x7 = ${loadConvert}(input[7u * C + col]);

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
  let norm = select(
    select(1.0, 0.125, params.forward == 0u),
    0.35355339059,  // 1/sqrt(8)
    params.split_norm != 0u
  );
  X0 = X0 * norm;
  X1 = X1 * norm;
  X2 = X2 * norm;
  X3 = X3 * norm;
  X4 = X4 * norm;
  X5 = X5 * norm;
  X6 = X6 * norm;
  X7 = X7 * norm;

  output[col] = ${storeConvert}(X0);
  output[C + col] = ${storeConvert}(X1);
  output[2u * C + col] = ${storeConvert}(X2);
  output[3u * C + col] = ${storeConvert}(X3);
  output[4u * C + col] = ${storeConvert}(X4);
  output[5u * C + col] = ${storeConvert}(X5);
  output[6u * C + col] = ${storeConvert}(X6);
  output[7u * C + col] = ${storeConvert}(X7);
}
`;
}

// ============================================================================
// Vec4 variants - process two complex numbers per element (re1, im1, re2, im2)
// ============================================================================

function getVec4PrecisionStrings(precision: FFTPrecision) {
  return {
    storageType: precision === 'f16' ? 'vec4<f16>' : 'vec4<f32>',
    enableF16: precision === 'f16' ? 'enable f16;\n' : '',
    loadConvert: precision === 'f16' ? 'vec4<f32>' : '',
    storeConvert: precision === 'f16' ? 'vec4<f16>' : '',
  };
}

/**
 * Vec4 unscramble shader
 */
export function generateVec4UnscrambleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16 } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Unscramble shader for N=${N} = ${R}×${C}
// Storage: ${precision}

${enableF16}
struct UnscrambleParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: UnscrambleParams;

@compute @workgroup_size(256, 1, 1)
fn unscramble(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let k = global_id.x;
  let row = global_id.y;

  let C = params.C;
  let R = params.R;
  let N = params.N;

  if (k >= N || row >= params.num_original_rows) {
    return;
  }

  let scrambled_pos = (k % R) * C + (k / R);
  let input_idx = row * N + scrambled_pos;
  let output_idx = row * N + k;

  output[output_idx] = input[input_idx];
}
`;
}

/**
 * Vec4 scramble shader
 */
export function generateVec4ScrambleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16 } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Scramble shader for N=${N} = ${R}×${C}
// Storage: ${precision}

${enableF16}
struct ScrambleParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ScrambleParams;

@compute @workgroup_size(256, 1, 1)
fn scramble(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let k = global_id.x;
  let row = global_id.y;

  let C = params.C;
  let R = params.R;
  let N = params.N;

  if (k >= N || row >= params.num_original_rows) {
    return;
  }

  let scrambled_pos = (k % R) * C + (k / R);
  let input_idx = row * N + k;
  let output_idx = row * N + scrambled_pos;

  output[output_idx] = input[input_idx];
}
`;
}

/**
 * Vec4 sub-row FFT shader (C-point FFT on sub-rows)
 */
export function generateVec4SubRowFFTShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);
  const log2C = Math.log2(C);

  return `
// Vec4 Sub-row FFT shader: ${C}-point FFT for N=${N} = ${R}×${C}
// Processes two complex numbers per element
// Storage: ${precision}

${enableF16}
fn cmul4(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x,
    a.z * b.z - a.w * b.w,
    a.z * b.w + a.w * b.z
  );
}

struct SubRowFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: SubRowFFTParams;

var<workgroup> buffer_a: array<vec4<f32>, ${C}>;
var<workgroup> buffer_b: array<vec4<f32>, ${C}>;

fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${log2C}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

@compute @workgroup_size(${C}, 1, 1)
fn sub_row_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
               @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  // 2D dispatch: x = sub-row within original row, y = original row
  let sub_row_index = workgroup_id.x;
  let original_row = workgroup_id.y;
  let sub_row = original_row * params.R + sub_row_index;

  let j = local_id.x;
  let C = ${C}u;

  if (sub_row_index >= params.R || original_row >= params.num_original_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  let input_idx = sub_row * C + bitrev(j);
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  for (var s = 0u; s < ${log2C}u; s++) {
    let m = 1u << (s + 1u);
    let half_m = 1u << s;
    let group = j / m;
    let idx_in_group = j % m;
    let is_first_half = idx_in_group < half_m;
    let k = select(idx_in_group - half_m, idx_in_group, is_first_half);
    let base = group * m + k;

    let angle = sign * 2.0 * PI * f32(k) / f32(m);
    let c = cos(angle);
    let sv = sin(angle);
    let w = vec4<f32>(c, sv, c, sv);

    var a: vec4<f32>;
    var b: vec4<f32>;
    if ((s & 1u) == 0u) {
      a = buffer_a[base];
      b = cmul4(w, buffer_a[base + half_m]);
    } else {
      a = buffer_b[base];
      b = cmul4(w, buffer_b[base + half_m]);
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

  var result = select(buffer_b[j], buffer_a[j], ${log2C % 2 === 0 ? 'true' : 'false'});

  if (params.split_norm != 0u) {
    result = result / sqrt(f32(C));
  } else if (!is_forward) {
    result = result / f32(C);
  }

  let output_idx = sub_row * C + j;
  output[output_idx] = ${storeConvert}(result);
}
`;
}

/**
 * Vec4 twiddle multiply shader
 */
export function generateVec4SubRowTwiddleShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Twiddle multiply shader for N=${N} = ${R}×${C}
// Storage: ${precision}

${enableF16}
fn cmul4(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x,
    a.z * b.z - a.w * b.w,
    a.z * b.w + a.w * b.z
  );
}

struct TwiddleParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: TwiddleParams;

@compute @workgroup_size(16, 16, 1)
fn twiddle_multiply(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let c = global_id.x;
  let sub_row_index = global_id.y % params.R;
  let original_row = global_id.y / params.R;

  if (c >= params.C || sub_row_index >= params.R || original_row >= params.num_original_rows) {
    return;
  }

  let sub_row = original_row * params.R + sub_row_index;
  let idx = sub_row * params.C + c;

  let sign = select(1.0, -1.0, params.forward != 0u);
  let PI = 3.14159265358979;

  let angle = sign * 2.0 * PI * f32(sub_row_index * c) / f32(params.N);
  let cv = cos(angle);
  let sv = sin(angle);
  let w = vec4<f32>(cv, sv, cv, sv);

  let val = ${loadConvert}(input[idx]);
  output[idx] = ${storeConvert}(cmul4(val, w));
}
`;
}

/**
 * Vec4 column FFT shader (R-point FFT on columns)
 */
export function generateVec4SubRowColumnFFTShader(N: number, R: number, C: number, precision: FFTPrecision = 'f32'): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);
  const log2R = Math.log2(R);

  // For small R, use specialized implementations
  if (R === 2) {
    return generateVec4ColumnFFT2Shader(N, R, C, precision);
  } else if (R === 4) {
    return generateVec4ColumnFFT4Shader(N, R, C, precision);
  } else if (R === 8) {
    return generateVec4ColumnFFT8Shader(N, R, C, precision);
  } else if (R === 16) {
    return generateVec4ColumnFFT16Shader(N, R, C, precision);
  }

  // Generic R-point FFT for larger R
  return `
// Vec4 Column FFT shader: ${R}-point FFT for N=${N} = ${R}×${C}
// Storage: ${precision}

${enableF16}
fn cmul4(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x,
    a.z * b.z - a.w * b.w,
    a.z * b.w + a.w * b.z
  );
}

struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

var<workgroup> buffer_a: array<vec4<f32>, ${R}>;
var<workgroup> buffer_b: array<vec4<f32>, ${R}>;

fn bitrev(x: u32) -> u32 {
  var v = x;
  var result = 0u;
  for (var i = 0u; i < ${log2R}u; i++) {
    result = (result << 1u) | (v & 1u);
    v = v >> 1u;
  }
  return result;
}

@compute @workgroup_size(${R}, 1, 1)
fn column_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  // 2D dispatch: workgroup_id.x = column, workgroup_id.y = original_row
  let col = workgroup_id.x;
  let original_row = workgroup_id.y;

  let j = local_id.x;
  let C = params.C;
  let R = ${R}u;

  if (col >= C || original_row >= params.num_original_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  let base_idx = original_row * params.N;
  let input_idx = base_idx + bitrev(j) * C + col;
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  for (var s = 0u; s < ${log2R}u; s++) {
    let m = 1u << (s + 1u);
    let half_m = 1u << s;
    let group = j / m;
    let idx_in_group = j % m;
    let is_first_half = idx_in_group < half_m;
    let k = select(idx_in_group - half_m, idx_in_group, is_first_half);
    let base = group * m + k;

    let angle = sign * 2.0 * PI * f32(k) / f32(m);
    let cv = cos(angle);
    let sv = sin(angle);
    let w = vec4<f32>(cv, sv, cv, sv);

    var a: vec4<f32>;
    var b: vec4<f32>;
    if ((s & 1u) == 0u) {
      a = buffer_a[base];
      b = cmul4(w, buffer_a[base + half_m]);
    } else {
      a = buffer_b[base];
      b = cmul4(w, buffer_b[base + half_m]);
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

  var result = select(buffer_b[j], buffer_a[j], ${log2R % 2 === 0 ? 'true' : 'false'});

  if (params.split_norm != 0u) {
    result = result / sqrt(f32(R));
  } else if (!is_forward) {
    result = result / f32(R);
  }

  let output_idx = base_idx + j * C + col;
  output[output_idx] = ${storeConvert}(result);
}
`;
}

// Specialized vec4 column FFT for R=2
function generateVec4ColumnFFT2Shader(N: number, R: number, C: number, precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Column FFT shader: 2-point for N=${N} = ${R}×${C}
${enableF16}
struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  // global_id.x = original_row * C + column (1D dispatch pattern matching vec2)
  let combined = global_id.x;
  let original_row = combined / params.C;
  let col = combined % params.C;

  if (original_row >= params.num_original_rows) {
    return;
  }

  let base_idx = original_row * params.N + col;
  let x0 = ${loadConvert}(input[base_idx]);
  let x1 = ${loadConvert}(input[base_idx + params.C]);

  var X0 = x0 + x1;
  var X1 = x0 - x1;

  let norm = select(
    select(1.0, 0.5, params.forward == 0u),
    0.70710678118,
    params.split_norm != 0u
  );
  X0 = X0 * norm;
  X1 = X1 * norm;

  output[base_idx] = ${storeConvert}(X0);
  output[base_idx + params.C] = ${storeConvert}(X1);
}
`;
}

// Specialized vec4 column FFT for R=4
function generateVec4ColumnFFT4Shader(N: number, R: number, C: number, precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Column FFT shader: 4-point for N=${N} = ${R}×${C}
${enableF16}
fn cmul4(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x,
    a.z * b.z - a.w * b.w,
    a.z * b.w + a.w * b.z
  );
}

struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  // global_id.x = original_row * C + column (1D dispatch pattern matching vec2)
  let combined = global_id.x;
  let original_row = combined / params.C;
  let col = combined % params.C;

  if (original_row >= params.num_original_rows) {
    return;
  }

  let sign = select(1.0, -1.0, params.forward != 0u);
  let base_idx = original_row * params.N + col;

  let x0 = ${loadConvert}(input[base_idx]);
  let x1 = ${loadConvert}(input[base_idx + params.C]);
  let x2 = ${loadConvert}(input[base_idx + 2u * params.C]);
  let x3 = ${loadConvert}(input[base_idx + 3u * params.C]);

  // W_4^1 = ±i (packed for vec4)
  let W1 = vec4<f32>(0.0, sign, 0.0, sign);

  let a0 = x0 + x2;
  let a1 = x0 - x2;
  let a2 = x1 + x3;
  let a3 = x1 - x3;

  var X0 = a0 + a2;
  var X1 = a1 + cmul4(W1, a3);
  var X2 = a0 - a2;
  var X3 = a1 - cmul4(W1, a3);

  let norm = select(
    select(1.0, 0.25, params.forward == 0u),
    0.5,
    params.split_norm != 0u
  );
  X0 = X0 * norm;
  X1 = X1 * norm;
  X2 = X2 * norm;
  X3 = X3 * norm;

  output[base_idx] = ${storeConvert}(X0);
  output[base_idx + params.C] = ${storeConvert}(X1);
  output[base_idx + 2u * params.C] = ${storeConvert}(X2);
  output[base_idx + 3u * params.C] = ${storeConvert}(X3);
}
`;
}

// Specialized vec4 column FFT for R=8
function generateVec4ColumnFFT8Shader(N: number, R: number, C: number, precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Column FFT shader: 8-point for N=${N} = ${R}×${C}
${enableF16}
const PI: f32 = 3.14159265358979;

fn cmul4(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x,
    a.z * b.z - a.w * b.w,
    a.z * b.w + a.w * b.z
  );
}

struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

@compute @workgroup_size(256, 1, 1)
fn column_fft(@builtin(global_invocation_id) global_id: vec3<u32>) {
  // 1D dispatch pattern matching vec2 version: combined = original_row * C + col
  let combined = global_id.x;
  let original_row = combined / params.C;
  let col = combined % params.C;

  if (original_row >= params.num_original_rows) {
    return;
  }

  let sign = select(1.0, -1.0, params.forward != 0u);
  let base_idx = original_row * params.N + col;
  let C = params.C;

  let x0 = ${loadConvert}(input[base_idx]);
  let x1 = ${loadConvert}(input[base_idx + C]);
  let x2 = ${loadConvert}(input[base_idx + 2u * C]);
  let x3 = ${loadConvert}(input[base_idx + 3u * C]);
  let x4 = ${loadConvert}(input[base_idx + 4u * C]);
  let x5 = ${loadConvert}(input[base_idx + 5u * C]);
  let x6 = ${loadConvert}(input[base_idx + 6u * C]);
  let x7 = ${loadConvert}(input[base_idx + 7u * C]);

  // Twiddle factors (packed for vec4)
  let c1 = cos(sign * PI / 4.0);
  let s1 = sin(sign * PI / 4.0);
  let c3 = cos(sign * 3.0 * PI / 4.0);
  let s3 = sin(sign * 3.0 * PI / 4.0);
  let W8_1 = vec4<f32>(c1, s1, c1, s1);
  let W8_2 = vec4<f32>(0.0, sign, 0.0, sign);
  let W8_3 = vec4<f32>(c3, s3, c3, s3);

  let a0 = x0 + x1;
  let a1 = x0 - x1;
  let a2 = x2 + x3;
  let a3 = x2 - x3;
  let a4 = x4 + x5;
  let a5 = x4 - x5;
  let a6 = x6 + x7;
  let a7 = x6 - x7;

  let b0 = a0 + a2;
  let b1 = a1 + cmul4(W8_2, a3);
  let b2 = a0 - a2;
  let b3 = a1 - cmul4(W8_2, a3);
  let b4 = a4 + a6;
  let b5 = a5 + cmul4(W8_2, a7);
  let b6 = a4 - a6;
  let b7 = a5 - cmul4(W8_2, a7);

  var X0 = b0 + b4;
  var X1 = b1 + cmul4(W8_1, b5);
  var X2 = b2 + cmul4(W8_2, b6);
  var X3 = b3 + cmul4(W8_3, b7);
  var X4 = b0 - b4;
  var X5 = b1 - cmul4(W8_1, b5);
  var X6 = b2 - cmul4(W8_2, b6);
  var X7 = b3 - cmul4(W8_3, b7);

  let norm = select(
    select(1.0, 0.125, params.forward == 0u),
    0.35355339059,
    params.split_norm != 0u
  );
  X0 = X0 * norm;
  X1 = X1 * norm;
  X2 = X2 * norm;
  X3 = X3 * norm;
  X4 = X4 * norm;
  X5 = X5 * norm;
  X6 = X6 * norm;
  X7 = X7 * norm;

  output[base_idx] = ${storeConvert}(X0);
  output[base_idx + C] = ${storeConvert}(X1);
  output[base_idx + 2u * C] = ${storeConvert}(X2);
  output[base_idx + 3u * C] = ${storeConvert}(X3);
  output[base_idx + 4u * C] = ${storeConvert}(X4);
  output[base_idx + 5u * C] = ${storeConvert}(X5);
  output[base_idx + 6u * C] = ${storeConvert}(X6);
  output[base_idx + 7u * C] = ${storeConvert}(X7);
}
`;
}

// Specialized vec4 column FFT for R=16
function generateVec4ColumnFFT16Shader(N: number, R: number, C: number, precision: FFTPrecision): string {
  const { storageType, enableF16, loadConvert, storeConvert } = getVec4PrecisionStrings(precision);

  return `
// Vec4 Column FFT shader: 16-point for N=${N} = ${R}×${C}
${enableF16}
const PI: f32 = 3.14159265358979;

fn cmul4(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(
    a.x * b.x - a.y * b.y,
    a.x * b.y + a.y * b.x,
    a.z * b.z - a.w * b.w,
    a.z * b.w + a.w * b.z
  );
}

struct ColumnFFTParams {
  C: u32,
  R: u32,
  N: u32,
  num_original_rows: u32,
  forward: u32,
  split_norm: u32,
}

@group(0) @binding(0) var<storage, read> input: array<${storageType}>;
@group(0) @binding(1) var<storage, read_write> output: array<${storageType}>;
@group(0) @binding(2) var<uniform> params: ColumnFFTParams;

var<workgroup> buffer_a: array<vec4<f32>, 16>;
var<workgroup> buffer_b: array<vec4<f32>, 16>;

@compute @workgroup_size(16, 1, 1)
fn column_fft(@builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let col = workgroup_id.x;
  let original_row = workgroup_id.y;
  let j = local_id.x;
  let C = params.C;

  if (col >= C || original_row >= params.num_original_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let base_idx = original_row * params.N;

  // Bit-reverse for 4 bits
  var v = j;
  var rev = 0u;
  rev = (rev << 1u) | (v & 1u); v = v >> 1u;
  rev = (rev << 1u) | (v & 1u); v = v >> 1u;
  rev = (rev << 1u) | (v & 1u); v = v >> 1u;
  rev = (rev << 1u) | (v & 1u);

  let input_idx = base_idx + rev * C + col;
  buffer_a[j] = ${loadConvert}(input[input_idx]);
  workgroupBarrier();

  // 4 stages of butterflies
  for (var s = 0u; s < 4u; s++) {
    let m = 1u << (s + 1u);
    let half_m = 1u << s;
    let group = j / m;
    let idx_in_group = j % m;
    let is_first_half = idx_in_group < half_m;
    let k = select(idx_in_group - half_m, idx_in_group, is_first_half);
    let base = group * m + k;

    let angle = sign * 2.0 * PI * f32(k) / f32(m);
    let cv = cos(angle);
    let sv = sin(angle);
    let w = vec4<f32>(cv, sv, cv, sv);

    var a: vec4<f32>;
    var b: vec4<f32>;
    if ((s & 1u) == 0u) {
      a = buffer_a[base];
      b = cmul4(w, buffer_a[base + half_m]);
    } else {
      a = buffer_b[base];
      b = cmul4(w, buffer_b[base + half_m]);
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

  // After 4 stages (even), result is in buffer_a
  var result = buffer_a[j];

  let norm = select(
    select(1.0, 0.0625, params.forward == 0u),
    0.25,
    params.split_norm != 0u
  );
  result = result * norm;

  let output_idx = base_idx + j * C + col;
  output[output_idx] = ${storeConvert}(result);
}
`;
}
