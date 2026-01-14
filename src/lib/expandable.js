/**
 * Creates an expandable wrapper for content that can pop out to cover more of the page.
 *
 * @param {Function} renderFn - Function that receives (plotWidth, plotHeight) and returns content
 * @param {Object} options - Configuration options
 * @param {number} options.width - Default width when collapsed
 * @param {number} options.height - Default height when collapsed
 * @param {Function} [options.onResize] - Optional callback when dimensions change: (width, height, expanded) => void
 * @returns {HTMLElement} The expandable container
 */
export function expandable(renderFn, { width, height, onResize }) {
  let expanded = false;
  let currentWidth = width;
  let currentHeight = height;

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
    transition: all 0.3s ease;
    z-index: 1;
  `;

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'expandable-toggle';
  toggleBtn.innerHTML = '⤢';
  toggleBtn.title = 'Expand';
  toggleBtn.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  `;
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.background = 'rgba(255, 255, 255, 1)';
    toggleBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  });
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.background = 'rgba(255, 255, 255, 0.9)';
    toggleBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
  });

  // Render initial content
  let content = renderFn(width, height);
  if (typeof content === 'string') {
    const temp = document.createElement('div');
    temp.innerHTML = content;
    content = temp.firstElementChild || temp;
  }

  contentWrapper.appendChild(content);
  contentWrapper.appendChild(toggleBtn);
  container.appendChild(contentWrapper);

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
      onResize(newWidth, newHeight, expanded);
    }
  }

  function collapse() {
    expanded = false;
    toggleBtn.innerHTML = '⤢';
    toggleBtn.title = 'Expand';

    // Reset container height
    container.style.height = '';

    // Reset content wrapper positioning
    contentWrapper.style.position = 'relative';
    contentWrapper.style.top = '';
    contentWrapper.style.left = '';
    contentWrapper.style.width = '';
    contentWrapper.style.background = '';
    contentWrapper.style.boxShadow = '';
    contentWrapper.style.padding = '';
    contentWrapper.style.borderRadius = '';
    contentWrapper.style.zIndex = '1';

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
    const padding = 16;

    // Use available space - plot axes will handle their own aspect ratio
    const expandedWidth = Math.min(viewportWidth * 0.9, 1200) - padding * 2;
    const expandedHeight = Math.min(viewportHeight * 0.8, 900) - padding * 2;

    const outerWidth = expandedWidth + padding * 2;
    const outerHeight = expandedHeight + padding * 2;

    // Calculate position to center in viewport
    const targetLeft = (viewportWidth - outerWidth) / 2;
    const targetTop = (viewportHeight - outerHeight) / 2;

    // Position content wrapper
    contentWrapper.style.position = 'fixed';
    contentWrapper.style.top = `${targetTop}px`;
    contentWrapper.style.left = `${targetLeft}px`;
    contentWrapper.style.width = `${outerWidth}px`;
    contentWrapper.style.background = 'white';
    contentWrapper.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    contentWrapper.style.padding = `${padding}px`;
    contentWrapper.style.borderRadius = '8px';
    contentWrapper.style.zIndex = '9999';

    setDimensions(expandedWidth, expandedHeight);
  }

  function expand() {
    expanded = true;
    toggleBtn.innerHTML = '✕';
    toggleBtn.title = 'Collapse';

    // Lock container height to preserve document flow
    // Use measured height or fall back to calculating
    if (collapsedHeight) {
      container.style.height = `${collapsedHeight}px`;
    } else {
      container.style.height = `${container.offsetHeight}px`;
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
