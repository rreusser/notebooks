// Interactive mesh editor with vertex manipulation
// Handles mouse/keyboard/touch input for vertex manipulation
// Camera control is delegated to orbit-camera-controller

import { mat4, vec3 } from 'npm:gl-matrix@3.4.3';

export class MeshInteractions {
  constructor(element, mesh, controller, opts = {}) {
    this.element = element;
    this.mesh = mesh;
    this.controller = controller;
    this.camera = controller.camera;
    this.projectionView = controller.projectionView;

    // Selection state
    this.selectedVertexIndex = -1;
    this.hoverVertexIndex = -1;
    this.activeVertexIndex = -1;

    // Drag state
    this.isDragging = false;
    this.dragMode = null; // 'vertex' only - camera handled by controller
    this.initialMousePos = [0, 0];
    this.currentMousePos = [0, 0];
    this.previousMousePos = [0, 0];
    this.deadZoneRadius = 5;
    this.exitedDeadZone = false;

    // Touch state
    this.touchStartedOnVertex = false;
    this.touchVertexIndex = -1;

    // Candidate edge for connection
    this.candidateEdge = null;

    // Dirty flag for rendering
    this.dirty = true;

    // Callbacks
    this.onChange = opts.onChange || (() => {});

    // Bind event handlers
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    // Setup
    this._setup();
  }

  _setup() {
    const el = this.element;
    el.tabIndex = 1;
    el.style.outline = 'none';
    // Cursor now managed by camera controller

    el.addEventListener('mousedown', this._onMouseDown);
    el.addEventListener('mousemove', this._onMouseMove);
    el.addEventListener('click', this._onClick);
    el.addEventListener('keydown', this._onKeyDown);
    el.addEventListener('keyup', this._onKeyUp);
    el.addEventListener('touchstart', this._onTouchStart, { passive: false });
    el.addEventListener('touchmove', this._onTouchMove, { passive: false });
    el.addEventListener('touchend', this._onTouchEnd);
  }

  destroy() {
    const el = this.element;
    el.removeEventListener('mousedown', this._onMouseDown);
    el.removeEventListener('mousemove', this._onMouseMove);
    el.removeEventListener('click', this._onClick);
    el.removeEventListener('keydown', this._onKeyDown);
    el.removeEventListener('keyup', this._onKeyUp);
    el.removeEventListener('touchstart', this._onTouchStart);
    el.removeEventListener('touchmove', this._onTouchMove);
    el.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  }

  _getMousePos(event, out = [0, 0]) {
    const rect = this.element.getBoundingClientRect();
    out[0] = event.clientX - rect.left;
    out[1] = event.clientY - rect.top;
    return out;
  }

  _insideDeadZone() {
    const dx = this.currentMousePos[0] - this.initialMousePos[0];
    const dy = this.currentMousePos[1] - this.initialMousePos[1];
    return Math.sqrt(dx * dx + dy * dy) < this.deadZoneRadius;
  }

  // ============ Vertex Picking ============

  _getClosestVertex(x, y) {
    const mesh = this.mesh;
    const projectionView = this.projectionView;
    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;

    const projected = vec3.create();
    let minIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < mesh.vertexCount; i++) {
      const pos = mesh.getPosition(i);
      vec3.transformMat4(projected, pos, projectionView);

      // Skip if behind camera
      if (projected[2] < -1 || projected[2] > 1) continue;

      // Convert to screen coordinates
      const sx = (0.5 + 0.5 * projected[0]) * width;
      const sy = (0.5 - 0.5 * projected[1]) * height;

      const dx = x - sx;
      const dy = y - sy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDistance) {
        minDistance = dist;
        minIndex = i;
      }
    }

    return { index: minIndex, distance: minDistance };
  }

  // ============ Mouse Events ============

  _onMouseDown(event) {
    this._getMousePos(event, this.initialMousePos);
    this.currentMousePos[0] = this.initialMousePos[0];
    this.currentMousePos[1] = this.initialMousePos[1];
    this.previousMousePos[0] = this.initialMousePos[0];
    this.previousMousePos[1] = this.initialMousePos[1];
    this.exitedDeadZone = false;

    // Check for vertex under cursor
    const closest = this._getClosestVertex(this.initialMousePos[0], this.initialMousePos[1]);

    if (closest.index >= 0 && closest.distance < 25) {
      // Clicked on a vertex - prevent camera controller from handling
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Ensure canvas has focus for keyboard events
      this.element.focus();

      if (this.selectedVertexIndex >= 0 && this.selectedVertexIndex !== closest.index) {
        // Potential edge creation
        this.candidateEdge = [this.selectedVertexIndex, closest.index];
      }
      this.activeVertexIndex = closest.index;
      this.selectedVertexIndex = closest.index;
      this.dragMode = 'vertex';
      this.element.style.cursor = 'move';

      this.isDragging = true;
      this.dirty = true;

      // Listen for mouse up/move on window
      window.addEventListener('mousemove', this._onMouseMove);
      window.addEventListener('mouseup', this._onMouseUp);
    }
    // Camera control is handled by orbit-camera-controller
  }

  _onMouseMove(event) {
    this.previousMousePos[0] = this.currentMousePos[0];
    this.previousMousePos[1] = this.currentMousePos[1];
    this._getMousePos(event, this.currentMousePos);

    if (!this.isDragging) {
      // Passive hover
      const closest = this._getClosestVertex(this.currentMousePos[0], this.currentMousePos[1]);
      const newHover = (closest.index >= 0 && closest.distance < 25) ? closest.index : -1;

      if (newHover !== this.hoverVertexIndex) {
        this.hoverVertexIndex = newHover;
        this.element.style.cursor = newHover >= 0 ? 'move' : 'grab';
        this.dirty = true;
      }
      return;
    }

    // Check dead zone
    if (!this.exitedDeadZone && !this._insideDeadZone()) {
      this.exitedDeadZone = true;
    }

    if (this.dragMode === 'vertex' && this.exitedDeadZone) {
      this._dragVertex();
    }
    // Camera rotation/pan handled by orbit-camera-controller
  }

  _onMouseUp(event) {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);

    if (!this.isDragging) return;

    this._getMousePos(event, this.currentMousePos);

    if (!this.exitedDeadZone && this._insideDeadZone()) {
      // Click without drag on vertex
      const closest = this._getClosestVertex(this.currentMousePos[0], this.currentMousePos[1]);

      if (this.dragMode === 'vertex') {
        // Started click on a vertex
        if (closest.index >= 0 && closest.distance < 25) {
          // Clicked on existing vertex - maybe create edge
          if (this.candidateEdge) {
            this.mesh.addEdge(this.candidateEdge[0], this.candidateEdge[1]);
          }
          this.selectedVertexIndex = closest.index;
        } else if (this.selectedVertexIndex >= 0) {
          // Clicked in empty space while vertex was selected - spawn new vertex
          this._spawnVertex();
        }
      }
    }

    this.isDragging = false;
    this.dragMode = null;
    this.activeVertexIndex = -1;
    this.candidateEdge = null;
    this.element.style.cursor = this.hoverVertexIndex >= 0 ? 'move' : 'grab';
    this.dirty = true;

    this.onChange();
  }

  _onClick(event) {
    // Handle clicks in empty space (vertex clicks are handled in mousedown)
    const clickPos = this._getMousePos(event);
    const closest = this._getClosestVertex(clickPos[0], clickPos[1]);

    if (closest.index >= 0 && closest.distance < 25) {
      // Clicked on a vertex - already handled by mousedown, but ensure selection
      this.selectedVertexIndex = closest.index;
      this.element.focus();
      this.dirty = true;
    } else if (this.selectedVertexIndex >= 0) {
      // Clicked in empty space with a vertex selected
      if (this.mesh.degree(this.selectedVertexIndex) < 3) {
        // Spawn new vertex if selected vertex has room
        this.currentMousePos[0] = clickPos[0];
        this.currentMousePos[1] = clickPos[1];
        this._spawnVertex();
        this.element.focus();
      } else {
        // Can't spawn - deselect instead (don't preventDefault, allow focus change)
        this.selectedVertexIndex = -1;
        this.dirty = true;
      }
    }
    // If no vertex selected and clicked in empty space, do nothing special
    // (allow natural focus/blur behavior)

    this.onChange();
  }

  // Wheel is handled by orbit-camera-controller

  // ============ Touch Events ============

  _getTouchPos(touch, out = [0, 0]) {
    const rect = this.element.getBoundingClientRect();
    out[0] = touch.clientX - rect.left;
    out[1] = touch.clientY - rect.top;
    return out;
  }

  _onTouchStart(event) {
    if (event.touches.length !== 1) {
      // Multi-touch is handled by camera controller
      this.touchStartedOnVertex = false;
      this.touchVertexIndex = -1;
      return;
    }

    const touchPos = this._getTouchPos(event.touches[0]);
    const closest = this._getClosestVertex(touchPos[0], touchPos[1]);

    if (closest.index >= 0 && closest.distance < 35) {
      // Touch on a vertex - prevent camera from handling
      event.stopImmediatePropagation();
      event.preventDefault();

      this.touchStartedOnVertex = true;
      this.touchVertexIndex = closest.index;
      this.initialMousePos[0] = touchPos[0];
      this.initialMousePos[1] = touchPos[1];
      this.currentMousePos[0] = touchPos[0];
      this.currentMousePos[1] = touchPos[1];
      this.exitedDeadZone = false;

      if (this.selectedVertexIndex >= 0 && this.selectedVertexIndex !== closest.index) {
        this.candidateEdge = [this.selectedVertexIndex, closest.index];
      }
      this.activeVertexIndex = closest.index;
      this.selectedVertexIndex = closest.index;
      this.isDragging = true;
      this.dragMode = 'vertex';
      this.dirty = true;
    } else {
      // Let camera controller handle rotation
      this.touchStartedOnVertex = false;
      this.touchVertexIndex = -1;
    }
  }

  _onTouchMove(event) {
    if (!this.touchStartedOnVertex || event.touches.length !== 1) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    const touchPos = this._getTouchPos(event.touches[0]);
    this.previousMousePos[0] = this.currentMousePos[0];
    this.previousMousePos[1] = this.currentMousePos[1];
    this.currentMousePos[0] = touchPos[0];
    this.currentMousePos[1] = touchPos[1];

    if (!this.exitedDeadZone && !this._insideDeadZone()) {
      this.exitedDeadZone = true;
    }

    if (this.exitedDeadZone && this.activeVertexIndex >= 0) {
      this._dragVertex();
    }
  }

  _onTouchEnd(event) {
    if (!this.touchStartedOnVertex) {
      return;
    }

    if (event.touches.length === 0) {
      // All fingers lifted
      if (!this.exitedDeadZone && this._insideDeadZone()) {
        // Tap without drag
        const closest = this._getClosestVertex(this.currentMousePos[0], this.currentMousePos[1]);

        if (closest.index >= 0 && closest.distance < 35) {
          // Tapped on existing vertex - maybe create edge
          if (this.candidateEdge) {
            this.mesh.addEdge(this.candidateEdge[0], this.candidateEdge[1]);
          }
          this.selectedVertexIndex = closest.index;
        }
      }

      this.touchStartedOnVertex = false;
      this.touchVertexIndex = -1;
      this.isDragging = false;
      this.dragMode = null;
      this.activeVertexIndex = -1;
      this.candidateEdge = null;
      this.dirty = true;
      this.onChange();
    }
  }

  // ============ Keyboard Events ============

  _onKeyDown(event) {
    // Prevent default browser actions for keys we handle
    switch (event.code) {
      case 'Space':
      case 'Backspace':
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.code) {
      case 'Backspace':
        if (this.selectedVertexIndex >= 0) {
          const newIdx = this.mesh.deleteVertex(this.selectedVertexIndex);
          this.selectedVertexIndex = newIdx;
          this.hoverVertexIndex = -1;
          this.activeVertexIndex = -1;
          this.dirty = true;
          event.preventDefault();
          event.stopPropagation();
        }
        break;

      case 'Space':
        this.selectedVertexIndex = -1;
        this.activeVertexIndex = -1;
        this.dirty = true;
        event.preventDefault();
        event.stopPropagation();
        break;

      case 'KeyC':
        if (this.selectedVertexIndex >= 0) {
          const newIdx = this.mesh.collapseVertex(this.selectedVertexIndex);
          this.selectedVertexIndex = newIdx;
          this.hoverVertexIndex = -1;
          this.activeVertexIndex = -1;
          this.dirty = true;
          event.preventDefault();
          event.stopPropagation();
        }
        break;

      case 'KeyS':
        if (this.selectedVertexIndex >= 0) {
          const newIdx = this.mesh.splitVertex(this.selectedVertexIndex);
          this.selectedVertexIndex = newIdx;
          this.hoverVertexIndex = -1;
          this.activeVertexIndex = -1;
          this.dirty = true;
          event.preventDefault();
          event.stopPropagation();
        }
        break;

      case 'KeyE':
        if (this.selectedVertexIndex >= 0) {
          const newIdx = this.mesh.explodeVertex(this.selectedVertexIndex);
          this.selectedVertexIndex = newIdx;
          this.hoverVertexIndex = -1;
          this.activeVertexIndex = -1;
          this.dirty = true;
          event.preventDefault();
          event.stopPropagation();
        }
        break;

      case 'KeyA':
        // Aim camera at selected vertex or centroid
        if (this.selectedVertexIndex >= 0) {
          const pos = this.mesh.getPosition(this.selectedVertexIndex);
          vec3.copy(this.camera.center, pos);
        } else {
          const centroid = this.mesh.computeCentroid();
          vec3.copy(this.camera.center, centroid);
        }
        this.dirty = true;
        event.preventDefault();
        event.stopPropagation();
        break;
    }

    this.onChange();
  }

  // ============ Actions ============

  _dragVertex() {
    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;
    const projectionView = this.projectionView;

    // Get current position in clip space
    const pos = this.mesh.getPosition(this.activeVertexIndex);
    const projected = vec3.create();
    vec3.transformMat4(projected, pos, projectionView);

    // Update x,y based on mouse position
    projected[0] = (2.0 * this.currentMousePos[0]) / width - 1.0;
    projected[1] = 1.0 - (2.0 * this.currentMousePos[1]) / height;

    // Unproject back to world space
    const invProjView = mat4.create();
    mat4.invert(invProjView, projectionView);

    const newPos = vec3.create();
    vec3.transformMat4(newPos, projected, invProjView);

    this.mesh.setPosition(this.activeVertexIndex, newPos[0], newPos[1], newPos[2]);
    this.dirty = true;
  }

  _spawnVertex() {
    // Only spawn if selected vertex has room for another edge
    if (this.mesh.degree(this.selectedVertexIndex) >= 3) return;

    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;
    const projectionView = this.projectionView;

    // Get selected vertex position in clip space (for z depth)
    const pos = this.mesh.getPosition(this.selectedVertexIndex);
    const projected = vec3.create();
    vec3.transformMat4(projected, pos, projectionView);

    // New vertex at mouse position with same depth
    projected[0] = (2.0 * this.currentMousePos[0]) / width - 1.0;
    projected[1] = 1.0 - (2.0 * this.currentMousePos[1]) / height;

    const invProjView = mat4.create();
    mat4.invert(invProjView, projectionView);

    const newPos = vec3.create();
    vec3.transformMat4(newPos, projected, invProjView);

    const newIdx = this.mesh.addVertex(newPos[0], newPos[1], newPos[2]);
    this.mesh.addEdge(this.selectedVertexIndex, newIdx);
    this.selectedVertexIndex = newIdx;
    this.dirty = true;
  }
}

export default MeshInteractions;
