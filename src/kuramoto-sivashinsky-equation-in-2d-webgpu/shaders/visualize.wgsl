// Visualization Fragment Shader
//
// Renders the spatial domain solution with color mapping.
// - Clamps values to [range.x, range.y]
// - Maps through smooth ramp function
// - Applies colorscale lookup

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

struct VisualizeParams {
  resolution: vec2<u32>,
  range: vec2<f32>,  // (min, max) for colorscale
  invert: u32,       // 0 or 1
}

@group(0) @binding(0) var<storage, read> V: array<vec2<f32>>;
@group(0) @binding(1) var<uniform> params: VisualizeParams;
@group(0) @binding(2) var colorscale_texture: texture_2d<f32>;
@group(0) @binding(3) var colorscale_sampler: sampler;

// Smooth ramp function
fn ramp(x: f32) -> f32 {
  let PI = 3.14159265359;
  return 0.5 + atan(PI * (x - 0.5)) / PI;
}

@fragment
fn visualize(input: VertexOutput) -> @location(0) vec4<f32> {
  let resolution = params.resolution;

  // Clamp UV to valid range to avoid out-of-bounds sampling
  let uv_clamped = clamp(input.uv, vec2<f32>(0.0), vec2<f32>(1.0));

  // Nearest-neighbor sampling: each buffer pixel covers exactly 1/N of UV space
  // Use min() to clamp the edge case where uv=1.0
  let pixel = min(
    vec2<u32>(uv_clamped * vec2<f32>(resolution)),
    resolution - vec2<u32>(1u, 1u)
  );

  // Read value from spatial domain (V stored as vec2 = (V.real, V.imag))
  let idx = pixel.y * resolution.x + pixel.x;
  let value = V[idx].x;  // Real component of V

  // Clamp to range
  let range = params.range;
  var f = (value - range.x) / (range.y - range.x);

  // Invert if requested
  if (params.invert != 0u) {
    f = 1.0 - f;
  }

  // Apply smooth ramp
  f = ramp(f);

  // Clamp f to [0,1] for texture sampling
  f = clamp(f, 0.0, 1.0);

  // Sample colorscale (1D texture, use v=0.5)
  let color = textureSample(colorscale_texture, colorscale_sampler, vec2<f32>(f, 0.5));

  return vec4<f32>(color.rgb, 1.0);
}
