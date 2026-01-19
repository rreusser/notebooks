/**
 * WebGPU GPU Lines - Instanced line rendering for WebGPU
 *
 * Based on regl-gpu-lines, adapted for WebGPU with user-controlled vertex data.
 *
 * Key concepts:
 * - Each instance renders one line segment (from point B to point C)
 * - Uses 4-point windows: A (previous), B (start), C (end), D (next)
 * - Triangle strip covers: half of join at B, segment B→C, half of join at C
 * - User provides vertex function that computes position, width, and varyings
 * - Library handles join/cap geometry generation
 */

/**
 * Parse a WGSL struct definition to extract field names and types
 * @param {string} code - WGSL code containing struct definition
 * @param {string} structName - Name of struct to find (or null to find first struct returned by a function)
 * @returns {Array<{name: string, type: string}>} Array of field definitions
 */
function parseStructFields(code, structName) {
  // Find struct definition
  const structRegex = structName
    ? new RegExp(`struct\\s+${structName}\\s*\\{([^}]+)\\}`, 's')
    : /struct\s+(\w+)\s*\{([^}]+)\}/s;

  const match = code.match(structRegex);
  if (!match) return [];

  const body = structName ? match[1] : match[2];
  const fields = [];

  // Parse fields: name: type,
  // Match field name, colon, then type (stopping at comma or end of struct)
  const fieldRegex = /(\w+)\s*:\s*([\w<>]+)\s*,?/g;
  let fieldMatch;
  while ((fieldMatch = fieldRegex.exec(body)) !== null) {
    fields.push({
      name: fieldMatch[1].trim(),
      type: fieldMatch[2].trim()
    });
  }

  return fields;
}

/**
 * Find the return type of a function
 * @param {string} code - WGSL code
 * @param {string} functionName - Function name to find
 * @returns {string|null} Return type or null
 */
function findFunctionReturnType(code, functionName) {
  const regex = new RegExp(`fn\\s+${functionName}\\s*\\([^)]*\\)\\s*->\\s*(\\w+)`, 's');
  const match = code.match(regex);
  return match ? match[1] : null;
}

/**
 * Create a WebGPU lines renderer
 *
 * @param {GPUDevice} device - WebGPU device
 * @param {object} options - Configuration options
 * @param {string} options.vertexShaderBody - WGSL code with struct definition and vertex function
 * @param {string} options.fragmentShaderBody - WGSL code for fragment output (getColor function)
 * @param {GPUTextureFormat} options.format - Output texture format
 * @param {string} [options.vertexFunction='getVertex'] - Name of user's vertex function
 * @param {string} [options.positionField='position'] - Name of position field in vertex struct
 * @param {string} [options.widthField='width'] - Name of width field in vertex struct (optional)
 * @param {string} [options.join='bevel'] - Join type: 'bevel', 'miter', or 'round'
 * @param {number} [options.joinResolution=8] - Resolution for round joins
 * @param {number} [options.miterLimit=4] - Miter limit before switching to bevel
 * @param {string} [options.cap='round'] - Cap type: 'round', 'square', or 'none'
 * @param {number} [options.capResolution=8] - Resolution for round caps
 * @param {object} [options.blend] - Optional blend state for alpha blending
 * @param {GPUTextureFormat} [options.depthFormat] - Optional depth format for depth testing (e.g., 'depth24plus')
 */
export function createGPULines(device, options) {
  const {
    vertexShaderBody,
    fragmentShaderBody,
    format,
    vertexFunction = 'getVertex',
    positionField = 'position',
    widthField = 'width',
    join = 'bevel',
    joinResolution = 8,
    miterLimit = 4,
    cap = 'round',
    capResolution: userCapResolution = 8,
    blend = null,
    depthFormat = null,
  } = options;

  // Parse user's vertex struct to find varyings
  const returnType = findFunctionReturnType(vertexShaderBody, vertexFunction);
  if (!returnType) {
    throw new Error(`Could not find vertex function '${vertexFunction}' in vertexShaderBody`);
  }

  const structFields = parseStructFields(vertexShaderBody, returnType);
  if (structFields.length === 0) {
    throw new Error(`Could not parse struct '${returnType}' in vertexShaderBody`);
  }

  // Identify position, width, and varying fields
  const positionIdx = structFields.findIndex(f => f.name === positionField);
  if (positionIdx === -1) {
    throw new Error(`Position field '${positionField}' not found in struct '${returnType}'`);
  }

  const widthIdx = structFields.findIndex(f => f.name === widthField);
  if (widthIdx === -1) {
    throw new Error(`Width field '${widthField}' not found in struct '${returnType}'. The vertex struct must include a width field.`);
  }

  // Everything else is a varying
  const varyings = structFields.filter((f, i) =>
    i !== positionIdx && i !== widthIdx
  );

  const isRound = join === 'round';
  const isBevel = join === 'bevel';
  const joinRes2 = isRound ? joinResolution * 2 : 2;
  const effectiveMiterLimit = isBevel ? 0 : miterLimit;

  const insertCaps = cap !== 'none';
  let capResolution;
  if (cap === 'none') {
    capResolution = 1;
  } else if (cap === 'square') {
    capResolution = 3;
  } else {
    capResolution = userCapResolution;
  }

  const capRes2 = capResolution * 2;
  const capScale = cap === 'square' ? [2, 2 / Math.sqrt(3)] : [1, 1];

  const maxRes = Math.max(capRes2, joinRes2);
  const vertCnt = maxRes + 3;
  const vertexCountPerInstance = vertCnt * 2;

  // Generate shader code
  const vertexShader = createVertexShader({
    userCode: vertexShaderBody,
    vertexFunction,
    returnType,
    positionField,
    widthField,
    varyings,
    isRound,
  });

  const fragmentShader = createFragmentShader({
    userCode: fragmentShaderBody,
    varyings,
  });

  // Count user varyings for debug varying locations
  const debugVaryingStartLocation = varyings.length + 1; // +1 for lineCoord at location 0

  // Create shader modules
  const vertexModule = device.createShaderModule({
    label: 'gpu-lines-vertex',
    code: vertexShader
  });

  const fragmentModule = device.createShaderModule({
    label: 'gpu-lines-fragment',
    code: fragmentShader
  });

  // Create bind group layout for library uniforms only (group 0)
  const uniformBindGroupLayout = device.createBindGroupLayout({
    label: 'gpu-lines-uniforms',
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      buffer: { type: 'uniform' }
    }]
  });

  // Use 'auto' layout so user's bind groups are inferred from shader
  const pipelineDescriptor = {
    label: 'gpu-lines',
    layout: 'auto',
    vertex: {
      module: vertexModule,
      entryPoint: 'vertexMain',
    },
    fragment: {
      module: fragmentModule,
      entryPoint: 'fragmentMain',
      targets: [blend ? { format, blend } : { format }]
    },
    primitive: {
      topology: 'triangle-strip',
      stripIndexFormat: undefined
    }
  };

  // Add depth stencil state if depthFormat is specified
  if (depthFormat) {
    pipelineDescriptor.depthStencil = {
      format: depthFormat,
      depthWriteEnabled: true,
      depthCompare: 'less'
    };
  }

  const pipeline = device.createRenderPipeline(pipelineDescriptor);

  // Uniform buffer layout (48 bytes):
  // resolution(8) + vertCnt2(8) + miterLimit(4) + isRound(4) + width(4) + pointCount(4) + insertCaps(4) + pad(4) + capScale(8)
  const uniformBuffer = device.createBuffer({
    label: 'gpu-lines-uniforms',
    size: 48,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  // Create uniform bind group using pipeline's inferred layout
  const uniformBindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }]
  });

  // Pre-allocate uniform data buffer and cache last values to avoid redundant writes
  const _uniformData = new ArrayBuffer(48);
  const _f32 = new Float32Array(_uniformData);
  const _u32 = new Uint32Array(_uniformData);
  // Initialize static values that never change
  _f32[2] = capRes2;
  _f32[3] = joinRes2;
  _f32[4] = effectiveMiterLimit * effectiveMiterLimit;
  _u32[5] = isRound ? 1 : 0;
  _u32[8] = insertCaps ? 1 : 0;
  _u32[9] = 0; // padding
  _f32[10] = capScale[0];
  _f32[11] = capScale[1];
  // Track last dynamic values to detect changes
  let _lastWidth = -1;
  let _lastPointCount = -1;
  let _lastResX = -1;
  let _lastResY = -1;
  let _uniformsWritten = false;

  return {
    /**
     * Get bind group layout for user's data (group 1, 2, etc.)
     * @param {number} index - Bind group index (1+)
     */
    getBindGroupLayout(index) {
      return pipeline.getBindGroupLayout(index);
    },

    /**
     * Update uniforms before the render pass begins.
     * Call this before beginRenderPass() to avoid writes during the pass.
     * @param {object} props - Draw properties
     * @param {number} props.vertexCount - Number of vertices in the line
     * @param {number} props.width - Line width in pixels
     * @param {Array<number>} props.resolution - [width, height] of render target
     */
    updateUniforms(props) {
      const { vertexCount: pointCount, width, resolution } = props;

      // Only write if values changed
      const needsUpdate = !_uniformsWritten ||
        width !== _lastWidth ||
        pointCount !== _lastPointCount ||
        resolution[0] !== _lastResX ||
        resolution[1] !== _lastResY;

      if (needsUpdate) {
        _f32[0] = resolution[0];
        _f32[1] = resolution[1];
        _f32[6] = width;
        _u32[7] = pointCount;
        device.queue.writeBuffer(uniformBuffer, 0, _uniformData);

        _lastWidth = width;
        _lastPointCount = pointCount;
        _lastResX = resolution[0];
        _lastResY = resolution[1];
        _uniformsWritten = true;
      }
    },

    /**
     * Draw lines
     * @param {GPURenderPassEncoder} pass - Render pass
     * @param {object} props - Draw properties
     * @param {number} props.vertexCount - Number of vertices in the line
     * @param {number} props.width - Line width in pixels (used if no per-vertex width)
     * @param {Array<number>} props.resolution - [width, height] of render target
     * @param {boolean} [props.skipUniformUpdate] - Skip uniform update (call updateUniforms first)
     * @param {Array<GPUBindGroup>} [bindGroups] - User bind groups for groups 1, 2, etc.
     */
    draw(pass, props, bindGroups = []) {
      const { vertexCount: pointCount, skipUniformUpdate } = props;

      // Update uniforms if not skipped (for backwards compatibility)
      if (!skipUniformUpdate) {
        this.updateUniforms(props);
      }

      const instanceCount = Math.max(0, pointCount - 1);

      if (instanceCount > 0) {
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, uniformBindGroup);

        // Set user's bind groups (1, 2, ...)
        for (let i = 0; i < bindGroups.length; i++) {
          pass.setBindGroup(i + 1, bindGroups[i]);
        }

        pass.draw(vertexCountPerInstance, instanceCount);
      }
    },

    destroy() {
      uniformBuffer.destroy();
    }
  };
}

/**
 * Create the vertex shader
 */
function createVertexShader({
  userCode,
  vertexFunction,
  returnType,
  positionField,
  widthField,
  varyings,
  isRound,
}) {
  // Generate varying declarations for VertexOutput
  const varyingOutputDecls = varyings.map((v, i) =>
    `  @location(${i + 1}) ${v.name}: ${v.type},`
  ).join('\n');

  // Library debug varyings come after user varyings
  const debugVaryingStartLoc = varyings.length + 1;

  // Generate varying interpolation code
  const varyingInterpolation = varyings.map(v =>
    `  let ${v.name} = mix(vertexB.${v.name}, vertexC.${v.name}, clamp(useC, 0.0, 1.0));`
  ).join('\n');

  // Generate output assignment for varyings
  const varyingOutputAssign = varyings.map(v =>
    `  output.${v.name} = ${v.name};`
  ).join('\n');

  return /* wgsl */`
// Library uniforms
struct Uniforms {
  resolution: vec2f,
  vertCnt2: vec2f,
  miterLimit: f32,
  isRound: u32,
  width: f32,
  pointCount: u32,
  insertCaps: u32,
  _pad: u32,
  capScale: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

// Vertex output (library + user varyings + debug varyings)
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) lineCoord: vec2f,
${varyingOutputDecls}
  @location(${debugVaryingStartLoc}) instanceID: f32,
  @location(${debugVaryingStartLoc + 1}) triStripCoord: vec2f,
}

// User-provided code (bindings, structs, vertex function)
${userCode}

// Check if position is invalid (line break)
fn invalid(p: vec4f) -> bool {
  return p.w == 0.0 || p.x != p.x;
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
  let A_idx = i32(instanceIndex) - 1;
  let B_idx = i32(instanceIndex);
  let C_idx = i32(instanceIndex) + 1;
  let D_idx = i32(instanceIndex) + 2;

  // Call user's vertex function for each point in the window
  let vertexA = ${vertexFunction}(u32(clamp(A_idx, 0, N - 1)));
  let vertexB = ${vertexFunction}(u32(B_idx));
  let vertexC = ${vertexFunction}(u32(C_idx));
  let vertexD = ${vertexFunction}(u32(clamp(D_idx, 0, N - 1)));

  // Extract positions
  var pA = vertexA.${positionField};
  var pB = vertexB.${positionField};
  var pC = vertexC.${positionField};
  var pD = vertexD.${positionField};

  // Determine invalid states
  let aOutOfBounds = A_idx < 0;
  let dOutOfBounds = D_idx >= N;
  var aInvalid = aOutOfBounds || invalid(pA);
  var dInvalid = dOutOfBounds || invalid(pD);
  let bInvalid = invalid(pB);
  let cInvalid = invalid(pC);

  // Initialize output
  var lineCoord = vec2f(0.0);
  output.position = pB;

  // Skip degenerate segments
  if (bInvalid || cInvalid) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Vertex counts for each half
  let capRes = uniforms.vertCnt2.x;
  let joinRes = uniforms.vertCnt2.y;
  let resB = select(joinRes, capRes, aInvalid && uniforms.insertCaps == 1u);
  let resC = select(joinRes, capRes, dInvalid && uniforms.insertCaps == 1u);
  let vB = resB + 3.0;
  let vC = resC + 3.0;
  let vTotal = vB + vC;

  // Determine if mirrored half
  let index = f32(vertexIndex);
  let mirror = index >= vB;

  // Perspective correction
  let pw = select(pB.w, pC.w, mirror);

  // Convert to screen-pixel coordinates
  let wA = select(pA.w, pB.w, aInvalid);
  let wD = select(pD.w, pC.w, dInvalid);
  pA = vec4f(vec3f(pA.xy * uniforms.resolution, pA.z) / wA, 1.0);
  pB = vec4f(vec3f(pB.xy * uniforms.resolution, pB.z) / pB.w, 1.0);
  pC = vec4f(vec3f(pC.xy * uniforms.resolution, pC.z) / pC.w, 1.0);
  pD = vec4f(vec3f(pD.xy * uniforms.resolution, pD.z) / wD, 1.0);

  // Depth check
  if (max(abs(pB.z), abs(pC.z)) > 1.0) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Compute cap status before mirror swap (for debug varyings)
  let isStartCap = aInvalid && uniforms.insertCaps == 1u;
  let isEndCap = dInvalid && uniforms.insertCaps == 1u;

  // Swap for mirrored half
  if (mirror) {
    let tmp = pC; pC = pB; pB = tmp;
    let tmp2 = pD; pD = pA; pA = tmp2;
    let tmpInv = dInvalid; dInvalid = aInvalid; aInvalid = tmpInv;
  }

  // Handle caps/joins
  let isCap = aInvalid && uniforms.insertCaps == 1u;

  if (aInvalid) {
    if (uniforms.insertCaps == 1u) {
      pA = pC;
    } else {
      pA = 2.0 * pB - pC;
    }
  }
  if (dInvalid) {
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

  // Angle at B
  let cosB = clamp(dot(tAB, tBC), -1.0, 1.0);

  // Direction
  let mirrorSign = select(1.0, -1.0, mirror);
  var dirB = -dot(tBC, nAB);
  let bCollinear = abs(dirB) < tol;
  let bIsHairpin = bCollinear && cosB < 0.0;
  dirB = select(sign(dirB), -mirrorSign, bCollinear);

  // Miter vector
  var miter = select(0.5 * (nAB + nBC) * dirB, -tBC, bIsHairpin);

  // Join index
  var i = select(index, vTotal - index, mirror);
  let res = select(resB, resC, mirror);
  i = i - max(0.0, select(resB, resC, mirror) - res);
  i = i + select(0.0, -1.0, dirB < 0.0);
  i = i - select(0.0, 1.0, mirror);
  i = max(0.0, i);

  // Basis vectors
  var xBasis = tBC;
  var yBasis = nBC * dirB;
  var xy = vec2f(0.0);

  lineCoord.y = dirB * mirrorSign;

  // Get width from vertex struct (computed per-vertex)
  let width = select(vertexB.${widthField}, vertexC.${widthField}, mirror);
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
      if (roundOrCap || i != 0.0) {
        let t = clamp(i, 0.0, res) / res;
        let capMult = select(1.0, 2.0, isCap);
        let theta = -0.5 * (acos(cosB) * t - pi) * capMult;
        xy = vec2f(cos(theta), sin(theta));

        if (isCap) {
          if (xy.y > 0.001) {
            xy = xy * uniforms.capScale;
          }
          let prevLineCoordY = lineCoord.y;
          lineCoord.x = xy.y * prevLineCoordY;
          lineCoord.y = xy.x * prevLineCoordY;
        }
      } else {
        yBasis = select(miter, vec2f(0.0), bIsHairpin);
        xy.y = select(1.0 / m2, 1.0, isBevel);
      }
    } else {
      lineCoord.y = 0.0;
      if (isBevel && !roundOrCap) {
        xy.y = -1.0 + sqrt((1.0 + cosB) * 0.5);
      }
    }
  }

  // Final position
  let dP = mat2x2f(xBasis, yBasis) * xy;
  let dx = dot(dP, tBC) * mirrorSign;

  // For segments/joins, lineCoord.x stays at 0 (initialized above)
  // For caps, lineCoord.x was set in the cap geometry block

  var pos = pB;
  pos.x = pos.x + width * dP.x;
  pos.y = pos.y + width * dP.y;
  pos.x = pos.x / uniforms.resolution.x;
  pos.y = pos.y / uniforms.resolution.y;
  pos = pos * pw;

  // Interpolation factor for varyings
  let useC = select(0.0, 1.0, mirror) + dx * (width / lBC);

  // Interpolate user varyings
${varyingInterpolation}

  output.position = pos;
  output.lineCoord = lineCoord;
${varyingOutputAssign}

  // Debug varyings: instanceID and triStripCoord
  // instanceID: segment index (negative for caps to distinguish them)
  // Note: isStartCap and isEndCap were computed before the mirror swap
  output.instanceID = select(f32(instanceIndex), -0.5, isStartCap || isEndCap);

  // triStripCoord: encodes position in the triangle strip for wireframe rendering
  // x: vertex pair index (0, 1, 2, ...), y: top (1) or bottom (0) of strip
  output.triStripCoord = vec2f(floor(f32(vertexIndex) * 0.5), f32(vertexIndex % 2u));

  return output;
}
`;
}

/**
 * Create the fragment shader
 */
function createFragmentShader({ userCode, varyings }) {
  // Generate varying declarations for FragmentInput
  const varyingInputDecls = varyings.map((v, i) =>
    `  @location(${i + 1}) ${v.name}: ${v.type},`
  ).join('\n');

  // Library debug varyings come after user varyings
  const debugVaryingStartLoc = varyings.length + 1;

  // Generate varying arguments for getColor call
  const varyingArgs = varyings.map(v => `input.${v.name}`).join(', ');
  const getColorArgs = varyingArgs ? `, ${varyingArgs}` : '';

  // Detect if user's getColor expects debug varyings by checking for instanceID in the code
  const wantsDebugVaryings = /\binstanceID\b/.test(userCode);
  const debugArgs = wantsDebugVaryings ? ', input.instanceID, input.triStripCoord' : '';

  return /* wgsl */`
// Library uniforms (shared with vertex shader)
struct Uniforms {
  resolution: vec2f,
  vertCnt2: vec2f,
  miterLimit: f32,
  isRound: u32,
  width: f32,
  pointCount: u32,
  insertCaps: u32,
  _pad: u32,
  capScale: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct FragmentInput {
  @location(0) lineCoord: vec2f,
${varyingInputDecls}
  @location(${debugVaryingStartLoc}) instanceID: f32,
  @location(${debugVaryingStartLoc + 1}) triStripCoord: vec2f,
}

${userCode}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  return getColor(input.lineCoord${getColorArgs}${debugArgs});
}
`;
}
