// scene-6-contact.js — §6.6 The Contact Sheet (the bloom).
// 4 rows × 8 columns. Markets US → UK → DE → JP, surfaces left-to-right.
// 32 tiles must fit on 1440px without scrolling (§9.6).

import { MARKETS, SURFACES } from '../data.js';
import { buildTile } from '../tiles.js';

export function renderScene6(host, ctx) {
  // Two of 188 are flagged; mirror Scene 5's positions: Row 2 col 2 + col 6 → mark JP-OOH and UK-IG-1:1
  // (Picked so the flag is visible in the grid; the "review" desaturated look anchors cue g visually.)
  const flaggedKeys = new Set(['JP|ooh', 'UK|ig-sq']);

  host.innerHTML = `
    <div class="scene scene--contact">
      <div class="contact" style="max-width:1280px; margin:0 auto;">
        <div class="contact__hero">
          <div id="hero-tile-host"></div>
          <div class="hero-meta">
            HERO<br/>assethub://halcyon/<br/>apparel/black/ss26/<br/>quiet-strength/<br/>hero-001.psd
          </div>
        </div>
        <div class="contact__board">
          <div class="contact__col-headers">
            <span></span>
            ${SURFACES.map(s => `<span class="col-h">${escapeAspect(s.aspectW, s.aspectH)}<br/>${escapeHtml(s.label)}</span>`).join('')}
          </div>
          <div class="contact__rows" id="contact-rows">
            ${MARKETS.map(m => `
              <div class="contact__row">
                <div class="contact__row-label">${escapeHtml(m)}</div>
                ${SURFACES.map(s => `<div class="tile-slot" data-key="${m}|${s.id}"></div>`).join('')}
              </div>
            `).join('')}
          </div>
          <div class="contact__counter"><span class="num counter-tween" id="contact-counter">0</span> / 188</div>
        </div>
      </div>
    </div>
  `;

  // Hero tile (master 2:3, US, large reference)
  const heroSlot = host.querySelector('#hero-tile-host');
  const heroSurface = { id: 'master', label: 'master', code: 'MASTER · 2:3', aspectW: 2, aspectH: 3, subjectLock: 'center' };
  const heroTile = buildTile({ market: 'US', surface: heroSurface, hero: true });
  heroSlot.appendChild(heroTile);
  requestAnimationFrame(() => heroTile.classList.add('is-visible'));

  // Stagger fill in market order, surfaces L→R per §6.6
  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });

  const order = [];
  MARKETS.forEach(m => SURFACES.forEach(s => order.push({ market: m, surface: s })));

  const tileGap = 120;
  let firstJPSlot = null;
  let firstDESlotWithDisclaimer = null;
  const flaggedSlots = [];

  order.forEach(({ market, surface }, idx) => {
    setTimeout(() => {
      if (cleanup) return;
      const key = `${market}|${surface.id}`;
      const slot = host.querySelector(`[data-key="${key}"]`);
      if (!slot) return;
      const flagged = flaggedKeys.has(key);
      const tile = buildTile({ market, surface, flagged });
      slot.appendChild(tile);
      requestAnimationFrame(() => tile.classList.add('is-visible'));
      if (market === 'JP' && !firstJPSlot) firstJPSlot = tile;
      if (market === 'DE' && !firstDESlotWithDisclaimer) firstDESlotWithDisclaimer = tile;
      if (flagged) flaggedSlots.push(tile);
    }, 200 + idx * tileGap);
  });

  // Counter tween — to 188
  const totalDur = 200 + order.length * tileGap;
  setTimeout(() => {
    if (cleanup) return;
    tweenCounter(host.querySelector('#contact-counter'), 0, 188, 18000);
  }, 200);

  // §6.6's local "f"/"g" labels conflict with the canonical 8-cue list in §10.4
  // (which assigns f→Scene 3 and g→Scene 5). We follow §10.4 — Scene 6 carries
  // no cue markers; the bloom itself is the proof.
}

function tweenCounter(el, from, to, duration) {
  if (!el) return;
  const start = performance.now();
  function frame(t) {
    const elapsed = t - start;
    const p = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(from + (to - from) * eased);
    el.textContent = String(v);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function escapeAspect(w, h) {
  return `${w}:${h}`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

