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
 */

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
 */
export function createGPULines(device, options) {
  const {
    vertexShaderBody,
    fragmentShaderBody,
    format,
    join = 'bevel',
    joinResolution = 8,
    miterLimit = 4,
  } = options;

  const isRound = join === 'round';
  const joinRes2 = isRound ? joinResolution * 2 : 2;

  // Number of vertices per instance in the triangle strip
  // Structure: [first half join] [miter point] [segment] [second half join mirrored]
  // For bevel: joinRes2 = 2, so v = 2 + 3 = 5 per half, total = 10
  const vertCnt = joinRes2 + 3;
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

  // Create render pipeline
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
      targets: [{ format }]
    },
    primitive: {
      topology: 'triangle-strip',
      stripIndexFormat: undefined
    }
  });

  // Create uniform buffer
  const uniformBuffer = device.createBuffer({
    label: 'gpu-lines-uniforms',
    size: 32, // resolution (vec2), vertCnt2 (vec2), miterLimit (f32), isRound (u32), padding
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });

  // Create uniform bind group
  const uniformBindGroup = device.createBindGroup({
    layout: uniformBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: uniformBuffer } }
    ]
  });

  return {
    /**
     * Draw lines
     * @param {GPURenderPassEncoder} pass - Render pass
     * @param {object} props - Draw properties
     * @param {GPUBuffer} props.positionBuffer - Buffer with vec4 positions
     * @param {number} props.vertexCount - Number of vertices in the line
     * @param {number} props.width - Line width in pixels
     * @param {number[]} props.resolution - Viewport resolution [width, height]
     */
    draw(pass, props) {
      const { positionBuffer, vertexCount: pointCount, width, resolution } = props;

      // Update uniforms
      const uniformData = new ArrayBuffer(32);
      const f32 = new Float32Array(uniformData);
      const u32 = new Uint32Array(uniformData);
      f32[0] = resolution[0];
      f32[1] = resolution[1];
      f32[2] = joinRes2;
      f32[3] = joinRes2;
      f32[4] = miterLimit * miterLimit;
      u32[5] = isRound ? 1 : 0;
      f32[6] = width;
      device.queue.writeBuffer(uniformBuffer, 0, uniformData);

      // Create data bind group for this draw
      const dataBindGroup = device.createBindGroup({
        layout: dataBindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: positionBuffer } }
        ]
      });

      // Number of instances = pointCount - 3 (need 4 points per segment window)
      const instanceCount = Math.max(0, pointCount - 3);

      if (instanceCount <= 0) return;

      pass.setPipeline(pipeline);
      pass.setBindGroup(0, uniformBindGroup);
      pass.setBindGroup(1, dataBindGroup);
      pass.draw(vertexCount, instanceCount);
    },

    destroy() {
      uniformBuffer.destroy();
    }
  };
}

/**
 * Create the vertex shader
 */
function createVertexShader(userCode, isRound) {
  return /* wgsl */`
// Uniforms
struct Uniforms {
  resolution: vec2f,
  vertCnt2: vec2f,
  miterLimit: f32,
  isRound: u32,
  width: f32,
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

  // Load the 4-point window for this instance
  let baseIdx = instanceIndex;
  var pA = positions[baseIdx];
  var pB = positions[baseIdx + 1];
  var pC = positions[baseIdx + 2];
  var pD = positions[baseIdx + 3];

  // Initialize line coordinate
  var lineCoord = vec3f(0.0);

  // Default position
  output.position = pB;

  // Check validity
  let aInvalid = invalid(pA);
  let bInvalid = invalid(pB);
  let cInvalid = invalid(pC);
  let dInvalid = invalid(pD);

  // Early return if core points invalid
  if (bInvalid || cInvalid) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Vertex count for each half of the join
  let v = uniforms.vertCnt2 + vec2f(3.0);
  let N = v.x + v.y;

  // Determine if we're rendering the mirrored second half
  let index = f32(vertexIndex);
  let mirror = index >= v.x;

  // Save w for perspective correction
  let pw = select(pB.w, pC.w, mirror);

  // Convert to screen-pixel coordinates
  pA = vec4f(vec3f(pA.xy * uniforms.resolution, pA.z) / pA.w, 1.0);
  pB = vec4f(vec3f(pB.xy * uniforms.resolution, pB.z) / pB.w, 1.0);
  pC = vec4f(vec3f(pC.xy * uniforms.resolution, pC.z) / pC.w, 1.0);
  pD = vec4f(vec3f(pD.xy * uniforms.resolution, pD.z) / pD.w, 1.0);

  // Check depth range
  if (max(abs(pB.z), abs(pC.z)) > 1.0) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Swap for mirrored half
  if (mirror) {
    let tmp = pC; pC = pB; pB = tmp;
    let tmp2 = pD; pD = pA; pA = tmp2;
    let tmpInv = dInvalid;
    // Note: we'd need to track validity swap too, simplified for now
  }

  // Handle invalid endpoints by extrapolation or cap
  if (aInvalid) { pA = 2.0 * pB - pC; }
  if (dInvalid) { pD = 2.0 * pC - pB; }

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

  // Compute cosine of angle at B
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
  var i = select(index, N - index, mirror);
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
  let roundOrCap = uniforms.isRound == 1u;

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
        // Round joins
        let theta = -0.5 * (acos(cosB) * (clamp(i, 0.0, res) / res) - pi);
        xy = vec2f(cos(theta), sin(theta));
      } else {
        // Miter/bevel joins
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
