// tiles.js — variant tile generator using Unsplash photography.
// §9.2 wireframe constraint deliberately overridden per stakeholder direction:
// the contact-sheet bloom needs photographic credibility to land in the room.
//
// Each tile = real photo (Unsplash CDN) + locale-distinct typography overlay
// (headline, eyebrow, CTA, kana glyph for JP, legal disclaimer for DE).

import { LOCALES, SURFACES, UNSPLASH, unsplashURL } from './data.js';

// Pick a photo deterministically per (market, surface, hero) so re-renders are stable.
function pickPhoto(market, surface, hero) {
  if (hero) return UNSPLASH.HERO;
  const bank = UNSPLASH[market] || UNSPLASH.US;
  // Stable index from surface id
  let h = 0;
  for (let i = 0; i < surface.id.length; i++) h = (h * 31 + surface.id.charCodeAt(i)) >>> 0;
  return bank[h % bank.length];
}

// Build a single variant tile element. Returns HTMLElement.
export function buildTile({ market, surface, flagged, hero }) {
  const locale = LOCALES[market];
  const w = surface.aspectW;
  const h = surface.aspectH;
  const aspect = `${w} / ${h}`;

  // Choose photo + URL. Cap requested px so the CDN delivers small files.
  const photoId = pickPhoto(market, surface, hero);
  const reqW = hero ? 600 : 360;
  const reqH = Math.round(reqW * h / w);
  const photoURL = unsplashURL(photoId, reqW, reqH);

  const wrap = document.createElement('div');
  wrap.className = 'tile';
  wrap.dataset.market = market;
  wrap.dataset.surface = surface.id;
  if (flagged) wrap.classList.add('is-flagged');
  if (surface.amazonLight) wrap.dataset.amazon = '1';

  const altText = `${surface.code} variant for ${market} (${locale.lang}) — ${locale.headline}`;
  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', altText);
  wrap.innerHTML = `
    <div class="tile__canvas" style="aspect-ratio: ${aspect};">
      <div class="tile__photo" style="background-image: url('${photoURL}');" aria-hidden="true"></div>
      <div class="tile__scrim" aria-hidden="true"></div>
      ${typographyHTML({ surface, locale })}
      ${locale.disclaimer ? `<div class="tile__disclaimer" aria-hidden="true">${escapeHtml(locale.disclaimer)}</div>` : ''}
      ${locale.kana && !surface.noCopy ? `<div class="tile__kana" aria-hidden="true">${escapeHtml(locale.kana)}</div>` : ''}
    </div>
    <div class="tile__caption">${escapeHtml(surface.code)} · ${escapeHtml(market)} · ${escapeHtml(locale.lang)}</div>
  `;
  return wrap;
}

// Typography overlay per surface — uses CSS classes for layout, text from locale.
function typographyHTML({ surface, locale }) {
  if (surface.noCopy) return '';
  const isJP = locale.font === 'jp';
  const langClass = isJP ? 'tile__copy--jp' : '';
  const layoutClass = `tile__copy--${surface.subjectLock}`;

  return `
    <div class="tile__copy ${langClass} ${layoutClass}">
      <div class="tile__eyebrow">${escapeHtml(locale.eyebrow)}</div>
      <div class="tile__headline">${escapeHtml(locale.headline)}</div>
      <div class="tile__cta">${escapeHtml(locale.cta)}</div>
    </div>
  `;
}

// Brand-check small thumbnail — same photo system, no typography (score is the message).
export function buildBrandCheckTile({ market, surface, score, flagged }) {
  const photoId = pickPhoto(market, surface, false);
  const photoURL = unsplashURL(photoId, 200, 200);
  const wrap = document.createElement('div');
  wrap.className = 'bc-tile';
  if (flagged) wrap.classList.add('is-flagged');
  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', `Variant compliance score ${score}${flagged ? ', flagged for review' : ''}`);
  wrap.innerHTML = `
    <div class="bc-tile__photo" style="background-image: url('${photoURL}');" aria-hidden="true"></div>
    <span class="bc-tile__score">${escapeHtml(score)}</span>
  `;
  return wrap;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
