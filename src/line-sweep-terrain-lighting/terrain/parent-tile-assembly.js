/**
 * Parent tile assembly for hierarchical terrain lighting
 *
 * Assembles parent tiles at zoom z-1 into a buffer that provides boundary context
 * for line-sweep algorithms on a target tile at zoom z.
 *
 * Key concept:
 * - Target tile at z needs boundary data for proper lighting
 * - Instead of loading 8 adjacent tiles at z (expensive), load 4 parent tiles at z-1
 * - 2×2 parent tiles (1024×1024 at z-1 resolution) cover 3×3 child tiles
 * - Extract 768×768 region centered on target to get 3×3 coverage
 */

import { getQuadrant } from './tile-hierarchy.js';

/**
 * Assemble parent tiles into a buffer for horizon initialization
 *
 * Takes 4 parent tiles at zoom z-1 and assembles them into a 768×768 buffer
 * at parent resolution. This buffer covers a 3×3 block of zoom z tiles,
 * centered on the target tile.
 *
 * Layout in parent resolution:
 * - Each z tile occupies 256×256 pixels (512 / 2)
 * - 3×3 block = 768×768 pixels
 * - Extraction from 1024×1024 assembly depends on target quadrant
 *
 * @param {Object} params
 * @param {{x: number, y: number, z: number}} params.targetTile - Target tile coordinates
 * @param {Array<{data: Float32Array, width: number, height: number, tileSize: number, role: string}>} params.parentTiles - Parent tile data
 * @returns {Float32Array} 768×768 buffer at z-1 resolution
 */
export function assembleParentTileBuffer({ targetTile, parentTiles }) {
  const { x, y, z } = targetTile;

  if (z === 0) {
    throw new Error("Cannot assemble parent tiles for root tile (z=0)");
  }

  // Determine target's quadrant within its parent
  const quadrant = getQuadrant(x, y);

  // Create 1024×1024 assembly buffer (2×2 parent tiles, each 512×512)
  const assemblySize = 1024;
  const assembly = new Float32Array(assemblySize * assemblySize);

  // Map parent tiles by role
  const roleMap = new Map(parentTiles.map(t => [t.role, t]));

  // Define the 2×2 grid layout based on quadrant
  // The parent-base tile position depends on which quadrant the target is in
  const gridLayout = getGridLayout(quadrant);

  // Copy each parent tile into the assembly
  for (const [role, position] of Object.entries(gridLayout)) {
    const tile = roleMap.get(role);
    if (!tile) {
      // If a parent tile is missing (edge of world), fill with zeros or edge replication
      // For now, just skip - those regions will remain zero
      continue;
    }

    copyTileToAssembly(tile, assembly, position, assemblySize);
  }

  // Extract 768×768 region centered on target tile
  const extractionOffset = getExtractionOffset(quadrant);
  const outputSize = 768;
  const output = new Float32Array(outputSize * outputSize);

  for (let y = 0; y < outputSize; y++) {
    for (let x = 0; x < outputSize; x++) {
      const srcX = x + extractionOffset.x;
      const srcY = y + extractionOffset.y;
      const srcIdx = srcY * assemblySize + srcX;
      const dstIdx = y * outputSize + x;
      output[dstIdx] = assembly[srcIdx];
    }
  }

  return output;
}

/**
 * Get the 2×2 grid layout of parent tiles based on target quadrant
 *
 * Returns mapping from role to position in 1024×1024 assembly.
 * Positions are {x, y} offsets in pixels (0 or 512).
 *
 * @param {'nw'|'ne'|'sw'|'se'} quadrant - Target's quadrant within parent-base
 * @returns {Object} Mapping of role to {x, y} position
 */
function getGridLayout(quadrant) {
  // Grid coordinates in the 1024×1024 space
  // Top-left: (0, 0), Top-right: (512, 0)
  // Bottom-left: (0, 512), Bottom-right: (512, 512)

  switch (quadrant) {
    case 'nw':
      // Target in NW quadrant: need parent-base (NW), parent-west (SW), parent-north (NE), parent-nw (corner)
      // Wait, this needs more thought about the geographic layout...
      // Actually getTileSet returns parent-base and then adjacent parents based on quadrant
      // Let me reconsider: if target is in NW of parent-base, we need:
      // - parent-base (contains target in its NW)
      // - parent-west (to get western neighbors)
      // - parent-north (to get northern neighbors)
      // - parent-nw (corner)
      return {
        'parent-nw': { x: 0, y: 0 },      // top-left
        'parent-north': { x: 512, y: 0 }, // top-right
        'parent-west': { x: 0, y: 512 },  // bottom-left
        'parent-base': { x: 512, y: 512 } // bottom-right (contains target)
      };

    case 'ne':
      // Target in NE quadrant: parent-base SE, others accordingly
      return {
        'parent-north': { x: 0, y: 0 },   // top-left
        'parent-ne': { x: 512, y: 0 },    // top-right
        'parent-base': { x: 0, y: 512 },  // bottom-left (contains target)
        'parent-east': { x: 512, y: 512 } // bottom-right
      };

    case 'sw':
      // Target in SW quadrant: parent-base NE
      return {
        'parent-west': { x: 0, y: 0 },    // top-left
        'parent-base': { x: 512, y: 0 },  // top-right (contains target)
        'parent-sw': { x: 0, y: 512 },    // bottom-left
        'parent-south': { x: 512, y: 512 } // bottom-right
      };

    case 'se':
      // Target in SE quadrant: parent-base NW
      return {
        'parent-base': { x: 0, y: 0 },    // top-left (contains target)
        'parent-east': { x: 512, y: 0 },  // top-right
        'parent-south': { x: 0, y: 512 }, // bottom-left
        'parent-se': { x: 512, y: 512 }   // bottom-right
      };

    default:
      throw new Error(`Unknown quadrant: ${quadrant}`);
  }
}

/**
 * Copy a parent tile's interior data to the assembly buffer
 *
 * Extracts the 512×512 interior (excluding 1px buffer) and copies to the
 * specified position in the 1024×1024 assembly.
 *
 * @param {{data: Float32Array, width: number, height: number, tileSize: number}} tile
 * @param {Float32Array} assembly - 1024×1024 assembly buffer
 * @param {{x: number, y: number}} position - Top-left position in assembly
 * @param {number} assemblySize - Assembly buffer width (1024)
 */
function copyTileToAssembly(tile, assembly, position, assemblySize) {
  const tileSize = tile.tileSize; // 512
  const buffer = 1; // 1 pixel buffer

  // Copy interior pixels only
  for (let y = 0; y < tileSize; y++) {
    for (let x = 0; x < tileSize; x++) {
      // Source: from buffered tile data (skip buffer)
      const srcX = x + buffer;
      const srcY = y + buffer;
      const srcIdx = srcY * tile.width + srcX;

      // Destination: position in assembly
      const dstX = position.x + x;
      const dstY = position.y + y;
      const dstIdx = dstY * assemblySize + dstX;

      assembly[dstIdx] = tile.data[srcIdx];
    }
  }
}

/**
 * Get extraction offset for 768×768 region based on target quadrant
 *
 * The target tile is in different positions within the 2×2 parent assembly
 * depending on its quadrant. We extract a 768×768 region (3×3 tiles at z
 * resolution = 1.5×1.5 tiles at z-1 resolution) centered on the target.
 *
 * @param {'nw'|'ne'|'sw'|'se'} quadrant
 * @returns {{x: number, y: number}} Extraction offset in pixels
 */
function getExtractionOffset(quadrant) {
  // 1024×1024 assembly, want 768×768 output
  // Possible offsets: 0 or 256 (since 1024 - 768 = 256)

  switch (quadrant) {
    case 'nw':
      // Target in bottom-right of assembly, extract bottom-right
      return { x: 256, y: 256 };

    case 'ne':
      // Target in bottom-left of assembly, extract bottom-left
      return { x: 0, y: 256 };

    case 'sw':
      // Target in top-right of assembly, extract top-right
      return { x: 256, y: 0 };

    case 'se':
      // Target in top-left of assembly, extract top-left
      return { x: 0, y: 0 };

    default:
      throw new Error(`Unknown quadrant: ${quadrant}`);
  }
}
