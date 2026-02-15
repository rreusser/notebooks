// Approximate treeline elevation (meters) from latitude, based on
// Körner & Paulsen (2004) global treeline data.
export function estimateTreeline(lat) {
  const pts = [
    [-60, 0], [-45, 1500], [-30, 2800], [-15, 3800],
    [0, 4000], [15, 4100], [30, 4200], [40, 3500],
    [50, 2300], [60, 1000], [65, 500], [70, 0],
  ];
  if (lat <= pts[0][0]) return pts[0][1];
  if (lat >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  for (let i = 1; i < pts.length; i++) {
    if (lat <= pts[i][0]) {
      const t = (lat - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0]);
      return pts[i - 1][1] + t * (pts[i][1] - pts[i - 1][1]);
    }
  }
  return 0;
}

export function createSettings(initial = {}) {
  return new Proxy({
    verticalExaggeration: 1.0,
    densityThreshold: 3.0,
    showTileBorders: false,
    freezeCoverage: false,
    enableCollision: true,
    showCollisionBoxes: false,
    showWireframe: false,
    showImagery: true,
    showFeatures: true,
    showRoute: true,
    slopeAngleOpacity: 0,
    slopeAspectMaskAbove: 0,
    slopeAspectMaskNear: 0,
    slopeAspectMaskBelow: 0,
    slopeAspectOpacity: 0.95,
    treelineLower: 2000,
    treelineUpper: 2500,
    contourOpacity: 1.0,
    collisionBuffer: 4,
    occlusionBias: 0.03,
    atmosphereDensity: 0.35,
    hillshadeOpacity: 0.95,
    sunDirection: [0.5, 0.7, 0.5],
    dirty: true,
    ...initial,
  }, {
    set(target, prop, value) {
      if (prop !== 'dirty' && target[prop] !== value) target.dirty = true;
      target[prop] = value;
      return true;
    }
  });
}

export function createAttribution(sources) {
  const el = document.createElement('div');
  el.className = 'terrain-attribution';
  el.innerHTML = sources
    .filter(s => s.attribution)
    .map(s => s.attribution)
    .join(' | ');
  return el;
}
