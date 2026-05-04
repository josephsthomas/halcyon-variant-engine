// scene-5-brand-check.js — §6.5 Brand Check grid + C2PA stamp.

import { BRAND_CHECK, MARKETS, SURFACES } from '../data.js';
import { buildBrandCheckTile } from '../tiles.js';

export function renderScene5(host, ctx) {
  host.innerHTML = `
    <div class="scene scene--brandcheck">
      <div class="panel" style="max-width:920px; margin:0 auto;">
        <div class="panel__chrome">GenStudio · Brand Check</div>
        <div class="brandcheck__header">
          <div class="stat">
            <div class="stat__label">Threshold</div>
            <div class="stat__value">${escapeHtml(BRAND_CHECK.threshold)}</div>
          </div>
          <div class="stat">
            <div class="stat__label">Passing</div>
            <div class="stat__value">${escapeHtml(BRAND_CHECK.passing)}</div>
          </div>
          <div class="stat">
            <div class="stat__label">Avg score</div>
            <div class="stat__value">${escapeHtml(BRAND_CHECK.avg)}</div>
          </div>
        </div>
        <div class="brandcheck__grid" id="bc-grid"></div>
        <div class="brandcheck__legend">
          <span class="review-key">⚐ = REVIEW QUEUE</span>
        </div>
        <div class="brandcheck__provenance">
          <div class="label">Provenance</div>
          <div class="l1">${escapeHtml(BRAND_CHECK.c2paLine1)}</div>
          <div class="l2">${escapeHtml(BRAND_CHECK.c2paLine2)}</div>
        </div>
      </div>
    </div>
  `;

  const grid = host.querySelector('#bc-grid');
  // Build 16 tiles using the exact 16 scores from §12.7
  // Round-robin markets / surfaces just to give them rendered diversity (silhouette only at this scale)
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

  // Stagger reveal
  tiles.forEach((t, i) => {
    setTimeout(() => {
      if (cleanup) return;
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    }, 200 + i * 100);
  });

  // Anchor cue g to the first flagged tile after grid is mostly populated (~7s narrate marker)
  setTimeout(() => {
    if (cleanup) return;
    const flag = grid.querySelector('.bc-tile.is-flagged');
    if (flag) ctx.onCueAnchor('g', flag);
  }, 200 + tiles.length * 100 + 200);

  // C2PA stamp event — listen for the narrate sequencer's signal
  const onC2PA = () => {
    grid.querySelectorAll('.bc-tile:not(.is-flagged)').forEach((t, i) => {
      setTimeout(() => { if (!cleanup) t.classList.add('has-c2pa'); }, i * 35);
    });
  };
  document.addEventListener('halcyon:c2pa-stamp', onC2PA);
  ctx.addCleanup(() => document.removeEventListener('halcyon:c2pa-stamp', onC2PA));

  // In explore mode, auto-stamp after the grid populates
  if (!ctx.isNarrate()) {
    setTimeout(() => { if (!cleanup) onC2PA(); }, 200 + tiles.length * 100 + 1500);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

