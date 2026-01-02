/**
 * Test parent tile assembly with real terrain data
 *
 * Fetches real Mapbox terrain tiles and assembles them into a 768×768 buffer.
 * Saves visualization of the assembled buffer.
 */

import { getTerrainTile } from '../fetch-tile-sharp.js';
import { getTileSet } from '../tile-hierarchy.js';
import { assembleParentTileBuffer } from '../parent-tile-assembly.js';
import { saveAsImage, getStats } from '../save-image-node.js';

async function testRealAssembly() {
  console.log('Testing parent tile assembly with real terrain data\n');

  // Use a well-known test tile (Mount Shasta area)
  const targetTile = { x: 795, y: 1594, z: 12 };
  console.log(`Target tile: z=${targetTile.z}, x=${targetTile.x}, y=${targetTile.y}`);

  // Get tile set
  const tileSet = getTileSet(targetTile);
  console.log(`Fetching ${tileSet.length} tiles:`, tileSet.map(t => t.role).join(', '));

  // Fetch all tiles
  const tiles = [];
  for (const coords of tileSet) {
    console.log(`  Fetching ${coords.role} (${coords.z}/${coords.x}/${coords.y})...`);
    const tile = await getTerrainTile(coords);
    tiles.push({ ...tile, role: coords.role });
  }

  // Separate target from parents
  const targetTileData = tiles.find(t => t.role === 'target');
  const parentTiles = tiles.filter(t => t.role !== 'target');

  console.log(`\nAssembling ${parentTiles.length} parent tiles...`);
  const buffer = assembleParentTileBuffer({ targetTile, parentTiles });

  // Get stats
  const stats = getStats(buffer);
  console.log(`\nAssembled buffer statistics:`);
  console.log(`  Size: 768×768`);
  console.log(`  Elevation range: ${stats.min.toFixed(1)}m to ${stats.max.toFixed(1)}m`);
  console.log(`  Mean elevation: ${stats.mean.toFixed(1)}m`);

  // Normalize and save as heatmap
  const normalized = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    normalized[i] = (buffer[i] - stats.min) / (stats.max - stats.min);
  }

  await saveAsImage(normalized, 768, 'test/parent-assembly-768.png');
  console.log(`\n✅ Saved: test/parent-assembly-768.png`);

  // Also save the target tile for comparison
  const targetStats = getStats(targetTileData.data);
  const targetNormalized = new Float32Array(targetTileData.tileSize * targetTileData.tileSize);
  for (let y = 0; y < targetTileData.tileSize; y++) {
    for (let x = 0; x < targetTileData.tileSize; x++) {
      const srcIdx = (y + 1) * targetTileData.width + (x + 1); // Skip buffer
      const dstIdx = y * targetTileData.tileSize + x;
      targetNormalized[dstIdx] =
        (targetTileData.data[srcIdx] - targetStats.min) / (targetStats.max - targetStats.min);
    }
  }
  await saveAsImage(targetNormalized, targetTileData.tileSize, 'test/target-tile-512.png');
  console.log(`✅ Saved: test/target-tile-512.png`);

  console.log('\n=== Verification ===');
  console.log('The parent assembly (768×768) should show:');
  console.log('  - Target tile data in the center region (~256×256)');
  console.log('  - Surrounding parent tile data providing boundary context');
  console.log('  - Lower resolution than target tile (parent is z-1)');
  console.log('\nOpen the images to verify:');
  console.log('  open test/parent-assembly-768.png');
  console.log('  open test/target-tile-512.png');
}

testRealAssembly().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
