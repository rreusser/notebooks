// WGSL Helper Functions for Kuramoto-Sivashinsky Equation

// ============================================================================
// Complex Number Operations
// ============================================================================

/// Complex multiplication: (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(
    a.x * b.x - a.y * b.y,  // real part
    a.x * b.y + a.y * b.x   // imaginary part
  );
}

/// Complex conjugate: conj(a + bi) = a - bi
fn cconj(z: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(z.x, -z.y);
}

/// Complex addition
fn cadd(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return a + b;
}

/// Complex subtraction
fn csub(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
  return a - b;
}

/// Complex magnitude squared: |a + bi|^2 = a^2 + b^2
fn cabs2(z: vec2<f32>) -> f32 {
  return dot(z, z);
}

/// Complex magnitude: |a + bi| = sqrt(a^2 + b^2)
fn cabs(z: vec2<f32>) -> f32 {
  return length(z);
}

// ============================================================================
// Wavenumber Calculation
// ============================================================================

/// Compute 2D wavenumber from grid coordinates
///
/// For a 2D FFT of size N×M, the wavenumber k is computed from the
/// grid coordinates (i, j) as:
///   k_x = 2π * i / N  for i < N/2
///   k_x = 2π * (i - N) / N  for i >= N/2
///
/// This handles the fact that FFT output is ordered as:
///   [0, 1, 2, ..., N/2-1, -N/2, -N/2+1, ..., -1]
///
/// @param coord - Grid coordinates (i, j) in range [0, N-1] × [0, M-1]
/// @param resolution - Grid resolution (N, M)
/// @param dx - Spatial grid spacing (Δx, Δy)
/// @return 2D wavenumber (k_x, k_y)
fn wavenumber(coord: vec2<u32>, resolution: vec2<u32>, dx: vec2<f32>) -> vec2<f32> {
  let half_res = vec2<f32>(f32(resolution.x) / 2.0, f32(resolution.y) / 2.0);
  let coord_f = vec2<f32>(f32(coord.x), f32(coord.y));

  // Handle negative frequencies (fold-over at Nyquist)
  var k = coord_f;
  if (coord_f.x >= half_res.x) {
    k.x = coord_f.x - f32(resolution.x);
  }
  if (coord_f.y >= half_res.y) {
    k.y = coord_f.y - f32(resolution.y);
  }

  // Scale by 2π/L where L = N*dx
  return k * (2.0 * 3.14159265359 / (vec2<f32>(resolution) * dx));
}

/// Alternative wavenumber calculation from normalized UV coordinates [0,1]
fn wavenumber_from_uv(uv: vec2<f32>, resolution: vec2<u32>, dx: vec2<f32>) -> vec2<f32> {
  let coord = vec2<u32>(u32(uv.x * f32(resolution.x)), u32(uv.y * f32(resolution.y)));
  return wavenumber(coord, resolution, dx);
}
