import { getElevationScale } from './tile-math.js';

// Frustum culling + LOD tile selection via quadtree traversal

// Extract 6 frustum planes from a projectionView matrix (Gribb/Hartmann)
// Each plane: [a, b, c, d] where ax + by + cz + d >= 0 is inside
function extractFrustumPlanes(projView) {
  const planes = [];
  const m = projView;

  // Left:   row3 + row0
  planes.push(normalizePlane(m[3]+m[0], m[7]+m[4], m[11]+m[8], m[15]+m[12]));
  // Right:  row3 - row0
  planes.push(normalizePlane(m[3]-m[0], m[7]-m[4], m[11]-m[8], m[15]-m[12]));
  // Bottom: row3 + row1
  planes.push(normalizePlane(m[3]+m[1], m[7]+m[5], m[11]+m[9], m[15]+m[13]));
  // Top:    row3 - row1
  planes.push(normalizePlane(m[3]-m[1], m[7]-m[5], m[11]-m[9], m[15]-m[13]));
  // Near:   row3 + row2 (WebGPU: z in [0,1], so near = row2)
  planes.push(normalizePlane(m[2], m[6], m[10], m[14]));
  // Far:    row3 - row2
  planes.push(normalizePlane(m[3]-m[2], m[7]-m[6], m[11]-m[10], m[15]-m[14]));

  return planes;
}

function normalizePlane(a, b, c, d) {
  const len = Math.sqrt(a*a + b*b + c*c);
  return [a/len, b/len, c/len, d/len];
}

// Test AABB against frustum planes
// Returns: -1 = fully outside, 0 = intersecting, 1 = fully inside
function testAABBFrustum(planes, minX, minY, minZ, maxX, maxY, maxZ) {
  let allInside = true;
  for (let i = 0; i < 6; i++) {
    const [a, b, c, d] = planes[i];
    // Find the p-vertex (most positive corner along plane normal)
    const px = a >= 0 ? maxX : minX;
    const py = b >= 0 ? maxY : minY;
    const pz = c >= 0 ? maxZ : minZ;
    // Find the n-vertex (most negative corner along plane normal)
    const nx = a >= 0 ? minX : maxX;
    const ny = b >= 0 ? minY : maxY;
    const nz = c >= 0 ? minZ : maxZ;

    if (a*px + b*py + c*pz + d < 0) return -1; // fully outside
    if (a*nx + b*ny + c*nz + d < 0) allInside = false; // partially inside
  }
  return allInside ? 1 : 0;
}

// Extract camera world position from a projection-view matrix.
// The eye is where clip x, y, and w are all zero — a 3x3 system
// solved via Cramer's rule. Purely derived from the matrix.
function extractEyePosition(m) {
  // A * eye = b where rows of A are the x, y, w rows of projView
  const a00 = m[0], a01 = m[4], a02 = m[8],  b0 = -m[12];
  const a10 = m[1], a11 = m[5], a12 = m[9],  b1 = -m[13];
  const a20 = m[3], a21 = m[7], a22 = m[11], b2 = -m[15];

  const det = a00*(a11*a22 - a12*a21) - a01*(a10*a22 - a12*a20) + a02*(a10*a21 - a11*a20);
  const invDet = 1 / det;

  return [
    (b0*(a11*a22 - a12*a21) - a01*(b1*a22 - a12*b2) + a02*(b1*a21 - a11*b2)) * invDet,
    (a00*(b1*a22 - a12*b2) - b0*(a10*a22 - a12*a20) + a02*(a10*b2 - b1*a20)) * invDet,
    (a00*(a11*b2 - b1*a21) - a01*(a10*b2 - b1*a20) + b0*(a10*a21 - a11*a20)) * invDet,
  ];
}

// Compute screen-space density (screen pixels per tile pixel) as the
// projected size of a texel-sized sphere. Uses Euclidean distance from the
// camera to the tile center, which is isotropic (same projected size
// regardless of viewing direction). Camera position and focal length are
// extracted from the projection-view matrix — no external parameters needed
// beyond the matrix and viewport size.
function screenDensity(m, z, x, y, screenHeight, eyeX, eyeY, eyeZ) {
  const s = 1 / (1 << z);
  const texelSize = s / 512;

  const dx = eyeX - (x + 0.5) * s;
  const dy = eyeY;
  const dz = eyeZ - (y + 0.5) * s;
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (dist < 1e-10) return Infinity;

  // The focal length f = 1/tan(fov/2) is encoded in the projView matrix as
  // the norm of the second row's spatial components: M row 1 = f * V row 1,
  // and V row 1 is the camera's up vector (unit length). So f = ||M[1],M[5],M[9]||.
  // Using m[5] alone would give f*up_y, which goes to zero when looking down.
  const f = Math.sqrt(m[1] * m[1] + m[5] * m[5] + m[9] * m[9]);
  return texelSize * f * screenHeight * 0.5 / dist;
}

// Tile AABB in world space — uses per-tile elevation bounds when available
function tileAABB(z, x, y, maxElevY, verticalExaggeration, tileManager) {
  const s = 1 / (1 << z);
  let minY = 0, maxY = maxElevY;
  const bounds = tileManager.getElevationBounds(z, x, y);
  if (bounds) {
    const scale = getElevationScale(z, y);
    minY = bounds.minElevation * scale * verticalExaggeration;
    maxY = bounds.maxElevation * scale * verticalExaggeration;
  }
  return {
    minX: x * s,
    maxX: (x + 1) * s,
    minY,
    maxY,
    minZ: y * s,
    maxZ: (y + 1) * s,
  };
}

const MAX_ZOOM = 14;
const MIN_DATA_ZOOM = 4;
const MAX_TILES = 200;

// Select tiles for rendering. Only subdivides when all 4 children are loaded,
// so the returned list contains only loaded tiles — no fallback resolution needed.
// Missing tiles are requested from tileManager for progressive loading.
export function selectTiles(projView, canvasWidth, canvasHeight, maxElevY, verticalExaggeration, densityThreshold, sourceBounds, tileManager, ensureImagery) {
  const planes = extractFrustumPlanes(projView);
  const [eyeX, eyeY, eyeZ] = extractEyePosition(projView);
  const result = [];

  const minDataZoom = (sourceBounds && sourceBounds.minZoom != null) ? sourceBounds.minZoom : MIN_DATA_ZOOM;
  const maxZoom = (sourceBounds && sourceBounds.maxZoom != null) ? sourceBounds.maxZoom : MAX_ZOOM;

  function traverse(z, x, y) {
    if (result.length >= MAX_TILES) return;

    const { minX, maxX, minY, maxY, minZ, maxZ } = tileAABB(z, x, y, maxElevY, verticalExaggeration, tileManager);

    // Skip tiles completely outside source data bounds
    if (sourceBounds && (maxX < sourceBounds.minX || minX > sourceBounds.maxX ||
        maxZ < sourceBounds.minY || minZ > sourceBounds.maxY)) return;

    // Frustum cull (still uses full AABB with elevation for conservative culling)
    const frustumResult = testAABBFrustum(planes, minX, minY, minZ, maxX, maxY, maxZ);
    if (frustumResult === -1) return;

    // Below data zoom: always recurse (no tiles exist at these levels)
    if (z < minDataZoom) {
      const cz = z + 1;
      const cx = x * 2;
      const cy = y * 2;
      traverse(cz, cx, cy);
      traverse(cz, cx + 1, cy);
      traverse(cz, cx, cy + 1);
      traverse(cz, cx + 1, cy + 1);
      return;
    }

    // At data zoom: tile must be loaded to render or subdivide
    const loaded = tileManager.hasTile(z, x, y);

    if (!loaded) {
      tileManager.requestTile(z, x, y);
      return;
    }

    // Subdivide based on projected size of a texel-sized sphere
    const shouldSubdivide = z < maxZoom &&
      screenDensity(projView, z, x, y, canvasHeight, eyeX, eyeY, eyeZ) > densityThreshold;

    if (shouldSubdivide) {
      const cz = z + 1;
      const cx = x * 2;
      const cy = y * 2;

      // Only subdivide if all 4 children are resolved (loaded or 404) — prevents flickering
      if (tileManager.isResolved(cz, cx, cy) &&
          tileManager.isResolved(cz, cx + 1, cy) &&
          tileManager.isResolved(cz, cx, cy + 1) &&
          tileManager.isResolved(cz, cx + 1, cy + 1)) {
        // Also require imagery before subdividing — parent keeps displaying until children are ready.
        // Use & (not &&) so all children get imagery requested even if the first returns false.
        if (!ensureImagery || (
            ensureImagery(cz, cx, cy) &
            ensureImagery(cz, cx + 1, cy) &
            ensureImagery(cz, cx, cy + 1) &
            ensureImagery(cz, cx + 1, cy + 1))) {
          traverse(cz, cx, cy);
          traverse(cz, cx + 1, cy);
          traverse(cz, cx, cy + 1);
          traverse(cz, cx + 1, cy + 1);
          return;
        }
      }

      // Request missing children for progressive loading; pre-load imagery for those with elevation
      if (!tileManager.hasTile(cz, cx, cy)) tileManager.requestTile(cz, cx, cy);
      else if (ensureImagery) ensureImagery(cz, cx, cy);
      if (!tileManager.hasTile(cz, cx + 1, cy)) tileManager.requestTile(cz, cx + 1, cy);
      else if (ensureImagery) ensureImagery(cz, cx + 1, cy);
      if (!tileManager.hasTile(cz, cx, cy + 1)) tileManager.requestTile(cz, cx, cy + 1);
      else if (ensureImagery) ensureImagery(cz, cx, cy + 1);
      if (!tileManager.hasTile(cz, cx + 1, cy + 1)) tileManager.requestTile(cz, cx + 1, cy + 1);
      else if (ensureImagery) ensureImagery(cz, cx + 1, cy + 1);
    }

    // Render this tile (it's loaded)
    result.push({ z, x, y });
  }

  // Start from tile 0/0/0
  traverse(0, 0, 0);

  return result;
}

// Identity — selectTiles already only returns loaded tiles
export function resolveRenderList(tiles) {
  return tiles;
}

// Exposed for debugging
export { screenDensity, extractEyePosition };
