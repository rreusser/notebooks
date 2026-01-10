export function initializeElementStack() {
  const container = document.createElement("div");
  container.style.position = "relative";
  return container;
}

export function createElementStack({
  container = null,
  width = null,
  height = null,
  layers = {},
  onResize = null
} = {}
) {
  container = container ?? initializeElementStack();
  const handler = container.getAttribute('data-on-resize');
  if (onResize && !handler) {
    const observer = new ResizeObserver(([{ contentRect }]) => {
      onResize({ layers: container.value, rect: contentRect });
      container.dispatchEvent(new CustomEvent("input"));
    });
    observer.observe(container);
    container.setAttribute('data-on-resize', onResize);
  }
  const stack = {};
  let defaultZindex = 0;
  for (const [label, props] of Object.entries(layers)) {
    const layer = typeof props === "function" ? props : props.layer;
    const id = `element-stack-layer-${label}`;
    const current = container.querySelector(`#${id}`);
    const newEl = layer({ current, width, height });
    newEl.setAttribute("id", id);
    if (!newEl.style.position) newEl.style.position = "absolute";
    stack[label] = newEl;
    if (current) {
      current.replaceWith(newEl);
    } else {
      container.appendChild(newEl);
    }
  }
  if (width) container.style.width = `${width}px`;
  if (height) container.style.height = `${height}px`;
  container.value = stack;
  return container;
}

export function createAxisConfiguration(mat4, regl) {
  const { create: mat4create, invert: mat4invert, ortho: mat4ortho } = mat4;
  const configureAxes = regl({
    uniforms: {
      view: regl.prop("view"),
      viewInverse: regl.prop("viewInverse")
    },
    context: {
      view: regl.prop("view"),
      viewInverse: regl.prop("viewInverse")
    },
    scissor: {
      enable: true,
      box: {
        x: ({ pixelRatio }, { xRange: [xmin, xmax] }) => xmin * pixelRatio,
        y: ({ pixelRatio, framebufferHeight }, { yRange: [ymax, ymin] }) =>
          framebufferHeight - ymax * pixelRatio,
        width: ({ pixelRatio }, { xRange: [xmin, xmax] }) =>
          (xmax - xmin) * pixelRatio,
        height: ({ pixelRatio }, { yRange: [ymax, ymin] }) =>
          (ymax - ymin) * pixelRatio
      }
    },
    viewport: {
      x: ({ pixelRatio }, { xRange: [xmin, xmax] }) => xmin * pixelRatio,
      y: ({ pixelRatio, framebufferHeight }, { yRange: [ymax, ymin] }) =>
        framebufferHeight - ymax * pixelRatio,
      width: ({ pixelRatio }, { xRange: [xmin, xmax] }) =>
        (xmax - xmin) * pixelRatio,
      height: ({ pixelRatio }, { yRange: [ymax, ymin] }) =>
        (ymax - ymin) * pixelRatio
    }
  });

  const view = mat4create();
  const viewInverse = mat4create();

  return function (xScale, yScale, callback) {
    mat4ortho(view, ...xScale.domain, ...yScale.domain, -1, 1);
    mat4invert(viewInverse, view);
    configureAxes(
      { view, viewInverse, xRange: xScale.range, yRange: yScale.range },
      callback
    );
  };
}
