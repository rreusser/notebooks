// Platform-agnostic terrain tile fetching utilities

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicnNyZXVzc2VyIiwiYSI6ImNtandiOWhucjRmdmwzam9qcGR5dnppaGUifQ.6rnP5lJ07E64p724diNzaQ";
export const SKU = "101pM5uZK0TZt";
export const TERRAIN_ENDPOINT = "https://api.mapbox.com/raster/v1/mapbox.mapbox-terrain-dem-v1/$z/$x/$y.webp?sku=$SKU&access_token=$ACCESS_TOKEN";
export const SATELLITE_ENDPOINT = "https://api.mapbox.com/v4/mapbox.satellite/$z/$x/$y@2x.webp?sku=$SKU&access_token=$ACCESS_TOKEN";

/**
 * Create a tile fetcher function for a given endpoint
 * Platform-specific implementations need to provide Image loading
 */
export function createFetcherTemplate(endpoint, ImageConstructor, loadImage) {
  return function getTile({ x, y, z }) {
    return new Promise((resolve, reject) => {
      const url = endpoint
        .replace('$x', x)
        .replace('$y', y)
        .replace('$z', z)
        .replace('$SKU', SKU)
        .replace('$ACCESS_TOKEN', MAPBOX_ACCESS_TOKEN);

      loadImage(url, ImageConstructor)
        .then(img => {
          const tileSize = Math.pow(2, Math.floor(Math.log2(img.width)));
          const buffer = (img.width - tileSize) / 2;
          resolve({ img, width: img.width, height: img.height, tileSize, buffer });
        })
        .catch(() => reject(new Error("Failed to load terrain tile")));
    });
  };
}

/**
 * Decode Mapbox RGB-encoded terrain data into elevations
 * Pure function with no DOM dependencies
 *
 * @param {Uint8Array} imageData - RGBA pixel data
 * @returns {Float32Array} Decoded elevation values in meters
 */
export function decodeTerrainData(imageData) {
  const len = imageData.length / 4;
  const out = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    out[i] =
      -10000 +
      0.1 *
        ((imageData[4 * i] << 16) |
          (imageData[4 * i + 1] << 8) |
          imageData[4 * i + 2]);
  }
  return out;
}
