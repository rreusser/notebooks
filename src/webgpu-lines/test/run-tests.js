#!/usr/bin/env node
/**
 * WebGPU Lines Test Runner
 *
 * Runs each test in a subprocess to avoid resource accumulation issues.
 *
 * Usage:
 *   node test/run-tests.js                    # Run all tests
 *   node test/run-tests.js --filter=cap       # Run tests matching "cap"
 *   UPDATE=1 node test/run-tests.js           # Update expected images
 */

import { spawn } from 'child_process';
import { testCases, filterTestCases } from './test-cases.js';
import { ensureDirectories } from './test-harness.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UPDATE_MODE = process.env.UPDATE === '1';
const FILTER = process.argv.find(arg => arg.startsWith('--filter='))?.split('=')[1];

// ANSI colors
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

/**
 * Run a single test in a subprocess
 */
function runTestSubprocess(testName, update) {
  return new Promise((resolve) => {
    const args = [path.join(__dirname, 'run-single-test.js'), testName];
    if (update) args.push('--update');

    const proc = spawn(process.execPath, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 30000
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => { stdout += data; });
    proc.stderr.on('data', (data) => { stderr += data; });

    proc.on('close', (code, signal) => {
      if (signal === 'SIGTERM') {
        resolve({ status: 'timeout', name: testName });
        return;
      }

      try {
        const result = JSON.parse(stdout.trim());
        resolve(result);
      } catch {
        resolve({
          status: 'error',
          name: testName,
          message: stderr || stdout || `Exit code ${code}`
        });
      }
    });

    proc.on('error', (err) => {
      resolve({ status: 'error', name: testName, message: err.message });
    });
  });
}

async function main() {
  console.log(`\n${BOLD}WebGPU Lines Test Runner${RESET}`);
  console.log(`Mode: ${UPDATE_MODE ? `${YELLOW}UPDATE${RESET}` : 'TEST'}`);
  if (FILTER) console.log(`Filter: ${FILTER}`);
  console.log('');

  ensureDirectories();

  const cases = filterTestCases(FILTER);
  console.log(`Running ${cases.length} test(s)...\n`);

  let passed = 0;
  let failed = 0;
  let updated = 0;
  const failures = [];

  for (const testCase of cases) {
    const { name } = testCase;
    process.stdout.write(`  ${name}... `);

    const result = await runTestSubprocess(name, UPDATE_MODE);

    switch (result.status) {
      case 'updated':
        console.log(`${YELLOW}UPDATED${RESET}`);
        updated++;
        break;

      case 'pass':
        console.log(`${GREEN}PASS${RESET}`);
        passed++;
        break;

      case 'fail':
        console.log(`${RED}FAIL${RESET} (${result.diffPixels} pixels, ${result.diffPercent?.toFixed(2)}%)`);
        failed++;
        failures.push({ name, reason: `${result.diffPixels} pixels different` });
        break;

      case 'missing':
        console.log(`${RED}MISSING EXPECTED${RESET}`);
        console.log(`    Run with UPDATE=1 to create expected image`);
        failed++;
        failures.push({ name, reason: 'missing expected image' });
        break;

      case 'timeout':
        console.log(`${RED}TIMEOUT${RESET}`);
        failed++;
        failures.push({ name, reason: 'timeout' });
        break;

      case 'error':
      default:
        console.log(`${RED}ERROR${RESET}`);
        console.log(`    ${result.message}`);
        failed++;
        failures.push({ name, reason: result.message });
        break;
    }
  }

  // Summary
  console.log('\n' + '─'.repeat(50));
  if (UPDATE_MODE) {
    console.log(`${BOLD}Updated: ${updated}${RESET}`);
    if (failed > 0) {
      console.log(`${RED}Errors: ${failed}${RESET}`);
    }
  } else {
    console.log(`${BOLD}Results: ${GREEN}${passed} passed${RESET}, ${failed > 0 ? RED : ''}${failed} failed${RESET}`);

    if (failures.length > 0) {
      console.log(`\n${RED}Failures:${RESET}`);
      for (const f of failures) {
        console.log(`  - ${f.name}: ${f.reason}`);
      }
    }
  }
  console.log('');

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(`${RED}Fatal error:${RESET}`, err);
  process.exit(1);
});
