import { observable, config } from "@observablehq/notebook-kit/vite";
import { debugNotebook } from "@rreusser/mcp-observable-notebookkit-debugger";
import { defineConfig } from "vite";

const S3_BASE = "https://s3.us-east-1.amazonaws.com/tilesets.rreusser.github.io";

const tileUrls = {
  terrain: process.env.NODE_ENV === "production"
    ? `${S3_BASE}/denali-arcticdem-srtm30-v1/{z}/{x}/{y}.webp`
    : "data/tiles/denali-arcticdem-srtm30-v1/{z}/{x}/{y}.webp",
  sentinel: process.env.NODE_ENV === "production"
    ? `${S3_BASE}/denali-sentinel2-v1/{z}/{x}/{y}.webp`
    : "data/tiles/denali-sentinel2-v1/{z}/{x}/{y}.webp",
};

export default {
  ...config(),
  define: {
    __TILE_URL_TERRAIN__: JSON.stringify(tileUrls.terrain),
    __TILE_URL_SENTINEL__: JSON.stringify(tileUrls.sentinel),
  },
  plugins: [
    debugNotebook(),
    observable({}),
  ],
  server: {
    hmr: false,
  },
};
