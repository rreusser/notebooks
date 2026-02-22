// Ray-terrain intersection orchestration layer.
// Connects the 3D BVH (tile-level) with per-tile elevation quadtrees.

import { invertMat4 } from '../math/mat4.ts';
import { getElevationScale } from '../tiles/tile-math.js';
import { rayIntersectQuadtree } from './elevation-quadtree.ts';

/**
 * Unproject a screen point (NDC) to a world-space ray.
 *
 * @param {number} ndcX - normalized device X in [-1, 1]
 * @param {number} ndcY - normalized device Y in [-1, 1]
 * @param {Float32Array} invProjView - inverse of projectionView matrix
 * @returns {{ origin: Float64Array, direction: Float64Array }}
 */
export function screenToRay(ndcX, ndcY, invProjView) {
  const m = invProjView;

  // Reversed-z: NDC z=1 is near, z=0 is far (infinite).
  // Use z=0.5 instead of z=0 to avoid the degenerate w=0 point at infinity.
  function unproject(nx, ny, nz) {
    const x = m[0]*nx + m[4]*ny + m[8]*nz + m[12];
    const y = m[1]*nx + m[5]*ny + m[9]*nz + m[13];
    const z = m[2]*nx + m[6]*ny + m[10]*nz + m[14];
    const w = m[3]*nx + m[7]*ny + m[11]*nz + m[15];
    return [x/w, y/w, z/w];
  }

  const near = unproject(ndcX, ndcY, 1);
  const mid = unproject(ndcX, ndcY, 0.5);

  const origin = new Float64Array(near);
  const dx = mid[0] - near[0];
  const dy = mid[1] - near[1];
  const dz = mid[2] - near[2];
  const len = Math.sqrt(dx*dx + dy*dy + dz*dz);
  const direction = new Float64Array([dx/len, dy/len, dz/len]);

  return { origin, direction };
}

/**
 * Raycast against loaded terrain tiles.
 *
 * @param {Object} params
 * @param {Float64Array} params.origin - ray origin in world space
 * @param {Float64Array} params.direction - ray direction in world space (unit)
 * @param {BVH} params.bvh - 3D BVH over tile AABBs
 * @param {TileManager} params.tileCache - tile manager with .cache
 * @param {Array} params.tileList - array of { z, x, y } tiles in the BVH (same order as BVH indices)
 * @param {number} params.verticalExaggeration
 * @returns {{ worldPos: [number, number, number], t: number, tile: { z, x, y } } | null}
 */
export function raycastTerrain({ origin, direction, bvh, tileCache, tileList, verticalExaggeration }) {
  const ox = origin[0], oy = origin[1], oz = origin[2];
  const dx = direction[0], dy = direction[1], dz = direction[2];

  // Get candidate tiles from BVH, sorted nearest-first
  const candidates = bvh.rayIntersect(ox, oy, oz, dx, dy, dz);
  if (candidates.length === 0) return null;

  let bestT = Infinity;
  let bestWorldPos = null;
  let bestTile = null;

  for (let i = 0; i < candidates.length; i++) {
    const { index, tNear } = candidates[i];

    // Early termination: if this candidate's entry distance is beyond our best hit, stop
    if (tNear >= bestT) break;

    const tile = tileList[index];
    if (!tile) continue;

    const entry = tileCache.ensureQuadtree(tile.z, tile.x, tile.y);
    if (!entry) continue;

    const { quadtree, elevations } = entry;
    const elevScale = getElevationScale(tile.z, tile.y);
    const vertExag = verticalExaggeration;
    const scale = elevScale * vertExag;
    const tileScale = 512 * (1 << tile.z);

    // Transform ray to tile-local patch coordinates:
    // World model matrix: x_world = col / (512 * 2^z) + tileX / 2^z
    //                     y_world = elev * elevScale * vertExag
    //                     z_world = row / (512 * 2^z) + tileY / 2^z
    //
    // Inverse: col = (x_world - tileX / 2^z) * 512 * 2^z
    //          elev = y_world / (elevScale * vertExag)
    //          row = (z_world - tileY / 2^z) * 512 * 2^z

    const tileOriginX = tile.x / (1 << tile.z);
    const tileOriginZ = tile.y / (1 << tile.z);

    const localOx = (ox - tileOriginX) * tileScale;
    const localOy = oy / scale;
    const localOz = (oz - tileOriginZ) * tileScale;

    const localDx = dx * tileScale;
    const localDy = dy / scale;
    const localDz = dz * tileScale;

    const hit = rayIntersectQuadtree(
      quadtree.minElev, quadtree.maxElev, elevations,
      localOx, localOy, localOz,
      localDx, localDy, localDz
    );

    if (!hit) continue;

    // Transform hit point back to world space
    const localHitX = localOx + localDx * hit.t;
    const localHitY = localOy + localDy * hit.t;
    const localHitZ = localOz + localDz * hit.t;

    const worldHitX = localHitX / tileScale + tileOriginX;
    const worldHitY = localHitY * scale;
    const worldHitZ = localHitZ / tileScale + tileOriginZ;

    // Compute world-space t from the original ray
    // Pick the component with largest direction magnitude for numerical stability
    let worldT;
    const absDx = Math.abs(dx), absDy = Math.abs(dy), absDz = Math.abs(dz);
    if (absDx >= absDy && absDx >= absDz) {
      worldT = (worldHitX - ox) / dx;
    } else if (absDy >= absDz) {
      worldT = (worldHitY - oy) / dy;
    } else {
      worldT = (worldHitZ - oz) / dz;
    }

    if (worldT > 0 && worldT < bestT) {
      bestT = worldT;
      bestWorldPos = [worldHitX, worldHitY, worldHitZ];
      bestTile = tile;
    }
  }

  if (!bestWorldPos) return null;
  return { worldPos: bestWorldPos, t: bestT, tile: bestTile };
}
