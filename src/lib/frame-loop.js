/**
 * Create a managed requestAnimationFrame loop
 *
 * @param {function} callback - Function to call each frame, receives timestamp
 * @returns {{ cancel: function }} Loop handle with cancel method
 *
 * Features:
 * - Invokes callback immediately, then continues via RAF
 * - Maintains RAF handle for proper cleanup
 * - Try/catch with auto-cancel on error
 * - Multiple cancel() calls are safe no-ops
 */
export function createFrameLoop(callback) {
  let rafHandle = null;
  let cancelled = false;

  function tick(timestamp) {
    if (cancelled) return;
    try {
      callback(timestamp);
    } catch (err) {
      cancelled = true;
      console.error('Frame loop error:', err);
      return;
    }
    if (!cancelled) {
      rafHandle = requestAnimationFrame(tick);
    }
  }

  // Invoke immediately with current timestamp
  try {
    callback(performance.now());
  } catch (err) {
    cancelled = true;
    console.error('Frame loop error:', err);
  }

  // Start RAF loop if not cancelled during initial invocation
  if (!cancelled) {
    rafHandle = requestAnimationFrame(tick);
  }

  return {
    cancel() {
      if (cancelled) return;
      cancelled = true;
      if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
      }
    }
  };
}
