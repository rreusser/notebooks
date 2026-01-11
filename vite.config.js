import { observable, config } from "@observablehq/notebook-kit/vite";
import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import Handlebars from "handlebars";
import { join, dirname, resolve, relative } from "node:path";
import yaml from "yaml";
import { glob } from "glob";
import { deserialize } from "@observablehq/notebook-kit";
import { JSDOM } from "jsdom";
const window = new JSDOM().window;
const parser = new window.DOMParser();

const __dirname = dirname(new URL(import.meta.url).pathname);

const TEMPLATE_PATH = join(__dirname, "lib/template.html");
const GITHUB_BASE_URL = "https://github.com/rreusser/notebooks/tree/main/src";
const NOTEBOOKS_DIR = join(__dirname, "src");
const notebookPaths = glob.sync(join(NOTEBOOKS_DIR, "**", "*.html"), {
  nodir: true,
  absolute: true,
});

async function readMetadata(filename) {
  let metadataYAML = "";
  const metadataPath = join(dirname(filename), "metadata.yml");
  try {
    metadataYAML = await readFile(metadataPath, "utf8");
  } catch (e) {}
  const meta = yaml.parse(metadataYAML);
  if (meta?.publishedAt) {
    const pub = new Date(meta.publishedAt);
    meta.publishedAtNumeric = pub.toISOString().slice(0, 10).replace(/-/g, "");
  }
  return meta || {};
}

async function computeIndex() {
  const notebooks = [];
  for (const path of notebookPaths) {
    const relpath = relative(NOTEBOOKS_DIR, path);
    const notebook = deserialize(await readFile(path, "utf8"), { parser });
    if (relpath === "index.html") continue;
    const meta = await readMetadata(path);
    if (meta?.hidden || meta?.silent) continue;
    notebooks.push({
      path: relpath.replace(/index\.html$/, ""),
      ...notebook,
      ...meta,
    });
  }
  notebooks.sort(
    ({ publishedAt: da }, { publishedAt: db }) =>
      Date.parse(db || 0) - Date.parse(da || 0)
  );
  return notebooks;
}

export default defineConfig({
  ...config(),
  plugins: [
    observable({
      template: TEMPLATE_PATH,
      transformTemplate: async function (template, { filename, path }) {
        const notebook = deserialize(await readFile(filename, "utf8"), {
          parser,
        });
        const metadata = await readMetadata(filename);
        const isIndex = path === "/index.html";
        const data = {
          sourceUrl: `${GITHUB_BASE_URL}/${path.replace(/^\//, "")}`,
          author: "Ricky Reusser",
          authorUrl: "https://rreusser.github.io",
          ...notebook,
          ...metadata,
        };
        if (isIndex) {
          delete data.sourceUrl;
          delete data.author;

          // Add notebook links
          data.index = await computeIndex();
        }

        return Handlebars.compile(template)(data);
      },
      transformNotebook: async function (notebook, { filename }) {
        // Inject early console patching as the first cell (dev only)
        const consolePatching = `
if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.match(/127\\.0\\.0\\.1/))) {
  if (!window.__earlyConsoleLogs) {
    window.__earlyConsoleLogs = [];
    window.__originalConsole = {};
    ['log', 'info', 'warn', 'error', 'debug'].forEach(function(level) {
      window.__originalConsole[level] = console[level];
      console[level] = function() {
        var args = Array.prototype.slice.call(arguments);
        window.__originalConsole[level].apply(console, args);
        window.__earlyConsoleLogs.push({ level: level, args: args, timestamp: Date.now() });
      };
    });
  }
}`;
        notebook.cells.unshift({
          id: '__console_patch',
          value: consolePatching,
          mode: 'js'
        });

        // Remove the leading h1, preserving additional cell content, if present.
        // Note: index shifted by 1 due to console patching cell
        if (notebook.cells.length < 2) return notebook;
        const lines = notebook.cells[1].value.split("\n") || [];
        if (lines[0]?.startsWith("# ")) lines.splice(0, 1);
        if (lines.filter(Boolean).length) {
          notebook.cells[1].value = lines.join("\n");
        } else {
          notebook.cells.splice(1, 1);
        }
        return notebook;
      },
    }),
  ],
  build: {
    outDir: join(__dirname, "docs"),
    emptyOutDir: true,
    rollupOptions: {
      input: notebookPaths,
    },
  },
  root: "src",
  base: "/notebooks/",
});
