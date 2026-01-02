/**
 * Debug coordinate mapping between parent buffer and target tile
 */

import { getQuadrant } from '../tile-hierarchy.js';
import { getTargetOffsetInParent } from '../../compute/lsao-pipeline.js';

// Test all quadrants
const testCases = [
  { x: 2, y: 2, z: 2, name: 'NW' },
  { x: 3, y: 2, z: 2, name: 'NE' },
  { x: 2, y: 3, z: 2, name: 'SW' },
  { x: 3, y: 3, z: 2, name: 'SE' }
];

console.log('=== Coordinate Mapping Debug ===\n');

for (const tc of testCases) {
  const quadrant = getQuadrant(tc.x, tc.y);
  const offset = getTargetOffsetInParent(quadrant);

  console.log(`${tc.name} Quadrant (x=${tc.x}, y=${tc.y})`);
  console.log(`  Quadrant: ${quadrant}`);
  console.log(`  Target offset in parent: [${offset[0]}, ${offset[1]}]`);
  console.log(`  Target region: [${offset[0]}, ${offset[0] + 256}) × [${offset[1]}, ${offset[1] + 256})`);
  console.log('');
}

// Real test case
const realTile = { x: 795, y: 1594, z: 12 };
const realQuadrant = getQuadrant(realTile.x, realTile.y);
const realOffset = getTargetOffsetInParent(realQuadrant);

console.log('Real tile: 12/795/1594');
console.log(`  Quadrant: ${realQuadrant}`);
console.log(`  Target offset in parent: [${realOffset[0]}, ${realOffset[1]}]`);
console.log(`  Target region: [${realOffset[0]}, ${realOffset[0] + 256}) × [${realOffset[1]}, ${realOffset[1] + 256})`);
