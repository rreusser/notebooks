#!/bin/bash
#
# Quick wrapper to start debug server and capture logs
#
# Usage:
#   ./scripts/debug-capture.sh [notebook-path]
#

NOTEBOOK_URL="${1:-http://localhost:5173/notebooks/kuramoto-sivashinsky-equation-in-2d-webgpu/}"

echo "🔧 Debug System for Observable Notebooks"
echo ""
echo "Starting debug server in background..."

# Start debug server in background
node debug-server.js > /dev/null 2>&1 &
SERVER_PID=$!

# Give server time to start
sleep 1

echo "✓ Debug server started (PID: $SERVER_PID)"
echo ""
echo "📖 Open notebook in browser:"
echo "   ${NOTEBOOK_URL}"
echo ""
echo "⏳ Waiting 3 seconds for page to load..."
sleep 3

echo ""
echo "🔄 Triggering refresh and capturing logs..."
node scripts/debug-notebook.js --wait 6000

echo ""
echo "🛑 Stopping debug server..."
kill $SERVER_PID 2>/dev/null

echo "✓ Done"
