#!/usr/bin/env node
/**
 * MCP Server for Observable Notebook Debugging
 *
 * Integrated debug server that provides:
 * - WebSocket server for browser connections
 * - HTTP server for session data retrieval
 * - MCP tools for notebook debugging
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { WebSocketServer } from 'ws';
import http from 'http';

const HTTP_PORT = 9898;
const WS_PORT = 9899;
const DEFAULT_TIMEOUT = 5000;
const COMPLETION_TIMEOUT = 30000;

// Session storage
const sessions = new Map();
let currentSessionId = null;

// Connected browser clients
const clients = new Set();

// Pending requests (for bidirectional communication)
const pendingRequests = new Map();
let requestCounter = 0;

/**
 * Create HTTP server for status/session endpoints
 */
const httpServer = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      currentSession: currentSessionId,
      sessions: Array.from(sessions.keys()),
      connectedClients: clients.size
    }));
  } else if (req.url.startsWith('/session/')) {
    const sessionId = req.url.slice(9);
    const session = sessions.get(sessionId);

    if (session) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(session, null, 2));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Session not found' }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Debug Server Running\n');
  }
});

/**
 * Create WebSocket server for browser connections
 */
const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.error('[Server] Client connected');
  clients.add(ws);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleBrowserMessage(message, ws);
    } catch (err) {
      console.error('[Server] Failed to parse message:', err);
    }
  });

  ws.on('close', () => {
    console.error('[Server] Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (err) => {
    console.error('[Server] WebSocket error:', err);
  });
});

/**
 * Handle messages from browser clients
 */
function handleBrowserMessage(message, ws) {
  const { type, sessionId, data, timestamp, requestId } = message;

  // Handle responses to our requests
  if (type === 'cell_value_response' || type === 'cells_list_response' || type === 'errors_response') {
    const pending = pendingRequests.get(requestId);
    if (pending) {
      clearTimeout(pending.timer);
      pendingRequests.delete(requestId);
      pending.resolve(message);
    }
    return;
  }

  // Handle requests from WebSocket clients (for testing/non-MCP access)
  // Forward to browsers and relay the response back
  if (type === 'get_cell_value' || type === 'list_cells') {
    const responseType = type === 'get_cell_value' ? 'cell_value_response' : 'cells_list_response';

    // Set up response handler for this request
    const timeout = setTimeout(() => {
      pendingRequests.delete(requestId);
      ws.send(JSON.stringify({
        type: responseType,
        requestId,
        success: false,
        error: 'Request timeout'
      }));
    }, 5000);

    pendingRequests.set(requestId, {
      resolve: (response) => {
        // Relay response back to the requesting client
        ws.send(JSON.stringify(response));
      },
      reject: () => {},
      timer: timeout
    });

    // Broadcast to all OTHER clients (browsers)
    const broadcastMsg = JSON.stringify(message);
    clients.forEach(client => {
      if (client !== ws && client.readyState === 1) {
        client.send(broadcastMsg);
      }
    });
    return;
  }

  // Handle session start
  if (type === 'session_start') {
    currentSessionId = sessionId;
    // Check if session already exists (early logs may have created it)
    const existing = sessions.get(sessionId);
    if (existing) {
      // Update start time but preserve existing logs
      existing.startTime = timestamp;
      console.error(`[Server] Session started (merged): ${sessionId}`);
    } else {
      sessions.set(sessionId, {
        id: sessionId,
        startTime: timestamp,
        logs: [],
        errors: [],
        binary: [],
        ended: false
      });
      console.error(`[Server] Session started: ${sessionId}`);
    }
    return;
  }

  // Get or create session
  let session = sessions.get(sessionId);
  if (!session) {
    session = {
      id: sessionId,
      startTime: timestamp,
      logs: [],
      errors: [],
      binary: [],
      ended: false
    };
    sessions.set(sessionId, session);
    currentSessionId = sessionId;
  }

  // Handle different message types
  switch (type) {
    case 'log':
      session.logs.push({ timestamp, level: data.level, args: data.args });
      break;

    case 'error':
      session.errors.push({
        timestamp,
        message: data.message,
        stack: data.stack,
        source: data.source
      });
      break;

    case 'runtime_error':
      session.errors.push({
        timestamp,
        message: data.message,
        cellId: data.cellId,
        source: 'observable-runtime'
      });
      break;

    case 'binary':
      session.binary.push({
        timestamp,
        name: data.name,
        type: data.mimeType,
        data: data.data
      });
      break;

    case 'session_end':
      session.ended = true;
      console.error(`[Server] Session ended: ${sessionId}`);
      break;
  }
}

/**
 * Create a request to browser and wait for response
 */
function createRequest(type, data, timeout = DEFAULT_TIMEOUT) {
  const requestId = `req-${++requestCounter}`;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error('Request timeout'));
    }, timeout);

    pendingRequests.set(requestId, { resolve, reject, timer });

    // Broadcast to all connected clients (first response wins)
    const message = JSON.stringify({ type, requestId, ...data });
    let sent = false;
    clients.forEach(client => {
      if (client.readyState === 1) {  // WebSocket.OPEN
        client.send(message);
        sent = true;
      }
    });

    if (!sent) {
      clearTimeout(timer);
      pendingRequests.delete(requestId);
      reject(new Error('No connected clients'));
    }
  });
}

/**
 * Request cell value from browser
 */
async function requestCellValue(cellName, timeout = DEFAULT_TIMEOUT) {
  return createRequest('get_cell_value', { cellName }, timeout);
}

/**
 * Request list of cells from browser
 */
async function requestCellsList(timeout = DEFAULT_TIMEOUT) {
  return createRequest('list_cells', {}, timeout);
}

/**
 * Request errors from browser
 */
async function requestErrors(timeout = DEFAULT_TIMEOUT) {
  return createRequest('get_errors', {}, timeout);
}

/**
 * Broadcast refresh command to all clients
 */
function broadcastRefresh() {
  const sessionId = `session-${Date.now()}`;
  const message = JSON.stringify({ type: 'refresh', sessionId });

  console.error(`[Server] Broadcasting refresh (new session: ${sessionId})`);

  clients.forEach(client => {
    if (client.readyState === 1) {  // WebSocket.OPEN
      client.send(message);
    }
  });

  return sessionId;
}

/**
 * Fetch session data
 */
async function fetchSession(sessionId) {
  return sessions.get(sessionId) || null;
}

/**
 * Wait for session completion
 */
async function waitForCompletion(sessionId, timeout) {
  const startTime = Date.now();
  const pollInterval = 100;

  while (Date.now() - startTime < timeout) {
    const session = await fetchSession(sessionId);

    if (session) {
      // Check for completion signal in logs
      const completionLog = session.logs?.find(log =>
        log.args?.some(arg =>
          typeof arg === 'string' && arg.includes('[NOTEBOOK_READY]')
        )
      );

      if (completionLog) {
        return { completed: true, duration: Date.now() - startTime, session };
      }

      // Check if session explicitly ended
      if (session.ended) {
        return { completed: true, duration: Date.now() - startTime, session };
      }
    }

    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  // Timeout reached, fetch final session state
  const session = await fetchSession(sessionId);
  return { completed: false, duration: timeout, session };
}

/**
 * Format session output for display
 * @param {object} session - Session data
 * @param {string} filter - Optional substring filter for logs
 */
function formatSessionOutput(session, filter) {
  if (!session) {
    return 'No session data available';
  }

  const output = [];

  // Filter logs if filter provided
  let filteredLogs = session.logs || [];
  if (filter) {
    filteredLogs = filteredLogs.filter(log => {
      const logText = log.args?.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg);
        }
        return String(arg);
      }).join(' ') || '';
      return logText.includes(filter);
    });
  }

  // Summary
  output.push(`Session: ${session.id}`);
  const startTime = session.startTime ? new Date(session.startTime).toISOString() : 'unknown';
  output.push(`Started: ${startTime}`);
  if (filter) {
    output.push(`Filter: "${filter}"`);
    output.push(`Logs: ${filteredLogs.length} (of ${session.logs?.length || 0} total)`);
  } else {
    output.push(`Logs: ${session.logs?.length || 0}`);
  }
  output.push(`Errors: ${session.errors?.length || 0}`);
  output.push('');

  // Logs
  if (filteredLogs.length > 0) {
    output.push('=== LOGS ===');
    filteredLogs.forEach(log => {
      const time = log.timestamp ? new Date(log.timestamp).toISOString().split('T')[1].slice(0, -1) : '??:??:??';
      const level = log.level.toUpperCase().padEnd(5);
      const args = log.args?.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg);
        }
        return String(arg);
      }).join(' ') || '';

      output.push(`[${time}] ${level} ${args}`);
    });
    output.push('');
  }

  // Errors
  if (session.errors && session.errors.length > 0) {
    output.push('=== ERRORS ===');
    session.errors.forEach(error => {
      const time = error.timestamp ? new Date(error.timestamp).toISOString().split('T')[1].slice(0, -1) : '??:??:??';
      output.push(`[${time}] ERROR: ${error.message}`);

      if (error.cellId) {
        output.push(`  Cell: ${error.cellId}`);
      }

      if (error.stack) {
        output.push(`  Stack: ${error.stack.split('\n').slice(0, 3).join('\n    ')}`);
      }

      output.push('');
    });
  }

  return output.join('\n');
}

/**
 * Format cell value for display
 */
function formatCellValue(value) {
  if (value === null) return 'null';
  if (value === undefined || value.__type === 'undefined') return 'undefined';

  // Handle special types
  if (value.__type) {
    switch (value.__type) {
      case 'Function':
        return `Function: ${value.name}\n${value.source}`;
      case 'Error':
        return `Error: ${value.message}\n${value.stack || ''}`;
      case 'Canvas':
        if (value.data) {
          return `Canvas (${value.width}x${value.height})\nBase64 data: ${value.data.slice(0, 100)}...`;
        }
        return `Canvas (${value.width}x${value.height})\n${value.error || ''}`;
      case 'Element':
        return `Element: <${value.tagName}${value.id ? ' id="' + value.id + '"' : ''}${value.className ? ' class="' + value.className + '"' : ''}>\n${value.innerHTML}`;
      case 'TypedArray':
        return `${value.arrayType} (length: ${value.length})\nSample: [${value.sample.join(', ')}]${value.truncated ? '...' : ''}`;
      case 'Array':
        return `Array (length: ${value.length})\nSample:\n${JSON.stringify(value.sample, null, 2)}${value.truncated ? '\n...' : ''}`;
      case 'Date':
        return `Date: ${value.value}`;
      case 'RegExp':
        return `RegExp: /${value.source}/${value.flags}`;
      case 'Map':
        return `Map (size: ${value.size})\nEntries:\n${JSON.stringify(value.entries, null, 2)}${value.truncated ? '\n...' : ''}`;
      case 'Set':
        return `Set (size: ${value.size})\nValues:\n${JSON.stringify(value.values, null, 2)}${value.truncated ? '\n...' : ''}`;
      case 'Circular':
        return `[Circular: ${value.ref}]`;
      case 'MaxDepthExceeded':
        return '[Max depth exceeded]';
    }
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return JSON.stringify(value, null, 2);
  }

  // Handle objects
  if (typeof value === 'object') {
    const str = JSON.stringify(value, null, 2);
    if (str.length > 5000) {
      return str.slice(0, 5000) + '\n...[truncated]';
    }
    return str;
  }

  // Primitives
  return String(value);
}

// Create MCP server
const server = new Server(
  {
    name: 'debug-notebook',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'refresh_notebook',
        description: 'Trigger notebook page refresh and wait for completion. Captures all logs and errors from the new session.',
        inputSchema: {
          type: 'object',
          properties: {
            wait_for_completion: {
              type: 'boolean',
              description: 'Wait for [NOTEBOOK_READY] signal or session_end (recommended)',
              default: true
            },
            timeout_ms: {
              type: 'number',
              description: 'Maximum time to wait in milliseconds',
              default: COMPLETION_TIMEOUT
            }
          }
        }
      },
      {
        name: 'get_cell_value',
        description: 'Get the current value of a specific cell from the running notebook',
        inputSchema: {
          type: 'object',
          properties: {
            cell_name: {
              type: 'string',
              description: 'Name of the cell to retrieve'
            },
            timeout_ms: {
              type: 'number',
              description: 'Maximum time to wait in milliseconds',
              default: DEFAULT_TIMEOUT
            }
          },
          required: ['cell_name']
        }
      },
      {
        name: 'list_cells',
        description: 'Get list of all defined cells in the running notebook',
        inputSchema: {
          type: 'object',
          properties: {
            timeout_ms: {
              type: 'number',
              description: 'Maximum time to wait in milliseconds',
              default: DEFAULT_TIMEOUT
            }
          }
        }
      },
      {
        name: 'get_session_logs',
        description: 'Get logs from the current or most recent session without triggering a refresh',
        inputSchema: {
          type: 'object',
          properties: {
            session_id: {
              type: 'string',
              description: 'Specific session ID (optional, uses current session if not provided)'
            },
            filter: {
              type: 'string',
              description: 'Filter logs by substring match (e.g., "[DebugClient]" to show only debug client logs)'
            }
          }
        }
      },
      {
        name: 'get_errors',
        description: 'Get all runtime errors from cells in the notebook. Checks each cell and returns errors with cell name, message, and stack trace.',
        inputSchema: {
          type: 'object',
          properties: {
            timeout_ms: {
              type: 'number',
              description: 'Maximum time to wait in milliseconds',
              default: DEFAULT_TIMEOUT
            }
          }
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'refresh_notebook') {
      const waitForSignal = args?.wait_for_completion !== false;
      const timeout = args?.timeout_ms || (waitForSignal ? COMPLETION_TIMEOUT : 5000);

      // Broadcast refresh
      const sessionId = broadcastRefresh();

      // Wait for completion
      const result = await waitForCompletion(sessionId, timeout);

      // Format minimal response (logs available via get_session_logs)
      const session = result.session;
      const errorCount = session?.errors?.length || 0;
      const logCount = session?.logs?.length || 0;

      const statusText = result.completed
        ? `✓ Notebook refreshed in ${result.duration}ms`
        : `⏱ Timeout after ${result.duration}ms`;

      const output = [statusText];

      if (errorCount > 0) {
        output.push(`Errors: ${errorCount}`);
        // Include error details since they're important
        session.errors.forEach(error => {
          output.push(`  - ${error.message}${error.cellId ? ` (cell: ${error.cellId})` : ''}`);
        });
      } else {
        output.push('No errors');
      }

      output.push(`Logs: ${logCount} (use get_session_logs to view)`);

      return {
        content: [{
          type: 'text',
          text: output.join('\n')
        }]
      };
    }

    if (name === 'get_cell_value') {
      const { cell_name, timeout_ms = DEFAULT_TIMEOUT } = args;

      if (!cell_name) {
        return {
          content: [{ type: 'text', text: 'Error: cell_name is required' }],
          isError: true
        };
      }

      const response = await requestCellValue(cell_name, timeout_ms);

      if (!response.success) {
        return {
          content: [{ type: 'text', text: `Error: ${response.error}` }],
          isError: true
        };
      }

      return {
        content: [{
          type: 'text',
          text: `Cell: ${cell_name}\n\n${formatCellValue(response.value)}`
        }]
      };
    }

    if (name === 'list_cells') {
      const { timeout_ms = DEFAULT_TIMEOUT } = args || {};

      const response = await requestCellsList(timeout_ms);

      if (!response.success) {
        return {
          content: [{ type: 'text', text: `Error: ${response.error}` }],
          isError: true
        };
      }

      const cellList = response.cells.join('\n- ');
      return {
        content: [{
          type: 'text',
          text: `Available cells (${response.cells.length}):\n\n- ${cellList}`
        }]
      };
    }

    if (name === 'get_session_logs') {
      const { session_id, filter } = args || {};

      const sessionId = session_id || currentSessionId;

      if (!sessionId) {
        return {
          content: [{
            type: 'text',
            text: 'No active session found'
          }]
        };
      }

      const session = await fetchSession(sessionId);

      return {
        content: [{
          type: 'text',
          text: formatSessionOutput(session, filter)
        }]
      };
    }

    if (name === 'get_errors') {
      const { timeout_ms = DEFAULT_TIMEOUT } = args || {};

      const response = await requestErrors(timeout_ms);

      if (!response.success) {
        return {
          content: [{ type: 'text', text: `Error: ${response.error}` }],
          isError: true
        };
      }

      if (response.errors.length === 0) {
        return {
          content: [{
            type: 'text',
            text: 'No errors found in notebook cells.'
          }]
        };
      }

      const errorList = response.errors.map(e => {
        let msg = `Cell: ${e.cell}\nError: ${e.error}`;
        if (e.stack) {
          // Show first few lines of stack
          const stackLines = e.stack.split('\n').slice(0, 4).join('\n');
          msg += `\nStack:\n${stackLines}`;
        }
        return msg;
      }).join('\n\n---\n\n');

      return {
        content: [{
          type: 'text',
          text: `Found ${response.errors.length} error(s):\n\n${errorList}`
        }]
      };
    }

    throw new Error(`Unknown tool: ${name}`);

  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error.message}`
      }],
      isError: true
    };
  }
});

// Start servers
async function main() {
  // Start HTTP server
  httpServer.listen(HTTP_PORT, () => {
    console.error(`[Server] HTTP server running on http://localhost:${HTTP_PORT}`);
  });

  // WebSocket server already started above
  console.error(`[Server] WebSocket server running on ws://localhost:${WS_PORT}`);

  // Start MCP server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Debug Notebook MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
