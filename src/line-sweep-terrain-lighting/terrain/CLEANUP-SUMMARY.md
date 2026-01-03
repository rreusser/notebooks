# Cleanup Summary

This document summarizes the cleanup performed after fixing the multi-level parent tile assembly bug.

## What Was Removed

### 1. Old Single-Level Assembly
- **File:** `parent-tile-assembly.js`
- **Reason:** Superseded by `parent-tile-assembly-multi-level.js` which supports arbitrary deltaZ values

### 2. Obsolete Test Scripts
- **File:** `test/test-parent-assembly.mjs`
  - Old test for single-level assembly
- **File:** `test/test-parent-assembly-real.mjs`
  - Another old single-level assembly test
- **File:** `test/debug-multi-level-colored.mjs`
  - Color-tinting debug visualization (useful for diagnosis but not ongoing development)
- **File:** `test/debug-multi-level.mjs`
  - Original debug script (superseded by better tests)
- **File:** `test/verify-target-consistency.mjs`
  - Ad-hoc debug script for comparing deltaZ values
- **File:** `test/debug-coordinates.mjs`
  - Old coordinate debugging script

### 3. Debug PNG Files
- `debug-deltaZ-1.png`, `debug-deltaZ-2.png`
- `debug-deltaZ-1-colored.png`, `debug-deltaZ-2-colored.png`
- `parent-assembly-768.png`
- `target-tile-512.png`
- `target-region-deltaZ-1.png`, `target-region-deltaZ-2.png`

## What Was Updated

### 1. `test/test-lsao.mjs`
- Updated to use `parent-tile-assembly-multi-level.js`
- Now uses `getParentTilesAtLevel()` and `assembleParentTileBufferMultiLevel()`
- Step numbers updated to reflect new flow

### 2. `compute/lsao-pipeline.js`
- Updated comment reference from `parent-tile-assembly.js` to `parent-tile-assembly-multi-level.js`

### 3. `terrain/CLAUDE.md`
- Updated test script documentation
- Updated API examples to use multi-level assembly
- Updated module structure diagram
- Updated common task examples

## What Was Kept

### Core Test Scripts
- **`test/test-all-deltaz.mjs`** - Comprehensive test of all deltaZ values (-1 to -8)
- **`test/test-multi-level-quick.mjs`** - Quick sanity check for deltaZ=-1 and -2
- **`test/compare-with-actual-target.mjs`** - Validates coordinate calculations by comparing extracted regions with actual target tile

### LSAO Tests
- **`test/test-lsao.mjs`** - Full LSAO pipeline test (updated to use multi-level)
- **`test/test-lsao-simple.mjs`** - Simple LSAO test

### Utility Scripts
- **`test/compute-simple.mjs`** - Full pipeline test (fetch → compute → save)
- **`test/fetch-and-visualize.mjs`** - Elevation visualization
- **`test/generate-test-image.mjs`** - Test pattern generator
- **`test/compute-tile.mjs`** - CLI tile computation

### Useful PNG Files
- `test/actual-target-512.png` - Reference target tile (useful for comparisons)
- `test/comparison-deltaZ-1.png`, `test/comparison-deltaZ-2.png` - Side-by-side comparisons showing correctness
- Standard output images from tests (elevation-heatmap.png, lighting.png, etc.)

## Rationale

The cleanup focused on:

1. **Eliminating redundancy** - The multi-level assembly supersedes the single-level version
2. **Removing debug artifacts** - Color-tinting and ad-hoc debug scripts served their purpose but aren't needed for ongoing work
3. **Keeping verification tools** - Scripts that validate correctness (test-all-deltaz, compare-with-actual-target) remain valuable for regression testing
4. **Preserving utilities** - General-purpose scripts for development remain

## Result

The codebase is now cleaner and more maintainable:
- Single source of truth for parent tile assembly
- Clear separation between verification tests and debug scripts
- Updated documentation reflects current state
- All references updated to use multi-level assembly

