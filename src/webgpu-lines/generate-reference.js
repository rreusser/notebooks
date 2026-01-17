/**
 * Generate reference shader code from regl-gpu-lines for comparison
 */
import createDrawLines from '/Users/rreusser/gh/rreusser/regl-gpu-lines/src/index.js';
import createREGL from 'regl';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><canvas></canvas>');
const canvas = dom.window.document.querySelector('canvas');

// Create a mock regl context
const regl = createREGL({
  canvas,
  extensions: ['ANGLE_instanced_arrays']
});

// Create lines with round joins and round caps
const drawLines = createDrawLines(regl, {
  vert: `
    precision highp float;
    #pragma lines: attribute vec2 xy
    #pragma lines: position = getPosition(xy)
    vec4 getPosition(vec2 xy) {
      return vec4(xy, 0.0, 1.0);
    }
    #pragma lines: width = getWidth()
    float getWidth() { return 40.0; }
  `,
  frag: `
    precision highp float;
    void main() {
      gl_FragColor = vec4(1.0);
    }
  `,
  join: 'round',
  cap: 'round',
  joinResolution: 8,
  capResolution: 8
});

// Access the generated shaders
console.log('=== VERTEX SHADER ===');
console.log(drawLines.verts.main);
console.log('\n=== FRAGMENT SHADER ===');
console.log(drawLines.frags.main);

regl.destroy();
