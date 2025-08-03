import { observable, config } from "@observablehq/notebook-kit/vite";
import { defineConfig } from "vite";
import { readFileSync, existsSync } from "node:fs";
import Handlebars from "handlebars";
import path from "node:path";
import yaml from "yaml";
import { glob } from "glob";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const TEMPLATE_PATH = path.join(__dirname, "lib/template.html");

const githubUrlBase =
  "https://github.com/rreusser/notebooks/tree/main/src";

const notebooksPath = glob.sync(
  path.join(__dirname, "src", "**", "*.html"),
  {
    nodir: true,
    absolute: true,
  }
);

export default defineConfig({
  ...config(),
  plugins: [
    observable({
      template: TEMPLATE_PATH,
      compileTemplate: function ({ template, context, notebook }) {
        const { path: sourcePath, filename } = context;
        const dir = path.dirname(filename);
        const metadataPath = path.join(dir, "metadata.yml");
        const metadata = existsSync(metadataPath)
          ? yaml.parse(readFileSync(metadataPath, "utf8"))
          : {};
        const sourceUrl = path.join(githubUrlBase, sourcePath);

        if (notebook?.cells?.[0]?.value?.startsWith("# ")) {
          const lines = notebook.cells[0].value.split("\n");

          const headerContent =
            [
              "[Ricky Reusser](https://rreusser.github.io)",
              metadata.publishedAt
                ? new Date(metadata.publishedAt).toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "",
              "[View source →](" + sourceUrl + ")",
            ]
              .filter(Boolean)
              .join("<br>") + "\n";
          lines.splice(1, 0, headerContent);
          notebook.cells[0].value = lines.join("\n");
        }

        return Handlebars.compile(template)({
          sourceUrl,
          title: notebook.title,
          ...metadata,
        });
      },
    }),
  ],
  build: {
    outDir: path.join(__dirname, "docs"),
    emptyOutDir: true,
    rollupOptions: {
      input: notebooksPath,
    },
  },
  root: "src",
  base: "/notebooks/",
  clearScreen: false,
});
