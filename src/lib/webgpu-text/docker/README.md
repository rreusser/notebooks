# MSDF Atlas Generator (Docker)

A Docker-based tool for generating MSDF font atlases using [msdf-atlas-gen](https://github.com/Chlumsky/msdf-atlas-gen).

## Quick Start

### Build the Docker image

```bash
cd webgpu-text/docker
docker build -t msdf-atlas-gen .
```

### Generate an atlas

```bash
# Basic usage - generates atlas.png and atlas.json
docker run --rm \
  -v /path/to/fonts:/fonts \
  -v /path/to/output:/output \
  msdf-atlas-gen -font /fonts/Roboto-Regular.ttf -o /output/roboto

# With custom settings
docker run --rm \
  -v $(pwd):/work \
  msdf-atlas-gen \
  -font /work/Roboto-Regular.ttf \
  -o /work/output/roboto \
  -size 64 \
  -atlas 1024 \
  -range 6
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-font <path>` | (required) | Path to font file (TTF, OTF, etc.) |
| `-o <prefix>` | (required) | Output prefix (creates `<prefix>.png` and `<prefix>.json`) |
| `-size <pixels>` | 48 | Font size in pixels |
| `-atlas <size>` | 512 | Atlas size (e.g., `512` or `512x1024`) |
| `-range <pixels>` | 4 | Distance field range in pixels |
| `-type <type>` | msdf | Atlas type: `msdf`, `mtsdf`, `sdf`, `psdf` |
| `-charset <file>` | ASCII | File containing characters to include |

## Output Format

The generator outputs two files:

### `<prefix>.png`
The MSDF texture atlas as a PNG image.

### `<prefix>.json`
Glyph metadata in a format compatible with webgpu-text:

```json
{
  "width": 512,
  "height": 512,
  "fontSize": 48,
  "lineHeight": 56,
  "fieldRange": 4,
  "glyphs": [
    {
      "char": "A",
      "unicode": 65,
      "x": 0,
      "y": 0,
      "width": 32,
      "height": 40,
      "xOffset": -2,
      "yOffset": 36,
      "xAdvance": 28
    }
  ]
}
```

## Loading in webgpu-text

```typescript
import { loadFontAtlas } from './webgpu-text.ts';

// Load pre-generated atlas
const fontAtlas = await loadFontAtlas(device, {
  atlasUrl: './fonts/roboto.png',
  metadataUrl: './fonts/roboto.json',
});

// Use with text context
const textContext = createGPUTextContext(device, {
  fontAtlas,
  colorTargets: { format: canvasFormat },
});
```

## Custom Character Sets

Create a text file with the characters you need:

```bash
# charset.txt - one character per line or continuous
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
```

Then use:
```bash
docker run --rm \
  -v $(pwd):/work \
  msdf-atlas-gen \
  -font /work/font.ttf \
  -o /work/output/atlas \
  -charset /work/charset.txt
```

## Atlas Types

- **msdf** (default): Multi-channel SDF - sharp corners, 3 channels (RGB)
- **mtsdf**: Multi-channel + true SDF - 4 channels (RGBA), best quality
- **sdf**: Single-channel SDF - simpler but rounded corners
- **psdf**: Pseudo-SDF - faster but lower quality

## Tips

- **Font size**: Higher values = more detail in the atlas, larger texture
- **Atlas size**: Must fit all glyphs; increase if glyphs are missing
- **Field range**: Higher values = softer edges, more blur tolerance; lower = sharper
- Use **mtsdf** if you need both sharp corners AND outline/shadow effects
