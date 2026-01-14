/**
 * Creates an element stack that manages multiple layered elements.
 * Supports two-phase initialization: pass an existing container to reuse elements.
 */
export function createElementStack({
  container = null,  // Optional: existing container to reuse
  width = 1,
  height = 1,
  layers = {}
} = {}) {
  // Create or reuse container
  const isNewContainer = !container;
  if (!container) {
    container = document.createElement("div");
  }
  container.style.position = "relative";
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  // Store state on container for reuse across reactive updates
  container._width = width;
  container._height = height;
  container._layerDefs = { ...layers };
  container._elements = container._elements || {};

  const _elements = container._elements;

  // Render a layer, reusing existing element if available
  function renderLayer(label, extraProps = {}) {
    const layerDef = container._layerDefs[label];
    if (!layerDef) return null;

    const layer = typeof layerDef === "function" ? layerDef : layerDef.layer;
    const current = _elements[label] || null;
    const newEl = layer({ current, width: container._width, height: container._height, ...extraProps });

    newEl.setAttribute("data-layer", label);
    if (!newEl.style.position) newEl.style.position = "absolute";

    if (current && current !== newEl) {
      current.replaceWith(newEl);
    } else if (!current) {
      container.appendChild(newEl);
    }

    _elements[label] = newEl;
    return newEl;
  }

  // Initial render of all layers
  for (const label of Object.keys(container._layerDefs)) {
    renderLayer(label);
  }

  // Create or update stack instance on container
  if (!container._stack) {
    container._stack = {
      // The container element (for display)
      get element() { return container; },

      // Current dimensions
      get width() { return container._width; },
      get height() { return container._height; },

      // Access layer elements
      get elements() { return _elements; },

      // Update specific layers with new props
      update(layerUpdates) {
        for (const [label, props] of Object.entries(layerUpdates)) {
          const extraProps = typeof props === "object" && props !== null ? props : {};
          renderLayer(label, extraProps);
        }
        container.dispatchEvent(new CustomEvent("update"));
        return container._stack;
      },

      // Resize all layers
      resize(newWidth, newHeight) {
        container._width = newWidth;
        container._height = newHeight;
        container.style.width = `${newWidth}px`;
        container.style.height = `${newHeight}px`;

        // Render all layers at new size
        for (const label of Object.keys(container._layerDefs)) {
          renderLayer(label);
        }
        container.dispatchEvent(new CustomEvent("update"));
        return container._stack;
      },

      // Add event listener to container
      addEventListener: (...args) => container.addEventListener(...args),
      removeEventListener: (...args) => container.removeEventListener(...args),
      dispatchEvent: (...args) => container.dispatchEvent(...args),
    };
  } else {
    // Update existing stack's layer definitions and re-render
    container._layerDefs = { ...layers };
    for (const label of Object.keys(container._layerDefs)) {
      renderLayer(label);
    }
  }

  return container._stack;
}
