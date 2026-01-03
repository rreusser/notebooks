// Node.js-specific tile fetching using JSDOM
import { JSDOM } from 'jsdom';
import {
  TERRAIN_ENDPOINT,
  SATELLITE_ENDPOINT,
  createFetcherTemplate,
  decodeTerrainData as decodeTerrainDataCore
} from './fetch-tile.js';

// Create a JSDOM instance for Image and Canvas APIs
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const { Image } = dom.window;

// Node.js-specific image loader using fetch
async function loadNodeImage(url, ImageConstructor) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const img = new ImageConstructor();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Failed to load image: ${err}`));
    img.src = `data:image/webp;base64,${buffer.toString('base64')}`;
  });
}

// Create Node.js-specific fetchers
function createFetcher(endpoint) {
  return createFetcherTemplate(endpoint, Image, loadNodeImage);
}

export const getTerrainTile = createFetcher(TERRAIN_ENDPOINT);
export const getSatelliteTile = createFetcher(SATELLITE_ENDPOINT);

/**
 * Read image data from JSDOM Image element
 *
 * @param {Image} img - JSDOM Image element
 * @returns {Uint8ClampedArray} RGBA pixel data
 */
export function readImageData(img) {
  const canvas = dom.window.document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height).data;
}

// Re-export core decode function
export const decodeTerrainData = decodeTerrainDataCore;
