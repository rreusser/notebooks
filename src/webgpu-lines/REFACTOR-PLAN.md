# WebGPU Lines Refactor Plan: Integrated Cap Rendering

## Overview

This document describes the refactoring of webgpu-lines from a two-pass architecture (separate cap rendering) to an integrated single-pass architecture where caps are handled automatically via bounds checking.

## Background: regl-gpu-lines Approaches

The original regl-gpu-lines module had two modes:

### 1. Separate End Rendering (Complex)
- Pack endpoint data into dedicated buffers
- Invoke separate draw call for ends
- Renders: last half-join + last segment + end cap
- Requires auxiliary endpoint data and separate draw calls

### 2. Integrated End Rendering (Preferred)
- Detect NaN/sentinel values for line breaks
- Main shader handles caps by detecting when next/prev vertex is invalid
- Requires sentinel values at start/end of data to prevent out-of-bounds access

## New WebGPU Approach: Bounds-Checked Integrated Rendering

In WebGPU, we can do **bounds-checked indexing in the shader itself**, eliminating the need for sentinel values.

### Key Design

**Instance i draws segment i → (i+1)**

Window indices: `[i-1, i, i+1, i+2]` = `[A, B, C, D]`

```wgsl
let A_idx = i32(instanceIndex) - 1;  // Previous point
let B_idx = i32(instanceIndex);       // Segment start
let C_idx = i32(instanceIndex) + 1;   // Segment end
let D_idx = i32(instanceIndex) + 2;   // Next point

// Load with bounds clamping
var pA = positions[u32(clamp(A_idx, 0, N - 1))];
var pD = positions[u32(clamp(D_idx, 0, N - 1))];

// Detect boundary conditions
let aOutOfBounds = A_idx < 0;
let dOutOfBounds = D_idx >= N;
let aInvalid = aOutOfBounds || invalid(pA);  // NaN/w=0 check
let dInvalid = dOutOfBounds || invalid(pD);
```

### Automatic Cap Insertion

When A is invalid → start cap at B (mirror: `pA = pC` creates hairpin)
When D is invalid → end cap at C (mirror: `pD = pB` creates hairpin)

```wgsl
if (aInvalid && insertCaps) { pA = pC; }  // Hairpin for cap
if (dInvalid) { pD = 2.0 * pC - pB; }     // Extrapolate for segment end
```

### Benefits

1. **No sentinel values needed** - user provides `[p0, p1, ..., pN-1]` directly
2. **Single draw call** - entire line including caps
3. **No compute shader** - endpoint detection done inline
4. **Line breaks work naturally** - just set `w=0` or return `vec4(0)`

## Changes Made

### 1. Vertex Shader (`webgpu-lines.js:createVertexShader`)
- [x] Added new uniform fields: `pointCount`, `insertCaps`, `capScale`
- [x] Changed `vertCnt2` to `[capRes2, joinRes2]`
- [x] Implemented bounds-checked indexing
- [x] Added cap detection logic
- [x] Handle cap geometry (2x theta, capScale transform)

### 2. Configuration (`webgpu-lines.js`)
- [x] Changed `insertCaps` to `cap !== 'none'`
- [x] Updated vertex count to handle max(cap, join) resolution

## Changes Still Needed

### 3. Uniform Buffer (`webgpu-lines.js`)

Update uniform buffer size from 32 to 48 bytes:

```javascript
// New uniform struct layout (48 bytes):
struct Uniforms {
  resolution: vec2f,    // 0-7
  vertCnt2: vec2f,      // 8-15   [capRes2, joinRes2]
  miterLimit: f32,      // 16-19
  isRound: u32,         // 20-23
  width: f32,           // 24-27
  pointCount: u32,      // 28-31
  insertCaps: u32,      // 32-35
  _pad: u32,            // 36-39  (padding for vec2f alignment)
  capScale: vec2f,      // 40-47
}
```

### 4. Draw Function (`webgpu-lines.js:draw`)

```javascript
draw(pass, props) {
  const { positionBuffer, vertexCount: pointCount, width, resolution } = props;

  // Update uniforms (48 bytes)
  const uniformData = new ArrayBuffer(48);
  const f32 = new Float32Array(uniformData);
  const u32 = new Uint32Array(uniformData);
  f32[0] = resolution[0];
  f32[1] = resolution[1];
  f32[2] = capRes2;                              // Cap resolution
  f32[3] = joinRes2;                             // Join resolution
  f32[4] = effectiveMiterLimit * effectiveMiterLimit;
  u32[5] = isRound ? 1 : 0;
  f32[6] = width;
  u32[7] = pointCount;                           // NEW
  u32[8] = insertCaps ? 1 : 0;                   // NEW
  // u32[9] is padding
  f32[10] = capScale[0];                         // NEW
  f32[11] = capScale[1];                         // NEW
  device.queue.writeBuffer(uniformBuffer, 0, uniformData);

  // Create data bind group
  const dataBindGroup = device.createBindGroup({...});

  // Instance count = pointCount - 1 (one per segment)
  const instanceCount = Math.max(0, pointCount - 1);

  // Single draw call handles everything
  if (instanceCount > 0) {
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, uniformBindGroup);
    pass.setBindGroup(1, dataBindGroup);
    pass.draw(vertexCount, instanceCount);
  }
}
```

### 5. Remove Cap Infrastructure

Delete or comment out:
- `initCapResources()` function
- Cap compute shaders (`cap-compute.js` imports can be removed)
- Cap pipeline creation
- All cap-related buffers: `capUniformBuffer`, `endpointBuffer`, `counterBuffer`, `indirectBuffer`
- `prepareFrame()` can become a no-op or be removed
- Cap-related entries in `destroy()`

### 6. Update Uniform Buffer Creation

```javascript
const uniformBuffer = device.createBuffer({
  label: 'gpu-lines-uniforms',
  size: 48,  // Was 32
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
});
```

### 7. Add Blend State Option (for fixture validation)

```javascript
export function createGPULines(device, options) {
  const {
    // ... existing options
    blend = null,  // Optional blend state
  } = options;

  // In pipeline creation:
  const pipeline = device.createRenderPipeline({
    // ...
    fragment: {
      module: fragmentModule,
      entryPoint: 'fragmentMain',
      targets: [{
        format,
        blend: blend || undefined  // Use provided blend state
      }]
    },
  });
}
```

## Testing

### Current Tests (in `test/`)
All 13 tests pass with the old architecture. After refactoring:
1. Run `node test/run-tests.js` - all should pass
2. If failures, likely due to subtle geometry differences at caps
3. Use `UPDATE=1` to regenerate baselines if needed

### Fixture Validation (against regl-gpu-lines)
The fixtures use alpha blending to reveal geometry errors:
- Overlapping triangles → darker (overdraw visible)
- Missing triangles → lighter (gaps visible)

To properly validate:
1. Enable blend state in test runner
2. Compare against `regl-gpu-lines/fixtures/*/expected.png`

### Key Fixture Test Cases

```bash
# Round joins + caps
node test/run-fixture-test.js regl-gpu-lines/fixtures/round/basic
node test/run-fixture-test.js regl-gpu-lines/fixtures/round/insert-caps/round

# Miter joins + caps
node test/run-fixture-test.js regl-gpu-lines/fixtures/miter/basic
node test/run-fixture-test.js regl-gpu-lines/fixtures/miter/insert-caps/round
```

## Cap Geometry Details

### Cap vs Join Resolution

- Caps use `capRes2` (e.g., 16 for capResolution=8)
- Joins use `joinRes2` (e.g., 16 for round, 2 for bevel)
- Vertex count uses `max(capRes2, joinRes2)` to handle any combination

### Cap Type Implementation

| Cap Type | capResolution | capScale | Effect |
|----------|---------------|----------|--------|
| round | user (default 8) | [1, 1] | Smooth semicircle |
| square | 3 | [2, 2/√3] | Stretched to square |
| none | 1 | [1, 1] | Minimal flat end |

### Cap Geometry Generation

For caps (`isCap = true`):
1. Use 2x theta multiplier to sweep full semicircle (π instead of π/2)
2. Apply capScale to transform round→square when needed
3. Transform lineCoord: `lineCoord.xy = xy.yx * lineCoord.y`

## Files to Modify

1. `webgpu-lines.js` - Main changes (uniform buffer, draw, remove cap infra)
2. `cap-shaders.js` - Can be deleted or kept for reference
3. `cap-compute.js` - Can be deleted or kept for reference
4. `test/run-single-test.js` - May need minor updates
5. `test/run-fixture-test.js` - Add blend state support

## Rollback Plan

If the integrated approach doesn't work:
1. Git stash/revert changes
2. Keep the current two-pass architecture
3. Fix caps separately in the cap shader

The key insight is that WebGPU's flexibility with storage buffer access allows us to do bounds checking that WebGL couldn't easily do, eliminating the need for sentinel values.
