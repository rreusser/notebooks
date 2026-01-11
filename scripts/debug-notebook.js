#!/usr/bin/env node
/**
 * CLI wrapper for debugging Observable notebooks
 *
 * Usage:
 *   ./scripts/debug-notebook.js                  - Refresh and capture logs
 *   ./scripts/debug-notebook.js --wait 10000     - Wait 10 seconds for errors
 *   ./scripts/debug-notebook.js --session <id>   - View specific session
 *   ./scripts/debug-notebook.js --tail           - Tail logs in real-time
 */

import WebSocket from 'ws';
import chalk from 'chalk';
import { program } from 'commander';

const WS_URL = 'ws://localhost:9899';
const HTTP_URL = 'http://localhost:9898';
const DEFAULT_WAIT = 5000;  // Wait 5 seconds after refresh

program
  .option('-w, --wait <ms>', 'Time to wait for logs after refresh (ms)', DEFAULT_WAIT)
  .option('-s, --session <id>', 'View specific session logs')
  .option('-t, --tail', 'Tail logs in real-time')
  .option('-r, --refresh', 'Trigger refresh only (no log output)')
  .option('--list', 'List all sessions')
  .option('--json', 'Output in JSON format')
  .parse(process.argv);

const options = program.opts();

/**
 * Connect to debug server
 */
function connect() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL);
    let connected = false;

    const timeout = setTimeout(() => {
      if (!connected) {
        ws.close();
        reject(new Error('Connection timeout'));
      }
    }, 5000);

    ws.on('open', () => {
      connected = true;
      clearTimeout(timeout);
      resolve(ws);
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Fetch session data from server
 */
async function fetchSession(sessionId) {
  const response = await fetch(`${HTTP_URL}/status`);
  const status = await response.json();

  // Find session in server memory (would need API endpoint in practice)
  // For now, this is a placeholder
  return null;
}

/**
 * Trigger page refresh and capture new session
 */
async function refreshAndCapture() {
  console.log(chalk.blue('🔄 Connecting to debug server...'));

  let ws;
  try {
    ws = await connect();
  } catch (err) {
    console.error(chalk.red('❌ Failed to connect to debug server'));
    console.error(chalk.gray('   Make sure debug-server.js is running:'));
    console.error(chalk.gray('   node debug-server.js'));
    process.exit(1);
  }

  console.log(chalk.green('✓ Connected'));

  let sessionId = null;
  const logs = [];
  const errors = [];
  const binary = [];

  // Listen for messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === 'refresh') {
        sessionId = message.sessionId;
      }
    } catch (err) {
      // Ignore parse errors
    }
  });

  // Send refresh command
  console.log(chalk.blue('🔄 Triggering page refresh...'));
  ws.send(JSON.stringify({ type: 'refresh', sessionId: `session-${Date.now()}` }));

  // Wait for logs to accumulate
  const waitTime = parseInt(options.wait);
  console.log(chalk.gray(`⏱  Waiting ${waitTime}ms for logs...`));

  await new Promise(resolve => setTimeout(resolve, waitTime));

  // Fetch session status
  try {
    const response = await fetch(`${HTTP_URL}/status`);
    const status = await response.json();
    sessionId = status.currentSession;

    console.log(chalk.green('✓ Logs captured'));
    console.log('');

    // Since we don't have a direct API to fetch logs yet,
    // we'll need to import the server module
    console.log(chalk.yellow('ℹ  Session ID:'), sessionId);
    console.log(chalk.gray('   Use the debug server console to view detailed logs'));
    console.log(chalk.gray('   Or connect with: debug> logs ' + sessionId));
  } catch (err) {
    console.error(chalk.red('❌ Failed to fetch session data:'), err.message);
  }

  ws.close();
  process.exit(0);
}

/**
 * List all sessions
 */
async function listSessions() {
  try {
    const response = await fetch(`${HTTP_URL}/status`);
    const status = await response.json();

    if (options.json) {
      console.log(JSON.stringify(status, null, 2));
    } else {
      console.log(chalk.blue('📋 Sessions:'));
      console.log('');
      console.log(chalk.yellow('  Current:'), status.currentSession || 'none');
      console.log(chalk.gray('  All:'), status.sessions.join(', ') || 'none');
      console.log(chalk.gray('  Clients:'), status.connectedClients);
    }
  } catch (err) {
    console.error(chalk.red('❌ Failed to fetch sessions:'), err.message);
    process.exit(1);
  }
}

/**
 * Format and display log entry
 */
function formatLog(log) {
  const time = new Date(log.timestamp).toLocaleTimeString();
  const level = log.level.toUpperCase().padEnd(5);

  let color = chalk.white;
  if (log.level === 'error') color = chalk.red;
  else if (log.level === 'warn') color = chalk.yellow;
  else if (log.level === 'info') color = chalk.blue;
  else if (log.level === 'debug') color = chalk.gray;

  const args = log.args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, 2);
    }
    return String(arg);
  }).join(' ');

  console.log(color(`[${time}] ${level} ${args}`));
}

/**
 * Format and display error
 */
function formatError(error) {
  const time = new Date(error.timestamp).toLocaleTimeString();

  console.log('');
  console.log(chalk.red.bold(`[${time}] ❌ ERROR`));
  console.log(chalk.red('  Message:'), error.message);

  if (error.cellId) {
    console.log(chalk.red('  Cell:'), error.cellId);
  }

  if (error.source) {
    console.log(chalk.gray('  Source:'), error.source);
  }

  if (error.stack) {
    console.log(chalk.gray('  Stack:'));
    error.stack.split('\n').forEach(line => {
      console.log(chalk.gray('    ' + line));
    });
  }

  console.log('');
}

/**
 * Main execution
 */
async function main() {
  if (options.list) {
    await listSessions();
    process.exit(0);
  }

  if (options.refresh) {
    await refreshAndCapture();
    return;
  }

  // Default action: refresh and capture
  await refreshAndCapture();
}

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error(chalk.red('❌ Unhandled error:'), err);
  process.exit(1);
});

// Run
main();
