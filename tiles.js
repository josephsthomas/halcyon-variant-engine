// tiles.js — variant tile SVG generator (markets × surfaces × locale).
// §9 — wireframe-grade. Geometric subject silhouette + locale-distinct typography.
// JP tile is the §13.1 persona-test gate: it MUST stop the eye.

import { LOCALES, SURFACES } from './data.js';

// Build a single tile element. Returns HTMLElement.
export function buildTile({ market, surface, flagged, hero }) {
  const locale = LOCALES[market];
  const isHero = !!hero;
  const w = surface.aspectW;
  const h = surface.aspectH;
  const aspect = `${w} / ${h}`;
  const vbW = 200;
  const vbH = Math.round(200 * h / w);

  const wrap = document.createElement('div');
  wrap.className = 'tile';
  if (flagged) wrap.classList.add('is-flagged');
  if (surface.amazonLight) wrap.dataset.amazon = '1';
  wrap.innerHTML = `
    <div class="tile__canvas" style="aspect-ratio: ${aspect};">
      <svg viewBox="0 0 ${vbW} ${vbH}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        ${tileSVG({ surface, locale, vbW, vbH, isHero })}
      </svg>
    </div>
    <div class="tile__caption">${escapeHtml(surface.code)} · ${escapeHtml(market)} · ${escapeHtml(locale.lang)}</div>
  `;
  return wrap;
}

function tileSVG({ surface, locale, vbW, vbH, isHero }) {
  const bgIsLight = !!surface.amazonLight;
  const bgFill = bgIsLight ? '#F7F2E8' : null;
  const figureColor = bgIsLight ? '#3B3530' : '#4A423C';
  const figureHi    = bgIsLight ? '#5A524A' : '#5A524A';
  const inkOnTile   = bgIsLight ? '#1F1815' : '#F5EFE3';
  const eyebrowInk  = bgIsLight ? '#5C7A72' : '#8FA39B';
  const accentInk   = '#B89968';

  // Subject position per §9.3
  const pos = subjectPosition(surface.subjectLock, vbW, vbH);

  // Typography placement zones per surface
  const typoOpts = computeTypography({ surface, locale, vbW, vbH, ink: inkOnTile, eyebrow: eyebrowInk, accent: accentInk });

  // Background
  let bg = '';
  if (bgFill) {
    bg = `<rect width="${vbW}" height="${vbH}" fill="${bgFill}"/>`;
  } else {
    // Subtle vertical gradient
    bg = `
      <defs>
        <linearGradient id="bg-${pos.id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3B3530"/>
          <stop offset="1" stop-color="#252220"/>
        </linearGradient>
      </defs>
      <rect width="${vbW}" height="${vbH}" fill="url(#bg-${pos.id})"/>
    `;
  }

  // Subtle horizon line (optional environmental detail per §9.2)
  const horizon = (vbH > 60) ? `<line x1="${vbW * 0.05}" y1="${vbH * 0.66}" x2="${vbW * 0.95}" y2="${vbH * 0.66}" stroke="${bgIsLight ? '#C8C0AE' : '#3B3530'}" stroke-width="0.6" opacity="0.55"/>` : '';

  // Subject silhouette: tapered figure (head oval + torso rect + legs verticals)
  const fig = subjectFigureSVG(pos, figureColor, figureHi);

  return `
    ${bg}
    ${horizon}
    ${fig}
    ${typoOpts.svg}
    ${locale.disclaimer ? disclaimerSVG(locale.disclaimer, vbW, vbH, eyebrowInk) : ''}
    ${locale.kana && !isHero && !surface.noCopy ? kanaGlyphSVG(locale.kana, vbW, vbH, accentInk) : ''}
  `;
}

// === Subject positioning ===
function subjectPosition(lock, vbW, vbH) {
  // Returns center-x, top-y, scaleH (figure occupies this fraction of vbH)
  const id = `${lock}-${vbW}x${vbH}`;
  let cx = vbW / 2, scaleH = 0.6;
  let topY = vbH * 0.20;
  switch (lock) {
    case 'center':         cx = vbW / 2;        scaleH = 0.60; topY = vbH * 0.20; break;
    case 'center-tight':   cx = vbW / 2;        scaleH = 0.80; topY = vbH * 0.10; break;
    case 'center-low':     cx = vbW / 2;        scaleH = 0.65; topY = vbH * 0.25; break;
    case 'left-third':     cx = vbW * 0.30;     scaleH = 0.70; topY = vbH * 0.18; break;
    case 'right-third':    cx = vbW * 0.78;     scaleH = 0.75; topY = vbH * 0.12; break;
    case 'lower-left':     cx = vbW * 0.32;     scaleH = 0.55; topY = vbH * 0.42; break;
  }
  return { id, cx, topY, scaleH };
}

function subjectFigureSVG(pos, fill, hi) {
  // Build a simple geometric figure scaled to pos.scaleH * vbH starting at pos.topY.
  const figH = pos.scaleH * 100; // we'll express in viewBox units relative to vbH later
  return `
    <g transform="translate(${pos.cx}, ${pos.topY})">
      <!-- head -->
      <ellipse cx="0" cy="0" rx="${figH * 0.06}" ry="${figH * 0.085}" fill="${fill}"/>
      <!-- torso (tapered rect) -->
      <path d="M ${-figH * 0.10} ${figH * 0.10} L ${figH * 0.10} ${figH * 0.10}
               L ${figH * 0.085} ${figH * 0.45} L ${-figH * 0.085} ${figH * 0.45} Z"
            fill="${fill}"/>
      <!-- shell highlight stripe -->
      <line x1="${-figH * 0.05}" y1="${figH * 0.14}" x2="${-figH * 0.05}" y2="${figH * 0.40}" stroke="${hi}" stroke-width="0.8" opacity="0.65"/>
      <!-- legs -->
      <rect x="${-figH * 0.075}" y="${figH * 0.45}" width="${figH * 0.06}" height="${figH * 0.50}" fill="${fill}"/>
      <rect x="${figH * 0.015}"  y="${figH * 0.45}" width="${figH * 0.06}" height="${figH * 0.50}" fill="${fill}"/>
    </g>
  `;
}

// === Typography per surface ===
function computeTypography({ surface, locale, vbW, vbH, ink, eyebrow, accent }) {
  if (surface.noCopy) return { svg: '' };

  // Headline + eyebrow placement based on subject lock
  const isJP = locale.font === 'jp';
  const fontFamHead = isJP ? "'Noto Serif JP', 'EB Garamond', serif" : "'EB Garamond', Georgia, serif";
  const fontFamSans = isJP ? "'Noto Sans JP', Manrope, sans-serif"   : "Manrope, sans-serif";
  const fontFamCTA  = isJP ? "'Noto Sans JP', Manrope, sans-serif"   : "Manrope, sans-serif";

  // Decide layout based on subject lock
  const lock = surface.subjectLock;
  let headlineX, headlineY, headlineSize, headlineAnchor;
  let eyebrowX, eyebrowY, eyebrowSize;
  let ctaX, ctaY, ctaSize;
  let detailX, detailY, detailSize;

  if (lock === 'lower-left') {
    // OOH — headline upper-right
    headlineAnchor = 'end';
    headlineX = vbW * 0.94; headlineY = vbH * 0.18;
    headlineSize = isJP ? 16 : 16;
    eyebrowX = vbW * 0.94; eyebrowY = vbH * 0.10; eyebrowSize = 5.5;
    ctaX = vbW * 0.94; ctaY = vbH * 0.30; ctaSize = 7;
    detailX = null; detailY = null;
  } else if (lock === 'right-third') {
    // Email header — heavily horizontal, type-driven on left
    headlineAnchor = 'start';
    headlineX = vbW * 0.06; headlineY = vbH * 0.55;
    headlineSize = isJP ? 16 : 16;
    eyebrowX = vbW * 0.06; eyebrowY = vbH * 0.30; eyebrowSize = 5;
    ctaX = vbW * 0.06; ctaY = vbH * 0.82; ctaSize = 6;
    detailX = null; detailY = null;
  } else if (lock === 'left-third') {
    headlineAnchor = 'start';
    headlineX = vbW * 0.55; headlineY = vbH * 0.35;
    headlineSize = isJP ? 14 : 14;
    eyebrowX = vbW * 0.55; eyebrowY = vbH * 0.22; eyebrowSize = 5;
    ctaX = vbW * 0.55; ctaY = vbH * 0.55; ctaSize = 6.5;
    detailX = null; detailY = null;
  } else if (lock === 'center-tight') {
    headlineAnchor = 'middle';
    headlineX = vbW / 2; headlineY = vbH * 0.93;
    headlineSize = isJP ? 12 : 12;
    eyebrowX = vbW / 2; eyebrowY = vbH * 0.06; eyebrowSize = 5;
    ctaX = vbW / 2; ctaY = vbH * 0.985; ctaSize = 5.5;
    detailX = null; detailY = null;
  } else {
    // 1:1, 4:5 default
    headlineAnchor = 'middle';
    headlineX = vbW / 2; headlineY = vbH * 0.88;
    headlineSize = isJP ? 13 : 13;
    eyebrowX = vbW / 2; eyebrowY = vbH * 0.08; eyebrowSize = 4.8;
    ctaX = vbW / 2; ctaY = vbH * 0.96; ctaSize = 5.5;
    detailX = null; detailY = null;
  }

  // For JP: slightly smaller weight than Western per §9.4 — render via opacity
  const headlineOpacity = isJP ? 0.94 : 1.0;
  const headlineWeight = isJP ? 500 : 400;
  const headlineStyle = isJP ? 'normal' : 'italic';

  let svg = '';
  // Eyebrow
  svg += `<text x="${eyebrowX}" y="${eyebrowY}" text-anchor="${headlineAnchor}"
            font-family="${fontFamSans}" font-size="${eyebrowSize}" font-weight="500"
            letter-spacing="${isJP ? 1 : 1.2}" fill="${eyebrow}">${escapeHtml(locale.eyebrow)}</text>`;
  // Headline
  svg += `<text x="${headlineX}" y="${headlineY}" text-anchor="${headlineAnchor}"
            font-family="${fontFamHead}" font-size="${headlineSize}" font-style="${headlineStyle}"
            font-weight="${headlineWeight}" fill="${ink}" opacity="${headlineOpacity}">${escapeHtml(locale.headline)}</text>`;
  // CTA (skip for some narrow surfaces)
  if (ctaY != null) {
    svg += `<text x="${ctaX}" y="${ctaY}" text-anchor="${headlineAnchor}"
              font-family="${fontFamCTA}" font-size="${ctaSize}" font-weight="500"
              fill="${accent}">${escapeHtml(locale.cta)}</text>`;
  }
  return { svg };
}

function disclaimerSVG(text, vbW, vbH, ink) {
  return `<text x="${vbW * 0.06}" y="${vbH * 0.97}" text-anchor="start"
    font-family="Manrope, sans-serif" font-size="3.6" font-weight="400"
    letter-spacing="0.2" fill="${ink}">${escapeHtml(text)}</text>`;
}

function kanaGlyphSVG(glyph, vbW, vbH, accent) {
  // Decorative kana — large display character, top-left area, low opacity.
  // Not a translation aid (§9.4) — a brand element.
  return `<text x="${vbW * 0.08}" y="${vbH * 0.40}"
    font-family="'Noto Serif JP', serif" font-size="${Math.min(vbW, vbH) * 0.34}"
    font-weight="500" fill="${accent}" opacity="0.85">${escapeHtml(glyph)}</text>`;
}

// Brand-check small thumbnail — silhouette only
export function buildBrandCheckTile({ market, surface, score, flagged }) {
  const locale = LOCALES[market];
  const vbW = 100, vbH = 100;
  const pos = subjectPosition('center', vbW, vbH);
  const wrap = document.createElement('div');
  wrap.className = 'bc-tile';
  if (flagged) wrap.classList.add('is-flagged');
  wrap.innerHTML = `
    <div class="bc-tile__silhouette">
      <svg viewBox="0 0 ${vbW} ${vbH}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bc-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#3B3530"/>
            <stop offset="1" stop-color="#252220"/>
          </linearGradient>
        </defs>
        <rect width="${vbW}" height="${vbH}" fill="url(#bc-bg)"/>
        ${subjectFigureSVG(pos, '#4A423C', '#5A524A')}
      </svg>
    </div>
    <span class="bc-tile__score">${escapeHtml(score)}</span>
  `;
  return wrap;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

