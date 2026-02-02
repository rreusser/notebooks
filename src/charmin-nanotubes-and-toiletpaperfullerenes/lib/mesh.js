// Mesh data structure for trivalent graphs (max 3 edges per vertex)
// Optimized for physics simulation and interactive editing

export class Mesh {
  constructor() {
    // Vertex positions: flat array [x0,y0,z0, x1,y1,z1, ...]
    this.positions = new Float32Array(0);
    this.vertexCount = 0;
    this._positionCapacity = 0;

    // Per-vertex neighbor indices: [v0_n0, v0_n1, v0_n2, v1_n0, ...]
    // -1 means no neighbor in that slot
    this.neighbors = new Int32Array(0);

    // Edge list for iteration: flat array [v0, v1, v0, v1, ...]
    this.edges = new Uint32Array(0);
    this.edgeCount = 0;
    this._edgeCapacity = 0;

    // Optional cached faces (cleared on topology change)
    this._faces = null;
  }

  // ============ Construction ============

  static fromJSON(json) {
    const mesh = new Mesh();
    const { vertices, edges } = json;

    // Reserve capacity
    mesh._ensureVertexCapacity(vertices.length);
    mesh._ensureEdgeCapacity(edges.length);

    // Add vertices
    for (const v of vertices) {
      mesh._addVertexInternal(v[0], v[1], v[2]);
    }

    // Add edges
    for (const e of edges) {
      mesh._addEdgeInternal(e[0], e[1]);
    }

    return mesh;
  }

  toJSON() {
    const vertices = [];
    for (let i = 0; i < this.vertexCount; i++) {
      const i3 = i * 3;
      vertices.push([
        this.positions[i3],
        this.positions[i3 + 1],
        this.positions[i3 + 2]
      ]);
    }

    const edges = [];
    for (let i = 0; i < this.edgeCount; i++) {
      const i2 = i * 2;
      edges.push([this.edges[i2], this.edges[i2 + 1]]);
    }

    return { vertices, edges };
  }

  clone() {
    return Mesh.fromJSON(this.toJSON());
  }

  // ============ Capacity Management ============

  _ensureVertexCapacity(count) {
    if (count <= this._positionCapacity) return;

    const newCapacity = Math.max(count, this._positionCapacity * 2, 64);

    const newPositions = new Float32Array(newCapacity * 3);
    if (this.positions.length > 0) {
      newPositions.set(this.positions);
    }
    this.positions = newPositions;

    const newNeighbors = new Int32Array(newCapacity * 3);
    newNeighbors.fill(-1);
    if (this.neighbors.length > 0) {
      newNeighbors.set(this.neighbors);
    }
    this.neighbors = newNeighbors;

    this._positionCapacity = newCapacity;
  }

  _ensureEdgeCapacity(count) {
    if (count <= this._edgeCapacity) return;

    const newCapacity = Math.max(count, this._edgeCapacity * 2, 64);

    const newEdges = new Uint32Array(newCapacity * 2);
    if (this.edges.length > 0) {
      newEdges.set(this.edges);
    }
    this.edges = newEdges;

    this._edgeCapacity = newCapacity;
  }

  // ============ Low-level Operations ============

  _addVertexInternal(x, y, z) {
    this._ensureVertexCapacity(this.vertexCount + 1);
    const idx = this.vertexCount;
    const i3 = idx * 3;
    this.positions[i3] = x;
    this.positions[i3 + 1] = y;
    this.positions[i3 + 2] = z;
    this.neighbors[i3] = -1;
    this.neighbors[i3 + 1] = -1;
    this.neighbors[i3 + 2] = -1;
    this.vertexCount++;
    return idx;
  }

  _addEdgeInternal(v0, v1) {
    // Add to edge list
    this._ensureEdgeCapacity(this.edgeCount + 1);
    const edgeIdx = this.edgeCount;
    const i2 = edgeIdx * 2;
    this.edges[i2] = v0;
    this.edges[i2 + 1] = v1;
    this.edgeCount++;

    // Update neighbor lists
    this._addNeighbor(v0, v1);
    this._addNeighbor(v1, v0);

    return edgeIdx;
  }

  _addNeighbor(vertex, neighbor) {
    const i3 = vertex * 3;
    for (let slot = 0; slot < 3; slot++) {
      if (this.neighbors[i3 + slot] === -1) {
        this.neighbors[i3 + slot] = neighbor;
        return true;
      }
    }
    throw new Error(`Vertex ${vertex} already has 3 neighbors`);
  }

  _removeNeighbor(vertex, neighbor) {
    const i3 = vertex * 3;
    for (let slot = 0; slot < 3; slot++) {
      if (this.neighbors[i3 + slot] === neighbor) {
        this.neighbors[i3 + slot] = -1;
        // Compact: shift remaining neighbors down
        this._compactNeighbors(vertex);
        return true;
      }
    }
    return false;
  }

  _compactNeighbors(vertex) {
    const i3 = vertex * 3;
    const n = [
      this.neighbors[i3],
      this.neighbors[i3 + 1],
      this.neighbors[i3 + 2]
    ].filter(x => x !== -1);

    this.neighbors[i3] = n[0] ?? -1;
    this.neighbors[i3 + 1] = n[1] ?? -1;
    this.neighbors[i3 + 2] = n[2] ?? -1;
  }

  // ============ Public Vertex Operations ============

  addVertex(x, y, z) {
    this._faces = null;
    return this._addVertexInternal(x, y, z);
  }

  getPosition(vertex, out = [0, 0, 0]) {
    const i3 = vertex * 3;
    out[0] = this.positions[i3];
    out[1] = this.positions[i3 + 1];
    out[2] = this.positions[i3 + 2];
    return out;
  }

  setPosition(vertex, x, y, z) {
    const i3 = vertex * 3;
    this.positions[i3] = x;
    this.positions[i3 + 1] = y;
    this.positions[i3 + 2] = z;
  }

  degree(vertex) {
    const i3 = vertex * 3;
    let d = 0;
    if (this.neighbors[i3] !== -1) d++;
    if (this.neighbors[i3 + 1] !== -1) d++;
    if (this.neighbors[i3 + 2] !== -1) d++;
    return d;
  }

  getNeighbors(vertex, out = []) {
    const i3 = vertex * 3;
    out.length = 0;
    if (this.neighbors[i3] !== -1) out.push(this.neighbors[i3]);
    if (this.neighbors[i3 + 1] !== -1) out.push(this.neighbors[i3 + 1]);
    if (this.neighbors[i3 + 2] !== -1) out.push(this.neighbors[i3 + 2]);
    return out;
  }

  getNeighbor(vertex, slot) {
    return this.neighbors[vertex * 3 + slot];
  }

  // Delete vertex and all incident edges
  // Returns an adjacent vertex index (adjusted for deletion) or -1
  deleteVertex(vertexIndex) {
    if (vertexIndex < 0 || vertexIndex >= this.vertexCount) return -1;
    this._faces = null;

    // Find an adjacent vertex to return
    const i3 = vertexIndex * 3;
    let adjacentVertex = this.neighbors[i3];

    // Remove all incident edges
    const neighbors = this.getNeighbors(vertexIndex);
    for (const neighbor of neighbors) {
      this._removeEdgeBetween(vertexIndex, neighbor);
    }

    // Remove vertex by swapping with last
    const lastVertex = this.vertexCount - 1;
    if (vertexIndex !== lastVertex) {
      // Copy last vertex data to this slot
      const last3 = lastVertex * 3;
      this.positions[i3] = this.positions[last3];
      this.positions[i3 + 1] = this.positions[last3 + 1];
      this.positions[i3 + 2] = this.positions[last3 + 2];
      this.neighbors[i3] = this.neighbors[last3];
      this.neighbors[i3 + 1] = this.neighbors[last3 + 1];
      this.neighbors[i3 + 2] = this.neighbors[last3 + 2];

      // Update all references to lastVertex -> vertexIndex
      this._remapVertex(lastVertex, vertexIndex);

      // Adjust adjacentVertex if it was the last one
      if (adjacentVertex === lastVertex) {
        adjacentVertex = vertexIndex;
      }
    }

    this.vertexCount--;

    // Adjust adjacentVertex if it was after the deleted vertex
    // (No longer needed with swap-delete, but handle edge case)
    if (adjacentVertex >= this.vertexCount) {
      adjacentVertex = -1;
    }

    return adjacentVertex;
  }

  _removeEdgeBetween(v0, v1) {
    // Find and remove edge from edge list
    for (let i = 0; i < this.edgeCount; i++) {
      const i2 = i * 2;
      const a = this.edges[i2];
      const b = this.edges[i2 + 1];
      if ((a === v0 && b === v1) || (a === v1 && b === v0)) {
        // Swap with last edge
        const lastEdge = this.edgeCount - 1;
        if (i !== lastEdge) {
          this.edges[i2] = this.edges[lastEdge * 2];
          this.edges[i2 + 1] = this.edges[lastEdge * 2 + 1];
        }
        this.edgeCount--;
        break;
      }
    }

    // Remove from neighbor lists
    this._removeNeighbor(v0, v1);
    this._removeNeighbor(v1, v0);
  }

  _remapVertex(oldIndex, newIndex) {
    // Update neighbor references
    for (let v = 0; v < this.vertexCount; v++) {
      const i3 = v * 3;
      for (let slot = 0; slot < 3; slot++) {
        if (this.neighbors[i3 + slot] === oldIndex) {
          this.neighbors[i3 + slot] = newIndex;
        }
      }
    }

    // Update edge list
    for (let i = 0; i < this.edgeCount; i++) {
      const i2 = i * 2;
      if (this.edges[i2] === oldIndex) this.edges[i2] = newIndex;
      if (this.edges[i2 + 1] === oldIndex) this.edges[i2 + 1] = newIndex;
    }
  }

  // ============ Public Edge Operations ============

  addEdge(v0, v1) {
    // Check if edge already exists
    if (this.hasEdge(v0, v1)) return -1;

    // Check degree constraint
    if (this.degree(v0) >= 3 || this.degree(v1) >= 3) return -1;

    this._faces = null;
    return this._addEdgeInternal(v0, v1);
  }

  hasEdge(v0, v1) {
    const i3 = v0 * 3;
    return (
      this.neighbors[i3] === v1 ||
      this.neighbors[i3 + 1] === v1 ||
      this.neighbors[i3 + 2] === v1
    );
  }

  getEdge(edgeIndex, out = [0, 0]) {
    const i2 = edgeIndex * 2;
    out[0] = this.edges[i2];
    out[1] = this.edges[i2 + 1];
    return out;
  }

  // Delete an edge by index, preserving both vertices
  // Returns true if edge was deleted, false if invalid index
  deleteEdge(edgeIndex) {
    if (edgeIndex < 0 || edgeIndex >= this.edgeCount) return false;
    this._faces = null;

    const i2 = edgeIndex * 2;
    const v0 = this.edges[i2];
    const v1 = this.edges[i2 + 1];

    // Remove from neighbor lists
    this._removeNeighbor(v0, v1);
    this._removeNeighbor(v1, v0);

    // Swap with last edge and decrement count
    const lastEdge = this.edgeCount - 1;
    if (edgeIndex !== lastEdge) {
      this.edges[i2] = this.edges[lastEdge * 2];
      this.edges[i2 + 1] = this.edges[lastEdge * 2 + 1];
    }
    this.edgeCount--;

    return true;
  }

  // ============ Stone-Wales Transformation ============

  // Perform a Stone-Wales transformation on an edge
  // Both endpoints must have degree 3
  // Returns the new edge index of the transformed edge, or -1 if failed
  stoneWales(edgeIndex) {
    if (edgeIndex < 0 || edgeIndex >= this.edgeCount) return -1;

    const edge = this.getEdge(edgeIndex);
    const a = edge[0];
    const b = edge[1];

    // Both endpoints must have degree 3
    if (this.degree(a) !== 3 || this.degree(b) !== 3) return -1;

    // Get other neighbors (not the edge endpoints themselves)
    const neighborsA = this.getNeighbors(a).filter(n => n !== b);
    const neighborsB = this.getNeighbors(b).filter(n => n !== a);

    if (neighborsA.length !== 2 || neighborsB.length !== 2) return -1;

    const c = neighborsA[0];
    const d = neighborsA[1];
    const e = neighborsB[0];
    const f = neighborsB[1];

    // Get positions
    const pa = this.getPosition(a);
    const pb = this.getPosition(b);
    const pc = this.getPosition(c);
    const pd = this.getPosition(d);
    const pe = this.getPosition(e);
    const pf = this.getPosition(f);

    // Determine which wings are on the same "side" of the a-b edge.
    // 1. Cross ab with ca to get normal n (perpendicular to H plane)
    // 2. Cross n with ab to get in-plane vector pointing toward c
    // 3. Dot be and bf with this to find which is on same side as c

    const ab = [pb[0] - pa[0], pb[1] - pa[1], pb[2] - pa[2]];
    const ca = [pa[0] - pc[0], pa[1] - pc[1], pa[2] - pc[2]];

    // n = ab × ca (normal to H plane)
    const n = [
      ab[1] * ca[2] - ab[2] * ca[1],
      ab[2] * ca[0] - ab[0] * ca[2],
      ab[0] * ca[1] - ab[1] * ca[0]
    ];

    // inPlane = n × ab (in-plane direction toward c)
    const inPlane = [
      n[1] * ab[2] - n[2] * ab[1],
      n[2] * ab[0] - n[0] * ab[2],
      n[0] * ab[1] - n[1] * ab[0]
    ];

    // Wings from b
    const be = [pe[0] - pb[0], pe[1] - pb[1], pe[2] - pb[2]];
    const bf = [pf[0] - pb[0], pf[1] - pb[1], pf[2] - pb[2]];

    // Dot products tell which of e/f is on same side as c
    const dotE = be[0] * inPlane[0] + be[1] * inPlane[1] + be[2] * inPlane[2];
    const dotF = bf[0] * inPlane[0] + bf[1] * inPlane[1] + bf[2] * inPlane[2];

    // Swap the same-side pair
    let swapC, swapE;
    if (dotE > dotF) {
      // e is on same side as c → swap (c, e)
      swapC = c;
      swapE = e;
    } else {
      // f is on same side as c → swap (c, f)
      swapC = c;
      swapE = f;
    }

    // Perform the swap:
    // - Remove A-swapC and B-swapE
    // - Add A-swapE and B-swapC
    this._removeEdgeBetween(a, swapC);
    this._removeEdgeBetween(b, swapE);
    this._addEdgeInternal(a, swapE);
    this._addEdgeInternal(b, swapC);

    this._faces = null;

    // Find and return the new index of edge A-B
    return this.findEdge(a, b);
  }

  // Find the index of an edge between two vertices, or -1 if not found
  findEdge(v0, v1) {
    for (let i = 0; i < this.edgeCount; i++) {
      const i2 = i * 2;
      const a = this.edges[i2];
      const b = this.edges[i2 + 1];
      if ((a === v0 && b === v1) || (a === v1 && b === v0)) {
        return i;
      }
    }
    return -1;
  }

  // ============ Editing Operations ============

  // Collapse a degree-2 vertex, connecting its two neighbors
  // Returns the index of one of the formerly-adjacent vertices
  collapseVertex(vertexIndex) {
    if (this.degree(vertexIndex) !== 2) return vertexIndex;
    this._faces = null;

    const n0 = this.neighbors[vertexIndex * 3];
    const n1 = this.neighbors[vertexIndex * 3 + 1];

    // Remove the vertex (this removes its edges)
    this.deleteVertex(vertexIndex);

    // Adjust neighbor indices if they were after the deleted vertex
    // With swap-delete, we need to check if they got remapped
    let adj0 = n0;
    let adj1 = n1;

    // If the deleted vertex was swapped with the last one,
    // and n0 or n1 was the last vertex, it's now at vertexIndex
    const wasLast = this.vertexCount; // vertexCount was decremented
    if (n0 === wasLast) adj0 = vertexIndex < wasLast ? vertexIndex : n0;
    if (n1 === wasLast) adj1 = vertexIndex < wasLast ? vertexIndex : n1;

    // But wait - we need to reconsider. After deleteVertex:
    // - vertexCount is now one less
    // - If vertexIndex wasn't the last, lastVertex's data moved to vertexIndex
    // So if n0 or n1 was lastVertex (== this.vertexCount after deletion),
    // it's now at vertexIndex
    if (n0 === this.vertexCount && vertexIndex < this.vertexCount) adj0 = vertexIndex;
    if (n1 === this.vertexCount && vertexIndex < this.vertexCount) adj1 = vertexIndex;

    // Connect the two neighbors
    if (adj0 >= 0 && adj1 >= 0 && adj0 < this.vertexCount && adj1 < this.vertexCount) {
      this.addEdge(adj0, adj1);
    }

    return adj0 >= 0 && adj0 < this.vertexCount ? adj0 : -1;
  }

  // Split a degree-2 vertex by inserting a new vertex on one of its edges
  // Returns the index of the new vertex
  splitVertex(vertexIndex) {
    if (this.degree(vertexIndex) !== 2) return vertexIndex;
    this._faces = null;

    const neighbor = this.neighbors[vertexIndex * 3];
    const pos = this.getPosition(vertexIndex);
    const neighborPos = this.getPosition(neighbor);

    // New vertex at midpoint
    const newVertex = this.addVertex(
      0.5 * (pos[0] + neighborPos[0]),
      0.5 * (pos[1] + neighborPos[1]),
      0.5 * (pos[2] + neighborPos[2])
    );

    // Remove old edge and add two new ones
    this._removeEdgeBetween(vertexIndex, neighbor);
    this._addEdgeInternal(vertexIndex, newVertex);
    this._addEdgeInternal(newVertex, neighbor);

    return newVertex;
  }

  // Explode a vertex: disconnect all but the first edge
  // Each disconnected edge gets its own copy of the vertex
  explodeVertex(vertexIndex) {
    const neighbors = this.getNeighbors(vertexIndex);
    if (neighbors.length <= 1) return vertexIndex;
    this._faces = null;

    const pos = this.getPosition(vertexIndex);

    // Keep first neighbor connected, disconnect others
    for (let i = 1; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // Create new vertex at same position
      const newVertex = this.addVertex(pos[0], pos[1], pos[2]);

      // Remove edge to neighbor
      this._removeEdgeBetween(vertexIndex, neighbor);

      // Add edge from new vertex to neighbor
      this._addEdgeInternal(newVertex, neighbor);
    }

    return vertexIndex;
  }

  // ============ Geometry ============

  computeCentroid(out = [0, 0, 0]) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;

    for (let i = 0; i < this.vertexCount; i++) {
      const i3 = i * 3;
      out[0] += this.positions[i3];
      out[1] += this.positions[i3 + 1];
      out[2] += this.positions[i3 + 2];
    }

    if (this.vertexCount > 0) {
      out[0] /= this.vertexCount;
      out[1] /= this.vertexCount;
      out[2] /= this.vertexCount;
    }

    return out;
  }

  translate(dx, dy, dz) {
    for (let i = 0; i < this.vertexCount; i++) {
      const i3 = i * 3;
      this.positions[i3] += dx;
      this.positions[i3 + 1] += dy;
      this.positions[i3 + 2] += dz;
    }
  }

  center() {
    const c = this.computeCentroid();
    this.translate(-c[0], -c[1], -c[2]);
  }

  // ============ Face Extraction ============

  // Find all cycles up to maxLen using DFS
  // Pure graph traversal - no geometry, no rotation system
  _findAllCycles(maxLen = 8) {
    const cycles = new Set();
    const mesh = this;

    // Canonical key for deduplication (rotation/reflection invariant)
    function canonicalKey(cycle) {
      const minVal = Math.min(...cycle);
      const minIdx = cycle.indexOf(minVal);
      const rotated = [...cycle.slice(minIdx), ...cycle.slice(0, minIdx)];
      const reversed = [rotated[0], ...rotated.slice(1).reverse()];
      const k1 = rotated.join(',');
      const k2 = reversed.join(',');
      return k1 < k2 ? k1 : k2;
    }

    // DFS from each vertex to find cycles
    for (let start = 0; start < this.vertexCount; start++) {
      function dfs(curr, path, visited) {
        if (path.length > maxLen) return;

        for (const next of mesh.getNeighbors(curr)) {
          if (next === start && path.length >= 3) {
            // Found a cycle back to start
            cycles.add(canonicalKey(path));
          } else if (next > start && !visited.has(next)) {
            // Only explore vertices > start to avoid finding same cycle multiple times
            visited.add(next);
            path.push(next);
            dfs(next, path, visited);
            path.pop();
            visited.delete(next);
          }
        }
      }

      dfs(start, [start], new Set([start]));
    }

    return [...cycles].map(k => k.split(',').map(Number));
  }

  // Extract faces: find cycles and select subset where each edge appears in exactly 2 faces
  // Uses greedy selection, preferring shorter cycles
  extractAllFaces(maxLen = 8) {
    const allCycles = this._findAllCycles(maxLen);

    // Sort by length (prefer shorter cycles)
    allCycles.sort((a, b) => a.length - b.length);

    // Greedily select cycles: each edge can appear in at most 2 faces
    const edgeCounts = new Map();
    const selectedFaces = [];

    for (const cycle of allCycles) {
      // Check if adding this cycle would exceed 2 for any edge
      let canAdd = true;
      const cycleEdges = [];

      for (let i = 0; i < cycle.length; i++) {
        const a = cycle[i], b = cycle[(i + 1) % cycle.length];
        const key = a < b ? `${a},${b}` : `${b},${a}`;
        cycleEdges.push(key);
        if ((edgeCounts.get(key) || 0) >= 2) {
          canAdd = false;
          break;
        }
      }

      if (canAdd) {
        selectedFaces.push(cycle);
        for (const key of cycleEdges) {
          edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
        }
      }
    }

    return selectedFaces;
  }

  // Extract faces (cached)
  extractFaces() {
    if (this._faces !== null) return this._faces;
    this._faces = this.extractAllFaces(8);
    return this._faces;
  }

  // Compute signed area of a face polygon using 3D cross product
  // Returns positive for faces with normal pointing "outward" (away from centroid)
  _computeSignedArea(face) {
    if (face.length < 3) return 0;

    // Compute face centroid
    let cx = 0, cy = 0, cz = 0;
    for (const v of face) {
      const p = v * 3;
      cx += this.positions[p];
      cy += this.positions[p + 1];
      cz += this.positions[p + 2];
    }
    cx /= face.length;
    cy /= face.length;
    cz /= face.length;

    // Compute face normal using Newell's method (robust for non-planar polygons)
    let nx = 0, ny = 0, nz = 0;
    const n = face.length;

    for (let i = 0; i < n; i++) {
      const v0 = face[i];
      const v1 = face[(i + 1) % n];
      const p0 = v0 * 3;
      const p1 = v1 * 3;

      const x0 = this.positions[p0], y0 = this.positions[p0 + 1], z0 = this.positions[p0 + 2];
      const x1 = this.positions[p1], y1 = this.positions[p1 + 1], z1 = this.positions[p1 + 2];

      nx += (y0 - y1) * (z0 + z1);
      ny += (z0 - z1) * (x0 + x1);
      nz += (x0 - x1) * (y0 + y1);
    }

    // Compute mesh centroid for reference
    let mcx = 0, mcy = 0, mcz = 0;
    for (let i = 0; i < this.vertexCount; i++) {
      const p = i * 3;
      mcx += this.positions[p];
      mcy += this.positions[p + 1];
      mcz += this.positions[p + 2];
    }
    mcx /= this.vertexCount;
    mcy /= this.vertexCount;
    mcz /= this.vertexCount;

    // Vector from mesh centroid to face centroid
    const dx = cx - mcx;
    const dy = cy - mcy;
    const dz = cz - mcz;

    // Dot product: positive if face normal points away from mesh center
    const dot = nx * dx + ny * dy + nz * dz;

    // Return magnitude with sign based on orientation
    const area = Math.sqrt(nx * nx + ny * ny + nz * nz) * 0.5;
    return dot >= 0 ? area : -area;
  }


  // ============ Iteration Helpers for Physics ============

  // Iterate over edges: callback(v0, v1, edgeIndex)
  forEachEdge(callback) {
    for (let i = 0; i < this.edgeCount; i++) {
      const i2 = i * 2;
      callback(this.edges[i2], this.edges[i2 + 1], i);
    }
  }

  // Iterate over vertex pairs sharing a vertex (for dihedral angles)
  // callback(center, neighbor1, neighbor2)
  forEachAngle(callback) {
    for (let v = 0; v < this.vertexCount; v++) {
      const i3 = v * 3;
      const n0 = this.neighbors[i3];
      const n1 = this.neighbors[i3 + 1];
      const n2 = this.neighbors[i3 + 2];

      if (n0 !== -1 && n1 !== -1) callback(v, n0, n1);
      if (n1 !== -1 && n2 !== -1) callback(v, n1, n2);
      if (n2 !== -1 && n0 !== -1) callback(v, n2, n0);
    }
  }

  // Get the 6-vertex torsion configuration around an edge
  // Returns null if either endpoint has degree < 3
  getTorsionVertices(edgeIndex) {
    const i2 = edgeIndex * 2;
    const a = this.edges[i2];
    const b = this.edges[i2 + 1];

    if (this.degree(a) < 3 || this.degree(b) < 3) return null;

    // Get the two other neighbors of a (not b)
    const neighborsA = this.getNeighbors(a).filter(n => n !== b);
    // Get the two other neighbors of b (not a)
    const neighborsB = this.getNeighbors(b).filter(n => n !== a);

    if (neighborsA.length !== 2 || neighborsB.length !== 2) return null;

    return {
      a, b,
      c: neighborsA[0],
      d: neighborsA[1],
      e: neighborsB[0],
      f: neighborsB[1]
    };
  }
}

export default Mesh;
