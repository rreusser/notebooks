#!/usr/bin/env node
/**
 * Run all regl-gpu-lines fixtures and report results
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, '..', 'regl-gpu-lines', 'fixtures');

// Find all fixture directories
function findFixtures(dir, fixtures = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fs.existsSync(path.join(fullPath, 'fixture.json'))) {
        fixtures.push(fullPath);
      } else {
        findFixtures(fullPath, fixtures);
      }
    }
  }
  return fixtures;
}

const fixtures = findFixtures(fixturesDir);
console.log(`Found ${fixtures.length} fixtures\n`);

const results = { pass: [], fail: [], error: [] };

for (const fixture of fixtures) {
  const relativePath = path.relative(path.join(__dirname, '..'), fixture);
  const name = relativePath.replace('regl-gpu-lines/fixtures/', '');

  try {
    const output = execSync(`node test/run-fixture-test.js ${relativePath}`, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    if (output.includes('PASS')) {
      console.log(`  ✓ ${name}`);
      results.pass.push(name);
    } else {
      const match = output.match(/(\d+) pixels different \((\d+\.\d+)%\)/);
      if (match && parseFloat(match[2]) < 1.0) {
        console.log(`  ✓ ${name} (${match[2]}% diff)`);
        results.pass.push(name);
      } else {
        console.log(`  ✗ ${name}`);
        results.fail.push({ name, output });
      }
    }
  } catch (err) {
    const output = err.stdout?.toString() || err.stderr?.toString() || '';
    const match = output.match(/(\d+) pixels different \((\d+\.\d+)%\)/);
    if (match) {
      const percent = parseFloat(match[2]);
      if (percent < 1.0) {
        console.log(`  ✓ ${name} (${percent.toFixed(2)}% diff)`);
        results.pass.push(name);
      } else {
        console.log(`  ✗ ${name} (${percent.toFixed(2)}% diff)`);
        results.fail.push({ name, percent });
      }
    } else {
      console.log(`  ! ${name} (error)`);
      results.error.push({ name, error: err.message });
    }
  }
}

console.log('\n' + '─'.repeat(50));
console.log(`Results: ${results.pass.length} passed, ${results.fail.length} failed, ${results.error.length} errors`);

if (results.fail.length > 0) {
  console.log('\nFailed:');
  for (const f of results.fail) {
    console.log(`  - ${f.name}${f.percent ? ` (${f.percent.toFixed(2)}%)` : ''}`);
  }
}

if (results.error.length > 0) {
  console.log('\nErrors:');
  for (const e of results.error) {
    console.log(`  - ${e.name}: ${e.error}`);
  }
}
