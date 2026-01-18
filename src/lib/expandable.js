/**
 * Creates an expandable wrapper for content that can pop out to cover more of the page.
 *
 * @param {HTMLElement|string} content - The content element to wrap
 * @param {Object} options - Configuration options
 * @param {number} options.width - Default width when collapsed
 * @param {number} options.height - Default height when collapsed
 * @param {number[]} [options.toggleOffset=[8,8]] - Offset [right, top] for the toggle button
 * @param {number|number[]} [options.margin=0] - Margin from viewport edge when expanded. Single number or [horizontal, vertical].
 * @param {number|number[]} [options.padding=0] - Padding inside the expanded container. Single number or [horizontal, vertical].
 * @param {Function} [options.onResize] - Optional callback when dimensions change: (content, width, height, expanded) => void
 * @param {string|HTMLElement|Array<string|HTMLElement>} [options.controls] - Controls to float over expanded content.
 *   Can be a CSS selector string, an HTMLElement, or an array of either.
 * @returns {HTMLElement} The expandable container
 */
export function expandable(content, { width, height, toggleOffset = [8, 8], margin = 0, padding = 0, onResize, controls }) {
  let expanded = false;
  let currentWidth = width;
  let currentHeight = height;
  let controlsPanelExpanded = false;
  let controlsPanelPosition = { x: 16, y: 16 };
  let floatingPanel = null;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  // Normalize controls to array
  const controlsArray = controls
    ? (Array.isArray(controls) ? controls : [controls])
    : [];

  // Track original locations of controls for restoration (one entry per control)
  const controlsState = [];

  // MutationObserver to detect when Observable recreates elements while expanded
  let controlsObserver = null;

  // Outer container maintains document flow
  const container = document.createElement('div');
  container.className = 'expandable-container';
  container.style.cssText = `
    position: relative;
    width: 100%;
  `;

  // Content wrapper - positions the content
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'expandable-content';
  contentWrapper.style.cssText = `
    position: relative;
    display: inline-block;
    z-index: 1;
  `;

  // Overlay backdrop for expanded state
  const overlay = document.createElement('div');
  overlay.className = 'expandable-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 9998;
  `;
  overlay.addEventListener('click', () => collapse());

  // Create floating panel for controls (created once, reused)
  if (controlsArray.length > 0) {
    floatingPanel = document.createElement('div');
    floatingPanel.className = 'expandable-controls-panel';
    floatingPanel.style.cssText = `display: none;`;

    // Draggable header
    const panelHeader = document.createElement('div');
    panelHeader.className = 'expandable-controls-header';
    panelHeader.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      background: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      cursor: move;
      user-select: none;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 500;
      color: #555;
    `;

    const panelTitle = document.createElement('span');
    panelTitle.textContent = 'Controls';

    const panelToggle = document.createElement('button');
    panelToggle.className = 'expandable-controls-toggle';
    panelToggle.innerHTML = '▼';
    panelToggle.title = 'Collapse controls';
    panelToggle.style.cssText = `
      border: none;
      background: none;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.15s ease;
    `;
    panelToggle.addEventListener('mouseenter', () => {
      panelToggle.style.background = 'rgba(0,0,0,0.1)';
    });
    panelToggle.addEventListener('mouseleave', () => {
      panelToggle.style.background = 'none';
    });
    panelToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleControlsPanel();
    });

    panelHeader.appendChild(panelTitle);
    panelHeader.appendChild(panelToggle);

    // Content area
    const panelContent = document.createElement('div');
    panelContent.className = 'expandable-controls-content';
    panelContent.style.cssText = `
      padding: 12px;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
      gap: 16px;
    `;

    floatingPanel.appendChild(panelHeader);
    floatingPanel.appendChild(panelContent);

    // Drag functionality
    panelHeader.addEventListener('mousedown', (e) => {
      if (e.target === panelToggle) return;
      isDragging = true;
      dragStart.x = e.clientX - controlsPanelPosition.x;
      dragStart.y = e.clientY - controlsPanelPosition.y;
      panelHeader.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      controlsPanelPosition.x = e.clientX - dragStart.x;
      controlsPanelPosition.y = e.clientY - dragStart.y;
      clampPanelPosition();
      updatePanelPosition();
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        const header = floatingPanel?.querySelector('.expandable-controls-header');
        if (header) header.style.cursor = 'move';
      }
    });

    // Touch support
    panelHeader.addEventListener('touchstart', (e) => {
      if (e.target === panelToggle) return;
      isDragging = true;
      const touch = e.touches[0];
      dragStart.x = touch.clientX - controlsPanelPosition.x;
      dragStart.y = touch.clientY - controlsPanelPosition.y;
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      controlsPanelPosition.x = touch.clientX - dragStart.x;
      controlsPanelPosition.y = touch.clientY - dragStart.y;
      clampPanelPosition();
      updatePanelPosition();
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  function clampPanelPosition() {
    if (!floatingPanel) return;
    const rect = floatingPanel.getBoundingClientRect();
    controlsPanelPosition.x = Math.max(0, Math.min(controlsPanelPosition.x, window.innerWidth - rect.width));
    controlsPanelPosition.y = Math.max(0, Math.min(controlsPanelPosition.y, window.innerHeight - rect.height));
  }

  function updatePanelPosition() {
    if (floatingPanel && expanded) {
      floatingPanel.style.left = `${controlsPanelPosition.x}px`;
      floatingPanel.style.top = `${controlsPanelPosition.y}px`;
    }
  }

  function toggleControlsPanel() {
    controlsPanelExpanded = !controlsPanelExpanded;
    if (!floatingPanel) return;
    const content = floatingPanel.querySelector('.expandable-controls-content');
    const toggle = floatingPanel.querySelector('.expandable-controls-toggle');
    if (controlsPanelExpanded) {
      if (content) content.style.display = 'flex';
      if (toggle) {
        toggle.innerHTML = '▼';
        toggle.title = 'Collapse controls';
      }
    } else {
      if (content) content.style.display = 'none';
      if (toggle) {
        toggle.innerHTML = '▶';
        toggle.title = 'Expand controls';
      }
    }
  }

  // Restore all controls to their original locations
  function restoreControls() {
    // Restore in reverse order to maintain correct sibling relationships
    for (let i = controlsState.length - 1; i >= 0; i--) {
      const state = controlsState[i];
      if (!state) continue;

      // Remove placeholder if it exists
      if (state.placeholder && state.placeholder.parentNode) {
        state.placeholder.parentNode.removeChild(state.placeholder);
      }

      // Check if Observable recreated this element while we had it in the panel
      // If a new element with the same selector exists, don't restore the stale one
      if (state.selector) {
        const existingElement = document.querySelector(state.selector);
        if (existingElement && existingElement !== state.element) {
          // Observable created a new element - just remove our stale one from panel
          if (state.element.parentNode) {
            state.element.parentNode.removeChild(state.element);
          }
          continue;
        }
      }

      // Move control back to original location
      if (state.element && state.originalParent) {
        if (state.originalNextSibling) {
          state.originalParent.insertBefore(state.element, state.originalNextSibling);
        } else {
          state.originalParent.appendChild(state.element);
        }
      }
    }
    controlsState.length = 0;
  }

  // Start observing for element recreation (Observable reactivity)
  function startControlsObserver() {
    if (controlsObserver) return;

    controlsObserver = new MutationObserver((mutations) => {
      if (!expanded || !floatingPanel) return;

      const panelContent = floatingPanel.querySelector('.expandable-controls-content');
      if (!panelContent) return;

      // Check each selector-based control for recreation
      for (const state of controlsState) {
        if (!state.selector) continue;

        // Look for a new element matching the selector that isn't our current one
        const newElement = document.querySelector(state.selector);
        if (newElement && newElement !== state.element && !panelContent.contains(newElement)) {
          // Observable recreated this element - swap it into the panel
          const oldElement = state.element;

          // Update state to track new element
          state.element = newElement;
          state.originalParent = newElement.parentNode;
          state.originalNextSibling = newElement.nextSibling;

          // Create new placeholder for the new element's location
          const newPlaceholder = document.createElement('div');
          newPlaceholder.className = 'expandable-controls-placeholder';
          newPlaceholder.style.display = 'none';
          newElement.parentNode.insertBefore(newPlaceholder, newElement);

          // Remove old placeholder
          if (state.placeholder && state.placeholder.parentNode) {
            state.placeholder.parentNode.removeChild(state.placeholder);
          }
          state.placeholder = newPlaceholder;

          // Move new element to panel where old one was
          if (oldElement.parentNode === panelContent) {
            panelContent.insertBefore(newElement, oldElement);
            panelContent.removeChild(oldElement);
          } else {
            panelContent.appendChild(newElement);
          }
        }
      }
    });

    controlsObserver.observe(document.body, { childList: true, subtree: true });
  }

  function stopControlsObserver() {
    if (controlsObserver) {
      controlsObserver.disconnect();
      controlsObserver = null;
    }
  }

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'expandable-toggle';
  toggleBtn.innerHTML = '⤢';
  toggleBtn.title = 'Expand';
  toggleBtn.style.cssText = `
    position: absolute;
    top: ${-toggleOffset[1]}px;
    right: ${-toggleOffset[0]}px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.9);
    color: #666;
    font-size: 16px;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.6);
    transition: background 0.2s ease, box-shadow 0.2s ease;
  `;
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.background = 'rgba(255, 255, 255, 1)';
    toggleBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  });
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.background = 'rgba(255, 255, 255, 0.9)';
    toggleBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
  });

  // Handle function content (call it to get the element)
  if (typeof content === 'function') {
    content = content();
  }
  // Handle string content
  if (typeof content === 'string') {
    const temp = document.createElement('div');
    temp.innerHTML = content;
    content = temp.firstElementChild || temp;
  }

  contentWrapper.appendChild(content);
  contentWrapper.appendChild(toggleBtn);
  container.appendChild(contentWrapper);

  // Call onResize immediately to initialize content at the correct size
  if (onResize) {
    onResize(content, width, height, false);
  }

  // Measure actual content height after it's in the DOM
  let collapsedHeight = null;
  function measureCollapsedHeight() {
    if (!expanded && container.isConnected) {
      collapsedHeight = container.offsetHeight;
    }
  }

  // Use requestAnimationFrame to measure after render
  requestAnimationFrame(() => {
    measureCollapsedHeight();
  });

  function setDimensions(newWidth, newHeight) {
    currentWidth = newWidth;
    currentHeight = newHeight;
    if (onResize) {
      onResize(content, newWidth, newHeight, expanded);
    }
  }

  function collapse() {
    expanded = false;
    toggleBtn.innerHTML = '⤢';
    toggleBtn.title = 'Expand';
    toggleBtn.style.top = `${-toggleOffset[1]}px`;
    toggleBtn.style.right = `${-toggleOffset[0]}px`;

    // Remove overlay from DOM entirely (iOS Safari caches overscroll appearance)
    if (overlay.parentNode) {
      overlay.remove();
    }

    // Stop watching for element recreation
    stopControlsObserver();

    // Hide floating panel and restore controls
    if (floatingPanel) {
      floatingPanel.style.display = 'none';
      restoreControls();
    }

    // Reset container height
    container.style.height = '';

    // Reset content wrapper positioning
    contentWrapper.style.position = 'relative';
    contentWrapper.style.display = 'inline-block';
    contentWrapper.style.top = '';
    contentWrapper.style.left = '';
    contentWrapper.style.transform = '';
    contentWrapper.style.width = '';
    contentWrapper.style.height = '';
    contentWrapper.style.overflow = '';
    contentWrapper.style.background = '';
    contentWrapper.style.boxShadow = '';
    contentWrapper.style.padding = '';
    contentWrapper.style.borderRadius = '';
    contentWrapper.style.zIndex = '1';

    // Restore figure margin
    const figure = contentWrapper.querySelector('figure');
    if (figure) figure.style.margin = figure._savedMargin ?? '';

    setDimensions(width, height);

    // Re-measure collapsed height after resize settles
    requestAnimationFrame(() => {
      measureCollapsedHeight();
    });
  }

  function updateExpandedPosition() {
    if (!expanded) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Normalize margin and padding to [horizontal, vertical]
    const [hMargin, vMargin] = Array.isArray(margin) ? margin : [margin, margin];
    const [hPadding, vPadding] = Array.isArray(padding) ? padding : [padding, padding];

    const expandedWidth = viewportWidth - hMargin * 2 - hPadding * 2;
    const expandedHeight = viewportHeight - vMargin * 2 - vPadding * 2;

    const outerWidth = expandedWidth + hPadding * 2;
    const outerHeight = expandedHeight + vPadding * 2;

    // Position content wrapper
    contentWrapper.style.position = 'fixed';
    contentWrapper.style.display = 'block';
    contentWrapper.style.width = `${outerWidth}px`;
    contentWrapper.style.height = `${outerHeight}px`;
    contentWrapper.style.overflow = 'hidden';
    contentWrapper.style.zIndex = '9999';

    const isFullBleed = hMargin === 0 && vMargin === 0;
    if (isFullBleed) {
      // Full-bleed: pin to edges, no rounded corners
      contentWrapper.style.top = '0';
      contentWrapper.style.left = '0';
      contentWrapper.style.transform = 'none';
      contentWrapper.style.borderRadius = '0';
      contentWrapper.style.boxShadow = 'none';
    } else {
      // Centered with margins
      contentWrapper.style.top = `${vMargin}px`;
      contentWrapper.style.left = `${hMargin}px`;
      contentWrapper.style.transform = 'none';
      contentWrapper.style.borderRadius = '8px';
      contentWrapper.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    }
    contentWrapper.style.background = 'white';
    contentWrapper.style.padding = `${vPadding}px ${hPadding}px`;

    // Reset margins on inner content for proper centering
    const figure = contentWrapper.querySelector('figure');
    if (figure) {
      figure._savedMargin = figure._savedMargin ?? figure.style.margin;
      figure.style.margin = '0';
    }

    // Trigger resize callback to size content
    setDimensions(expandedWidth, expandedHeight);
  }

  function expand() {
    expanded = true;
    toggleBtn.innerHTML = '✕';
    toggleBtn.title = 'Collapse';
    toggleBtn.style.top = '8px';
    toggleBtn.style.right = '8px';

    // Show overlay
    if (!overlay.parentNode) {
      document.body.appendChild(overlay);
    }
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';

    // Lock container height to preserve document flow
    // Use measured height or fall back to calculating
    if (collapsedHeight) {
      container.style.height = `${collapsedHeight}px`;
    } else {
      container.style.height = `${container.offsetHeight}px`;
    }

    // Show floating controls panel
    if (controlsArray.length > 0 && floatingPanel) {
      const panelContent = floatingPanel.querySelector('.expandable-controls-content');
      if (panelContent) {
        // Process each control
        for (const ctrl of controlsArray) {
          // Resolve control to element
          const el = typeof ctrl === 'string'
            ? document.querySelector(ctrl)
            : ctrl;

          if (!el || !el.parentNode) continue;

          // Create placeholder for this control
          const placeholder = document.createElement('div');
          placeholder.className = 'expandable-controls-placeholder';
          placeholder.style.height = `${el.offsetHeight}px`;
          placeholder.style.display = 'block';

          // Store state for restoration (include selector for duplicate detection)
          controlsState.push({
            element: el,
            selector: typeof ctrl === 'string' ? ctrl : null,
            originalParent: el.parentNode,
            originalNextSibling: el.nextSibling,
            placeholder
          });

          // Insert placeholder and move control to panel
          el.parentNode.insertBefore(placeholder, el);
          panelContent.appendChild(el);
        }
      }

      // Add panel to body and show (only if we moved at least one control)
      if (controlsState.length > 0) {
        if (!floatingPanel.parentNode) {
          document.body.appendChild(floatingPanel);
        }
        floatingPanel.style.cssText = `
          position: fixed;
          z-index: 10000;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          overflow: hidden;
          max-width: min(350px, calc(100vw - 32px));
          max-height: calc(100vh - 100px);
          left: ${controlsPanelPosition.x}px;
          top: ${controlsPanelPosition.y}px;
        `;

        // Set initial expand/collapse state
        const isMobile = window.innerWidth < 640;
        controlsPanelExpanded = !isMobile;
        const content = floatingPanel.querySelector('.expandable-controls-content');
        const toggle = floatingPanel.querySelector('.expandable-controls-toggle');
        if (controlsPanelExpanded) {
          if (content) content.style.display = 'flex';
          if (toggle) {
            toggle.innerHTML = '▼';
            toggle.title = 'Collapse controls';
          }
        } else {
          if (content) content.style.display = 'none';
          if (toggle) {
            toggle.innerHTML = '▶';
            toggle.title = 'Expand controls';
          }
        }
      }
    }

    updateExpandedPosition();

    // Start watching for element recreation (Observable reactivity)
    startControlsObserver();
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (expanded) {
      collapse();
    } else {
      expand();
    }
  });

  // Handle window resize
  const handleResize = () => {
    if (expanded) {
      updateExpandedPosition();
    }
  };
  window.addEventListener('resize', handleResize);

  // Close on Escape key
  const handleKeydown = (e) => {
    if (e.key === 'Escape' && expanded) {
      collapse();
    }
  };
  document.addEventListener('keydown', handleKeydown);

  // Cleanup when removed from DOM
  const observer = new MutationObserver(() => {
    if (!document.contains(container)) {
      document.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);
      stopControlsObserver();
      if (overlay.parentNode) overlay.remove();
      // Restore controls before removing panel
      restoreControls();
      if (floatingPanel && floatingPanel.parentNode) floatingPanel.remove();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Expose current dimensions
  Object.defineProperty(container, 'expandedDimensions', {
    get: () => ({ width: currentWidth, height: currentHeight, expanded })
  });

  return container;
}
