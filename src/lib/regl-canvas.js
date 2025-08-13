// lib/regl.js
export function reglCanvas(createREGL, props={}) {
  const dpi = props.pixelRatio ?? window.devicePixelRatio;
  const canvas = document.createElement('canvas');
  const regl = createREGL({...props, canvas});
  regl.attachResize = (width, height) => {
    regl.poll();
    canvas.width = Math.round(width * dpi);
    canvas.height = Math.round(height * dpi);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    return regl;
  }
  canvas.value = regl;
  return canvas;
}
