// Creates a vector/line drawing command with arrowheads
// Usage: createDrawVectors(regl) => drawVectors command
export function createDrawVectors(regl) {
  return regl({
    vert: `
      precision highp float;
      uniform mat4 projection, view;
      uniform float uLineWidth, uAspect;
      uniform vec2 uArrowheadShape;
      attribute vec3 aVertex, aNextVertex;
      attribute vec4 aLine;

      void main () {
        mat4 projView = projection * view;
        vec4 p = projView * vec4(aVertex, 1);
        vec4 n = projView * vec4(aNextVertex, 1);
        gl_Position = mix(p, n, aLine.y);

        vec2 unitVector = normalize((p.xy / p.w  - n.xy / n.w) * vec2(uAspect, 1));

        gl_Position.xy += (
            vec2(-unitVector.y, unitVector.x) * (aLine.x * uLineWidth + aLine.w * uArrowheadShape.y) +
            -unitVector * aLine.z * uArrowheadShape.x
          ) *
          vec2(1.0 / uAspect, 1) * gl_Position.w;
      }
    `,
    frag: `
      precision highp float;
      uniform vec4 uColor;
      void main () {
        gl_FragColor = uColor;
      }
    `,
    attributes: {
      aVertex: {
        buffer: regl.prop('vertices'),
        divisor: 1,
        stride: 24,
      },
      aNextVertex: {
        buffer: regl.prop('vertices'),
        divisor: 1,
        offset: 12,
        stride: 24,
      },
      aLine: new Float32Array([
        -1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, -1, 0,

        -1, 0, 0, 0,
        1, 1, -1, 0,
        -1, 1, -1, 0,

        0, 1, -1, -1,
        0, 1, -1, 1,
        0, 1, 0, 0,
      ]),
    },
    depth: {
      enable: (ctx, props) => props.depth !== false
    },
    uniforms: {
      projection: regl.context('projection'),
      view: regl.context('view'),
      uLineWidth: (ctx, props) => (props.lineWidth || 1.0) / ctx.framebufferHeight * ctx.pixelRatio,
      uArrowheadShape: (ctx, props) => [
        (props.arrowheadLength || 14) / ctx.framebufferHeight * ctx.pixelRatio * 2.0,
        (props.arrowheadWidth || 8) / ctx.framebufferHeight * ctx.pixelRatio
      ],
      uAspect: ctx => ctx.framebufferWidth / ctx.framebufferHeight,
      uColor: (ctx, props) => props.lineColor || [0, 0, 0, 1],
    },
    primitive: 'triangles',
    instances: (ctx, props) => props.count,
    count: 9,
  });
}
