#!/bin/bash
# Inspect Observable notebook pages from localhost

set -e

# Default URL for current notebook
DEFAULT_URL="http://localhost:5173/notebooks/perfectly-matched-layers-for-the-wave-equation/"
URL="${1:-$DEFAULT_URL}"

echo "Fetching: $URL"
echo "===================="
echo

# Fetch the page
CONTENT=$(curl -s "$URL" 2>&1)

# Check if curl failed
if [ $? -ne 0 ]; then
  echo "❌ Failed to fetch page. Is the dev server running on port 5173?"
  exit 1
fi

# Check if it's an error page by looking for ErrorOverlay
if echo "$CONTENT" | grep -q "ErrorOverlay\|Internal Server Error"; then
  echo "❌ ERROR DETECTED IN NOTEBOOK"
  echo

  # Extract error information from the JSON-like structure
  # The error object is: const error = {...}

  # Extract message
  if echo "$CONTENT" | grep -q '"message"'; then
    MESSAGE=$(echo "$CONTENT" | grep -o '"message":"[^"]*"' | head -1 | sed 's/"message":"//;s/"$//')
    echo "Error Message:"
    echo "  $MESSAGE"
    echo
  fi

  # Extract location
  if echo "$CONTENT" | grep -q '"loc"'; then
    LOC=$(echo "$CONTENT" | grep -o '"loc":{[^}]*}' | head -1)
    LINE=$(echo "$LOC" | grep -o '"line":[0-9]*' | grep -o '[0-9]*')
    COLUMN=$(echo "$LOC" | grep -o '"column":[0-9]*' | grep -o '[0-9]*')
    if [ -n "$LINE" ]; then
      echo "Location: Line $LINE, Column $COLUMN"
      echo
    fi
  fi

  # Extract and format stack trace
  if echo "$CONTENT" | grep -q '"stack"'; then
    STACK=$(echo "$CONTENT" | grep -o '"stack":"[^"]*"' | head -1 | sed 's/"stack":"//;s/"$//')
    echo "Stack Trace:"
    # Replace \\n with actual newlines and indent
    echo "$STACK" | sed 's/\\n/\n/g' | sed 's/^/  /'
    echo
  fi

  exit 1
else
  echo "✅ Notebook loaded successfully (no errors detected)"
  echo

  # Check for specific success indicators
  if echo "$CONTENT" | grep -q "<title>Perfectly Matched Layers"; then
    echo "Page title found: Perfectly Matched Layers for the Wave Equation"
  fi

  if echo "$CONTENT" | grep -q "notebook theme="; then
    echo "Notebook element present"
  fi

  echo
  echo "Content preview (first 100 lines):"
  echo "-----------------------------------"
  echo "$CONTENT" | head -100
fi
