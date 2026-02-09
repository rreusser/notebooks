/**
 * WebGPU Text - Instanced text rendering for WebGPU
 *
 * Provides efficient batched rendering of multiple text spans using instanced drawing.
 * All spans managed by a context are rendered in a single draw call.
 *
 * Features:
 * - Create persistent text spans that can be updated or destroyed
 * - Automatic buffer compaction when spans are destroyed
 * - SDF-based text rendering for sharp text at any scale
 * - Supports custom vertex and fragment shaders
 */

/** Glyph metrics for a single character in the font atlas */
export interface GlyphMetrics {
  /** Character code point */
  char: string;
  /** X position in atlas (pixels) */
  x: number;
  /** Y position in atlas (pixels) */
  y: number;
  /** Width in atlas (pixels) */
  width: number;
  /** Height in atlas (pixels) */
  height: number;
  /** Horizontal offset when rendering (pixels) */
  xOffset: number;
  /** Vertical offset when rendering (pixels) */
  yOffset: number;
  /** How much to advance cursor after this glyph (pixels) */
  xAdvance: number;
}

/** Font atlas data including texture and glyph metrics */
export interface FontAtlas {
  /** The atlas texture */
  texture: GPUTexture;
  /** Texture view for sampling */
  textureView: GPUTextureView;
  /** Atlas width in pixels */
  width: number;
  /** Atlas height in pixels */
  height: number;
  /** Line height in pixels */
  lineHeight: number;
  /** Base font size the atlas was generated at */
  fontSize: number;
  /** SDF field range in atlas pixels */
  fieldRange: number;
  /** Glyph metrics indexed by character */
  glyphs: Map<string, GlyphMetrics>;
  /** Debug canvas containing the atlas image (for visualization) */
  debugCanvas: HTMLCanvasElement;
}

/** Options for creating a GPU text context */
export interface GPUTextContextOptions {
  /** Font atlas to use for rendering */
  fontAtlas: FontAtlas;

  /**
   * WGSL function to transform the anchor position (pre-projection).
   *
   * Called with the span's anchor position (padded to vec4f).
   * Returns clip-space position. The library then performs perspective division.
   *
   * Function signature:
   *   fn getVertex(position: vec4f) -> vec4f
   *
   * Default: applies uniforms.viewMatrix to the position.
   *
   * Example - apply custom MVP matrix:
   * ```wgsl
   * @group(2) @binding(0) var<uniform> mvp: mat4x4f;
   * fn getVertex(position: vec4f) -> vec4f {
   *   return mvp * position;
   * }
   * ```
   */
  vertexTransform?: string;

  /**
   * WGSL function to transform shaped vertices (post-shaping).
   *
   * Called after text has been shaped in screen coordinates.
   * Returns final clip-space position.
   *
   * Function signature:
   *   fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f
   *
   * Parameters:
   *   - position: vertex in screen pixels (x, y, depth)
   *   - uv: texture coordinates
   *   - color: vertex color
   *
   * Default: converts screen pixels to clip space using resolution.
   *
   * Example - render text on a 3D plane:
   * ```wgsl
   * @group(2) @binding(0) var<uniform> planeMatrix: mat4x4f;
   * fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
   *   return planeMatrix * vec4f(position, 1.0);
   * }
   * ```
   */
  vertexProjection?: string;

  /** WGSL code for fragment shader - must define getColor function */
  fragmentShaderBody?: string;

  /**
   * Color target configuration (format, blending, write mask).
   */
  colorTargets: GPUColorTargetState | GPUColorTargetState[];

  /**
   * Depth/stencil configuration. If omitted, no depth/stencil testing.
   */
  depthStencil?: GPUDepthStencilState;

  /**
   * Multisample configuration for MSAA.
   */
  multisample?: GPUMultisampleState;

  /**
   * Initial buffer capacity in characters (default: 1024)
   */
  initialCapacity?: number;
}

/** Horizontal text alignment */
export type TextAlign = 'left' | 'center' | 'right';

/** Vertical text alignment */
export type TextBaseline = 'top' | 'middle' | 'bottom' | 'baseline';

/** Position can be 2D, 3D, or 4D homogeneous coordinates */
export type Position2D = [number, number];
export type Position3D = [number, number, number];
export type Position4D = [number, number, number, number];
export type Position = Position2D | Position3D | Position4D;

/** Options for creating a text span */
export interface TextSpanOptions {
  /** The text content */
  text: string;
  /**
   * Anchor position for the text span.
   * - vec2: [x, y] → padded to [x, y, 0, 1]
   * - vec3: [x, y, z] → padded to [x, y, z, 1]
   * - vec4: [x, y, z, w] → used as-is (homogeneous coordinates)
   */
  position: Position;
  /**
   * Screen-space offset added after projection and text shaping.
   * Useful for fine-tuning text position (e.g., label offsets).
   * Default: [0, 0]
   */
  offset?: [number, number];
  /** Font size in pixels relative to canvas resolution (default: 48) */
  fontSize?: number;
  /** Color as [r, g, b, a] (default: [1, 1, 1, 1]) */
  color?: [number, number, number, number];
  /** Stroke outline color as [r, g, b, a] (default: [0, 0, 0, 0] - no stroke) */
  strokeColor?: [number, number, number, number];
  /** Stroke outline width in pixels (default: 0 - no stroke) */
  strokeWidth?: number;
  /** Horizontal alignment relative to position (default: 'left') */
  align?: TextAlign;
  /** Vertical alignment relative to position (default: 'baseline') */
  baseline?: TextBaseline;
}

/** Properties for updating uniforms */
export interface UpdateUniformsProps {
  /**
   * [width, height] in the coordinate system you want to use.
   * Pass CSS pixels (canvas.width/dpr, canvas.height/dpr) for fontSize to operate
   * in CSS pixels, which gives consistent sizing across device pixel ratios.
   */
  resolution: [number, number];
  /** View/projection matrix (optional, defaults to identity) */
  viewMatrix?: Float32Array;
}

/** Properties for drawing text */
export interface DrawProps extends UpdateUniformsProps {
  /** Skip uniform update */
  skipUniformUpdate?: boolean;
}

/** A text span instance */
export interface TextSpan {
  /** Update the text content */
  setText(text: string): void;
  /** Update the anchor position (vec2, vec3, or vec4) */
  setPosition(position: Position): void;
  /** Update the screen-space offset */
  setOffset(offset: [number, number]): void;
  /** Update the font size in pixels */
  setFontSize(fontSize: number): void;
  /** Update the color */
  setColor(color: [number, number, number, number]): void;
  /** Update the stroke outline color */
  setStrokeColor(color: [number, number, number, number]): void;
  /** Update the stroke outline width in pixels */
  setStrokeWidth(width: number): void;
  /** Update horizontal alignment */
  setAlign(align: TextAlign): void;
  /** Update vertical baseline alignment */
  setBaseline(baseline: TextBaseline): void;
  /** Get current text */
  getText(): string;
  /** Get the number of characters (excluding whitespace that doesn't render) */
  getCharacterCount(): number;
  /** Mark this span for destruction */
  destroy(): void;
  /** Check if this span has been destroyed */
  isDestroyed(): boolean;
}

/** GPU text context for managing multiple text spans */
export interface GPUTextContext {
  /** Create a new text span */
  createSpan(options: TextSpanOptions): TextSpan;
  /** Get bind group layout for additional user data (group 2+) */
  getBindGroupLayout(index: number): GPUBindGroupLayout;
  /** Update uniforms before the render pass */
  updateUniforms(props: UpdateUniformsProps): void;
  /** Compact storage (remove destroyed spans) - called automatically before draw if needed */
  compact(): void;
  /** Draw all text spans */
  draw(pass: GPURenderPassEncoder, props: DrawProps, bindGroups?: GPUBindGroup[]): void;
  /** Get total character count across all active spans */
  getTotalCharacterCount(): number;
  /** Destroy all GPU resources */
  destroy(): void;
}

/** Internal span state */
interface InternalSpan {
  id: number;
  text: string;
  /** Anchor position as vec4f (padded from user input) */
  anchor: [number, number, number, number];
  /** Screen-space offset */
  offset: [number, number];
  /** Font size in pixels */
  fontSize: number;
  color: [number, number, number, number];
  /** Stroke outline color */
  strokeColor: [number, number, number, number];
  /** Stroke outline width in pixels */
  strokeWidth: number;
  align: TextAlign;
  baseline: TextBaseline;
  /** Offset into the character buffer */
  bufferOffset: number;
  /** Number of characters in buffer (may differ from text.length due to whitespace) */
  characterCount: number;
  /** Marked for destruction */
  destroyed: boolean;
  /** Needs buffer update */
  dirty: boolean;
}

/**
 * Character instance data layout (per character):
 * All spatial values are in BASE coordinates (at atlas fontSize); shader applies fontSize ratio.
 * - uvRect: vec4f (16 bytes) - [u0, v0, u1, v1] in atlas
 * - color: vec4f (16 bytes) - RGBA color
 * - anchor: vec4f (16 bytes) - span anchor position (homogeneous coords)
 * - strokeColor: vec4f (16 bytes) - stroke outline RGBA color
 * - localPosition: vec2f (8 bytes) - glyph position relative to anchor, BASE coords
 * - offset: vec2f (8 bytes) - screen-space offset (applied post-scale)
 * - size: vec2f (8 bytes) - glyph size in BASE pixels
 * - fontSize: f32 (4 bytes) - font size in pixels (ratio to atlas fontSize)
 * - strokeWidth: f32 (4 bytes) - stroke outline width in pixels
 * Total: 96 bytes per character (must be multiple of 16 for WGSL array alignment)
 */
const BYTES_PER_CHARACTER = 96;
const FLOATS_PER_CHARACTER = BYTES_PER_CHARACTER / 4;

/**
 * Create a GPU text rendering context
 */
export function createGPUTextContext(device: GPUDevice, options: GPUTextContextOptions): GPUTextContext {
  const {
    fontAtlas,
    vertexTransform = defaultVertexTransform,
    vertexProjection = defaultVertexProjection,
    fragmentShaderBody = defaultFragmentShaderBody,
    colorTargets,
    depthStencil,
    multisample,
    initialCapacity = 1024,
  } = options;

  // Normalize colorTargets to array
  const targets = Array.isArray(colorTargets) ? colorTargets : [colorTargets];

  // Internal state
  let spans: InternalSpan[] = [];
  let nextSpanId = 0;
  let needsCompaction = false;
  let totalCharacterCount = 0;
  let bufferCapacity = initialCapacity;

  // Create character instance buffer
  let characterBuffer = device.createBuffer({
    label: 'gpu-text-characters',
    size: bufferCapacity * BYTES_PER_CHARACTER,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });

  // CPU-side character data for updates
  let characterData = new Float32Array(bufferCapacity * FLOATS_PER_CHARACTER);

  // Uniform buffer: resolution (8) + fontScale (4) + fieldRange (4) + atlasSize (8) + pad (8) + viewMatrix (64) = 96 bytes
  const uniformBuffer = device.createBuffer({
    label: 'gpu-text-uniforms',
    size: 96,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  // Create sampler for font atlas
  const sampler = device.createSampler({
    label: 'gpu-text-sampler',
    magFilter: 'linear',
    minFilter: 'linear',
    mipmapFilter: 'linear',
  });

  // Generate shader code
  const vertexShader = createVertexShader(vertexTransform, vertexProjection);
  const fragmentShader = createFragmentShader(fragmentShaderBody);

  // Create shader modules
  const vertexModule = device.createShaderModule({
    label: 'gpu-text-vertex',
    code: vertexShader,
  });

  const fragmentModule = device.createShaderModule({
    label: 'gpu-text-fragment',
    code: fragmentShader,
  });

  // Create pipeline
  const pipeline = device.createRenderPipeline({
    label: 'gpu-text',
    layout: 'auto',
    vertex: {
      module: vertexModule,
      entryPoint: 'vertexMain',
    },
    fragment: {
      module: fragmentModule,
      entryPoint: 'fragmentMain',
      targets,
    },
    primitive: {
      topology: 'triangle-strip',
      stripIndexFormat: undefined,
      cullMode: 'none',
    },
    depthStencil,
    multisample,
  });

  // Create bind groups
  // Group 0: Library uniforms
  const uniformBindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  });

  // Group 1: Font atlas and character data
  let fontBindGroup = createFontBindGroup();

  function createFontBindGroup(): GPUBindGroup {
    return device.createBindGroup({
      layout: pipeline.getBindGroupLayout(1),
      entries: [
        { binding: 0, resource: sampler },
        { binding: 1, resource: fontAtlas.textureView },
        { binding: 2, resource: { buffer: characterBuffer } },
      ],
    });
  }

  // Track uniform state for dirty checking
  let lastResX = -1;
  let lastResY = -1;
  let uniformsWritten = false;

  // Helper to get renderable character count (excluding spaces etc that don't need quads)
  function getCharacterCount(text: string): number {
    let count = 0;
    for (const char of text) {
      if (fontAtlas.glyphs.has(char) && char !== ' ' && char !== '\t' && char !== '\n') {
        count++;
      }
    }
    return count;
  }

  // Helper to ensure buffer capacity
  function ensureCapacity(requiredCount: number): void {
    if (requiredCount <= bufferCapacity) return;

    // Double capacity until sufficient
    let newCapacity = bufferCapacity;
    while (newCapacity < requiredCount) {
      newCapacity *= 2;
    }

    // Create new buffer
    const newBuffer = device.createBuffer({
      label: 'gpu-text-characters',
      size: newCapacity * BYTES_PER_CHARACTER,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    // Create new CPU data array
    const newData = new Float32Array(newCapacity * FLOATS_PER_CHARACTER);
    newData.set(characterData);

    // Copy existing data to GPU
    if (totalCharacterCount > 0) {
      device.queue.writeBuffer(newBuffer, 0, newData, 0, totalCharacterCount * FLOATS_PER_CHARACTER);
    }

    // Clean up old buffer
    characterBuffer.destroy();
    characterBuffer = newBuffer;
    characterData = newData;
    bufferCapacity = newCapacity;

    // Recreate bind group with new buffer
    fontBindGroup = createFontBindGroup();
  }

  // Helper to measure text metrics
  function measureText(text: string, scale: number): { width: number; ascent: number; descent: number } {
    let width = 0;
    let ascent = 0;  // Distance from baseline to top (positive)
    let descent = 0; // Distance from baseline to bottom (positive)

    for (const char of text) {
      if (char === ' ') {
        const spaceGlyph = fontAtlas.glyphs.get(' ');
        width += spaceGlyph ? spaceGlyph.xAdvance * scale : fontAtlas.fontSize * 0.3 * scale;
        continue;
      }
      if (char === '\t') {
        const spaceGlyph = fontAtlas.glyphs.get(' ');
        const spaceWidth = spaceGlyph ? spaceGlyph.xAdvance : fontAtlas.fontSize * 0.3;
        width += spaceWidth * 4 * scale;
        continue;
      }
      if (char === '\n') continue;

      const glyph = fontAtlas.glyphs.get(char);
      if (!glyph) continue;

      width += glyph.xAdvance * scale;

      // yOffset is negative for glyphs above baseline
      const glyphTop = -glyph.yOffset * scale; // Distance above baseline
      const glyphBottom = (glyph.height * scale) - glyphTop; // Distance below baseline

      ascent = Math.max(ascent, glyphTop);
      descent = Math.max(descent, glyphBottom);
    }

    return { width, ascent, descent };
  }

  // Helper to write character data for a span
  function writeSpanCharacters(span: InternalSpan): void {
    const { text, anchor, offset: spanOffset, fontSize, color, strokeColor, strokeWidth, bufferOffset, align, baseline } = span;
    // Convert fontSize to scale factor relative to atlas fontSize
    const scale = fontSize / fontAtlas.fontSize;
    const atlasWidth = fontAtlas.width;
    const atlasHeight = fontAtlas.height;

    // Measure text at base scale (scale=1) for alignment
    // Scale is applied uniformly in the shader
    const metrics = measureText(text, 1.0);

    // Calculate horizontal offset based on alignment (in base coordinates)
    let alignOffsetX = 0;
    if (align === 'center') {
      alignOffsetX = -metrics.width / 2;
    } else if (align === 'right') {
      alignOffsetX = -metrics.width;
    }

    // Calculate vertical offset based on baseline (in base coordinates)
    let alignOffsetY = 0;
    if (baseline === 'top') {
      alignOffsetY = metrics.ascent;
    } else if (baseline === 'middle') {
      alignOffsetY = (metrics.ascent - metrics.descent) / 2;
    } else if (baseline === 'bottom') {
      alignOffsetY = -metrics.descent;
    }

    // localPosition stored in BASE coordinates (unscaled)
    // The shader applies scale uniformly to localPosition, size, and quad corners
    let cursorX = alignOffsetX;
    let cursorY = alignOffsetY;
    let charIndex = 0;

    for (const char of text) {
      // Handle whitespace (advance in base coordinates)
      if (char === ' ') {
        const spaceGlyph = fontAtlas.glyphs.get(' ');
        if (spaceGlyph) {
          cursorX += spaceGlyph.xAdvance;
        } else {
          cursorX += fontAtlas.fontSize * 0.3;
        }
        continue;
      }
      if (char === '\t') {
        const spaceGlyph = fontAtlas.glyphs.get(' ');
        const spaceWidth = spaceGlyph ? spaceGlyph.xAdvance : fontAtlas.fontSize * 0.3;
        cursorX += spaceWidth * 4;
        continue;
      }
      if (char === '\n') {
        continue;
      }

      const glyph = fontAtlas.glyphs.get(char);
      if (!glyph) continue;

      const dataOffset = (bufferOffset + charIndex) * FLOATS_PER_CHARACTER;

      // UV rect [u0, v0, u1, v1] - offset 0
      characterData[dataOffset + 0] = glyph.x / atlasWidth;
      characterData[dataOffset + 1] = glyph.y / atlasHeight;
      characterData[dataOffset + 2] = (glyph.x + glyph.width) / atlasWidth;
      characterData[dataOffset + 3] = (glyph.y + glyph.height) / atlasHeight;

      // Color - offset 4
      characterData[dataOffset + 4] = color[0];
      characterData[dataOffset + 5] = color[1];
      characterData[dataOffset + 6] = color[2];
      characterData[dataOffset + 7] = color[3];

      // Anchor (vec4f) - offset 8
      characterData[dataOffset + 8] = anchor[0];
      characterData[dataOffset + 9] = anchor[1];
      characterData[dataOffset + 10] = anchor[2];
      characterData[dataOffset + 11] = anchor[3];

      // Stroke color (vec4f) - offset 12
      characterData[dataOffset + 12] = strokeColor[0];
      characterData[dataOffset + 13] = strokeColor[1];
      characterData[dataOffset + 14] = strokeColor[2];
      characterData[dataOffset + 15] = strokeColor[3];

      // Local position in BASE coordinates (unscaled) - offset 16
      characterData[dataOffset + 16] = cursorX + glyph.xOffset;
      characterData[dataOffset + 17] = cursorY + glyph.yOffset;

      // Offset (screen-space) - offset 18
      characterData[dataOffset + 18] = spanOffset[0];
      characterData[dataOffset + 19] = spanOffset[1];

      // Size (glyph dimensions in base pixels) - offset 20
      characterData[dataOffset + 20] = glyph.width;
      characterData[dataOffset + 21] = glyph.height;

      // Scale - offset 22
      characterData[dataOffset + 22] = scale;

      // Stroke width - offset 23
      characterData[dataOffset + 23] = strokeWidth;

      cursorX += glyph.xAdvance;
      charIndex++;
    }

    // Write to GPU
    const byteOffset = bufferOffset * BYTES_PER_CHARACTER;
    const floatOffset = bufferOffset * FLOATS_PER_CHARACTER;
    device.queue.writeBuffer(
      characterBuffer,
      byteOffset,
      characterData,
      floatOffset,
      span.characterCount * FLOATS_PER_CHARACTER
    );

    span.dirty = false;
  }

  // Compact storage by removing destroyed spans
  function compact(): void {
    if (!needsCompaction) return;

    // Filter out destroyed spans
    const activeSpans = spans.filter(s => !s.destroyed);

    // Rebuild character buffer
    let newOffset = 0;
    for (const span of activeSpans) {
      if (span.bufferOffset !== newOffset) {
        // Need to move this span's data
        span.bufferOffset = newOffset;
        span.dirty = true;
      }
      newOffset += span.characterCount;
    }

    // Update total count
    totalCharacterCount = newOffset;
    spans = activeSpans;

    // Rewrite all dirty spans
    for (const span of spans) {
      if (span.dirty) {
        writeSpanCharacters(span);
      }
    }

    needsCompaction = false;
  }

  // Helper to pad position to vec4f
  function padPosition(pos: Position): [number, number, number, number] {
    if (pos.length === 2) {
      return [pos[0], pos[1], 0, 1];
    } else if (pos.length === 3) {
      return [pos[0], pos[1], pos[2], 1];
    } else {
      return [pos[0], pos[1], pos[2], pos[3]];
    }
  }

  return {
    createSpan(opts: TextSpanOptions): TextSpan {
      const charCount = getCharacterCount(opts.text);

      // Ensure we have capacity
      ensureCapacity(totalCharacterCount + charCount);

      const span: InternalSpan = {
        id: nextSpanId++,
        text: opts.text,
        anchor: padPosition(opts.position),
        offset: opts.offset ?? [0, 0],
        fontSize: opts.fontSize ?? fontAtlas.fontSize,
        color: opts.color ? [...opts.color] as [number, number, number, number] : [1, 1, 1, 1],
        strokeColor: opts.strokeColor ? [...opts.strokeColor] as [number, number, number, number] : [0, 0, 0, 0],
        strokeWidth: opts.strokeWidth ?? 0,
        align: opts.align ?? 'left',
        baseline: opts.baseline ?? 'baseline',
        bufferOffset: totalCharacterCount,
        characterCount: charCount,
        destroyed: false,
        dirty: true,
      };

      spans.push(span);
      totalCharacterCount += charCount;

      // Write character data
      writeSpanCharacters(span);

      return {
        setText(text: string): void {
          if (span.destroyed) return;
          const newCharCount = getCharacterCount(text);

          if (newCharCount !== span.characterCount) {
            // Character count changed - need to reallocate
            // Mark old position as needing compaction
            span.destroyed = true;
            needsCompaction = true;

            // Compact to free the old space
            compact();

            // Now create at the new end
            ensureCapacity(totalCharacterCount + newCharCount);
            span.destroyed = false;
            span.text = text;
            span.characterCount = newCharCount;
            span.bufferOffset = totalCharacterCount;
            span.dirty = true;
            spans.push(span);
            totalCharacterCount += newCharCount;
          } else {
            span.text = text;
            span.dirty = true;
          }

          writeSpanCharacters(span);
        },

        setPosition(position: Position): void {
          if (span.destroyed) return;
          span.anchor = padPosition(position);
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setOffset(offset: [number, number]): void {
          if (span.destroyed) return;
          span.offset = [...offset] as [number, number];
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setFontSize(fontSize: number): void {
          if (span.destroyed) return;
          span.fontSize = fontSize;
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setColor(color: [number, number, number, number]): void {
          if (span.destroyed) return;
          span.color = [...color] as [number, number, number, number];
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setStrokeColor(color: [number, number, number, number]): void {
          if (span.destroyed) return;
          span.strokeColor = [...color] as [number, number, number, number];
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setStrokeWidth(width: number): void {
          if (span.destroyed) return;
          span.strokeWidth = width;
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setAlign(align: TextAlign): void {
          if (span.destroyed) return;
          span.align = align;
          span.dirty = true;
          writeSpanCharacters(span);
        },

        setBaseline(baseline: TextBaseline): void {
          if (span.destroyed) return;
          span.baseline = baseline;
          span.dirty = true;
          writeSpanCharacters(span);
        },

        getText(): string {
          return span.text;
        },

        getCharacterCount(): number {
          return span.characterCount;
        },

        destroy(): void {
          if (span.destroyed) return;
          span.destroyed = true;
          needsCompaction = true;
        },

        isDestroyed(): boolean {
          return span.destroyed;
        },
      };
    },

    getBindGroupLayout(index: number): GPUBindGroupLayout {
      return pipeline.getBindGroupLayout(index);
    },

    updateUniforms(props: UpdateUniformsProps): void {
      const { resolution, viewMatrix } = props;

      const needsUpdate = !uniformsWritten ||
        resolution[0] !== lastResX ||
        resolution[1] !== lastResY ||
        viewMatrix !== undefined;

      if (needsUpdate) {
        const uniformData = new ArrayBuffer(96);
        const f32 = new Float32Array(uniformData);

        // Resolution
        f32[0] = resolution[0];
        f32[1] = resolution[1];

        // Font scale is always 1.0 - text is shaped in pixels and scale
        // is applied relative to the canvas resolution at draw time
        f32[2] = 1.0;

        // Field range from atlas metadata (default to 4 if not specified)
        f32[3] = (fontAtlas as any).fieldRange ?? 4;

        // Atlas size
        f32[4] = fontAtlas.width;
        f32[5] = fontAtlas.height;

        // Padding
        f32[6] = 0;
        f32[7] = 0;

        // View matrix (identity if not provided)
        if (viewMatrix) {
          f32.set(viewMatrix, 8); // Offset by 8 floats (32 bytes for alignment)
        } else {
          // Identity matrix
          f32[8] = 1; f32[9] = 0; f32[10] = 0; f32[11] = 0;
          f32[12] = 0; f32[13] = 1; f32[14] = 0; f32[15] = 0;
          f32[16] = 0; f32[17] = 0; f32[18] = 1; f32[19] = 0;
          f32[20] = 0; f32[21] = 0; f32[22] = 0; f32[23] = 1;
        }

        device.queue.writeBuffer(uniformBuffer, 0, uniformData);

        lastResX = resolution[0];
        lastResY = resolution[1];
        uniformsWritten = true;
      }
    },

    compact,

    draw(pass: GPURenderPassEncoder, props: DrawProps, bindGroups: GPUBindGroup[] = []): void {
      // Compact if needed
      if (needsCompaction) {
        compact();
      }

      if (!props.skipUniformUpdate) {
        this.updateUniforms(props);
      }

      if (totalCharacterCount === 0) return;

      pass.setPipeline(pipeline);
      pass.setBindGroup(0, uniformBindGroup);
      pass.setBindGroup(1, fontBindGroup);

      // User bind groups (2+)
      for (let i = 0; i < bindGroups.length; i++) {
        pass.setBindGroup(i + 2, bindGroups[i]);
      }

      // Draw 4 vertices (triangle strip quad) per character instance
      pass.draw(4, totalCharacterCount);
    },

    getTotalCharacterCount(): number {
      return totalCharacterCount;
    },

    destroy(): void {
      characterBuffer.destroy();
      uniformBuffer.destroy();
    },
  };
}

/**
 * Default vertex transform - applies viewMatrix to convert anchor to clip space
 */
const defaultVertexTransform = /* wgsl */`
fn getVertex(position: vec4f) -> vec4f {
  return uniforms.viewMatrix * position;
}
`;

/**
 * Default vertex projection - converts screen pixels to clip space
 */
const defaultVertexProjection = /* wgsl */`
fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
  // Convert screen pixels to clip space (NDC with Y flipped)
  let x = position.x / uniforms.resolution.x * 2.0 - 1.0;
  let y = 1.0 - position.y / uniforms.resolution.y * 2.0;
  return vec4f(x, y, position.z, 1.0);
}
`;

/**
 * Default fragment shader body - MSDF/MTSDF rendering with antialiasing and stroke support
 * Uses median-of-three technique for sharp corners and screen-space derivatives for antialiasing
 *
 * For best stroke quality, use MTSDF atlas (msdf-atlas-gen -type mtsdf):
 * - RGB channels: Multi-channel SDF for sharp fill edges
 * - Alpha channel: True SDF for smooth strokes
 *
 * Reference: https://github.com/Chlumsky/msdfgen
 */
const defaultFragmentShaderBody = /* wgsl */`
// Median of three values - core of MSDF technique
// The median preserves sharp corners that single-channel SDF would round off
fn median3(r: f32, g: f32, b: f32) -> f32 {
  return max(min(r, g), min(max(r, g), b));
}

// Compute screen pixel range - how many screen pixels the SDF field range spans
// This is the proper way to determine antialiasing width for SDF rendering
fn screenPxRange(uv: vec2f) -> f32 {
  // fieldRange is in atlas pixels, atlasSize converts UV to atlas pixels
  // fwidth(uv) tells us UV change per screen pixel
  // So: fieldRange / (fwidth(uv) * atlasSize) = screen pixels per field range
  let unitRange = uniforms.fieldRange / uniforms.atlasSize;
  let screenTexSize = 1.0 / fwidth(uv);
  return max(0.5 * dot(unitRange, screenTexSize), 1.0);
}

fn getColor(uv: vec2f, color: vec4f, strokeColor: vec4f, strokeWidth: f32, msdf: vec4f, anchor: vec4f) -> vec4f {
  // Use median of RGB (MSDF technique) for both fill and stroke
  // This preserves sharp corners; works for stroke now that we use fwidth(uv) not fwidth(sdf)
  let sd = median3(msdf.r, msdf.g, msdf.b);

  // Compute screen pixel range for proper antialiasing
  let pxRange = screenPxRange(uv);

  // Convert SDF distance to screen pixels (recommended MSDF approach)
  // SDF is 0-1 where 0.5 is edge; distance from edge = (sd - 0.5)
  // Multiply by pxRange to get screen pixel distance
  let screenDist = pxRange * (sd - 0.5);

  // Fill opacity - the standard MSDF formula
  let fillAlpha = clamp(screenDist + 0.5, 0.0, 1.0);

  // If no stroke, just render fill
  let hasStroke = strokeWidth > 0.0 && strokeColor.a > 0.0;
  if (!hasStroke) {
    return vec4f(color.rgb, color.a * fillAlpha);
  }

  // Stroke extends strokeWidth pixels outside the glyph edge
  // screenDist is positive inside glyph, negative outside
  // Stroke outer edge is at -strokeWidth pixels from glyph edge
  let strokeOuterDist = screenDist + strokeWidth;
  let strokeAlpha = clamp(strokeOuterDist + 0.5, 0.0, 1.0);

  // Composite: fill over stroke
  // Where fill is opaque, show fill; where fill is transparent but stroke is opaque, show stroke
  let finalAlpha = fillAlpha * color.a + strokeAlpha * strokeColor.a * (1.0 - fillAlpha * color.a);

  if (finalAlpha <= 0.0) {
    return vec4f(0.0);
  }

  let finalRgb = (color.rgb * color.a * fillAlpha + strokeColor.rgb * strokeColor.a * strokeAlpha * (1.0 - fillAlpha * color.a)) / finalAlpha;

  return vec4f(finalRgb, finalAlpha);
}
`;

/**
 * Create the vertex shader
 */
function createVertexShader(vertexTransform: string, vertexProjection: string): string {
  return /* wgsl */`
//------------------------------------------------------------------------------
// GPU Text Vertex Shader
//------------------------------------------------------------------------------
//
// Pipeline:
// 1. getVertex(anchor) -> clip space position
// 2. Perspective division -> NDC
// 3. NDC -> screen pixels
// 4. Text shaping (add local glyph position)
// 5. Add screen offset
// 6. projectVertex() -> final clip space position
//
//------------------------------------------------------------------------------

struct Uniforms {
  resolution: vec2f,
  fontScale: f32,      // Global font scale factor (typically 1.0)
  fieldRange: f32,     // SDF field range in atlas pixels
  atlasSize: vec2f,    // Atlas texture dimensions
  _pad: vec2f,
  viewMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

// Character instance data - ordered for proper WGSL alignment
// All spatial values (localPosition, size) are in BASE coordinates (at atlas fontSize).
// The shader applies fontSize ratio to compute final screen positions.
struct CharacterInstance {
  uvRect: vec4f,         // [u0, v0, u1, v1] - offset 0
  color: vec4f,          // RGBA - offset 16
  anchor: vec4f,         // Span anchor position (homogeneous) - offset 32
  strokeColor: vec4f,    // Stroke outline RGBA - offset 48
  localPosition: vec2f,  // Glyph position relative to anchor, BASE coords - offset 64
  offset: vec2f,         // Screen-space offset (post-scale) - offset 72
  size: vec2f,           // Glyph size in BASE pixels - offset 80
  scale: f32,            // fontSize / atlasFontSize ratio - offset 88
  strokeWidth: f32,      // Stroke outline width in pixels - offset 92
}
// Total: 96 bytes

@group(1) @binding(2) var<storage, read> characters: array<CharacterInstance>;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
  @location(1) color: vec4f,
  @location(2) strokeColor: vec4f,
  @location(3) strokeWidth: f32,
  @location(4) anchor: vec4f,
}

// User-defined or default vertex transform (anchor -> clip space)
${vertexTransform}

// User-defined or default vertex projection (screen pixels -> clip space)
${vertexProjection}

@vertex
fn vertexMain(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
  var output: VertexOutput;

  let char = characters[instanceIndex];

  // Quad corners: 0=TL, 1=TR, 2=BL, 3=BR (triangle strip order)
  let corners = array<vec2f, 4>(
    vec2f(0.0, 0.0),  // Top-left
    vec2f(1.0, 0.0),  // Top-right
    vec2f(0.0, 1.0),  // Bottom-left
    vec2f(1.0, 1.0),  // Bottom-right
  );
  let corner = corners[vertexIndex];

  // 1. Transform anchor position (user-defined, e.g., MVP multiplication)
  let clipPos = getVertex(char.anchor);

  // 2. Perspective division: clip space -> NDC
  let ndc = clipPos.xyz / clipPos.w;

  // 3. NDC -> screen pixels
  let screenAnchor = vec2f(
    (ndc.x * 0.5 + 0.5) * uniforms.resolution.x,
    (0.5 - ndc.y * 0.5) * uniforms.resolution.y  // Y flipped for screen coords
  );

  // 4. Text shaping: compute glyph vertex position relative to anchor
  // Apply fontScale for resolution-relative sizing
  let effectiveScale = char.scale * uniforms.fontScale;
  let quadSize = char.size * effectiveScale;
  let glyphOffset = char.localPosition * effectiveScale + corner * quadSize;

  // 5. Add screen-space offset and compute final screen position
  let screenPos = screenAnchor + char.offset + glyphOffset;

  // 6. Interpolate UVs
  let uv = mix(char.uvRect.xy, char.uvRect.zw, corner);

  // 7. Apply post-projection (user-defined transformation to clip space)
  output.position = projectVertex(vec3f(screenPos, ndc.z), uv, char.color);
  output.uv = uv;
  output.color = char.color;
  output.strokeColor = char.strokeColor;
  output.strokeWidth = char.strokeWidth;
  output.anchor = char.anchor;

  return output;
}
`;
}

/**
 * Create the fragment shader
 */
function createFragmentShader(userCode: string): string {
  return /* wgsl */`
//------------------------------------------------------------------------------
// GPU Text Fragment Shader
//------------------------------------------------------------------------------

struct Uniforms {
  resolution: vec2f,
  fontScale: f32,
  fieldRange: f32,
  atlasSize: vec2f,
  _pad: vec2f,
  viewMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(1) @binding(0) var fontSampler: sampler;
@group(1) @binding(1) var fontAtlas: texture_2d<f32>;

struct FragmentInput {
  @location(0) uv: vec2f,
  @location(1) color: vec4f,
  @location(2) strokeColor: vec4f,
  @location(3) strokeWidth: f32,
  @location(4) anchor: vec4f,
}

${userCode}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  // Sample the MSDF/MTSDF texture (all four channels)
  // RGB: multi-channel SDF for sharp fill edges
  // A: true SDF for strokes (in MTSDF format) or 1.0 (in plain MSDF)
  let msdf = textureSample(fontAtlas, fontSampler, input.uv);

  return getColor(input.uv, input.color, input.strokeColor, input.strokeWidth, msdf, input.anchor);
}
`;
}

/**
 * Options for loading a pre-generated MSDF font atlas
 */
export interface LoadFontAtlasOptions {
  /** URL to the atlas PNG image */
  atlasUrl: string;
  /** URL to the atlas JSON metadata */
  metadataUrl: string;
}

/**
 * Metadata format from msdf-atlas-gen (via our Docker script)
 */
interface AtlasMetadata {
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
  ascender?: number;
  descender?: number;
  fieldRange: number;
  yOrigin?: string;
  glyphs: Array<{
    char: string;
    unicode: number;
    x: number;
    y: number;
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
    xAdvance: number;
  }>;
}

/**
 * Load a pre-generated MSDF font atlas from PNG + JSON files
 * Use this with atlases generated by msdf-atlas-gen (via Docker or CLI)
 */
export async function loadFontAtlas(
  device: GPUDevice,
  options: LoadFontAtlasOptions
): Promise<FontAtlas> {
  const { atlasUrl, metadataUrl } = options;

  // Load metadata and image in parallel
  const [metadataResponse, imageResponse] = await Promise.all([
    fetch(metadataUrl),
    fetch(atlasUrl),
  ]);

  if (!metadataResponse.ok) {
    throw new Error(`Failed to load atlas metadata: ${metadataResponse.statusText}`);
  }
  if (!imageResponse.ok) {
    throw new Error(`Failed to load atlas image: ${imageResponse.statusText}`);
  }

  const metadata: AtlasMetadata = await metadataResponse.json();
  const imageBlob = await imageResponse.blob();
  const imageBitmap = await createImageBitmap(imageBlob);

  // Create GPU texture
  const texture = device.createTexture({
    label: 'font-atlas-msdf',
    size: [metadata.width, metadata.height, 1],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  });

  device.queue.copyExternalImageToTexture(
    { source: imageBitmap },
    { texture },
    [metadata.width, metadata.height]
  );

  // Create debug canvas
  const debugCanvas = document.createElement('canvas');
  debugCanvas.width = metadata.width;
  debugCanvas.height = metadata.height;
  const ctx = debugCanvas.getContext('2d')!;
  ctx.drawImage(imageBitmap, 0, 0);

  // Convert glyphs to Map
  const glyphs = new Map<string, GlyphMetrics>();
  for (const glyph of metadata.glyphs) {
    glyphs.set(glyph.char, {
      char: glyph.char,
      x: glyph.x,
      y: glyph.y,
      width: glyph.width,
      height: glyph.height,
      xOffset: glyph.xOffset,
      yOffset: glyph.yOffset,
      xAdvance: glyph.xAdvance,
    });
  }

  return {
    texture,
    textureView: texture.createView(),
    width: metadata.width,
    height: metadata.height,
    lineHeight: metadata.lineHeight,
    fontSize: metadata.fontSize,
    fieldRange: metadata.fieldRange ?? 4,
    glyphs,
    debugCanvas,
  };
}

/**
 * Options for creating an MSDF font atlas using @zappar/msdf-generator
 */
export interface CreateFontAtlasOptions {
  /** Font file URL to fetch, or Uint8Array of font data */
  font: string | Uint8Array;
  /** Font size in pixels for atlas generation */
  fontSize?: number;
  /** Characters to include (default: printable ASCII) */
  characters?: string;
  /** Atlas size [width, height] */
  atlasSize?: number | [number, number];
  /** Distance field range in pixels (default: 4) */
  fieldRange?: number;
  /** Fix overlapping contours in glyphs (default: true) */
  fixOverlaps?: boolean;
  /** Progress callback */
  onProgress?: (progress: number) => void;
}

// Import MSDF generator (loaded dynamically to support both Node and browser)
import { MSDF, type MSDFAtlas } from '@zappar/msdf-generator';

// Singleton MSDF generator instance
let msdfInstance: MSDF | null = null;
let msdfInitPromise: Promise<void> | null = null;

async function getMSDFGenerator(): Promise<MSDF> {
  if (msdfInstance) {
    console.log('[MSDF] Using existing instance');
    return msdfInstance;
  }

  if (!msdfInitPromise) {
    console.log('[MSDF] Creating new MSDF instance...');
    msdfInstance = new MSDF();
    console.log('[MSDF] Initializing MSDF (loading WASM)...');
    msdfInitPromise = msdfInstance.initialize();
  }

  await msdfInitPromise;
  console.log('[MSDF] MSDF initialized successfully');
  return msdfInstance!;
}

export async function createFontAtlas(
  device: GPUDevice,
  options: CreateFontAtlasOptions
): Promise<FontAtlas> {
  const {
    font,
    fontSize = 48,
    characters = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    atlasSize = 1024,
    fieldRange = 4,
    fixOverlaps = true,
    onProgress,
  } = options;

  console.log('[MSDF] Starting font atlas creation...');

  // Load font data if URL provided
  let fontData: Uint8Array;
  if (typeof font === 'string') {
    console.log('[MSDF] Fetching font from:', font);
    const response = await fetch(font);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fontData = new Uint8Array(buffer);
    console.log('[MSDF] Font loaded, size:', fontData.length, 'bytes');
  } else {
    fontData = font;
    console.log('[MSDF] Using provided font data, size:', fontData.length, 'bytes');
  }

  // Get MSDF generator
  console.log('[MSDF] Getting MSDF generator...');
  const msdf = await getMSDFGenerator();
  console.log('[MSDF] MSDF generator ready');

  // Normalize atlas size
  const textureSize: [number, number] = Array.isArray(atlasSize)
    ? atlasSize
    : [atlasSize, atlasSize];

  // Generate MSDF atlas
  console.log('[MSDF] Generating atlas...');
  const atlas: MSDFAtlas = await msdf.generateAtlas({
    font: fontData,
    charset: characters,
    fontSize,
    textureSize,
    fieldRange,
    fixOverlaps,
  });
  console.log('[MSDF] Atlas generated:', atlas.texture.width, 'x', atlas.texture.height);

  // Create debug canvas from ImageData
  const debugCanvas = document.createElement('canvas');
  debugCanvas.width = atlas.texture.width;
  debugCanvas.height = atlas.texture.height;
  const ctx = debugCanvas.getContext('2d')!;
  ctx.putImageData(atlas.texture, 0, 0);

  // Create GPU texture from atlas ImageData
  const imageBitmap = await createImageBitmap(atlas.texture);

  const texture = device.createTexture({
    label: 'font-atlas-msdf',
    size: [atlas.texture.width, atlas.texture.height, 1],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  });

  device.queue.copyExternalImageToTexture(
    { source: imageBitmap },
    { texture },
    [atlas.texture.width, atlas.texture.height]
  );

  // Convert glyph info to our format
  const glyphs = new Map<string, GlyphMetrics>();
  for (const glyph of atlas.glyphs) {
    glyphs.set(glyph.char, {
      char: glyph.char,
      x: glyph.atlasPosition[0],
      y: glyph.atlasPosition[1],
      width: glyph.atlasSize[0],
      height: glyph.atlasSize[1],
      xOffset: glyph.xoffset,
      yOffset: glyph.yoffset,
      xAdvance: glyph.advance,
    });
  }

  return {
    texture,
    textureView: texture.createView(),
    width: atlas.texture.width,
    height: atlas.texture.height,
    lineHeight: atlas.metrics.lineHeight,
    fontSize: atlas.metrics.emSize,
    fieldRange: fieldRange,
    glyphs,
    debugCanvas,
  };
}
