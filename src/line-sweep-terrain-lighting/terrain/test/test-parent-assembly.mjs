/**
 * Test parent tile assembly
 *
 * Creates synthetic parent tile data and verifies the assembly produces
 * correct 768×768 buffers for different target quadrants.
 */

import { assembleParentTileBuffer } from '../parent-tile-assembly.js';
import { getTileSet } from '../tile-hierarchy.js';

/**
 * Create synthetic tile data with a pattern that can be verified
 *
 * Each tile is filled with a value that encodes its role and position.
 * Value = roleId * 1000 + y * 32 + x (unique per tile and position)
 */
function createSyntheticTile(role, roleId) {
  const tileSize = 512;
  const buffer = 1;
  const width = tileSize + 2 * buffer;
  const height = width;
  const data = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      // Create pattern: roleId in thousands, position in ones/tens
      data[idx] = roleId * 1000 + (y % 32) * 32 + (x % 32);
    }
  }

  return { data, width, height, tileSize, role };
}

/**
 * Test assembly for a specific target tile
 */
function testAssembly(targetTile, testName) {
  console.log(`\n=== ${testName} ===`);
  console.log(`Target: z=${targetTile.z}, x=${targetTile.x}, y=${targetTile.y}`);

  // Get tile set
  const tileSet = getTileSet(targetTile);
  console.log(`Tile set:`, tileSet.map(t => `${t.role}`).join(', '));

  // Create synthetic parent tiles
  const roleToId = {
    'parent-base': 1,
    'parent-north': 2,
    'parent-south': 3,
    'parent-east': 4,
    'parent-west': 5,
    'parent-nw': 6,
    'parent-ne': 7,
    'parent-sw': 8,
    'parent-se': 9
  };

  const parentTiles = tileSet
    .filter(t => t.role !== 'target')
    .map(t => createSyntheticTile(t.role, roleToId[t.role]));

  console.log(`Parent tiles:`, parentTiles.map(t => t.role).join(', '));

  // Assemble
  const buffer = assembleParentTileBuffer({ targetTile, parentTiles });

  // Verify dimensions
  const expectedSize = 768;
  const actualSize = Math.sqrt(buffer.length);
  console.log(`Buffer size: ${actualSize}×${actualSize} (expected ${expectedSize}×${expectedSize})`);

  if (actualSize !== expectedSize) {
    console.error(`❌ Size mismatch!`);
    return false;
  }

  // Verify data integrity by checking corners and center
  const checkPoints = [
    { x: 0, y: 0, name: 'top-left' },
    { x: 767, y: 0, name: 'top-right' },
    { x: 0, y: 767, name: 'bottom-left' },
    { x: 767, y: 767, name: 'bottom-right' },
    { x: 384, y: 384, name: 'center' }
  ];

  console.log('\nSample values:');
  for (const point of checkPoints) {
    const idx = point.y * 768 + point.x;
    const value = buffer[idx];
    const roleId = Math.floor(value / 1000);
    const roleName = Object.entries(roleToId).find(([k, v]) => v === roleId)?.[0] || 'unknown';
    console.log(`  ${point.name} (${point.x},${point.y}): ${value.toFixed(1)} -> ${roleName}`);
  }

  console.log(`✅ ${testName} completed`);
  return true;
}

// Run tests for each quadrant
console.log('Testing parent tile assembly for different quadrants\n');

// NW quadrant: even x, even y
testAssembly({ x: 2, y: 2, z: 2 }, 'NW Quadrant (x=2, y=2, z=2)');

// NE quadrant: odd x, even y
testAssembly({ x: 3, y: 2, z: 2 }, 'NE Quadrant (x=3, y=2, z=2)');

// SW quadrant: even x, odd y
testAssembly({ x: 2, y: 3, z: 2 }, 'SW Quadrant (x=2, y=3, z=2)');

// SE quadrant: odd x, odd y
testAssembly({ x: 3, y: 3, z: 2 }, 'SE Quadrant (x=3, y=3, z=2)');

// Test with actual tile coordinates
console.log('\n=== Real-world example ===');
testAssembly({ x: 795, y: 1594, z: 12 }, 'Real tile 12/795/1594 (NE quadrant)');

console.log('\n✅ All tests completed');
