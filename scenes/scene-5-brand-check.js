// scene-5-brand-check.js — §6.5 Brand Check + C2PA. P10: GenStudio Brand Check surface.

import { BRAND_CHECK, MARKETS, SURFACES, ADOBE_LOGO_SVG, PRODUCT_CHROME } from '../data.js';
import { buildBrandCheckTile } from '../tiles.js';

export function renderScene5(host, ctx) {
  const ch = PRODUCT_CHROME.brandcheck;
  host.innerHTML = `
    <div class="scene scene--brandcheck">
      <div class="adobe-surface" style="max-width:1100px; margin:0 auto;">
        ${appbarHTML(ch)}
        <div class="surface__workspace" style="grid-template-columns:200px 1fr;">
          ${navHTML(ch)}
          <div class="surface__main">
            <div class="surface__subnav">
              <span class="surface__crumb">Halcyon</span>
              <span class="surface__crumb-sep">/</span>
              <span class="surface__crumb">Brand Check</span>
              <span class="surface__crumb-sep">/</span>
              <span class="surface__crumb-current">Spring ’26 — Quiet Strength · 188 variants</span>
              <span class="surface__subnav-spacer"></span>
              <span class="surface__subnav-action">Export report ⤓</span>
            </div>
            <div class="bc-stats">
              <div class="ff-stat">
                <div class="ff-stat__label">Threshold</div>
                <div class="ff-stat__value">${escapeHtml(BRAND_CHECK.threshold)}</div>
                <div class="ff-stat__sub">apparel-black · per line</div>
              </div>
              <div class="ff-stat">
                <div class="ff-stat__label">Passing</div>
                <div class="ff-stat__value" style="color:var(--spec-green)">${escapeHtml(BRAND_CHECK.passing)}</div>
                <div class="ff-stat__sub">98.9% pass rate</div>
              </div>
              <div class="ff-stat">
                <div class="ff-stat__label">Avg score</div>
                <div class="ff-stat__value">${escapeHtml(BRAND_CHECK.avg)}</div>
                <div class="ff-stat__sub">+0.18 vs manual baseline</div>
              </div>
              <div class="ff-stat">
                <div class="ff-stat__label">Review queue</div>
                <div class="ff-stat__value" style="color:var(--spec-amber)">2</div>
                <div class="ff-stat__sub">routed to brand team</div>
              </div>
            </div>
            <div class="bc-grid" id="bc-grid"></div>
            <div class="bc-c2pa">
              <div class="bc-c2pa__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2L3 6v6c0 5 3.7 9.7 9 11 5.3-1.3 9-6 9-11V6l-9-4z"/>
                  <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="bc-c2pa__text">
                <div class="bc-c2pa__title">Content Credentials  ·  C2PA verified</div>
                <div class="bc-c2pa__sub">${escapeHtml(BRAND_CHECK.c2paLine1)}</div>
                <div class="bc-c2pa__manifest">${escapeHtml(BRAND_CHECK.c2paLine2)}</div>
              </div>
              <div class="bc-c2pa__action">View manifest →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const grid = host.querySelector('#bc-grid');
  const flagged = new Set(BRAND_CHECK.flagged.map(([r, c]) => `${r}-${c}`));
  const tiles = [];
  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });

  BRAND_CHECK.rows.forEach((row, ri) => {
    row.forEach((score, ci) => {
      const market = MARKETS[(ri * 8 + ci) % MARKETS.length];
      const surface = SURFACES[ci % SURFACES.length];
      const isFlagged = flagged.has(`${ri}-${ci}`);
      const tile = buildBrandCheckTile({ market, surface, score, flagged: isFlagged });
      tile.dataset.r = ri;
      tile.dataset.c = ci;
      tile.style.opacity = '0';
      tile.style.transform = 'translateY(4px)';
      tile.style.transition = 'opacity 350ms cubic-bezier(0.22,0.61,0.36,1), transform 350ms cubic-bezier(0.22,0.61,0.36,1)';
      grid.appendChild(tile);
      tiles.push(tile);
    });
  });

  tiles.forEach((t, i) => {
    setTimeout(() => {
      if (cleanup) return;
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    }, 200 + i * 100);
  });

  setTimeout(() => {
    if (cleanup) return;
    const flag = grid.querySelector('.bc-tile.is-flagged');
    if (flag) ctx.onCueAnchor('g', flag);
  }, 200 + tiles.length * 100 + 200);

  const onC2PA = () => {
    grid.querySelectorAll('.bc-tile:not(.is-flagged)').forEach((t, i) => {
      setTimeout(() => { if (!cleanup) t.classList.add('has-c2pa'); }, i * 35);
    });
  };
  document.addEventListener('halcyon:c2pa-stamp', onC2PA);
  ctx.addCleanup(() => document.removeEventListener('halcyon:c2pa-stamp', onC2PA));

  if (!ctx.isNarrate()) {
    setTimeout(() => { if (!cleanup) onC2PA(); }, 200 + tiles.length * 100 + 1500);
  }
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

function navHTML(ch) {
  return `
    <nav class="surface__nav">
      ${ch.nav.map(n => `<div class="surface__nav-item ${n === ch.activeNav ? 'is-active' : ''}">${escapeHtml(n)}</div>`).join('')}
    </nav>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
