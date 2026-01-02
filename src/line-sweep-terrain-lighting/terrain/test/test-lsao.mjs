/**
 * Test LSAO with parent tile support
 *
 * Demonstrates the full pipeline:
 * 1. Fetch target and parent tiles
 * 2. Assemble parent buffer
 * 3. Run LSAO compute shader
 * 4. Save results
 */

import { getTerrainTile } from '../fetch-tile-sharp.js';
import { getTileSet, getQuadrant } from '../tile-hierarchy.js';
import { assembleParentTileBuffer } from '../parent-tile-assembly.js';
import { createWebGPUContext } from '../webgpu-context-node.js';
import { createLSAOPipeline } from '../../compute/lsao-pipeline.js';
import { computeLSAO } from '../../compute/lsao-execute.js';
import { saveAsImage, getStats } from '../save-image-node.js';

async function testLSAO() {
  console.log('=== LSAO with Parent Tile Support ===\n');

  // Test tile (Mount Shasta area, NE quadrant)
  const targetTile = { x: 795, y: 1594, z: 12 };
  console.log(`Target tile: z=${targetTile.z}, x=${targetTile.x}, y=${targetTile.y}`);

  const quadrant = getQuadrant(targetTile.x, targetTile.y);
  console.log(`Quadrant: ${quadrant}\n`);

  // Step 1: Fetch all tiles
  console.log('Step 1: Fetching tiles...');
  const tileSet = getTileSet(targetTile);
  console.log(`  Fetching ${tileSet.length} tiles:`, tileSet.map(t => t.role).join(', '));

  const tiles = await Promise.all(
    tileSet.map(async (coords) => {
      const tile = await getTerrainTile(coords);
      return { ...tile, role: coords.role };
    })
  );

  const targetTileData = tiles.find(t => t.role === 'target');
  const parentTiles = tiles.filter(t => t.role !== 'target');
  console.log(`  ✓ Fetched target tile and ${parentTiles.length} parent tiles\n`);

  // Step 2: Assemble parent buffer
  console.log('Step 2: Assembling parent buffer...');
  const parentBuffer = assembleParentTileBuffer({ targetTile, parentTiles });
  console.log(`  ✓ Assembled ${Math.sqrt(parentBuffer.length)}×${Math.sqrt(parentBuffer.length)} parent buffer\n`);

  // Step 3: Initialize WebGPU
  console.log('Step 3: Initializing WebGPU...');
  const { device } = await createWebGPUContext();
  console.log(`  ✓ WebGPU context created\n`);

  // Step 4: Create LSAO pipeline
  console.log('Step 4: Creating LSAO pipeline...');
  const { pipeline, bindGroupLayout } = createLSAOPipeline(device, {
    tileSize: 512,
    tileBuffer: 1,
    parentSize: 768,
    workgroupSize: 128
  });
  console.log(`  ✓ LSAO pipeline created\n`);

  // Step 5: Compute LSAO
  console.log('Step 5: Computing LSAO...');
  const EARTH_CIRCUMFERENCE = 40075017;
  const pixelSize = EARTH_CIRCUMFERENCE / 512 / Math.pow(2, targetTile.z);
  console.log(`  Pixel size: ${pixelSize.toFixed(2)}m`);
  console.log(`  Directions: 4 cardinal (E, W, N, S)`);

  const startTime = performance.now();

  const aoData = await computeLSAO({
    device,
    pipeline,
    bindGroupLayout,
    targetData: targetTileData.data,
    parentData: parentBuffer,
    tileSize: 512,
    pixelSize,
    quadrant,
    workgroupSize: 128,
    directions: [[1, 0], [-1, 0], [0, 1], [0, -1]]
  });

  const elapsed = performance.now() - startTime;
  console.log(`  ✓ Computation complete in ${elapsed.toFixed(1)}ms\n`);

  // Step 6: Analyze results
  console.log('Step 6: Analyzing results...');
  const stats = getStats(aoData);
  console.log(`  AO range: ${stats.min.toFixed(3)} to ${stats.max.toFixed(3)}`);
  console.log(`  Mean: ${stats.mean.toFixed(3)}\n`);

  // Step 7: Save outputs
  console.log('Step 7: Saving outputs...');

  // Save AO result
  await saveAsImage(aoData, 512, 'test/lsao-result.png');
  console.log(`  ✓ Saved: test/lsao-result.png`);

  // Save elevation for comparison
  const elevNormalized = new Float32Array(512 * 512);
  const elevStats = getStats(targetTileData.data);
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const srcIdx = (y + 1) * targetTileData.width + (x + 1);
      const dstIdx = y * 512 + x;
      elevNormalized[dstIdx] = (targetTileData.data[srcIdx] - elevStats.min) / (elevStats.max - elevStats.min);
    }
  }
  await saveAsImage(elevNormalized, 512, 'test/lsao-elevation.png');
  console.log(`  ✓ Saved: test/lsao-elevation.png`);

  // Create combined visualization (AO × elevation)
  const combined = new Float32Array(512 * 512);
  for (let i = 0; i < combined.length; i++) {
    combined[i] = aoData[i] * elevNormalized[i];
  }
  await saveAsImage(combined, 512, 'test/lsao-combined.png');
  console.log(`  ✓ Saved: test/lsao-combined.png`);

  console.log('\n=== Success! ===');
  console.log('View results:');
  console.log('  open test/lsao-result.png       # Pure AO');
  console.log('  open test/lsao-elevation.png    # Elevation');
  console.log('  open test/lsao-combined.png     # AO × Elevation');
  console.log('\nThe LSAO result should show proper shadowing from off-tile terrain!');
}

testLSAO().catch(err => {
  console.error('Error:', err);
  console.error(err.stack);
  process.exit(1);
});
