/**
 * Creates an expandable wrapper for content that can pop out to cover more of the page.
 *
 * @param {HTMLElement|string} content - The content element to wrap
 * @param {Object} options - Configuration options
 * @param {number} options.width - Default width when collapsed
 * @param {number} options.height - Default height when collapsed
 * @param {number[]} [options.toggleOffset=[8,8]] - Offset [right, top] for the toggle button
 * @param {Function} [options.onResize] - Optional callback when dimensions change: (content, width, height, expanded) => void
 * @returns {HTMLElement} The expandable container
 */
export function expandable(content, { width, height, toggleOffset = [8, 8], onResize }) {
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
    transition: box-shadow 0.3s ease, background 0.3s ease;
    z-index: 1;
  `;

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

    // Reset container height
    container.style.height = '';

    // Reset content wrapper positioning
    contentWrapper.style.position = 'relative';
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
    if (figure) figure.style.margin = '';

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

    // Position content wrapper using CSS centering (avoids measurement timing issues)
    contentWrapper.style.position = 'fixed';
    contentWrapper.style.width = `${outerWidth}px`;
    contentWrapper.style.top = '50%';
    contentWrapper.style.left = '50%';
    contentWrapper.style.transform = 'translate(-50%, -50%)';
    contentWrapper.style.background = 'white';
    contentWrapper.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    contentWrapper.style.padding = `${padding}px`;
    contentWrapper.style.borderRadius = '8px';
    contentWrapper.style.zIndex = '9999';

    // Reset margins on inner content for proper centering
    const figure = contentWrapper.querySelector('figure');
    if (figure) figure.style.margin = '0';

    // Trigger resize callback to size content
    setDimensions(expandedWidth, expandedHeight);
  }

  function expand() {
    expanded = true;
    toggleBtn.innerHTML = '✕';
    toggleBtn.title = 'Collapse';
    toggleBtn.style.top = '8px';
    toggleBtn.style.right = '8px';

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
