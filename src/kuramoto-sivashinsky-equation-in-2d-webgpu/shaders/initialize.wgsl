// Initialize Shader
//
// Creates initial conditions for the Kuramoto-Sivashinsky equation.
// Default: f(x,y) = sin(n*(x+y)) + sin(n*x) + sin(n*y)

struct InitializeParams {
  resolution: vec2<u32>,
  n: f32,  // Number of periods in initial condition
}

@group(0) @binding(0) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(1) var<uniform> params: InitializeParams;

@compute @workgroup_size(16, 16, 1)
fn initialize(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let x = global_id.x;
  let y = global_id.y;
  let resolution = params.resolution;

  if (x >= resolution.x || y >= resolution.y) {
    return;
  }

  // Map to [0, 2π] × [0, 2π]
  let uv = vec2<f32>(f32(x), f32(y)) / vec2<f32>(resolution);
  let xy = uv * 2.0 * 3.14159265359;

  // Initial condition: sum of sinusoids
  let n = params.n;
  let f = sin(n * (xy.x + xy.y)) + sin(n * xy.x) + sin(n * xy.y);

  // Alternative: circular pulse (uncomment if desired)
  // let r = length(uv - vec2<f32>(0.5, 0.5));
  // let f = -2.0 * exp(-pow(r / 0.05, 8.0));

  let idx = y * resolution.x + x;

  // Store as (real, 0) since initial condition is real-valued
  output[idx] = vec2<f32>(f, 0.0);
}
