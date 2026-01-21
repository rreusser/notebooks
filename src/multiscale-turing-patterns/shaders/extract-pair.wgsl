// Extract Pair Shader
//
// Extracts one of two complex pairs from a vec4 buffer into a vec2 buffer for FFT.
// pair=0: extracts (x, z) as (re, im) for first complex number
// pair=1: extracts (y, w) as (re, im) for second complex number

enable f16;

struct ExtractPairParams {
  resolution: vec2<u32>,
  pair: u32,
  padding: u32,
}

@group(0) @binding(0) var<storage, read> input: array<vec4<f16>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f16>>;
@group(0) @binding(2) var<uniform> params: ExtractPairParams;

@compute @workgroup_size(16, 16, 1)
fn extract_pair(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let x = global_id.x;
  let y = global_id.y;
  let resolution = params.resolution;

  if (x >= resolution.x || y >= resolution.y) {
    return;
  }

  let idx = y * resolution.x + x;
  let v = input[idx];

  // vec4 layout: (re1, re2, im1, im2)
  // pair 0: complex1 = (re1, im1) = (v.x, v.z)
  // pair 1: complex2 = (re2, im2) = (v.y, v.w)
  if (params.pair == 0u) {
    output[idx] = vec2<f16>(v.x, v.z);
  } else {
    output[idx] = vec2<f16>(v.y, v.w);
  }
}
