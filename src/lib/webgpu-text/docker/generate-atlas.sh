#!/bin/bash
#
# generate-atlas.sh - Generate MSDF font atlas using msdf-atlas-gen
#
# Usage:
#   ./generate-atlas.sh [options] -font <font-file> -o <output-prefix>
#
# Options:
#   -font <path>        Path to font file (TTF, OTF, etc.)
#   -o <prefix>         Output prefix (will create <prefix>.png and <prefix>.json)
#   -size <pixels>      Font size in pixels (default: 48)
#   -atlas <size>       Atlas size, e.g., 512 or 512x512 (default: 512)
#   -range <pixels>     Distance field range in pixels (default: 4)
#   -charset <file>     File containing characters to include (default: ASCII printable)
#   -type <type>        Atlas type: msdf, mtsdf, sdf, psdf (default: msdf)
#   -h, --help          Show this help message
#
# Examples:
#   ./generate-atlas.sh -font /fonts/Roboto.ttf -o /output/roboto
#   ./generate-atlas.sh -font /fonts/Roboto.ttf -o /output/roboto -size 64 -atlas 1024

set -e

# Default values
FONT_SIZE=48
ATLAS_SIZE="512"
FIELD_RANGE=4
ATLAS_TYPE="msdf"
CHARSET_FILE=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -font)
            FONT_FILE="$2"
            shift 2
            ;;
        -o)
            OUTPUT_PREFIX="$2"
            shift 2
            ;;
        -size)
            FONT_SIZE="$2"
            shift 2
            ;;
        -atlas)
            ATLAS_SIZE="$2"
            shift 2
            ;;
        -range)
            FIELD_RANGE="$2"
            shift 2
            ;;
        -charset)
            CHARSET_FILE="$2"
            shift 2
            ;;
        -type)
            ATLAS_TYPE="$2"
            shift 2
            ;;
        -h|--help)
            head -30 "$0" | tail -28
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate required arguments
if [[ -z "$FONT_FILE" ]]; then
    echo "Error: -font is required"
    exit 1
fi

if [[ -z "$OUTPUT_PREFIX" ]]; then
    echo "Error: -o (output prefix) is required"
    exit 1
fi

if [[ ! -f "$FONT_FILE" ]]; then
    echo "Error: Font file not found: $FONT_FILE"
    exit 1
fi

# Create output directory if needed
OUTPUT_DIR=$(dirname "$OUTPUT_PREFIX")
mkdir -p "$OUTPUT_DIR"

# Temporary files
TEMP_DIR=$(mktemp -d)
TEMP_JSON="$TEMP_DIR/atlas.json"
trap "rm -rf $TEMP_DIR" EXIT

# Build charset argument
if [[ -n "$CHARSET_FILE" ]]; then
    CHARSET_ARG="-charset $CHARSET_FILE"
else
    # Default: printable ASCII (32-126) using range syntax
    CHARSET_ARG="-chars [32,126]"
fi

# Parse atlas size
if [[ "$ATLAS_SIZE" == *x* ]]; then
    ATLAS_WIDTH="${ATLAS_SIZE%x*}"
    ATLAS_HEIGHT="${ATLAS_SIZE#*x}"
else
    ATLAS_WIDTH="$ATLAS_SIZE"
    ATLAS_HEIGHT="$ATLAS_SIZE"
fi

echo "Generating MSDF atlas..."
echo "  Font: $FONT_FILE"
echo "  Output: ${OUTPUT_PREFIX}.png, ${OUTPUT_PREFIX}.json"
echo "  Size: ${FONT_SIZE}px, Atlas: ${ATLAS_WIDTH}x${ATLAS_HEIGHT}"
echo "  Type: $ATLAS_TYPE, Range: $FIELD_RANGE"

# Run msdf-atlas-gen
# Note: -yorigin top makes Y=0 at top of atlas (matching screen coords)
msdf-atlas-gen \
    -font "$FONT_FILE" \
    -type "$ATLAS_TYPE" \
    -format png \
    -size "$FONT_SIZE" \
    -dimensions "${ATLAS_WIDTH}" "${ATLAS_HEIGHT}" \
    -pxrange "$FIELD_RANGE" \
    -yorigin top \
    -imageout "${OUTPUT_PREFIX}.png" \
    -json "$TEMP_JSON" \
    $CHARSET_ARG

# Convert JSON to our format using jq
# msdf-atlas-gen outputs:
#   - atlas: { type, distanceRange, size, width, height, yOrigin }
#   - metrics: { emSize, lineHeight, ascender, descender, underlineY, underlineThickness }
#   - glyphs: [{ unicode, advance, planeBounds: {left,bottom,right,top}, atlasBounds: {left,bottom,right,top} }]
#
# With yorigin=top, atlasBounds.top is the Y position (top of glyph in atlas)
# planeBounds are in em units, need to scale by fontSize

jq --argjson fontSize "$FONT_SIZE" '
{
  width: .atlas.width,
  height: .atlas.height,
  # Font metrics scaled to pixels
  fontSize: $fontSize,
  lineHeight: (.metrics.lineHeight * $fontSize),
  ascender: (.metrics.ascender * $fontSize),
  descender: (.metrics.descender * $fontSize),
  fieldRange: .atlas.distanceRange,
  glyphs: [
    .glyphs[] |
    # Only include glyphs that have atlas bounds (were rendered)
    select(.atlasBounds != null) |
    {
      char: ([.unicode] | implode),
      unicode: .unicode,
      # Atlas position (top-left corner with yorigin=top)
      x: .atlasBounds.left,
      y: .atlasBounds.top,
      # Atlas dimensions
      width: (.atlasBounds.right - .atlasBounds.left),
      height: (.atlasBounds.bottom - .atlasBounds.top),
      # Glyph offset from cursor/baseline position (in pixels, scaled from em units)
      # planeBounds.left: horizontal offset (negative = extends left of cursor)
      # planeBounds.top: vertical offset (negative = above baseline in screen coords)
      xOffset: ((.planeBounds.left // 0) * $fontSize),
      yOffset: ((.planeBounds.top // 0) * $fontSize),
      # Advance width (in pixels, scaled from em units)
      xAdvance: (.advance * $fontSize)
    }
  ] | sort_by(.unicode)
}' "$TEMP_JSON" > "${OUTPUT_PREFIX}.json"

echo ""
echo "Generated files:"
echo "  ${OUTPUT_PREFIX}.png - MSDF atlas texture"
echo "  ${OUTPUT_PREFIX}.json - Glyph metadata"
echo ""
echo "Atlas info:"
jq '{
  dimensions: "\(.width)x\(.height)",
  fontSize: .fontSize,
  lineHeight: .lineHeight,
  fieldRange: .fieldRange,
  glyphCount: (.glyphs | length)
}' "${OUTPUT_PREFIX}.json"
