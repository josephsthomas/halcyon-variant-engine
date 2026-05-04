// scene-7-activation.js — §6.7 Activation. P10: GenStudio Activation surface.

import { CHANNELS, ACTIVATION_FOOTER, ADOBE_LOGO_SVG, PRODUCT_CHROME } from '../data.js';

const CHANNEL_GLYPHS = {
  Meta:        { mark: 'M', color: '#0866FF' },
  Google:      { mark: 'G', color: '#4285F4' },
  Amazon:      { mark: 'a', color: '#FF9900' },
  Pinterest:   { mark: 'P', color: '#E60023' },
  TikTok:      { mark: 'T', color: '#000000' },
  'Retail OOH':{ mark: 'R', color: '#1F3A34' },
  'In-store':  { mark: 'i', color: '#5C7A72' },
};

export function renderScene7(host, ctx) {
  const ch = PRODUCT_CHROME.activation;
  host.innerHTML = `
    <div class="scene scene--activation">
      <div class="adobe-surface" style="max-width:1100px; margin:0 auto;">
        ${appbarHTML(ch)}
        <div class="surface__workspace" style="grid-template-columns:200px 1fr;">
          ${navHTML(ch)}
          <div class="surface__main">
            <div class="surface__subnav">
              <span class="surface__crumb">Halcyon</span>
              <span class="surface__crumb-sep">/</span>
              <span class="surface__crumb">Activations</span>
              <span class="surface__crumb-sep">/</span>
              <span class="surface__crumb-current">Spring ’26 — Quiet Strength</span>
              <span class="surface__subnav-spacer"></span>
              <span class="surface__subnav-action" style="color:var(--spec-green)">●  Live</span>
            </div>
            <div class="act-channels">
              ${CHANNELS.map(channelCard).join('')}
            </div>
            <div class="act-summary">
              <div class="act-summary__total">
                <div class="ff-stat__label">Total pushed</div>
                <div class="act-summary__big counter-tween">${escapeHtml(ACTIVATION_FOOTER.total)}</div>
                <div class="ff-stat__sub">${escapeHtml(ACTIVATION_FOOTER.totalStatus)} across all channels</div>
              </div>
              <div class="act-summary__meta">
                <div class="act-summary__meta-row">
                  <div class="ff-stat__label">Brief filed</div>
                  <div class="act-summary__meta-val">${escapeHtml(ACTIVATION_FOOTER.filed)}</div>
                </div>
                <div class="act-summary__meta-row">
                  <div class="ff-stat__label">Live across</div>
                  <div class="act-summary__meta-val">${escapeHtml(ACTIVATION_FOOTER.liveAcross)}</div>
                </div>
                <div class="act-summary__meta-row" id="elapsed-row">
                  <div class="ff-stat__label">Elapsed</div>
                  <div class="act-summary__meta-val act-summary__meta-val--gold" id="elapsed">${escapeHtml(ACTIVATION_FOOTER.elapsed)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let cleanup = false;
  ctx.addCleanup(() => { cleanup = true; });
  const cards = host.querySelectorAll('.act-channel');
  cards.forEach((c, i) => {
    setTimeout(() => { if (!cleanup) c.classList.add('is-live'); }, 400 + i * 600);
  });

  setTimeout(() => {
    if (cleanup) return;
    const elapsed = host.querySelector('#elapsed-row');
    if (elapsed) ctx.onCueAnchor('h', elapsed);
  }, 400 + cards.length * 600 + 200);
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

function channelCard(c) {
  const g = CHANNEL_GLYPHS[c.name] || { mark: '?', color: '#888' };
  const isScheduled = c.status === 'scheduled';
  return `
    <div class="act-channel">
      <div class="act-channel__head">
        <span class="act-channel__glyph" style="background:${g.color}">${g.mark}</span>
        <div>
          <div class="act-channel__name">${escapeHtml(c.name)}</div>
          <div class="act-channel__sub">channel</div>
        </div>
        <span class="spec-pill spec-pill--${isScheduled ? 'scheduled' : 'live'} act-channel__pill"><span class="dot"></span>${isScheduled ? 'scheduled' : 'pushed'}</span>
      </div>
      <div class="act-channel__count">${c.count}</div>
      <div class="act-channel__meta">${isScheduled ? 'Scheduled · ' + escapeHtml(c.when) : 'variants live now'}</div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
