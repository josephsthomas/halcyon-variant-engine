// scene-1-brief.js — §6.1 Brief Intake. Form auto-fills field-by-field.

import { BRIEF_FORM } from '../data.js';
import { attachMarker } from '../cues.js';

export function renderScene1(host, ctx) {
  host.innerHTML = `
    <div class="scene scene--brief">
      <div class="panel" style="max-width:780px; margin:0 auto;">
        <div class="panel__chrome">${escapeHtml(BRIEF_FORM.title)}</div>
        <div class="panel__body">
          <form class="brief-form" id="brief-form" onsubmit="return false">
            ${BRIEF_FORM.fields.map((f, i) => `
              <div class="field">
                <div class="field__label">${escapeHtml(f.label)}</div>
                <div class="field__value ${f.mono ? 'mono' : ''}" data-field="${i}"
                     data-target="${escapeHtml(f.value)}"></div>
              </div>
            `).join('')}
            <div class="field">
              <div class="field__label">${escapeHtml(BRIEF_FORM.marketsLabel)}</div>
              <div class="field__value">
                <div class="pills" id="markets-pills">
                  ${BRIEF_FORM.markets.map(m => `<span class="pill" data-pill="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join('')}
                </div>
              </div>
            </div>
            <div class="field">
              <div class="field__label">${escapeHtml(BRIEF_FORM.surfacesLabel)}</div>
              <div class="field__value">
                <div class="surfaces-grid" id="surfaces-grid">
                  ${BRIEF_FORM.surfaces.map((s, i) => `
                    <div class="surface-row" data-surface="${i}">
                      <span class="check">☑</span><span>${escapeHtml(s)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
            <div class="field" id="estimate-field" style="opacity:0; transition:opacity 350ms ease;">
              <div class="field__label">${escapeHtml(BRIEF_FORM.estimateLabel)}</div>
              <div class="field__value">
                <div class="estimate-line">
                  <span class="estimate-num" id="estimate-num">0</span>
                  <span class="estimate-note">${escapeHtml(BRIEF_FORM.estimateNote)}</span>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-secondary" type="button">${escapeHtml(BRIEF_FORM.cancel)}</button>
              <button class="btn-primary" type="button" id="brief-submit">${escapeHtml(BRIEF_FORM.submit)}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Sequenced auto-fill — fields, then markets, then surfaces, then estimate.
  const fields = host.querySelectorAll('.field__value[data-field]');
  let baseDelay = 350;
  const fieldDelay = 850;
  const charPerSec = 30;

  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });

  fields.forEach((el, i) => {
    setTimeout(() => {
      if (cleanup) return;
      typeIntoField(el, el.dataset.target, charPerSec);
    }, baseDelay + i * fieldDelay);
  });

  const afterFields = baseDelay + fields.length * fieldDelay;
  // Markets pills appear stagger
  setTimeout(() => {
    if (cleanup) return;
    const pills = host.querySelectorAll('#markets-pills .pill');
    pills.forEach((p, i) => setTimeout(() => p.classList.add('is-visible'), i * 90));
  }, afterFields);

  const afterMarkets = afterFields + 700;
  setTimeout(() => {
    if (cleanup) return;
    const surfaces = host.querySelectorAll('#surfaces-grid .surface-row');
    surfaces.forEach((s, i) => setTimeout(() => s.classList.add('is-visible'), i * 60));
  }, afterMarkets);

  const afterSurfaces = afterMarkets + 700;
  setTimeout(() => {
    if (cleanup) return;
    const estField = host.querySelector('#estimate-field');
    estField.style.opacity = '1';
    tweenCounter(host.querySelector('#estimate-num'), 0, parseInt(BRIEF_FORM.estimateValue, 10), 700);

    // Anchor cue d AFTER the estimate is visible (§coupled-trap fix)
    setTimeout(() => {
      if (cleanup) return;
      const estLine = host.querySelector('.estimate-line');
      if (estLine) ctx.onCueAnchor('d', estLine);
    }, 800);
  }, afterSurfaces);

  // Pulse the submit button at end of narrate-mode (§11.2 11s)
  setTimeout(() => {
    if (cleanup) return;
    const submit = host.querySelector('#brief-submit');
    if (submit) submit.classList.add('is-pulsing');
  }, afterSurfaces + 1800);
}

function typeIntoField(el, value, charsPerSec) {
  el.innerHTML = '<span class="text"></span><span class="caret"></span>';
  const text = el.querySelector('.text');
  const total = value.length;
  const intervalMs = Math.max(15, Math.round(1000 / charsPerSec));
  let i = 0;
  const id = setInterval(() => {
    i++;
    text.textContent = value.slice(0, i);
    if (i >= total) {
      clearInterval(id);
      el.classList.add('is-done');
    }
  }, intervalMs);
}

function tweenCounter(el, from, to, duration) {
  const start = performance.now();
  function frame(t) {
    const elapsed = t - start;
    const p = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const v = Math.round(from + (to - from) * eased);
    el.textContent = String(v);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

