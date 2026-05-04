// scene-2-assethub.js — §6.2 AssetHub Lookup. P10: AEM Assets-style surface.

import { ASSETHUB, ADOBE_LOGO_SVG, PRODUCT_CHROME, UNSPLASH, unsplashURL } from '../data.js';

export function renderScene2(host, ctx) {
  const ch = PRODUCT_CHROME.assethub;
  const heroPhoto = unsplashURL(UNSPLASH.HERO, 800, 800);
  host.innerHTML = `
    <div class="scene scene--assethub">
      <div class="adobe-surface" style="max-width:1100px; margin:0 auto;">
        ${appbarHTML(ch)}
        <div class="aem-workspace">
          <nav class="aem-tree">
            <div class="aem-tree__title">FOLDERS</div>
            ${ASSETHUB.tree.map(treeRow).join('')}
          </nav>
          <div class="aem-grid">
            <div class="aem-grid__chrome">
              <span class="aem-crumb">halcyon</span>
              <span class="aem-crumb-sep">›</span>
              <span class="aem-crumb">apparel</span>
              <span class="aem-crumb-sep">›</span>
              <span class="aem-crumb">black</span>
              <span class="aem-crumb-sep">›</span>
              <span class="aem-crumb">ss26</span>
              <span class="aem-crumb-sep">›</span>
              <span class="aem-crumb-current">quiet-strength</span>
              <span style="flex:1"></span>
              <span class="aem-toolbar-btn">⊞</span>
              <span class="aem-toolbar-btn">≡</span>
              <span class="aem-toolbar-btn">↻</span>
            </div>
            <div class="aem-card aem-card--selected">
              <div class="aem-card__thumb" style="background-image:url('${heroPhoto}')"></div>
              <div class="aem-card__name">${escapeHtml(ASSETHUB.selectedTitle)}</div>
              <div class="aem-card__type">PSD · 2:3 · 24.6 MB</div>
            </div>
            <div class="aem-card aem-card--ghost"><div class="aem-card__thumb"></div><div class="aem-card__name">hero-002.psd</div><div class="aem-card__type">PSD · 2:3 · 18.2 MB</div></div>
            <div class="aem-card aem-card--ghost"><div class="aem-card__thumb"></div><div class="aem-card__name">brief-deck.indd</div><div class="aem-card__type">INDD · — · 8.4 MB</div></div>
            <div class="aem-card aem-card--ghost"><div class="aem-card__thumb"></div><div class="aem-card__name">specs.json</div><div class="aem-card__type">JSON · — · 2.1 KB</div></div>
          </div>
          <aside class="aem-meta">
            <div class="aem-meta__header">
              <div class="aem-meta__name">${escapeHtml(ASSETHUB.selectedTitle)}</div>
              <div class="aem-meta__path">apparel/black/ss26/quiet-strength</div>
            </div>
            <div class="aem-meta__rows">
              ${ASSETHUB.meta.map(metaRow).join('')}
            </div>
            <div class="aem-meta__footer">
              <button class="spec-btn spec-btn--cta" style="width:100%">Open in Editor</button>
              <button class="spec-btn" style="width:100%; margin-top:6px">Download</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;

  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });
  const rows = host.querySelectorAll('.aem-meta__row');
  rows.forEach((r, i) => {
    setTimeout(() => { if (!cleanup) r.classList.add('is-visible'); }, 600 + i * 280);
  });
  setTimeout(() => {
    if (cleanup) return;
    const highlightRow = host.querySelector('.aem-meta__row.highlight .v');
    if (highlightRow) ctx.onCueAnchor('e', highlightRow);
  }, 600 + rows.length * 280 + 200);
}

function appbarHTML(ch) {
  return `
    <div class="surface__appbar">
      ${ADOBE_LOGO_SVG}
      <span class="surface__appbar-product">${escapeHtml(ch.productName)}</span>
      <span class="surface__appbar-sub">${escapeHtml(ch.productSub)}</span>
      <span class="surface__appbar-spacer"></span>
      <span class="surface__appbar-workspace">${escapeHtml(ch.workspace)}</span>
      <span class="surface__appbar-user">${escapeHtml(ch.user)}</span>
    </div>
  `;
}

function treeRow(row) {
  if (row.file) {
    return `<div class="aem-tree__item ${row.selected ? 'is-selected' : ''}" style="padding-left:${12 + row.depth * 12}px">
      <span class="aem-tree__file">▸</span>${escapeHtml(row.label)}
    </div>`;
  }
  return `<div class="aem-tree__item aem-tree__item--folder" style="padding-left:${12 + row.depth * 12}px">
    <span class="aem-tree__chev">▾</span>${escapeHtml(row.label)}
  </div>`;
}

function metaRow(m) {
  return `
    <div class="aem-meta__row ${m.highlight ? 'highlight' : ''}">
      <div class="k">${escapeHtml(m.k)}</div>
      <div class="v">${m.highlight ? '<span class="aem-pulse"></span>' : ''}${escapeHtml(m.v)}</div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
