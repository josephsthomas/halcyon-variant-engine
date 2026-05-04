// cues.js — 8-cue system: marker, card, pointer, margin log.
// §10 — subtle, in-context, discovered. Markers are Option A footnote pins (°)
// in --gold; cards have an italic EB Garamond body and a tracked Manrope
// uppercase attribution eyebrow; pointer draws via stroke-dasharray.

import { CUES } from './data.js';

let overlay;
let logEl;
let appState;
let activeCard = null;
let activePointer = null;
let activeAnchorEl = null;
let activeMarker = null;
const markerEls = new Map();   // cueId → <button.cue-marker> (most-recent attach)

export function mountCueLayer(overlayEl, marginLogEl, sharedState) {
  overlay = overlayEl;
  logEl = marginLogEl;
  appState = sharedState;
  // Reposition active card on resize / scroll
  window.addEventListener('resize', repositionActive);
  window.addEventListener('scroll', repositionActive, { passive: true });
}

export function resetCues() {
  hideAllCues();
  markerEls.clear();
}

// Insert a marker as a child of `anchorEl` (or sibling). Stores the cue ↔ marker mapping.
export function attachMarker(cueId, anchorEl) {
  if (!anchorEl || !CUES[cueId]) return;
  // If anchor element is a structural region (not text-bearing), append a corner marker instead.
  const marker = document.createElement('button');
  marker.className = 'cue-marker';
  marker.type = 'button';
  marker.setAttribute('aria-label', `Audience cue ${cueId}`);
  marker.dataset.cueId = cueId;
  marker.innerHTML = `<span class="cue-marker__id">${cueId}</span>`;
  marker.addEventListener('click', (ev) => {
    ev.stopPropagation();
    revealCue(CUES[cueId], false);
  });
  marker.addEventListener('mouseenter', () => revealCue(CUES[cueId], false));

  // Default placement: append to anchor in a corner (works for blocks + tiles).
  // For inline-text anchors callers can pass elements that flow with text.
  anchorEl.classList.add('cue-anchor');
  if (getComputedStyle(anchorEl).position === 'static') {
    anchorEl.style.position = 'relative';
  }
  // Position the marker absolutely top-right unless anchor is small/inline.
  marker.style.position = 'absolute';
  marker.style.top = '-6px';
  marker.style.right = '-2px';
  marker.style.zIndex = '5';
  anchorEl.appendChild(marker);

  markerEls.set(cueId, marker);
}

export function revealCue(cue, fromNarrate) {
  if (!cue) return;
  hideAllCues();
  const marker = markerEls.get(cue.id);
  if (!marker) return;

  activeMarker = marker;
  marker.classList.add('is-active');
  activeAnchorEl = marker;

  // Build card
  const card = document.createElement('div');
  card.className = 'cue-card';
  card.setAttribute('role', 'note');
  card.innerHTML = `
    <button class="cue-card__close" aria-label="Dismiss">×</button>
    <div class="cue-card__attr">${escapeHtml(cue.voiceTitle)}</div>
    <div class="cue-card__body">“${escapeHtml(cue.body)}”</div>
  `;
  card.querySelector('.cue-card__close').addEventListener('click', hideAllCues);
  overlay.appendChild(card);
  activeCard = card;

  // Build pointer SVG
  const pointer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  pointer.setAttribute('class', 'cue-pointer');
  overlay.appendChild(pointer);
  activePointer = pointer;

  // Position card + pointer relative to the marker
  positionCard(marker, card, pointer);

  // Animate in
  requestAnimationFrame(() => {
    card.classList.add('is-visible');
    pointer.classList.add('is-visible');
  });

  // Mark revealed + log
  if (!appState.revealedCues.has(cue.id)) {
    appState.revealedCues.add(cue.id);
    addToMarginLog(cue);
  }

  if (fromNarrate) {
    // Auto-fade after 6s in narrate mode (§11.2 "holds for 6s then fades")
    setTimeout(() => {
      if (activeCard === card) hideAllCues();
    }, 6000);
  }
}

function positionCard(marker, card, pointer) {
  const mRect = marker.getBoundingClientRect();
  const cardW = 280;
  const margin = 24;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Prefer right-of-marker; flip left if not enough room.
  let cx = mRect.right + margin + 30;
  if (cx + cardW > vw - 16) cx = mRect.left - cardW - margin - 30;
  if (cx < 16) cx = 16;

  // Vertically: try to align with marker center; clamp to viewport.
  // Card height not known yet — measure after layout.
  card.style.left = cx + 'px';
  card.style.top = mRect.top + 'px';
  // After paint, refine vertical
  requestAnimationFrame(() => {
    const cRect = card.getBoundingClientRect();
    let cy = mRect.top + (mRect.height / 2) - (cRect.height / 2);
    if (cy + cRect.height > vh - 16) cy = vh - cRect.height - 16;
    if (cy < 16) cy = 16;
    card.style.top = cy + 'px';

    // Pointer
    const cardRect = card.getBoundingClientRect();
    const sx = mRect.left + mRect.width / 2;
    const sy = mRect.top + mRect.height / 2;
    const ex = (cardRect.left > sx) ? cardRect.left : cardRect.right;
    const ey = cardRect.top + Math.min(cardRect.height / 2, 24);
    drawPointer(pointer, sx, sy, ex, ey);
  });
}

function drawPointer(svg, x1, y1, x2, y2) {
  const minX = Math.min(x1, x2) - 4;
  const minY = Math.min(y1, y2) - 4;
  const maxX = Math.max(x1, x2) + 4;
  const maxY = Math.max(y1, y2) + 4;
  const w = maxX - minX;
  const h = maxY - minY;
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.style.left = minX + 'px';
  svg.style.top = minY + 'px';
  svg.style.position = 'absolute';
  const lx1 = x1 - minX;
  const ly1 = y1 - minY;
  const lx2 = x2 - minX;
  const ly2 = y2 - minY;
  const len = Math.hypot(lx2 - lx1, ly2 - ly1);
  svg.innerHTML = `
    <line class="cue-pointer__line" x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}"
      stroke-dasharray="${len.toFixed(1)}" stroke-dashoffset="${len.toFixed(1)}" />
    <circle class="cue-pointer__dot" cx="${lx1}" cy="${ly1}" r="2.2"/>
  `;
  // After append, set dashoffset to 0 to trigger transition
  requestAnimationFrame(() => {
    const line = svg.querySelector('.cue-pointer__line');
    if (line) line.setAttribute('stroke-dashoffset', '0');
  });
}

function repositionActive() {
  if (!activeCard || !activeMarker) return;
  positionCard(activeMarker, activeCard, activePointer);
}

export function hideAllCues() {
  if (activeMarker) activeMarker.classList.remove('is-active');
  if (activeCard) activeCard.remove();
  if (activePointer) activePointer.remove();
  activeMarker = null;
  activeCard = null;
  activePointer = null;
  activeAnchorEl = null;
}

// §10.6 — margin log: idempotent, persistent across scenes.
export function addToMarginLog(cue) {
  if (!logEl) return;
  // Avoid duplicate DOM rows
  if (logEl.querySelector(`[data-log-cue="${cue.id}"]`)) return;
  const row = document.createElement('div');
  row.className = 'margin-log__entry';
  row.dataset.logCue = cue.id;
  row.innerHTML = `
    <span class="margin-log__pin">${cue.id}°</span>
    <span class="margin-log__attr">${escapeHtml(cue.voiceShort)}</span>
    <span class="margin-log__quote">${escapeHtml(stripQuotes(cue.body))}</span>
  `;
  logEl.appendChild(row);
}

function stripQuotes(s) {
  return s.replace(/^["“”]+|["“”]+$/g, '');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Click anywhere outside a cue card hides it (in explore mode).
document.addEventListener('click', (ev) => {
  if (!activeCard) return;
  if (activeCard.contains(ev.target)) return;
  if (activeMarker && activeMarker.contains(ev.target)) return;
  hideAllCues();
});

