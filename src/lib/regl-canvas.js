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

export function reglAxesViewport(axes) {
  return (context, props) => ({
    x: Math.min(axes.xRange[0], axes.xRange[1]) * context.pixelRatio,
    y: context.framebufferHeight - Math.max(axes.yRange[0], axes.yRange[1]) * context.pixelRatio,
    width: Math.abs(axes.xRange[1] - axes.xRange[0]) * context.pixelRatio,
    height: Math.abs(axes.yRange[0] - axes.yRange[1]) * context.pixelRatio
  });
}

export function reglElement(createREGL, {
  pixelRatio=devicePixelRatio,
  extensions=[],
  attributes={},
  optionalExtensions=[],
  profile=false,
}={}) {
  return function ({current, width, height}) {
    if (!current) {
      console.log('instantiate regl');
      current = reglCanvas(createREGL, {
        extensions,
        optionalExtensions,
        profile,
        attributes,
        pixelRatio,
      });
    }
    current.width = width * pixelRatio;
    current.height = height * pixelRatio;
    current.style.width = `${width}px`;
    current.style.height = `${height}px`;
    return current;
  };
}

