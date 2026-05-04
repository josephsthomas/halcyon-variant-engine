// scene-4-firefly.js — §6.4 Firefly Generation. The volume scene.

import { JOB_ROWS, FIREFLY_HEADER } from '../data.js';

export function renderScene4(host, ctx) {
  host.innerHTML = `
    <div class="scene scene--firefly">
      <div class="panel" style="max-width:920px; margin:0 auto;">
        <div class="panel__chrome">Firefly Services · Job Queue · Variant Engine</div>
        <div class="firefly__header">
          <div class="stat">
            <div class="stat__label">Active jobs</div>
            <div class="stat__value counter-tween" id="jobs-count">0 / 188</div>
          </div>
          <div class="stat">
            <div class="stat__label">Avg latency</div>
            <div class="stat__value">${escapeHtml(FIREFLY_HEADER.latency)}</div>
          </div>
          <div class="stat">
            <div class="stat__label">Cost</div>
            <div class="stat__value counter-tween" id="jobs-cost">$0</div>
          </div>
        </div>
        <div class="firefly__rows" id="firefly-rows">
          ${JOB_ROWS.map(rowHTML).join('')}
        </div>
        <div class="firefly__legend">●  running     ✓  done     ○  queued</div>
      </div>
    </div>
  `;

  // Tween counters
  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });
  tweenInt(host.querySelector('#jobs-count'), 0, 188, 6000, v => `${v} / 188`);
  tweenInt(host.querySelector('#jobs-cost'),  0, 1180, 6000, v => `$${v.toLocaleString()}`);

  // Walk rows: queued → running → done at staggered offsets so the dashboard "lives".
  const rowEls = host.querySelectorAll('.firefly__row');
  rowEls.forEach((row, i) => {
    const initialState = JOB_ROWS[i].end;
    // Start everything as queued visually, then animate to its end-state.
    setRowState(row, 'queued');
    if (initialState === 'done') {
      // Earliest done first
      setTimeout(() => { if (!cleanup) setRowState(row, 'running'); }, 200 + i * 120);
      setTimeout(() => { if (!cleanup) setRowState(row, 'done'); },     900 + i * 120);
    } else if (initialState === 'running') {
      setTimeout(() => { if (!cleanup) setRowState(row, 'running'); }, 600 + i * 200);
    } // queued stays queued
  });

  // Per §11.2: Scene 4 in narrate mode shows NO cues (the volume is the message).
  // No cue anchors attached.
}

function rowHTML(j) {
  return `
    <div class="firefly__row state--queued" data-id="${escapeHtml(j.id)}">
      <span class="state-glyph">○</span>
      <span class="row-id">${escapeHtml(j.id)}</span>
      <span class="row-surface">${escapeHtml(j.surface)}</span>
      <span class="row-market">${escapeHtml(j.market)}</span>
      <span class="row-primitive">${escapeHtml(j.primitive)}</span>
      <span class="row-status">queued</span>
    </div>
  `;
}

function setRowState(row, state) {
  row.classList.remove('state--queued', 'state--running', 'state--done');
  row.classList.add(`state--${state}`);
  const glyph = row.querySelector('.state-glyph');
  const status = row.querySelector('.row-status');
  if (state === 'queued')   { glyph.textContent = '○'; status.textContent = 'queued'; }
  if (state === 'running')  { glyph.textContent = '●'; status.textContent = 'running'; }
  if (state === 'done')     { glyph.textContent = '✓'; status.textContent = 'done'; }
}

function tweenInt(el, from, to, duration, fmt) {
  if (!el) return;
  const start = performance.now();
  function frame(t) {
    const elapsed = t - start;
    const p = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(from + (to - from) * eased);
    el.textContent = fmt(v);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

