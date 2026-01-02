/**
 * LSAO (Line-Sweep Ambient Occlusion) shaders with parent tile support
 *
 * This shader extends the basic LSAO algorithm to use parent tile data for
 * horizon initialization. Each scanline sweep now has two phases:
 * 1. Build horizon from parent buffer (off-tile terrain)
 * 2. Continue sweep through target tile (compute AO)
 */

/**
 * LSAO compute shader with hierarchical parent buffer support
 *
 * Algorithm:
 * - Each GPU invocation processes one complete scanline
 * - Sweeps through 768 pixels in parent buffer space
 * - Samples parent buffer when off-tile, target tile when on-tile
 * - Maintains convex hull stack to track horizon
 * - Computes AO only for pixels within target tile
 *
 * Coordinate systems:
 * - Parent space: 768×768 at z-1 resolution
 * - Target space: 512×512 at z resolution
 * - Target occupies 256×256 region within parent (depends on quadrant)
 */
export const LSAO_SHADER = /* wgsl */ `
override tileSize = 512u;
override tileBuffer = 1u;
override workgroupSize = 128;
override parentSize = 768u;

struct UniformStruct {
  tilesize: vec2<u32>,
  step: vec2<i32>,
  buffer: i32,
  pixelSize: f32,
  normalization: f32,
  targetOffsetInParent: vec2<i32>,
  parentPixelSize: f32,
  padding: f32
}

@binding(0) @group(0) var<uniform> uniforms: UniformStruct;
@binding(1) @group(0) var<storage, read> terrainData: array<f32>;      // Target 514×514
@binding(2) @group(0) var<storage, read_write> outputData: array<f32>; // Target 512×512
@binding(3) @group(0) var<storage, read> parentData: array<f32>;       // Parent 768×768

// Get index in target tile (unbuffered, 512×512)
fn unbufferedIndex(ij: vec2<i32>) -> u32 {
  return (u32(ij.x) % tileSize) + u32(ij.y) * tileSize;
}

// Get index in target tile (buffered, 514×514)
fn bufferedIndex(ij: vec2<i32>) -> u32 {
  let w = tileSize + 2u * tileBuffer;
  let ijbuf = vec2<u32>(ij + i32(tileBuffer));
  return (ijbuf.x % w) + (ijbuf.y) * w;
}

// Get index in parent buffer (768×768)
fn parentIndex(ij: vec2<i32>) -> u32 {
  let clamped = clamp(ij, vec2<i32>(0), vec2<i32>(i32(parentSize) - 1));
  return u32(clamped.x) + u32(clamped.y) * parentSize;
}

// Sample elevation from appropriate buffer based on position in parent space
fn sampleElevation(posInParent: vec2<i32>) -> f32 {
  let targetMin = uniforms.targetOffsetInParent;
  let targetMax = targetMin + vec2<i32>(i32(tileSize / 2u));

  // Check if position is within target tile region (at parent resolution)
  // Target tile is 512×512 at z, which is 256×256 at z-1 (parent resolution)
  if (all(posInParent >= targetMin) && all(posInParent < targetMax)) {
    // Inside target tile region - sample from target buffer
    // Convert from parent space (256×256) to target space (512×512)
    let posInTarget = (posInParent - targetMin) * 2;
    return terrainData[bufferedIndex(posInTarget)];
  } else {
    // Outside target tile - sample from parent buffer
    return parentData[parentIndex(posInParent)];
  }
}

// Check if position in parent space corresponds to a target tile pixel
fn isInTargetRegion(posInParent: vec2<i32>) -> bool {
  let targetMin = uniforms.targetOffsetInParent;
  let targetMax = targetMin + vec2<i32>(i32(tileSize / 2u));
  return all(posInParent >= targetMin) && all(posInParent < targetMax);
}

// Convert position in parent space to target space
fn parentToTarget(posInParent: vec2<i32>) -> vec2<i32> {
  return (posInParent - uniforms.targetOffsetInParent) * 2;
}

// Get physical position for distance calculations
// Parent pixels are 2× larger than target pixels
fn getPhysicalPosition(posInParent: vec2<i32>, inTarget: bool) -> vec2<f32> {
  if (inTarget) {
    // Target tile: convert to target space and use target pixel size
    let posInTarget = parentToTarget(posInParent);
    return vec2<f32>(posInTarget) * uniforms.pixelSize;
  } else {
    // Parent buffer: use parent pixel size (2× target)
    return vec2<f32>(posInParent) * uniforms.parentPixelSize;
  }
}

@compute @workgroup_size(workgroupSize)
fn main(@builtin(global_invocation_id) coord: vec3u) {
  // Determine starting position in parent space based on sweep direction
  var posInParent = vec2<i32>(i32(coord.x), i32(coord.x));

  // Set perpendicular coordinate and starting position along sweep direction
  if (uniforms.step.y == 0) {
    // Horizontal sweep (E or W)
    posInParent.x = select(0i, i32(parentSize - 1u), uniforms.step.x < 0i);
  } else if (uniforms.step.x == 0) {
    // Vertical sweep (N or S)
    posInParent.y = select(0i, i32(parentSize - 1u), uniforms.step.y < 0i);
  }

  // Initialize convex hull stack
  var hull: array<vec3<f32>, 128>;  // Increased from 64 for longer sweeps
  var hullPtr = 0u;

  // Initialize hull with point just outside the parent buffer
  let startPos = posInParent - uniforms.step;
  let startZ = sampleElevation(startPos);
  let startInTarget = isInTargetRegion(startPos);
  let startPhysPos = getPhysicalPosition(startPos, startInTarget);
  hull[0] = vec3<f32>(startPhysPos, startZ);

  // March through entire parent buffer (768 pixels)
  for (var i = 0u; i < parentSize; i++) {
    // Sample elevation at current position
    let z = sampleElevation(posInParent);
    let inTarget = isInTargetRegion(posInParent);
    let physPos = getPhysicalPosition(posInParent, inTarget);
    let ijz = vec3<f32>(physPos, z);

    // Calculate visibility metric for current point
    var dijz = hull[hullPtr] - ijz;
    var s0 = dijz.z * dijz.z / dot(dijz, dijz);
    s0 = select(-s0, s0, dijz.z > 0.0);

    // Pop hull points that are occluded by current point
    while (hullPtr > 0u) {
      dijz = hull[hullPtr - 1u] - ijz;
      var s1 = dijz.z * dijz.z / dot(dijz, dijz);
      s1 = select(-s1, s1, dijz.z > 0.0);

      if (s0 > s1) { break; }

      s0 = s1;
      hullPtr -= 1u;
    }

    // Compute AO contribution only if inside target tile
    if (inTarget) {
      let posInTarget = parentToTarget(posInParent);
      let uidx = unbufferedIndex(posInTarget);

      // Calculate occlusion contribution from horizon
      dijz = hull[hullPtr] - ijz;
      dijz = vec3(dijz.xy, dijz.z / uniforms.pixelSize);
      let contribution = uniforms.normalization * exp(-dijz.z / length(dijz));

      outputData[uidx] = outputData[uidx] + contribution;
    }

    // Push current point onto hull
    // Fail silently but gracefully if we overflow the stack
    hullPtr = min(hullPtr + 1u, 127u);
    hull[hullPtr] = ijz;

    // Advance to next position
    posInParent = posInParent + uniforms.step;
  }
}
`;

/**
 * Create shader module from WGSL code
 *
 * @param {GPUDevice} device - WebGPU device
 * @param {string} code - WGSL shader code
 * @returns {GPUShaderModule}
 */
export function createShaderModule(device, code) {
  return device.createShaderModule({
    code,
    label: 'LSAO shader with parent buffer support'
  });
}
