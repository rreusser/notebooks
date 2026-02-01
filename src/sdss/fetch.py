from astroquery.sdss import SDSS
import astropy.units as u
from astropy.cosmology import Planck18 as cosmo
import numpy as np
import json
import gzip
import os

# Query SDSS in redshift bins to avoid the 500k row limit
# Each bin becomes one chunk file
REDSHIFT_BINS = [
    (0.02, 0.08),
    (0.08, 0.12),
    (0.12, 0.16),
    (0.16, 0.20),
    (0.20, 0.25),
    (0.25, 0.30),
    (0.30, 0.40),
    (0.40, 0.50),
]

all_chunks = []
chunk_metadata = []
total_compressed = 0
total_raw = 0

# Track global min/max for bounds and redshift normalization
global_z_min = float('inf')
global_z_max = float('-inf')
global_bounds = {
    'x_min': float('inf'), 'x_max': float('-inf'),
    'y_min': float('inf'), 'y_max': float('-inf'),
    'z_min': float('inf'), 'z_max': float('-inf'),
}

print("Querying SDSS in redshift bins...")

for i, (z_min, z_max) in enumerate(REDSHIFT_BINS):
    query = f"""
    SELECT
        ra,
        dec,
        z
    FROM SpecObj
    WHERE
        class = 'GALAXY'
        AND z BETWEEN {z_min} AND {z_max}
        AND zWarning = 0
    """

    print(f"  Bin {i}: z = {z_min:.2f} - {z_max:.2f}...", end=" ", flush=True)

    try:
        data = SDSS.query_sql(query)
        if data is None or len(data) == 0:
            print("no data")
            continue
        print(f"{len(data):,} galaxies")
    except Exception as e:
        print(f"error: {e}")
        continue

    # Convert to 3D Cartesian coordinates
    redshift = np.array(data['z'])
    distance = cosmo.comoving_distance(redshift).to(u.Mpc).value

    ra = np.deg2rad(data['ra'])
    dec = np.deg2rad(data['dec'])

    x = distance * np.cos(dec) * np.cos(ra)
    y = distance * np.cos(dec) * np.sin(ra)
    z_coord = distance * np.sin(dec)

    # Update global bounds
    global_z_min = min(global_z_min, redshift.min())
    global_z_max = max(global_z_max, redshift.max())
    global_bounds['x_min'] = min(global_bounds['x_min'], x.min())
    global_bounds['x_max'] = max(global_bounds['x_max'], x.max())
    global_bounds['y_min'] = min(global_bounds['y_min'], y.min())
    global_bounds['y_max'] = max(global_bounds['y_max'], y.max())
    global_bounds['z_min'] = min(global_bounds['z_min'], z_coord.min())
    global_bounds['z_max'] = max(global_bounds['z_max'], z_coord.max())

    # Store raw data for later normalization
    all_chunks.append({
        'x': x, 'y': y, 'z_coord': z_coord, 'redshift': redshift,
        'z_range': (z_min, z_max)
    })

print(f"\nTotal: {sum(len(c['redshift']) for c in all_chunks):,} galaxies across {len(all_chunks)} bins")
print(f"Redshift range: {global_z_min:.4f} - {global_z_max:.4f}")

# Now normalize redshifts and save chunks
print("\nSaving chunks...")

for i, chunk_data in enumerate(all_chunks):
    x = chunk_data['x']
    y = chunk_data['y']
    z_coord = chunk_data['z_coord']
    redshift = chunk_data['redshift']

    # Normalize redshift to 0-1 using GLOBAL range
    z_normalized = (redshift - global_z_min) / (global_z_max - global_z_min)

    # Pack as float16x4
    points = np.column_stack((x, y, z_coord, z_normalized)).astype(np.float16)

    # Shuffle within chunk for better visual distribution during progressive loading
    np.random.seed(42 + i)
    np.random.shuffle(points)

    filename = f"galaxies_{i:02d}.bin.gz"
    raw_size = points.nbytes

    with gzip.open(filename, "wb", compresslevel=9) as f:
        f.write(points.tobytes())

    compressed_size = os.path.getsize(filename)
    total_compressed += compressed_size
    total_raw += raw_size

    z_min, z_max = chunk_data['z_range']
    chunk_metadata.append({
        "file": filename,
        "count": len(points),
        "byteLength": raw_size,
        "compressedSize": compressed_size,
        "redshiftRange": [z_min, z_max]
    })

    ratio = (1 - compressed_size / raw_size) * 100
    print(f"  {filename}: z={z_min:.2f}-{z_max:.2f}, {len(points):,} galaxies, {compressed_size / 1024 / 1024:.2f} MB ({ratio:.0f}% smaller)")

# Save metadata
metadata = {
    "totalCount": sum(c['count'] for c in chunk_metadata),
    "format": "float16x4",
    "bytesPerVertex": 8,
    "layout": ["x", "y", "z", "redshift_normalized"],
    "units": "Mpc",
    "redshiftRange": [float(global_z_min), float(global_z_max)],
    "bounds": {
        "min": [float(global_bounds['x_min']), float(global_bounds['y_min']), float(global_bounds['z_min'])],
        "max": [float(global_bounds['x_max']), float(global_bounds['y_max']), float(global_bounds['z_max'])],
    },
    "chunks": chunk_metadata
}

with open("galaxies.json", "w") as f:
    json.dump(metadata, f, indent=2)

print(f"\nTotal: {metadata['totalCount']:,} galaxies in {len(chunk_metadata)} chunks")
print(f"Total size: {total_compressed / 1024 / 1024:.2f} MB compressed, {total_raw / 1024 / 1024:.2f} MB raw")
print("Saved galaxies.json")
