# Kuramoto-Sivashinsky Equation in 2D (WebGPU)

WebGPU implementation of the 2D Kuramoto-Sivashinsky equation solver using compute shaders and Stockham FFT algorithm.

## Overview

This notebook is a complete translation of the [original WebGL/regl implementation](../kuramoto-sivashinsky-equation-in-2d/) to WebGPU, with significant performance improvements through the use of compute shaders.

## Key Improvements

### 1. Stockham FFT Algorithm (4 passes vs 16 passes)

The most significant improvement is the FFT implementation:

**WebGL Original:**
- Fragment shaders process one pixel at a time
- Requires ~16 passes per 2D FFT (8 horizontal + 8 vertical for 256×256)
- Uses `@rreusser/glsl-fft` library

**WebGPU This:**
- Compute shaders process entire rows/columns in parallel
- Requires only 4 passes per 2D FFT:
  1. Horizontal FFT (all rows in parallel)
  2. Transpose
  3. Vertical FFT (columns as rows)
  4. Transpose back
- Custom Stockham algorithm with shared memory

**Result:** ~4x reduction in FFT passes

### 2. Performance Metrics

Per iteration:
- **WebGL:** 80-112 GPU passes (5-7 FFTs × 16 passes each)
- **WebGPU:** 20-28 GPU passes (5-7 FFTs × 4 passes each)
- **Expected speedup:** 3-5x iterations per second

### 3. Modern WebGPU Features

- **Compute shaders:** All physics computations (differentiation, nonlinear terms, BDF update)
- **Storage buffers:** Direct read/write without framebuffer ping-pong
- **Workgroup shared memory:** 256 complex numbers (2KB) per FFT workgroup
- **Efficient memory access:** Tiled transpose (16×16) for cache coherency

## Implementation Details

### Architecture

```
src/kuramoto-sivashinsky-equation-in-2d-webgpu/
├── index.html                    # Main notebook (Observable 2.0 syntax)
├── metadata.yml                  # Publishing metadata
├── webgpu-context.ts             # WebGPU device initialization
├── buffers.ts                    # Buffer management utilities
├── fft.ts                        # 2D FFT orchestration
├── pipeline.ts                   # Pipeline creation
├── execute.ts                    # Simulation execution
└── shaders/
    ├── helpers.wgsl              # Complex math and wavenumber utilities
    ├── fft_stockham.wgsl         # Stockham FFT compute shader
    ├── transpose.wgsl            # Matrix transpose compute shader
    ├── differentiate.wgsl        # Frequency domain differentiation
    ├── compute_nonlinear.wgsl    # Nonlinear term computation
    ├── bdf_update.wgsl           # BDF2 time integration
    ├── extract_real.wgsl         # Real component extraction
    ├── initialize.wgsl           # Initial conditions
    ├── fullscreen.wgsl           # Fullscreen vertex shader
    └── visualize.wgsl            # Visualization fragment shader
```

### Shader Translation Map

| Original (WebGL) | Type | WebGPU Equivalent | Type | Workgroup |
|---|---|---|---|---|
| initialize | Fragment | initialize.wgsl | Compute | 16×16 |
| differentiateVhat | Fragment | differentiate.wgsl | Compute | 16×16 |
| ABfromVxVy | Fragment | compute_nonlinear.wgsl | Compute | 16×16 |
| bdfUpdate | Fragment | bdf_update.wgsl | Compute | 16×16 |
| stripImag | Fragment | extract_real.wgsl | Compute | 16×16 |
| copyToScreen | Fragment | visualize.wgsl | Fragment | - |
| blit | Vertex | fullscreen.wgsl | Vertex | - |
| FFT (library) | Fragment | fft_stockham.wgsl + transpose.wgsl | Compute | 256×1 + 16×16 |

### FFT Implementation

The Stockham FFT algorithm processes each row/column in a single workgroup:

```wgsl
// Workgroup size: 256 threads (one per element)
@compute @workgroup_size(256, 1, 1)
fn fft_horizontal(...) {
  // 1. Load row into shared memory
  shared_data[thread_id] = input[row * N + thread_id];

  // 2. Perform log2(N) butterfly stages in-place
  for (var stage = 0u; stage < 8u; stage++) {
    // Butterfly with twiddle factors
    // Synchronize between stages
  }

  // 3. Write result back to global memory
  output[row * N + thread_id] = result;
}
```

**Benefits:**
- All butterfly stages computed in one dispatch
- Shared memory reduces global memory traffic
- Perfect parallelism across rows/columns

### Data Flow

#### Initialization
```
1. Generate initial conditions → V[0]
2. Forward FFT: V[0] → Vhat[0]
3. Compute ABhat[0] from Vhat[0]
4. Copy to create BDF2 history
```

#### Each Iteration
```
1. Differentiate: Vhat[1] × i·k → derivatives
2. Inverse FFT: derivatives → (Vx, Vy)
3. Compute: -0.5(Vx², Vy²) → AB
4. Forward FFT: AB → ABhat[1]
5. BDF2 update: {Vhat[0,1], ABhat[0,1]} → Vhat[2]
6. Inverse FFT: Vhat → V (for visualization)
7. Extract real component (workaround)
8. Cycle buffers: [0,1,2] → [1,2,0]
```

## Observable Notebook 2.0 Features

This notebook uses modern Observable syntax:

```javascript
// Plain TypeScript/JavaScript modules
<script id="buffers" type="module">
  import { createSimulationBuffers } from './buffers.js';

  const buffers = createSimulationBuffers({ N, device });

  invalidation.then(() => {
    destroySimulationBuffers(buffers);
  });

  buffers;  // Cell value
</script>

// Reactive inputs
const Lx = view(Inputs.range([1, 128], {
  value: 64,
  label: 'Domain size'
}));

// Multiple outputs
display(html`<p>Status: Ready</p>`);
display(canvas);
```

## Browser Requirements

WebGPU support required:
- **Chrome/Edge:** Version 113+ (stable)
- **Safari:** Version 18+ (macOS Sonoma+)
- **Firefox:** Experimental (enable `dom.webgpu.enabled` in `about:config`)

## Usage

1. Navigate to the notebook in the browser
2. Adjust domain size (Lx) and aspect ratio to control chaos
3. Modify time step (dt) for stability/speed trade-off
4. Change initial condition periods (n) for different patterns
5. Use colorscale controls to visualize solution

### Parameter Guide

- **Small ν₁, ν₂ (< 0.1):** Chaotic, turbulent behavior
- **ν > 1:** Ordered, 1D-like behavior
- **dt = 0.18:** Good balance of speed and stability
- **n = 1:** Simple initial conditions
- **Range [-14, 14]:** Good visualization range for chaotic solutions

## Technical Notes

### Real vs Complex FFT

Like the original, this implementation uses complex FFT on real-valued data, which causes energy leakage into the imaginary component. The workaround is to extract the real component after each iteration.

**Future improvement:** Implement proper Hermitian symmetry enforcement:
```
F[N-k] = conjugate(F[k]) for real-valued input
```

This would eliminate the need for the `extract_real` pass.

### Memory Layout

All data stored as `vec2<f32>` (complex numbers):
- **V buffers:** Spatial domain (real values with zero imaginary)
- **Vhat buffers:** Frequency domain (complex values)
- **ABhat buffers:** Stored as `vec4<f32>` = (A.xy, B.xy)
- **FFT temp buffers:** For transpose operations

### Workgroup Sizing

- **FFT:** 256 threads × 1 (one thread per element)
- **Transpose:** 16 × 16 tiles (memory coalescing)
- **Physics:** 16 × 16 (standard 2D work)

Shared memory usage:
- FFT: 256 complex floats = 2048 bytes (well within 16KB limit)
- Transpose: 16×16 complex floats = 2048 bytes

## Validation

To verify correctness against the WebGL version:

1. Set identical initial conditions (n=1)
2. Set identical parameters (Lx=64, aspect=1, dt=0.18)
3. Run both for 100 iterations
4. Compare visual output and chaotic patterns
5. Verify DC component stays zero
6. Check for NaN/Inf values

## Performance Profiling

To measure performance improvements:

```javascript
// Add to render loop
let frameCount = 0;
let startTime = performance.now();

function render() {
  performIteration(ctx, true);
  frameCount++;

  if (frameCount % 100 === 0) {
    const elapsed = performance.now() - startTime;
    const fps = frameCount / (elapsed / 1000);
    console.log(`FPS: ${fps.toFixed(2)}, Iterations/sec: ${fps.toFixed(2)}`);
  }

  // ... render visualization
}
```

## Known Limitations

1. **Fixed resolution:** 256×256 (can be changed but requires shader recompilation)
2. **Real/complex workaround:** Extra FFT pass for imaginary component extraction
3. **No progressive refinement:** All iterations at full resolution
4. **Single precision:** Uses f32 (consider f16 for mobile)

## Future Enhancements

1. **Hermitian symmetry:** Eliminate `extract_real` pass
2. **Timestamp queries:** Precise GPU timing for each pass
3. **Multiple resolutions:** Dynamic grid sizing
4. **Compute-only visualization:** Generate pixels in compute shader
5. **Buffer reuse:** Reduce temporary allocations
6. **DHT implementation:** Real-valued Hartley Transform instead of complex FFT

## References

- [Kalogirou's Thesis](https://spiral.imperial.ac.uk/bitstream/10044/1/25067/1/Kalogirou-A-2013-PhD-Thesis.pdf) - BDF2 formulation (Appendix F)
- [Kuramoto-Sivashinsky Equation](https://encyclopediaofmath.org/wiki/Kuramoto-Sivashinsky_equation) - Mathematical background
- [Original WebGL Implementation](../kuramoto-sivashinsky-equation-in-2d/) - Source for comparison

## License

Same as parent repository.
