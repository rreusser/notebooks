// Orbit camera for regl
// Based on regl-camera, adapted for Observable notebooks

export function createCamera(regl, props = {}) {
  const cameraState = {
    view: new Float32Array(16),
    projection: new Float32Array(16),
    center: new Float32Array(props.center || [0, 0, 0]),
    theta: props.theta || 0,
    phi: props.phi || 0,
    distance: Math.log(props.distance || 10.0),
    eye: new Float32Array(3),
    up: new Float32Array(props.up || [0, 1, 0]),
    fovy: props.fovy || Math.PI / 4.0,
    near: props.near !== undefined ? props.near : 0.01,
    far: props.far !== undefined ? props.far : 1000.0,
    noScroll: props.noScroll !== undefined ? props.noScroll : false,
    flipY: !!props.flipY,
    dtheta: 0,
    dphi: 0,
    rotationSpeed: props.rotationSpeed !== undefined ? props.rotationSpeed : 1,
    zoomSpeed: props.zoomSpeed !== undefined ? props.zoomSpeed : 1,
    dirty: true,
  };

  const damping = props.damping !== undefined ? props.damping : 0.9;
  const minDistance = Math.log(props.minDistance || 0.1);
  const maxDistance = Math.log(props.maxDistance || 1000);

  let ddistance = 0;
  let prevX = 0;
  let prevY = 0;

  const element = props.element || regl._gl.canvas;

  function getWidth() {
    return element.offsetWidth || window.innerWidth;
  }

  function getHeight() {
    return element.offsetHeight || window.innerHeight;
  }

  // Mouse interaction
  if (props.mouse !== false) {
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onTouchStart, { passive: false });

    if (props.wheel) {
      element.addEventListener('wheel', onWheel, { passive: !cameraState.noScroll });
    }
  }

  let mouseDown = false;

  function onMouseDown(e) {
    mouseDown = true;
    prevX = e.clientX;
    prevY = e.clientY;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (!mouseDown) return;
    const dx = (e.clientX - prevX) / getWidth();
    const dy = (e.clientY - prevY) / getHeight();
    cameraState.dtheta += cameraState.rotationSpeed * 4.0 * dx;
    cameraState.dphi += cameraState.rotationSpeed * 4.0 * dy;
    cameraState.dirty = true;
    prevX = e.clientX;
    prevY = e.clientY;
  }

  function onMouseUp() {
    mouseDown = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
      element.addEventListener('touchmove', onTouchMove, { passive: false });
      element.addEventListener('touchend', onTouchEnd);
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      const dx = (e.touches[0].clientX - prevX) / getWidth();
      const dy = (e.touches[0].clientY - prevY) / getHeight();
      cameraState.dtheta += cameraState.rotationSpeed * 4.0 * dx;
      cameraState.dphi += cameraState.rotationSpeed * 4.0 * dy;
      cameraState.dirty = true;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    }
  }

  function onTouchEnd() {
    element.removeEventListener('touchmove', onTouchMove);
    element.removeEventListener('touchend', onTouchEnd);
  }

  function onWheel(e) {
    if (cameraState.noScroll) {
      e.preventDefault();
    }
    ddistance += e.deltaY / getHeight() * cameraState.zoomSpeed;
    cameraState.dirty = true;
  }

  function damp(x) {
    const xd = x * damping;
    if (Math.abs(xd) < 0.0001) {
      return 0;
    }
    cameraState.dirty = true;
    return xd;
  }

  function clamp(x, lo, hi) {
    return Math.min(Math.max(x, lo), hi);
  }

  // Matrix math helpers
  function identity(out) {
    out[0] = 1; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = 1; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = 1; out[11] = 0;
    out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1;
    return out;
  }

  function lookAt(out, eye, center, up) {
    const x0 = eye[0], x1 = eye[1], x2 = eye[2];
    const u0 = up[0], u1 = up[1], u2 = up[2];
    const c0 = center[0], c1 = center[1], c2 = center[2];

    let z0 = x0 - c0, z1 = x1 - c1, z2 = x2 - c2;
    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len; z1 *= len; z2 *= len;
    }

    let y0 = u1 * z2 - u2 * z1;
    let y1 = u2 * z0 - u0 * z2;
    let y2 = u0 * z1 - u1 * z0;
    len = y0 * y0 + y1 * y1 + y2 * y2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      y0 *= len; y1 *= len; y2 *= len;
    }

    const w0 = z1 * y2 - z2 * y1;
    const w1 = z2 * y0 - z0 * y2;
    const w2 = z0 * y1 - z1 * y0;

    out[0] = y0; out[1] = w0; out[2] = z0; out[3] = 0;
    out[4] = y1; out[5] = w1; out[6] = z1; out[7] = 0;
    out[8] = y2; out[9] = w2; out[10] = z2; out[11] = 0;
    out[12] = -(y0 * x0 + y1 * x1 + y2 * x2);
    out[13] = -(w0 * x0 + w1 * x1 + w2 * x2);
    out[14] = -(z0 * x0 + z1 * x1 + z2 * x2);
    out[15] = 1;
    return out;
  }

  function perspective(out, fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = 2 * far * near * nf; out[15] = 0;
    return out;
  }

  const right = new Float32Array([1, 0, 0]);
  const front = new Float32Array([0, 0, 1]);

  function updateCamera() {
    const { center, eye, up } = cameraState;

    cameraState.theta += cameraState.dtheta;
    cameraState.phi = clamp(
      cameraState.phi + cameraState.dphi,
      -Math.PI / 2.0,
      Math.PI / 2.0
    );
    cameraState.distance = clamp(
      cameraState.distance + ddistance,
      minDistance,
      maxDistance
    );

    cameraState.dtheta = damp(cameraState.dtheta);
    cameraState.dphi = damp(cameraState.dphi);
    ddistance = damp(ddistance);

    const theta = cameraState.theta;
    const phi = cameraState.phi;
    const r = Math.exp(cameraState.distance);

    const vf = r * Math.sin(theta) * Math.cos(phi);
    const vr = r * Math.cos(theta) * Math.cos(phi);
    const vu = r * Math.sin(phi);

    for (let i = 0; i < 3; i++) {
      eye[i] = center[i] + vf * front[i] + vr * right[i] + vu * up[i];
    }

    lookAt(cameraState.view, eye, center, up);
  }

  identity(cameraState.view);
  identity(cameraState.projection);

  const injectContext = regl({
    context: {
      view: () => cameraState.view,
      projection: (context) => {
        perspective(
          cameraState.projection,
          cameraState.fovy,
          context.viewportWidth / context.viewportHeight,
          cameraState.near,
          cameraState.far
        );
        if (cameraState.flipY) {
          cameraState.projection[5] *= -1;
        }
        return cameraState.projection;
      },
      eye: () => cameraState.eye,
      dirty: () => cameraState.dirty,
    },
    uniforms: {
      view: regl.context('view'),
      projection: regl.context('projection'),
      eye: regl.context('eye'),
    },
  });

  function setupCamera(block) {
    updateCamera();
    injectContext(block);
    cameraState.dirty = false;
  }

  setupCamera.taint = function() {
    cameraState.dirty = true;
  };

  setupCamera.state = cameraState;
  setupCamera.element = element;

  setupCamera.destroy = function() {
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('wheel', onWheel);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  return setupCamera;
}
