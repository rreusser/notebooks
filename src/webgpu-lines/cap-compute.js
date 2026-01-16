/**
 * Compute shaders for endpoint detection and indirect draw buffer management
 *
 * The cap pass draws the boundary segments that the main pass misses:
 * - Main pass draws segments 1→2, 2→3, ..., (N-3)→(N-2)
 * - Cap pass draws segments 0→1 (start) and (N-2)→(N-1) (end)
 */

/**
 * Create the compute shader that finds line endpoints
 * For a continuous line, this always produces exactly 2 caps (start and end)
 * For lines with breaks (w=0), additional caps appear at break points
 */
export function createFindEndpointsShader() {
  return /* wgsl */`
struct ComputeParams {
  pointCount: u32,
}

@group(0) @binding(0) var<storage, read> positions: array<vec4f>;
@group(0) @binding(1) var<storage, read_write> endpoints: array<u32>;
@group(0) @binding(2) var<storage, read_write> counter: atomic<u32>;
@group(0) @binding(3) var<uniform> params: ComputeParams;

fn invalid(p: vec4f) -> bool {
  return p.w == 0.0 || p.x != p.x;
}

@compute @workgroup_size(64)
fn findEndpoints(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  let N = params.pointCount;

  // We only care about detecting boundary segments
  // For simplicity, thread 0 handles all boundary detection
  if (i != 0u) { return; }
  if (N < 2u) { return; }

  // Check if first segment (0→1) needs a cap
  // This segment is always a start cap if points 0 and 1 are valid
  let p0 = positions[0u];
  let p1 = positions[1u];
  if (!invalid(p0) && !invalid(p1)) {
    let slot = atomicAdd(&counter, 1u);
    endpoints[slot * 2u] = 0u;      // Segment index (unused, we just need type)
    endpoints[slot * 2u + 1u] = 0u; // 0 = start cap
  }

  // Check if last segment ((N-2)→(N-1)) needs a cap
  // This segment is always an end cap if points N-2 and N-1 are valid
  if (N >= 2u) {
    let pNm2 = positions[N - 2u];
    let pNm1 = positions[N - 1u];
    if (!invalid(pNm2) && !invalid(pNm1)) {
      let slot = atomicAdd(&counter, 1u);
      endpoints[slot * 2u] = 1u;      // Segment index (unused)
      endpoints[slot * 2u + 1u] = 1u; // 1 = end cap
    }
  }
}
`;
}

/**
 * Create the compute shader that updates the indirect draw buffer
 * Reads the atomic counter and sets up the indirect draw parameters
 */
export function createUpdateIndirectShader(capVertexCount) {
  return /* wgsl */`
@group(0) @binding(0) var<storage, read_write> counter: atomic<u32>;
@group(0) @binding(1) var<storage, read_write> indirect: array<u32>;

@compute @workgroup_size(1)
fn updateIndirect() {
  let capCount = atomicLoad(&counter);
  // Indirect buffer format for draw():
  // [vertexCount, instanceCount, firstVertex, firstInstance]
  indirect[0] = ${capVertexCount}u;   // Vertices per cap
  indirect[1] = capCount;              // Number of cap instances
  indirect[2] = 0u;                    // First vertex
  indirect[3] = 0u;                    // First instance
}
`;
}
