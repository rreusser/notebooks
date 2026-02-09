### Notebook Structure

Notebooks use a `<notebook>` element with cells as `<script>` elements:

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
  </script>
</notebook>
```

### Cell Types

- `type="text/markdown"` - Markdown content (supports `${tex`...`}` for math)
- `type="module"` - Plain JavaScript (ES modules) with reactive data flow
- `type="application/vnd.observable.javascript"` - Observable-flavored JavaScript. AVOID WHEN POSSIBLE.
- `type="text/html"` - HTML/CSS content

### Reactive Programming Model with `type="module"` cells

Plain JavaScript cells use standard ES module syntax but with reactive data flow:

- **Cell-level scope**: Variables declared at the top level become available to other cells
- **Reactive dependencies**: When cell B references a variable from cell A, cell B automatically re-runs when that variable changes
- **Cell value**: The last expression in a cell becomes that cell's value, available to other cells via the cell's ID (with hyphens converted to underscores)
- **No block wrapping needed**: Unlike Observable JavaScript, plain JS cells don't need `{ return value; }` blocks

#### `display` helper

```javascript
const hello = display('hello!');
```

The `display` helper renders content on the page while passing the value through.

#### `view` helper

The `view` helper makes its argument visible on the page while passing the `.value` property of its argument through for assignment.

Example:

```javascript
const inputElement = view(Inputs.toggle({label: "Enable", value: true}));
```

### 6. Common Gotchas

**Mutable vs Observable JavaScript confusion:**
- The following keywords do NOT exist in JavaScript type="module" cells: `mutable`, `viewof`

**Invalidation cleanup:**
- Always cancel animations/timers in `invalidation.then()`
- This runs when a cell is about to re-run or when the notebook is closed
- Critical for preventing memory leaks and duplicate animations

**Avoid variable duplication**
Cell id="3" is invalid because it references a variable defined at cell scope in more than one cell:
```html
<script id="1" type="module">
  // Valid - x is defined at cell scope
  const x = 5;
</script>
<script id="2" type="module">
  // Valid - x is defined at cell scope
  const x = 7;
</script>
<script id="3" type="module">
  // INVALID - ambiguous which x is referenced
  const y = x;
</script>
```
