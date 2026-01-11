/**
 * Observable Notebook Debug Client
 *
 * Intercepts console logs, captures runtime errors, and sends them
 * to the debug server via WebSocket.
 */

const DEBUG_WS_URL = 'ws://localhost:9899';
const RECONNECT_INTERVAL = 2000;
const ERROR_CHECK_INTERVAL = 500;
const SESSION_TIMEOUT = 5000;  // Time to wait for errors after page load

class DebugClient {
  constructor() {
    this.ws = null;
    this.sessionId = `session-${Date.now()}`;
    this.connected = false;
    this.messageQueue = [];
    this.originalConsole = {};
    this.errorObserver = null;
    this.sessionStartTime = Date.now();
    this.sessionEnded = false;
  }

  /**
   * Initialize the debug client
   */
  init() {
    // Don't initialize in production
    if (window.location.hostname !== 'localhost' && !window.location.hostname.match(/127\.0\.0\.1/)) {
      return;
    }

    console.log('[DebugClient] Initializing...');

    this.connect();
    this.patchConsole();
    this.watchForErrors();
    this.watchForRuntimeErrors();

    // Send session start
    this.send({
      type: 'session_start',
      sessionId: this.sessionId,
      timestamp: Date.now(),
      data: {
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    });

    // Auto-end session after timeout
    setTimeout(() => {
      if (!this.sessionEnded) {
        this.endSession();
      }
    }, SESSION_TIMEOUT);

    // Expose globally for manual use
    window.__debugClient = this;

    console.log(`[DebugClient] Session started: ${this.sessionId}`);
  }

  /**
   * Connect to WebSocket server
   */
  connect() {
    try {
      this.ws = new WebSocket(DEBUG_WS_URL);

      this.ws.onopen = () => {
        this.connected = true;
        console.log('[DebugClient] Connected to debug server');

        // Flush queued messages
        while (this.messageQueue.length > 0) {
          const msg = this.messageQueue.shift();
          this.ws.send(msg);
        }
      };

      this.ws.onclose = () => {
        this.connected = false;
        console.log('[DebugClient] Disconnected from debug server');

        // Try to reconnect
        setTimeout(() => this.connect(), RECONNECT_INTERVAL);
      };

      this.ws.onerror = (err) => {
        console.error('[DebugClient] WebSocket error:', err);
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleServerMessage(message);
        } catch (err) {
          console.error('[DebugClient] Failed to parse server message:', err);
        }
      };
    } catch (err) {
      console.error('[DebugClient] Failed to connect:', err);
      setTimeout(() => this.connect(), RECONNECT_INTERVAL);
    }
  }

  /**
   * Handle messages from server
   */
  handleServerMessage(message) {
    if (message.type === 'refresh') {
      console.log('[DebugClient] Received refresh command');
      this.sessionId = message.sessionId;
      window.location.reload();
      return;
    }

    if (message.type === 'get_cell_value') {
      this.handleCellValueRequest(message);
      return;
    }

    if (message.type === 'list_cells') {
      this.handleListCellsRequest(message);
      return;
    }
  }

  /**
   * Get Observable runtime module
   */
  getRuntimeModule() {
    // Check for exposed runtime
    if (window.__observableRuntime) return window.__observableRuntime;
    if (window.main) return window.main;

    // Search for runtime in window properties
    for (const key of Object.keys(window)) {
      const value = window[key];
      if (value && typeof value.value === 'function' && value._scope) {
        return value;
      }
    }

    return null;
  }

  /**
   * Handle cell value request from server
   */
  async handleCellValueRequest(message) {
    const runtime = this.getRuntimeModule();

    if (!runtime) {
      this.send({
        type: 'cell_value_response',
        requestId: message.requestId,
        cellName: message.cellName,
        success: false,
        error: 'Observable runtime not found'
      });
      return;
    }

    try {
      const value = await runtime.value(message.cellName);
      this.send({
        type: 'cell_value_response',
        requestId: message.requestId,
        cellName: message.cellName,
        success: true,
        value: this.serializeValue(value)
      });
    } catch (err) {
      this.send({
        type: 'cell_value_response',
        requestId: message.requestId,
        cellName: message.cellName,
        success: false,
        error: err.message
      });
    }
  }

  /**
   * Handle cell list request from server
   */
  handleListCellsRequest(message) {
    const runtime = this.getRuntimeModule();

    if (!runtime || !runtime._scope) {
      this.send({
        type: 'cells_list_response',
        requestId: message.requestId,
        success: false,
        error: 'Observable runtime not found'
      });
      return;
    }

    // Get all cell names from runtime scope
    const cells = Array.from(runtime._scope.keys())
      .filter(name => !name.startsWith('_'))  // Exclude internal vars
      .sort();

    this.send({
      type: 'cells_list_response',
      requestId: message.requestId,
      success: true,
      cells
    });
  }

  /**
   * Send message to server
   */
  send(message) {
    const data = JSON.stringify({
      ...message,
      sessionId: this.sessionId,
      timestamp: message.timestamp || Date.now()
    });

    if (this.connected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      // Queue message for later
      this.messageQueue.push(data);
    }
  }

  /**
   * Patch console methods to intercept logs
   */
  patchConsole() {
    const levels = ['log', 'info', 'warn', 'error', 'debug'];

    levels.forEach(level => {
      this.originalConsole[level] = console[level];

      console[level] = (...args) => {
        // Call original console method
        this.originalConsole[level](...args);

        // Send to debug server
        this.send({
          type: 'log',
          data: {
            level,
            args: args.map(arg => this.serializeArg(arg))
          }
        });
      };
    });
  }

  /**
   * Serialize console arguments for transmission
   */
  serializeArg(arg) {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';

    const type = typeof arg;

    if (type === 'string' || type === 'number' || type === 'boolean') {
      return arg;
    }

    if (type === 'function') {
      return `[Function: ${arg.name || 'anonymous'}]`;
    }

    if (arg instanceof Error) {
      return {
        __type: 'Error',
        message: arg.message,
        stack: arg.stack
      };
    }

    if (arg instanceof Element) {
      return `[Element: ${arg.tagName.toLowerCase()}]`;
    }

    if (ArrayBuffer.isView(arg)) {
      return `[TypedArray: ${arg.constructor.name} length=${arg.length}]`;
    }

    try {
      // Try to stringify, with circular reference handling
      const seen = new WeakSet();
      return JSON.parse(JSON.stringify(arg, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]';
          }
          seen.add(value);
        }
        return value;
      }));
    } catch (err) {
      return `[Object: ${Object.prototype.toString.call(arg)}]`;
    }
  }

  /**
   * Enhanced value serialization for cell values
   * Handles larger data structures, canvas elements, and complex types
   */
  serializeValue(value, maxDepth = 10, currentDepth = 0, seen = new WeakMap()) {
    const MAX_STRING_LENGTH = 10000;
    const MAX_ARRAY_LENGTH = 100;
    const MAX_SIZE_BYTES = 1024 * 1024; // 1MB

    // Handle primitives
    if (value === null) return null;
    if (value === undefined) return { __type: 'undefined' };

    const type = typeof value;

    if (type === 'string') {
      if (value.length > MAX_STRING_LENGTH) {
        return {
          __type: 'string',
          value: value.slice(0, MAX_STRING_LENGTH) + '...',
          truncated: true,
          length: value.length
        };
      }
      return value;
    }

    if (type === 'number' || type === 'boolean') {
      return value;
    }

    if (type === 'function') {
      const source = value.toString();
      return {
        __type: 'Function',
        name: value.name || 'anonymous',
        source: source.length > 200 ? source.slice(0, 200) + '...' : source
      };
    }

    // Handle circular references
    if (type === 'object') {
      if (seen.has(value)) {
        return { __type: 'Circular', ref: seen.get(value) };
      }

      if (currentDepth >= maxDepth) {
        return { __type: 'MaxDepthExceeded' };
      }

      seen.set(value, `ref-${seen.size}`);
    }

    // Handle Error objects
    if (value instanceof Error) {
      return {
        __type: 'Error',
        name: value.name,
        message: value.message,
        stack: value.stack
      };
    }

    // Handle Canvas elements
    if (value instanceof HTMLCanvasElement) {
      try {
        const dataUrl = value.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];
        return {
          __type: 'Canvas',
          width: value.width,
          height: value.height,
          data: base64
        };
      } catch (err) {
        return {
          __type: 'Canvas',
          width: value.width,
          height: value.height,
          error: 'Failed to capture: ' + err.message
        };
      }
    }

    // Handle DOM Elements
    if (value instanceof Element) {
      return {
        __type: 'Element',
        tagName: value.tagName.toLowerCase(),
        id: value.id,
        className: value.className,
        innerHTML: value.innerHTML.slice(0, 500)
      };
    }

    // Handle TypedArrays
    if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
      const arr = Array.from(value);
      const sample = arr.length > 10 ? arr.slice(0, 10) : arr;
      return {
        __type: 'TypedArray',
        arrayType: value.constructor.name,
        length: value.length,
        sample: sample,
        truncated: arr.length > 10
      };
    }

    // Handle Arrays
    if (Array.isArray(value)) {
      if (value.length > MAX_ARRAY_LENGTH) {
        return {
          __type: 'Array',
          length: value.length,
          sample: value.slice(0, 20).map(v =>
            this.serializeValue(v, maxDepth, currentDepth + 1, seen)
          ),
          truncated: true
        };
      }
      return value.map(v => this.serializeValue(v, maxDepth, currentDepth + 1, seen));
    }

    // Handle Date
    if (value instanceof Date) {
      return {
        __type: 'Date',
        value: value.toISOString()
      };
    }

    // Handle RegExp
    if (value instanceof RegExp) {
      return {
        __type: 'RegExp',
        source: value.source,
        flags: value.flags
      };
    }

    // Handle Map
    if (value instanceof Map) {
      const entries = Array.from(value.entries()).slice(0, MAX_ARRAY_LENGTH);
      return {
        __type: 'Map',
        size: value.size,
        entries: entries.map(([k, v]) => [
          this.serializeValue(k, maxDepth, currentDepth + 1, seen),
          this.serializeValue(v, maxDepth, currentDepth + 1, seen)
        ]),
        truncated: value.size > MAX_ARRAY_LENGTH
      };
    }

    // Handle Set
    if (value instanceof Set) {
      const values = Array.from(value).slice(0, MAX_ARRAY_LENGTH);
      return {
        __type: 'Set',
        size: value.size,
        values: values.map(v => this.serializeValue(v, maxDepth, currentDepth + 1, seen)),
        truncated: value.size > MAX_ARRAY_LENGTH
      };
    }

    // Handle plain objects
    try {
      const result = {};
      const keys = Object.keys(value);

      // Limit number of keys
      const limitedKeys = keys.slice(0, 100);

      for (const key of limitedKeys) {
        try {
          result[key] = this.serializeValue(value[key], maxDepth, currentDepth + 1, seen);
        } catch (err) {
          result[key] = { __type: 'Error', message: 'Serialization failed: ' + err.message };
        }
      }

      if (keys.length > limitedKeys.length) {
        result.__truncated = true;
        result.__totalKeys = keys.length;
      }

      return result;
    } catch (err) {
      return {
        __type: 'Object',
        error: 'Serialization failed: ' + err.message,
        toString: Object.prototype.toString.call(value)
      };
    }
  }

  /**
   * Watch for JavaScript errors
   */
  watchForErrors() {
    window.addEventListener('error', (event) => {
      this.send({
        type: 'error',
        data: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
          source: 'window.error'
        }
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.send({
        type: 'error',
        data: {
          message: `Unhandled Promise Rejection: ${event.reason}`,
          stack: event.reason?.stack,
          source: 'unhandledrejection'
        }
      });
    });
  }

  /**
   * Watch for Observable runtime errors (.observablehq--error elements)
   */
  watchForRuntimeErrors() {
    // Check for existing errors
    const checkErrors = () => {
      const errorElements = document.querySelectorAll('.observablehq--error');

      errorElements.forEach(el => {
        // Check if we've already reported this error
        if (el.dataset.debugReported) return;

        el.dataset.debugReported = 'true';

        // Get the cell ID from parent
        const cellElement = el.closest('.observablehq--cell');
        const cellId = cellElement?.id?.replace('cell-', '') || 'unknown';

        // Get error message
        const inspectElement = el.querySelector('.observablehq--inspect');
        const message = inspectElement?.textContent || 'Unknown error';

        this.send({
          type: 'runtime_error',
          data: {
            message,
            cellId,
            html: el.innerHTML.slice(0, 500)  // Limit size
          }
        });
      });
    };

    // Check periodically
    this.errorCheckInterval = setInterval(checkErrors, ERROR_CHECK_INTERVAL);

    // Also use MutationObserver for immediate detection
    this.errorObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList?.contains('observablehq--error') ||
                node.querySelector?.('.observablehq--error')) {
              checkErrors();
              break;
            }
          }
        }
      }
    });

    this.errorObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Send binary data (e.g., canvas screenshot)
   */
  sendBinary(name, mimeType, data) {
    this.send({
      type: 'binary',
      data: {
        name,
        mimeType,
        data  // Should be base64 encoded
      }
    });
  }

  /**
   * Capture canvas as image and send to server
   */
  captureCanvas(canvas, name = 'canvas.png') {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const base64 = dataUrl.split(',')[1];

      this.sendBinary(name, 'image/png', base64);
      console.log(`[DebugClient] Captured canvas: ${name}`);
    } catch (err) {
      console.error('[DebugClient] Failed to capture canvas:', err);
    }
  }

  /**
   * Signal that the notebook has completed loading/initialization
   */
  signalReady() {
    console.log('[NOTEBOOK_READY]');
    this.endSession();
  }

  /**
   * End the debug session
   */
  endSession() {
    if (this.sessionEnded) return;

    this.sessionEnded = true;

    this.send({
      type: 'session_end',
      data: {
        duration: Date.now() - this.sessionStartTime
      }
    });

    // Stop error checking
    if (this.errorCheckInterval) {
      clearInterval(this.errorCheckInterval);
    }

    if (this.errorObserver) {
      this.errorObserver.disconnect();
    }

    console.log('[DebugClient] Session ended');
  }

  /**
   * Manually trigger a refresh (for testing)
   */
  refresh() {
    window.location.reload();
  }
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const client = new DebugClient();
    client.init();
  });
} else {
  const client = new DebugClient();
  client.init();
}

export default DebugClient;
