// Combine Pair Shader
//
// Combines two vec2 buffers (containing IFFTed activator/inhibitor pairs)
// back into a vec4 buffer.
// After IFFT: real part = activator, imag part = inhibitor
// Output: (act1, inh1, act2, inh2)

enable f16;

struct CombinePairParams {
  resolution: vec2<u32>,
  padding: vec2<u32>,
}

@group(0) @binding(0) var<storage, read> pair0: array<vec2<f16>>;
@group(0) @binding(1) var<storage, read> pair1: array<vec2<f16>>;
@group(0) @binding(2) var<storage, read_write> output: array<vec4<f16>>;
@group(0) @binding(3) var<uniform> params: CombinePairParams;

@compute @workgroup_size(16, 16, 1)
fn combine_pair(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let x = global_id.x;
  let y = global_id.y;
  let resolution = params.resolution;

  if (x >= resolution.x || y >= resolution.y) {
    return;
  }

  let idx = y * resolution.x + x;

  // pair0 = (activator1, inhibitor1) from IFFT of complex1
  // pair1 = (activator2, inhibitor2) from IFFT of complex2
  let p0 = pair0[idx];
  let p1 = pair1[idx];

  // Output: (act1, inh1, act2, inh2)
  output[idx] = vec4<f16>(p0.x, p0.y, p1.x, p1.y);
}
