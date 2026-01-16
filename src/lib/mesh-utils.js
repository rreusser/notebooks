// Mesh utility functions
// These take npm dependencies as parameters where needed

// Unindex a mesh (expand indexed vertices to per-face vertices)
export function unindex(model) {
  const { faces, vertices, normals, uvs } = model;
  const result = {
    vertices: new Float32Array(faces.length * 3),
    count: faces.length,
  };
  if (normals) result.normals = new Float32Array(faces.length * 3);
  if (uvs) result.uvs = new Float32Array(faces.length * 2);

  for (let i = 0; i < faces.length; i++) {
    const idx3 = faces[i] * 3;
    result.vertices[i * 3] = vertices[idx3];
    result.vertices[i * 3 + 1] = vertices[idx3 + 1];
    result.vertices[i * 3 + 2] = vertices[idx3 + 2];
    if (normals) {
      result.normals[i * 3] = normals[idx3];
      result.normals[i * 3 + 1] = normals[idx3 + 1];
      result.normals[i * 3 + 2] = normals[idx3 + 2];
    }
    if (uvs) {
      const idx2 = faces[i] * 2;
      result.uvs[i * 2] = uvs[idx2];
      result.uvs[i * 2 + 1] = uvs[idx2 + 1];
    }
  }
  return result;
}

// Mesh a NURBS surface
// Requires vec3 from gl-matrix to be passed in
export function meshNurbsSurface(meshData, spline, opts = {}, { vec3 }) {
  const tmp1 = [], tmp2 = [];
  meshData = meshData || {};
  const computeNormals = !!opts.computeNormals;
  const computeUvs = !!opts.computeUvs;
  const unwrapV = !!opts.unwrapV;

  const [nbUFaces, nbVFaces] = Array.isArray(opts.divisions)
    ? opts.divisions
    : [opts.divisions || 30, opts.divisions || 30];

  const uIsClosed = spline.boundary[0] === 'closed';
  const vIsClosed = spline.boundary[1] === 'closed' && !unwrapV;

  const nbBoundaryAdjustedUFaces = uIsClosed ? nbUFaces : nbUFaces + 1;
  const nbBoundaryAdjustedVFaces = vIsClosed ? nbVFaces : nbVFaces + 1;
  const nbVertices = nbBoundaryAdjustedUFaces * nbBoundaryAdjustedVFaces;

  const vertices = meshData.vertices = meshData.vertices || new Float32Array(nbVertices * 3);
  const faces = meshData.faces = meshData.faces || new Uint32Array(nbUFaces * nbVFaces * 6);
  const normals = computeNormals ? (meshData.normals = meshData.normals || new Float32Array(nbVertices * 3)) : null;
  const uvs = computeUvs ? (meshData.uvs = meshData.uvs || new Float32Array(nbVertices * 2)) : null;

  const dpdu = computeNormals ? spline.evaluator([1, 0]) : null;
  const dpdv = computeNormals ? spline.evaluator([0, 1]) : null;
  const domain = spline.domain;

  for (let i = 0; i < nbBoundaryAdjustedUFaces; i++) {
    const u = domain[0][0] + (domain[0][1] - domain[0][0]) * i / nbUFaces;
    for (let j = 0; j < nbBoundaryAdjustedVFaces; j++) {
      const v = domain[1][0] + (domain[1][1] - domain[1][0]) * j / nbVFaces;
      const index = 3 * (i + nbBoundaryAdjustedUFaces * j);

      spline.evaluate(tmp1, u, v);
      vertices[index] = tmp1[0];
      vertices[index + 1] = tmp1[1];
      vertices[index + 2] = tmp1[2];

      if (computeNormals) {
        dpdu(tmp1, u, v);
        dpdv(tmp2, u, v);
        vec3.normalize(tmp1, vec3.cross(tmp1, tmp1, tmp2));
        normals[index] = tmp1[0];
        normals[index + 1] = tmp1[1];
        normals[index + 2] = tmp1[2];
      }

      if (computeUvs) {
        const uvIndex = 2 * (i + nbBoundaryAdjustedUFaces * j);
        uvs[uvIndex] = u;
        uvs[uvIndex + 1] = v;
      }
    }
  }

  let faceIndex = 0;
  for (let i = 0; i < nbUFaces; i++) {
    let iPlusOne = i + 1;
    if (uIsClosed) iPlusOne = iPlusOne % nbUFaces;
    for (let j = 0; j < nbVFaces; j++) {
      let jPlusOne = j + 1;
      if (vIsClosed) jPlusOne = jPlusOne % nbVFaces;
      faces[faceIndex++] = i + nbBoundaryAdjustedUFaces * j;
      faces[faceIndex++] = iPlusOne + nbBoundaryAdjustedUFaces * j;
      faces[faceIndex++] = iPlusOne + nbBoundaryAdjustedUFaces * jPlusOne;
      faces[faceIndex++] = i + nbBoundaryAdjustedUFaces * j;
      faces[faceIndex++] = iPlusOne + nbBoundaryAdjustedUFaces * jPlusOne;
      faces[faceIndex++] = i + nbBoundaryAdjustedUFaces * jPlusOne;
    }
  }

  return meshData;
}

// Create regl buffers from mesh data
export function createBuffers(regl, mesh, opts = {}) {
  const buffers = {};
  if (mesh.vertices) buffers.vertices = regl.buffer(mesh.vertices);
  if (mesh.normals) buffers.normals = regl.buffer(mesh.normals);
  if (mesh.uvs) buffers.uvs = regl.buffer(mesh.uvs);
  return Object.assign(buffers, { count: mesh.vertices.length / 3 }, opts);
}
