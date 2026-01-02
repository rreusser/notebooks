# Terrain Module - Usage Guide

This module provides terrain tile fetching, hierarchical tile management, and WebGPU-accelerated lighting computation for line-sweep terrain shading.

## Quick Start

### Running Tests

All test scripts are in the `test/` subdirectory:

```bash
# Full end-to-end pipeline (fetch → compute → save)
node test/compute-simple.mjs
# Output: test/lighting.png (512×512 shaded terrain)

# Visualize elevation data with heatmap
node test/fetch-and-visualize.mjs
# Output: test/elevation-heatmap.png, test/elevation-grayscale.png

# Generate test pattern image
node test/generate-test-image.mjs
# Output: test/test-gradient.png
```

View results: `open test/lighting.png` (or your preferred image viewer)

## Core APIs

### 1. Tile Fetching

**Browser (for Observable notebooks):**
```javascript
import { getTerrainTile, readImageData, decodeTerrainData } from './terrain/main.js';

const tile = await getTerrainTile({x: 795, y: 1594, z: 12});
// Returns: {img: HTMLImageElement, width: 514, height: 514, tileSize: 512, buffer: 1}

const imageData = readImageData(tile.img);
// Returns: Uint8ClampedArray (RGBA pixels)

const elevations = decodeTerrainData(imageData);
// Returns: Float32Array (elevation in meters)
```

**Node.js (for testing/scripts):**
```javascript
import { getTerrainTile } from './fetch-tile-sharp.js';

const tile = await getTerrainTile({x: 795, y: 1594, z: 12});
// Returns: {data: Float32Array, width: 514, height: 514, tileSize: 512, buffer: 1}
// Note: data is already decoded to elevations, no separate decode step needed
```

### 2. Tile Hierarchy

```javascript
import { getTileSet, getParentTile, getQuadrant } from './tile-hierarchy.js';

// Get all tiles needed for hierarchical computation
const tiles = getTileSet({x: 795, y: 1594, z: 12});
// Returns: [
//   {x: 795, y: 1594, z: 12, role: 'target'},
//   {x: 397, y: 797, z: 11, role: 'parent-base'},
//   {x: 398, y: 797, z: 11, role: 'parent-east'},
//   {x: 397, y: 796, z: 11, role: 'parent-north'},
//   {x: 398, y: 796, z: 11, role: 'parent-ne'}
// ]

// Get just the parent coordinates
const parent = getParentTile(795, 1594, 12);
// Returns: {x: 397, y: 797, z: 11}

// Get quadrant within parent
const quad = getQuadrant(795, 1594);
// Returns: 'ne' (northeast quadrant)
```

### 3. Parent Tile Assembly

```javascript
import { assembleParentTileBuffer } from './parent-tile-assembly.js';
import { getTileSet } from './tile-hierarchy.js';
import { getTerrainTile } from './fetch-tile-sharp.js';

// Get target and parent tiles
const targetTile = {x: 795, y: 1594, z: 12};
const tileSet = getTileSet(targetTile);

// Fetch all tiles
const tiles = await Promise.all(
  tileSet.map(coords => getTerrainTile(coords).then(tile => ({...tile, role: coords.role})))
);

// Separate parents from target
const parentTiles = tiles.filter(t => t.role !== 'target');

// Assemble 768×768 parent buffer
const parentBuffer = assembleParentTileBuffer({
  targetTile,
  parentTiles
});
// Returns: Float32Array(768 * 768) - 3×3 tile coverage at z-1 resolution
// - Each z tile occupies 256×256 pixels (512 / 2)
// - Centered on target tile position
// - Provides boundary context for line-sweep algorithms
```

### 4. WebGPU Context (Node.js)

```javascript
import { createWebGPUContext } from './webgpu-context-node.js';

const { device, adapter } = await createWebGPUContext();
// Returns WebGPU device ready for compute operations

// Use with compute modules (same as browser)
import { createLightingPipeline } from '../compute/pipeline.js';
import { computeTileLighting } from '../compute/execute.js';
```

### 5. Caching

**Tile Data Cache:**
```javascript
import { TileDataCache } from './tile-cache.js';

const cache = new TileDataCache({
  maxTiles: 100,
  maxBytes: 100 * 1024 * 1024  // 100MB
});

// Get or fetch tile (auto-caches)
const tileData = await cache.get({x: 795, y: 1594, z: 12}, async () => {
  // This function only called if not in cache
  const tile = await getTerrainTile({x: 795, y: 1594, z: 12});
  return {
    data: tile.data,
    width: tile.width,
    height: tile.height,
    tileSize: tile.tileSize
  };
});

// Check cache stats
const stats = cache.getStats();
// Returns: {size: number, calculatedSize: number}
```

**GPU Buffer Cache:**
```javascript
import { BufferCache } from './buffer-cache.js';

const bufferCache = new BufferCache(device, {maxBuffers: 50});

// Get or create buffer
const buffer = bufferCache.getOrCreate('unique-key', () => {
  return device.createBuffer({...});
});

// Cleanup when done
bufferCache.destroy();
```

### 6. Image Export (Node.js)

```javascript
import { saveAsImage, getStats } from './save-image-node.js';

// Save Float32Array as grayscale PNG
const data = new Float32Array(512 * 512);
// ... fill with values in range [0,1] ...

await saveAsImage(data, 512, 'output.png');

// Get statistics
const stats = getStats(data);
// Returns: {min: number, max: number, mean: number}
```

## Common Tasks

### Task: Fetch and Visualize a Tile

```javascript
import { getTerrainTile } from './fetch-tile-sharp.js';
import { saveAsImage, getStats } from './save-image-node.js';

// Fetch tile
const tile = await getTerrainTile({x: 795, y: 1594, z: 12});

// Get elevation stats
const stats = getStats(tile.data);
console.log(`Elevation: ${stats.min}m to ${stats.max}m`);

// Normalize and save
const normalized = new Float32Array(tile.tileSize * tile.tileSize);
for (let i = 0; i < normalized.length; i++) {
  const y = Math.floor(i / tile.tileSize);
  const x = i % tile.tileSize;
  const srcIdx = (y + tile.buffer) * tile.width + (x + tile.buffer);
  normalized[i] = (tile.data[srcIdx] - stats.min) / (stats.max - stats.min);
}

await saveAsImage(normalized, tile.tileSize, 'elevation.png');
```

### Task: Run WebGPU Lighting Computation

```javascript
import { getTerrainTile } from './fetch-tile-sharp.js';
import { createWebGPUContext } from './webgpu-context-node.js';
import { createLightingPipeline } from '../compute/pipeline.js';
import { computeTileLighting } from '../compute/execute.js';
import { saveAsImage } from './save-image-node.js';

// 1. Fetch terrain
const tile = await getTerrainTile({x: 795, y: 1594, z: 12});

// 2. Prepare buffered data (simple edge replication)
const tileSize = tile.tileSize;
const buffer = 1;
const bufferedSize = tileSize + 2 * buffer;
const bufferedData = new Float32Array(bufferedSize * bufferedSize);

// Copy tile with buffer
for (let y = 0; y < tileSize; y++) {
  for (let x = 0; x < tileSize; x++) {
    const srcIdx = (y + tile.buffer) * tile.width + (x + tile.buffer);
    const dstIdx = (y + buffer) * bufferedSize + (x + buffer);
    bufferedData[dstIdx] = tile.data[srcIdx];
  }
}

// Replicate edges
for (let x = 0; x < bufferedSize; x++) {
  bufferedData[x] = bufferedData[bufferedSize + x];
  bufferedData[(bufferedSize - 1) * bufferedSize + x] =
    bufferedData[(bufferedSize - 2) * bufferedSize + x];
}
for (let y = 0; y < bufferedSize; y++) {
  bufferedData[y * bufferedSize] = bufferedData[y * bufferedSize + 1];
  bufferedData[y * bufferedSize + (bufferedSize - 1)] =
    bufferedData[y * bufferedSize + (bufferedSize - 2)];
}

// 3. Initialize WebGPU
const { device } = await createWebGPUContext();

// 4. Create pipeline
const { pipeline, bindGroupLayout } = createLightingPipeline(device, {
  tileSize,
  tileBuffer: buffer
});

// 5. Compute lighting
const EARTH_CIRCUMFERENCE = 40075017;
const pixelSize = EARTH_CIRCUMFERENCE / tileSize / Math.pow(2, 12);

const result = await computeTileLighting({
  device,
  pipeline,
  bindGroupLayout,
  terrainData: bufferedData,
  tileSize,
  pixelSize
});

// 6. Save result
await saveAsImage(result, tileSize, 'lighting.png');
```

### Task: Fetch All Tiles in Hierarchy

```javascript
import { getTileSet } from './tile-hierarchy.js';
import { getTerrainTile } from './fetch-tile-sharp.js';
import { TileDataCache } from './tile-cache.js';

const coords = {x: 795, y: 1594, z: 12};
const tiles = getTileSet(coords);
const cache = new TileDataCache();

// Fetch all tiles with caching
for (const tileCoords of tiles) {
  const tileData = await cache.get(tileCoords, async () => {
    const tile = await getTerrainTile(tileCoords);
    return {
      data: tile.data,
      width: tile.width,
      height: tile.height,
      tileSize: tile.tileSize
    };
  });

  console.log(`${tileCoords.role}: ${tileCoords.z}/${tileCoords.x}/${tileCoords.y}`);
}
```

### Task: Assemble Parent Tile Buffer for LSAO

```javascript
import { getTileSet } from './tile-hierarchy.js';
import { getTerrainTile } from './fetch-tile-sharp.js';
import { assembleParentTileBuffer } from './parent-tile-assembly.js';
import { saveAsImage } from './save-image-node.js';

// Define target tile
const targetTile = {x: 795, y: 1594, z: 12};

// Get and fetch all tiles (target + parents)
const tileSet = getTileSet(targetTile);
const tiles = await Promise.all(
  tileSet.map(async (coords) => {
    const tile = await getTerrainTile(coords);
    return { ...tile, role: coords.role };
  })
);

// Separate parent tiles
const parentTiles = tiles.filter(t => t.role !== 'target');

// Assemble 768×768 parent buffer
const parentBuffer = assembleParentTileBuffer({
  targetTile,
  parentTiles
});

console.log(`Parent buffer: ${Math.sqrt(parentBuffer.length)}×${Math.sqrt(parentBuffer.length)}`);
// Output: "Parent buffer: 768×768"

// Use this buffer for horizon initialization in line-sweep algorithms
// This provides boundary context from surrounding terrain at z-1 resolution
```

## Key Concepts

### Tile Coordinates

All tile coordinates use standard slippy map format:
- `z` - Zoom level (0-22, higher = more detailed)
- `x` - Tile column (0 to 2^z - 1, west to east)
- `y` - Tile row (0 to 2^z - 1, north to south)

### Tile Structure

Mapbox terrain tiles are 514×514 pixels:
- Core tile: 512×512 pixels
- Buffer: 1 pixel on each edge (for filtering)
- Format: RGB-encoded elevation data

### Elevation Encoding

Mapbox uses RGB encoding for elevation:
```
elevation (meters) = -10000 + 0.1 × (R × 65536 + G × 256 + B)
```

This is automatically decoded by `decodeTerrainData()`.

### Hierarchical Tile Loading

For a target tile at zoom `z`, parent tiles are at zoom `z-1`:
- Each parent tile covers 4 child tiles in a 2×2 grid
- Parent tiles provide lower-resolution boundary context
- Avoids fetching all 8 adjacent tiles at full resolution

**Example:** Tile 12/795/1594 needs:
- 1 target tile at zoom 12
- Up to 4 parent tiles at zoom 11 (depending on position)

### Parent Tile Buffer Assembly

The `assembleParentTileBuffer()` function creates a 768×768 buffer from parent tiles:
- **Input:** 4 parent tiles at z-1 (each 514×514 with buffer)
- **Process:** Extract 512×512 interiors, assemble into 1024×1024, extract 768×768 centered on target
- **Output:** 768×768 buffer at z-1 resolution
- **Coverage:** 3×3 block of z tiles (each z tile = 256×256 at z-1 resolution)
- **Purpose:** Provides boundary context for line-sweep horizon initialization

This avoids loading 8 adjacent tiles at full z resolution (4×4 MB) by using 4 parent tiles (~2 MB total).

### Pixel Size Calculation

```javascript
const EARTH_CIRCUMFERENCE = 40075017; // meters at equator
const tileSize = 512;
const pixelSize = EARTH_CIRCUMFERENCE / tileSize / Math.pow(2, z);

// At zoom 12: pixelSize ≈ 19.1 meters
// At zoom 15: pixelSize ≈ 2.4 meters
```

## Module Structure

```
terrain/
├── main.js                       # Browser tile fetching
├── fetch-tile.js                 # Platform-agnostic core
├── fetch-tile-sharp.js           # Node.js tile fetching
├── tile-hierarchy.js             # Quadtree navigation
├── parent-tile-assembly.js       # Parent tile buffer assembly (NEW)
├── tile-cache.js                 # Tile data LRU cache
├── buffer-cache.js               # GPU buffer LRU cache
├── save-image-node.js            # Image export (Node.js)
├── webgpu-context-node.js        # WebGPU context (Node.js)
├── package.json                  # Dependencies (sharp, webgpu)
└── test/                         # Test scripts
    ├── compute-simple.mjs        # Full pipeline test
    ├── fetch-and-visualize.mjs   # Elevation visualization
    ├── generate-test-image.mjs   # Test pattern generator
    ├── test-parent-assembly.mjs  # Parent assembly tests (NEW)
    └── test-parent-assembly-real.mjs  # Real terrain assembly (NEW)
```

**Shared with browser:**
- `../compute/pipeline.js` - WebGPU pipeline creation
- `../compute/shaders.js` - WGSL shader code
- `../compute/execute.js` - Compute execution

## Dependencies

**Installed in this directory (`terrain/package.json`):**
- `sharp@^0.34.5` - Image processing (Node.js)
- `webgpu@^0.3.8` - WebGPU for Node.js (dawn.node bindings)

**Available via transitive dependencies:**
- `lru-cache` - LRU cache implementation

## Important Notes

### Browser vs Node.js

**Use different modules for different environments:**

| Task | Browser | Node.js |
|------|---------|---------|
| Fetch tiles | `main.js` | `fetch-tile-sharp.js` |
| WebGPU context | `../compute/webgpu-context.js` | `webgpu-context-node.js` |
| Image export | Canvas API | `save-image-node.js` |
| Compute pipeline | `../compute/pipeline.js` | `../compute/pipeline.js` ✓ Shared |

### Current Limitations

1. **Edge replication**: Current implementation replicates tile edges instead of using parent tile data. This causes minor lighting artifacts at tile boundaries. See `PLAN.md` for roadmap to fix this.

2. **Simple lighting**: Currently implements normal-based directional lighting. Full line-sweep ambient occlusion (LSAO) is planned for Phase 3.

3. **Single direction**: Light from northwest at 45° only. Multi-directional sweep coming in Phase 3.

## Troubleshooting

### Error: "Cannot find module 'sharp'"

You're in the wrong directory. Run from the `terrain/` directory:
```bash
cd src/line-sweep-terrain-lighting/terrain
node test/compute-simple.mjs
```

### Error: "Cannot find module 'webgpu'"

WebGPU package not installed:
```bash
npm install  # Installs dependencies from package.json
```

### Error: "Failed to get WebGPU adapter"

WebGPU not available in your Node.js environment. Requirements:
- macOS: Works with Metal backend
- Windows: Needs D3D12
- Linux: Needs Vulkan drivers

### Image appears all black/white

Check that input data is in correct range [0,1]:
```javascript
const stats = getStats(data);
console.log('Range:', stats.min, 'to', stats.max);

// Normalize if needed
const normalized = data.map(v => (v - stats.min) / (stats.max - stats.min));
```

## See Also

- **`../PLAN.md`** - Complete implementation details and roadmap
- **`../CLAUDE.md`** - Parent directory API documentation
- **Test scripts** in `test/` - Working examples of all features
- **[LSAO Reference](https://karim.naaji.fr/lsao.html)** - Algorithm documentation

## Quick Reference

```javascript
// Fetch tile (Node.js)
import { getTerrainTile } from './fetch-tile-sharp.js';
const tile = await getTerrainTile({x, y, z});

// Tile hierarchy
import { getTileSet } from './tile-hierarchy.js';
const tiles = getTileSet({x, y, z});

// WebGPU (Node.js)
import { createWebGPUContext } from './webgpu-context-node.js';
const { device } = await createWebGPUContext();

// Compute lighting
import { createLightingPipeline } from '../compute/pipeline.js';
import { computeTileLighting } from '../compute/execute.js';
const { pipeline, bindGroupLayout } = createLightingPipeline(device, {tileSize, tileBuffer});
const result = await computeTileLighting({device, pipeline, bindGroupLayout, terrainData, tileSize, pixelSize});

// Save image (Node.js)
import { saveAsImage } from './save-image-node.js';
await saveAsImage(result, tileSize, 'output.png');
```
