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

import { createCapVertexShader, createCapFragmentShader } from './cap-shaders.js';
import { createFindEndpointsShader, createUpdateIndirectShader } from './cap-compute.js';

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
    capResolution = 8,
  } = options;

  const isRound = join === 'round';
  const isBevel = join === 'bevel';
  const joinRes2 = isRound ? joinResolution * 2 : 2;

  // For bevel joins, set miterLimit to 0 so isBevel is always true in shader
  // This makes all joins flat instead of using the miter limit calculation
  const effectiveMiterLimit = isBevel ? 0 : miterLimit;

  // Number of vertices per instance in the triangle strip
  // Structure: [first half join] [miter point] [segment] [second half join mirrored]
  // For bevel: joinRes2 = 2, so v = 2 + 3 = 5 per half, total = 10
  const vertCnt = joinRes2 + 3;
  const vertexCount = vertCnt * 2;

  // Cap configuration
  // We always need the cap pass to draw boundary segments (0→1 and (N-2)→(N-1))
  // The cap TYPE controls whether we draw semicircular caps or flat ends
  // - 'round'/'square': mirror pA=pC for semicircular cap
  // - 'none': extrapolate pA=2*pB-pC for flat end (degenerate cap geometry)
  const insertCaps = cap !== 'none';  // Whether to mirror (true) or extrapolate (false)
  // Cap vertex count is same as main (they draw full segments with joins)
  const capVertexCount = vertexCount;

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

  // ===== CAP RENDERING INFRASTRUCTURE =====

  // Cap-related resources (created lazily on first draw with caps)
  let capPipeline = null;
  let capUniformBuffer = null;
  let capUniformBindGroup = null;
  let findEndpointsPipeline = null;
  let updateIndirectPipeline = null;
  let endpointBuffer = null;
  let counterBuffer = null;
  let indirectBuffer = null;
  let computeParamsBuffer = null;
  let computeBindGroup = null;
  let indirectBindGroup = null;
  let capDataBindGroup = null;
  let currentMaxPoints = 0;

  function initCapResources(pointCount) {
    // Always need cap resources for boundary segments
    // Only recreate if point count increased
    if (pointCount <= currentMaxPoints) return;
    currentMaxPoints = Math.max(pointCount, currentMaxPoints * 2 || 256);

    // Destroy old buffers if they exist
    if (endpointBuffer) endpointBuffer.destroy();
    if (counterBuffer) counterBuffer.destroy();
    if (indirectBuffer) indirectBuffer.destroy();
    if (computeParamsBuffer) computeParamsBuffer.destroy();

    // Create endpoint buffer: pairs of (pointIndex, capType)
    // Max endpoints = 2 * number of possible line breaks + 2 endpoints
    const maxEndpoints = currentMaxPoints;
    endpointBuffer = device.createBuffer({
      label: 'cap-endpoints',
      size: maxEndpoints * 2 * 4,  // u32 pairs
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });

    // Atomic counter buffer
    counterBuffer = device.createBuffer({
      label: 'cap-counter',
      size: 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
    });

    // Indirect draw buffer
    indirectBuffer = device.createBuffer({
      label: 'cap-indirect',
      size: 16,  // 4 x u32
      usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });

    // Compute params buffer
    computeParamsBuffer = device.createBuffer({
      label: 'cap-compute-params',
      size: 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
  }

  function initCapPipelines() {
    // Always need cap pipelines for boundary segments
    if (capPipeline) return;

    // Create cap shader modules
    const capVertexModule = device.createShaderModule({
      label: 'gpu-lines-cap-vertex',
      code: createCapVertexShader(isRound)
    });

    const capFragmentModule = device.createShaderModule({
      label: 'gpu-lines-cap-fragment',
      code: createCapFragmentShader(fragmentShaderBody)
    });

    const findEndpointsModule = device.createShaderModule({
      label: 'gpu-lines-find-endpoints',
      code: createFindEndpointsShader()
    });

    const updateIndirectModule = device.createShaderModule({
      label: 'gpu-lines-update-indirect',
      code: createUpdateIndirectShader(capVertexCount)
    });

    // Create bind group layout for compute shader (find endpoints)
    const computeBindGroupLayout = device.createBindGroupLayout({
      label: 'cap-compute-layout',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },  // positions
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },           // endpoints
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },           // counter
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },           // params
      ]
    });

    // Create bind group layout for indirect update compute
    const indirectBindGroupLayout = device.createBindGroupLayout({
      label: 'cap-indirect-layout',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },  // counter
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },  // indirect
      ]
    });

    // Create compute pipeline for finding endpoints
    findEndpointsPipeline = device.createComputePipeline({
      label: 'find-endpoints',
      layout: device.createPipelineLayout({ bindGroupLayouts: [computeBindGroupLayout] }),
      compute: {
        module: findEndpointsModule,
        entryPoint: 'findEndpoints'
      }
    });

    // Create compute pipeline for updating indirect buffer
    updateIndirectPipeline = device.createComputePipeline({
      label: 'update-indirect',
      layout: device.createPipelineLayout({ bindGroupLayouts: [indirectBindGroupLayout] }),
      compute: {
        module: updateIndirectModule,
        entryPoint: 'updateIndirect'
      }
    });

    // Create cap uniform bind group layout (same as main for simplicity)
    const capUniformBindGroupLayout = device.createBindGroupLayout({
      label: 'cap-uniforms-layout',
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
          buffer: { type: 'uniform' }
        }
      ]
    });

    // Create cap data bind group layout
    const capDataBindGroupLayout = device.createBindGroupLayout({
      label: 'cap-data-layout',
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },  // positions
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },  // endpoints
      ]
    });

    // Create cap render pipeline
    capPipeline = device.createRenderPipeline({
      label: 'gpu-lines-caps',
      layout: device.createPipelineLayout({
        bindGroupLayouts: [capUniformBindGroupLayout, capDataBindGroupLayout]
      }),
      vertex: {
        module: capVertexModule,
        entryPoint: 'capVertexMain',
      },
      fragment: {
        module: capFragmentModule,
        entryPoint: 'capFragmentMain',
        targets: [{ format }]
      },
      primitive: {
        topology: 'triangle-strip',
        stripIndexFormat: undefined
      }
    });

    // Create cap uniform buffer
    // CapUniforms: resolution (vec2f), vertCnt2 (vec2f), miterLimit (f32), isRound (u32), width (f32), pointCount (u32), insertCaps (u32)
    capUniformBuffer = device.createBuffer({
      label: 'cap-uniforms',
      size: 48,  // Increased for insertCaps + alignment
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    // Create cap uniform bind group
    capUniformBindGroup = device.createBindGroup({
      layout: capUniformBindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: capUniformBuffer } }
      ]
    });
  }

  function updateCapBindGroups(positionBuffer) {
    // Always update for boundary segment rendering

    // Update compute bind group
    computeBindGroup = device.createBindGroup({
      layout: findEndpointsPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: positionBuffer } },
        { binding: 1, resource: { buffer: endpointBuffer } },
        { binding: 2, resource: { buffer: counterBuffer } },
        { binding: 3, resource: { buffer: computeParamsBuffer } },
      ]
    });

    // Update indirect bind group
    indirectBindGroup = device.createBindGroup({
      layout: updateIndirectPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: counterBuffer } },
        { binding: 1, resource: { buffer: indirectBuffer } },
      ]
    });

    // Update cap data bind group
    capDataBindGroup = device.createBindGroup({
      layout: capPipeline.getBindGroupLayout(1),
      entries: [
        { binding: 0, resource: { buffer: positionBuffer } },
        { binding: 1, resource: { buffer: endpointBuffer } },
      ]
    });
  }

  // Track last position buffer for bind group caching
  let lastPositionBuffer = null;

  return {
    /**
     * Prepare frame by running compute passes for endpoint detection
     * Must be called before beginRenderPass if caps are enabled
     *
     * @param {GPUCommandEncoder} encoder - Command encoder
     * @param {object} props - Properties
     * @param {GPUBuffer} props.positionBuffer - Buffer with vec4 positions
     * @param {number} props.vertexCount - Number of vertices in the line
     */
    prepareFrame(encoder, props) {
      // Always prepare for boundary segment rendering
      const { positionBuffer, vertexCount: pointCount } = props;

      // Initialize pipelines on first call
      initCapPipelines();

      // Initialize/resize buffers if needed
      initCapResources(pointCount);

      // Update bind groups if position buffer changed
      if (positionBuffer !== lastPositionBuffer) {
        updateCapBindGroups(positionBuffer);
        lastPositionBuffer = positionBuffer;
      }

      // Reset counter to 0
      device.queue.writeBuffer(counterBuffer, 0, new Uint32Array([0]));

      // Update compute params
      device.queue.writeBuffer(computeParamsBuffer, 0, new Uint32Array([pointCount]));

      // Run compute shader to find endpoints
      const computePass = encoder.beginComputePass({ label: 'find-endpoints' });
      computePass.setPipeline(findEndpointsPipeline);
      computePass.setBindGroup(0, computeBindGroup);
      computePass.dispatchWorkgroups(Math.ceil(pointCount / 64));
      computePass.end();

      // Update indirect buffer with endpoint count
      const indirectPass = encoder.beginComputePass({ label: 'update-indirect' });
      indirectPass.setPipeline(updateIndirectPipeline);
      indirectPass.setBindGroup(0, indirectBindGroup);
      indirectPass.dispatchWorkgroups(1);
      indirectPass.end();
    },

    /**
     * Draw lines (segments + caps)
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
      f32[4] = effectiveMiterLimit * effectiveMiterLimit;
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

      // Draw segments
      if (instanceCount > 0) {
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, uniformBindGroup);
        pass.setBindGroup(1, dataBindGroup);
        pass.draw(vertexCount, instanceCount);
      }

      // Draw boundary segments (with optional caps) using indirect draw
      if (capPipeline && capDataBindGroup) {
        // Update cap uniforms - same structure as main uniforms plus pointCount and insertCaps
        const capUniformData = new ArrayBuffer(48);
        const capF32 = new Float32Array(capUniformData);
        const capU32 = new Uint32Array(capUniformData);
        capF32[0] = resolution[0];
        capF32[1] = resolution[1];
        capF32[2] = joinRes2;
        capF32[3] = joinRes2;
        capF32[4] = effectiveMiterLimit * effectiveMiterLimit;
        capU32[5] = isRound ? 1 : 0;
        capF32[6] = width;
        capU32[7] = pointCount;
        capU32[8] = insertCaps ? 1 : 0;  // Whether to mirror (cap) or extrapolate (no cap)
        device.queue.writeBuffer(capUniformBuffer, 0, capUniformData);

        pass.setPipeline(capPipeline);
        pass.setBindGroup(0, capUniformBindGroup);
        pass.setBindGroup(1, capDataBindGroup);
        pass.drawIndirect(indirectBuffer, 0);
      }
    },

    destroy() {
      uniformBuffer.destroy();
      if (capUniformBuffer) capUniformBuffer.destroy();
      if (endpointBuffer) endpointBuffer.destroy();
      if (counterBuffer) counterBuffer.destroy();
      if (indirectBuffer) indirectBuffer.destroy();
      if (computeParamsBuffer) computeParamsBuffer.destroy();
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
        // Round joins (or non-first outer points for miter/bevel)
        let theta = -0.5 * (acos(cosB) * (clamp(i, 0.0, res) / res) - pi);
        xy = vec2f(cos(theta), sin(theta));
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
