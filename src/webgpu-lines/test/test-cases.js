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
];

/**
 * Get a subset of test cases by name pattern
 */
export function filterTestCases(pattern) {
  if (!pattern) return testCases;
  const regex = new RegExp(pattern, 'i');
  return testCases.filter(tc => regex.test(tc.name));
}
