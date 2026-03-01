// Make tall code blocks collapsible with a "Show more" toggle
export function collapseCodeBlocks({
  maxHeight = 150,
  selector = 'main pre',
  skip = [],        // cell IDs to skip (never collapse)
  include = [],     // cell IDs to always collapse (even if short)
  overrides = {}    // per-cell maxHeight overrides, e.g. { 'cell-5': 200 }
} = {}) {
  const run = () => {
    const blocks = document.querySelectorAll(selector);
    if (blocks.length === 0) return false;
    processBlocks(blocks, { maxHeight, skip, include, overrides });
    return true;
  };

  if (!run()) {
    const observer = new MutationObserver(() => {
      if (run()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function processBlocks(blocks, { maxHeight, skip, include, overrides }) {
  for (const code of blocks) {
    if (code.dataset.collapsed) continue;

    // Find cell ID from parent
    const cell = code.closest('[id^="cell-"]');
    const cellId = cell?.id;

    // Skip if in skip list
    if (cellId && skip.includes(cellId)) continue;

    // Get effective maxHeight for this cell
    const effectiveMaxHeight = (cellId && overrides[cellId]) ?? maxHeight;

    // Skip if too short (unless in include list)
    const forceInclude = cellId && include.includes(cellId);
    if (!forceInclude && code.scrollHeight <= effectiveMaxHeight) continue;

    if (code.textContent.trimStart().startsWith('// @expanded')) continue;

    code.dataset.collapsed = 'true';
    code.style.maxHeight = `${effectiveMaxHeight}px`;
    code.style.overflow = 'hidden';
    code.style.position = 'relative';

    const fade = document.createElement('div');
    fade.style.cssText = `
      position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
      background: linear-gradient(transparent, var(--theme-background-alt, #f5f5f5) 60%);
      display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px;
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Expand';
    btn.style.cssText = `
      padding: 4px 16px;
      background: var(--theme-background-alt, #f5f5f5);
      border: 1px solid #ccc; border-radius: 3px;
      cursor: pointer; font-size: 12px; color: #666;
      user-select: none;
    `;
    const gradient = 'linear-gradient(transparent, var(--theme-background-alt, #f5f5f5) 60%)';
    btn.onclick = () => {
      const isCollapsed = code.style.maxHeight !== 'none';
      code.style.maxHeight = isCollapsed ? 'none' : `${effectiveMaxHeight}px`;
      code.style.overflow = isCollapsed ? '' : 'hidden';
      fade.style.background = isCollapsed ? 'none' : gradient;
      fade.style.position = isCollapsed ? 'static' : 'absolute';
      fade.style.height = isCollapsed ? 'auto' : '60px';
      fade.style.paddingBottom = isCollapsed ? '0' : '8px';
      btn.textContent = isCollapsed ? 'Collapse' : 'Expand';
    };
    fade.appendChild(btn);
    code.appendChild(fade);
  }
}
