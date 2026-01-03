/**
 * Multi-Level LSAO (Line-Sweep Ambient Occlusion) shaders
 *
 * This shader supports 1-4 parent levels with normalized coordinate system.
 * Progressive horizon stack population from coarsest to finest levels,
 * with bilinear interpolation for parent sampling.
 *
 * Coordinate systems:
 * - Normalized space: Target occupies (0,0) to (1,1)
 * - Parent levels extend coverage: deltaZ=-1 covers (-1,-1) to (2,2), etc.
 * - Buffer space: Pixel coordinates within each level's buffer
 */
export const LSAO_SHADER = /* wgsl */ `
override tileSize = 512u;
override tileBuffer = 1u;
override maxSweepSize = 768u;  // Maximum sweep range
override numLevels = 1u;       // Number of parent levels (1-4)
override workgroupSize = 128;

struct LevelInfo {
  bufferSize: u32,
  scale: f32,
  coverageMin: vec2<f32>,
  coverageMax: vec2<f32>,
  padding: vec2<f32>
}

struct UniformStruct {
  tilesize: vec2<u32>,
  step: vec2<i32>,
  buffer: i32,
  pixelSize: f32,
  normalization: f32,
  numLevels: u32,
  padding1: f32,
  padding2: f32,
  @align(16) levels: array<LevelInfo, 4>
}

@binding(0) @group(0) var<uniform> uniforms: UniformStruct;
@binding(1) @group(0) var<storage, read> targetData: array<f32>;       // Target 514×514
@binding(2) @group(0) var<storage, read_write> outputData: array<f32>; // Target 512×512
@binding(3) @group(0) var<storage, read> parentLevel0: array<f32>;     // Level 0 (deltaZ=-1)
@binding(4) @group(0) var<storage, read> parentLevel1: array<f32>;     // Level 1 (deltaZ=-2)
@binding(5) @group(0) var<storage, read> parentLevel2: array<f32>;     // Level 2 (deltaZ=-3)
@binding(6) @group(0) var<storage, read> parentLevel3: array<f32>;     // Level 3 (deltaZ=-4)

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

// Convert sweep index to normalized coordinates
fn sweepIndexToNormalized(sweepIdx: u32, scanlineIdx: u32) -> vec2<f32> {
  // Determine starting position based on sweep direction
  var pixelPos = vec2<i32>(0);

  if (uniforms.step.y == 0) {
    // Horizontal sweep (E or W)
    let startX = select(0, i32(maxSweepSize) - 1, uniforms.step.x < 0);
    pixelPos.x = startX + uniforms.step.x * i32(sweepIdx);
    pixelPos.y = i32(scanlineIdx);
  } else {
    // Vertical sweep (N or S)
    let startY = select(0, i32(maxSweepSize) - 1, uniforms.step.y < 0);
    pixelPos.x = i32(scanlineIdx);
    pixelPos.y = startY + uniforms.step.y * i32(sweepIdx);
  }

  // Convert to normalized coordinates
  // maxSweepSize buffer is centered on target tile
  // Target occupies (0,0) to (1,1) in normalized space
  let bufferCenter = f32(maxSweepSize) * 0.5;
  let targetHalfSize = f32(tileSize) * 0.5;

  return (vec2<f32>(pixelPos) - bufferCenter + targetHalfSize) / f32(tileSize);
}

// Check if normalized position is within target tile
fn isInTarget(normPos: vec2<f32>) -> bool {
  return all(normPos >= vec2<f32>(0.0)) && all(normPos < vec2<f32>(1.0));
}

// Check if normalized position is within a level's coverage
fn isInLevel(normPos: vec2<f32>, level: u32) -> bool {
  if (level >= uniforms.numLevels) { return false; }
  let info = uniforms.levels[level];
  if (info.bufferSize == 0u) { return false; }
  return all(normPos >= info.coverageMin) && all(normPos < info.coverageMax);
}

// Convert normalized position to buffer coordinates for a level
fn normalizedToBufferCoords(normPos: vec2<f32>, level: u32) -> vec2<f32> {
  let info = uniforms.levels[level];

  // Calculate center of level buffer in normalized space
  let levelCenter = (info.coverageMin + info.coverageMax) * 0.5;

  // Offset from center in normalized space
  let offsetFromCenter = normPos - levelCenter;

  // Convert to buffer pixel coordinates
  // Level buffer is centered with target at specific position
  let bufferCenter = vec2<f32>(f32(info.bufferSize)) * 0.5;
  let bufferCoords = bufferCenter + offsetFromCenter * f32(tileSize) / info.scale;

  return bufferCoords;
}

// Convert normalized position to target buffer coordinates
fn normalizedToTargetCoords(normPos: vec2<f32>) -> vec2<i32> {
  return vec2<i32>(normPos * f32(tileSize));
}

// Get physical position for distance calculations
fn getPhysicalPosition(normPos: vec2<f32>) -> vec2<f32> {
  // In normalized space, 1 unit = tileSize pixels at target resolution
  // Physical size = normalized position × tileSize × pixelSize
  return normPos * f32(tileSize) * uniforms.pixelSize;
}

// Sample from parent level with bilinear interpolation
fn sampleParentBilinear(normPos: vec2<f32>, level: u32) -> f32 {
  let info = uniforms.levels[level];
  let bufferCoords = normalizedToBufferCoords(normPos, level);

  // Get integer and fractional parts
  let x0 = i32(floor(bufferCoords.x));
  let y0 = i32(floor(bufferCoords.y));
  let fx = fract(bufferCoords.x);
  let fy = fract(bufferCoords.y);

  // Clamp coordinates to buffer bounds
  let maxCoord = i32(info.bufferSize) - 1;
  let x1 = min(x0 + 1, maxCoord);
  let y1 = min(y0 + 1, maxCoord);
  let cx0 = clamp(x0, 0, maxCoord);
  let cy0 = clamp(y0, 0, maxCoord);

  // Sample 4 corners
  var v00: f32;
  var v10: f32;
  var v01: f32;
  var v11: f32;

  switch (level) {
    case 0u: {
      v00 = parentLevel0[u32(cy0 * i32(info.bufferSize) + cx0)];
      v10 = parentLevel0[u32(cy0 * i32(info.bufferSize) + x1)];
      v01 = parentLevel0[u32(y1 * i32(info.bufferSize) + cx0)];
      v11 = parentLevel0[u32(y1 * i32(info.bufferSize) + x1)];
    }
    case 1u: {
      v00 = parentLevel1[u32(cy0 * i32(info.bufferSize) + cx0)];
      v10 = parentLevel1[u32(cy0 * i32(info.bufferSize) + x1)];
      v01 = parentLevel1[u32(y1 * i32(info.bufferSize) + cx0)];
      v11 = parentLevel1[u32(y1 * i32(info.bufferSize) + x1)];
    }
    case 2u: {
      v00 = parentLevel2[u32(cy0 * i32(info.bufferSize) + cx0)];
      v10 = parentLevel2[u32(cy0 * i32(info.bufferSize) + x1)];
      v01 = parentLevel2[u32(y1 * i32(info.bufferSize) + cx0)];
      v11 = parentLevel2[u32(y1 * i32(info.bufferSize) + x1)];
    }
    default: {
      v00 = parentLevel3[u32(cy0 * i32(info.bufferSize) + cx0)];
      v10 = parentLevel3[u32(cy0 * i32(info.bufferSize) + x1)];
      v01 = parentLevel3[u32(y1 * i32(info.bufferSize) + cx0)];
      v11 = parentLevel3[u32(y1 * i32(info.bufferSize) + x1)];
    }
  }

  // Bilinear interpolation
  let v0 = mix(v00, v10, fx);
  let v1 = mix(v01, v11, fx);
  return mix(v0, v1, fy);
}

// Sample elevation with priority: target > level 0 > level 1 > level 2 > level 3
fn sampleElevation(normPos: vec2<f32>) -> f32 {
  // Check target first (highest priority)
  if (isInTarget(normPos)) {
    let targetCoords = normalizedToTargetCoords(normPos);
    let idx = bufferedIndex(targetCoords);
    return targetData[idx];
  }

  // Check parent levels in order (finest to coarsest)
  for (var level = 0u; level < uniforms.numLevels; level++) {
    if (isInLevel(normPos, level)) {
      return sampleParentBilinear(normPos, level);
    }
  }

  // Should never reach here if coverage is correct
  return 0.0;
}

@compute @workgroup_size(workgroupSize)
fn main(@builtin(global_invocation_id) coord: vec3u) {
  // Each invocation processes one scanline
  let scanlineIdx = coord.x;

  // Initialize convex hull stack (increased size for longer sweeps)
  var hull: array<vec3<f32>, 256>;
  var hullPtr = 0u;

  // Initialize hull with point just outside sweep range
  let startNormPos = sweepIndexToNormalized(0u, scanlineIdx);
  let startZ = sampleElevation(startNormPos);
  let startPhysPos = getPhysicalPosition(startNormPos);
  hull[0] = vec3<f32>(startPhysPos, startZ);

  // Sweep through all positions (maxSweepSize pixels)
  for (var i = 0u; i < maxSweepSize; i++) {
    let normPos = sweepIndexToNormalized(i, scanlineIdx);

    // Sample elevation at current position
    let z = sampleElevation(normPos);
    let physPos = getPhysicalPosition(normPos);
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
    if (isInTarget(normPos)) {
      let targetCoords = normalizedToTargetCoords(normPos);
      let uidx = unbufferedIndex(targetCoords);

      // Calculate occlusion contribution from horizon
      dijz = hull[hullPtr] - ijz;
      dijz = vec3(dijz.xy, dijz.z / uniforms.pixelSize);
      let contribution = uniforms.normalization * exp(-dijz.z / length(dijz));

      outputData[uidx] = outputData[uidx] + contribution;
    }

    // Push current point onto hull
    // Gracefully handle overflow
    hullPtr = min(hullPtr + 1u, 255u);
    hull[hullPtr] = ijz;
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
