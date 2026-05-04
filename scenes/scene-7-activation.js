// scene-7-activation.js — §6.7 Activation panel.

import { CHANNELS, ACTIVATION_FOOTER } from '../data.js';

export function renderScene7(host, ctx) {
  host.innerHTML = `
    <div class="scene scene--activation">
      <div class="panel" style="max-width:920px; margin:0 auto;">
        <div class="panel__chrome">GenStudio · Channel Activation</div>
        <div class="activation__rows">
          <div class="activation__row is-header">
            <span>Channel</span>
            <span class="count" style="text-align:right;">Variants pushed</span>
            <span>Status</span>
          </div>
          ${CHANNELS.map((c, i) => channelRow(c, i)).join('')}
          <div class="activation__row is-total" id="row-total">
            <span>${escapeHtml(ACTIVATION_FOOTER.totalLabel)}</span>
            <span class="count">${escapeHtml(ACTIVATION_FOOTER.total)}</span>
            <span class="status"><span class="dot"></span>${escapeHtml(ACTIVATION_FOOTER.totalStatus)}</span>
          </div>
        </div>
        <div class="activation__footer">
          <div>
            <div class="meta-label">Brief filed</div>
            <div class="meta-value">${escapeHtml(ACTIVATION_FOOTER.filed)}</div>
          </div>
          <div>
            <div class="meta-label">Live across</div>
            <div class="meta-value">${escapeHtml(ACTIVATION_FOOTER.liveAcross)}</div>
          </div>
          <div>
            <div class="meta-label">Elapsed</div>
            <div class="meta-value gold" id="elapsed">${escapeHtml(ACTIVATION_FOOTER.elapsed)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Light up channels in sequence
  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });
  const rows = host.querySelectorAll('.activation__row[data-i]');
  rows.forEach((r, i) => {
    setTimeout(() => {
      if (cleanup) return;
      r.classList.add('is-live');
    }, 400 + i * 700);
  });

  // Anchor cue h on the elapsed-time line (the closer)
  setTimeout(() => {
    if (cleanup) return;
    const elapsed = host.querySelector('#elapsed');
    if (elapsed) ctx.onCueAnchor('h', elapsed);
  }, 400 + rows.length * 700 + 200);
}

function channelRow(c, i) {
  const isScheduled = c.status === 'scheduled';
  return `
    <div class="activation__row ${isScheduled ? 'scheduled' : ''}" data-i="${i}">
      <span>${escapeHtml(c.name)}</span>
      <span class="count">${c.count}</span>
      <span class="status">
        <span class="dot"></span>
        ${escapeHtml(c.status)}${isScheduled ? '  ' + escapeHtml(c.when) : ''}
      </span>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

