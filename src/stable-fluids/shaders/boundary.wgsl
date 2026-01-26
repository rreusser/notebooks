// Boundary Enforcement Shader
// Enforces no-slip boundary condition (zero velocity) at solid boundaries

struct BoundaryParams {
  resolution: vec2<u32>,
  padding0: f32,  // Unused (kept for alignment)
  wallThicknessX: f32, // Wall thickness in cells (left/right walls)
  wallThicknessY: f32, // Wall thickness in cells (top/bottom walls)
  padding1: f32,
}

@group(0) @binding(0) var<storage, read_write> velocity: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read_write> dye: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: BoundaryParams;

@compute @workgroup_size(16, 16)
fn enforce_boundary(@builtin(global_invocation_id) id: vec3<u32>) {
  let N = params.resolution.x;
  if (id.x >= N || id.y >= N) { return; }

  let idx = id.y * N + id.x;

  // Normalized coordinates (y=0 at top, y=1 at bottom)
  let x = f32(id.x) / f32(N);
  let y = f32(id.y) / f32(N);

  // Wall thickness in normalized coords
  let wallSizeX = params.wallThicknessX / f32(N);
  let wallSizeY = params.wallThicknessY / f32(N);

  var inBoundary = false;

  // Check left/right walls
  if (params.wallThicknessX > 0.0) {
    if (x < wallSizeX || x > 1.0 - wallSizeX) {
      inBoundary = true;
    }
  }

  // Check top/bottom walls
  if (params.wallThicknessY > 0.0) {
    if (y < wallSizeY || y > 1.0 - wallSizeY) {
      inBoundary = true;
    }
  }

  if (inBoundary) {
    // Zero velocity (no-slip condition)
    // Don't zero dye - it creates sampling artifacts near walls
    // The visualization shader draws walls as solid color anyway
    velocity[idx] = vec4<f32>(0.0);
  }
}
