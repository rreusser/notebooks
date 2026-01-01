---
name: observable-notebook-expert
description: Debug Observable notebooks by fetching and inspecting localhost development server pages. Use when working with Observable notebooks that have errors or when you need to verify the current state of a notebook in the browser.
---

# Observable Notebook Expert

This skill helps debug Observable notebooks by fetching pages from the local development server (localhost:5173) and extracting error information or verifying successful rendering.

## When to Use This Skill

Use this skill when:
- An Observable notebook has compilation or runtime errors
- You need to verify that changes to a notebook are rendering correctly
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

## Best Practices

1. **Run the script immediately** when the user reports an error - don't guess at the problem
2. **Check line numbers carefully** - they correspond to the generated JavaScript, which may differ slightly from your source
3. **Use for verification** after making significant changes to confirm the notebook loads successfully
4. **Remember**: The dev server must be running on port 5173 for this skill to work
