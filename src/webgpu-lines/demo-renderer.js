/**
 * Demo Renderer - Offscreen WebGPU renderer for generating static example images
 *
 * This module provides a single shared WebGPU context for rendering documentation
 * examples. Each demo is rendered to an offscreen canvas and the result is copied
 * to a 2D canvas for display.
 */

import { createGPULines } from './webgpu-lines.js';

/**
 * Create a demo renderer instance
 *
 * @param {GPUDevice} device - WebGPU device
 * @param {GPUCanvasContext} context - WebGPU canvas context (offscreen)
 * @param {HTMLCanvasElement} canvas - The offscreen canvas
 * @param {string} format - Canvas texture format
 * @returns {Object} Demo renderer with render method
 */
export function createDemoRenderer(device, context, canvas, format) {
  // Cache for pipelines with different configurations
  const pipelineCache = new Map();

  // Render queue to prevent race conditions when multiple cells render concurrently
  let renderQueue = Promise.resolve();

  /**
   * Get or create a pipeline for the given configuration
   */
  function getPipeline(config) {
    const key = JSON.stringify(config);
    if (pipelineCache.has(key)) {
      return pipelineCache.get(key);
    }

    const {
      join = 'miter',
      joinResolution = 8,
      miterLimit = 4,
      cap = 'round',
      capResolution = 8,
      sdfStrokeWidth = 0,
      lineWidth = 20,
      fragmentShaderBody: customShader = null,
      blend: customBlend = null
    } = config;

    const useSdfMode = sdfStrokeWidth > 0;

    // Vertex shader body with position buffer and view matrix
    const vertexShaderBody = /* wgsl */`
      @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
      @group(1) @binding(1) var<uniform> viewMatrix: mat4x4f;

      struct Vertex {
        position: vec4f,
        width: f32,
      }

      fn getVertex(index: u32) -> Vertex {
        let p = positions[index];
        let projected = viewMatrix * vec4f(p.xyz, 1.0);
        return Vertex(vec4f(projected.xyz, p.w * projected.w), ${lineWidth.toFixed(1)});
      }
    `;

    const standardFragmentShader = /* wgsl */`
      fn getColor(lineCoord: vec2f) -> vec4f {
        let edge = 1.0 - 0.3 * abs(lineCoord.y);
        return vec4f(0.2 * edge, 0.5 * edge, 0.9 * edge, 1.0);
      }
    `;

    const sdfFragmentShader = /* wgsl */`
      fn linearstep(a: f32, b: f32, x: f32) -> f32 {
        return clamp((x - a) / (b - a), 0.0, 1.0);
      }
      fn getColor(lineCoord: vec2f) -> vec4f {
        let width = ${lineWidth.toFixed(1)};
        let strokeWidth = ${sdfStrokeWidth.toFixed(1)};
        let sdf = 0.5 * width * length(lineCoord.xy);
        let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf);
        let strokeMask = linearstep(width * 0.5 - strokeWidth - 0.5, width * 0.5 - strokeWidth + 0.5, sdf);
        let fillColor = vec3f(0.4, 0.7, 1.0);
        let strokeColor = vec3f(0.1, 0.3, 0.6);
        let color = mix(fillColor, strokeColor, strokeMask);
        return vec4f(color, aa);
      }
    `;

    // Determine fragment shader: custom > SDF > standard
    let fragmentShader;
    if (customShader) {
      fragmentShader = customShader;
    } else if (useSdfMode) {
      fragmentShader = sdfFragmentShader;
    } else {
      fragmentShader = standardFragmentShader;
    }

    // Determine blend state: custom > SDF default > none
    let blend;
    if (customBlend !== null) {
      blend = customBlend;
    } else if (useSdfMode) {
      blend = {
        color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
        alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
      };
    } else {
      blend = null;
    }

    const gpuLines = createGPULines(device, {
      format,
      join,
      joinResolution,
      miterLimit,
      cap,
      capResolution,
      vertexShaderBody,
      fragmentShaderBody: fragmentShader,
      blend
    });

    pipelineCache.set(key, gpuLines);
    return gpuLines;
  }

  /**
   * Generate position data for various demo patterns
   */
  function generateDemoPoints(pattern, options = {}) {
    const { lineBreak = false } = options;
    let points = [];

    switch (pattern) {
      case 'zigzag':
        // Classic zigzag - good for showing joins
        for (let i = 0; i < 6; i++) {
          const t = i / 5;
          const x = -0.6 + t * 1.2;
          const y = (i % 2 === 0 ? 0.2 : -0.2);
          points.push({ x, y, z: 0, w: 1 });
        }
        break;

      case 'spiral':
        for (let i = 0; i < 80; i++) {
          const t = i / 79;
          const angle = t * Math.PI * 6;
          const r = 0.1 + t * 0.6;
          points.push({ x: r * Math.cos(angle), y: r * Math.sin(angle), z: 0, w: 1 });
        }
        break;

      case 'wave':
        for (let i = 0; i < 100; i++) {
          const t = i / 99;
          const x = -0.8 + t * 1.6;
          const y = 0.3 * Math.sin(t * Math.PI * 4) + 0.2 * Math.cos(t * Math.PI * 7);
          points.push({ x, y, z: 0, w: 1 });
        }
        break;

      case 'join-demo':
        // Three segments with varying angles - shows join behavior well
        points = [
          { x: -0.7, y: 0.3, z: 0, w: 1 },
          { x: -0.25, y: -0.3, z: 0, w: 1 },
          { x: 0.25, y: 0.3, z: 0, w: 1 },
          { x: 0.7, y: -0.3, z: 0, w: 1 }
        ];
        break;

      case 'cap-demo':
        // Single horizontal segment - clearly shows end caps
        points = [
          { x: -0.55, y: 0.0, z: 0, w: 1 },
          { x: 0.55, y: 0.0, z: 0, w: 1 }
        ];
        break;

      case 'miter-demo':
        // Very sharp angle to show miter limit behavior
        points = [
          { x: -0.6, y: -0.1, z: 0, w: 1 },
          { x: 0.0, y: 0.35, z: 0, w: 1 },
          { x: 0.6, y: -0.1, z: 0, w: 1 }
        ];
        break;

      case 'resolution-demo':
        // 90-degree angle - shows round resolution clearly
        points = [
          { x: -0.5, y: -0.2, z: 0, w: 1 },
          { x: 0.0, y: -0.2, z: 0, w: 1 },
          { x: 0.0, y: 0.4, z: 0, w: 1 }
        ];
        break;

      case 'break-demo':
        // Zigzag suitable for showing line breaks
        points = [
          { x: -0.65, y: 0.15, z: 0, w: 1 },
          { x: -0.3, y: -0.2, z: 0, w: 1 },
          { x: 0.0, y: 0.15, z: 0, w: 1 },
          { x: 0.3, y: -0.2, z: 0, w: 1 },
          { x: 0.65, y: 0.15, z: 0, w: 1 }
        ];
        break;

      case 'shader-demo':
        // Gentle curves to show shading/SDF effects
        points = [
          { x: -0.6, y: 0.1, z: 0, w: 1 },
          { x: -0.2, y: -0.25, z: 0, w: 1 },
          { x: 0.2, y: 0.25, z: 0, w: 1 },
          { x: 0.6, y: -0.1, z: 0, w: 1 }
        ];
        break;

      default:
        points = generateDemoPoints('zigzag', options);
    }

    // Insert line break in the middle if requested
    if (lineBreak) {
      const midIndex = Math.floor(points.length / 2);
      points.splice(midIndex, 0, { x: 0, y: 0, z: 0, w: 0 });
    }

    return points;
  }

  /**
   * Convert points array to Float32Array for GPU
   */
  function pointsToBuffer(points) {
    const arr = new Float32Array(points.length * 4);
    for (let i = 0; i < points.length; i++) {
      arr[i * 4 + 0] = points[i].x;
      arr[i * 4 + 1] = points[i].y;
      arr[i * 4 + 2] = points[i].z;
      arr[i * 4 + 3] = points[i].w;
    }
    return arr;
  }

  /**
   * Render a demo and return the result as ImageData
   *
   * @param {Object} options - Render options
   * @param {string} options.pattern - Point pattern ('zigzag', 'spiral', 'wave', etc.)
   * @param {number} options.lineWidth - Line width in pixels
   * @param {string} options.join - Join type ('bevel', 'miter', 'round')
   * @param {string} options.cap - Cap type ('round', 'square', 'none')
   * @param {number} options.sdfStrokeWidth - SDF stroke width (0 for standard)
   * @param {boolean} options.lineBreak - Insert line break in middle
   * @param {number} options.width - Output width
   * @param {number} options.height - Output height
   * @param {Array} options.points - Custom points array (overrides pattern)
   * @param {Array} options.viewMatrix - Custom view matrix for zoom/pan
   * @returns {Promise<ImageData>} Rendered image data
   */
  async function render(options = {}) {
    const {
      pattern = 'zigzag',
      lineWidth = 20,
      join = 'miter',
      joinResolution = 8,
      miterLimit = 4,
      cap = 'round',
      capResolution = 8,
      sdfStrokeWidth = 0,
      lineBreak = false,
      width = 320,
      height = 200,
      points: customPoints = null,
      viewMatrix = null,
      clearColor = { r: 0.95, g: 0.95, b: 0.95, a: 1 },
      fragmentShaderBody = null,
      blend = null
    } = options;

    // Resize canvas if needed (use devicePixelRatio for crisp rendering)
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    // Get or create pipeline
    const gpuLines = getPipeline({
      join,
      joinResolution,
      miterLimit,
      cap,
      capResolution,
      sdfStrokeWidth,
      lineWidth,
      fragmentShaderBody,
      blend
    });

    // Generate or use custom points
    const points = customPoints || generateDemoPoints(pattern, { lineBreak });
    const positionData = pointsToBuffer(points);

    // Create position buffer
    const positionBuffer = device.createBuffer({
      label: 'demo-positions',
      size: positionData.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });
    device.queue.writeBuffer(positionBuffer, 0, positionData);

    // Create view matrix uniform buffer
    const viewMatrixData = viewMatrix || new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    const viewMatrixBuffer = device.createBuffer({
      label: 'demo-view-matrix',
      size: 64, // mat4x4f = 16 floats * 4 bytes
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    device.queue.writeBuffer(viewMatrixBuffer, 0, viewMatrixData);

    // Create bind group for user data (group 1)
    const dataBindGroup = device.createBindGroup({
      layout: gpuLines.getBindGroupLayout(1),
      entries: [
        { binding: 0, resource: { buffer: positionBuffer } },
        { binding: 1, resource: { buffer: viewMatrixBuffer } }
      ]
    });

    // Render
    const encoder = device.createCommandEncoder();

    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        storeOp: 'store',
        clearValue: clearColor
      }]
    });

    gpuLines.draw(pass, {
      vertexCount: points.length,
      width: lineWidth,
      resolution: [canvas.width, canvas.height]
    }, [dataBindGroup]);

    pass.end();

    device.queue.submit([encoder.finish()]);

    // Clean up buffers
    positionBuffer.destroy();
    viewMatrixBuffer.destroy();

    // Wait for GPU to finish
    await device.queue.onSubmittedWorkDone();

    // Read back pixels
    // Note: This requires the canvas to be configured with
    // a format that supports reading (we'll use a readback buffer)
    return { width: width * dpr, height: height * dpr };
  }

  /**
   * Render a demo directly to a target 2D canvas
   * Uses a queue to prevent race conditions when multiple cells render concurrently
   *
   * @param {HTMLCanvasElement} targetCanvas - 2D canvas to render to
   * @param {Object} options - Render options (same as render())
   */
  async function renderToCanvas(targetCanvas, options = {}) {
    // Queue this render to prevent race conditions
    const renderPromise = renderQueue.then(async () => {
      const dpr = window.devicePixelRatio || 1;

      // Get CSS dimensions from the canvas
      const cssWidth = options.width || parseInt(targetCanvas.style.width) || targetCanvas.width;
      const cssHeight = options.height || parseInt(targetCanvas.style.height) || targetCanvas.height;

      // Set canvas buffer size to dpr resolution
      targetCanvas.width = Math.floor(cssWidth * dpr);
      targetCanvas.height = Math.floor(cssHeight * dpr);

      // Set CSS size for proper display
      targetCanvas.style.width = `${cssWidth}px`;
      targetCanvas.style.height = `${cssHeight}px`;

      // Render to offscreen WebGPU canvas at dpr resolution
      await render({ ...options, width: cssWidth, height: cssHeight });

      // Copy to target canvas using drawImage
      const ctx = targetCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, targetCanvas.width, targetCanvas.height);
    });

    // Update queue to include this render
    renderQueue = renderPromise.catch(() => {});

    // Wait for this specific render to complete
    return renderPromise;
  }

  /**
   * Destroy cached pipelines
   */
  function destroy() {
    for (const pipeline of pipelineCache.values()) {
      pipeline.destroy();
    }
    pipelineCache.clear();
  }

  return {
    render,
    renderToCanvas,
    generateDemoPoints,
    destroy
  };
}

/**
 * Initialize the demo renderer with a new WebGPU context
 *
 * @returns {Promise<Object>} Demo renderer instance
 */
export async function initDemoRenderer() {
  if (!navigator.gpu) {
    throw new Error('WebGPU not supported');
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error('Failed to get WebGPU adapter');
  }

  const device = await adapter.requestDevice();
  const format = navigator.gpu.getPreferredCanvasFormat();

  // Create offscreen canvas
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;

  const context = canvas.getContext('webgpu');
  context.configure({
    device,
    format,
    alphaMode: 'premultiplied'
  });

  const renderer = createDemoRenderer(device, context, canvas, format);

  return {
    ...renderer,
    device,
    canvas,
    destroy() {
      renderer.destroy();
      device.destroy();
    }
  };
}
