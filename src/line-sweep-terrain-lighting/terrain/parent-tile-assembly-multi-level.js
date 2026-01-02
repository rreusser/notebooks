/**
 * Multi-level parent tile assembly for hierarchical terrain algorithms
 *
 * Supports arbitrary zoom level differences (delta_z) from the target tile.
 * Assembles parent tiles to cover maximum area guaranteed by 2×2 parent tiles.
 */

import { getQuadrant } from './tile-hierarchy.js';

/**
 * Get parent tiles needed at a specific zoom level
 *
 * @param {{x: number, y: number, z: number}} targetTile - Target tile coordinates
 * @param {number} deltaZ - Zoom level difference (e.g., -1 for z-1, -2 for z-2)
 * @returns {Array<{x: number, y: number, z: number, role: string}>}
 */
export function getParentTilesAtLevel(targetTile, deltaZ) {
  const { x, y, z } = targetTile;

  if (deltaZ >= 0) {
    throw new Error("deltaZ must be negative (parent zoom levels)");
  }

  const parentZ = z + deltaZ; // e.g., z=12, deltaZ=-2 → parentZ=10

  if (parentZ < 0) {
    throw new Error(`Parent zoom level ${parentZ} is invalid (must be >= 0)`);
  }

  // Calculate which parent tile contains the target
  // Each level up, coordinates are divided by 2
  const stepsUp = Math.abs(deltaZ);
  const divisor = Math.pow(2, stepsUp);

  const parentX = Math.floor(x / divisor);
  const parentY = Math.floor(y / divisor);

  // Determine which quadrant the target is in at this parent level
  // This tells us which of the 2×2 parent tiles the target falls into
  const quadrantX = Math.floor((x / divisor - parentX) * 2); // 0 or 1
  const quadrantY = Math.floor((y / divisor - parentY) * 2); // 0 or 1

  const tiles = [];

  // Base parent (contains target)
  tiles.push({
    x: parentX,
    y: parentY,
    z: parentZ,
    role: 'parent-base'
  });

  // Adjacent parents based on quadrant
  const maxCoord = Math.pow(2, parentZ) - 1;

  // Horizontal neighbor
  if (quadrantX === 0 && parentX > 0) {
    tiles.push({ x: parentX - 1, y: parentY, z: parentZ, role: 'parent-west' });
  } else if (quadrantX === 1 && parentX < maxCoord) {
    tiles.push({ x: parentX + 1, y: parentY, z: parentZ, role: 'parent-east' });
  }

  // Vertical neighbor
  if (quadrantY === 0 && parentY > 0) {
    tiles.push({ x: parentX, y: parentY - 1, z: parentZ, role: 'parent-north' });
  } else if (quadrantY === 1 && parentY < maxCoord) {
    tiles.push({ x: parentX, y: parentY + 1, z: parentZ, role: 'parent-south' });
  }

  // Diagonal neighbor
  if (quadrantX === 0 && quadrantY === 0 && parentX > 0 && parentY > 0) {
    tiles.push({ x: parentX - 1, y: parentY - 1, z: parentZ, role: 'parent-nw' });
  } else if (quadrantX === 1 && quadrantY === 0 && parentX < maxCoord && parentY > 0) {
    tiles.push({ x: parentX + 1, y: parentY - 1, z: parentZ, role: 'parent-ne' });
  } else if (quadrantX === 0 && quadrantY === 1 && parentX > 0 && parentY < maxCoord) {
    tiles.push({ x: parentX - 1, y: parentY + 1, z: parentZ, role: 'parent-sw' });
  } else if (quadrantX === 1 && quadrantY === 1 && parentX < maxCoord && parentY < maxCoord) {
    tiles.push({ x: parentX + 1, y: parentY + 1, z: parentZ, role: 'parent-se' });
  }

  return tiles;
}

/**
 * Assemble parent tiles at any zoom level into optimal coverage buffer
 *
 * @param {Object} params
 * @param {{x: number, y: number, z: number}} params.targetTile - Target tile coordinates
 * @param {Array} params.parentTiles - Parent tile data with role
 * @param {number} params.deltaZ - Zoom level difference (negative)
 * @param {number} [params.tileSize=512] - Base tile size
 * @returns {{buffer: Float32Array, size: number, targetOffset: [number, number], scale: number}}
 */
export function assembleParentTileBufferMultiLevel({
  targetTile,
  parentTiles,
  deltaZ,
  tileSize = 512
}) {
  if (deltaZ >= 0) {
    throw new Error("deltaZ must be negative");
  }

  const stepsUp = Math.abs(deltaZ);
  const scale = Math.pow(2, stepsUp); // How many target pixels per parent pixel

  // Assembly size: always 2×2 parent tiles = 1024×1024 at parent resolution
  const assemblySize = 1024;
  const assembly = new Float32Array(assemblySize * assemblySize);

  // Output buffer size: tileSize * (1 + 2^delta_z)
  const outputSize = Math.floor(tileSize * (1 + Math.pow(2, deltaZ)));

  // Map parent tiles by role
  const roleMap = new Map(parentTiles.map(t => [t.role, t]));

  // Calculate target's position at parent level
  const { x, y, z } = targetTile;
  const parentZ = z + deltaZ;
  const parentX = Math.floor(x / scale);
  const parentY = Math.floor(y / scale);

  // Determine quadrant at parent level
  const quadrantX = Math.floor((x / scale - parentX) * 2);
  const quadrantY = Math.floor((y / scale - parentY) * 2);

  const quadrantNames = [
    ['nw', 'ne'],
    ['sw', 'se']
  ];
  const quadrant = quadrantNames[quadrantY][quadrantX];

  // Get grid layout for this quadrant
  const gridLayout = getGridLayoutMultiLevel(quadrant);

  // Copy each parent tile into assembly
  for (const [role, position] of Object.entries(gridLayout)) {
    const tile = roleMap.get(role);
    if (!tile) continue;

    copyTileToAssembly(tile, assembly, position, assemblySize);
  }

  // Extract centered region
  const extractionOffset = getExtractionOffsetMultiLevel(quadrant, targetSizeAtParent);
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

  // Calculate target tile offset in output buffer
  // Target tile is tileSize/scale pixels at parent resolution
  const targetSizeAtParent = tileSize / scale;
  const targetOffsetInOutput = [
    Math.floor((outputSize - targetSizeAtParent) / 2),
    Math.floor((outputSize - targetSizeAtParent) / 2)
  ];

  return {
    buffer: output,
    size: outputSize,
    targetOffset: targetOffsetInOutput,
    scale: scale,
    targetSizeAtParent: targetSizeAtParent
  };
}

/**
 * Get grid layout for parent tiles (same as single-level)
 */
function getGridLayoutMultiLevel(quadrant) {
  switch (quadrant) {
    case 'nw':
      return {
        'parent-nw': { x: 0, y: 0 },
        'parent-north': { x: 512, y: 0 },
        'parent-west': { x: 0, y: 512 },
        'parent-base': { x: 512, y: 512 }
      };
    case 'ne':
      return {
        'parent-north': { x: 0, y: 0 },
        'parent-ne': { x: 512, y: 0 },
        'parent-base': { x: 0, y: 512 },
        'parent-east': { x: 512, y: 512 }
      };
    case 'sw':
      return {
        'parent-west': { x: 0, y: 0 },
        'parent-base': { x: 512, y: 0 },
        'parent-sw': { x: 0, y: 512 },
        'parent-south': { x: 512, y: 512 }
      };
    case 'se':
      return {
        'parent-base': { x: 0, y: 0 },
        'parent-east': { x: 512, y: 0 },
        'parent-south': { x: 0, y: 512 },
        'parent-se': { x: 512, y: 512 }
      };
    default:
      throw new Error(`Unknown quadrant: ${quadrant}`);
  }
}

/**
 * Copy tile interior to assembly
 */
function copyTileToAssembly(tile, assembly, position, assemblySize) {
  const tileSize = tile.tileSize;
  const buffer = 1;

  for (let y = 0; y < tileSize; y++) {
    for (let x = 0; x < tileSize; x++) {
      const srcX = x + buffer;
      const srcY = y + buffer;
      const srcIdx = srcY * tile.width + srcX;

      const dstX = position.x + x;
      const dstY = position.y + y;
      const dstIdx = dstY * assemblySize + dstX;

      assembly[dstIdx] = tile.data[srcIdx];
    }
  }
}

/**
 * Get extraction offset to center target in output buffer
 *
 * The target tile occupies one quadrant of parent-base (which is 512×512).
 * Different quadrants place parent-base at different positions in the 1024×1024 assembly.
 * This function calculates the extraction offset to ensure the target always ends up
 * at position (256, 256) in the output buffer, regardless of quadrant or deltaZ.
 *
 * @param {string} quadrant - Target quadrant ('nw', 'ne', 'sw', 'se')
 * @param {number} targetSizeAtParent - Target size in parent pixel space
 * @returns {{x: number, y: number}} Extraction offset
 */
function getExtractionOffsetMultiLevel(quadrant, targetSizeAtParent) {
  // Target position in 1024×1024 assembly depends on quadrant:
  // - NW: parent-base at (512, 512), target at (512, 512)
  // - NE: parent-base at (0, 512), target at (512-targetSize, 512)
  // - SW: parent-base at (512, 0), target at (512, 512-targetSize)
  // - SE: parent-base at (0, 0), target at (512-targetSize, 512-targetSize)
  //
  // To center target at (256, 256) in output:
  // extraction_offset = target_position_in_assembly - (256, 256)

  switch (quadrant) {
    case 'nw':
      // Target at (512, 512) → extract from (256, 256)
      return { x: 256, y: 256 };
    case 'ne':
      // Target at (512-targetSize, 512) → extract from (256-targetSize, 256)
      return { x: 256 - targetSizeAtParent, y: 256 };
    case 'sw':
      // Target at (512, 512-targetSize) → extract from (256, 256-targetSize)
      return { x: 256, y: 256 - targetSizeAtParent };
    case 'se':
      // Target at (512-targetSize, 512-targetSize) → extract from (256-targetSize, 256-targetSize)
      return { x: 256 - targetSizeAtParent, y: 256 - targetSizeAtParent };
    default:
      throw new Error(`Unknown quadrant: ${quadrant}`);
  }
}
