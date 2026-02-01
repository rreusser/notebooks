// Camera controller for interactive 3D views
// Uses spherical coordinates for reliable rotation
//
// Features:
// - Drag to rotate
// - Shift+drag or right-click drag to pan
// - Scroll wheel to zoom
// - Touch support: single finger rotate, two finger pinch zoom
//
// Note: Matrix math is inlined to avoid npm: import dependencies
// which don't work in lib/ modules (only in notebook cells).

/**
 * Create a camera controller with spherical coordinate rotation
 *
 * @param {HTMLElement} element - Element to attach mouse/touch listeners to
 * @param {Object} opts - Options
 * @param {number[]} [opts.center=[0, 0, 0]] - Point camera looks at
 * @param {number} [opts.distance=10] - Distance from center
 * @param {number} [opts.phi=0] - Azimuthal angle (rotation around Y)
 * @param {number} [opts.theta=0.3] - Polar angle (elevation)
 * @param {number} [opts.fov=Math.PI/4] - Field of view in radians
 * @param {number} [opts.near=0.1] - Near clipping plane
 * @param {number} [opts.far=1000] - Far clipping plane
 * @param {number} [opts.rotateSpeed=0.01] - Rotation sensitivity
 * @param {number} [opts.zoomSpeed=0.001] - Zoom sensitivity
 * @param {number} [opts.panSpeed=1] - Pan sensitivity
 * @returns {Object} Controller with update method and state
 */
export function createCameraController(element, opts = {}) {
  const state = {
    center: opts.center ? [...opts.center] : [0, 0, 0],
    distance: opts.distance || 10,
    phi: opts.phi || 0,
    theta: opts.theta || 0.3,
    fov: opts.fov || Math.PI / 4,
    near: opts.near || 0.1,
    far: opts.far || 1000
  };

  const rotateSpeed = opts.rotateSpeed || 0.01;
  const zoomSpeed = opts.zoomSpeed || 0.001;
  const panSpeed = opts.panSpeed || 1;

  // Pre-allocate matrices
  const _view = new Float32Array(16);
  const _proj = new Float32Array(16);
  const _projView = new Float32Array(16);

  let dirty = true;

  // Mouse state
  let isDragging = false;
  let dragMode = null;
  let lastX = 0, lastY = 0;

  // Touch state
  let lastTouchDist = 0;
  let lastTouchCenterX = 0;
  let lastTouchCenterY = 0;

  function computeMatrices(aspectRatio) {
    const { phi, theta, distance, center, fov, near, far } = state;

    // Camera position in spherical coordinates
    const x = center[0] + distance * Math.cos(theta) * Math.cos(phi);
    const y = center[1] + distance * Math.sin(theta);
    const z = center[2] + distance * Math.cos(theta) * Math.sin(phi);

    // View matrix (lookAt)
    let fwdX = center[0] - x, fwdY = center[1] - y, fwdZ = center[2] - z;
    const fwdLen = Math.sqrt(fwdX*fwdX + fwdY*fwdY + fwdZ*fwdZ);
    fwdX /= fwdLen; fwdY /= fwdLen; fwdZ /= fwdLen;

    // right = forward × up (up = 0,1,0)
    let rightX = fwdY * 0 - fwdZ * 1;
    let rightY = fwdZ * 0 - fwdX * 0;
    let rightZ = fwdX * 1 - fwdY * 0;
    const rLen = Math.sqrt(rightX*rightX + rightY*rightY + rightZ*rightZ);
    if (rLen > 0.0001) {
      rightX /= rLen; rightY /= rLen; rightZ /= rLen;
    }

    // newUp = right × forward
    const upX = rightY * fwdZ - rightZ * fwdY;
    const upY = rightZ * fwdX - rightX * fwdZ;
    const upZ = rightX * fwdY - rightY * fwdX;

    // View matrix
    _view[0] = rightX; _view[1] = upX; _view[2] = -fwdX; _view[3] = 0;
    _view[4] = rightY; _view[5] = upY; _view[6] = -fwdY; _view[7] = 0;
    _view[8] = rightZ; _view[9] = upZ; _view[10] = -fwdZ; _view[11] = 0;
    _view[12] = -(rightX*x + rightY*y + rightZ*z);
    _view[13] = -(upX*x + upY*y + upZ*z);
    _view[14] = (fwdX*x + fwdY*y + fwdZ*z);
    _view[15] = 1;

    // Projection matrix (perspective)
    const f = 1.0 / Math.tan(fov / 2);
    const rangeInv = 1 / (near - far);
    _proj[0] = f / aspectRatio; _proj[1] = 0; _proj[2] = 0; _proj[3] = 0;
    _proj[4] = 0; _proj[5] = f; _proj[6] = 0; _proj[7] = 0;
    _proj[8] = 0; _proj[9] = 0; _proj[10] = (near + far) * rangeInv; _proj[11] = -1;
    _proj[12] = 0; _proj[13] = 0; _proj[14] = near * far * rangeInv * 2; _proj[15] = 0;

    // Multiply proj * view
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += _proj[i + k*4] * _view[k + j*4];
        }
        _projView[i + j*4] = sum;
      }
    }
  }

  function pan(dx, dy) {
    // Pan in the camera's local coordinate system (screen-space panning)
    const { phi, theta, distance } = state;

    // Right vector (horizontal, perpendicular to view direction)
    const rightX = Math.sin(phi);
    const rightZ = -Math.cos(phi);

    // Up vector in camera space (perpendicular to view and right)
    // This tilts with theta so vertical drag moves along the camera's up direction
    const upX = -Math.sin(theta) * Math.cos(phi);
    const upY = Math.cos(theta);
    const upZ = -Math.sin(theta) * Math.sin(phi);

    // "Grab and drag" convention:
    // - Horizontal: drag right → scene moves right → center moves left (subtract right)
    // - Vertical: drag down → scene moves down → center moves up (add up)
    const scale = distance * panSpeed;
    state.center[0] -= dx * rightX * scale;
    state.center[0] += dy * upX * scale;
    state.center[1] += dy * upY * scale;
    state.center[2] -= dx * rightZ * scale;
    state.center[2] += dy * upZ * scale;
  }

  function onMouseDown(event) {
    event.preventDefault();
    lastX = event.clientX;
    lastY = event.clientY;

    dragMode = (event.shiftKey || event.button === 2) ? 'pan' : 'rotate';
    isDragging = true;
    element.style.cursor = 'grabbing';

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(event) {
    if (!isDragging) return;

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;

    if (dragMode === 'rotate') {
      state.phi += dx * rotateSpeed;
      state.theta = Math.max(-Math.PI/2 + 0.01, Math.min(Math.PI/2 - 0.01, state.theta + dy * rotateSpeed));
    } else if (dragMode === 'pan') {
      // Use getBoundingClientRect for SVG compatibility (SVG elements don't have offsetWidth/Height)
      const rect = element.getBoundingClientRect();
      pan(dx / rect.width, dy / rect.height);
    }

    dirty = true;
  }

  function onMouseUp() {
    isDragging = false;
    dragMode = null;
    element.style.cursor = 'grab';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function onWheel(event) {
    event.preventDefault();

    // Get mouse position relative to element center (normalized -0.5 to 0.5)
    const rect = element.getBoundingClientRect();
    const mx = (event.clientX - rect.left) / rect.width - 0.5;
    const my = (event.clientY - rect.top) / rect.height - 0.5;

    // Calculate zoom factor
    const zoomFactor = 1 + event.deltaY * zoomSpeed;
    const oldDistance = state.distance;
    state.distance = Math.max(state.near * 10, oldDistance * zoomFactor);
    const actualZoomFactor = state.distance / oldDistance;

    // Pan to keep the point under the mouse stationary
    // When zooming by factor f, pan by mouse_offset * (1 - f)
    const panAmount = 1 - actualZoomFactor;
    pan(-mx * panAmount, -my * panAmount);

    dirty = true;
  }

  function onTouchStart(event) {
    event.preventDefault();
    if (event.touches.length === 1) {
      isDragging = true;
      dragMode = 'rotate';
      lastX = event.touches[0].clientX;
      lastY = event.touches[0].clientY;
    } else if (event.touches.length === 2) {
      const dx = event.touches[1].clientX - event.touches[0].clientX;
      const dy = event.touches[1].clientY - event.touches[0].clientY;
      lastTouchDist = Math.sqrt(dx * dx + dy * dy);
      lastTouchCenterX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      lastTouchCenterY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
    }
  }

  function onTouchMove(event) {
    event.preventDefault();

    if (event.touches.length === 1 && isDragging) {
      const dx = event.touches[0].clientX - lastX;
      const dy = event.touches[0].clientY - lastY;
      lastX = event.touches[0].clientX;
      lastY = event.touches[0].clientY;

      state.phi += dx * rotateSpeed;
      state.theta = Math.max(-Math.PI/2 + 0.01, Math.min(Math.PI/2 - 0.01, state.theta + dy * rotateSpeed));
      dirty = true;
    } else if (event.touches.length === 2) {
      // Calculate distance for pinch zoom
      const dx = event.touches[1].clientX - event.touches[0].clientX;
      const dy = event.touches[1].clientY - event.touches[0].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Calculate center for pan
      const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

      if (lastTouchDist > 0) {
        // Pinch zoom
        const scale = lastTouchDist / dist;
        state.distance *= scale;
        state.distance = Math.max(state.near * 10, state.distance);

        // Two-finger pan
        const rect = element.getBoundingClientRect();
        const panDx = (centerX - lastTouchCenterX) / rect.width;
        const panDy = (centerY - lastTouchCenterY) / rect.height;
        pan(panDx, panDy);

        dirty = true;
      }
      lastTouchDist = dist;
      lastTouchCenterX = centerX;
      lastTouchCenterY = centerY;
    }
  }

  function onTouchEnd() {
    isDragging = false;
    dragMode = null;
    lastTouchDist = 0;
  }

  function onContextMenu(event) {
    event.preventDefault();
  }

  // Setup
  element.style.cursor = 'grab';
  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('wheel', onWheel, { passive: false });
  element.addEventListener('touchstart', onTouchStart, { passive: false });
  element.addEventListener('touchmove', onTouchMove, { passive: false });
  element.addEventListener('touchend', onTouchEnd);
  element.addEventListener('contextmenu', onContextMenu);

  function destroy() {
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('wheel', onWheel);
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchmove', onTouchMove);
    element.removeEventListener('touchend', onTouchEnd);
    element.removeEventListener('contextmenu', onContextMenu);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  return {
    state,

    get dirty() {
      return dirty;
    },

    taint() {
      dirty = true;
    },

    /**
     * Update matrices for current frame
     * @param {number} aspectRatio - Canvas width / height
     * @returns {Object} Object with view, projection, projectionView matrices and dirty flag
     */
    update(aspectRatio) {
      computeMatrices(aspectRatio);

      const wasDirty = dirty;
      dirty = false;

      return {
        view: _view,
        projection: _proj,
        projectionView: _projView,
        dirty: wasDirty
      };
    },

    destroy
  };
}

export default createCameraController;
