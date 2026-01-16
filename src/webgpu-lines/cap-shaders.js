/**
 * Shaders for rendering line end caps
 *
 * The cap pass draws the boundary segments that the main pass misses.
 * Main pass draws segments 1→2, 2→3, ..., (N-3)→(N-2) using 4-point windows.
 * Cap pass draws segments 0→1 and (N-2)→(N-1).
 *
 * Key insight from regl-gpu-lines: caps are formed by MIRRORING (pA = pC), not extrapolating.
 * This creates a 180-degree hairpin turn (cosB = -1) which naturally forms a semicircular cap.
 *
 * For both start and end caps, points are loaded so B is always the endpoint:
 * - Start cap: B=0, C=1, D=2, pA=pC (mirrored)
 * - End cap: B=N-1, C=N-2, D=N-3, pA=pC (mirrored, reversed order)
 */

/**
 * Create the cap vertex shader
 * This is essentially the main vertex shader but loads boundary segments
 */
export function createCapVertexShader(isRound) {
  return /* wgsl */`
struct CapUniforms {
  resolution: vec2f,
  vertCnt2: vec2f,
  miterLimit: f32,
  isRound: u32,
  width: f32,
  pointCount: u32,
  insertCaps: u32,  // 1 = mirror for cap, 0 = extrapolate for flat end
}

@group(0) @binding(0) var<uniform> uniforms: CapUniforms;

// Position buffer
@group(1) @binding(0) var<storage, read> positions: array<vec4f>;

// Endpoint buffer - pairs of (segmentIndex, capType)
// segmentIndex: 0 = first segment (0→1), 1 = last segment ((N-2)→(N-1))
// capType: 0 = start cap, 1 = end cap
@group(1) @binding(1) var<storage, read> endpoints: array<u32>;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) lineCoord: vec3f,
}

fn invalid(p: vec4f) -> bool {
  return p.w == 0.0 || p.x != p.x;
}

@vertex
fn capVertexMain(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
  var output: VertexOutput;

  let pi = 3.141592653589793;
  let tol = 1e-4;

  // Read endpoint info
  let segmentType = endpoints[instanceIndex * 2u + 1u];  // 0 = start, 1 = end
  let N = uniforms.pointCount;

  // Load points so B is always the endpoint, C is the next point toward interior
  // This matches regl-gpu-lines approach where both cap types use same geometry logic
  var pB: vec4f;
  var pC: vec4f;
  var pD: vec4f;

  if (segmentType == 0u) {
    // Start cap: B=0 (endpoint), C=1, D=2
    pB = positions[0u];
    pC = positions[1u];
    pD = select(positions[2u], pC, N < 3u);
  } else {
    // End cap: B=N-1 (endpoint), C=N-2, D=N-3 (reversed order!)
    pB = positions[N - 1u];
    pC = positions[N - 2u];
    pD = select(positions[N - 3u], pC, N < 3u);
  }

  // pA is ALWAYS mirrored from pC to create 180-degree hairpin for cap
  // This is set after perspective divide below

  // Initialize line coordinate
  var lineCoord = vec3f(0.0);
  output.position = pB;

  // Check validity of core points
  if (invalid(pB) || invalid(pC)) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Vertex count for each half of the join
  let v = uniforms.vertCnt2 + vec2f(3.0);
  let vTotal = v.x + v.y;

  // Determine if we're rendering the mirrored second half
  let index = f32(vertexIndex);
  let mirror = index >= v.x;

  // Save w for perspective correction
  let pw = select(pB.w, pC.w, mirror);

  // Convert to screen-pixel coordinates
  pB = vec4f(vec3f(pB.xy * uniforms.resolution, pB.z) / pB.w, 1.0);
  pC = vec4f(vec3f(pC.xy * uniforms.resolution, pC.z) / pC.w, 1.0);
  pD = vec4f(vec3f(pD.xy * uniforms.resolution, pD.z) / pD.w, 1.0);

  // For caps (insertCaps=true): Mirror pA from pC to create 180-degree hairpin turn
  // For no caps (insertCaps=false): Extrapolate pA to create straight continuation
  var pA: vec4f;
  if (uniforms.insertCaps == 1u) {
    // Mirror: pA = pC makes cosB = -1 (hairpin for semicircular cap)
    pA = pC;
  } else {
    // Extrapolate: pA = 2*pB - pC makes cosB = 1 (straight, degenerate cap)
    pA = 2.0 * pB - pC;
  }

  // Check depth range
  if (max(abs(pB.z), abs(pC.z)) > 1.0) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Swap for mirrored half
  if (mirror) {
    let tmp = pC; pC = pB; pB = tmp;
    let tmp2 = pD; pD = pA; pA = tmp2;
  }

  // Tangent and normal vectors
  var tBC = pC.xy - pB.xy;
  let lBC = length(tBC);
  if (lBC > 0.0) { tBC = tBC / lBC; }
  let nBC = vec2f(-tBC.y, tBC.x);

  var tAB = pB.xy - pA.xy;
  let lAB = length(tAB);
  if (lAB > 0.0) { tAB = tAB / lAB; }
  let nAB = vec2f(-tAB.y, tAB.x);

  var tCD = pD.xy - pC.xy;
  let lCD = length(tCD);
  if (lCD > 0.0) { tCD = tCD / lCD; }
  let nCD = vec2f(-tCD.y, tCD.x);

  // Compute cosine of angle at B (will be -1 for hairpin/cap)
  let cosB = clamp(dot(tAB, tBC), -1.0, 1.0);

  // Direction at join
  let mirrorSign = select(1.0, -1.0, mirror);
  var dirB = -dot(tBC, nAB);
  let dirC = dot(tBC, nCD);
  let bCollinear = abs(dirB) < tol;
  let bIsHairpin = bCollinear && cosB < 0.0;
  dirB = select(sign(dirB), -mirrorSign, bCollinear);

  // Miter vector
  var miter = select(0.5 * (nAB + nBC) * dirB, -tBC, bIsHairpin);

  // Compute join index
  var i = select(index, vTotal - index, mirror);
  let res = uniforms.vertCnt2.x;

  // Shift unused vertices
  i = i - max(0.0, select(uniforms.vertCnt2.x, uniforms.vertCnt2.y, mirror) - res);

  // Flip winding for consistent direction
  i = i + select(0.0, -1.0, dirB < 0.0);

  // Offset for mirrored half
  i = i - select(0.0, 1.0, mirror);

  // Clamp to valid range
  i = max(0.0, i);

  // Basis vectors
  var xBasis = tBC;
  var yBasis = nBC * dirB;

  // Default vertex offset
  var xy = vec2f(0.0);

  lineCoord.y = dirB * mirrorSign;

  let width = uniforms.width;
  // isCap: true when we're on the cap end AND caps are being inserted
  // Since we mirror pA = pC when insertCaps=true, the cap (hairpin) is at B
  // The non-mirrored half draws the cap, mirrored half draws the join at C
  // When insertCaps=false, we extrapolate and treat everything as normal joins
  let isCap = !mirror && uniforms.insertCaps == 1u;
  let roundOrCap = uniforms.isRound == 1u || isCap;

  if (i == res + 1.0) {
    // Interior miter point
    let m = select((tAB.x * tBC.y - tAB.y * tBC.x) / (1.0 + cosB), 0.0, cosB <= -0.9999);
    xy = vec2f(min(abs(m), min(lBC, lAB) / width), -1.0);
    lineCoord.y = -lineCoord.y;
  } else {
    // Join geometry
    let m2 = dot(miter, miter);
    let lm = sqrt(m2);
    if (lm > 0.0) {
      yBasis = miter / lm;
      xBasis = dirB * vec2f(yBasis.y, -yBasis.x);
    }
    let isBevel = 1.0 > uniforms.miterLimit * m2;

    if (i % 2.0 == 0.0) {
      // Outer joint points
      if (roundOrCap || i != 0.0) {
        // Round joins (or non-first outer points for miter/bevel)
        // Use theta-based approach from reference
        // For caps: multiply by 2.0 to cover full 180° instead of 90°
        let theta = -0.5 * (acos(cosB) * (clamp(i, 0.0, res) / res) - pi) * select(1.0, 2.0, isCap);
        xy = vec2f(cos(theta), sin(theta));

        // Adjust lineCoord for caps (for correct SDF)
        if (isCap) {
          lineCoord.x = xy.y * lineCoord.y;
          lineCoord.y = xy.x * lineCoord.y;
        }
      } else {
        // Miter/bevel joins - first outer point only (i == 0)
        yBasis = select(miter, vec2f(0.0), bIsHairpin);
        xy.y = select(1.0 / m2, 1.0, isBevel);
      }
    } else {
      // Center of the fan
      lineCoord.y = 0.0;

      // Offset center for bevel SDF
      if (isBevel && !roundOrCap) {
        xy.y = -1.0 + sqrt((1.0 + cosB) * 0.5);
      }
    }
  }

  // Compute final vertex position
  let dP = mat2x2f(xBasis, yBasis) * xy;
  let dx = dot(dP, tBC) * mirrorSign;

  // Interpolation factor for varyings
  let useC = select(0.0, 1.0, mirror) + dx * (width / lBC);
  lineCoord.z = select(0.0, 1.0, useC < 0.0 || useC > 1.0);

  // Flip lineCoord orientation for end caps
  // This matches the reference: if (_orientation == CAP_END) lineCoord.xy = -lineCoord.xy;
  if (segmentType == 1u) {
    lineCoord.x = -lineCoord.x;
    lineCoord.y = -lineCoord.y;
  }

  // Final position
  var pos = pB;
  pos.x = pos.x + width * dP.x;
  pos.y = pos.y + width * dP.y;
  pos.x = pos.x / uniforms.resolution.x;
  pos.y = pos.y / uniforms.resolution.y;
  pos = pos * pw;

  output.position = pos;
  output.lineCoord = lineCoord;

  return output;
}
`;
}

/**
 * Create the cap fragment shader
 */
export function createCapFragmentShader(userCode) {
  return /* wgsl */`
struct FragmentInput {
  @location(0) lineCoord: vec3f,
}

${userCode}

@fragment
fn capFragmentMain(input: FragmentInput) -> @location(0) vec4f {
  return getColor(input.lineCoord);
}
`;
}
