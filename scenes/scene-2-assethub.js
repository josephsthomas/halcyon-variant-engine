// scene-2-assethub.js — §6.2 AssetHub Lookup.

import { ASSETHUB } from '../data.js';

export function renderScene2(host, ctx) {
  host.innerHTML = `
    <div class="scene scene--assethub">
      <div class="panel" style="max-width:920px; margin:0 auto;">
        <div class="panel__chrome">${escapeHtml(ASSETHUB.title)}  ▾</div>
        <div class="assethub">
          <div class="assethub__tree">
            ${ASSETHUB.tree.map(row => treeRow(row)).join('')}
          </div>
          <div class="assethub__detail">
            <div class="panel-eyebrow">SELECTED</div>
            <div class="selected-name">${escapeHtml(ASSETHUB.selectedTitle)}</div>
            <div class="assethub__meta">
              ${ASSETHUB.meta.map((m, i) => metaRow(m, i)).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Stagger meta rows
  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });
  const rows = host.querySelectorAll('.assethub__meta-row');
  rows.forEach((r, i) => {
    setTimeout(() => {
      if (cleanup) return;
      r.classList.add('is-visible');
    }, 600 + i * 280);
  });

  // After last row appears, anchor cue e to the highlighted "Used by" row
  setTimeout(() => {
    if (cleanup) return;
    const highlightRow = host.querySelector('.assethub__meta-row.highlight .v');
    if (highlightRow) ctx.onCueAnchor('e', highlightRow);
  }, 600 + rows.length * 280 + 200);
}

function treeRow(row) {
  const indent = '  '.repeat(row.depth);
  const arrow = row.expand ? '▾' : (row.file ? '' : '▸');
  const fileMark = row.file ? '<span class="file-glyph"></span>' : '';
  return `
    <div class="assethub__row ${row.selected ? 'is-selected' : ''}">
      <span class="marker">${escapeHtml(indent)}${arrow}</span>
      ${fileMark}<span>${escapeHtml(row.label)}</span>
    </div>
  `;
}

function metaRow(m, i) {
  return `
    <div class="assethub__meta-row ${m.highlight ? 'highlight' : ''}">
      <div class="k">${escapeHtml(m.k)}</div>
      <div class="v">${m.highlight ? '<span class="pulse"></span>' : ''}${escapeHtml(m.v)}</div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

