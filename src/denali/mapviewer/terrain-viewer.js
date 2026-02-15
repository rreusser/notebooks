import { createCameraController } from './camera-controller.js';
import { createTerrainMesh } from './mesh.js';
import { terrainVertexShader, terrainFragmentShader } from './shaders/terrain.js';
import { skyVertexShader, skyFragmentShader } from './shaders/sky.js';
import { computeTileMVP, computeTileModel, getElevationScale, getCellSizeMeters, tilesetToMercatorBounds, tileUrlFromTemplate, getImageryZoom, lonToMercatorX, latToMercatorY, mercatorXToLon, mercatorYToLat } from './tile-math.js';
import { invertMat4 } from './math.js';
import { selectTiles, screenDensity, extractEyePosition } from './quadtree.js';
import { TileManager } from './tile-manager.js';
import { ImageryManager } from './imagery-manager.js';
import { ImageryCompositor } from './imagery-compositor.js';
import { GeoJSONSource } from './geojson-source.js';
import { CircleLayer } from './circle-layer.js';
import { TextLayer } from './text-layer.js';
import { LineLayer, parseColor } from './line-layer.js';
import { loadFontAtlas } from './lib/webgpu-text/webgpu-text.ts';
import BVH from './bvh.js';
import { screenToRay, raycastTerrain } from './ray-terrain.js';
import { createSettings, createAttribution, estimateTreeline } from './settings.js';
import { cameraStateToHash, hashToCameraState } from './hash-state.js';
import { FrustumOverlay } from './frustum-overlay.js';
import { CollisionManager } from './collision-manager.js';

// Collect subdivision midpoints for a single segment. Only inserts midpoints
// where terrain elevation data is available and positive, so segments over
// unloaded tiles or at zero elevation are left unsubdivided.
function collectSubdivisions(a, b, result, queryElev, tolerance, maxDepth, depth) {
  if (depth >= maxDepth) return;
  const midMx = (a.mercatorX + b.mercatorX) / 2;
  const midMy = (a.mercatorY + b.mercatorY) / 2;
  const elevA = queryElev(a.mercatorX, a.mercatorY);
  const elevB = queryElev(b.mercatorX, b.mercatorY);
  const elevMid = queryElev(midMx, midMy);
  if (elevA == null || elevB == null || elevMid == null) return;
  if (elevA <= 0 || elevB <= 0 || elevMid <= 0) return;
  const linearElev = (elevA + elevB) / 2;
  if (Math.abs(elevMid - linearElev) > tolerance) {
    const mid = { mercatorX: midMx, mercatorY: midMy };
    collectSubdivisions(a, mid, result, queryElev, tolerance, maxDepth, depth + 1);
    result.push(mid);
    collectSubdivisions(mid, b, result, queryElev, tolerance, maxDepth, depth + 1);
  }
}

export class TerrainMap {
  /**
   * Create a TerrainMap instance. Use the async factory `TerrainMap.create()`.
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Object} options
   * @param {Object} options.sources - Named source definitions
   * @param {Array}  [options.base] - Base layer configs (raster composited onto terrain)
   * @param {Array}  [options.features] - Feature layer configs (drawn after terrain)
   * @param {Object} [options.camera] - Camera controller options
   * @param {Object} [options.location] - { lat, lon } for sun position (defaults to terrain bounds center)
   * @param {Object} [options.settings] - Initial settings values
   * @param {number} [options.pixelRatio] - Device pixel ratio override
   */
  static async create(canvas, options = {}) {
    const map = new TerrainMap();
    await map._init(canvas, options);
    return map;
  }

  async _init(canvas, options) {
    const { sources = {}, base: baseLayers = [], features: featureLayers = [], camera: cameraOptions = {}, settings: initialSettings, createGPULines } = options;

    // Find the terrain source (exactly one required)
    let terrain = null;
    const rasterSources = {};
    const geojsonSources = {};
    const allSources = [];
    for (const [id, src] of Object.entries(sources)) {
      allSources.push(src);
      if (src.type === 'terrain') {
        if (terrain) throw new Error('Only one terrain source is allowed');
        terrain = src;
      } else if (src.type === 'raster') {
        rasterSources[id] = src;
      } else if (src.type === 'geojson') {
        geojsonSources[id] = src;
      }
    }
    if (!terrain) throw new Error('A terrain source is required');

    this._pixelRatio = options.pixelRatio || (typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1);
    this._baseLayerConfigs = baseLayers;
    this._featureLayerConfigs = featureLayers;
    this._geojsonSources = geojsonSources;
    this._rasterSources = rasterSources;

    this.canvas = canvas;
    this._terrainBounds = tilesetToMercatorBounds(terrain);

    const [minLon, minLat, maxLon, maxLat] = terrain.bounds;
    this._location = options.location || {
      lat: (minLat + maxLat) / 2,
      lon: (minLon + maxLon) / 2,
    };

    this.attribution = createAttribution(allSources.filter(s => s.attribution));

    const treelineFt = Math.round(estimateTreeline(this._location.lat) * 3.28084);
    this.settings = createSettings({
      treelineLower: Math.max(0, treelineFt - 500),
      treelineUpper: treelineFt + 500,
      ...initialSettings,
    });

    // WebGPU initialization
    const adapter = await navigator.gpu.requestAdapter();
    this._device = await adapter.requestDevice();
    this._format = navigator.gpu.getPreferredCanvasFormat();
    this._createGPULines = createGPULines;
    this._gpuCtx = canvas.getContext('webgpu');
    this._gpuCtx.configure({ device: this._device, format: this._format, alphaMode: 'opaque' });

    const hashCamera = hashToCameraState(window.location.hash);
    this.camera = createCameraController(canvas, {
      center: [0.0804792012701582, 0.0002040588543435183, 0.27264551318459634],
      distance: 0.0008177139017526437,
      phi: 2.1624270549994598,
      theta: 0.16047571910010502,
      fov: Math.PI / 4,
      near: 0.00001,
      far: 0.5,
      rotateSpeed: 0.005,
      zoomSpeed: 0.0008,
      panSpeed: 1,
      ...cameraOptions,
      ...hashCamera,
    });
    this._hashUpdateTimer = null;

    const device = this._device;
    const format = this._format;

    this._mesh = createTerrainMesh(device);

    this._imagerySampler = device.createSampler({
      magFilter: 'linear', minFilter: 'linear', mipmapFilter: 'nearest',
      addressModeU: 'clamp-to-edge', addressModeV: 'clamp-to-edge',
    });

    const uniformBGL = device.createBindGroupLayout({
      entries: [{ binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform', hasDynamicOffset: true } }],
    });

    const textureBGL = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, texture: { sampleType: 'unfilterable-float' } },
      ],
    });

    const globalUniformBGL = device.createBindGroupLayout({
      entries: [{ binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }],
    });

    const imageryBGL = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
        { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
      ],
    });

    this._globalUniformBuffer = device.createBuffer({ size: 96, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    this._globalUniformBindGroup = device.createBindGroup({
      layout: globalUniformBGL,
      entries: [{ binding: 0, resource: { buffer: this._globalUniformBuffer } }],
    });

    // Fallback 1x1 imagery texture
    this._fallbackImageryTexture = device.createTexture({
      size: [1, 1], format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture: this._fallbackImageryTexture }, new Uint8Array([0, 0, 0, 255]), { bytesPerRow: 4 }, [1, 1]);
    this._fallbackImageryBindGroup = device.createBindGroup({
      layout: imageryBGL,
      entries: [
        { binding: 0, resource: this._fallbackImageryTexture.createView() },
        { binding: 1, resource: this._imagerySampler },
      ],
    });

    // White 1x1 fallback for when imagery is toggled off
    this._whiteImageryTexture = device.createTexture({
      size: [1, 1], format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture: this._whiteImageryTexture }, new Uint8Array([255, 255, 255, 255]), { bytesPerRow: 4 }, [1, 1]);
    this._whiteImageryBindGroup = device.createBindGroup({
      layout: imageryBGL,
      entries: [
        { binding: 0, resource: this._whiteImageryTexture.createView() },
        { binding: 1, resource: this._imagerySampler },
      ],
    });

    this._pipeline = device.createRenderPipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [uniformBGL, textureBGL, globalUniformBGL, imageryBGL] }),
      vertex: {
        module: device.createShaderModule({ code: terrainVertexShader }), entryPoint: 'vs_main',
        buffers: [{ arrayStride: 4, attributes: [{ format: 'uint16x2', offset: 0, shaderLocation: 0 }] }],
      },
      fragment: {
        module: device.createShaderModule({ code: terrainFragmentShader }), entryPoint: 'fs_main',
        targets: [{ format }],
      },
      primitive: { topology: 'triangle-list', cullMode: 'back', frontFace: 'ccw' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
    });

    this._skyPipeline = device.createRenderPipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [globalUniformBGL] }),
      vertex: { module: device.createShaderModule({ code: skyVertexShader }), entryPoint: 'vs_sky', buffers: [] },
      fragment: { module: device.createShaderModule({ code: skyFragmentShader }), entryPoint: 'fs_sky', targets: [{ format }] },
      primitive: { topology: 'triangle-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: false, depthCompare: 'always' },
    });

    this._frustumOverlay = new FrustumOverlay(device, format, this._pixelRatio, createGPULines);
    this._collisionManager = new CollisionManager(device, format);
    this._collisionManager.onWake = () => { this._renderDirty = true; };

    this._UNIFORM_STRIDE = 256;
    this._MAX_TILES_PER_FRAME = 256;
    this._uniformBuffer = device.createBuffer({
      size: this._UNIFORM_STRIDE * this._MAX_TILES_PER_FRAME,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this._uniformBindGroup = device.createBindGroup({
      layout: uniformBGL,
      entries: [{ binding: 0, resource: { buffer: this._uniformBuffer, size: 208 } }],
    });

    this._tileManager = new TileManager(device, { tileUrl: tileUrlFromTemplate(terrain.tiles) });
    this._tileManager.setBindGroupLayout(textureBGL);
    this._tileManager.setBounds(this._terrainBounds);

    // Build base layers: each references a raster source
    this._imageryDeltaZoom = 1;
    const layerDescriptors = [];
    for (const layer of baseLayers) {
      const src = rasterSources[layer.source];
      if (!src) throw new Error(`Base layer "${layer.id}" references unknown source "${layer.source}"`);
      const bounds = tilesetToMercatorBounds(src);
      const mgr = new ImageryManager({ tileUrl: tileUrlFromTemplate(src.tiles) });
      mgr.setBounds(bounds);
      layerDescriptors.push({
        imageryManager: mgr,
        blend: layer.blend || 'source-over',
        opacity: layer.opacity != null ? layer.opacity : 1,
        minzoom: src.minzoom,
        maxzoom: src.maxzoom,
      });
    }
    this._minImageryZoom = layerDescriptors.length > 0 ? Math.min(...layerDescriptors.map(l => l.minzoom)) : Infinity;
    this._maxImageryZoom = layerDescriptors.length > 0 ? Math.max(...layerDescriptors.map(l => l.maxzoom)) : 0;
    this._compositor = new ImageryCompositor(device, layerDescriptors, imageryBGL, this._imagerySampler);

    this._coverageDirty = true;
    this._renderDirty = true;
    this._cachedRenderList = [];
    this._tileManager.onTileResolved = () => {
      this._coverageDirty = true;
      this._renderDirty = true;
      this._refinementDirty = true;
      this._collisionManager.markStale();
      for (const entry of this._lineLayers) entry.layer.invalidateElevations();
    };
    this._compositor.onUpdate = () => { this._coverageDirty = true; this._renderDirty = true; };

    this._depthTexture = null;
    this._MAX_ELEV_Y = 0.001;
    this._mvpFloat32 = new Float32Array(16);
    this._modelFloat32 = new Float32Array(16);
    this._uniformData = new Float32Array(52);
    this._globalUniformData = new Float32Array(24);

    this._currentExaggeration = this.settings.verticalExaggeration;
    this._currentDensityThreshold = this.settings.densityThreshold;
    this._currentFreezeCoverage = false;
    this._refinementDirty = false;
    this._lastRefinementTime = 0;

    // Raycast infrastructure
    this._bvh = null;
    this._bvhTileList = [];
    this._lastProjView = new Float64Array(16);
    this._invProjView = new Float64Array(16);

    this.camera.rotateStartCallback = (clientX, clientY) => this._hitTest(clientX, clientY);

    // Watch for container resizes so the canvas always tracks its layout size
    this._needsCanvasResize = true;
    this._resizeObserver = new ResizeObserver(() => {
      this._needsCanvasResize = true;
      this._renderDirty = true;
      this._coverageDirty = true;
      this.camera.taint();
    });
    this._resizeObserver.observe(canvas);

    // Load GeoJSON sources and create feature layers
    this._circleLayers = [];
    this._textLayers = [];
    this._lineLayers = [];
    const geojsonLoads = [];
    const loadedSources = {};

    for (const layerConfig of featureLayers) {
      const srcConfig = geojsonSources[layerConfig.source];
      if (!srcConfig) throw new Error(`Feature layer "${layerConfig.id}" references unknown source "${layerConfig.source}"`);

      if (!loadedSources[layerConfig.source]) {
        const src = new GeoJSONSource();
        loadedSources[layerConfig.source] = src;
        geojsonLoads.push(src.load(srcConfig.data, { ...srcConfig, simplifyFn: options.simplifyFn }));
      }

      const collision = layerConfig.collision !== false; // default true
      if (layerConfig.type === 'circle') {
        const circleLayer = new CircleLayer(
          layerConfig,
          loadedSources[layerConfig.source],
          (mx, my) => this.queryElevationMercator(mx, my),
        );
        circleLayer.init(device, globalUniformBGL, format);
        circleLayer._collision = collision;
        circleLayer._sourceId = layerConfig.source;
        this._circleLayers.push({ id: layerConfig.id, layer: circleLayer, config: layerConfig, visible: true, userCreated: false });
      } else if (layerConfig.type === 'text') {
        const textLayer = new TextLayer(
          layerConfig,
          loadedSources[layerConfig.source],
          (mx, my) => this.queryElevationMercator(mx, my),
        );
        textLayer._collision = collision;
        textLayer._sourceId = layerConfig.source;
        this._textLayers.push({ id: layerConfig.id, layer: textLayer, config: layerConfig, visible: true, userCreated: false });
      } else if (layerConfig.type === 'line') {
        const lineLayer = new LineLayer(
          layerConfig,
          loadedSources[layerConfig.source],
          (mx, my) => this.queryElevationMercator(mx, my),
        );
        lineLayer.init(device, format, this._globalUniformBuffer, createGPULines);
        this._lineLayers.push({ id: layerConfig.id, layer: lineLayer, config: layerConfig, visible: true, userCreated: false, _sourceRef: loadedSources[layerConfig.source] });
      }
    }
    await Promise.all(geojsonLoads);

    // Initialize text layers (load font atlas internally, GeoJSON must be loaded first)
    if (options.font && this._textLayers.length > 0) {
      const fontAtlas = await loadFontAtlas(device, {
        atlasUrl: options.font.atlas,
        metadataUrl: options.font.metadata,
      });
      for (const entry of this._textLayers) {
        entry.layer.init(device, fontAtlas, format, 'depth24plus', this._globalUniformBuffer);
      }
    }

    this._running = true;
    this._boundFrame = this._frame.bind(this);
    requestAnimationFrame(this._boundFrame);
  }

  _hitTest(clientX, clientY) {
    const hit = this.raycast(clientX, clientY);
    if (hit) return hit.worldPos;

    const rect = this.canvas.getBoundingClientRect();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;
    invertMat4(this._invProjView, this._lastProjView);
    const { origin, direction } = screenToRay(ndcX, ndcY, this._invProjView);
    if (Math.abs(direction[1]) > 1e-10) {
      const t = -origin[1] / direction[1];
      if (t > 0) return [origin[0] + t * direction[0], 0, origin[2] + t * direction[2]];
    }
    return null;
  }

  _ensureDepthTexture(w, h) {
    if (this._depthTexture && this._depthTexture.width === w && this._depthTexture.height === h) return;
    if (this._depthTexture) this._depthTexture.destroy();
    this._depthTexture = this._device.createTexture({
      size: [w, h], format: 'depth24plus', usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  _buildCollisionLayers() {
    const layers = [];
    for (const entry of this._circleLayers) {
      if (!entry.visible) continue;
      layers.push({ layer: entry.layer, collision: entry.layer._collision, sourceId: entry.layer._sourceId });
    }
    for (const entry of this._textLayers) {
      if (!entry.visible) continue;
      layers.push({ layer: entry.layer, collision: entry.layer._collision, sourceId: entry.layer._sourceId });
    }
    return layers;
  }

  paint() {
    const { canvas, camera, settings } = this;
    const aspect = canvas.width / canvas.height;
    if (aspect === 0 || !isFinite(aspect)) return;
    const { view, projection, projectionView } = camera.update(aspect);

    const device = this._device;
    let tileIndex = 0;
    const draws = [];

    const globalElevScale = this._globalElevScale;

    for (const tile of this._cachedRenderList) {
      if (tileIndex >= this._MAX_TILES_PER_FRAME) break;
      const entry = this._tileManager.getTile(tile.z, tile.x, tile.y);
      if (!entry) continue;

      const cellSize = getCellSizeMeters(tile.z, tile.y);
      const imageryZoom = getImageryZoom(tile.z, this._imageryDeltaZoom, this._maxImageryZoom);
      this._compositor.ensureImagery(tile.z, tile.x, tile.y, imageryZoom);
      const hasImagery = this._compositor.hasImagery(tile.z, tile.x, tile.y);

      computeTileMVP(this._mvpFloat32, view, projection, tile.z, tile.x, tile.y, globalElevScale, this._currentExaggeration);
      computeTileModel(this._modelFloat32, tile.z, tile.x, tile.y, globalElevScale, this._currentExaggeration);

      const ud = this._uniformData;
      ud.set(this._mvpFloat32, 0);
      ud.set(this._modelFloat32, 16);
      ud[32] = globalElevScale;
      ud[33] = cellSize;
      ud[34] = this._currentExaggeration;
      ud[35] = 1 / 514;
      ud[36] = settings.showTileBorders ? 1.0 : 0.0;
      ud[37] = settings.showImagery ? (hasImagery ? 1.0 : 0.0) : 1.0;
      ud[38] = settings.hillshadeOpacity;
      ud[39] = settings.slopeAngleOpacity;
      ud[40] = settings.contourOpacity;
      ud[41] = canvas.height;
      ud[42] = settings.showWireframe ? 1.0 : 0.0;
      ud[43] = settings.slopeAspectMaskAbove;
      ud[44] = settings.slopeAspectMaskNear;
      ud[45] = settings.slopeAspectMaskBelow;
      ud[46] = settings.slopeAspectOpacity;
      ud[47] = settings.treelineLower * 0.3048;
      ud[48] = settings.treelineUpper * 0.3048;

      let imageryBindGroup;
      if (!settings.showImagery) {
        imageryBindGroup = this._whiteImageryBindGroup;
      } else if (hasImagery) {
        imageryBindGroup = this._compositor.getBindGroup(tile.z, tile.x, tile.y);
      } else {
        imageryBindGroup = this._fallbackImageryBindGroup;
      }

      device.queue.writeBuffer(this._uniformBuffer, tileIndex * this._UNIFORM_STRIDE, ud.buffer, ud.byteOffset, 208);
      draws.push({
        offset: tileIndex * this._UNIFORM_STRIDE,
        bindGroup: entry.bindGroup,
        imageryBindGroup,
      });
      tileIndex++;
    }

    // Camera world position
    const { phi, theta, distance, center } = camera.state;
    const camX = center[0] + distance * Math.cos(theta) * Math.cos(phi);
    const camY = center[1] + distance * Math.sin(theta);
    const camZ = center[2] + distance * Math.cos(theta) * Math.sin(phi);

    const metersPerUnit = 1.0 / globalElevScale;
    const camHeightMeters = camY / globalElevScale;

    // Sun direction (computed externally via settings.sunDirection)
    const sd = settings.sunDirection;
    const sunDirX = sd[0];
    const sunDirY = sd[1];
    const sunDirZ = sd[2];

    const atmDensity = settings.atmosphereDensity;
    const gu = this._globalUniformData;
    gu[0] = camX; gu[1] = camY; gu[2] = camZ; gu[3] = camHeightMeters;
    gu[4] = sunDirX; gu[5] = sunDirY; gu[6] = sunDirZ; gu[7] = metersPerUnit;
    gu[8]  = 5.2e-6 * atmDensity;  gu[9]  = 12.1e-6 * atmDensity; gu[10] = 29.6e-6 * atmDensity; gu[11] = 8000.0;
    gu[12] = 2.0e-5 * atmDensity;  gu[13] = 3000.0; gu[14] = 0.76; gu[15] = 20.0;

    const fov = camera.state.fov;
    const rightX = Math.sin(phi);
    const rightZ = -Math.cos(phi);
    const upX = -Math.sin(theta) * Math.cos(phi);
    const upY = Math.cos(theta);
    const upZ = -Math.sin(theta) * Math.sin(phi);
    gu[16] = rightX; gu[17] = 0; gu[18] = rightZ; gu[19] = aspect;
    gu[20] = upX; gu[21] = upY; gu[22] = upZ; gu[23] = Math.tan(fov / 2);

    device.queue.writeBuffer(this._globalUniformBuffer, 0, gu.buffer, gu.byteOffset, 96);

    this._ensureDepthTexture(canvas.width, canvas.height);

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view: this._gpuCtx.getCurrentTexture().createView(),
        clearValue: { r: 0.53, g: 0.66, b: 0.82, a: 1.0 },
        loadOp: 'clear', storeOp: 'store',
      }],
      depthStencilAttachment: {
        view: this._depthTexture.createView(),
        depthClearValue: 1.0, depthLoadOp: 'clear', depthStoreOp: 'store',
      },
    });

    // Sky
    pass.setPipeline(this._skyPipeline);
    pass.setBindGroup(0, this._globalUniformBindGroup);
    pass.draw(3);

    // Terrain
    pass.setPipeline(this._pipeline);
    pass.setVertexBuffer(0, this._mesh.vertexBuffer);
    pass.setIndexBuffer(this._mesh.indexBuffer, 'uint32');
    pass.setBindGroup(2, this._globalUniformBindGroup);
    for (const draw of draws) {
      pass.setBindGroup(0, this._uniformBindGroup, [draw.offset]);
      pass.setBindGroup(1, draw.bindGroup);
      pass.setBindGroup(3, draw.imageryBindGroup);
      pass.drawIndexed(this._mesh.indexCount);
    }

    // Frozen coverage frustum lines
    this._frustumOverlay.draw(pass, projectionView, canvas.width, canvas.height);

    // Line feature layers (drawn after terrain, before circles/text)
    for (const entry of this._lineLayers) {
      if (entry.visible) entry.layer.draw(pass);
    }

    // Circle feature layers
    for (const entry of this._circleLayers) {
      if (entry.visible) entry.layer.draw(pass, this._globalUniformBindGroup, false);
    }

    // Text feature layers (drawn after circles)
    for (const entry of this._textLayers) {
      if (entry.visible) entry.layer.draw(pass);
    }

    // Collision debug bounding boxes
    if (settings.showCollisionBoxes) {
      this._collisionManager.drawDebug(pass, canvas.width, canvas.height, this._pixelRatio, settings.collisionBuffer);
    }

    pass.end();
    device.queue.submit([encoder.finish()]);
  }

  _frame() {
    if (!this._running) return;
    requestAnimationFrame(this._boundFrame);

    const { canvas, camera, settings } = this;

    if (this._currentExaggeration !== settings.verticalExaggeration) {
      this._currentExaggeration = settings.verticalExaggeration;
      camera.taint();
    }

    if (this._currentDensityThreshold !== settings.densityThreshold) {
      this._currentDensityThreshold = settings.densityThreshold;
      this._coverageDirty = true;
    }

    if (settings.freezeCoverage !== this._currentFreezeCoverage) {
      this._currentFreezeCoverage = settings.freezeCoverage;
      if (this._currentFreezeCoverage) {
        this._savedFar = camera.state.far;
        camera.state.far = camera.state.far * 4;
      } else {
        this._frustumOverlay.unfreeze();
        camera.state.far = this._savedFar;
        this._coverageDirty = true;
      }
      camera.taint();
      this._renderDirty = true;
    }

    if (settings.dirty) {
      this._renderDirty = true;
      settings.dirty = false;
    }

    // Debounced path refinement (at most once per second)
    if (this._refinementDirty) {
      const now = performance.now();
      if (now - this._lastRefinementTime > 1000) {
        this._refineLineLayers();
        this._lastRefinementTime = now;
        this._refinementDirty = false;
        this._renderDirty = true;
        if (this.onElevationRefine) this.onElevationRefine();
      }
    }

    if (!this._coverageDirty && !this._renderDirty && !camera.dirty) return;

    // Apply pending canvas resize (detected by ResizeObserver, no per-frame reflow)
    if (this._needsCanvasResize) {
      const dpr = this._pixelRatio;
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      this._needsCanvasResize = false;
    }

    const aspect = canvas.width / canvas.height;
    const { view, projection, projectionView, dirty: cameraMoved } = camera.update(aspect);
    this._lastProjView.set(projectionView);

    // Use a single global elevation scale for all tiles and feature layers so
    // that everything scales consistently. Derived from the camera *eye*
    // position rather than the orbit center because zoom-about-cursor can jump
    // the orbit center far away while the eye stays nearly fixed, giving much
    // more stable LOD and elevation scaling.
    const { center, distance, theta, phi } = camera.state;
    const eyeMercatorZ = center[2] + distance * Math.cos(theta) * Math.sin(phi);
    const eyeLat = 2 * Math.atan(Math.exp(Math.PI * (1 - 2 * eyeMercatorZ))) - Math.PI / 2;
    this._globalElevScale = 1 / (40_075_016.686 * Math.cos(eyeLat));

    if (this._currentFreezeCoverage && !this._frustumOverlay.isFrozen) {
      this._frustumOverlay.freeze(projectionView);
    }

    const tileProjView = this._frustumOverlay.coverageProjView || projectionView;

    if (cameraMoved) {
      this._coverageDirty = true;
      this._renderDirty = true;
      clearTimeout(this._hashUpdateTimer);
      this._hashUpdateTimer = setTimeout(() => {
        history.replaceState(null, '', cameraStateToHash(camera.state));
      }, 300);
    }

    if (this._coverageDirty) {
      const maxElevY = this._MAX_ELEV_Y * this._currentExaggeration;
      this._tileManager.beginFrame();
      const hasImageryLayers = this._compositor.layers.length > 0;
      const minImageryZoom = this._minImageryZoom;
      this._cachedRenderList = selectTiles(
        tileProjView, canvas.width, canvas.height, maxElevY,
        this._currentExaggeration, settings.densityThreshold,
        this._terrainBounds, this._tileManager,
        hasImageryLayers ? (z, x, y) => {
          const entry = this._tileManager.getTile(z, x, y);
          if (!entry || entry.isFlat) return true; // missing or 404'd — don't block
          if (z < minImageryZoom) return true; // no imagery at this zoom — don't block
          const iz = getImageryZoom(z, this._imageryDeltaZoom, this._maxImageryZoom);
          this._compositor.ensureImagery(z, x, y, iz);
          return this._compositor.hasImagery(z, x, y);
        } : null,
      );
      // Sort front-to-back for early-z rejection of occluded terrain fragments
      const pv = tileProjView;
      this._cachedRenderList.sort((a, b) => {
        const aw = pv[3] * ((a.x + 0.5) / (1 << a.z)) + pv[11] * ((a.y + 0.5) / (1 << a.z)) + pv[15];
        const bw = pv[3] * ((b.x + 0.5) / (1 << b.z)) + pv[11] * ((b.y + 0.5) / (1 << b.z)) + pv[15];
        return aw - bw;
      });
      this._tileManager.cancelStale();
      this._tileManager.evict();
      this._tileManager.stripQuadtrees();
      this._compositor.gc(this._tileManager.wantedKeys);
      this._rebuildBVH();
      this._coverageDirty = false;
      this._renderDirty = true;
    }

    if (!this._renderDirty) return;
    this._renderDirty = false;

    // Collision detection (leading+trailing throttle, before prepare so hidden features are skipped)
    const collisionLayers = this._buildCollisionLayers();
    if (this._collisionManager.update({
      enabled: settings.enableCollision,
      layers: collisionLayers,
      projectionView,
      canvasW: canvas.width,
      canvasH: canvas.height,
      pixelRatio: this._pixelRatio,
      exaggeration: this._currentExaggeration,
      collisionBuffer: settings.collisionBuffer,
      occlusionBias: settings.occlusionBias,
      bvh: this._bvh,
      tileManager: this._tileManager,
      bvhTileList: this._bvhTileList,
      globalElevScale: this._globalElevScale,
    })) {
      this._renderDirty = true;
    }

    // Prepare circle and text layers with current projectionView
    for (const entry of this._circleLayers) {
      if (entry.visible) entry.layer.prepare(projectionView, canvas.width, canvas.height, this._pixelRatio, this._currentExaggeration, this._globalElevScale);
    }
    for (const entry of this._textLayers) {
      if (entry.visible) entry.layer.prepare(projectionView, canvas.width, canvas.height, this._pixelRatio, this._currentExaggeration, this._globalElevScale);
    }

    // Prepare line layers
    for (const entry of this._lineLayers) {
      if (entry.visible) entry.layer.prepare(projectionView, canvas.width, canvas.height, this._pixelRatio, this._currentExaggeration, this._globalElevScale);
    }

    if (this.onElevationRefine) this.onElevationRefine();

    this.paint();
  }

  _rebuildBVH() {
    const tiles = this._cachedRenderList;
    if (tiles.length === 0) {
      this._bvh = null;
      this._bvhTileList = [];
      return;
    }

    const aabbs = new Float64Array(tiles.length * 6);
    const tileList = new Array(tiles.length);

    for (let i = 0; i < tiles.length; i++) {
      const { z, x, y } = tiles[i];
      tileList[i] = tiles[i];

      const s = 1 / (1 << z);
      const elevScale = getElevationScale(z, y);
      const bounds = this._tileManager.getElevationBounds(z, x, y);

      const base = i * 6;
      aabbs[base]     = x * s;                                                         // xmin
      aabbs[base + 1] = bounds ? bounds.minElevation * elevScale * this._currentExaggeration : 0;  // ymin
      aabbs[base + 2] = y * s;                                                         // zmin
      aabbs[base + 3] = (x + 1) * s;                                                   // xmax
      aabbs[base + 4] = bounds ? bounds.maxElevation * elevScale * this._currentExaggeration : this._MAX_ELEV_Y * this._currentExaggeration;  // ymax
      aabbs[base + 5] = (y + 1) * s;                                                   // zmax
    }

    this._bvh = new BVH(aabbs, { maxItemsPerNode: 4 });
    this._bvhTileList = tileList;
  }

  /**
   * Raycast from screen coordinates to terrain.
   *
   * @param {number} clientX - mouse/touch clientX
   * @param {number} clientY - mouse/touch clientY
   * @returns {{ worldPos: [number, number, number], t: number, tile: { z, x, y } } | null}
   */
  raycast(clientX, clientY) {
    if (!this._bvh) return null;

    const rect = this.canvas.getBoundingClientRect();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;

    invertMat4(this._invProjView, this._lastProjView);
    const { origin, direction } = screenToRay(ndcX, ndcY, this._invProjView);

    return raycastTerrain({
      origin,
      direction,
      bvh: this._bvh,
      tileCache: this._tileManager,
      tileList: this._bvhTileList,
      verticalExaggeration: this._currentExaggeration,
    });
  }

  /**
   * Query terrain elevation at a lon/lat coordinate.
   * @returns {number|null} elevation in meters, or null if no tile covers the point
   */
  queryElevation(lon, lat) {
    const mx = lonToMercatorX(lon);
    const my = latToMercatorY(lat);
    return this.queryElevationMercator(mx, my);
  }

  /**
   * Query terrain elevation at a Mercator coordinate.
   * Searches the current render list for the highest-zoom loaded tile covering (mx, my).
   * @returns {number|null} elevation in meters, or null if no tile covers the point
   */
  queryElevationMercator(mx, my) {
    let bestTile = null;
    let bestZ = -1;

    for (const tile of this._cachedRenderList) {
      const s = 1 / (1 << tile.z);
      if (mx >= tile.x * s && mx < (tile.x + 1) * s &&
          my >= tile.y * s && my < (tile.y + 1) * s &&
          tile.z > bestZ) {
        bestTile = tile;
        bestZ = tile.z;
      }
    }

    if (!bestTile) return null;

    const entry = this._tileManager.getTile(bestTile.z, bestTile.x, bestTile.y);
    if (!entry || !entry.elevations) return null;

    const s = 1 / (1 << bestTile.z);
    const u = (mx - bestTile.x * s) / s; // 0..1 within tile
    const v = (my - bestTile.y * s) / s;

    // Map to 514-texel coordinates (skip 1px border)
    const tx = u * 512 + 1;
    const ty = v * 512 + 1;

    const ix = Math.floor(tx);
    const iy = Math.floor(ty);
    const fx = tx - ix;
    const fy = ty - iy;

    const w = 514;
    const ix0 = Math.min(ix, 513);
    const ix1 = Math.min(ix + 1, 513);
    const iy0 = Math.min(iy, 513);
    const iy1 = Math.min(iy + 1, 513);

    const e00 = entry.elevations[iy0 * w + ix0];
    const e10 = entry.elevations[iy0 * w + ix1];
    const e01 = entry.elevations[iy1 * w + ix0];
    const e11 = entry.elevations[iy1 * w + ix1];

    return e00 * (1 - fx) * (1 - fy) + e10 * fx * (1 - fy) +
           e01 * (1 - fx) * fy + e11 * fx * fy;
  }

  debugTileCoverage() {
    const { canvas, camera, settings } = this;
    const aspect = canvas.width / canvas.height;
    const { projectionView } = camera.update(aspect);
    const state = camera.state;
    const maxElevY = this._MAX_ELEV_Y * this._currentExaggeration;

    // Re-run selectTiles with the current projView
    const freshTiles = selectTiles(
      projectionView, canvas.width, canvas.height, maxElevY,
      this._currentExaggeration, settings.densityThreshold,
      this._terrainBounds, this._tileManager, null,
    );

    return {
      camera: {
        center: [...state.center],
        distance: state.distance,
        phi: state.phi,
        theta: state.theta,
        thetaDeg: state.theta * 180 / Math.PI,
        fov: state.fov,
      },
      canvas: { width: canvas.width, height: canvas.height },
      densityThreshold: settings.densityThreshold,
      tiles: freshTiles.map(t => {
        const [ex, ey, ez] = extractEyePosition(projectionView);
        return { z: t.z, x: t.x, y: t.y, density: screenDensity(projectionView, t.z, t.x, t.y, canvas.height, ex, ey, ez) };
      }),
      projectionView: Array.from(projectionView),
    };
  }

  async addLineLayer(id, geojson, paint = {}) {
    const src = new GeoJSONSource();
    await src.load(geojson);
    const config = { id, type: 'line', paint };
    const layer = new LineLayer(config, src, (mx, my) => this.queryElevationMercator(mx, my));
    layer.init(this._device, this._format, this._globalUniformBuffer, this._createGPULines);
    const entry = { id, layer, config, visible: true, userCreated: true, _sourceRef: src, sourceGeoJSON: geojson };
    this._lineLayers.push(entry);
    this._refinementDirty = true;
    this._renderDirty = true;
    return entry;
  }

  removeLayer(id) {
    for (const arr of [this._lineLayers, this._circleLayers, this._textLayers]) {
      const idx = arr.findIndex(e => e.id === id);
      if (idx === -1) continue;
      if (arr[idx].layer.destroy) arr[idx].layer.destroy();
      arr.splice(idx, 1);
      this._renderDirty = true;
      return;
    }
  }

  removeLineLayer(id) {
    this.removeLayer(id);
  }

  setLayerVisibility(id, visible) {
    for (const arr of [this._lineLayers, this._circleLayers, this._textLayers]) {
      const entry = arr.find(e => e.id === id);
      if (entry) {
        entry.visible = visible;
        this._renderDirty = true;
        return;
      }
    }
  }

  setLineLayerColor(id, hex) {
    const entry = this._lineLayers.find(e => e.id === id);
    if (!entry) return;
    entry.layer._lineColor = parseColor(hex);
    this._renderDirty = true;
  }

  setLayerPaint(id, property, value) {
    const color = typeof value === 'string' ? parseColor(value) : null;
    for (const entry of this._lineLayers) {
      if (entry.id !== id) continue;
      const l = entry.layer;
      if (property === 'line-color') l._lineColor = color;
      else if (property === 'line-border-color') l._borderColor = color;
      else if (property === 'line-width') l._lineWidth = value;
      else if (property === 'line-border-width') l._borderWidth = value;
      this._renderDirty = true;
      return;
    }
    for (const entry of this._circleLayers) {
      if (entry.id !== id) continue;
      const l = entry.layer;
      if (property === 'circle-color') l._fillColor = color;
      else if (property === 'circle-stroke-color') l._strokeColor = color;
      else if (property === 'circle-radius') l._radius = value;
      else if (property === 'circle-stroke-width') l._strokeWidth = value;
      this._renderDirty = true;
      return;
    }
    for (const entry of this._textLayers) {
      if (entry.id !== id) continue;
      const l = entry.layer;
      if (property === 'text-color') {
        l._color = color;
        if (l._spans) for (const { span } of l._spans) span.setColor(color);
      } else if (property === 'text-halo-color') {
        l._strokeColor = color;
        if (l._spans) for (const { span } of l._spans) span.setStrokeColor(color);
      } else if (property === 'text-halo-width') {
        l._strokeWidth = value;
        l._lastScaledStrokeWidth = null;
      }
      this._renderDirty = true;
      return;
    }
  }

  _refineLineLayers() {
    const queryElev = (mx, my) => this.queryElevationMercator(mx, my);
    for (const entry of this._lineLayers) {
      if (!entry._sourceRef) continue;
      const originalFeatures = entry._sourceRef.lineFeatures;
      if (!originalFeatures || originalFeatures.length === 0) continue;

      // Initialize per-feature segment midpoint tracking
      if (!entry._segmentMidpoints) {
        entry._segmentMidpoints = originalFeatures.map(f =>
          new Array(Math.max(0, f.coordinates.length - 1)).fill(null).map(() => [])
        );
      }

      let changed = false;
      const refinedFeatures = [];

      for (let fi = 0; fi < originalFeatures.length; fi++) {
        const feature = originalFeatures[fi];
        const coords = feature.coordinates;
        const segMids = entry._segmentMidpoints[fi];

        // Collect subdivisions per segment. Accept updates when the new pass
        // produces at least as many midpoints AND the positions differ (higher-res
        // terrain may reshape the binary tree without increasing count). Never
        // shrink — if tiles are evicted, the old midpoints are preserved.
        for (let si = 0; si < coords.length - 1; si++) {
          const newMids = [];
          collectSubdivisions(coords[si], coords[si + 1], newMids, queryElev, 1.0, 8, 0);
          if (newMids.length < segMids[si].length) continue;
          if (newMids.length > segMids[si].length) {
            segMids[si] = newMids;
            changed = true;
          } else if (newMids.length > 0) {
            // Same count — check if positions actually differ (better terrain data
            // may produce different tree shapes with the same midpoint count)
            let differs = false;
            for (let mi = 0; mi < newMids.length; mi++) {
              if (newMids[mi].mercatorX !== segMids[si][mi].mercatorX ||
                  newMids[mi].mercatorY !== segMids[si][mi].mercatorY) {
                differs = true;
                break;
              }
            }
            if (differs) {
              segMids[si] = newMids;
              changed = true;
            }
          }
        }

        // Build refined coordinates: original vertices interleaved with midpoints
        const refined = [coords[0]];
        for (let si = 0; si < coords.length - 1; si++) {
          for (const mid of segMids[si]) {
            refined.push(mid);
          }
          refined.push(coords[si + 1]);
        }
        refinedFeatures.push({ coordinates: refined, properties: feature.properties });
      }

      if (changed) {
        // Snapshot old elevation cache so vertices outside viewport keep their
        // elevations across the source replacement
        const layer = entry.layer;
        const elevCarryover = new Map();
        if (layer._cachedElevations && layer._polylines) {
          for (const polyline of layer._polylines) {
            for (let i = 0; i < polyline.count; i++) {
              const c = polyline.feature.coordinates[i];
              const elev = layer._cachedElevations[polyline.offset + i];
              if (elev > 0) {
                elevCarryover.set(c.mercatorX + ',' + c.mercatorY, elev);
              }
            }
          }
        }
        layer.replaceSource({ lineFeatures: refinedFeatures, features: [] }, elevCarryover);
      }
    }
  }

  getLayerElevationProfile(id) {
    const entry = this._lineLayers.find(e => e.id === id);
    if (!entry) return null;
    const layer = entry.layer;
    if (!layer._polylines || layer._polylines.length === 0) return null;
    return layer._polylines.map(polyline => {
      const coords = [];
      const elevations = [];
      for (let i = 0; i < polyline.count; i++) {
        const c = polyline.feature.coordinates[i];
        coords.push({ mercatorX: c.mercatorX, mercatorY: c.mercatorY });
        elevations.push(layer._cachedElevations[polyline.offset + i]);
      }
      return { coords, elevations };
    });
  }

  getLayerGeoJSON(id) {
    const entry = this._lineLayers.find(e => e.id === id);
    if (!entry) return null;
    // Use stored sourceGeoJSON if available (user-drawn paths)
    if (entry.sourceGeoJSON) return entry.sourceGeoJSON;
    // Reconstruct from original source features
    if (!entry._sourceRef) return null;
    return {
      type: 'FeatureCollection',
      features: entry._sourceRef.lineFeatures.map(f => ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: f.coordinates.map(c => [c.lon, c.lat, c.elevation || 0]),
        },
        properties: f.properties || {},
      })),
    };
  }

  destroy() {
    this._running = false;
    clearTimeout(this._hashUpdateTimer);
    this._collisionManager.destroy();
    this._frustumOverlay.destroy();
    this._resizeObserver.disconnect();
    this.camera.destroy();
    if (this._depthTexture) this._depthTexture.destroy();
    this._mesh.vertexBuffer.destroy();
    this._mesh.indexBuffer.destroy();
    this._uniformBuffer.destroy();
    this._globalUniformBuffer.destroy();
    this._fallbackImageryTexture.destroy();
    this._whiteImageryTexture.destroy();
    for (const entry of this._lineLayers) entry.layer.destroy();
    for (const entry of this._circleLayers) if (entry.layer.destroy) entry.layer.destroy();
    for (const entry of this._textLayers) if (entry.layer.destroy) entry.layer.destroy();
    this._device.destroy();
  }
}
