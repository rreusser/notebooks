export function createSettings(initial = {}) {
  return new Proxy({
    verticalExaggeration: 1.0,
    densityThreshold: 4.0,
    showTileBorders: false,
    freezeCoverage: false,
    featureDepthTest: false,
    enableCollision: true,
    showCollisionBoxes: false,
    collisionBuffer: 4,
    occlusionBias: 0.03,
    atmosphereDensity: 0.5,
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
