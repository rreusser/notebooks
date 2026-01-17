# lineCoord Implementation Notes

## Overview

The `lineCoord` varying provides spatial information to fragment shaders:
- `lineCoord.x`: Position along line/cap (0 for segments/joins, varies for caps)
- `lineCoord.y`: Position across the line (-1 to 1, 0 = center)

## Key Insight: lineCoord.x Semantics

**IMPORTANT**: `lineCoord.x` is NOT a distance-along-line metric in the reference implementation (regl-gpu-lines).

### What lineCoord.x Actually Does

1. **For segments and joins**: `lineCoord.x = 0` (always zero)
2. **For caps only**: `lineCoord.xy = xy.yx * lineCoord.y` where `xy = (cos(theta), sin(theta))`

This means for round caps:
- `lineCoord.x = sin(theta) * sign` - varies from 0 at cap start to ±1 at cap middle to 0 at cap end
- `lineCoord.y = cos(theta) * sign` - varies from ±1 at cap start to 0 at cap middle to ∓1 at cap end

### Why This Matters for SDF

The SDF fragment shaders use `length(lineCoord)` for radial distance:

```wgsl
let sdf = 0.5 * width * length(lineCoord);
```

With the correct implementation:
- **Segments/joins**: `length(lineCoord) = abs(lineCoord.y)` since `lineCoord.x = 0`
- **Caps**: `length(lineCoord) = 1` on the outer edge (unit circle)

This gives a consistent radial distance metric for SDF rendering.

## Distance Along Line for Dashes

If you need actual distance-along-line for dashed lines, the reference approach is:

1. **Pre-compute cumulative distance** as a vertex attribute on the CPU
2. **Interpolate using `useC`** in the vertex shader
3. **Use a separate varying** (not lineCoord.x) for the distance

Example from regl-gpu-lines `with-extrapolate-varying` shader:
```glsl
attribute float distB, distC;
varying float vDist;
// ...
vDist = getDist(mix(distB, distC, useC));
```

The `useC` interpolant correctly accounts for vertex position offset along the tangent.

## Summary

| Component | Segments/Joins | Caps |
|-----------|---------------|------|
| `lineCoord.x` | 0 | `sin(theta) * sign` |
| `lineCoord.y` | -1 to 1 (across line) | `cos(theta) * sign` |
| `length(lineCoord)` | `abs(lineCoord.y)` | 1 on outer edge |

## References

- regl-gpu-lines: `reference-shaders/basic_segments.vert.glsl`
- Dash example: Uses pre-computed `dist` attribute, not `lineCoord.x`
