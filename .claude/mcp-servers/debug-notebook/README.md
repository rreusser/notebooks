# Debug Notebook MCP Server

MCP server for debugging Observable notebooks with minimal friction.

## Setup

1. Ensure debug server is running:
```bash
node debug-server.js
```

2. Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "debug-notebook": {
      "command": "node",
      "args": ["/Users/rreusser/gh/rreusser/notebooks/.claude/mcp-servers/debug-notebook/index.js"]
    }
  }
}
```

3. Restart Claude Desktop

## Usage

The MCP server provides these tools:

### `refresh_and_capture`

Trigger a page refresh and capture logs from exactly one session.

**Parameters:**
- `wait_for_completion` (boolean, default: true) - Wait for `[NOTEBOOK_READY]` signal
- `timeout_ms` (number, default: 30000) - Maximum wait time in milliseconds

**Example:**
```
Use the refresh_and_capture tool to reload the notebook and capture logs
```

This will:
1. Trigger a page refresh
2. Wait for the notebook to signal completion via `window.__debugClient.signalReady()`
3. Return all console logs and errors from that session

**Faster completion:**
If your notebook calls `window.__debugClient?.signalReady()` when ready, the tool returns immediately instead of waiting for the timeout.

### `get_current_session`

Fetch logs from the current/most recent session without triggering a refresh.

**Example:**
```
Use get_current_session to see what logs we have
```

## Notebook Integration

### Signaling Completion

Add this to your notebook after initialization completes:

```javascript
// After your notebook is ready
console.log('Notebook initialized successfully');
window.__debugClient?.signalReady();
```

The `?` makes it safe - it only runs when the debug client is loaded (development only).

### Example Notebook Cell

```html
<script id="final" type="module">
  // ... your initialization code ...

  await device.queue.onSubmittedWorkDone();
  console.log('✓ All operations complete');

  // Signal completion
  window.__debugClient?.signalReady();
</script>
```

## Workflow

Typical debugging workflow:

1. Make changes to your notebook code
2. Ask Claude: "Use refresh_and_capture to reload and check for errors"
3. Claude triggers refresh and gets logs
4. Claude analyzes logs and suggests fixes
5. Repeat

No manual page refreshing or console inspection needed!

## Output Format

The tool returns formatted output with:
- Session summary (ID, timestamp, counts)
- All console logs with timestamps and levels
- All errors with stack traces and cell IDs
- Completion status

Example output:
```
✓ Notebook completed in 1234ms

Session: session-1768102343609
Started: 2025-01-10T12:30:43.609Z
Logs: 15
Errors: 0

=== LOGS ===
[12:30:43] LOG   [DebugClient] Connected to debug server
[12:30:44] LOG   [Step 1] Creating WebGPU context...
[12:30:44] LOG   [Step 1] ✓ Device created
...
[12:30:45] LOG   === ALL STEPS COMPLETE ===
[12:30:45] LOG   [NOTEBOOK_READY]
```

## Troubleshooting

### "Connection timeout" error

The debug server isn't running. Start it:
```bash
node debug-server.js
```

### No logs captured

1. Check that the notebook is open in browser at http://localhost:5173
2. Verify the debug client loaded (check browser console for "[DebugClient]" messages)
3. Ensure you're using a recent session (sessions expire)

### Timeout before completion

Your notebook didn't call `signalReady()`. Either:
- Add `window.__debugClient?.signalReady()` when notebook is ready
- Increase timeout: `refresh_and_capture(timeout_ms=60000)`
