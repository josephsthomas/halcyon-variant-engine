// scene-1-brief.js — §6.1 GenStudio Brief Intake. Form auto-fills.
// P10: rendered as a real Adobe GenStudio surface (Spectrum design system).

import { BRIEF_FORM, ADOBE_LOGO_SVG, PRODUCT_CHROME } from '../data.js';

export function renderScene1(host, ctx) {
  const ch = PRODUCT_CHROME.genstudio;
  host.innerHTML = `
    <div class="scene scene--brief">
      <div class="adobe-surface" style="max-width:1100px; margin:0 auto;">
        ${appbarHTML(ch)}
        <div class="surface__workspace">
          ${navHTML(ch)}
          <div class="surface__main">
            ${subnavHTML(['Briefs', 'Spring ’26 — Quiet Strength'])}
            <div class="surface__title">New Campaign Brief</div>
            <div class="surface__subtitle">Submitted briefs go to the Halcyon Variant Engine.</div>
            <div class="surface__body">
              <form class="gs-form" id="brief-form" onsubmit="return false">
                ${BRIEF_FORM.fields.map((f, i) => `
                  <div class="gs-field">
                    <label class="gs-field__label">${escapeHtml(f.label)}</label>
                    <div class="gs-field__input ${f.mono ? 'gs-field__input--mono' : ''}" data-field="${i}"
                         data-target="${escapeHtml(f.value)}"></div>
                  </div>
                `).join('')}
                <div class="gs-field">
                  <label class="gs-field__label">${escapeHtml(BRIEF_FORM.marketsLabel)}</label>
                  <div class="gs-pills" id="markets-pills">
                    ${BRIEF_FORM.markets.map(m => `<span class="gs-pill" data-pill="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join('')}
                  </div>
                </div>
                <div class="gs-field">
                  <label class="gs-field__label">${escapeHtml(BRIEF_FORM.surfacesLabel)}</label>
                  <div class="gs-checks" id="surfaces-grid">
                    ${BRIEF_FORM.surfaces.map((s, i) => `
                      <div class="gs-check" data-surface="${i}">
                        <span class="gs-check__box"><span class="gs-check__mark">✓</span></span>
                        <span>${escapeHtml(s)}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                <div class="gs-field" id="estimate-field" style="opacity:0; transition:opacity 350ms ease;">
                  <label class="gs-field__label">${escapeHtml(BRIEF_FORM.estimateLabel)}</label>
                  <div class="gs-estimate">
                    <span class="gs-estimate__num" id="estimate-num">0</span>
                    <span class="gs-estimate__note">${escapeHtml(BRIEF_FORM.estimateNote)}</span>
                  </div>
                </div>
                <div class="gs-actions">
                  <button class="spec-btn" type="button">${escapeHtml(BRIEF_FORM.cancel)}</button>
                  <button class="spec-btn spec-btn--cta" type="button" id="brief-submit">${escapeHtml(BRIEF_FORM.submit)}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Auto-fill sequence (same as before)
  const fields = host.querySelectorAll('.gs-field__input[data-field]');
  let baseDelay = 350;
  const fieldDelay = 850;
  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });

  fields.forEach((el, i) => {
    setTimeout(() => { if (!cleanup) typeIntoField(el, el.dataset.target, 30); }, baseDelay + i * fieldDelay);
  });

  const afterFields = baseDelay + fields.length * fieldDelay;
  setTimeout(() => {
    if (cleanup) return;
    host.querySelectorAll('#markets-pills .gs-pill').forEach((p, i) => setTimeout(() => p.classList.add('is-visible'), i * 90));
  }, afterFields);

  const afterMarkets = afterFields + 700;
  setTimeout(() => {
    if (cleanup) return;
    host.querySelectorAll('#surfaces-grid .gs-check').forEach((s, i) => setTimeout(() => s.classList.add('is-visible'), i * 60));
  }, afterMarkets);

  const afterSurfaces = afterMarkets + 700;
  setTimeout(() => {
    if (cleanup) return;
    const estField = host.querySelector('#estimate-field');
    estField.style.opacity = '1';
    tweenCounter(host.querySelector('#estimate-num'), 0, parseInt(BRIEF_FORM.estimateValue, 10), 700);
    setTimeout(() => {
      if (cleanup) return;
      const estLine = host.querySelector('.gs-estimate');
      if (estLine) ctx.onCueAnchor('d', estLine);
    }, 800);
  }, afterSurfaces);

  setTimeout(() => {
    if (cleanup) return;
    const submit = host.querySelector('#brief-submit');
    if (submit) submit.classList.add('is-pulsing');
  }, afterSurfaces + 1800);
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

function subnavHTML(crumbs) {
  return `
    <div class="surface__subnav">
      ${crumbs.map((c, i) => i < crumbs.length - 1
        ? `<span class="surface__crumb">${escapeHtml(c)}</span><span class="surface__crumb-sep">/</span>`
        : `<span class="surface__crumb-current">${escapeHtml(c)}</span>`
      ).join('')}
      <span class="surface__subnav-spacer"></span>
      <span class="surface__subnav-action">View JSON  ⤓</span>
    </div>
  `;
}

function typeIntoField(el, value, charsPerSec) {
  el.innerHTML = '<span class="gs-text"></span><span class="gs-caret"></span>';
  const text = el.querySelector('.gs-text');
  const intervalMs = Math.max(15, Math.round(1000 / charsPerSec));
  let i = 0;
  const id = setInterval(() => {
    i++;
    text.textContent = value.slice(0, i);
    if (i >= value.length) { clearInterval(id); el.classList.add('is-done'); }
  }, intervalMs);
}

function tweenCounter(el, from, to, duration) {
  if (!el) return;
  const start = performance.now();
  function frame(t) {
    const p = Math.min(1, (t - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(from + (to - from) * eased));
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
