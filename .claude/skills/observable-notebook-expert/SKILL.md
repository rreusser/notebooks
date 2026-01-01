---
name: observable-notebook-expert
description: Expert guidance for Observable Notebook Kit (Notebook 2.0) development including debugging, reactive patterns, and best practices. Use when working with Observable notebooks.
---

# Observable Notebook Expert

This skill provides comprehensive guidance for developing Observable notebooks using Notebook Kit (Observable 2.0), including debugging, reactive programming patterns, and best practices learned from production notebooks.

## When to Use This Skill

Use this skill when:
- An Observable notebook has compilation or runtime errors
- You need to verify that changes to a notebook are rendering correctly
- Working with reactive dependencies and avoiding common pitfalls
- Implementing interactive visualizations with proper state management
- The user reports an error they see in their browser
- You want to inspect the actual HTML output of a notebook

## Quick Start

To inspect the current notebook (perfectly-matched-layers-for-the-wave-equation):

```bash
scripts/inspect.sh
```

To inspect any notebook:

```bash
scripts/inspect.sh http://localhost:5173/notebooks/some-notebook-name/
```

## What the Script Does

The inspection script:
1. Fetches the page from localhost using curl
2. Detects Observable/Vite errors by looking for ErrorOverlay
3. Extracts and displays:
   - Error message
   - Line and column location
   - Stack trace (formatted for readability)
4. If no error is found, shows a content preview

## Error Types You'll See

### Parse Errors
JavaScript syntax errors from acorn (e.g., "'return' outside of function")
- Line/column numbers refer to the cell's JavaScript code
- Often caused by incorrect cell structure or indentation

### Runtime Errors
Errors during cell execution (e.g., "Cannot read property 'value' of undefined")
- Shows stack trace with file locations
- Often caused by referencing undefined variables or incorrect reactive dependencies

### WebGL Errors
Shader compilation or WebGL context errors
- Check browser console for GL warnings
- Often caused by GLSL syntax or missing extensions

## Observable Notebook Kit Fundamentals

### Notebook Structure

Notebooks use the `<notebook>` element with cells as `<script>` elements:

```html
<!doctype html>
<notebook theme="air">
  <title>Notebook Title</title>

  <!-- Markdown cell -->
  <script id="1" type="text/markdown">
    # Content
  </script>

  <!-- Plain JavaScript module cell -->
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

- `type="text/markdown"` - Markdown content (supports `${tex`...`}` for math)
- `type="module"` - Plain JavaScript (ES modules) with reactive data flow
- `type="application/vnd.observable.javascript"` - Observable-flavored JavaScript
- `type="text/html"` - HTML/CSS content

### Reactive Programming Model

Observable notebooks support two JavaScript cell types with different reactive behaviors:

#### Plain JavaScript Cells (`type="module"`)

**This is the recommended approach for complex notebooks.** Plain JavaScript cells use standard ES module syntax but with reactive data flow:

- **Cell-level scope**: Variables declared at the top level become available to other cells
- **Reactive dependencies**: When cell B references a variable from cell A, cell B automatically re-runs when that variable changes
- **Cell value**: The last expression in a cell becomes that cell's value, available to other cells via the cell's ID (with hyphens converted to underscores)
- **No block wrapping needed**: Unlike Observable JavaScript, plain JS cells don't need `{ return value; }` blocks

**Example - Input controls:**
```javascript
// Cell: my-input
const inputElement = view(Inputs.toggle({label: "Enable", value: true}));
display(inputElement);
inputElement;  // Export as cell value
```

Other cells can reference `my_input` (note underscore) and will re-run when the input changes.

**Example - Setup + animation pattern:**
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

canvas;  // Export canvas as cell value
```

When `my_input` changes, only the `animation-loop` cell re-runs (not `webgl-setup`), allowing state to persist while reactively responding to input changes.

#### Observable JavaScript Cells (`type="application/vnd.observable.javascript"`)

- Single expression per cell with implicit reactivity
- Use `viewof` syntax for inputs: `viewof x = Inputs.range([0, 100])`
- More concise but less flexible than plain JavaScript

## Critical Patterns and Best Practices

### 1. Avoiding Reactive Flickering

**Problem**: Sliders or inputs cause visualizations to flicker or reset when adjusted.

**Solution**: Use mutable params objects to avoid unwanted reactive dependencies:

```javascript
// Cell: params (mutable object)
const params = {
  width: 10,
  strength: 2.0,
  frequency: 0.1
};

// Cell: controls (separate cell)
const widthControl = view(Inputs.range([1, 40], {label: "Width", step: 1, value: 10}));
const strengthControl = view(Inputs.range([0.1, 5.0], {label: "Strength", step: 0.1, value: 2.0}));

// Cell: update-params (reads controls and mutates params)
params.width = widthControl;
params.strength = strengthControl;

// Cell: animation (depends on params object, not individual controls)
function render() {
  // Access params.width, params.strength directly
  // This cell won't re-run when controls change, avoiding reset
}
```

This pattern ensures the visualization cell doesn't have reactive dependencies on the individual control values, preventing restarts on every slider change.

### 2. Performance with Intersection Observer

**Problem**: Animations run even when scrolled off-screen, wasting resources.

**Solution**: Use Intersection Observer to pause/resume animations:

```javascript
let isVisible = false;
let animationId;

function render() {
  if (!isVisible) return;

  // ... animation code ...

  animationId = requestAnimationFrame(render);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    isVisible = entry.isIntersecting;
    if (isVisible) {
      if (!animationId) {
        render();  // Start animation
      }
    } else {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;  // Important: set to null so it can restart
      }
    }
  });
});

observer.observe(canvas);
invalidation.then(() => observer.disconnect());
```

**Key detail**: Setting `animationId = null` when stopping allows the animation to properly restart when the element becomes visible again.

### 3. WebGL Uniform Management

**Problem**: Updating uniforms requires complex reactive dependencies or cell restarts.

**Solution**: Use a uniforms object that can be mutated without restarting the WebGL setup:

```javascript
// Cell: webgl-setup
const canvas = html`<canvas width="512" height="512"></canvas>`;
const gl = canvas.getContext("webgl2");

// ... compile shaders, create programs ...

const uniforms = {
  contrast: 1.0,
  showDebug: 0.0,
  parameter: 12.0
};

const webgl_setup = { canvas, gl, program, uniforms };

// Cell: update-uniforms (separate cell with reactive dependencies)
webgl_setup.uniforms.contrast = Math.max(100**contrast, 0.1);
webgl_setup.uniforms.showDebug = showDebug ? 1.0 : 0.0;
webgl_setup.uniforms.parameter = parameter;

// Cell: render-loop
const { gl, program, uniforms } = webgl_setup;

function render() {
  gl.useProgram(program);
  gl.uniform1f(gl.getUniformLocation(program, 'u_contrast'), uniforms.contrast);
  gl.uniform1f(gl.getUniformLocation(program, 'u_showDebug'), uniforms.showDebug);
  // ... render ...
}
```

This separates reactive control updates from the WebGL setup and render loop.

### 4. Mouse/Pointer Event Handling

**Problem**: Getting only one pointer event per animation frame limits interactivity.

**Solution**: Queue pointer events and process them all in the render loop:

```javascript
// Cell: setup
const canvas = html`<canvas></canvas>`;
const pointerQueue = [];
const mouseState = {
  x: -1000,
  y: -1000,
  lastMoveTime: -10000,  // Initialize to far past
  isActive: false
};

canvas.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * width / rect.width;
  const y = (e.clientY - rect.top) * height / rect.height;
  pointerQueue.push({ x, y, time: performance.now() });
});

// Cell: render-loop
function render() {
  // Process all queued events
  while (pointerQueue.length > 0) {
    const event = pointerQueue.shift();
    mouseState.x = event.x;
    mouseState.y = event.y;
    mouseState.lastMoveTime = event.time;
  }

  // Check if mouse is active
  const timeSinceMove = performance.now() - mouseState.lastMoveTime;
  mouseState.isActive = timeSinceMove < 2000;

  // Use mouseState in rendering...
}
```

Initialize `lastMoveTime` to a negative value to ensure proper initial state.

### 5. LaTeX in Markdown Cells

**Use Observable's tex syntax, not standard markdown:**

```markdown
Inline: The mass is ${tex`m`} and length is ${tex`l = 1.5`}.

Display equation:
${tex.block`\frac{d^2\theta}{dt^2} + \frac{g}{l}\sin\theta = 0`}

Aligned equations:
${tex.block`\begin{aligned}
x &= l \sin \theta \\
y &= -l \cos \theta
\end{aligned}`}
```

**Important**: Do NOT use `$$...$$` or `$...$` syntax.

### 6. Common Gotchas

**Mutable vs Observable JavaScript confusion:**
- `mutable` keyword does NOT exist in plain JavaScript cells (`type="module"`)
- Use mutable objects (regular JavaScript objects) instead
- `mutable` is only for Observable JavaScript cells (`type="application/vnd.observable.javascript"`)

**Reactive dependency errors:**
- If a cell seems to run too often, check what variables it references
- Use the params object pattern to control dependencies
- Remember: accessing a top-level variable creates a reactive dependency

**Invalidation cleanup:**
- Always cancel animations/timers in `invalidation.then()`
- This runs when a cell is about to re-run or when the notebook is closed
- Critical for preventing memory leaks and duplicate animations

## Quick Reference: Common Scenarios

### Adding Interactive Controls Without Flickering

```javascript
// 1. Create params object
const params = { value1: 10, value2: 2.0 };

// 2. Create controls (separate cell)
const control1 = view(Inputs.range([1, 40], {label: "Value 1", value: 10}));
const control2 = view(Inputs.range([0.1, 5.0], {label: "Value 2", value: 2.0}));

// 3. Update params (separate cell)
params.value1 = control1;
params.value2 = control2;

// 4. Use params in animation (no reactive dependency on controls)
function render() {
  // Use params.value1, params.value2
}
```

### WebGL Animation with Controls

```javascript
// Setup cell
const canvas = html`<canvas width="512" height="512"></canvas>`;
const gl = canvas.getContext("webgl2");
// ... compile shaders ...

const uniforms = { param: 1.0 };
({ canvas, gl, program, uniforms });

// Update uniforms cell
webgl_setup.uniforms.param = paramControl;

// Render cell
let animationId, isVisible = false;

function render() {
  if (!isVisible) return;

  const { gl, program, uniforms } = webgl_setup;

  gl.useProgram(program);
  gl.uniform1f(gl.getUniformLocation(program, 'u_param'), uniforms.param);
  // ... render ...

  animationId = requestAnimationFrame(render);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    isVisible = entry.isIntersecting;
    if (isVisible && !animationId) render();
    else if (!isVisible && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
});

observer.observe(webgl_setup.canvas);
invalidation.then(() => observer.disconnect());
```

### Mouse Interaction with Timeout

```javascript
// Setup
const pointerQueue = [];
const mouseState = {
  x: -1000, y: -1000,
  lastMoveTime: -10000,
  isMoving: false,
  isActive: false
};

canvas.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  pointerQueue.push({
    x: (e.clientX - rect.left) * width / rect.width,
    y: (e.clientY - rect.top) * height / rect.height,
    time: performance.now()
  });
});

canvas.addEventListener('pointerleave', () => {
  mouseState.lastMoveTime = -10000;  // Reset for immediate state change
});

// In render loop
while (pointerQueue.length > 0) {
  const event = pointerQueue.shift();
  mouseState.x = event.x;
  mouseState.y = event.y;
  mouseState.lastMoveTime = event.time;
}

const timeSinceMove = performance.now() - mouseState.lastMoveTime;
mouseState.isMoving = timeSinceMove < 100;   // Active movement
mouseState.isActive = timeSinceMove < 2000;  // Recent activity
```

## Debugging Best Practices

1. **Run the script immediately** when the user reports an error - don't guess at the problem
2. **Check line numbers carefully** - they correspond to the generated JavaScript, which may differ slightly from your source
3. **Use for verification** after making significant changes to confirm the notebook loads successfully
4. **Remember**: The dev server must be running on port 5173 for this skill to work
5. **Check for common errors**: Missing `invalidation` cleanup, incorrect cell types, reactive dependency issues

## Development Workflow

1. **Start dev server**: `npm start` (runs on http://localhost:5173)
2. **Edit notebooks**: Modify `src/<notebook-name>/index.html`
3. **Debug errors**: Run `scripts/inspect.sh` when errors occur
4. **Check browser**: Open http://localhost:5173/notebooks/<notebook-name>/ to see live preview
5. **Build for deployment**: `npm run build` (outputs to `docs/` for GitHub Pages)
