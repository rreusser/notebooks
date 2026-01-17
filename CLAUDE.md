# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository publishes Observable notebooks as a static website using Observable Notebook Kit. Notebooks are written as HTML files with reactive cells and built into static sites using Vite.

## Development Commands

```bash
npm start        # Start dev server with live reload
npm run build    # Build static site to docs/
```

## Debugging techniques

- To make plots, use the techniques in src/plot-with-zoom/index.html as a good reference.

- Always assign unique and useful IDs to HTML elements and plot elements to make them easier to find and query.

- Use the Notebook MCP server to aid debugging. If it reports that the notebook disconnects while working, the most likely reason is a recent syntax error which prevents vite from building. Stop immediately and locate the syntax error, then refresh.
    - You will need to set `preserveDrawingBuffer: true` on WebGL contexts in order to read images via MCP.

- DO NOT import from `../lib`. Instead, symlink src/lib into src/notebook-name/lib and import from `./lib`.

- DO NOT import external modules in imported javascript files. Import external modules like npm: or observable: imports from the notebook, then inject them if necessary into library functions.

- **Mutable state across cells**: Observable notebooks don't allow reassigning variables defined in other cells. If you need mutable state that multiple cells can modify, wrap it in an object:
  ```javascript
  // Cell 1: Define state object
  const renderState = { dirty: true };

  // Cell 2: Can modify properties (NOT reassign the variable)
  renderState.dirty = true;  // OK
  // dirty = true;           // ERROR: "Assignment to external variable"
  ```
  This pattern is required for render loops, dirty flags, animation state, etc.

