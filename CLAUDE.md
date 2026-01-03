# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository publishes Observable notebooks as a static website using Observable Notebook Kit. Notebooks are written as HTML files with reactive cells and built into static sites using Vite.

## Development Commands

```bash
npm start        # Start dev server with live reload
npm run build    # Build static site to docs/
```

The dev server runs Vite and serves from `src/` with live reloading. The build outputs to `docs/` for GitHub Pages deployment.

## Architecture

### Build Pipeline (vite.config.js)

The build uses a custom Vite configuration with the Observable plugin that:

1. **Scans all notebooks**: Globs `src/**/*.html` files to find all notebooks
2. **Extracts metadata**: Reads `metadata.yml` from each notebook directory
3. **Transforms template**: Uses Handlebars to inject notebook data into `lib/template.html`
4. **Transforms notebooks**: Strips the leading H1 from the first cell (since it's in the header)
5. **Generates index**: Creates the index page by collecting all non-hidden notebooks sorted by publishedAt

Key configuration:
- `root: "src"` - Source directory
- `base: "/notebooks/"` - URL base path for deployment
- `build.outDir: "docs"` - Output for GitHub Pages

### Notebook Structure

Each notebook directory contains:
- `index.html` - The notebook itself
- `metadata.yml` - Publishing metadata (optional)
- Assets (images, CSV files, etc.)

### metadata.yml Fields

- `publishedAt` - Display date (e.g., "August 3, 2025")
- `description` - SEO description
- `maxWidth` - Custom main content width (e.g., "640px")
- `mastodonPostId` - Enables Mastodon comments integration
- `observableUrl` - Link to live Observable.com version
- `hidden: true` - Excludes from index but still builds
- `silent: true` - Excludes from index AND adds noindex meta tag

### Notebook HTML Format

Notebooks use the `<notebook>` element with cells as `<script>` elements:

```html
<!doctype html>
<notebook theme="air">
  <title>Notebook Title</title>

  <!-- Markdown cell -->
  <script id="1" type="text/markdown">
    # Content
  </script>

  <!-- JavaScript module cell -->
  <script id="2" type="module">
    const x = 42;
    display(x);
  </script>

  <!-- Observable JavaScript cell -->
  <script id="3" type="application/vnd.observable.javascript">
    y = x * 2
  </script>
</notebook>
```

### Cell Types

- `type="text/markdown"` - Markdown content
- `type="module"` - Plain JavaScript (ES modules)
- `type="application/vnd.observable.javascript"` - Observable-flavored JavaScript
- `type="text/html"` - HTML/CSS content
- Other: SQL, LaTeX, Graphviz (DOT)

### Cell Attributes

- `pinned` - Shows source code in output
- `hidden` - Suppresses output display

### Import Scope (CRITICAL - READ THIS)

**Observable notebooks have GLOBAL import scope** - imports are NOT scoped to individual cells!

When you `import` a symbol in ANY cell, that symbol becomes available to ALL cells in the notebook. Importing the same symbol again in another cell causes a **"defined more than once" RuntimeError**.

❌ **WRONG** - This causes "defined more than once" errors:
```html
<!-- Cell 1 -->
<script id="1" type="module">
  import { foo } from './module.js';
  foo();
</script>

<!-- Cell 2 -->
<script id="2" type="module">
  import { foo } from './module.js';  // ❌ ERROR: foo already imported!
  foo();
</script>
```

✅ **CORRECT** - Import once, use everywhere:
```html
<!-- Cell 1: Import at top of notebook -->
<script id="1" type="module">
  import { foo, bar, baz } from './module.js';
</script>

<!-- Cell 2: Just use it, no import needed -->
<script id="2" type="module">
  foo();  // ✓ Available from cell 1's import
</script>

<!-- Cell 3: Import only NEW symbols -->
<script id="3" type="module">
  import { qux } from './other-module.js';  // ✓ OK - qux not imported yet
  foo();  // ✓ Still works from cell 1
  qux();  // ✓ Works from this import
</script>
```

**Best practice:**
- Create a dedicated imports cell at the top of the notebook
- Import ALL symbols you'll need across the notebook in that one cell
- Individual cells can then use those imports without re-importing
- Only use `import` in later cells for NEW symbols not yet imported anywhere else

**When adding new sections to existing notebooks:**
1. Check the top-level imports cell for already-imported symbols
2. Only import symbols that aren't already imported
3. If you need new symbols, either:
   - Add them to the top-level imports cell (preferred), OR
   - Import only the new symbols in your new cell

### Reactive Programming Model

Observable notebooks support two types of JavaScript cells with different reactive behaviors:

#### Plain JavaScript Cells (`type="module"`)

Plain JavaScript cells use standard ES module syntax but with reactive data flow:

- **Cell-level scope**: Variables declared at the top level of a cell (e.g., `const x = 5;`) become available to other cells
- **Reactive dependencies**: When cell B references a variable from cell A, cell B automatically re-runs when that variable changes
- **Local scope**: Variables within a cell are local to that cell unless declared at the top level
- **Ambiguity errors**: If multiple cells declare the same top-level variable name, it's an error for another cell to reference it
- **Cell value**: The last expression in a cell becomes that cell's value, available to other cells via the cell's ID (with hyphens converted to underscores)
- **No block wrapping needed**: Unlike Observable JavaScript, plain JS cells don't need to be wrapped in `{ return value; }` blocks - just declare variables at the top level and have the value as the last expression

**Example pattern for input controls:**
```javascript
// Cell: my-input
const inputElement = view(Inputs.toggle({label: "Enable", value: true}));
display(inputElement);
inputElement;  // Export as cell value
```

Other cells can reference `my_input` (note underscore) and will re-run when the input changes.

**Example pattern for setup + animation:**
```javascript
// Cell: webgl-setup (runs once, returns state object)
const canvas = html`<canvas></canvas>`;
const gl = canvas.getContext("webgl2");
// ... setup code ...

// Last expression becomes cell value
({ canvas, gl, /* other state */ });

// Cell: animation-loop (depends on webgl-setup and my-input)
const { canvas, gl } = webgl_setup;
const enabled = my_input;

let animationId;

function render() {
  if (enabled) {
    // ... do work ...
  }
  animationId = requestAnimationFrame(render);
}

invalidation.then(() => cancelAnimationFrame(animationId));
render();

// Last expression becomes cell value
canvas;
```

When `my_input` changes, only the `animation-loop` cell re-runs (not `webgl-setup`), allowing state to persist while reactively responding to input changes.

#### Observable JavaScript Cells (`type="application/vnd.observable.javascript"`)

- Single expression per cell with implicit reactivity
- Use `viewof` syntax for inputs: `viewof x = Inputs.range([0, 100])`
- More concise but less flexible than plain JavaScript

#### General Notes

- **Multiple outputs**: Use `display()` multiple times in a cell to show multiple outputs
- **Inputs**: Use `view(Inputs.range(...))` in plain JS cells instead of `viewof` syntax
- **Imports**: Use `import { foo } from 'observable:@user/notebook'` for Observable notebook imports
- **Invalidation**: Use `invalidation.then(() => { /* cleanup */ })` to cancel animations/timers when a cell re-runs

### LaTeX Equations in Markdown Cells

When writing mathematical equations in markdown cells (`type="text/markdown"`), use Observable's `tex` template literal syntax:

- **Inline math**: Use `${tex`...`}` for equations within text
  ```markdown
  Consider a pendulum with mass ${tex`m`} and length ${tex`l = 1.5`}.
  ```

- **Display equations**: Use `${tex.block`...`}` for equations on their own lines
  ```markdown
  The equation of motion is:

  ${tex.block`\frac{d^2\theta}{dt^2} + \frac{g}{l}\sin\theta = 0`}
  ```

- **Multi-line aligned equations**: Use `\begin{aligned}...\end{aligned}` inside `tex.block`
  ```markdown
  ${tex.block`\begin{aligned}
  x &= l \sin \theta \\
  y &= -l \cos \theta
  \end{aligned}`}
  ```

**Important**: Do NOT use `$$...$$` or `$...$` syntax - these are for standard markdown and won't render in Observable notebooks.

### Template System (lib/template.html)

The Handlebars template wraps notebook content with:
- Site navigation
- Header with title, author, publish date
- Resource links (Observable URL, GitHub source)
- Mastodon comments integration (if `mastodonPostId` set)
- Index list generation (for index.html only)

Template receives data from both the notebook's parsed structure and metadata.yml.

### Layout Guidelines for Notebooks

**DO NOT create horizontal layouts with multiple images/canvases side-by-side** - they run off the edge of the notebook viewport.

❌ **WRONG** - Horizontal grid layout:
```javascript
html`<div style="display: grid; grid-template-columns: repeat(3, 1fr);">
  <div>${canvas1}</div>
  <div>${canvas2}</div>
  <div>${canvas3}</div>
</div>`
```

✅ **CORRECT** - Vertical stack layout:
```javascript
html`<div style="display: flex; flex-direction: column; gap: 24px;">
  <div>
    <div style="margin-bottom: 8px;"><strong>First Image</strong></div>
    ${canvas1}
  </div>
  <div>
    <div style="margin-bottom: 8px;"><strong>Second Image</strong></div>
    ${canvas2}
  </div>
  <div>
    <div style="margin-bottom: 8px;"><strong>Third Image</strong></div>
    ${canvas3}
  </div>
</div>`
```

**Always orient visualizations vertically** with clear labels above each image/canvas.

### Visualization Guidelines

**DO NOT normalize data for display using min/max normalization** - this makes results incomparable across different methods or configurations.

❌ **WRONG** - Independent normalization makes comparison meaningless:
```javascript
// Method 1 result: [0.5, 0.6, 0.7] → normalized to [0.0, 0.5, 1.0]
// Method 2 result: [0.8, 0.9, 1.0] → normalized to [0.0, 0.5, 1.0]
// Both look identical after normalization despite being very different!
const normalized = (value - min) / (max - min);
```

✅ **CORRECT** - Use raw values or consistent clamping:
```javascript
// Both methods use same scale, visually comparable
const displayValue = Math.min(Math.max(value, 0), 1) * 255;
```

**When visualizing results:**
- Display raw values when possible (with appropriate clamping to valid range)
- If normalization is necessary, use the SAME min/max for all compared images
- Clearly label whether images show raw or normalized values
- For scientific visualizations, prefer raw values to preserve absolute magnitudes

### Shared Libraries

- `src/lib/` - Shared libraries used by notebooks
- `src/comments.js` - Preact component for Mastodon comments (mathstodon.xyz)
- `src/styles.css` - Global styles with custom theme color `--rrtheme-color: #ca4747`

### Special Notebooks

Some notebooks like `src/fmt/` are marked `hidden: true` and serve as importable libraries for other notebooks rather than standalone pages.

## Important Notes

- This repo uses modified versions of @observablehq/notebook-kit with PRs #30 and #39 merged but not yet published to npm
- The `transformTemplate` and `transformNotebook` functions in vite.config.js are custom extensions
- The index page (`src/index.html`) is automatically populated with notebook listings via the template
- GitHub source links are auto-generated based on the relative path in src/

## Creating New Notebooks

1. Create a directory in `src/` with your notebook name (kebab-case)
2. Add `index.html` with the notebook content
3. Add `metadata.yml` with at minimum `publishedAt` and `description`
4. Run `npm start` to preview
5. The notebook will automatically appear in the index unless marked `hidden` or `silent`
