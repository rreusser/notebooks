// Browser-specific tile fetching using Image and Canvas APIs
import {
  TERRAIN_ENDPOINT,
  SATELLITE_ENDPOINT,
  createFetcherTemplate,
  decodeTerrainData as decodeTerrainDataCore
} from './fetch-tile.js';

// Browser-specific image loader
function loadBrowserImage(url, ImageConstructor) {
  return new Promise((resolve, reject) => {
    const img = new ImageConstructor();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

// Create browser-specific fetchers
function createFetcher(endpoint) {
  return createFetcherTemplate(endpoint, Image, loadBrowserImage);
}

const getTerrainTile = createFetcher(TERRAIN_ENDPOINT);
const getSatelliteTile = createFetcher(SATELLITE_ENDPOINT);

function readImageData(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height).data;
}

// Re-export core decode function
const decodeTerrainData = decodeTerrainDataCore;

export { 
  getTerrainTile,
  getSatelliteTile,
  readImageData,
  decodeTerrainData
};
