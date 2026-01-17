/**
 * WebGPU GPU Lines - Instanced line rendering for WebGPU
 *
 * Based on regl-gpu-lines, but adapted for WebGPU with simplified interface.
 *
 * Key concepts:
 * - Each instance renders one line segment (from point B to point C)
 * - Uses 4-point windows: A (previous), B (start), C (end), D (next)
 * - Triangle strip covers: half of join at B, segment B→C, half of join at C
 * - Index-based vertex generation in the vertex shader
 * - End caps are rendered via compute shader + indirect draw
 */

// Legacy cap infrastructure imports (no longer used in integrated architecture)
// import { createCapVertexShader, createCapFragmentShader } from './cap-shaders.js';
// import { createFindEndpointsShader, createUpdateIndirectShader } from './cap-compute.js';

/**
 * Create a WebGPU lines renderer
 *
 * @param {GPUDevice} device - WebGPU device
 * @param {object} options - Configuration options
 * @param {string} options.vertexShaderBody - WGSL code for position/width functions
 * @param {string} options.fragmentShaderBody - WGSL code for fragment output
 * @param {GPUTextureFormat} options.format - Output texture format
 * @param {string} [options.join='bevel'] - Join type: 'bevel', 'miter', or 'round'
 * @param {number} [options.joinResolution=8] - Resolution for round joins
 * @param {number} [options.miterLimit=4] - Miter limit before switching to bevel
 * @param {string} [options.cap='round'] - Cap type: 'round', 'square', or 'none'
 * @param {number} [options.capResolution=8] - Resolution for round caps
 * @param {object} [options.blend] - Optional blend state for alpha blending
 */
export function createGPULines(device, options) {
  const {
    vertexShaderBody,
    fragmentShaderBody,
    format,
    join = 'bevel',
    joinResolution = 8,
    miterLimit = 4,
    cap = 'round',
    capResolution: userCapResolution = 8,
    blend = null,  // Optional blend state
  } = options;

  const isRound = join === 'round';
  const isBevel = join === 'bevel';
  const joinRes2 = isRound ? joinResolution * 2 : 2;

  // For bevel joins, set miterLimit to 0 so isBevel is always true in shader
  // This makes all joins flat instead of using the miter limit calculation
  const effectiveMiterLimit = isBevel ? 0 : miterLimit;

  // Cap configuration
  // insertCaps controls whether line ends get caps (true) or flat ends (false)
  // Cap TYPE is controlled by capResolution and capScale:
  // - 'none': insertCaps=true but capResolution=1 makes minimal cap
  // - 'square': capResolution=3 with capScale stretches to square
  // - 'round': uses user capResolution for smooth semicircle
  const insertCaps = cap !== 'none';

  // Compute effective cap resolution based on cap type (like regl-gpu-lines)
  let capResolution;
  if (cap === 'none') {
    capResolution = 1;  // Minimal geometry for flat end
  } else if (cap === 'square') {
    capResolution = 3;  // Minimal points, stretched by capScale
  } else {
    capResolution = userCapResolution;  // User-specified for round caps
  }

  // Resolution values for shader (doubled for triangle strip vertices)
  const capRes2 = capResolution * 2;

  // Cap scale: [1,1] for round, [2, 2/sqrt(3)] for square
  const capScale = cap === 'square' ? [2, 2 / Math.sqrt(3)] : [1, 1];

  // Vertex count per instance: maximum of cap and join to handle all cases
  // Each half uses res + 3 vertices, where res can be capRes2 or joinRes2
  const maxRes = Math.max(capRes2, joinRes2);
  const vertCnt = maxRes + 3;
  const vertexCount = vertCnt * 2;

  const vertexShader = createVertexShader(vertexShaderBody, isRound);
  const fragmentShader = createFragmentShader(fragmentShaderBody);

  // Create shader modules
  const vertexModule = device.createShaderModule({
    label: 'gpu-lines-vertex',
    code: vertexShader
  });

  const fragmentModule = device.createShaderModule({
    label: 'gpu-lines-fragment',
    code: fragmentShader
  });

  // Create bind group layout for uniforms
  const uniformBindGroupLayout = device.createBindGroupLayout({
    label: 'gpu-lines-uniforms',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' }
      }
    ]
  });

  // Create bind group layout for vertex data (storage buffers)
  const dataBindGroupLayout = device.createBindGroupLayout({
    label: 'gpu-lines-data',
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX,
        buffer: { type: 'read-only-storage' }
      }
    ]
  });

  // Create pipeline layout
  const pipelineLayout = device.createPipelineLayout({
    label: 'gpu-lines-pipeline',
    bindGroupLayouts: [uniformBindGroupLayout, dataBindGroupLayout]
  });

  // Create render pipeline with optional blend state
  const target = { format };
  if (blend) {
    target.blend = blend;
  }

  const pipeline = device.createRenderPipeline({
    label: 'gpu-lines',
    layout: pipelineLayout,
    vertex: {
      module: vertexModule,
      entryPoint: 'vertexMain',
    },
    fragment: {
      module: fragmentModule,
      entryPoint: 'fragmentMain',
      targets: [target]
    },
    primitive: {
      topology: 'triangle-strip',
      stripIndexFormat: undefined
    }
  });

  // Create uniform buffer (112 bytes for integrated cap rendering with view matrix)
  // Layout: resolution(8) + vertCnt2(8) + miterLimit(4) + isRound(4) + width(4) + pointCount(4) + insertCaps(4) + pad(4) + capScale(8) + viewMatrix(64)
  const uniformBuffer = device.createBuffer({
    label: 'gpu-lines-uniforms',
    size: 112,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  // Create uniform bind group
  const uniformBindGroup = device.createBindGroup({
    layout: uniformBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: uniformBuffer } }
    ]
  });

  // ===== INTEGRATED ARCHITECTURE =====
  // Caps are handled in the main vertex shader via bounds checking.
  // No separate cap infrastructure needed - single draw call does everything!

  return {
    /**
     * Prepare frame (no-op in integrated architecture)
     * Kept for API compatibility - caps are now handled in the main draw pass
     */
    prepareFrame(encoder, props) {
      // No-op: integrated architecture handles caps in the main vertex shader
      // This method is kept for backwards compatibility
    },
    /**
     * Draw lines with integrated cap rendering (single pass)
     * Instance i draws segment i → (i+1), with automatic cap detection at boundaries
     */
    draw(pass, props) {
      const { positionBuffer, vertexCount: pointCount, width, resolution, viewMatrix } = props;

      // Identity matrix as default
      const identity = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
      const view = viewMatrix || identity;

      // Update uniforms (112 bytes)
      const uniformData = new ArrayBuffer(112);
      const f32 = new Float32Array(uniformData);
      const u32 = new Uint32Array(uniformData);
      f32[0] = resolution[0];
      f32[1] = resolution[1];
      f32[2] = capRes2;                              // Cap resolution
      f32[3] = joinRes2;                             // Join resolution
      f32[4] = effectiveMiterLimit * effectiveMiterLimit;
      u32[5] = isRound ? 1 : 0;
      f32[6] = width;
      u32[7] = pointCount;                           // Point count for bounds checking
      u32[8] = insertCaps ? 1 : 0;                   // Mirror for caps vs extrapolate
      // u32[9] is padding for vec2f alignment
      f32[10] = capScale[0];                         // Cap scale X
      f32[11] = capScale[1];                         // Cap scale Y
      // View matrix at offset 48 (12 floats * 4 bytes = 48)
      for (let i = 0; i < 16; i++) {
        f32[12 + i] = view[i];
      }
      device.queue.writeBuffer(uniformBuffer, 0, uniformData);

      // Create data bind group for this draw
      const dataBindGroup = device.createBindGroup({
        layout: dataBindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: positionBuffer } }
        ]
      });

      // Instance count = pointCount - 1 (one instance per segment)
      // Instance i draws segment from point i to point i+1
      const instanceCount = Math.max(0, pointCount - 1);

      // Single draw call handles all segments AND caps
      if (instanceCount > 0) {
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, uniformBindGroup);
        pass.setBindGroup(1, dataBindGroup);
        pass.draw(vertexCount, instanceCount);
      }
    },

    destroy() {
      uniformBuffer.destroy();
    }
  };
}

/**
 * Create the vertex shader (integrated approach - handles both segments and caps)
 *
 * Key design: Instance i draws segment i → (i+1)
 * - Window indices: [i-1, i, i+1, i+2] = [A, B, C, D]
 * - Bounds checking in shader detects caps automatically
 * - No sentinel values needed at data boundaries
 */
function createVertexShader(userCode, isRound) {
  return /* wgsl */`
// Uniforms
struct Uniforms {
  resolution: vec2f,
  vertCnt2: vec2f,       // [capRes2, joinRes2] - resolution for cap vs join halves
  miterLimit: f32,
  isRound: u32,
  width: f32,
  pointCount: u32,
  insertCaps: u32,       // 1 = mirror for caps, 0 = extrapolate for flat ends
  _pad: u32,             // padding for vec2f alignment
  capScale: vec2f,       // [1,1] for round, [2, 2/sqrt(3)] for square
  viewMatrix: mat4x4f,   // View/projection matrix for zoom/pan
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

// Position buffer - array of vec4 (xyz + w, where w=0 indicates line break)
@group(1) @binding(0) var<storage, read> positions: array<vec4f>;

// Vertex output
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) lineCoord: vec3f,
}

// User-provided shader code
${userCode}

// Check if position is invalid (line break)
fn invalid(p: vec4f) -> bool {
  return p.w == 0.0 || p.x != p.x; // NaN check
}

@vertex
fn vertexMain(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
  var output: VertexOutput;

  let pi = 3.141592653589793;
  let tol = 1e-4;
  let N = i32(uniforms.pointCount);

  // Instance i draws segment i → (i+1)
  // Window indices: [i-1, i, i+1, i+2] = [A, B, C, D]
  let A_idx = i32(instanceIndex) - 1;
  let B_idx = i32(instanceIndex);
  let C_idx = i32(instanceIndex) + 1;
  let D_idx = i32(instanceIndex) + 2;

  // Load points with bounds clamping for A and D
  var pA = positions[u32(clamp(A_idx, 0, N - 1))];
  var pB = positions[u32(B_idx)];
  var pC = positions[u32(C_idx)];
  var pD = positions[u32(clamp(D_idx, 0, N - 1))];

  // Determine invalid states BEFORE applying view matrix (check raw data)
  let aOutOfBounds = A_idx < 0;
  let dOutOfBounds = D_idx >= N;
  var aInvalid = aOutOfBounds || invalid(pA);
  var dInvalid = dOutOfBounds || invalid(pD);
  let bInvalid = invalid(pB);
  let cInvalid = invalid(pC);

  // Apply view matrix to transform from data coords to clip coords
  // Only transform valid points (invalid points will be fixed up later)
  if (!aInvalid) { pA = uniforms.viewMatrix * pA; }
  pB = uniforms.viewMatrix * pB;
  pC = uniforms.viewMatrix * pC;
  if (!dInvalid) { pD = uniforms.viewMatrix * pD; }

  // Initialize line coordinate
  var lineCoord = vec3f(0.0);
  output.position = pB;

  // Skip degenerate segments (B or C invalid)
  if (bInvalid || cInvalid) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Vertex counts: v.x for first half (cap/join at B), v.y for second half (cap/join at C)
  // When at a cap, we use capRes2; when at a join, we use joinRes2
  let capRes = uniforms.vertCnt2.x;
  let joinRes = uniforms.vertCnt2.y;

  // Determine resolution for each half based on whether it's a cap or join
  let resB = select(joinRes, capRes, aInvalid && uniforms.insertCaps == 1u);
  let resC = select(joinRes, capRes, dInvalid && uniforms.insertCaps == 1u);

  let vB = resB + 3.0;
  let vC = resC + 3.0;
  let vTotal = vB + vC;

  // Determine if we're rendering the mirrored second half
  let index = f32(vertexIndex);
  let mirror = index >= vB;

  // Save w for perspective correction
  let pw = select(pB.w, pC.w, mirror);

  // Convert to screen-pixel coordinates
  // Handle invalid points by using a valid point's w (avoid div by 0)
  let wA = select(pA.w, pB.w, aInvalid);
  let wD = select(pD.w, pC.w, dInvalid);
  pA = vec4f(vec3f(pA.xy * uniforms.resolution, pA.z) / wA, 1.0);
  pB = vec4f(vec3f(pB.xy * uniforms.resolution, pB.z) / pB.w, 1.0);
  pC = vec4f(vec3f(pC.xy * uniforms.resolution, pC.z) / pC.w, 1.0);
  pD = vec4f(vec3f(pD.xy * uniforms.resolution, pD.z) / wD, 1.0);

  // Check depth range
  if (max(abs(pB.z), abs(pC.z)) > 1.0) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Swap for mirrored half
  if (mirror) {
    let tmp = pC; pC = pB; pB = tmp;
    let tmp2 = pD; pD = pA; pA = tmp2;
    // Swap invalid flags too
    let tmpInv = dInvalid; dInvalid = aInvalid; aInvalid = tmpInv;
  }

  // Handle invalid endpoints: mirror for caps, extrapolate for flat ends
  // isCap is true when we're at a boundary AND insertCaps is enabled
  let isCap = aInvalid && uniforms.insertCaps == 1u;

  if (aInvalid) {
    if (uniforms.insertCaps == 1u) {
      // Mirror: pA = pC creates hairpin (180-degree turn) for cap
      pA = pC;
    } else {
      // Extrapolate: creates straight continuation (no cap)
      pA = 2.0 * pB - pC;
    }
  }
  if (dInvalid) {
    // Always extrapolate D for the far end of this segment
    pD = 2.0 * pC - pB;
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
  let res = select(resB, resC, mirror);

  // Shift unused vertices (when cap/join have different resolutions)
  let maxRes = max(resB, resC);
  i = i - max(0.0, select(resB, resC, mirror) - res);

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
  let roundOrCap = uniforms.isRound == 1u || isCap;

  if (i == res + 1.0) {
    // Interior miter point
    let m = select((tAB.x * tBC.y - tAB.y * tBC.x) / (1.0 + cosB), 0.0, cosB <= -0.9999);
    xy = vec2f(min(abs(m), min(lBC, lAB) / width), -1.0);
    lineCoord.y = -lineCoord.y;
  } else {
    // Join/cap geometry
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
        // Round joins/caps (or non-first outer points for miter/bevel)
        let t = clamp(i, 0.0, res) / res;
        var theta: f32;

        // For caps, use 2x multiplier to sweep full semicircle
        let capMult = select(1.0, 2.0, isCap);
        theta = -0.5 * (acos(cosB) * t - pi) * capMult;

        xy = vec2f(cos(theta), sin(theta));

        // For caps, apply capScale and transform lineCoord
        if (isCap) {
          if (xy.y > 0.001) {
            xy = xy * uniforms.capScale;
          }
          let prevLineCoordY = lineCoord.y;
          lineCoord.x = xy.y * prevLineCoordY;
          lineCoord.y = xy.x * prevLineCoordY;
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
 * Create the fragment shader
 */
function createFragmentShader(userCode) {
  return /* wgsl */`
struct FragmentInput {
  @location(0) lineCoord: vec3f,
}

${userCode}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  return getColor(input.lineCoord);
}
`;
}
