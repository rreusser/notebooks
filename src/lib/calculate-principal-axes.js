// Computes the principal axes of a mesh using eigenvalue decomposition
// Based on the algorithm described in the article
import { evdSymmetric } from './evd-symmetric.js';

export function calculatePrincipalAxesAndCentroid(meshes, { vec3 }) {
  // Allow it to operate on one or multiple meshes
  meshes = Array.isArray(meshes) ? meshes : [meshes];

  var vertexAIndex, vertexBIndex, vertexCIndex;
  var vertexUX, vertexUY, vertexUZ;
  var vertexVX, vertexVY, vertexVZ;
  var vertexWX, vertexWY, vertexWZ;
  var vectorVUX, vectorVUY, vectorVUZ;
  var vectorWUX, vectorWUY, vectorWUZ;
  var normalX, normalY, normalZ;
  var dArea;

  // Surface area moments
  var AXX = 0;
  var AXY = 0;
  var AXZ = 0;
  var AYY = 0;
  var AYZ = 0;
  var AZZ = 0;

  // Set this to epsilon to avoid zero for perfectly closed surfaces
  var areaVectorX = 0;
  var areaVectorY = 0;
  var areaVectorZ = 0;

  var areaAccumulator = 0;
  var centroidAccumulatorX = 0;
  var centroidAccumulatorY = 0;
  var centroidAccumulatorZ = 0;

  for (var i = 0; i < meshes.length; i++) {
    var mesh = meshes[i];

    var faceIndexArray = mesh.faces;
    var vertexArray = mesh.vertices;
    var nbFaces = mesh.count;

    for (var j = 0; j < nbFaces; j++) {
      var faceIndex = j * 3;

      // Base index of the four vertices
      vertexAIndex = faceIndexArray[faceIndex] * 3;
      vertexBIndex = faceIndexArray[faceIndex + 1] * 3;
      vertexCIndex = faceIndexArray[faceIndex + 2] * 3;

      vertexUX = vertexArray[vertexAIndex];
      vertexUY = vertexArray[vertexAIndex + 1];
      vertexUZ = vertexArray[vertexAIndex + 2];

      vertexVX = vertexArray[vertexBIndex];
      vertexVY = vertexArray[vertexBIndex + 1];
      vertexVZ = vertexArray[vertexBIndex + 2];

      vertexWX = vertexArray[vertexCIndex];
      vertexWY = vertexArray[vertexCIndex + 1];
      vertexWZ = vertexArray[vertexCIndex + 2];

      vectorVUX = vertexVX - vertexUX;
      vectorVUY = vertexVY - vertexUY;
      vectorVUZ = vertexVZ - vertexUZ;

      vectorWUX = vertexWX - vertexUX;
      vectorWUY = vertexWY - vertexUY;
      vectorWUZ = vertexWZ - vertexUZ;

      // Compute the area vector
      normalX = 0.5 * (vectorVUY * vectorWUZ - vectorVUZ * vectorWUY);
      normalY = 0.5 * (vectorVUZ * vectorWUX - vectorVUX * vectorWUZ);
      normalZ = 0.5 * (vectorVUX * vectorWUY - vectorVUY * vectorWUX);

      // Compute the area of this triangle
      dArea = Math.sqrt(normalX * normalX + normalY * normalY + normalZ * normalZ);
      areaAccumulator += dArea;

      centroidAccumulatorX += dArea * (vertexUX + vertexVX + vertexWX) / 3;
      centroidAccumulatorY += dArea * (vertexUY + vertexVY + vertexWY) / 3;
      centroidAccumulatorZ += dArea * (vertexUZ + vertexVZ + vertexWZ) / 3;

      // Accumulate the total area
      areaVectorX += normalX;
      areaVectorY += normalY;
      areaVectorZ += normalZ;

      // Accumulate moments of the surface area
      AXX += normalX * normalX;
      AXY += normalX * normalY;
      AXZ += normalX * normalZ;
      AYY += normalY * normalY;
      AYZ += normalY * normalZ;
      AZZ += normalZ * normalZ;
    }
  }

  // Total moment matrix (symmetric so only the lower triangular part is used)
  var AA = [
    [AXX, 0, 0],
    [AXY, AYY, 0],
    [AXZ, AYZ, AZZ],
  ];

  // Decompose the moment matrix into eigenvectors and eigenvalues
  var eig = evdSymmetric(AA);
  var eigenvalues = eig[0];
  var eigenvectors = eig[2];

  // Get two of the alignment axes
  var axisVector1 = vec3.fromValues(eigenvectors[0][0], eigenvectors[1][0], eigenvectors[2][0]);
  var axisVector2 = vec3.fromValues(eigenvectors[0][1], eigenvectors[1][1], eigenvectors[2][1]);

  // Orient relative to area vector
  var areaVector = vec3.fromValues(areaVectorX, areaVectorY, areaVectorZ);
  if (vec3.dot(areaVector, axisVector1) < 0) vec3.scale(axisVector1, axisVector1, -1);
  if (vec3.dot(areaVector, axisVector2) < 0) vec3.scale(axisVector2, axisVector2, -1);

  // Calculate the third axis as the orthogonal vector
  var axisVector3 = vec3.cross(vec3.create(), axisVector1, axisVector2);
  vec3.normalize(axisVector3, axisVector3);

  return {
    matrix: new Float32Array([
      axisVector1[0], axisVector1[1], axisVector1[2], 0,
      axisVector2[0], axisVector2[1], axisVector2[2], 0,
      axisVector3[0], axisVector3[1], axisVector3[2], 0,
      0, 0, 0, 1,
    ]),
    strengths: [
      Math.sqrt(1.0 / eigenvalues[0]),
      Math.sqrt(1.0 / eigenvalues[1]),
      Math.sqrt(1.0 / eigenvalues[2]),
    ],
    centroid: vec3.fromValues(
      centroidAccumulatorX / areaAccumulator,
      centroidAccumulatorY / areaAccumulator,
      centroidAccumulatorZ / areaAccumulator
    ),
    surfaceArea: areaAccumulator,
  };
}
