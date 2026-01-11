#!/usr/bin/env node
/**
 * Fetch and display session data from debug server
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sessionId = process.argv[2];

if (!sessionId) {
  console.error('Usage: node get-session.js <session-id>');
  process.exit(1);
}

// Fetch from HTTP endpoint
const response = await fetch(`http://localhost:9898/session/${sessionId}`);

if (!response.ok) {
  console.error('Failed to fetch session:', response.statusText);
  process.exit(1);
}

const session = await response.json();

if (!session) {
  console.error('Session not found');
  process.exit(1);
}

console.log(JSON.stringify(session, null, 2));
