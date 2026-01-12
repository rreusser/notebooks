/**
 * Debug utilities for reading back GPU buffer values
 */

/**
 * Read back a GPU buffer as Float32Array
 */
export async function readBufferAsFloat32(
  device: GPUDevice,
  buffer: GPUBuffer,
  byteOffset: number = 0,
  byteLength?: number
): Promise<Float32Array> {
  const size = byteLength ?? buffer.size - byteOffset;

  // Create a staging buffer for readback
  const stagingBuffer = device.createBuffer({
    label: 'Debug staging buffer',
    size,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
  });

  // Copy from source buffer to staging buffer
  const encoder = device.createCommandEncoder();
  encoder.copyBufferToBuffer(buffer, byteOffset, stagingBuffer, 0, size);
  device.queue.submit([encoder.finish()]);

  // Wait for GPU work to complete
  await device.queue.onSubmittedWorkDone();

  // Map and read the staging buffer
  await stagingBuffer.mapAsync(GPUMapMode.READ);
  const arrayBuffer = stagingBuffer.getMappedRange();
  const data = new Float32Array(arrayBuffer.slice(0));
  stagingBuffer.unmap();
  stagingBuffer.destroy();

  return data;
}

/**
 * Read a 2D complex buffer (vec2<f32>) and return as [real[], imag[]]
 */
export async function readComplexBuffer2D(
  device: GPUDevice,
  buffer: GPUBuffer,
  width: number,
  height: number
): Promise<{ real: Float32Array; imag: Float32Array }> {
  const data = await readBufferAsFloat32(device, buffer);
  const size = width * height;
  const real = new Float32Array(size);
  const imag = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    real[i] = data[i * 2];
    imag[i] = data[i * 2 + 1];
  }

  return { real, imag };
}

/**
 * Print a small portion of a 2D buffer for debugging
 */
export function printBufferSample(
  data: Float32Array,
  width: number,
  height: number,
  sampleSize: number = 4,
  label: string = 'Buffer'
): void {
  console.log(`\n=== ${label} (${width}x${height}, showing ${sampleSize}x${sampleSize} corner) ===`);

  for (let y = 0; y < Math.min(sampleSize, height); y++) {
    let row = '';
    for (let x = 0; x < Math.min(sampleSize, width); x++) {
      const idx = y * width + x;
      row += data[idx].toFixed(4).padStart(10) + ' ';
    }
    console.log(row);
  }

  // Print some statistics
  let min = Infinity, max = -Infinity, sum = 0;
  for (let i = 0; i < data.length; i++) {
    min = Math.min(min, data[i]);
    max = Math.max(max, data[i]);
    sum += data[i];
  }
  console.log(`Stats: min=${min.toFixed(6)}, max=${max.toFixed(6)}, mean=${(sum / data.length).toFixed(6)}`);
}

/**
 * Compare two buffers and report maximum difference
 */
export function compareBuffers(
  a: Float32Array,
  b: Float32Array,
  label: string = 'Comparison'
): { maxDiff: number; avgDiff: number; match: boolean } {
  if (a.length !== b.length) {
    console.error(`Buffer length mismatch: ${a.length} vs ${b.length}`);
    return { maxDiff: Infinity, avgDiff: Infinity, match: false };
  }

  let maxDiff = 0;
  let sumDiff = 0;
  let maxIdx = 0;

  for (let i = 0; i < a.length; i++) {
    const diff = Math.abs(a[i] - b[i]);
    sumDiff += diff;
    if (diff > maxDiff) {
      maxDiff = diff;
      maxIdx = i;
    }
  }

  const avgDiff = sumDiff / a.length;
  const match = maxDiff < 1e-5;

  console.log(`\n=== ${label} ===`);
  console.log(`Max diff: ${maxDiff.toExponential(4)} at index ${maxIdx}`);
  console.log(`Avg diff: ${avgDiff.toExponential(4)}`);
  console.log(`Match (tol=1e-5): ${match ? 'YES' : 'NO'}`);

  if (!match) {
    console.log(`At max diff: a[${maxIdx}]=${a[maxIdx]}, b[${maxIdx}]=${b[maxIdx]}`);
  }

  return { maxDiff, avgDiff, match };
}

/**
 * Create a simple test pattern in a buffer
 */
export async function fillTestPattern(
  device: GPUDevice,
  buffer: GPUBuffer,
  width: number,
  height: number,
  pattern: 'sine' | 'delta' | 'constant' | 'ramp' = 'sine',
  value: number = 1.0
): Promise<void> {
  const size = width * height;
  const data = new Float32Array(size * 2); // vec2<f32>

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 2;
      let v: number;

      switch (pattern) {
        case 'sine':
          v = Math.sin(2 * Math.PI * x / width) * Math.sin(2 * Math.PI * y / height);
          break;
        case 'delta':
          v = (x === 0 && y === 0) ? value : 0;
          break;
        case 'constant':
          v = value;
          break;
        case 'ramp':
          v = (x + y * width) / (width * height);
          break;
        default:
          v = 0;
      }

      data[idx] = v;      // real
      data[idx + 1] = 0;  // imag
    }
  }

  device.queue.writeBuffer(buffer, 0, data);
  await device.queue.onSubmittedWorkDone();
}

/**
 * Generate expected FFT of a simple pattern for verification
 */
export function computeReferenceDFT1D(input: Float32Array, forward: boolean = true): { real: Float32Array; imag: Float32Array } {
  const N = input.length;
  const real = new Float32Array(N);
  const imag = new Float32Array(N);
  const sign = forward ? -1 : 1;
  const norm = forward ? 1 / Math.sqrt(N) : 1 / Math.sqrt(N); // split normalization

  for (let k = 0; k < N; k++) {
    let sumReal = 0;
    let sumImag = 0;

    for (let n = 0; n < N; n++) {
      const angle = sign * 2 * Math.PI * k * n / N;
      sumReal += input[n] * Math.cos(angle);
      sumImag += input[n] * Math.sin(angle);
    }

    real[k] = sumReal * norm;
    imag[k] = sumImag * norm;
  }

  return { real, imag };
}
