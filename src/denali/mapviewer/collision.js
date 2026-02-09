// Collision detection for feature layers
// Greedy front-to-back AABB overlap test in screen space

/**
 * Run collision detection on an array of screen-space items.
 *
 * @param {Array<{layerIndex: number, featureIndex: number, screenX: number, screenY: number, halfW: number, halfH: number, depth: number}>} items
 *   All coordinates in CSS pixels. depth = NDC z/w (smaller = closer).
 * @returns {{ items: Array<{...item, visible: boolean}>, hiddenByLayer: Map<number, Set<number>> }}
 */
export function runCollision(items, buffer = 0, screenW = Infinity, screenH = Infinity) {
  // Sort front-to-back (smaller depth = closer)
  items.sort((a, b) => a.depth - b.depth);

  const placed = [];
  const hiddenByLayer = new Map();

  for (const item of items) {
    // Expand test bounds by buffer so boxes maintain minimum spacing
    const minX = item.screenX - item.halfW - buffer;
    const maxX = item.screenX + item.halfW + buffer;
    const minY = item.screenY - item.halfH - buffer;
    const maxY = item.screenY + item.halfH + buffer;

    // Reject items whose buffered bbox extends past screen edges
    let collides = minX < 0 || maxX > screenW || minY < 0 || maxY > screenH;

    if (!collides) {
      for (let i = 0; i < placed.length; i++) {
        const p = placed[i];
        if (minX < p.maxX && maxX > p.minX && minY < p.maxY && maxY > p.minY) {
          collides = true;
          break;
        }
      }
    }

    if (collides) {
      item.visible = false;
      let set = hiddenByLayer.get(item.layerIndex);
      if (!set) {
        set = new Set();
        hiddenByLayer.set(item.layerIndex, set);
      }
      set.add(item.featureIndex);
    } else {
      item.visible = true;
      // Store original (non-expanded) bounds so each pair maintains exactly `buffer` gap
      placed.push({
        minX: item.screenX - item.halfW,
        maxX: item.screenX + item.halfW,
        minY: item.screenY - item.halfH,
        maxY: item.screenY + item.halfH,
      });
    }
  }

  return { items, hiddenByLayer };
}
