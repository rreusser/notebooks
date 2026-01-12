// Matrix Transpose Compute Shader
//
// Transposes a 2D array of complex numbers using 16×16 tile-based access
// for memory coalescing and efficient cache usage.
//
// Input:  row-major layout [y*N + x]
// Output: column-major layout [x*N + y]

struct TransposeParams {
  N: u32,  // Matrix dimension (assumed square N×N)
}

@group(0) @binding(0) var<storage, read> input: array<vec2<f32>>;
@group(0) @binding(1) var<storage, read_write> output: array<vec2<f32>>;
@group(0) @binding(2) var<uniform> params: TransposeParams;

// Shared memory tile (16×16 complex numbers = 2KB)
var<workgroup> tile: array<vec2<f32>, 256>;  // 16*16

@compute @workgroup_size(16, 16, 1)
fn transpose(@builtin(global_invocation_id) global_id: vec3<u32>,
             @builtin(local_invocation_id) local_id: vec3<u32>,
             @builtin(workgroup_id) workgroup_id: vec3<u32>) {
  let N = params.N;
  let x = global_id.x;
  let y = global_id.y;
  let local_x = local_id.x;
  let local_y = local_id.y;

  // Load tile from input (row-major) - all threads participate
  let input_idx = y * N + x;
  let tile_idx = local_y * 16u + local_x;

  // Load data (use zero if out of bounds, but all threads must reach barrier)
  if (x < N && y < N) {
    tile[tile_idx] = input[input_idx];
  } else {
    tile[tile_idx] = vec2<f32>(0.0, 0.0);
  }

  // Synchronize to ensure tile is fully loaded
  // All threads must reach this point (uniform control flow)
  workgroupBarrier();

  // Write transposed data to output (column-major)
  // Note: we transpose the local indices when reading from tile
  let transposed_tile_idx = local_x * 16u + local_y;
  let transposed_x = workgroup_id.y * 16u + local_x;
  let transposed_y = workgroup_id.x * 16u + local_y;

  if (transposed_x < N && transposed_y < N) {
    let output_idx = transposed_y * N + transposed_x;
    output[output_idx] = tile[transposed_tile_idx];
  }
}
