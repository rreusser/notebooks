// Shared 517x517 terrain mesh (516x516 grid)
// 512 interior texels + 1 boundary vertex + 1 skirt vertex on each side.
// Vertex format: uint16x2 (u, v) in [0, 516]
// Index format: uint32

export function createTerrainMesh(device) {
  const gridSize = 516;
  const vertCount = (gridSize + 1) * (gridSize + 1); // 515*515 = 265225

  // Vertex buffer: uint16x2
  const vertexData = new Uint16Array(vertCount * 2);
  let vi = 0;
  for (let row = 0; row <= gridSize; row++) {
    for (let col = 0; col <= gridSize; col++) {
      vertexData[vi++] = col;
      vertexData[vi++] = row;
    }
  }

  // Index buffer: triangle list, uint32
  const quadCount = gridSize * gridSize;
  const indexCount = quadCount * 6;
  const indexData = new Uint32Array(indexCount);
  let ii = 0;
  const stride = gridSize + 1;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const tl = row * stride + col;
      const tr = tl + 1;
      const bl = tl + stride;
      const br = bl + 1;
      // Two triangles per quad, CCW winding (when viewed from +Y)
      indexData[ii++] = tl;
      indexData[ii++] = bl;
      indexData[ii++] = tr;
      indexData[ii++] = tr;
      indexData[ii++] = bl;
      indexData[ii++] = br;
    }
  }

  const vertexBuffer = device.createBuffer({
    size: vertexData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertexData);

  const indexBuffer = device.createBuffer({
    size: indexData.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, indexData);

  return {
    vertexBuffer,
    indexBuffer,
    indexCount,
    vertexCount: vertCount,
  };
}
