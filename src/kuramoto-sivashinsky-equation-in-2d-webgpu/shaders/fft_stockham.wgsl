// Cooley-Tukey Radix-2 DIT FFT Compute Shader
//
// Performs 1D FFT on rows using bit-reversal and butterfly stages.
// N=256, requires log2(256)=8 stages.

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

var<workgroup> buffer_a: array<vec2<f32>, 256>;
var<workgroup> buffer_b: array<vec2<f32>, 256>;

// Bit-reverse an 8-bit number
fn bitrev8(x: u32) -> u32 {
  var v = x;
  v = ((v & 0xF0u) >> 4u) | ((v & 0x0Fu) << 4u);
  v = ((v & 0xCCu) >> 2u) | ((v & 0x33u) << 2u);
  v = ((v & 0xAAu) >> 1u) | ((v & 0x55u) << 1u);
  return v;
}

@compute @workgroup_size(256, 1, 1)
fn fft_horizontal(@builtin(local_invocation_id) local_id: vec3<u32>,
                   @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = 256u;

  if (row >= params.num_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  // Load with bit-reversal into buffer_a
  let input_idx = row * N + bitrev8(j);
  buffer_a[j] = input[input_idx];
  workgroupBarrier();

  // 8 stages of butterflies using ping-pong buffers
  for (var s = 0u; s < 8u; s++) {
    let m = 1u << (s + 1u);       // butterfly group size: 2, 4, 8, ..., 256
    let half_m = 1u << s;         // half of group size: 1, 2, 4, ..., 128

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

  // Get result from buffer_a (8 stages: last stage s=7 is odd, writes to buffer_a)
  var result = buffer_a[j];

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

@compute @workgroup_size(256, 1, 1)
fn fft_vertical(@builtin(local_invocation_id) local_id: vec3<u32>,
                @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let row = workgroup_id.x;
  let j = local_id.x;
  let N = 256u;

  if (row >= params.num_rows) {
    return;
  }

  let is_forward = params.forward != 0u;
  let sign = select(1.0, -1.0, is_forward);
  let PI = 3.14159265358979;

  let input_idx = row * N + bitrev8(j);
  buffer_a[j] = input[input_idx];
  workgroupBarrier();

  for (var s = 0u; s < 8u; s++) {
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

  // Get result from buffer_a (8 stages: last stage s=7 is odd, writes to buffer_a)
  var result = buffer_a[j];

  if (params.split_norm != 0u) {
    result = result / sqrt(f32(N));
  } else if (!is_forward) {
    result = result / f32(N);
  }

  let output_idx = row * N + j;
  output[output_idx] = result;
}
