// Per-tile min/max quadtree over the 512×512 patch grid.
// Each patch is a bilinear cell between 4 elevation samples.
//
// Storage: Two Float32Array(349525) — minElev and maxElev.
// 10 levels (0=root through 9=leaf 512×512).
// Level k starts at offset (4^k - 1) / 3, has (2^k)² nodes.

const LEVELS = 10; // 0=root (1×1) through 9=leaf (512×512)
const TOTAL_NODES = 349525; // (4^10 - 1) / 3

// Precompute level offsets: offset[k] = (4^k - 1) / 3
const levelOffset = new Uint32Array(LEVELS);
{
  let pow4 = 1;
  for (let k = 0; k < LEVELS; k++) {
    levelOffset[k] = (pow4 - 1) / 3;
    pow4 *= 4;
  }
}

/**
 * Build a min/max elevation quadtree from a 514×514 elevation array.
 *
 * @param {Float32Array} elevations - 514×514 raw elevation values from tile decode
 * @returns {{ minElev: Float32Array, maxElev: Float32Array }}
 */
export function buildElevationQuadtree(elevations) {
  const minElev = new Float32Array(TOTAL_NODES);
  const maxElev = new Float32Array(TOTAL_NODES);

  // Fill leaves (level 9 = 512×512 patches)
  const leafLevel = LEVELS - 1;
  const leafOff = levelOffset[leafLevel];
  const leafSize = 512; // 2^9
  const stride = 514;

  for (let row = 0; row < leafSize; row++) {
    for (let col = 0; col < leafSize; col++) {
      // Patch (row, col) uses corners at data indices (row+1, col+1), etc.
      const r = row + 1;
      const c = col + 1;
      const tl = elevations[r * stride + c];
      const tr = elevations[r * stride + c + 1];
      const bl = elevations[(r + 1) * stride + c];
      const br = elevations[(r + 1) * stride + c + 1];

      const idx = leafOff + row * leafSize + col;
      minElev[idx] = Math.min(tl, tr, bl, br);
      maxElev[idx] = Math.max(tl, tr, bl, br);
    }
  }

  // Build bottom-up: parents = min/max of 4 children
  for (let k = leafLevel - 1; k >= 0; k--) {
    const off = levelOffset[k];
    const childOff = levelOffset[k + 1];
    const size = 1 << k;
    const childSize = 1 << (k + 1);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const idx = off + row * size + col;
        const cr = row * 2;
        const cc = col * 2;
        const c0 = childOff + cr * childSize + cc;
        const c1 = c0 + 1;
        const c2 = childOff + (cr + 1) * childSize + cc;
        const c3 = c2 + 1;

        minElev[idx] = Math.min(minElev[c0], minElev[c1], minElev[c2], minElev[c3]);
        maxElev[idx] = Math.max(maxElev[c0], maxElev[c1], maxElev[c2], maxElev[c3]);
      }
    }
  }

  return { minElev, maxElev };
}

// Ray-AABB slab test. Returns [tNear, tFar] or null if no hit.
function rayAABB(ox, oy, oz, dx, dy, dz, xmin, ymin, zmin, xmax, ymax, zmax) {
  let tmin, tmax;

  if (dx !== 0) {
    let t1 = (xmin - ox) / dx;
    let t2 = (xmax - ox) / dx;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    tmin = t1;
    tmax = t2;
  } else {
    if (ox < xmin || ox > xmax) return null;
    tmin = -Infinity;
    tmax = Infinity;
  }

  if (dy !== 0) {
    let t1 = (ymin - oy) / dy;
    let t2 = (ymax - oy) / dy;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
  } else {
    if (oy < ymin || oy > ymax) return null;
  }

  if (tmin > tmax) return null;

  if (dz !== 0) {
    let t1 = (zmin - oz) / dz;
    let t2 = (zmax - oz) / dz;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
  } else {
    if (oz < zmin || oz > zmax) return null;
  }

  if (tmin > tmax || tmax < 0) return null;
  return [tmin, tmax];
}

// Moller-Trumbore ray-triangle intersection
// Returns t or -1 if no hit
function rayTriangle(ox, oy, oz, dx, dy, dz, v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z) {
  const e1x = v1x - v0x, e1y = v1y - v0y, e1z = v1z - v0z;
  const e2x = v2x - v0x, e2y = v2y - v0y, e2z = v2z - v0z;

  const px = dy * e2z - dz * e2y;
  const py = dz * e2x - dx * e2z;
  const pz = dx * e2y - dy * e2x;

  const det = e1x * px + e1y * py + e1z * pz;
  if (det > -1e-10 && det < 1e-10) return -1;

  const invDet = 1 / det;
  const tx = ox - v0x, ty = oy - v0y, tz = oz - v0z;
  const u = (tx * px + ty * py + tz * pz) * invDet;
  if (u < 0 || u > 1) return -1;

  const qx = ty * e1z - tz * e1y;
  const qy = tz * e1x - tx * e1z;
  const qz = tx * e1y - ty * e1x;
  const v = (dx * qx + dy * qy + dz * qz) * invDet;
  if (v < 0 || u + v > 1) return -1;

  const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
  return t > 0 ? t : -1;
}

/**
 * Ray-quadtree intersection for a single tile.
 *
 * Ray is in tile-local patch coordinates:
 *   X, Z ∈ [0, 512], Y = raw elevation meters.
 *
 * @param {Float32Array} minE - minElev quadtree array
 * @param {Float32Array} maxE - maxElev quadtree array
 * @param {Float32Array} elevations - 514×514 raw elevation data
 * @param {number} ox, oy, oz - ray origin
 * @param {number} dx, dy, dz - ray direction (need not be normalized)
 * @returns {{ t: number, patchRow: number, patchCol: number } | null}
 */
export function rayIntersectQuadtree(minE, maxE, elevations, ox, oy, oz, dx, dy, dz) {
  let bestT = Infinity;
  let bestRow = -1;
  let bestCol = -1;

  // Stack entries: [level, row, col]
  const stack = new Int32Array(LEVELS * 4 * 3); // generous size
  let sp = 0;

  // Push root
  stack[sp++] = 0; // level
  stack[sp++] = 0; // row
  stack[sp++] = 0; // col

  const stride = 514;

  while (sp > 0) {
    const col = stack[--sp];
    const row = stack[--sp];
    const level = stack[--sp];

    const off = levelOffset[level];
    const size = 1 << level;
    const idx = off + row * size + col;

    // Node AABB in patch coordinates
    const cellsPerNode = 512 >>> level; // 512 / 2^level
    const xmin = col * cellsPerNode;
    const xmax = xmin + cellsPerNode;
    const zmin = row * cellsPerNode;
    const zmax = zmin + cellsPerNode;
    const ymin = minE[idx];
    const ymax = maxE[idx];

    // Ray-AABB test
    const hit = rayAABB(ox, oy, oz, dx, dy, dz, xmin, ymin, zmin, xmax, ymax, zmax);
    if (!hit) continue;
    if (hit[0] >= bestT) continue; // entire node is beyond current best

    if (level === LEVELS - 1) {
      // Leaf: test 2 triangles for this patch
      // Corners in patch coords: (col, row) to (col+1, row+1)
      // Elevations from the 514-wide array at (row+1, col+1) offset
      const r = row + 1;
      const c = col + 1;
      const tlElev = elevations[r * stride + c];
      const trElev = elevations[r * stride + c + 1];
      const blElev = elevations[(r + 1) * stride + c];
      const brElev = elevations[(r + 1) * stride + c + 1];

      // Triangle 1: tl, bl, tr (same winding as mesh.js)
      let t = rayTriangle(
        ox, oy, oz, dx, dy, dz,
        col, tlElev, row,
        col, blElev, row + 1,
        col + 1, trElev, row
      );
      if (t > 0 && t < bestT) {
        bestT = t;
        bestRow = row;
        bestCol = col;
      }

      // Triangle 2: tr, bl, br
      t = rayTriangle(
        ox, oy, oz, dx, dy, dz,
        col + 1, trElev, row,
        col, blElev, row + 1,
        col + 1, brElev, row + 1
      );
      if (t > 0 && t < bestT) {
        bestT = t;
        bestRow = row;
        bestCol = col;
      }
    } else {
      // Push 4 children
      const childLevel = level + 1;
      const cr = row * 2;
      const cc = col * 2;
      stack[sp++] = childLevel; stack[sp++] = cr;     stack[sp++] = cc;
      stack[sp++] = childLevel; stack[sp++] = cr;     stack[sp++] = cc + 1;
      stack[sp++] = childLevel; stack[sp++] = cr + 1; stack[sp++] = cc;
      stack[sp++] = childLevel; stack[sp++] = cr + 1; stack[sp++] = cc + 1;
    }
  }

  if (bestT === Infinity) return null;
  return { t: bestT, patchRow: bestRow, patchCol: bestCol };
}
