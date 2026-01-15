// Zoomable axes helper - manages d3.zoom and computes view matrices
// Rendering-agnostic: knows nothing about regl, WebGL, or SVG rendering

export function createZoomableAxes({
  d3,  // Pass d3 via dependency injection
  element,
  xScale,  // Required: scale object (d3 scale or Plot scale descriptor)
  yScale,  // Required: scale object (d3 scale or Plot scale descriptor)
  aspectRatio = null,  // If set, enforce this aspect ratio (1 = square, height/width in data units per pixel)
  scaleExtent = [0.1, 100],
  onChange = () => {}
}) {
  // Helper to read from scale (supports both d3 scales and Plot scale descriptors)
  const getDomain = (scale) => typeof scale.domain === 'function' ? scale.domain() : scale.domain;
  const getRange = (scale) => typeof scale.range === 'function' ? scale.range() : scale.range;

  // Extract initial domains from scales
  const initialXDomain = getDomain(xScale);
  const initialYDomain = getDomain(yScale);

  // Dynamic range getters (always read from scales)
  function getXRange() {
    return getRange(xScale);
  }
  function getYRange() {
    return getRange(yScale);
  }

  // Enforce aspect ratio on domains (adjusts yDomain to match xDomain)
  function enforceAspectRatio(xd, yd) {
    if (aspectRatio == null) return [xd, yd];

    const xr = getXRange();
    const yr = getYRange();
    const pixelWidth = Math.abs(xr[1] - xr[0]);
    const pixelHeight = Math.abs(yr[1] - yr[0]);

    // Calculate what yDomain height should be for the given xDomain
    const xDataWidth = xd[1] - xd[0];
    const targetYDataHeight = (xDataWidth * pixelHeight) / (pixelWidth * aspectRatio);

    // Center the new yDomain around the current center
    const yCenter = (yd[0] + yd[1]) / 2;
    const newYDomain = [yCenter - targetYDataHeight / 2, yCenter + targetYDataHeight / 2];

    return [xd, newYDomain];
  }

  // Store the original initial x domain as the fixed reference for zoom limits
  // (y domain varies with aspect ratio, so we only track x)
  const baseXDomain = [...initialXDomain];

  // State (apply aspect ratio to initial domains)
  let [xDomain, yDomain] = enforceAspectRatio([...initialXDomain], [...initialYDomain]);

  // Pre-allocated matrices (reused to avoid GC)
  const view = new Float32Array(16);
  const viewInverse = new Float32Array(16);

  // Compute orthographic view matrix from domains
  function updateMatrices() {
    ortho(view, xDomain[0], xDomain[1], yDomain[0], yDomain[1], -1, 1);
    invert(viewInverse, view);
  }

  // Initialize matrices
  updateMatrices();

  // Compute base Y domain dynamically based on current pixel dimensions
  function getBaseYDomain() {
    const [, baseYDomain] = enforceAspectRatio([...baseXDomain], [...initialYDomain]);
    return baseYDomain;
  }

  // D3 scales for zoom transform - x domain is fixed, y domain computed dynamically
  const xScaleD3 = d3.scaleLinear().domain(baseXDomain).range(getXRange());
  const yScaleD3 = d3.scaleLinear().domain(getBaseYDomain()).range(getYRange());

  // Sync internal d3 scale ranges and recompute base y domain for new pixel dimensions
  function syncRanges() {
    xScaleD3.range(getXRange());
    yScaleD3.domain(getBaseYDomain()).range(getYRange());
  }

  // Compute the zoom transform that maps from base domain to current domain
  // Uses x as the primary zoom factor since y may be adjusted by aspect ratio enforcement
  function computeTransform() {
    // Scale factor based on x domain (primary zoom direction)
    const k = (baseXDomain[1] - baseXDomain[0]) / (xDomain[1] - xDomain[0]);
    // Translation: position current domain correctly in screen space
    const tx = xScaleD3.range()[0] - k * xScaleD3(xDomain[0]);
    const ty = yScaleD3.range()[0] - k * yScaleD3(yDomain[0]);
    return d3.zoomIdentity.translate(tx, ty).scale(k);
  }

  // Zoom extent as a function (reads current ranges)
  function getExtent() {
    const xr = getXRange();
    const yr = getYRange();
    return [[xr[0], yr[1]], [xr[1], yr[0]]];
  }

  // Set up d3.zoom
  const selection = d3.select(element)
    .attr("id", "zoom-target")
    .style("cursor", "grab");

  const zoom = d3.zoom()
    .scaleExtent(scaleExtent)
    .extent(getExtent)
    .on("start", () => selection.style("cursor", "grabbing"))
    .on("end", () => selection.style("cursor", "grab"))
    .on("zoom", (event) => {
      syncRanges();  // Keep internal scales in sync with external scale ranges
      xDomain = event.transform.rescaleX(xScaleD3).domain();
      yDomain = event.transform.rescaleY(yScaleD3).domain();
      updateMatrices();
      onChange({ xDomain, yDomain, xRange: getXRange(), yRange: getYRange() });
    });

  selection
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity);  // Reset transform to match initial domain

  // Return the axes object
  const axes = {
    get xDomain() { return xDomain; },
    get yDomain() { return yDomain; },
    get xRange() { return getXRange(); },
    get yRange() { return getYRange(); },
    get view() { return view; },
    get viewInverse() { return viewInverse; },
    get xScale() { return xScaleD3.copy().domain(xDomain); },
    get yScale() { return yScaleD3.copy().domain(yDomain); },
    // Update the external scales (for resize) - preserves current zoom level
    updateScales(newXScale, newYScale) {
      xScale = newXScale;
      yScale = newYScale;
      syncRanges();
      // Re-enforce aspect ratio with new pixel dimensions, preserving current view
      [xDomain, yDomain] = enforceAspectRatio(xDomain, yDomain);
      // Compute transform that represents current zoom relative to base domain
      // This preserves absolute zoom limits across resize
      const transform = computeTransform();
      selection.call(zoom.transform, transform);
      // Recompute matrices with updated domains
      updateMatrices();
      // Notify listeners of the domain change
      onChange({ xDomain, yDomain, xRange: getXRange(), yRange: getYRange() });
    },
    // Reset zoom to initial (base) domain
    reset() {
      syncRanges();
      [xDomain, yDomain] = enforceAspectRatio([...baseXDomain], [...initialYDomain]);
      selection.call(zoom.transform, d3.zoomIdentity);
      updateMatrices();
      onChange({ xDomain, yDomain, xRange: getXRange(), yRange: getYRange() });
    }
  };

  return axes;
}

// Inline mat4 helpers to avoid gl-matrix dependency in this module

function ortho(out, left, right, bottom, top, near, far) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

function invert(out, a) {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) return null;
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}
