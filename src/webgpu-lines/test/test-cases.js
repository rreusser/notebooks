/**
 * Test case definitions for WebGPU line rendering
 *
 * Each test case specifies:
 * - name: Unique identifier for the test
 * - options: Options passed to createGPULines
 * - pattern: 'zigzag', 'spiral', or 'straight'
 * - width: Line width in pixels
 * - canvasSize: [width, height] of the canvas
 */

export const testCases = [
  // === JOIN TYPES ===
  {
    name: 'join-bevel',
    options: { join: 'bevel', cap: 'round' },
    pattern: 'zigzag',
    width: 40,
    canvasSize: [400, 300]
  },
  {
    name: 'join-miter-limit1',
    options: { join: 'miter', miterLimit: 1, cap: 'round' },
    pattern: 'zigzag',
    width: 40,
    canvasSize: [400, 300]
  },
  {
    name: 'join-miter-limit4',
    options: { join: 'miter', miterLimit: 4, cap: 'round' },
    pattern: 'zigzag',
    width: 40,
    canvasSize: [400, 300]
  },
  {
    name: 'join-round',
    options: { join: 'round', joinResolution: 8, cap: 'round' },
    pattern: 'zigzag',
    width: 40,
    canvasSize: [400, 300]
  },

  // === CAP TYPES ===
  {
    name: 'cap-round',
    options: { join: 'bevel', cap: 'round', capResolution: 8 },
    pattern: 'straight',
    width: 60,
    canvasSize: [400, 200]
  },
  {
    name: 'cap-square',
    options: { join: 'bevel', cap: 'square' },
    pattern: 'straight',
    width: 60,
    canvasSize: [400, 200]
  },
  {
    name: 'cap-none',
    options: { join: 'bevel', cap: 'none' },
    pattern: 'straight',
    width: 60,
    canvasSize: [400, 200]
  },

  // === COMBINED CASES ===
  {
    name: 'round-join-round-cap',
    options: { join: 'round', joinResolution: 12, cap: 'round', capResolution: 12 },
    pattern: 'zigzag',
    width: 50,
    canvasSize: [400, 300]
  },
  {
    name: 'miter-join-none-cap',
    options: { join: 'miter', miterLimit: 4, cap: 'none' },
    pattern: 'zigzag',
    width: 40,
    canvasSize: [400, 300]
  },

  // === SPIRAL PATTERNS ===
  {
    name: 'spiral-round',
    options: { join: 'round', joinResolution: 8, cap: 'round', capResolution: 8 },
    pattern: 'spiral',
    width: 20,
    canvasSize: [400, 400]
  },
  {
    name: 'spiral-bevel',
    options: { join: 'bevel', cap: 'round' },
    pattern: 'spiral',
    width: 20,
    canvasSize: [400, 400]
  },

  // === EDGE CASES ===
  {
    name: 'thin-line',
    options: { join: 'round', cap: 'round' },
    pattern: 'zigzag',
    width: 2,
    canvasSize: [400, 300]
  },
  {
    name: 'thick-line',
    options: { join: 'round', cap: 'round' },
    pattern: 'zigzag',
    width: 80,
    canvasSize: [500, 400]
  },

  // === STROKE OUTLINES (SDF) ===
  // These tests use the lineCoord varying to compute stroke outlines
  {
    name: 'sdf-stroke-round',
    options: { join: 'round', joinResolution: 8, cap: 'round', capResolution: 8 },
    pattern: 'zigzag',
    width: 30,
    canvasSize: [400, 200],
    fragmentShader: /* wgsl */`
      fn linearstep(a: f32, b: f32, x: f32) -> f32 {
        return clamp((x - a) / (b - a), 0.0, 1.0);
      }
      fn getColor(lineCoord: vec3f) -> vec4f {
        let width = 30.0;
        // SDF: distance from center in screen pixels
        let sdf = 0.5 * width * length(lineCoord.xy);
        // Anti-aliased edge
        let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf);
        // Border at 4px from edge
        let border = linearstep(width * 0.5 - 4.5, width * 0.5 - 3.5, sdf);
        // Fill color (light blue) with darker border
        let fillColor = vec3f(0.4, 0.7, 1.0);
        let borderColor = vec3f(0.1, 0.3, 0.6);
        let color = mix(fillColor, borderColor, border);
        return vec4f(color, aa);
      }
    `,
    blend: {
      color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
      alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
    }
  },
  {
    name: 'sdf-stroke-miter',
    options: { join: 'miter', miterLimit: 4, cap: 'square' },
    pattern: 'zigzag',
    width: 30,
    canvasSize: [400, 200],
    fragmentShader: /* wgsl */`
      fn linearstep(a: f32, b: f32, x: f32) -> f32 {
        return clamp((x - a) / (b - a), 0.0, 1.0);
      }
      fn getColor(lineCoord: vec3f) -> vec4f {
        let width = 30.0;
        // For miter joins, use max for rectangular SDF
        let sdf = 0.5 * width * max(abs(lineCoord.x), abs(lineCoord.y));
        let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf);
        let border = linearstep(width * 0.5 - 4.5, width * 0.5 - 3.5, sdf);
        let fillColor = vec3f(1.0, 0.7, 0.4);
        let borderColor = vec3f(0.6, 0.3, 0.1);
        let color = mix(fillColor, borderColor, border);
        return vec4f(color, aa);
      }
    `,
    blend: {
      color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
      alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
    }
  },

  // === LINE BREAKS ===
  // These tests verify that line breaks work correctly via w=0 or NaN values
  {
    name: 'line-break-w0',
    options: { join: 'miter', miterLimit: 4, cap: 'round', capResolution: 8 },
    pattern: 'line-breaks-w0',
    width: 20,
    canvasSize: [256, 128]
  },
  {
    name: 'line-break-nan',
    options: { join: 'miter', miterLimit: 4, cap: 'round', capResolution: 8 },
    pattern: 'line-breaks-nan',
    width: 20,
    canvasSize: [256, 128]
  },
  {
    name: 'line-break-round-cap',
    options: { join: 'round', joinResolution: 8, cap: 'round', capResolution: 8 },
    pattern: 'line-breaks-w0',
    width: 20,
    canvasSize: [256, 128]
  },
  {
    name: 'line-break-square-cap',
    options: { join: 'miter', miterLimit: 4, cap: 'square' },
    pattern: 'line-breaks-w0',
    width: 20,
    canvasSize: [256, 128]
  },
  {
    name: 'line-break-none-cap',
    options: { join: 'miter', miterLimit: 4, cap: 'none' },
    pattern: 'line-breaks-w0',
    width: 20,
    canvasSize: [256, 128]
  },

  // === DEGENERATE CASES ===
  {
    name: 'degenerate-zero-length',
    options: { join: 'round', joinResolution: 4, cap: 'round', capResolution: 4 },
    pattern: 'degenerate',
    width: 20,
    canvasSize: [128, 128]
  },
];

/**
 * Get a subset of test cases by name pattern
 */
export function filterTestCases(pattern) {
  if (!pattern) return testCases;
  const regex = new RegExp(pattern, 'i');
  return testCases.filter(tc => regex.test(tc.name));
}
