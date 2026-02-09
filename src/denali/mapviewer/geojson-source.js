// GeoJSON point data source
// Loads GeoJSON, projects Point coordinates to Mercator, stores flat array

import { lonToMercatorX, latToMercatorY } from './tile-math.js';

export class GeoJSONSource {
  constructor() {
    this.features = [];     // Point features: { mercatorX, mercatorY, lon, lat, properties }
    this.lineFeatures = []; // LineString features: { coordinates: [{mercatorX, mercatorY, elevation, lon, lat}], properties }
  }

  async load(urlOrData, options = {}) {
    let geojson;
    if (typeof urlOrData === 'string') {
      const res = await fetch(urlOrData);
      geojson = await res.json();
    } else {
      geojson = urlOrData;
    }

    const simplifyTolerance = options.simplify;
    const simplifyFn = options.simplifyFn;

    this.features = [];
    this.lineFeatures = [];
    for (const feature of geojson.features) {
      if (!feature.geometry) continue;
      if (feature.geometry.type === 'Point') {
        const [lon, lat] = feature.geometry.coordinates;
        this.features.push({
          mercatorX: lonToMercatorX(lon),
          mercatorY: latToMercatorY(lat),
          lon,
          lat,
          properties: feature.properties || {},
        });
      } else if (feature.geometry.type === 'LineString') {
        let rawCoords = feature.geometry.coordinates;

        if (simplifyTolerance != null && simplifyFn) {
          const pts = rawCoords.map(([lon, lat, elev]) => ({ x: lon, y: lat, elev: elev || 0 }));
          const simplified = simplifyFn(pts, simplifyTolerance, true);
          rawCoords = simplified.map(p => [p.x, p.y, p.elev]);
        }

        const coords = rawCoords.map(([lon, lat, elev]) => ({
          mercatorX: lonToMercatorX(lon),
          mercatorY: latToMercatorY(lat),
          elevation: elev || 0,
          lon,
          lat,
        }));
        this.lineFeatures.push({ coordinates: coords, properties: feature.properties || {} });
      }
    }

    return this;
  }
}
