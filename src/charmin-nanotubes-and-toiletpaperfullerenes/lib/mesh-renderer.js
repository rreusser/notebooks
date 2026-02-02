// Mesh rendering for trivalent graphs using regl
// Draws vertices as instanced icospheres, edges as thick lines, and faces as filled polygons

export function createMeshRenderer(regl, icosphere) {
  const drawVertices = createDrawVertices(regl, icosphere);
  const drawEdges = createDrawEdges(regl);
  const drawFaces = createDrawFaces(regl);

  // Preallocated buffers
  const vertexBuffer = regl.buffer({ usage: 'dynamic', data: new Float32Array(65536) });
  const edgeBuffer = regl.buffer({ usage: 'dynamic', data: new Float32Array(65536) });
  const faceBuffer = regl.buffer({ usage: 'dynamic', data: new Float32Array(65536) });
  const faceEdgeCountBuffer = regl.buffer({ usage: 'dynamic', data: new Float32Array(65536) });
  const indexBuffer = regl.buffer(new Uint16Array(Array.from({ length: 65536 }, (_, i) => i)));

  return {
    render(mesh, physics, opts = {}) {
      const {
        pointSize = 3,
        strainColoring = 1.5,
        selectedVertexIndex = -1,
        hoverVertexIndex = -1,
        selectedEdgeIndex = -1,
        hoverEdgeIndex = -1,
        showFaces = true,
        faceOpacity = 0.3,
        depthFalloff = false,
        depthFalloffWidth = 7,
        focusCenter = [0, 0, 0]
      } = opts;

      const depthParams = {
        depthFalloff: depthFalloff ? 1.0 : 0.0,
        depthFalloffWidth,
        focusCenter,
      };

      // Update vertex buffer
      vertexBuffer.subdata(mesh.positions.subarray(0, mesh.vertexCount * 3));

      // Update edge buffer (interleaved pairs)
      const edgeData = flattenEdges(mesh);
      edgeBuffer.subdata(edgeData);

      // Draw faces first (behind everything)
      if (showFaces) {
        const { triangleData, edgeCounts, triangleCount } = triangulateFaces(mesh);
        if (triangleCount > 0) {
          faceBuffer.subdata(triangleData);
          faceEdgeCountBuffer.subdata(edgeCounts);
          drawFaces({
            faceBuffer,
            faceEdgeCountBuffer,
            count: triangleCount,
            faceOpacity,
            ...depthParams
          });
        }
      }

      // Draw edges
      drawEdges({
        vertexBuffer: edgeBuffer,
        count: mesh.edgeCount,
        strainColoring,
        l0: physics.l0,
        selectedIndex: selectedEdgeIndex,
        hoverIndex: hoverEdgeIndex,
        ...depthParams
      });

      // Draw vertices on top
      drawVertices({
        vertexBuffer,
        indexBuffer,
        count: mesh.vertexCount,
        pointSize,
        selectedIndex: selectedVertexIndex,
        hoverIndex: hoverVertexIndex,
        ...depthParams
      });

    },

    destroy() {
      vertexBuffer.destroy();
      edgeBuffer.destroy();
      faceBuffer.destroy();
      faceEdgeCountBuffer.destroy();
      indexBuffer.destroy();
    }
  };
}

// Triangulate faces using fan triangulation (works for convex polygons)
// Returns position data and edge count for each triangle (for coloring)
function triangulateFaces(mesh) {
  const faces = mesh.extractFaces();
  if (faces.length === 0) {
    return { triangleData: new Float32Array(0), edgeCounts: new Float32Array(0), triangleCount: 0 };
  }

  // Count total triangles needed
  let totalTriangles = 0;
  for (const face of faces) {
    if (face.length >= 3) {
      totalTriangles += face.length - 2;
    }
  }

  // Create triangle data (3 vertices * 3 components * triangleCount)
  const triangleData = new Float32Array(totalTriangles * 9);
  // Edge count per triangle vertex (for coloring)
  const edgeCounts = new Float32Array(totalTriangles * 3);
  const positions = mesh.positions;
  let offset = 0;
  let edgeOffset = 0;

  for (const face of faces) {
    if (face.length < 3) continue;

    const faceEdgeCount = face.length;

    // Fan triangulation from first vertex
    const v0 = face[0];
    const p0 = v0 * 3;

    for (let i = 1; i < face.length - 1; i++) {
      const v1 = face[i];
      const v2 = face[i + 1];
      const p1 = v1 * 3;
      const p2 = v2 * 3;

      // Triangle: v0, v1, v2
      triangleData[offset++] = positions[p0];
      triangleData[offset++] = positions[p0 + 1];
      triangleData[offset++] = positions[p0 + 2];
      triangleData[offset++] = positions[p1];
      triangleData[offset++] = positions[p1 + 1];
      triangleData[offset++] = positions[p1 + 2];
      triangleData[offset++] = positions[p2];
      triangleData[offset++] = positions[p2 + 1];
      triangleData[offset++] = positions[p2 + 2];

      // Store edge count for all 3 vertices of this triangle
      edgeCounts[edgeOffset++] = faceEdgeCount;
      edgeCounts[edgeOffset++] = faceEdgeCount;
      edgeCounts[edgeOffset++] = faceEdgeCount;
    }
  }

  return { triangleData, edgeCounts, triangleCount: totalTriangles };
}

function flattenEdges(mesh) {
  const data = new Float32Array(mesh.edgeCount * 6);
  const positions = mesh.positions;
  const edges = mesh.edges;

  for (let i = 0, j = 0; i < mesh.edgeCount; i++, j += 6) {
    const i2 = i * 2;
    const v0 = edges[i2];
    const v1 = edges[i2 + 1];
    const p0 = v0 * 3;
    const p1 = v1 * 3;

    data[j] = positions[p0];
    data[j + 1] = positions[p0 + 1];
    data[j + 2] = positions[p0 + 2];
    data[j + 3] = positions[p1];
    data[j + 4] = positions[p1 + 1];
    data[j + 5] = positions[p1 + 2];
  }

  return data;
}

function createDrawFaces(regl) {
  return regl({
    vert: `
      precision highp float;
      attribute vec3 position;
      attribute float edgeCount;
      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      varying float vEdgeCount;
      varying float vRadialDist;

      void main() {
        vEdgeCount = edgeCount;
        vRadialDist = length(position - uFocusCenter);
        gl_Position = projectionView * vec4(position, 1);
      }
    `,
    frag: `
      precision highp float;
      uniform float opacity;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vEdgeCount;
      varying float vRadialDist;

      // Color faces by edge count using distinct colors
      vec3 getFaceColor(float edges) {
        if (edges < 3.5) return vec3(1.0, 1.0, 0.5);       // Triangle: green
        if (edges < 4.5) return vec3(1.0, 0.6, 0.2);       // Quad: orange
        if (edges < 5.5) return vec3(0.2, 0.2, 1.0);       // Pentagon: blue
        if (edges < 6.5) return vec3(0.2, 0.8, 0.3);       // Hexagon: green
        if (edges < 7.5) return vec3(1.0, 0.3, 0.3);       // Heptagon: red
        return vec3(0.6, 0.2, 0.8);                         // Octagon+: purple
      }

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        vec3 color = getFaceColor(vEdgeCount);
        float falloff = depthFalloffFactor();
        // For reverse subtract (dst - src): output what to subtract from white
        // Subtracting (1 - color) * opacity tints toward the face color
        gl_FragColor = vec4(1.0 - color, opacity * falloff);
      }
    `,
    attributes: {
      position: (_, props) => ({
        buffer: props.faceBuffer,
        offset: 0,
        stride: 3 * 4
      }),
      edgeCount: (_, props) => ({
        buffer: props.faceEdgeCountBuffer,
        offset: 0,
        stride: 4
      })
    },
    uniforms: {
      opacity: (_, props) => props.faceOpacity ?? 0.3,
      uDepthFalloff: (_, props) => props.depthFalloff ?? 0,
      uFocusCenter: (_, props) => props.focusCenter ?? [0, 0, 0],
      uDepthFalloffWidth: (_, props) => props.depthFalloffWidth ?? 3,
      uMinOpacity: (_, props) => props.minOpacity ?? 0.1
    },
    blend: {
      enable: true,
      equation: {
        rgb: 'reverse subtract',
        alpha: 'add'
      },
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 'src alpha',
        dstRGB: 'one',
        dstAlpha: 'one'
      }
    },
    depth: {
      enable: true,
      mask: false
    },
    cull: {
      enable: false
    },
    primitive: 'triangles',
    count: (_, props) => props.count * 3
  });
}

function createDrawVertices(regl, icosphere) {
  const positions = regl.buffer(icosphere.positions);
  const cells = regl.elements(icosphere.cells);

  return regl({
    vert: `
      precision highp float;
      attribute vec3 icoPosition;
      attribute vec3 vertex;
      attribute float index;
      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      uniform float pointSize;
      uniform float selectedIndex, hoverIndex;
      varying float vIsSelected, vIsHover;
      varying float vRadialDist;

      void main() {
        vIsSelected = index == selectedIndex ? 1.0 : 0.0;
        vIsHover = index == hoverIndex ? 1.0 : 0.0;
        vRadialDist = length(vertex - uFocusCenter);
        vec4 p0 = projectionView * vec4(vertex, 1);
        float size = p0.z * pointSize;
        gl_Position = projectionView * vec4(vertex + icoPosition * size, 1);
      }
    `,
    frag: `
      precision highp float;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vIsSelected, vIsHover;
      varying float vRadialDist;

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        vec3 baseColor = vec3(0.14, 0.37, 0.69);
        vec3 hoverColor = vec3(0.0, 0.5, 0.0);
        vec3 selectColor = vec3(1.0, 0.0, 0.0);
        // Highlighted vertices (selected or hovered) always show at full opacity
        float isHighlighted = max(vIsSelected, vIsHover);
        // Use select color if selected, hover color if hovered, base color otherwise
        vec3 highlightColor = mix(hoverColor, selectColor, vIsSelected);
        vec3 color = mix(baseColor, highlightColor, isHighlighted);
        float falloff = mix(depthFalloffFactor(), 1.0, isHighlighted);
        // Fade toward white (background) based on radial distance
        color = mix(vec3(1.0), color, falloff);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    attributes: {
      icoPosition: positions,
      vertex: (_, props) => ({
        buffer: props.vertexBuffer,
        divisor: 1
      }),
      index: (_, props) => ({
        buffer: props.indexBuffer,
        divisor: 1
      })
    },
    elements: cells,
    cull: { enable: true, face: 'back' },
    uniforms: {
      pointSize: (ctx, props) => (ctx.pixelRatio * props.pointSize) / ctx.viewportHeight,
      selectedIndex: (_, props) => props.selectedIndex,
      hoverIndex: (_, props) => props.hoverIndex,
      uDepthFalloff: (_, props) => props.depthFalloff ?? 0,
      uFocusCenter: (_, props) => props.focusCenter ?? [0, 0, 0],
      uDepthFalloffWidth: (_, props) => props.depthFalloffWidth ?? 3,
      uMinOpacity: (_, props) => props.minOpacity ?? 0.2
    },
    primitive: 'triangles',
    count: icosphere.cells.length * 3,
    instances: (_, props) => props.count
  });
}

function createDrawEdges(regl) {
  // Create edge index buffer
  const edgeIndexBuffer = regl.buffer({ usage: 'dynamic', data: new Float32Array(65536) });

  return regl({
    vert: `
      precision highp float;

      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      uniform float uAspect, uScaleFactor, uPixelRatio, uL0, uStrainColoring;
      uniform float uBorderWidth, uLineWidth;
      uniform float uSelectedIndex, uHoverIndex;
      attribute vec3 aPosition, aNextPosition;
      attribute vec2 aLinePosition;
      attribute float aEdgeIndex;

      varying float vOffset;
      varying vec2 vStrokeEdges;
      varying vec3 vColor;
      varying float vRadialDist;
      varying float vIsSelected, vIsHover;

      vec2 lineNormal(vec4 p, vec4 n, float aspect) {
        return normalize((p.yx / p.w - n.yx / n.w) * vec2(1, aspect));
      }

      const float PI = 3.14159265359;

      vec3 colormap(float x) {
        float cx = clamp(x, 0.0, 1.0);
        return vec3(
          cos(PI * cx),
          cos(PI * (cx - 0.5)),
          cos(PI * (cx - 1.0))
        );
      }

      void main() {
        vIsSelected = aEdgeIndex == uSelectedIndex ? 1.0 : 0.0;
        vIsHover = aEdgeIndex == uHoverIndex ? 1.0 : 0.0;

        vec4 currentPoint = projectionView * vec4(aPosition, 1);
        vec4 nextPoint = projectionView * vec4(aNextPosition, 1);

        // Compute radial distance at the midpoint of the edge
        vec3 midpoint = mix(aPosition, aNextPosition, 0.5);
        vRadialDist = length(midpoint - uFocusCenter);

        float strain = (length(aNextPosition - aPosition) / uL0 - 1.0);
        vColor = colormap(0.5 + strain * uStrainColoring * 2.0) * 0.8 * (uStrainColoring > 0.0 ? 1.0 : 0.0);

        // Increase width for selected/hovered edges
        float widthMultiplier = 1.0 + vIsSelected * 0.5 + vIsHover * 0.25;
        float totalWidth = (uLineWidth + uBorderWidth * 2.0) * widthMultiplier;

        gl_Position = mix(currentPoint, nextPoint, aLinePosition.y);

        vec2 vn = lineNormal(currentPoint, nextPoint, uAspect);
        gl_Position.xy += vn / vec2(-uAspect, 1) * aLinePosition.x * totalWidth * gl_Position.w * uScaleFactor;

        vOffset = aLinePosition.x * totalWidth;
        vStrokeEdges = uBorderWidth < 1e-3 ? vec2(-100, -101) : (uLineWidth * widthMultiplier + vec2(-1, 1) / uPixelRatio);
      }
    `,
    frag: `
      precision highp float;

      uniform vec4 uBorderColor;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vOffset;
      varying vec3 vColor;
      varying vec2 vStrokeEdges;
      varying float vRadialDist;
      varying float vIsSelected, vIsHover;

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        // Highlighted edges (selected or hovered) always show at full opacity
        float isHighlighted = max(vIsSelected, vIsHover);
        float falloff = mix(depthFalloffFactor(), 1.0, isHighlighted);

        float t = smoothstep(vStrokeEdges.y, vStrokeEdges.x, vOffset) *
                  smoothstep(-vStrokeEdges.y, -vStrokeEdges.x, vOffset);

        // Color selected edges red, hovered edges green
        vec3 selectColor = vec3(1.0, 0.0, 0.0);
        vec3 hoverColor = vec3(0.0, 0.5, 0.0);
        vec3 baseColor = vColor;
        vec3 highlightColor = mix(hoverColor, selectColor, vIsSelected);
        vec3 innerColor = mix(baseColor, highlightColor, isHighlighted);

        vec3 color = mix(uBorderColor.rgb, innerColor, t);
        float alpha = mix(uBorderColor.a, 1.0, t) * falloff;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 'one',
        dstRGB: 'one minus src alpha',
        dstAlpha: 'one'
      }
    },
    polygonOffset: {
      enable: true,
      offset: { factor: 2, units: 2 }
    },
    attributes: {
      aLinePosition: [[-1, 0], [1, 0], [-1, 1], [1, 1]],
      aPosition: (_, props) => ({
        buffer: props.vertexBuffer,
        offset: 0,
        stride: 6 * 4,
        divisor: 1
      }),
      aNextPosition: (_, props) => ({
        buffer: props.vertexBuffer,
        offset: 3 * 4,
        stride: 6 * 4,
        divisor: 1
      }),
      aEdgeIndex: (_, props) => {
        // Update edge index buffer with sequential indices
        const indices = new Float32Array(props.count);
        for (let i = 0; i < props.count; i++) indices[i] = i;
        edgeIndexBuffer.subdata(indices);
        return {
          buffer: edgeIndexBuffer,
          divisor: 1
        };
      }
    },
    elements: [[0, 1, 2], [1, 3, 2]],
    uniforms: {
      uL0: (_, props) => props.l0 ?? 1,
      uStrainColoring: (_, props) => props.strainColoring ?? 0,
      uBorderColor: [1, 1, 1, 0.8],
      uLineWidth: 2,
      uBorderWidth: 1,
      uAspect: ctx => ctx.viewportWidth / ctx.viewportHeight,
      uScaleFactor: ctx => ctx.pixelRatio / ctx.viewportHeight,
      uPixelRatio: regl.context('pixelRatio'),
      uDepthFalloff: (_, props) => props.depthFalloff ?? 0,
      uFocusCenter: (_, props) => props.focusCenter ?? [0, 0, 0],
      uDepthFalloffWidth: (_, props) => props.depthFalloffWidth ?? 3,
      uMinOpacity: 0.2,
      uSelectedIndex: (_, props) => props.selectedIndex ?? -1,
      uHoverIndex: (_, props) => props.hoverIndex ?? -1
    },
    primitive: 'triangles',
    instances: (_, props) => props.count,
    count: 6
  });
}

export default createMeshRenderer;
