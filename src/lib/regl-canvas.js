export default function reglCanvas(currentCanvas, opts) {
  opts = opts || {};
  const w = opts.width || width;
  const h = opts.height || Math.floor(w * 0.5);

  function normalizeConfig(opts) {
    const normalized = Object.assign(
      {},
      {
        pixelRatio: devicePixelRatio,
        attributes: {},
        extensions: [],
        optionalExtensions: [],
        profile: false
      },
      opts || {}
    );
    delete normalized.width;
    delete normalized.height;
    return normalized;
  }

  const config = normalizeConfig(opts);

  function preserveExisting(canvas, newConfig) {
    const currentConfig = canvas.config;
    if (JSON.stringify(currentConfig) !== JSON.stringify(newConfig)) {
      return false;
    }
    return canvas;
  }

  function resizeCanvas(canvas, width, height) {
    if (width) {
      canvas.width = Math.floor(width * config.pixelRatio);
      canvas.style.width = `${Math.floor(width)}px`;
    }
    if (height) {
      canvas.height = Math.floor(height * config.pixelRatio);
      canvas.style.height = `${Math.floor(height)}px`;
    }
  }

  if (currentCanvas) {
    if (!(currentCanvas instanceof HTMLCanvasElement)) {
      throw new Error(
        "Unexpected first argument type. Did you forget to pass `this` as the first argument?"
      );
    }
    resizeCanvas(currentCanvas, w, h);
    const existing = preserveExisting(currentCanvas, config);
    if (existing) return existing;
  }

  const canvas = document.createElement("canvas");
  // Clone the options since canvas creation mutates the `attributes` object,
  // causing false positives when we then use it to detect changed config.
  const style = config.style;
  delete config.style;
  const regl = opts.createREGL({ canvas, ...JSON.parse(JSON.stringify(config)) });
  resizeCanvas(canvas, w, h);
  canvas.value = regl;
  canvas.config = config;

  if (style) {
    for (const [prop, value] of Object.entries(style)) {
      if (canvas.style[prop] !== value) canvas.style[prop] = value;
    }
  }

  return canvas;
}
