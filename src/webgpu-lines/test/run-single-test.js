#!/usr/bin/env node
/**
 * Run a single test case
 * Usage: node run-single-test.js <test-name> [--update]
 */

import {
  initWebGPU,
  createRenderTarget,
  savePNG,
  loadPNG,
  compareImages,
  generateZigzag,
  generateSpiral,
  generateStraightLine,
  getExpectedPath,
  getActualPath,
  getDiffPath,
  ensureDirectories
} from './test-harness.js';

import { testCases } from './test-cases.js';
import { createGPULines } from '../webgpu-lines.js';
import fs from 'fs';

const testName = process.argv[2];
const updateMode = process.argv.includes('--update');

if (!testName) {
  console.error('Usage: node run-single-test.js <test-name> [--update]');
  process.exit(1);
}

const testCase = testCases.find(tc => tc.name === testName);
if (!testCase) {
  console.error(`Unknown test: ${testName}`);
  console.error('Available tests:', testCases.map(tc => tc.name).join(', '));
  process.exit(1);
}

function getPatternPositions(pattern) {
  switch (pattern) {
    case 'zigzag': return generateZigzag(6);
    case 'spiral': return generateSpiral(50);
    case 'straight': return generateStraightLine(2);
    default: throw new Error(`Unknown pattern: ${pattern}`);
  }
}

async function run() {
  ensureDirectories();

  const { device, format } = await initWebGPU();
  const { name, options, pattern, width, canvasSize } = testCase;
  const [canvasWidth, canvasHeight] = canvasSize;

  // Create render target
  const texture = device.createTexture({
    size: { width: canvasWidth, height: canvasHeight },
    format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
  });

  const bytesPerRow = Math.ceil(canvasWidth * 4 / 256) * 256;
  const readbackBuffer = device.createBuffer({
    size: bytesPerRow * canvasHeight,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
  });

  // Create GPU lines renderer
  const gpuLines = createGPULines(device, {
    format,
    ...options,
    vertexShaderBody: '',
    fragmentShaderBody: /* wgsl */`
      fn getColor(lineCoord: vec3f) -> vec4f {
        let edge = 1.0 - 0.3 * abs(lineCoord.y);
        return vec4f(0.2 * edge, 0.5 * edge, 0.9 * edge, 1.0);
      }
    `
  });

  // Create position buffer
  const positions = getPatternPositions(pattern);
  const positionBuffer = device.createBuffer({
    size: positions.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(positionBuffer, 0, positions);

  const drawProps = {
    positionBuffer,
    vertexCount: positions.length / 4,
    width,
    resolution: [canvasWidth, canvasHeight]
  };

  // Render
  const encoder = device.createCommandEncoder();
  gpuLines.prepareFrame(encoder, drawProps);

  const pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: texture.createView(),
      loadOp: 'clear',
      storeOp: 'store',
      clearValue: { r: 0.95, g: 0.95, b: 0.95, a: 1 }
    }]
  });

  gpuLines.draw(pass, drawProps);
  pass.end();

  encoder.copyTextureToBuffer(
    { texture },
    { buffer: readbackBuffer, bytesPerRow },
    { width: canvasWidth, height: canvasHeight }
  );

  device.queue.submit([encoder.finish()]);

  // Read pixels
  await readbackBuffer.mapAsync(GPUMapMode.READ);
  const data = new Uint8Array(readbackBuffer.getMappedRange());
  const pixels = new Uint8Array(canvasWidth * canvasHeight * 4);
  for (let row = 0; row < canvasHeight; row++) {
    const srcOffset = row * bytesPerRow;
    const dstOffset = row * canvasWidth * 4;
    pixels.set(data.subarray(srcOffset, srcOffset + canvasWidth * 4), dstOffset);
  }
  readbackBuffer.unmap();

  // Handle result
  const expectedPath = getExpectedPath(name);

  if (updateMode) {
    savePNG(expectedPath, pixels, canvasWidth, canvasHeight);
    console.log(JSON.stringify({ status: 'updated', name }));
  } else {
    if (!fs.existsSync(expectedPath)) {
      console.log(JSON.stringify({ status: 'missing', name }));
      process.exit(1);
    }

    const expected = loadPNG(expectedPath);
    const result = compareImages(pixels, expected.pixels, canvasWidth, canvasHeight, 0.1);

    if (result.match) {
      console.log(JSON.stringify({ status: 'pass', name }));
    } else {
      savePNG(getActualPath(name), pixels, canvasWidth, canvasHeight);
      savePNG(getDiffPath(name), result.diffImage, canvasWidth, canvasHeight);
      console.log(JSON.stringify({
        status: 'fail',
        name,
        diffPixels: result.diffPixels,
        diffPercent: result.diffPercent
      }));
      process.exit(1);
    }
  }

  // Cleanup
  await device.queue.onSubmittedWorkDone();
  texture.destroy();
  readbackBuffer.destroy();
  positionBuffer.destroy();
  gpuLines.destroy();
  device.destroy();
}

run().catch(err => {
  console.log(JSON.stringify({ status: 'error', name: testName, message: err.message }));
  process.exit(1);
});
