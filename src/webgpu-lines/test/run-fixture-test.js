#!/usr/bin/env node
/**
 * Run tests against regl-gpu-lines fixtures
 * Usage: node run-fixture-test.js <fixture-path>
 * Example: node run-fixture-test.js ../regl-gpu-lines/fixtures/miter/insert-caps/round
 */

import {
  initWebGPU,
  savePNG,
  loadPNG,
  compareImages,
  ensureDirectories
} from './test-harness.js';

import { createGPULines } from '../webgpu-lines.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fixturePath = process.argv[2];

if (!fixturePath) {
  console.error('Usage: node run-fixture-test.js <fixture-path>');
  process.exit(1);
}

async function run() {
  ensureDirectories();

  // Load fixture
  const fixtureFile = path.join(fixturePath, 'fixture.json');
  if (!fs.existsSync(fixtureFile)) {
    console.error(`Fixture not found: ${fixtureFile}`);
    process.exit(1);
  }

  const fixture = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
  const { width: canvasWidth, height: canvasHeight, vertexAttributes, data } = fixture;

  // Convert vertex attributes to our format
  const xy = vertexAttributes.xy;
  const breakAttr = vertexAttributes.break || [];
  const positions = new Float32Array(xy.length * 4);

  for (let i = 0; i < xy.length; i++) {
    positions[i * 4 + 0] = xy[i][0];
    positions[i * 4 + 1] = xy[i][1];
    positions[i * 4 + 2] = 0;
    // Use break attribute to set w (break=1 means invalid point)
    positions[i * 4 + 3] = breakAttr[i] ? 0 : 1;
  }

  // Initialize WebGPU
  const { device, format } = await initWebGPU();

  // Create render target with alpha for blending
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

  // Map fixture options to our options
  const options = {
    format,
    join: data.join || 'miter',
    cap: data.cap || 'square',
    miterLimit: data.miterLimit || 4,
    joinResolution: 8,
    capResolution: 8,
    vertexShaderBody: '',
    // Render solid gray with alpha 0.5 to match fixture
    fragmentShaderBody: /* wgsl */`
      fn getColor(lineCoord: vec3f) -> vec4f {
        return vec4f(0.0, 0.0, 0.0, 0.5);
      }
    `,
    // Alpha blending to match fixture (reveals overdraw)
    blend: {
      color: {
        srcFactor: 'src-alpha',
        dstFactor: 'one-minus-src-alpha',
        operation: 'add'
      },
      alpha: {
        srcFactor: 'one',
        dstFactor: 'one',
        operation: 'add'
      }
    }
  };

  // Create GPU lines renderer
  const gpuLines = createGPULines(device, options);

  // Create position buffer
  const positionBuffer = device.createBuffer({
    size: positions.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(positionBuffer, 0, positions);

  const drawProps = {
    positionBuffer,
    vertexCount: positions.length / 4,
    width: 20,  // Fixed width from fixture
    resolution: [canvasWidth, canvasHeight]
  };

  // Render with alpha blending
  const encoder = device.createCommandEncoder();
  gpuLines.prepareFrame(encoder, drawProps);

  const pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: texture.createView(),
      loadOp: 'clear',
      storeOp: 'store',
      clearValue: { r: 1, g: 1, b: 1, a: 1 }  // White background
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
  const rawData = new Uint8Array(readbackBuffer.getMappedRange());
  const pixels = new Uint8Array(canvasWidth * canvasHeight * 4);
  for (let row = 0; row < canvasHeight; row++) {
    const srcOffset = row * bytesPerRow;
    const dstOffset = row * canvasWidth * 4;
    pixels.set(rawData.subarray(srcOffset, srcOffset + canvasWidth * 4), dstOffset);
  }
  readbackBuffer.unmap();

  // Save actual output
  const fixtureName = path.basename(path.dirname(fixturePath)) + '-' + path.basename(fixturePath);
  const actualPath = path.join(__dirname, 'actual', `fixture-${fixtureName}.png`);
  savePNG(actualPath, pixels, canvasWidth, canvasHeight);
  console.log(`Saved actual: ${actualPath}`);

  // Compare with expected
  const expectedPath = path.join(fixturePath, 'expected.png');
  if (fs.existsSync(expectedPath)) {
    const expected = loadPNG(expectedPath);
    const result = compareImages(pixels, expected.pixels, canvasWidth, canvasHeight, 0.1);

    // Save diff
    const diffPath = path.join(__dirname, 'diff', `fixture-${fixtureName}.png`);
    savePNG(diffPath, result.diffImage, canvasWidth, canvasHeight);

    if (result.match) {
      console.log(`PASS: ${fixtureName}`);
    } else {
      console.log(`FAIL: ${fixtureName} - ${result.diffPixels} pixels different (${result.diffPercent.toFixed(2)}%)`);
    }
  } else {
    console.log(`No expected image found at ${expectedPath}`);
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
  console.error('Error:', err);
  process.exit(1);
});
