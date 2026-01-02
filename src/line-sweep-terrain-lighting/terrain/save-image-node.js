// Image saving utilities for Node.js using sharp
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

/**
 * Save Float32Array as grayscale PNG image
 *
 * @param {Float32Array} data - Lighting values [0,1]
 * @param {number} size - Image size (width and height)
 * @param {string} filename - Output filename
 * @returns {Promise<void>}
 */
export async function saveAsImage(data, size, filename) {
  // Convert Float32Array [0,1] to Uint8Array [0,255]
  const pixels = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i++) {
    pixels[i] = Math.floor(Math.min(Math.max(data[i], 0), 1) * 255);
  }

  // Use sharp to create PNG
  await sharp(pixels, {
    raw: {
      width: size,
      height: size,
      channels: 1
    }
  })
  .png()
  .toFile(filename);
}

/**
 * Get pixel value at coordinates for testing
 *
 * @param {Float32Array} data - Image data
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Image width
 * @returns {number} Pixel value
 */
export function getPixel(data, x, y, width) {
  return data[y * width + x];
}

/**
 * Get basic statistics about the data
 *
 * @param {Float32Array} data - Image data
 * @returns {{min: number, max: number, mean: number}}
 */
export function getStats(data) {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const val = data[i];
    if (val < min) min = val;
    if (val > max) max = val;
    sum += val;
  }

  return {
    min,
    max,
    mean: sum / data.length
  };
}
