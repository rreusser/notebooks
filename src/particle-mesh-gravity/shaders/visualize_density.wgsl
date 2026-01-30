// Visualize density shader - renders density field with bilinear interpolation
// Density is always f32 to avoid underflow issues

struct DensityVisParams {
  gridSize: u32,
  scale: f32,
}

@group(0) @binding(0) var<storage, read> density: array<vec2<f32>>;
@group(0) @binding(1) var<uniform> params: DensityVisParams;

@fragment
fn visualize_density(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let N = params.gridSize;
  let Nf = f32(N);

  // Grid coordinates (shifted by 0.5 to sample at cell centers)
  let gx = uv.x * Nf - 0.5;
  let gy = uv.y * Nf - 0.5;

  // Cell indices for bilinear interpolation
  let i0 = u32(floor(gx) + Nf) % N;
  let j0 = u32(floor(gy) + Nf) % N;
  let i1 = (i0 + 1u) % N;
  let j1 = (j0 + 1u) % N;

  // Fractional part
  let fx = fract(gx);
  let fy = fract(gy);

  // Sample 4 corners
  let d00 = density[j0 * N + i0].x;
  let d10 = density[j0 * N + i1].x;
  let d01 = density[j1 * N + i0].x;
  let d11 = density[j1 * N + i1].x;

  // Bilinear interpolation
  let rho = mix(mix(d00, d10, fx), mix(d01, d11, fx), fy);

  // Log scaling for dynamic range, then per-component 1-exp(-x) tone mapping
  let baseColor = vec3<f32>(0.2, 0.4, 1.0);
  let scaledDensity = rho * params.scale * 50.0 * Nf * Nf;
  let logDensity = log(1.0 + scaledDensity);
  let color = vec3<f32>(1.0) - exp(-baseColor * logDensity * 2.0);

  return vec4<f32>(color, 1.0);
}
