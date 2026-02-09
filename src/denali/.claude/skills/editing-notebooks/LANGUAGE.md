Be concise and straightforward in narrative sections. Use cells of type="text/markdown" for both markdown and equation content.

Adhere to the following guidelines:

- Include inline and block equations as part of a sentence. Do not introduce them with a colon.
- Break markdown with multiple paragraphs into multiple cells.

**Important**: Do NOT use `$$...$$` or `$...$` to render equations.

Instead, for inline equations, use

```md
Inline equation ${tex`y=x`}
```

For block equations use

```md
Block equation ${tex.block`y=x`}
```
