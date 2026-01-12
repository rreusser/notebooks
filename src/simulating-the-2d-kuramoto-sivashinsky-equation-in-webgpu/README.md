# Simulating the 2D Kuramoto-Sivashinsky Equation in WebGPU

WebGPU implementation of the 2D Kuramoto-Sivashinsky equation solver using compute shaders.

## Overview

This notebook solves the 2D Kuramoto-Sivashinsky equation using WebGPU compute shaders with a Cooley-Tukey radix-2 FFT implementation.

## Architecture

```
src/simulating-the-2d-kuramoto-sivashinsky-equation-in-webgpu/
├── index.html              # Main notebook
├── metadata.yml            # Publishing metadata
├── webgpu-context.ts       # WebGPU device initialization
├── fft.ts                  # 2D FFT orchestration
├── fft-generator.ts        # Generates Cooley-Tukey FFT shaders
├── fft-large.ts            # Hierarchical FFT for large grids
├── fft-large-generator.ts  # Generates hierarchical FFT shaders
├── pipeline.ts             # Pipeline creation
└── shaders/
    ├── helpers.wgsl                  # Complex math utilities
    ├── initialize.wgsl               # Initial conditions
    ├── differentiate.wgsl            # Frequency domain differentiation
    ├── extract_mixed_derivatives.wgsl
    ├── compute_ab.wgsl               # Nonlinear term A, B computation
    ├── pack_abhat.wgsl               # Pack Ahat/Bhat into vec4
    ├── compute_nonlinear.wgsl
    ├── bdf_update.wgsl               # BDF2 time integration
    ├── extract_real.wgsl             # Real component extraction
    ├── transpose.wgsl                # Matrix transpose
    ├── fft_small.wgsl
    ├── fft_stockham.wgsl
    ├── fullscreen.wgsl               # Fullscreen vertex shader
    └── visualize.wgsl                # Visualization fragment shader
```

## FFT Implementation

The 2D FFT uses Cooley-Tukey radix-2 decimation-in-time with bit-reversal permutation:

1. Horizontal FFT (all rows in parallel)
2. Transpose
3. Vertical FFT (columns as rows after transpose)
4. Transpose back

For grid sizes larger than the device's maximum workgroup size (typically 256), a hierarchical four-step FFT decomposes the transform into smaller pieces.

## Grid Sizes

Supports power-of-2 grid sizes from 32x32 to 1024x1024, automatically selecting simple or hierarchical FFT based on device limits.

## Browser Requirements

WebGPU support required:
- Chrome/Edge 113+
- Safari 18+ (macOS Sonoma+)
- Firefox: Experimental (`dom.webgpu.enabled` in `about:config`)

## References

- [Kalogirou's Thesis](https://spiral.imperial.ac.uk/bitstream/10044/1/25067/1/Kalogirou-A-2013-PhD-Thesis.pdf) - BDF2 formulation (Appendix F)
- [Kuramoto-Sivashinsky Equation](https://encyclopediaofmath.org/wiki/Kuramoto-Sivashinsky_equation)
