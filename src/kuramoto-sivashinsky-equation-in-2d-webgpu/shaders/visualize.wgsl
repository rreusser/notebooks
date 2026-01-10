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

  let pixel = vec2<u32>(
    u32(uv_clamped.x * f32(resolution.x - 1u)),
    u32(uv_clamped.y * f32(resolution.y - 1u))
  );

  // Read value from spatial domain (take real component only)
  let idx = pixel.y * resolution.x + pixel.x;
  let value = V[idx].x;  // Real component

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
  // This is now in uniform control flow since we removed the early return
  let color = textureSample(colorscale_texture, colorscale_sampler, vec2<f32>(f, 0.5));

  return vec4<f32>(color.rgb, 1.0);
}
