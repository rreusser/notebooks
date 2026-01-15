/**
 * Creates an expandable wrapper for content that can pop out to cover more of the page.
 *
 * @param {HTMLElement|string} content - The content element to wrap
 * @param {Object} options - Configuration options
 * @param {number} options.width - Default width when collapsed
 * @param {number} options.height - Default height when collapsed
 * @param {number[]} [options.toggleOffset=[8,8]] - Offset [right, top] for the toggle button
 * @param {Function} [options.onResize] - Optional callback when dimensions change: (content, width, height, expanded) => void
 * @param {string} [options.controls] - CSS selector for controls element that floats over the expanded content
 * @returns {HTMLElement} The expandable container
 */
export function expandable(content, { width, height, toggleOffset = [8, 8], onResize, controls }) {
  let expanded = false;
  let currentWidth = width;
  let currentHeight = height;
  let controlsPanelExpanded = false;
  let controlsPanelPosition = { x: 16, y: 16 };
  let floatingPanel = null;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  // Track original location of controls for restoration
  let controlsEl = null;
  let controlsOriginalParent = null;
  let controlsOriginalNextSibling = null;
  let controlsPlaceholder = null;

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
  if (controls) {
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
    `;

    floatingPanel.appendChild(panelHeader);
    floatingPanel.appendChild(panelContent);

    // Placeholder to maintain space when controls are moved
    controlsPlaceholder = document.createElement('div');
    controlsPlaceholder.className = 'expandable-controls-placeholder';
    controlsPlaceholder.style.cssText = `display: none;`;

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
      if (content) content.style.display = 'block';
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

  // Restore controls to their original location
  function restoreControls() {
    if (controlsEl && controlsOriginalParent) {
      // Remove placeholder if it exists
      if (controlsPlaceholder && controlsPlaceholder.parentNode) {
        controlsPlaceholder.parentNode.removeChild(controlsPlaceholder);
      }
      // Move controls back
      if (controlsOriginalNextSibling) {
        controlsOriginalParent.insertBefore(controlsEl, controlsOriginalNextSibling);
      } else {
        controlsOriginalParent.appendChild(controlsEl);
      }
      controlsEl = null;
      controlsOriginalParent = null;
      controlsOriginalNextSibling = null;
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

    // Hide overlay
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

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
    const isMobile = viewportWidth < 640;

    // On mobile, go full-bleed horizontally with small vertical padding for caption
    const hPadding = isMobile ? 3 : 16;
    const vPadding = isMobile ? 8 : 16;
    const horizontalInset = isMobile ? 0 : 48;
    const verticalInset = isMobile ? 32 : 48;
    const expandedWidth = viewportWidth - horizontalInset * 2 - hPadding * 2;
    const expandedHeight = viewportHeight - verticalInset * 2 - vPadding * 2;

    const outerWidth = expandedWidth + hPadding * 2;

    // Position content wrapper
    contentWrapper.style.position = 'fixed';
    contentWrapper.style.display = 'block';
    contentWrapper.style.width = `${outerWidth}px`;
    contentWrapper.style.zIndex = '9999';

    if (isMobile) {
      // Full-bleed horizontally on mobile, centered vertically
      contentWrapper.style.top = '50%';
      contentWrapper.style.left = '0';
      contentWrapper.style.transform = 'translateY(-50%)';
      contentWrapper.style.borderRadius = '0';
      contentWrapper.style.boxShadow = 'none';
    } else {
      // Centered with insets on desktop
      contentWrapper.style.top = '50%';
      contentWrapper.style.left = '50%';
      contentWrapper.style.transform = 'translate(-50%, -50%)';
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
    if (controls && floatingPanel) {
      controlsEl = document.querySelector(controls);
      if (controlsEl && controlsEl.parentNode) {
        const panelContent = floatingPanel.querySelector('.expandable-controls-content');
        if (panelContent) {
          // Store original location
          controlsOriginalParent = controlsEl.parentNode;
          controlsOriginalNextSibling = controlsEl.nextSibling;

          // Insert placeholder to maintain layout
          controlsPlaceholder.style.height = `${controlsEl.offsetHeight}px`;
          controlsPlaceholder.style.display = 'block';
          controlsOriginalParent.insertBefore(controlsPlaceholder, controlsEl);

          // Move controls to panel
          panelContent.appendChild(controlsEl);
        }

        // Add panel to body and show
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
          max-width: calc(100vw - 32px);
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
          if (content) content.style.display = 'block';
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
