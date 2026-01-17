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
  generateLineBreaksW0,
  generateLineBreaksNaN,
  generateDegenerate,
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
    case 'line-breaks-w0': return generateLineBreaksW0();
    case 'line-breaks-nan': return generateLineBreaksNaN();
    case 'degenerate': return generateDegenerate();
    default: throw new Error(`Unknown pattern: ${pattern}`);
  }
}

// Default fragment shader for tests without custom shader
const defaultFragmentShader = /* wgsl */`
  fn getColor(lineCoord: vec2f) -> vec4f {
    // Distinct colors: yellow center -> red edges
    // lineCoord.y: -1 to 1 across the line (0 at center)
    let t = abs(lineCoord.y);  // 0 at center, 1 at edges

    // Yellow (1,1,0) at center -> Red (1,0,0) at edges
    let r = 1.0;
    let g = 1.0 - t;
    let b = 0.0;

    return vec4f(r, g, b, 1.0);
  }
`;

// Vertex shader body that provides position buffer access
function createVertexShaderBody(lineWidth) {
  return /* wgsl */`
    @group(1) @binding(0) var<storage, read> positions: array<vec4f>;

    struct Vertex {
      position: vec4f,
      width: f32,
    }

    fn getVertex(index: u32) -> Vertex {
      let p = positions[index];
      return Vertex(p, ${lineWidth.toFixed(1)});
    }
  `;
}

async function run() {
  ensureDirectories();

  const { device, format } = await initWebGPU();
  const { name, options, pattern, width, canvasSize, fragmentShader, blend } = testCase;
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

  // Create GPU lines renderer with custom shader and blend mode if specified
  const gpuLines = createGPULines(device, {
    format,
    ...options,
    vertexShaderBody: createVertexShaderBody(width),
    fragmentShaderBody: fragmentShader || defaultFragmentShader,
    blend: blend || null
  });

  // Create position buffer
  const positions = getPatternPositions(pattern);
  const positionBuffer = device.createBuffer({
    size: positions.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(positionBuffer, 0, positions);

  // Create bind group for position data
  const dataBindGroup = device.createBindGroup({
    layout: gpuLines.getBindGroupLayout(1),
    entries: [
      { binding: 0, resource: { buffer: positionBuffer } }
    ]
  });

  // Render
  const encoder = device.createCommandEncoder();

  const pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: texture.createView(),
      loadOp: 'clear',
      storeOp: 'store',
      clearValue: { r: 0.95, g: 0.95, b: 0.95, a: 1 }
    }]
  });

  gpuLines.draw(pass, {
    vertexCount: positions.length / 4,
    width,
    resolution: [canvasWidth, canvasHeight]
  }, [dataBindGroup]);
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

    // Always save actual image for inspection
    savePNG(getActualPath(name), pixels, canvasWidth, canvasHeight);

    const expected = loadPNG(expectedPath);
    const result = compareImages(pixels, expected.pixels, canvasWidth, canvasHeight, 0.1);

    // Always save diff image for inspection
    savePNG(getDiffPath(name), result.diffImage, canvasWidth, canvasHeight);

    if (result.match) {
      console.log(JSON.stringify({ status: 'pass', name, actualPath: getActualPath(name), diffPath: getDiffPath(name) }));
    } else {
      console.log(JSON.stringify({
        status: 'fail',
        name,
        diffPixels: result.diffPixels,
        diffPercent: result.diffPercent,
        actualPath: getActualPath(name),
        diffPath: getDiffPath(name)
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
