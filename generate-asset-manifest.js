#!/usr/bin/env node
/**
 * Generate asset-manifest.json listing all static files you want precached.
 * Usage: node generate-asset-manifest.js
 * Run from your project root. It will scan common folders and write asset-manifest.json.
 */
const fs = require('fs');
const path = require('path');

// Folders to include. Add more if needed.
const INCLUDE_DIRS = ['.', 'lib', 'images', 'assets'];
// File extensions to include in the manifest
const EXTENSIONS = new Set([
  '.html', '.js', '.mjs', '.css', '.map', '.json',
  '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico',
  '.ttf', '.otf', '.woff', '.woff2', '.eot'
]);

// Exclude patterns (service worker itself, node_modules, hidden files, etc.)
const EXCLUDES = [
  /^\.\/node_modules(\/|$)/,
  /^\.\/\.git(\/|$)/,
  /^\.\/\.idea(\/|$)/,
  /^\.\/\.vscode(\/|$)/,
  /^\.\/asset-manifest\.json$/,
  /^\.\/generate-asset-manifest\.js$/
];

function walk(dir, base = '.') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const rel = './' + path.relative(base, fullPath).replace(/\\/g, '/');
    if (EXCLUDES.some(rx => rx.test(rel))) continue;
    if (entry.isDirectory()) {
      files = files.concat(walk(fullPath, base));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.has(ext)) {
        files.push(rel);
      }
    }
  }
  return files;
}

function main() {
  const projectRoot = process.cwd();
  const outPath = path.join(projectRoot, 'asset-manifest.json');

  let assets = [];
  for (const d of INCLUDE_DIRS) {
    const dirPath = path.join(projectRoot, d);
    if (fs.existsSync(dirPath)) {
      assets = assets.concat(walk(dirPath, projectRoot));
    }
  }

  // Deduplicate and sort
  const set = Array.from(new Set(assets)).sort();

  fs.writeFileSync(outPath, JSON.stringify({ assets: set }, null, 2));
  console.log(`Wrote ${set.length} assets to asset-manifest.json`);
}

if (require.main === module) {
  main();
}
