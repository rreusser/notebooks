// WGSL shaders for terrain tile rendering

import { atmosphereCode } from './atmosphere.js';

export const terrainVertexShader = /* wgsl */`
struct Uniforms {
  mvp: mat4x4<f32>,
  model: mat4x4<f32>,
  elevation_scale: f32,
  cell_size_meters: f32,
  vertical_exaggeration: f32,
  texel_size: f32,
  show_tile_borders: f32,
  has_imagery: f32,
  hillshade_opacity: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(1) @binding(0) var elevationTexture: texture_2d<f32>;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) world_position: vec3<f32>,
};

fn loadElevation(coord: vec2<i32>) -> f32 {
  return textureLoad(elevationTexture, coord, 0).r;
}

@vertex
fn vs_main(@location(0) grid_pos: vec2<u32>) -> VertexOutput {
  var out: VertexOutput;

  // Raw coords [0, 514]. Interior 1-513 map to grid 0-512.
  // Edge 0 and 514 are border vertices at tile boundaries.
  let raw_u = i32(grid_pos.x);
  let raw_v = i32(grid_pos.y);

  // Grid position: edge vertices snap to tile boundary (half-pixel)
  let u = clamp(f32(raw_u) - 1.0, -0.5, 512.5);
  let v = clamp(f32(raw_v) - 1.0, -0.5, 512.5);

  // Texel indices for elevation sampling.
  // Interior: both indices are the same (single texel).
  // Edge: two adjacent texels to average (border + first interior).
  var tex_u_a: i32 = raw_u;
  var tex_u_b: i32 = raw_u;
  if (raw_u == 0) { tex_u_a = 0; tex_u_b = 1; }
  else if (raw_u == 514) { tex_u_a = 512; tex_u_b = 513; }

  var tex_v_a: i32 = raw_v;
  var tex_v_b: i32 = raw_v;
  if (raw_v == 0) { tex_v_a = 0; tex_v_b = 1; }
  else if (raw_v == 514) { tex_v_a = 512; tex_v_b = 513; }

  // Average 1, 2, or 4 texels depending on edge/corner
  let elevation = (
    loadElevation(vec2<i32>(tex_u_a, tex_v_a)) +
    loadElevation(vec2<i32>(tex_u_b, tex_v_a)) +
    loadElevation(vec2<i32>(tex_u_a, tex_v_b)) +
    loadElevation(vec2<i32>(tex_u_b, tex_v_b))
  ) * 0.25;

  let pos = vec4<f32>(u, elevation, v, 1.0);
  out.position = uniforms.mvp * pos;
  out.uv = vec2<f32>((u + 1.0) / 514.0, (v + 1.0) / 514.0);
  out.world_position = (uniforms.model * pos).xyz;

  // Reject sea-level vertices (no terrain data) — degenerate w=0 prevents rasterization
  if (elevation <= 0.0) {
    out.position = vec4<f32>(0.0, 0.0, 0.0, 0.0);
  }

  return out;
}
`;

export const terrainFragmentShader = /* wgsl */`
struct Uniforms {
  mvp: mat4x4<f32>,
  model: mat4x4<f32>,
  elevation_scale: f32,
  cell_size_meters: f32,
  vertical_exaggeration: f32,
  texel_size: f32,
  show_tile_borders: f32,
  has_imagery: f32,
  hillshade_opacity: f32,
};

` + atmosphereCode + /* wgsl */`

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(1) @binding(0) var elevationTexture: texture_2d<f32>;
@group(2) @binding(0) var<uniform> globals: GlobalUniforms;
@group(3) @binding(0) var imageryTexture: texture_2d<f32>;
@group(3) @binding(1) var imagerySampler: sampler;

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
}

// Bilinear interpolation of elevation. With CPU-decoded r32float textures,
// we can interpolate the float values directly.
fn sampleElevation(uv: vec2<f32>) -> f32 {
  let dim = textureDimensions(elevationTexture, 0);
  let size = vec2<f32>(dim);
  let tc = uv * size;
  let i = vec2<i32>(floor(tc));
  let f = tc - floor(tc);
  let mx = vec2<i32>(dim) - vec2<i32>(1);

  let e00 = textureLoad(elevationTexture, clamp(i, vec2<i32>(0), mx), 0).r;
  let e10 = textureLoad(elevationTexture, clamp(i + vec2<i32>(1, 0), vec2<i32>(0), mx), 0).r;
  let e01 = textureLoad(elevationTexture, clamp(i + vec2<i32>(0, 1), vec2<i32>(0), mx), 0).r;
  let e11 = textureLoad(elevationTexture, clamp(i + vec2<i32>(1, 1), vec2<i32>(0), mx), 0).r;

  return mix(mix(e00, e10, f.x), mix(e01, e11, f.x), f.y);
}

fn applyAtmosphere(color: vec3<f32>, world_pos: vec3<f32>) -> vec3<f32> {
  let cam_pos = globals.camera_position.xyz;
  let cam_h_m = globals.camera_position.w;
  let mpu = globals.sun_direction.w;

  let world_ray = world_pos - cam_pos;
  let frag_h_m = world_pos.y * mpu / max(uniforms.vertical_exaggeration, 1e-6);
  let phys_ray = vec3<f32>(world_ray.x * mpu, frag_h_m - cam_h_m, world_ray.z * mpu);
  let dist_m = length(phys_ray);
  if (dist_m < 0.1) { return color; }
  let view_dir = phys_ray / dist_m;

  let result = computeScattering(cam_h_m, frag_h_m, dist_m, view_dir);
  let T = result[0];
  let inscatter = result[1];

  return color * T + inscatter * (vec3<f32>(1.0) - T);
}

@fragment
fn fs_main(@location(0) uv: vec2<f32>, @location(1) world_position: vec3<f32>) -> @location(0) vec4<f32> {
  let texel = uniforms.texel_size;

  // Sample center and neighbors for gradient (manual bilinear of decoded elevation)
  let zC = sampleElevation(uv);
  let zL = sampleElevation(uv + vec2<f32>(-texel, 0.0));
  let zR = sampleElevation(uv + vec2<f32>(texel, 0.0));
  let zU = sampleElevation(uv + vec2<f32>(0.0, -texel));
  let zD = sampleElevation(uv + vec2<f32>(0.0, texel));

  // Gradient in meters
  let cellSize = uniforms.cell_size_meters;
  let zFactor = uniforms.vertical_exaggeration;
  let dzdx = ((zR - zL) / (2.0 * cellSize)) * zFactor;
  let dzdy = ((zD - zU) / (2.0 * cellSize)) * zFactor;

  // Hillshade using sun direction from globals
  let normal = vec3<f32>(-dzdx, 1.0, -dzdy);
  let sun = globals.sun_direction.xyz;
  let light = sun;
  // Fade direct illumination as sun drops below horizon
  let sun_horizon = smoothstep(-0.02, 0.02, sun.y);
  let shade = max(0.0, dot(normal, light) * inverseSqrt(dot(normal, normal))) * sun_horizon;

  // Base color: satellite imagery or elevation-based fallback
  var base_color: vec3<f32>;
  if (uniforms.has_imagery > 0.5) {
    // Map from 514-texel elevation UV to 512-texel imagery UV
    let imagery_uv = (uv * 514.0 - 1.0) / 512.0;
    let imagery = textureSampleLevel(imageryTexture, imagerySampler, imagery_uv, 0.0).rgb;
    base_color = srgbToLinear(imagery);
  } else {
    let minElev = 500.0;
    let maxElev = 6200.0;
    let normalized = clamp((zC - minElev) / (maxElev - minElev), 0.0, 1.0);
    let gray = normalized * 0.15 + 0.05;
    base_color = vec3<f32>(gray, gray, gray);
  }

  let lit = base_color * mix(1.0, shade, uniforms.hillshade_opacity);
  let terrain_color = clamp(lit, vec3<f32>(0.0), vec3<f32>(1.0));

  // Apply atmospheric scattering
  let result = applyAtmosphere(terrain_color, world_position);

  // Tile border overlay
  if (uniforms.show_tile_borders > 0.5) {
    let grid_u = uv.x * 514.0 - 1.0;
    let grid_v = uv.y * 514.0 - 1.0;
    let border_u = 1.5 * fwidth(grid_u);
    let border_v = 1.5 * fwidth(grid_v);
    if (grid_u < border_u || grid_u > 512.0 - border_u || grid_v < border_v || grid_v > 512.0 - border_v) {
      return vec4<f32>(1.0, 0.0, 0.0, 1.0);
    }
  }

  return finalColor(result);
}
`;
