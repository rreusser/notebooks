/**
 * Test harness for headless WebGPU line rendering
 *
 * Uses webgpu (Dawn) for headless rendering and pixelmatch for image comparison.
 *
 * Usage:
 *   UPDATE=1 node test/run-tests.js   # Update expected images
 *   node test/run-tests.js            # Run tests against expectations
 */

import { create, globals } from 'webgpu';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Inject WebGPU globals
Object.assign(globalThis, globals);

/**
 * Initialize headless WebGPU
 */
export async function initWebGPU() {
  const gpu = create([]);

  const adapter = await gpu.requestAdapter();
  if (!adapter) {
    throw new Error('Failed to get WebGPU adapter');
  }

  const device = await adapter.requestDevice();
  const format = 'rgba8unorm';

  return { gpu, adapter, device, format };
}

/**
 * Create a render target texture and readback buffer
 */
export function createRenderTarget(device, width, height, format) {
  const texture = device.createTexture({
    size: { width, height },
    format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
  });

  // Buffer for reading back pixel data
  const bytesPerRow = Math.ceil(width * 4 / 256) * 256; // Align to 256
  const readbackBuffer = device.createBuffer({
    size: bytesPerRow * height,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
  });

  return { texture, readbackBuffer, bytesPerRow };
}

/**
 * Read pixels from render target
 */
export async function readPixels(device, encoder, texture, readbackBuffer, width, height, bytesPerRow) {
  encoder.copyTextureToBuffer(
    { texture },
    { buffer: readbackBuffer, bytesPerRow },
    { width, height }
  );

  device.queue.submit([encoder.finish()]);

  await readbackBuffer.mapAsync(GPUMapMode.READ);
  const data = new Uint8Array(readbackBuffer.getMappedRange());

  // Copy data removing row padding
  const pixels = new Uint8Array(width * height * 4);
  for (let row = 0; row < height; row++) {
    const srcOffset = row * bytesPerRow;
    const dstOffset = row * width * 4;
    pixels.set(data.subarray(srcOffset, srcOffset + width * 4), dstOffset);
  }

  readbackBuffer.unmap();
  return pixels;
}

/**
 * Save pixels as PNG
 */
export function savePNG(filepath, pixels, width, height) {
  const png = new PNG({ width, height });
  png.data = Buffer.from(pixels);
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(filepath, buffer);
}

/**
 * Load PNG and return pixels
 */
export function loadPNG(filepath) {
  const buffer = fs.readFileSync(filepath);
  const png = PNG.sync.read(buffer);
  return { pixels: new Uint8Array(png.data), width: png.width, height: png.height };
}

/**
 * Compare two images using pixelmatch
 * @returns {{ match: boolean, diffPixels: number, diffPercent: number, diffImage?: Uint8Array }}
 */
export function compareImages(actual, expected, width, height, threshold = 0.1) {
  const diff = new Uint8Array(width * height * 4);
  const diffPixels = pixelmatch(actual, expected, diff, width, height, { threshold });
  const totalPixels = width * height;
  const diffPercent = (diffPixels / totalPixels) * 100;

  return {
    match: diffPixels === 0,
    diffPixels,
    diffPercent,
    diffImage: diff
  };
}

/**
 * Generate test positions for a zigzag pattern
 */
export function generateZigzag(numPoints = 6) {
  const positions = new Float32Array(numPoints * 4);
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const x = -0.6 + t * 1.2;
    const y = (i % 2 === 0 ? 0.2 : -0.2);
    positions[i * 4 + 0] = x;
    positions[i * 4 + 1] = y;
    positions[i * 4 + 2] = 0;
    positions[i * 4 + 3] = 1;
  }
  return positions;
}

/**
 * Generate test positions for a spiral pattern
 */
export function generateSpiral(numPoints = 50) {
  const positions = new Float32Array(numPoints * 4);
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const angle = t * Math.PI * 4;
    const r = 0.1 + t * 0.5;
    positions[i * 4 + 0] = r * Math.cos(angle);
    positions[i * 4 + 1] = r * Math.sin(angle);
    positions[i * 4 + 2] = 0;
    positions[i * 4 + 3] = 1;
  }
  return positions;
}

/**
 * Generate a single straight line segment
 */
export function generateStraightLine(numPoints = 2) {
  const positions = new Float32Array(numPoints * 4);
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    positions[i * 4 + 0] = -0.5 + t;
    positions[i * 4 + 1] = 0;
    positions[i * 4 + 2] = 0;
    positions[i * 4 + 3] = 1;
  }
  return positions;
}

/**
 * Get path to expected image
 */
export function getExpectedPath(testName) {
  return path.join(__dirname, 'expected', `${testName}.png`);
}

/**
 * Get path to actual (output) image
 */
export function getActualPath(testName) {
  return path.join(__dirname, 'actual', `${testName}.png`);
}

/**
 * Get path to diff image
 */
export function getDiffPath(testName) {
  return path.join(__dirname, 'diff', `${testName}.png`);
}

/**
 * Ensure directories exist
 */
export function ensureDirectories() {
  const dirs = ['expected', 'actual', 'diff'].map(d => path.join(__dirname, d));
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}
