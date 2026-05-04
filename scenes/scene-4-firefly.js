// scene-4-firefly.js — §6.4 Firefly Generation. P10: Firefly Services console.

import { JOB_ROWS, FIREFLY_HEADER, ADOBE_LOGO_SVG, PRODUCT_CHROME } from '../data.js';

export function renderScene4(host, ctx) {
  const ch = PRODUCT_CHROME.firefly;
  host.innerHTML = `
    <div class="scene scene--firefly">
      <div class="adobe-surface" style="max-width:1100px; margin:0 auto;">
        ${appbarHTML(ch)}
        <div class="surface__workspace" style="grid-template-columns:200px 1fr;">
          ${navHTML(ch)}
          <div class="surface__main">
            <div class="surface__subnav">
              <span class="surface__crumb">halcyon-prod</span>
              <span class="surface__crumb-sep">/</span>
              <span class="surface__crumb">jobs</span>
              <span class="surface__crumb-sep">/</span>
              <span class="surface__crumb-current">batch · vrt-${Date.now().toString().slice(-6)}</span>
              <span class="surface__subnav-spacer"></span>
              <span class="surface__subnav-action">Open in API ↗</span>
            </div>
            <div class="ff-stats">
              <div class="ff-stat">
                <div class="ff-stat__label">Jobs</div>
                <div class="ff-stat__value counter-tween" id="jobs-count">0 / 188</div>
                <div class="ff-stat__sub">across all primitives</div>
              </div>
              <div class="ff-stat">
                <div class="ff-stat__label">Avg latency</div>
                <div class="ff-stat__value">${escapeHtml(FIREFLY_HEADER.latency)}</div>
                <div class="ff-stat__sub">p50 · last 60s</div>
              </div>
              <div class="ff-stat">
                <div class="ff-stat__label">Spend</div>
                <div class="ff-stat__value counter-tween" id="jobs-cost">$0</div>
                <div class="ff-stat__sub">credits · this batch</div>
              </div>
              <div class="ff-stat">
                <div class="ff-stat__label">Throughput</div>
                <div class="ff-stat__value">52  /min</div>
                <div class="ff-stat__sub">parallel jobs</div>
              </div>
            </div>
            <div class="ff-table">
              <div class="ff-table__head">
                <span>Status</span>
                <span>Job ID</span>
                <span>Surface</span>
                <span>Market</span>
                <span>Primitive</span>
                <span style="text-align:right">Started</span>
                <span></span>
              </div>
              <div class="ff-table__body" id="firefly-rows">
                ${JOB_ROWS.map(rowHTML).join('')}
              </div>
            </div>
            <div class="ff-legend">
              <span class="spec-pill spec-pill--running"><span class="dot"></span>running</span>
              <span class="spec-pill spec-pill--done"><span class="dot"></span>done</span>
              <span class="spec-pill spec-pill--queued"><span class="dot"></span>queued</span>
              <span style="margin-left:auto; font-family:var(--mono); font-size:11px; color:var(--spec-text-3)">POST /v3/firefly/services/jobs · halcyon.adobe.io</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });
  tweenInt(host.querySelector('#jobs-count'), 0, 188, 6000, v => `${v} / 188`);
  tweenInt(host.querySelector('#jobs-cost'),  0, 1180, 6000, v => `$${v.toLocaleString()}`);

  const rowEls = host.querySelectorAll('.ff-row');
  rowEls.forEach((row, i) => {
    const initialState = JOB_ROWS[i].end;
    setRowState(row, 'queued');
    if (initialState === 'done') {
      setTimeout(() => { if (!cleanup) setRowState(row, 'running'); }, 200 + i * 120);
      setTimeout(() => { if (!cleanup) setRowState(row, 'done'); },     900 + i * 120);
    } else if (initialState === 'running') {
      setTimeout(() => { if (!cleanup) setRowState(row, 'running'); }, 600 + i * 200);
    }
  });
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

function rowHTML(j) {
  const startedAgo = ['just now', '1s ago', '2s ago', '3s ago', '4s ago', '5s ago', '7s ago', '8s ago', '12s ago', 'queued', 'queued', 'queued', 'queued', 'queued', 'queued'];
  return `
    <div class="ff-row state--queued" data-id="${escapeHtml(j.id)}">
      <span class="ff-row__status">
        <span class="spec-pill spec-pill--queued"><span class="dot"></span>queued</span>
      </span>
      <span class="ff-row__id">${escapeHtml(j.id)}</span>
      <span class="ff-row__surface">${escapeHtml(j.surface)}</span>
      <span class="ff-row__market">${escapeHtml(j.market)}</span>
      <span class="ff-row__primitive">${escapeHtml(j.primitive)}</span>
      <span class="ff-row__started">${escapeHtml(startedAgo.shift() || '—')}</span>
      <span class="ff-row__action">⋯</span>
    </div>
  `;
}

function setRowState(row, state) {
  row.classList.remove('state--queued', 'state--running', 'state--done');
  row.classList.add(`state--${state}`);
  const statusCell = row.querySelector('.ff-row__status');
  statusCell.innerHTML = `<span class="spec-pill spec-pill--${state}"><span class="dot"></span>${state}</span>`;
}

function tweenInt(el, from, to, duration, fmt) {
  if (!el) return;
  const start = performance.now();
  function frame(t) {
    const p = Math.min(1, (t - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(from + (to - from) * eased));
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
