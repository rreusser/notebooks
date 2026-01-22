/**
 * FFT Validation Tests
 *
 * Tests the FFT implementation against known analytical results:
 * 1. Delta function: δ(0,0) → constant in frequency domain
 * 2. Constant: constant → δ(0,0) in frequency domain
 * 3. Single frequency: cos(2πkx/N) → peaks at ±k
 * 4. Round-trip: FFT then IFFT should recover original
 */

import { createFFTPipelines, executeFFT2D, FFTPipelines } from './fft.js';
import { createVec4FFTPipelines, executeVec4FFT2D, Vec4FFTPipelines } from './fft-large.js';

export interface ValidationResult {
  name: string;
  passed: boolean;
  maxError: number;
  details: string;
}

/**
 * Run all FFT validation tests
 */
export async function validateFFT(device: GPUDevice, N: number): Promise<ValidationResult[]> {
  console.log(`\n=== FFT Validation for N=${N} ===`);

  const results: ValidationResult[] = [];

  // Create pipelines
  const pipelines = createFFTPipelines(device, N, 'f32');
  const vec4Pipelines = createVec4FFTPipelines(device, N, device.limits.maxComputeWorkgroupSizeX, 'f32');

  console.log(`Large FFT mode: ${pipelines.isLarge}, R=${pipelines.largePipelines?.R || 1}, C=${pipelines.largePipelines?.C || N}`);

  // Create buffers (vec2 format: re, im pairs)
  const bufferSize = N * N * 2 * 4; // N×N complex numbers, 2 floats each, 4 bytes per float
  const vec4BufferSize = N * N * 4 * 4; // N×N vec4s (2 complex numbers each)

  const inputBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
  });

  const outputBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const temp0 = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const temp1 = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const readbackBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
  });

  // Vec4 buffers
  const vec4InputBuffer = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
  });

  const vec4OutputBuffer = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const vec4Temp0 = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const vec4Temp1 = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const vec4ReadbackBuffer = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
  });

  // Helper to run FFT and read back results
  async function runFFT(input: Float32Array, forward: boolean): Promise<Float32Array> {
    device.queue.writeBuffer(inputBuffer, 0, input);

    executeFFT2D({
      device,
      pipelines,
      input: inputBuffer,
      output: outputBuffer,
      temp: [temp0, temp1],
      N,
      forward,
      splitNormalization: true
    });

    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, bufferSize);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();

    return result;
  }

  // Helper to run Vec4 FFT and read back results
  async function runVec4FFT(input: Float32Array, forward: boolean): Promise<Float32Array> {
    device.queue.writeBuffer(vec4InputBuffer, 0, input);

    executeVec4FFT2D({
      device,
      pipelines: vec4Pipelines,
      input: vec4InputBuffer,
      output: vec4OutputBuffer,
      temp: [vec4Temp0, vec4Temp1],
      N,
      forward,
      splitNormalization: true
    });

    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(vec4OutputBuffer, 0, vec4ReadbackBuffer, 0, vec4BufferSize);
    device.queue.submit([encoder.finish()]);

    await vec4ReadbackBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(vec4ReadbackBuffer.getMappedRange().slice(0));
    vec4ReadbackBuffer.unmap();

    return result;
  }

  // Test 1: Delta function at origin
  // FFT of δ(0,0) = 1/(N) for all frequencies (with split normalization: 1/sqrt(N²) = 1/N)
  {
    const input = new Float32Array(N * N * 2);
    input[0] = 1.0; // Real part at (0,0)
    input[1] = 0.0; // Imag part at (0,0)

    const output = await runFFT(input, true);

    // Expected: constant 1/N everywhere
    const expected = 1.0 / N;
    let maxError = 0;
    let maxErrorIdx = 0;
    let sumRe = 0, sumIm = 0;
    let minRe = Infinity, maxRe = -Infinity;

    for (let i = 0; i < N * N; i++) {
      const re = output[i * 2];
      const im = output[i * 2 + 1];
      sumRe += re;
      sumIm += im;
      minRe = Math.min(minRe, re);
      maxRe = Math.max(maxRe, re);
      const error = Math.max(Math.abs(re - expected), Math.abs(im));
      if (error > maxError) {
        maxError = error;
        maxErrorIdx = i;
      }
    }

    const passed = maxError < 1e-5;
    const y = Math.floor(maxErrorIdx / N);
    const x = maxErrorIdx % N;
    results.push({
      name: 'Delta function forward FFT (vec2)',
      passed,
      maxError,
      details: `Expected ${expected.toFixed(6)} everywhere. Range: [${minRe.toFixed(6)}, ${maxRe.toFixed(6)}]. Max error ${maxError.toExponential(3)} at (${x},${y}). Value there: (${output[maxErrorIdx*2].toFixed(6)}, ${output[maxErrorIdx*2+1].toFixed(6)})`
    });
    console.log(`Test 1 (Delta FFT vec2): ${passed ? 'PASS' : 'FAIL'}`);
    console.log(`  Expected: ${expected.toFixed(6)}, Range: [${minRe.toFixed(6)}, ${maxRe.toFixed(6)}]`);
    console.log(`  Max error: ${maxError.toExponential(3)} at (${x},${y})`);
  }

  // Test 1b: Delta function with Vec4 FFT
  {
    const input = new Float32Array(N * N * 4);
    input[0] = 1.0; // re1 at (0,0)
    input[1] = 0.0; // im1 at (0,0)
    input[2] = 1.0; // re2 at (0,0) - same signal in both channels
    input[3] = 0.0; // im2 at (0,0)

    const output = await runVec4FFT(input, true);

    const expected = 1.0 / N;
    let maxError1 = 0, maxError2 = 0;
    let maxErrorIdx1 = 0, maxErrorIdx2 = 0;

    for (let i = 0; i < N * N; i++) {
      const re1 = output[i * 4 + 0];
      const im1 = output[i * 4 + 1];
      const re2 = output[i * 4 + 2];
      const im2 = output[i * 4 + 3];

      const error1 = Math.max(Math.abs(re1 - expected), Math.abs(im1));
      const error2 = Math.max(Math.abs(re2 - expected), Math.abs(im2));

      if (error1 > maxError1) { maxError1 = error1; maxErrorIdx1 = i; }
      if (error2 > maxError2) { maxError2 = error2; maxErrorIdx2 = i; }
    }

    const maxError = Math.max(maxError1, maxError2);
    const passed = maxError < 1e-5;
    const y1 = Math.floor(maxErrorIdx1 / N), x1 = maxErrorIdx1 % N;
    const y2 = Math.floor(maxErrorIdx2 / N), x2 = maxErrorIdx2 % N;

    results.push({
      name: 'Delta function forward FFT (vec4)',
      passed,
      maxError,
      details: `Ch1 max error: ${maxError1.toExponential(3)} at (${x1},${y1}), Ch2 max error: ${maxError2.toExponential(3)} at (${x2},${y2})`
    });
    console.log(`Test 1b (Delta FFT vec4): ${passed ? 'PASS' : 'FAIL'}`);
    console.log(`  Ch1 error: ${maxError1.toExponential(3)} at (${x1},${y1}), Ch2 error: ${maxError2.toExponential(3)} at (${x2},${y2})`);
  }

  // Test 2: Constant function
  // FFT of constant c = c*N*δ(0,0) (with split norm: c*sqrt(N²) = c*N at origin)
  {
    const c = 1.0;
    const input = new Float32Array(N * N * 2);
    for (let i = 0; i < N * N; i++) {
      input[i * 2] = c;
      input[i * 2 + 1] = 0;
    }

    const output = await runFFT(input, true);

    // Expected: N at (0,0), 0 elsewhere
    const expectedAtOrigin = c * N;
    let maxError = 0;

    // Check origin
    const originError = Math.max(
      Math.abs(output[0] - expectedAtOrigin),
      Math.abs(output[1])
    );
    maxError = originError;

    // Check all other values are ~0
    for (let i = 1; i < N * N; i++) {
      const re = output[i * 2];
      const im = output[i * 2 + 1];
      const error = Math.max(Math.abs(re), Math.abs(im));
      maxError = Math.max(maxError, error);
    }

    const passed = maxError < 1e-4;
    results.push({
      name: 'Constant function forward FFT',
      passed,
      maxError,
      details: `Expected ${expectedAtOrigin.toFixed(2)} at origin, 0 elsewhere. Origin: (${output[0].toFixed(4)}, ${output[1].toFixed(4)}), max error: ${maxError.toExponential(3)}`
    });
    console.log(`Test 2 (Constant FFT): ${passed ? 'PASS' : 'FAIL'} - max error ${maxError.toExponential(3)}`);
  }

  // Test 3: Cosine function
  // cos(2πkx/N) has peaks at frequencies k and N-k
  {
    const k = 3; // frequency
    const input = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        input[idx] = Math.cos(2 * Math.PI * k * x / N);
        input[idx + 1] = 0;
      }
    }

    const output = await runFFT(input, true);

    // Expected: peaks at (k, 0) and (N-k, 0), value N/2 each (with split norm: sqrt(N²)/2 = N/2)
    const expectedPeak = N / 2;
    let maxError = 0;
    let peakError = 0;

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        const re = output[idx];
        const im = output[idx + 1];

        if ((x === k || x === N - k) && y === 0) {
          // Should have peak here
          const error = Math.max(Math.abs(re - expectedPeak), Math.abs(im));
          peakError = Math.max(peakError, error);
        } else {
          // Should be ~0
          const error = Math.max(Math.abs(re), Math.abs(im));
          maxError = Math.max(maxError, error);
        }
      }
    }

    const passed = peakError < 1e-4 && maxError < 1e-4;
    results.push({
      name: 'Cosine function forward FFT',
      passed,
      maxError: Math.max(peakError, maxError),
      details: `Expected peaks of ${expectedPeak.toFixed(2)} at k=${k} and k=${N-k}. Peak error: ${peakError.toExponential(3)}, other error: ${maxError.toExponential(3)}`
    });
    console.log(`Test 3 (Cosine FFT): ${passed ? 'PASS' : 'FAIL'} - peak error ${peakError.toExponential(3)}, other ${maxError.toExponential(3)}`);
  }

  // Test 4: Round-trip (FFT then IFFT)
  {
    // Random-ish input
    const input = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        input[idx] = Math.sin(x * 0.1) * Math.cos(y * 0.2) + Math.cos(x * 0.3 + y * 0.1);
        input[idx + 1] = Math.cos(x * 0.15) * Math.sin(y * 0.25);
      }
    }

    // Forward FFT
    const freq = await runFFT(input, true);

    // Copy freq to input buffer for inverse
    device.queue.writeBuffer(inputBuffer, 0, freq);

    // Inverse FFT
    executeFFT2D({
      device,
      pipelines,
      input: inputBuffer,
      output: outputBuffer,
      temp: [temp0, temp1],
      N,
      forward: false,
      splitNormalization: true
    });

    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, bufferSize);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const recovered = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();

    // Compare
    let maxError = 0;
    for (let i = 0; i < N * N * 2; i++) {
      const error = Math.abs(recovered[i] - input[i]);
      maxError = Math.max(maxError, error);
    }

    const passed = maxError < 1e-4;
    results.push({
      name: 'Round-trip FFT→IFFT (vec2)',
      passed,
      maxError,
      details: `Max error: ${maxError.toExponential(3)}`
    });
    console.log(`Test 4 (Round-trip vec2): ${passed ? 'PASS' : 'FAIL'} - max error ${maxError.toExponential(3)}`);
  }

  // Test 5: Vec4 round-trip
  // Pack two identical signals into vec4 format and verify both recover correctly
  {
    // Create a test signal
    const signal = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        signal[idx] = Math.sin(x * 0.1) * Math.cos(y * 0.2) + Math.cos(x * 0.3 + y * 0.1);
        signal[idx + 1] = Math.cos(x * 0.15) * Math.sin(y * 0.25);
      }
    }

    // Pack into vec4 format: (re1, im1, re2, im2) where signal1 = signal2
    const vec4Input = new Float32Array(N * N * 4);
    for (let i = 0; i < N * N; i++) {
      vec4Input[i * 4 + 0] = signal[i * 2 + 0]; // re1
      vec4Input[i * 4 + 1] = signal[i * 2 + 1]; // im1
      vec4Input[i * 4 + 2] = signal[i * 2 + 0]; // re2 (same as re1)
      vec4Input[i * 4 + 3] = signal[i * 2 + 1]; // im2 (same as im1)
    }

    // Forward FFT
    const vec4Freq = await runVec4FFT(vec4Input, true);

    // Inverse FFT
    device.queue.writeBuffer(vec4InputBuffer, 0, vec4Freq);

    executeVec4FFT2D({
      device,
      pipelines: vec4Pipelines,
      input: vec4InputBuffer,
      output: vec4OutputBuffer,
      temp: [vec4Temp0, vec4Temp1],
      N,
      forward: false,
      splitNormalization: true
    });

    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(vec4OutputBuffer, 0, vec4ReadbackBuffer, 0, vec4BufferSize);
    device.queue.submit([encoder.finish()]);

    await vec4ReadbackBuffer.mapAsync(GPUMapMode.READ);
    const vec4Recovered = new Float32Array(vec4ReadbackBuffer.getMappedRange().slice(0));
    vec4ReadbackBuffer.unmap();

    // Compare both channels
    let maxError1 = 0;
    let maxError2 = 0;
    for (let i = 0; i < N * N; i++) {
      const error1Re = Math.abs(vec4Recovered[i * 4 + 0] - signal[i * 2 + 0]);
      const error1Im = Math.abs(vec4Recovered[i * 4 + 1] - signal[i * 2 + 1]);
      const error2Re = Math.abs(vec4Recovered[i * 4 + 2] - signal[i * 2 + 0]);
      const error2Im = Math.abs(vec4Recovered[i * 4 + 3] - signal[i * 2 + 1]);
      maxError1 = Math.max(maxError1, error1Re, error1Im);
      maxError2 = Math.max(maxError2, error2Re, error2Im);
    }

    const maxError = Math.max(maxError1, maxError2);
    const passed = maxError < 1e-4;
    results.push({
      name: 'Round-trip FFT→IFFT (vec4)',
      passed,
      maxError,
      details: `Channel 1 error: ${maxError1.toExponential(3)}, Channel 2 error: ${maxError2.toExponential(3)}`
    });
    console.log(`Test 5 (Round-trip vec4): ${passed ? 'PASS' : 'FAIL'} - ch1: ${maxError1.toExponential(3)}, ch2: ${maxError2.toExponential(3)}`);
  }

  // Test 6: Vec4 should match Vec2
  // Run the same signal through both and compare
  {
    const signal = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        signal[idx] = Math.sin(x * 0.1) * Math.cos(y * 0.2);
        signal[idx + 1] = 0;
      }
    }

    // Run through vec2 FFT
    const vec2Result = await runFFT(signal, true);

    // Pack into vec4 and run
    const vec4Input = new Float32Array(N * N * 4);
    for (let i = 0; i < N * N; i++) {
      vec4Input[i * 4 + 0] = signal[i * 2 + 0];
      vec4Input[i * 4 + 1] = signal[i * 2 + 1];
      vec4Input[i * 4 + 2] = signal[i * 2 + 0];
      vec4Input[i * 4 + 3] = signal[i * 2 + 1];
    }

    const vec4Result = await runVec4FFT(vec4Input, true);

    // Compare vec2 result with both vec4 channels
    let maxError = 0;
    for (let i = 0; i < N * N; i++) {
      const vec2Re = vec2Result[i * 2 + 0];
      const vec2Im = vec2Result[i * 2 + 1];
      const vec4Re1 = vec4Result[i * 4 + 0];
      const vec4Im1 = vec4Result[i * 4 + 1];
      const vec4Re2 = vec4Result[i * 4 + 2];
      const vec4Im2 = vec4Result[i * 4 + 3];

      const error1 = Math.max(Math.abs(vec4Re1 - vec2Re), Math.abs(vec4Im1 - vec2Im));
      const error2 = Math.max(Math.abs(vec4Re2 - vec2Re), Math.abs(vec4Im2 - vec2Im));
      maxError = Math.max(maxError, error1, error2);
    }

    const passed = maxError < 1e-5;
    results.push({
      name: 'Vec4 matches Vec2 (forward)',
      passed,
      maxError,
      details: `Max difference between vec2 and vec4 results: ${maxError.toExponential(3)}`
    });
    console.log(`Test 6 (Vec4 vs Vec2 forward): ${passed ? 'PASS' : 'FAIL'} - max diff ${maxError.toExponential(3)}`);
  }

  // Test 7: Vec4 inverse should match Vec2 inverse
  {
    // Create frequency-domain data
    const freqData = new Float32Array(N * N * 2);
    // Put some energy at a few frequencies
    freqData[0] = 1.0; // DC
    freqData[2 * 5 * 2] = 0.5; // freq 5
    freqData[2 * (N - 5) * 2] = 0.5; // freq N-5
    freqData[(3 * N + 7) * 2] = 0.3; // freq (7, 3)

    // Run through vec2 IFFT
    device.queue.writeBuffer(inputBuffer, 0, freqData);
    executeFFT2D({
      device,
      pipelines,
      input: inputBuffer,
      output: outputBuffer,
      temp: [temp0, temp1],
      N,
      forward: false,
      splitNormalization: true
    });

    let encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, bufferSize);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const vec2Result = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();

    // Pack into vec4 and run IFFT
    const vec4Input = new Float32Array(N * N * 4);
    for (let i = 0; i < N * N; i++) {
      vec4Input[i * 4 + 0] = freqData[i * 2 + 0];
      vec4Input[i * 4 + 1] = freqData[i * 2 + 1];
      vec4Input[i * 4 + 2] = freqData[i * 2 + 0];
      vec4Input[i * 4 + 3] = freqData[i * 2 + 1];
    }

    device.queue.writeBuffer(vec4InputBuffer, 0, vec4Input);
    executeVec4FFT2D({
      device,
      pipelines: vec4Pipelines,
      input: vec4InputBuffer,
      output: vec4OutputBuffer,
      temp: [vec4Temp0, vec4Temp1],
      N,
      forward: false,
      splitNormalization: true
    });

    encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(vec4OutputBuffer, 0, vec4ReadbackBuffer, 0, vec4BufferSize);
    device.queue.submit([encoder.finish()]);

    await vec4ReadbackBuffer.mapAsync(GPUMapMode.READ);
    const vec4Result = new Float32Array(vec4ReadbackBuffer.getMappedRange().slice(0));
    vec4ReadbackBuffer.unmap();

    // Compare
    let maxError = 0;
    let maxErrorIdx = 0;
    for (let i = 0; i < N * N; i++) {
      const vec2Re = vec2Result[i * 2 + 0];
      const vec2Im = vec2Result[i * 2 + 1];
      const vec4Re1 = vec4Result[i * 4 + 0];
      const vec4Im1 = vec4Result[i * 4 + 1];

      const error = Math.max(Math.abs(vec4Re1 - vec2Re), Math.abs(vec4Im1 - vec2Im));
      if (error > maxError) {
        maxError = error;
        maxErrorIdx = i;
      }
    }

    const passed = maxError < 1e-5;
    const y = Math.floor(maxErrorIdx / N);
    const x = maxErrorIdx % N;
    results.push({
      name: 'Vec4 matches Vec2 (inverse)',
      passed,
      maxError,
      details: `Max diff: ${maxError.toExponential(3)} at (${x}, ${y})`
    });
    console.log(`Test 7 (Vec4 vs Vec2 inverse): ${passed ? 'PASS' : 'FAIL'} - max diff ${maxError.toExponential(3)} at (${x}, ${y})`);
  }

  // Test 8: Direct comparison of vec2 vs vec4 for delta function
  // This is the clearest test for finding discrepancies
  {
    console.log('\n--- Direct vec2 vs vec4 delta comparison ---');

    // Delta function input
    const deltaVec2 = new Float32Array(N * N * 2);
    deltaVec2[0] = 1.0;

    const deltaVec4 = new Float32Array(N * N * 4);
    deltaVec4[0] = 1.0;
    deltaVec4[2] = 1.0; // Same signal in both channels

    // Run both FFTs
    const vec2Result = await runFFT(deltaVec2, true);
    const vec4Result = await runVec4FFT(deltaVec4, true);

    // Find differences
    let maxDiff = 0;
    let maxDiffIdx = 0;
    const diffs: { idx: number; x: number; y: number; vec2: [number, number]; vec4: [number, number]; diff: number }[] = [];

    for (let i = 0; i < N * N; i++) {
      const vec2Re = vec2Result[i * 2];
      const vec2Im = vec2Result[i * 2 + 1];
      const vec4Re = vec4Result[i * 4];
      const vec4Im = vec4Result[i * 4 + 1];

      const diff = Math.max(Math.abs(vec4Re - vec2Re), Math.abs(vec4Im - vec2Im));
      if (diff > maxDiff) {
        maxDiff = diff;
        maxDiffIdx = i;
      }

      // Track significant differences
      if (diff > 1e-6) {
        const y = Math.floor(i / N);
        const x = i % N;
        diffs.push({ idx: i, x, y, vec2: [vec2Re, vec2Im], vec4: [vec4Re, vec4Im], diff });
      }
    }

    // Sort by diff and show top issues
    diffs.sort((a, b) => b.diff - a.diff);
    if (diffs.length > 0) {
      console.log(`Found ${diffs.length} positions with diff > 1e-6. Top 10:`);
      for (const d of diffs.slice(0, 10)) {
        console.log(`  (${d.x}, ${d.y}): vec2=(${d.vec2[0].toFixed(6)}, ${d.vec2[1].toFixed(6)}) vs vec4=(${d.vec4[0].toFixed(6)}, ${d.vec4[1].toFixed(6)}) diff=${d.diff.toExponential(3)}`);
      }

      // Look for patterns in the differences
      const xCoords = diffs.slice(0, 100).map(d => d.x);
      const yCoords = diffs.slice(0, 100).map(d => d.y);
      const uniqueX = [...new Set(xCoords)].sort((a, b) => a - b);
      const uniqueY = [...new Set(yCoords)].sort((a, b) => a - b);
      console.log(`  X coords with issues: ${uniqueX.slice(0, 20).join(', ')}${uniqueX.length > 20 ? '...' : ''}`);
      console.log(`  Y coords with issues: ${uniqueY.slice(0, 20).join(', ')}${uniqueY.length > 20 ? '...' : ''}`);
    }

    const passed = maxDiff < 1e-5;
    const y = Math.floor(maxDiffIdx / N);
    const x = maxDiffIdx % N;
    results.push({
      name: 'Vec2 vs Vec4 delta function comparison',
      passed,
      maxError: maxDiff,
      details: `Max diff: ${maxDiff.toExponential(3)} at (${x},${y}). Total positions with diff > 1e-6: ${diffs.length}`
    });
    console.log(`Test 8 (Delta vec2 vs vec4): ${passed ? 'PASS' : 'FAIL'} - max diff ${maxDiff.toExponential(3)} at (${x},${y})`);
  }

  // Run high-frequency tests (for detecting axis-aligned artifacts and even-odd issues)
  console.log('\n--- High-frequency pattern tests ---');
  const hfResults = await testHighFrequencyContent(device, pipelines, vec4Pipelines, N);
  results.push(...hfResults);

  // Cleanup
  inputBuffer.destroy();
  outputBuffer.destroy();
  temp0.destroy();
  temp1.destroy();
  readbackBuffer.destroy();
  vec4InputBuffer.destroy();
  vec4OutputBuffer.destroy();
  vec4Temp0.destroy();
  vec4Temp1.destroy();
  vec4ReadbackBuffer.destroy();

  // Summary
  console.log(`\n=== Summary for N=${N} ===`);
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`Passed: ${passed}/${results.length}`);
  if (failed > 0) {
    console.log('Failed tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.name}: ${r.details}`);
    });
  }

  return results;
}

// Test 8: Check for axis-aligned artifacts by testing high-frequency content
async function testHighFrequencyContent(
  device: GPUDevice,
  pipelines: FFTPipelines,
  vec4Pipelines: Vec4FFTPipelines,
  N: number
): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  const bufferSize = N * N * 2 * 4;
  const vec4BufferSize = N * N * 4 * 4;

  const inputBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
  });
  const outputBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });
  const temp0 = device.createBuffer({ size: bufferSize, usage: GPUBufferUsage.STORAGE });
  const temp1 = device.createBuffer({ size: bufferSize, usage: GPUBufferUsage.STORAGE });
  const readbackBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
  });

  const vec4Input = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  });
  const vec4Output = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });
  const vec4Temp0 = device.createBuffer({ size: vec4BufferSize, usage: GPUBufferUsage.STORAGE });
  const vec4Temp1 = device.createBuffer({ size: vec4BufferSize, usage: GPUBufferUsage.STORAGE });
  const vec4Readback = device.createBuffer({
    size: vec4BufferSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
  });

  // Test: High-frequency checkerboard pattern
  // f(x,y) = (-1)^(x+y) should have all energy at Nyquist frequency (N/2, N/2)
  {
    const input = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        input[idx] = ((x + y) % 2 === 0) ? 1.0 : -1.0;
        input[idx + 1] = 0;
      }
    }

    device.queue.writeBuffer(inputBuffer, 0, input);
    executeFFT2D({
      device, pipelines,
      input: inputBuffer, output: outputBuffer, temp: [temp0, temp1],
      N, forward: true, splitNormalization: true
    });

    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, bufferSize);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();

    // Energy should be at (N/2, N/2)
    const nyquistIdx = (N / 2 * N + N / 2) * 2;
    const nyquistMag = Math.sqrt(result[nyquistIdx] ** 2 + result[nyquistIdx + 1] ** 2);
    const expectedMag = N; // Split norm: sqrt(N^2) = N

    let otherMaxMag = 0;
    for (let i = 0; i < N * N; i++) {
      if (i === N / 2 * N + N / 2) continue;
      const mag = Math.sqrt(result[i * 2] ** 2 + result[i * 2 + 1] ** 2);
      otherMaxMag = Math.max(otherMaxMag, mag);
    }

    const passed = Math.abs(nyquistMag - expectedMag) < 1e-4 && otherMaxMag < 1e-4;
    results.push({
      name: 'Checkerboard (Nyquist) pattern',
      passed,
      maxError: Math.max(Math.abs(nyquistMag - expectedMag), otherMaxMag),
      details: `Nyquist mag: ${nyquistMag.toFixed(4)} (expected ${expectedMag}), other max: ${otherMaxMag.toExponential(3)}`
    });
    console.log(`Checkerboard test: ${passed ? 'PASS' : 'FAIL'} - Nyquist: ${nyquistMag.toFixed(4)}, other: ${otherMaxMag.toExponential(3)}`);
  }

  // Test: Alternating rows pattern (even-odd artifact detector)
  // f(x,y) = (-1)^y should have energy only at (0, N/2)
  {
    const input = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        input[idx] = (y % 2 === 0) ? 1.0 : -1.0;
        input[idx + 1] = 0;
      }
    }

    device.queue.writeBuffer(inputBuffer, 0, input);
    executeFFT2D({
      device, pipelines,
      input: inputBuffer, output: outputBuffer, temp: [temp0, temp1],
      N, forward: true, splitNormalization: true
    });

    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, bufferSize);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();

    // Energy should be at (0, N/2)
    const peakIdx = (N / 2 * N + 0) * 2;
    const peakMag = Math.sqrt(result[peakIdx] ** 2 + result[peakIdx + 1] ** 2);
    const expectedMag = N;

    let otherMaxMag = 0;
    let worstOtherIdx = 0;
    for (let i = 0; i < N * N; i++) {
      if (i === N / 2 * N) continue;
      const mag = Math.sqrt(result[i * 2] ** 2 + result[i * 2 + 1] ** 2);
      if (mag > otherMaxMag) {
        otherMaxMag = mag;
        worstOtherIdx = i;
      }
    }

    const passed = Math.abs(peakMag - expectedMag) < 1e-4 && otherMaxMag < 1e-4;
    const worstY = Math.floor(worstOtherIdx / N);
    const worstX = worstOtherIdx % N;
    results.push({
      name: 'Alternating rows (even-odd detector)',
      passed,
      maxError: Math.max(Math.abs(peakMag - expectedMag), otherMaxMag),
      details: `Peak at (0,${N/2}): ${peakMag.toFixed(4)} (expected ${expectedMag}), worst other: ${otherMaxMag.toExponential(3)} at (${worstX},${worstY})`
    });
    console.log(`Alt rows test: ${passed ? 'PASS' : 'FAIL'} - peak: ${peakMag.toFixed(4)}, worst other: ${otherMaxMag.toExponential(3)} at (${worstX},${worstY})`);
  }

  // Test: Compare vec2 vs vec4 for high-frequency content
  {
    const input = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const idx = (y * N + x) * 2;
        // Mix of frequencies including high ones
        input[idx] = Math.cos(2 * Math.PI * (N/4) * x / N) * Math.cos(2 * Math.PI * (N/4) * y / N);
        input[idx + 1] = 0;
      }
    }

    // Vec2 FFT
    device.queue.writeBuffer(inputBuffer, 0, input);
    executeFFT2D({
      device, pipelines,
      input: inputBuffer, output: outputBuffer, temp: [temp0, temp1],
      N, forward: true, splitNormalization: true
    });

    let encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, bufferSize);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const vec2Result = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();

    // Vec4 FFT
    const vec4InputData = new Float32Array(N * N * 4);
    for (let i = 0; i < N * N; i++) {
      vec4InputData[i * 4 + 0] = input[i * 2];
      vec4InputData[i * 4 + 1] = input[i * 2 + 1];
      vec4InputData[i * 4 + 2] = input[i * 2];
      vec4InputData[i * 4 + 3] = input[i * 2 + 1];
    }

    device.queue.writeBuffer(vec4Input, 0, vec4InputData);
    executeVec4FFT2D({
      device, pipelines: vec4Pipelines,
      input: vec4Input, output: vec4Output, temp: [vec4Temp0, vec4Temp1],
      N, forward: true, splitNormalization: true
    });

    encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(vec4Output, 0, vec4Readback, 0, vec4BufferSize);
    device.queue.submit([encoder.finish()]);

    await vec4Readback.mapAsync(GPUMapMode.READ);
    const vec4Result = new Float32Array(vec4Readback.getMappedRange().slice(0));
    vec4Readback.unmap();

    let maxDiff = 0;
    let maxDiffIdx = 0;
    for (let i = 0; i < N * N; i++) {
      const diffRe = Math.abs(vec4Result[i * 4] - vec2Result[i * 2]);
      const diffIm = Math.abs(vec4Result[i * 4 + 1] - vec2Result[i * 2 + 1]);
      const diff = Math.max(diffRe, diffIm);
      if (diff > maxDiff) {
        maxDiff = diff;
        maxDiffIdx = i;
      }
    }

    const y = Math.floor(maxDiffIdx / N);
    const x = maxDiffIdx % N;
    const passed = maxDiff < 1e-5;
    results.push({
      name: 'Vec4 vs Vec2 high-frequency comparison',
      passed,
      maxError: maxDiff,
      details: `Max diff: ${maxDiff.toExponential(3)} at (${x},${y})`
    });
    console.log(`High-freq vec4 vs vec2: ${passed ? 'PASS' : 'FAIL'} - max diff ${maxDiff.toExponential(3)} at (${x},${y})`);
  }

  // Cleanup
  inputBuffer.destroy();
  outputBuffer.destroy();
  temp0.destroy();
  temp1.destroy();
  readbackBuffer.destroy();
  vec4Input.destroy();
  vec4Output.destroy();
  vec4Temp0.destroy();
  vec4Temp1.destroy();
  vec4Readback.destroy();

  return results;
}

/**
 * Run validation at multiple sizes
 */
export async function validateFFTAllSizes(device: GPUDevice): Promise<Map<number, ValidationResult[]>> {
  const sizes = [64, 256, 512, 1024, 2048];
  const allResults = new Map<number, ValidationResult[]>();

  for (const N of sizes) {
    try {
      const results = await validateFFT(device, N);
      allResults.set(N, results);
    } catch (e) {
      console.error(`Failed to validate N=${N}:`, e);
      allResults.set(N, [{
        name: 'Initialization',
        passed: false,
        maxError: Infinity,
        details: `Error: ${e}`
      }]);
    }
  }

  return allResults;
}
