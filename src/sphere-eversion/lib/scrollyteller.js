// Scrollyteller component for Observable notebooks
// Creates a scroll-driven animation container with fixed content and overlay frames

export function createScrollyteller(options = {}) {
  const {
    frameCount = 8,
    timeConstant = 0.1,
    onProgress = () => {},
    onFrame = () => {},
  } = options;

  // Smoothing state
  const LOG2INV = 1.0 / Math.log(2);
  const decayExponent = -LOG2INV / (timeConstant * 1000);
  let position = 0;
  let smoothedPosition = 0;
  let tPrev = 0;
  let raf = null;
  let destroyed = false;

  // Create container element
  const container = document.createElement('div');
  container.className = 'scrollyteller';
  container.style.cssText = `
    position: relative;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  `;

  // Fixed content wrapper (stays visible during scroll)
  const fixedWrapper = document.createElement('div');
  fixedWrapper.className = 'scrollyteller__fixed-wrapper';
  fixedWrapper.style.cssText = `
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  `;

  // Fixed content container (where WebGL canvas goes)
  const fixedContent = document.createElement('div');
  fixedContent.className = 'scrollyteller__fixed-content';
  fixedContent.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;
  fixedWrapper.appendChild(fixedContent);

  // Frames container (overlays that appear at different scroll positions)
  const framesContainer = document.createElement('div');
  framesContainer.className = 'scrollyteller__frames';
  framesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
  `;
  // Height will be set after frames are added
  fixedWrapper.appendChild(framesContainer);

  container.appendChild(fixedWrapper);

  // Spacer to create scroll height
  const spacer = document.createElement('div');
  spacer.className = 'scrollyteller__spacer';
  spacer.style.cssText = `
    height: ${frameCount * 100}vh;
    margin-top: -100vh;
    pointer-events: none;
  `;
  container.appendChild(spacer);

  // Frame elements storage
  const frames = [];

  // Add a frame at a specific scroll position
  function addFrame(content, frameOptions = {}) {
    const {
      position: framePosition = frames.length / Math.max(frameCount - 1, 1),
    } = frameOptions;

    const frame = document.createElement('div');
    frame.className = 'scrollyteller__frame';
    frame.style.cssText = `
      position: absolute;
      top: ${framePosition * (frameCount - 1) * 100}vh;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: flex-end;
      padding: 20px;
      box-sizing: border-box;
    `;

    if (typeof content === 'string') {
      frame.innerHTML = content;
    } else if (content instanceof Node) {
      frame.appendChild(content);
    }

    framesContainer.appendChild(frame);
    frames.push({ element: frame, position: framePosition });

    return frame;
  }

  // Get scroll progress (0 to 1)
  function getScrollProgress() {
    const rect = container.getBoundingClientRect();
    const scrollHeight = container.offsetHeight - window.innerHeight;
    if (scrollHeight <= 0) return 0;

    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / scrollHeight));
  }

  // Animation frame callback for smooth scrolling
  function onRaf(t) {
    if (destroyed) return;

    const dt = t - tPrev;
    const targetPosition = getScrollProgress();

    if (tPrev !== 0) {
      const decayFactor = Math.exp(dt * decayExponent);
      smoothedPosition *= decayFactor;
      smoothedPosition += (1.0 - decayFactor) * targetPosition;
    } else {
      smoothedPosition = targetPosition;
    }

    position = targetPosition;

    // Call progress callback with smoothed value
    onProgress(smoothedPosition, targetPosition);

    // Determine active frame
    const activeFrameIndex = Math.floor(smoothedPosition * (frameCount - 1));
    onFrame(activeFrameIndex, smoothedPosition);

    tPrev = t;
    raf = requestAnimationFrame(onRaf);
  }

  // Start the animation loop
  function start() {
    if (raf !== null) return;
    raf = requestAnimationFrame(onRaf);
  }

  // Stop the animation loop
  function stop() {
    if (raf === null) return;
    cancelAnimationFrame(raf);
    raf = null;
  }

  // Clean up
  function destroy() {
    destroyed = true;
    stop();
    container.remove();
  }

  // Auto-start when container is added to DOM
  const observer = new MutationObserver((mutations, obs) => {
    if (document.body.contains(container)) {
      start();
      obs.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return {
    container,
    fixedContent,
    framesContainer,
    addFrame,
    start,
    stop,
    destroy,
    getProgress: () => smoothedPosition,
    getRawProgress: () => position,
  };
}

// Helper to create a caption element
export function createCaption(text, options = {}) {
  const {
    left,
    right,
    top,
    bottom,
    maxWidth = '300px',
  } = options;

  const caption = document.createElement('div');
  caption.className = 'scrollyteller__caption';
  caption.style.cssText = `
    position: absolute;
    background: rgba(255, 255, 255, 0.85);
    padding: 12px 16px;
    font-size: 1.1em;
    line-height: 1.4;
    max-width: ${maxWidth};
    pointer-events: auto;
    ${left !== undefined ? `left: ${left};` : ''}
    ${right !== undefined ? `right: ${right};` : ''}
    ${top !== undefined ? `top: ${top};` : ''}
    ${bottom !== undefined ? `bottom: ${bottom};` : ''}
  `;

  if (typeof text === 'string') {
    caption.innerHTML = text;
  } else if (text instanceof Node) {
    caption.appendChild(text);
  }

  return caption;
}

// CSS styles for scrollyteller
export const scrollytellerStyles = `
  .scrollyteller__caption {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .scrollyteller__frame {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .scrollyteller__frame--active {
    opacity: 1;
  }
`;
