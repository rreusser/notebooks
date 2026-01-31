// Main sphere eversion driver
// Combines camera, drawing, and animation state

import { createCamera } from './camera.js';
import { createDrawSphere } from './draw-sphere.js';
import { Smoother } from './smoother.js';

export function createEversion(regl, options = {}) {
  const {
    dpi = Math.min(window.devicePixelRatio, 2),
    resolution = 150,
    far = 10.0,
    phi = 0.7,
    wheel = false,
  } = options;

  function getAspectRatio() {
    return regl._gl.canvas.offsetWidth / regl._gl.canvas.offsetHeight;
  }

  const ar = getAspectRatio();
  let scale = ar > 1.0 ? 1.0 : ar;

  const camera = createCamera(regl, {
    distance: 6,
    damping: 0,
    near: 0.1,
    far,
    theta: 0.1,
    phi,
    noScroll: true,
    wheel,
  });

  const drawSphere = createDrawSphere(regl, resolution);

  let dirty = true;
  let state = {
    section: 10,
    color: 0.0,
    n: 2,
    rotation: 0,
    translation: 0,
    scale: 0.5,
    stereo: 1,
    posClip: 1,
    negClip: 1,
    fatEdge: 0,
    strips: 0,
    shittyEversion: 0,
    t: 1.5,
    alpha: 1e-5,
    beta: 1,
    q: 2/3,
    eta: 1,
    xi: 0,
    lambda: 0,
    omega: 2,
    Qinv: 1.5,
  };

  // Resize handler
  function onResize() {
    const canvas = regl._gl.canvas;
    canvas.width = Math.floor(dpi * canvas.offsetWidth);
    canvas.height = Math.floor(dpi * canvas.offsetHeight);
    camera.taint();
    const ar = getAspectRatio();
    scale = ar > 1.0 ? 1.0 : ar;
    dirty = true;
  }

  window.addEventListener('resize', onResize);

  let frame = regl.frame(() => {
    try {
      camera((cameraState) => {
        if (!dirty && !cameraState.dirty) return;

        regl.clear({ color: [1, 1, 1, 1] });

        const props = { ...state, scale: state.scale * scale };
        drawSphere({ wire: false, ...props });
        drawSphere({ wire: true, ...props });

        dirty = false;
      });
    } catch (e) {
      console.error(e);
      if (frame) {
        frame.cancel();
        frame = null;
      }
    }
  });

  return {
    setState(newState) {
      Object.assign(state, newState);
      dirty = true;
    },
    getState() {
      return state;
    },
    redraw() {
      dirty = true;
    },
    destroy() {
      window.removeEventListener('resize', onResize);
      camera.destroy();
      if (frame) {
        frame.cancel();
        frame = null;
      }
    },
  };
}

// Create a complete scrollytelling sphere eversion
export function createScrollytellingEversion(container, sequencer, options = {}) {
  const {
    dpi = Math.min(window.devicePixelRatio, 2),
    resolution = 150,
    preserveDrawingBuffer = false,
  } = options;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    cursor: grab;
  `;
  container.appendChild(canvas);

  // Create regl context
  const regl = window.createREGL({
    canvas,
    pixelRatio: dpi,
    extensions: ['OES_standard_derivatives'],
    attributes: {
      preserveDrawingBuffer,
    },
  });

  // Initial resize
  canvas.width = Math.floor(dpi * container.offsetWidth);
  canvas.height = Math.floor(dpi * container.offsetHeight);

  const eversion = createEversion(regl, {
    dpi,
    resolution,
    phi: 0.4,
    wheel: false,
  });

  // Update state from sequencer
  function updateFromSequencer() {
    const state = sequencer.getState();
    eversion.setState(state);
  }

  updateFromSequencer();

  return {
    ...eversion,
    canvas,
    regl,
    updateFromSequencer,
    destroy() {
      eversion.destroy();
      regl.destroy();
      canvas.remove();
    },
  };
}
