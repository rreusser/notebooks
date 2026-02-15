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
      } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
        // Normalize to array-of-rings so LineString and MultiLineString share one path
        const rings = feature.geometry.type === 'MultiLineString'
          ? feature.geometry.coordinates
          : [feature.geometry.coordinates];

        // Flatten rings into a single coordinate array, deduplicating shared endpoints
        let rawCoords = [];
        for (const ring of rings) {
          for (const pt of ring) {
            const prev = rawCoords[rawCoords.length - 1];
            if (prev && prev[0] === pt[0] && prev[1] === pt[1]) continue; // skip duplicate
            rawCoords.push(pt);
          }
        }

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
