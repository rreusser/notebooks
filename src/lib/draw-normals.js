// Creates a normal vector drawing command with arrowheads
// Usage: createDrawNormals(regl) => drawNormals command
// Draws arrows from each vertex in the direction of the normal
export function createDrawNormals(regl) {
  const DARK_BLUE = [0.475 * 0.2, 0.588 * 0.2, 0.690 * 0.2, 1];

  return regl({
    vert: `
      precision highp float;
      uniform mat4 projection, view;
      uniform float uLineWidth, uAspect, uScale;
      uniform vec2 uArrowheadShape;
      attribute vec3 aVertex, aNormal;
      attribute vec4 aLine;

      void main () {
        mat4 projView = projection * view;
        vec4 p = projView * vec4(aVertex, 1);
        vec4 pn = projView * vec4(aVertex + uScale * aNormal, 1);
        gl_Position = mix(p, pn, aLine.y);

        vec2 unitVector = normalize((pn.xy / pn.w  - p.xy / p.w) * vec2(uAspect, 1));

        gl_Position.xy += (
            vec2(-unitVector.y, unitVector.x) * (aLine.x * uLineWidth + aLine.w * uArrowheadShape.y) +
            + unitVector * aLine.z * uArrowheadShape.x
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
        divisor: 2,
        stride: 12,
      },
      aNormal: {
        buffer: regl.prop('normals'),
        divisor: 2,
        stride: 12,
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
      uColor: (ctx, props) => props.lineColor || DARK_BLUE,
      uScale: (ctx, props) => props.scale || 1.0,
    },
    primitive: 'triangles',
    instances: (ctx, props) => props.count * 2,
    count: 9,
  });
}
