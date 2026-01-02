# Line Sweep Terrain Lighting - Project Documentation

This project implements hierarchical terrain lighting using WebGPU compute shaders. It provides infrastructure for fetching Mapbox terrain tiles, managing LRU caches, and computing lighting with boundary data from parent tiles.

## Architecture

The project is organized into modules:

- **terrain/** - Tile fetching, caching, and data management
- **compute/** - WebGPU pipeline, shaders, and execution
- **scripts/** - CLI tools and utilities

## Module APIs

### Terrain Tile Fetching

**Browser (terrain/main.js):**
```js
import { getTerrainTile, readImageData, decodeTerrainData } from './terrain/main.js';

const tile = await getTerrainTile({x: 795, y: 1594, z: 12});
// => { img: HTMLImageElement, width: 514, height: 514, tileSize: 512, buffer: 1 }

const imageData = readImageData(tile.img);
// => Uint8ClampedArray (RGBA pixels)

const elevations = decodeTerrainData(imageData);
// => Float32Array (elevation in meters)
```

**Node.js (terrain/fetch-tile-node.js):**
```js
import { getTerrainTile, readImageData, decodeTerrainData } from './terrain/fetch-tile-node.js';
// Same API, uses JSDOM for Image and Canvas
```

### Tile Hierarchy

**terrain/tile-hierarchy.js:**
```js
import { getTileSet, getParentTile, getQuadrant } from './terrain/tile-hierarchy.js';

// Get parent tile coordinates
const parent = getParentTile(795, 1594, 12);
// => {x: 397, y: 797, z: 11}

// Get quadrant within parent
const quad = getQuadrant(795, 1594);
// => 'ne' (northeast)

// Get all tiles needed for hierarchical computation
const tiles = getTileSet({x: 795, y: 1594, z: 12});
// => [
//   {x: 795, y: 1594, z: 12, role: 'target'},
//   {x: 397, y: 797, z: 11, role: 'parent-base'},
//   {x: 398, y: 797, z: 11, role: 'parent-east'},
//   {x: 397, y: 796, z: 11, role: 'parent-north'},
//   {x: 398, y: 796, z: 11, role: 'parent-ne'}
// ]
```

### Tile Caching

**terrain/tile-cache.js:**
```js
import { TileDataCache } from './terrain/tile-cache.js';

const cache = new TileDataCache({
  maxTiles: 100,
  maxBytes: 100 * 1024 * 1024 // 100MB
});

// Get or fetch tile
const data = await cache.get({x: 795, y: 1594, z: 12}, async () => {
  const tile = await getTerrainTile({x: 795, y: 1594, z: 12});
  const imageData = readImageData(tile.img);
  const elevations = decodeTerrainData(imageData);
  return { data: elevations, width: tile.width, height: tile.height, tileSize: tile.tileSize };
});

cache.getStats(); // => {size: 1, calculatedSize: 1056784}
```

**terrain/buffer-cache.js:**
```js
import { BufferCache } from './terrain/buffer-cache.js';

const bufferCache = new BufferCache(device, {maxBuffers: 50});

const buffer = bufferCache.getOrCreate('tile-key', () => {
  return device.createBuffer({...});
});

bufferCache.destroy(); // Clean up all buffers
```

### WebGPU Pipeline

**compute/webgpu-context.js:**
```js
import { createWebGPUContext, isWebGPUAvailable } from './compute/webgpu-context.js';

if (isWebGPUAvailable()) {
  const { adapter, device } = await createWebGPUContext();
  // Use device...
  invalidation.then(() => device.destroy());
}
```

**compute/pipeline.js:**
```js
import { createLightingPipeline } from './compute/pipeline.js';

const { pipeline, bindGroupLayout } = createLightingPipeline(device, {
  tileSize: 512,
  tileBuffer: 1
});
```

**compute/execute.js:**
```js
import { computeTileLighting } from './compute/execute.js';

const result = await computeTileLighting({
  device,
  pipeline,
  bindGroupLayout,
  terrainData: bufferedData, // Float32Array of size (tileSize+2*buffer)²
  tileSize: 512,
  pixelSize: 19.109 // meters per pixel at this zoom
});
// => Float32Array of lighting values [0,1]
```

## CLI Usage

Compute terrain lighting from command line:

```bash
node src/line-sweep-terrain-lighting/scripts/compute-tile.mjs \
  --x=795 --y=1594 --z=12 \
  --output=result.png
```

**Note:** WebGPU in Node.js requires `@webgpu/dawn` or similar native bindings. The CLI currently fetches and assembles tiles but skips WebGPU computation. Use the browser notebook for full computation.

## Testing

### Manual Tests

Test tile hierarchy:
```bash
node -e "import('./src/line-sweep-terrain-lighting/terrain/tile-hierarchy.js').then(m => console.log(m.getTileSet({x: 795, y: 1594, z: 12})))"
```

Test Node.js tile fetching:
```bash
node -e "import('./src/line-sweep-terrain-lighting/terrain/fetch-tile-node.js').then(async m => console.log(await m.getTerrainTile({x: 795, y: 1594, z: 12})))"
```

Run CLI tool:
```bash
node src/line-sweep-terrain-lighting/scripts/compute-tile.mjs --x=795 --y=1594 --z=12
```

### Browser Testing

```bash
npm start
```

Open the notebook in browser to see WebGPU computation and visualization.

## Data Structures

**Tile Coordinates:**
```typescript
{x: number, y: number, z: number}
```

**Tile Data:**
```typescript
{
  data: Float32Array,    // Decoded elevations in meters
  width: number,         // Image width including buffer
  height: number,        // Image height including buffer
  tileSize: number       // Core tile size (e.g., 512)
}
```

**Tile Set Item:**
```typescript
{
  x: number,
  y: number,
  z: number,
  role: 'target' | 'parent-base' | 'parent-north' | 'parent-south' |
        'parent-east' | 'parent-west' | 'parent-nw' | 'parent-ne' |
        'parent-sw' | 'parent-se'
}
```

## Shader Details

The lighting shader (compute/shaders.js) computes surface normals using central differences and applies directional lighting:

- Input: Buffered terrain data `(tileSize + 2*buffer)²`
- Output: Lighting values `[0,1]` for each pixel
- Workgroup size: 16×16
- Light direction: Northwest at 45° elevation
- Includes ambient term (0.2) to prevent pure black

## Future Work

1. **Hierarchical boundary assembly**: Use parent tile data for boundaries instead of edge replication
2. **Full line-sweep horizon occlusion**: Implement the advanced algorithm from https://karim.naaji.fr/lsao.html
3. **Node.js WebGPU**: Add `@webgpu/dawn` support for command-line computation
4. **GPU buffer caching integration**: Use BufferCache in execute.js for better performance
5. **Multi-tile computation**: Batch process multiple tiles efficiently
