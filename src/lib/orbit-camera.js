// Simple orbit camera implementation
// Based on Mikola Lysenko's orbit-camera (MIT License)

import { mat4, quat, vec3 } from 'npm:gl-matrix@3.4.3';

export class OrbitCamera {
  constructor(eye = [0, 0, -10], target = [0, 0, 0], up = [0, 1, 0]) {
    this.rotation = quat.create();
    this.center = vec3.clone(target);
    this.distance = 1.0;

    // Scratch arrays
    this._scratch0 = new Float32Array(16);
    this._scratch1 = new Float32Array(16);
    this._scratchVec = vec3.create();

    this.lookAt(eye, target, up);
  }

  lookAt(eye, target, up) {
    const scratch = this._scratch0;
    mat4.lookAt(scratch, eye, target, up);

    // Extract rotation from view matrix
    const m = scratch;
    const rot3 = [
      m[0], m[1], m[2],
      m[4], m[5], m[6],
      m[8], m[9], m[10]
    ];
    quat.fromMat3(this.rotation, rot3);

    vec3.copy(this.center, target);
    this.distance = vec3.distance(eye, target);
  }

  view(out = mat4.create()) {
    const scratch0 = this._scratch0;
    const scratch1 = this._scratch1;
    const scratchVec = this._scratchVec;

    scratchVec[0] = 0;
    scratchVec[1] = 0;
    scratchVec[2] = -this.distance;

    quat.conjugate(scratch0, this.rotation);
    mat4.fromRotationTranslation(out, scratch0, scratchVec);

    vec3.negate(scratchVec, this.center);
    mat4.translate(out, out, scratchVec);

    return out;
  }

  // Get eye position in world space
  eye(out = vec3.create()) {
    // Eye is at center + rotation * (0, 0, distance)
    out[0] = 0;
    out[1] = 0;
    out[2] = this.distance;
    vec3.transformQuat(out, out, this.rotation);
    vec3.add(out, out, this.center);
    return out;
  }

  pan(dpan) {
    const d = this.distance;
    const scratch = this._scratchVec;

    scratch[0] = -d * (dpan[0] || 0);
    scratch[1] = d * (dpan[1] || 0);
    scratch[2] = d * (dpan[2] || 0);

    vec3.transformQuat(scratch, scratch, this.rotation);
    vec3.add(this.center, this.center, scratch);
  }

  zoom(delta) {
    this.distance *= Math.exp(delta / 10.0);
    if (this.distance < 0.01) this.distance = 0.01;
  }

  rotate(da, db) {
    const scratch0 = this._scratch0;
    const scratch1 = this._scratch1;

    quatFromVec(scratch0, da);
    quatFromVec(scratch1, db);
    quat.invert(scratch1, scratch1);
    quat.multiply(scratch0, scratch0, scratch1);

    if (quat.length(scratch0) < 1e-6) return;

    quat.multiply(this.rotation, this.rotation, scratch0);
    quat.normalize(this.rotation, this.rotation);
  }
}

function quatFromVec(out, da) {
  const x = da[0];
  const y = da[1];
  const z = da[2];
  let s = x * x + y * y;
  if (s > 1.0) s = 1.0;

  out[0] = -da[0];
  out[1] = da[1];
  out[2] = da[2] || Math.sqrt(1.0 - s);
  out[3] = 0.0;
}

// Helper to create a regl camera wrapper
export function createReglCamera(regl, opts = {}) {
  const eye = opts.eye || [0, 1, -20];
  const center = opts.center || [0, 0, 0];
  const up = opts.up || [0, 1, 0];
  const fovy = opts.fovy || Math.PI / 4;
  const near = opts.near || 0.1;
  const far = opts.far || 200.0;

  const camera = new OrbitCamera(eye, center, up);

  const viewMatrix = mat4.create();
  const projectionMatrix = mat4.create();
  const projectionViewMatrix = mat4.create();

  let dirty = true;

  const setUniforms = regl({
    uniforms: {
      view: () => viewMatrix,
      projection: () => projectionMatrix,
      projectionView: () => projectionViewMatrix
    },
    context: {
      view: () => viewMatrix,
      projection: () => projectionMatrix,
      projectionView: () => projectionViewMatrix,
      dirty: () => dirty
    }
  });

  return {
    camera,
    projectionView: projectionViewMatrix,

    taint() {
      dirty = true;
    },

    tick(callback) {
      const gl = regl._gl;
      const aspectRatio = gl.canvas.width / gl.canvas.height;

      camera.view(viewMatrix);
      mat4.perspective(projectionMatrix, fovy, aspectRatio, near, far);
      mat4.multiply(projectionViewMatrix, projectionMatrix, viewMatrix);

      setUniforms(() => {
        callback({ dirty });
      });

      dirty = false;
    }
  };
}

export default OrbitCamera;
