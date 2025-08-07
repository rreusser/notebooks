import { observable, config } from "@observablehq/notebook-kit/vite";
import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import Handlebars from "handlebars";
import { join, dirname, resolve } from "node:path";
import yaml from "yaml";
import { glob } from "glob";
import { deserialize } from "@observablehq/notebook-kit";
import { JSDOM } from "jsdom";
const window = new JSDOM().window;
const parser = new window.DOMParser();

const __dirname = dirname(new URL(import.meta.url).pathname);

const TEMPLATE_PATH = join(__dirname, "lib/template.html");
const GITHUB_BASE_URL = "https://github.com/rreusser/notebooks/tree/main/src";

async function readMetadata(filename) {
  let metadataYAML = "";
  const metadataPath = join(dirname(filename), "metadata.yml");
  try {
    metadataYAML = await readFile(metadataPath, "utf8");
  } catch (e) {}
  return yaml.parse(metadataYAML);
}

export default defineConfig({
  ...config(),
  plugins: [
    observable({
      template: TEMPLATE_PATH,
      transformTemplate: async function (template, { filename, path }) {
        const notebook = deserialize(await readFile(filename, "utf8"), { parser });
        const metadata = await readMetadata(filename);
        return Handlebars.compile(template)({
          sourceUrl: join(GITHUB_BASE_URL, path),
          ...notebook,
          ...metadata,
        });
      },
      transformNotebook: async function (notebook, { filename }) {
        // Remove the leading h1, preserving additional cell content, if present.
        if (!notebook.cells.length) return notebook;
        const lines = notebook.cells[0].value.split("\n") || [];
        if (lines[0].startsWith("# ")) lines.splice(0, 1);
        if (lines.filter(Boolean).length) {
          notebook.cells[0].value = lines.join("\n");
        } else {
          notebook.cells.splice(0, 1);
        }
        return notebook;
      },
    }),
  ],
  build: {
    outDir: join(__dirname, "docs"),
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync(join(__dirname, "src", "**", "*.html"), {
        nodir: true,
        absolute: true,
      }),
    },
  },
  root: "src",
  base: "/notebooks/",
});
