// act0.js — pre-page: The Challenge + The Solution + Roadmap + Value lenses.
// Frames the case study before the viewer enters Act 1 (the workflow overview).

import { ACT0, BRAND } from '../data.js';

export function renderAct0(host, opts) {
  host.innerHTML = `
    ${brandStripHTML()}

    <div class="a0-eyebrow">${escapeHtml(ACT0.eyebrow)}</div>
    <h1 class="a0-title">${escapeHtml(ACT0.title)}</h1>
    <p class="a0-subtitle">${escapeHtml(ACT0.subtitle)}</p>

    <!-- The Challenge -->
    <section class="a0-block a0-block--challenge">
      <div class="a0-section-eyebrow">${escapeHtml(ACT0.challenge.eyebrow)}</div>
      <h2 class="a0-section-title">${escapeHtml(ACT0.challenge.headline)}</h2>
      <p class="a0-section-body">${escapeHtml(ACT0.challenge.body)}</p>
      <div class="a0-pillars">
        ${ACT0.challenge.pillars.map(p => `
          <div class="a0-pillar">
            <div class="a0-pillar__tag">${escapeHtml(p.tag)}</div>
            <div class="a0-pillar__line">${escapeHtml(p.line)}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Stakeholders -->
    <section class="a0-block">
      <div class="a0-section-eyebrow">${escapeHtml(ACT0.stakeholders.eyebrow)}</div>
      <h2 class="a0-section-title">${escapeHtml(ACT0.stakeholders.headline)}</h2>
      <div class="a0-stakeholders">
        ${ACT0.stakeholders.list.map(s => `
          <div class="a0-stake">
            <div class="a0-stake__role">${escapeHtml(s.role)}</div>
            <div class="a0-stake__concern">${escapeHtml(s.concern)}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- The Solution -->
    <section class="a0-block a0-block--solution">
      <div class="a0-section-eyebrow">${escapeHtml(ACT0.solution.eyebrow)}</div>
      <h2 class="a0-section-title">${escapeHtml(ACT0.solution.headline)}</h2>
      <p class="a0-section-body">${escapeHtml(ACT0.solution.body)}</p>
      <div class="a0-pillars">
        ${ACT0.solution.pillars.map(p => `
          <div class="a0-pillar a0-pillar--gold">
            <div class="a0-pillar__tag">${escapeHtml(p.tag)}</div>
            <div class="a0-pillar__line">${escapeHtml(p.line)}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Roadmap -->
    <section class="a0-block">
      <div class="a0-section-eyebrow">${escapeHtml(ACT0.roadmap.eyebrow)}</div>
      <h2 class="a0-section-title">${escapeHtml(ACT0.roadmap.headline)}</h2>
      <p class="a0-section-body">${escapeHtml(ACT0.roadmap.body)}</p>
      <div class="a0-waves">
        ${ACT0.roadmap.waves.map((w, i) => `
          <div class="a0-wave ${i === 0 ? 'is-first' : ''}">
            <div class="a0-wave__num">${escapeHtml(w.num)}</div>
            <div class="a0-wave__months">${escapeHtml(w.months)}</div>
            <div class="a0-wave__brands">${escapeHtml(w.brands)}</div>
            <div class="a0-wave__markets">${escapeHtml(w.markets)}</div>
            <div class="a0-wave__char">${escapeHtml(w.character)}</div>
          </div>
        `).join('')}
      </div>
      <div class="a0-wave1-jobs">
        <div class="a0-wave1-jobs__label">WAVE 1 MUST DO FOUR JOBS SIMULTANEOUSLY</div>
        <ol class="a0-wave1-jobs__list">
          ${ACT0.roadmap.wave1Jobs.map(j => `<li>${escapeHtml(j)}</li>`).join('')}
        </ol>
      </div>
    </section>

    <!-- Value -->
    <section class="a0-block a0-block--value">
      <div class="a0-section-eyebrow">${escapeHtml(ACT0.value.eyebrow)}</div>
      <h2 class="a0-section-title">${escapeHtml(ACT0.value.headline)}</h2>
      <p class="a0-section-body">${escapeHtml(ACT0.value.body)}</p>
      <div class="a0-lenses">
        ${ACT0.value.lenses.map(l => `
          <div class="a0-lens">
            <div class="a0-lens__name">${escapeHtml(l.lens)}</div>
            <div class="a0-lens__metric">${escapeHtml(l.metric)}</div>
            <div class="a0-lens__y1">${escapeHtml(l.y1)}</div>
          </div>
        `).join('')}
      </div>
      <div class="a0-board">
        <div class="a0-board__label">YEAR-1 BOARD READOUT · FIVE NUMBERS</div>
        <div class="a0-board__grid">
          ${ACT0.value.boardNumbers.map(b => `
            <div class="a0-board__num">
              <div class="a0-board__value">${escapeHtml(b.value)}</div>
              <div class="a0-board__name">${escapeHtml(b.label)}</div>
              <div class="a0-board__sub">${escapeHtml(b.sub)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA into Act 1 -->
    <section class="a0-cta">
      <div class="a0-cta__rule"></div>
      <button class="btn-primary" id="a0-into-act1">${escapeHtml(ACT0.ctaPrimary)}</button>
      <div class="a0-cta__foot">${escapeHtml(ACT0.ctaSecondary)}</div>
    </section>
  `;

  host.querySelector('#a0-into-act1').addEventListener('click', () => opts.onIntoAct1?.());
}

function brandStripHTML() {
  return `
    <header class="brand-strip">
      <div class="brand-strip__left">
        <div class="brand-strip__wordmark">${escapeHtml(BRAND.wordmark)}</div>
        <div class="brand-strip__tag">${escapeHtml(BRAND.tagline)}</div>
        <div class="brand-strip__founded">${escapeHtml(BRAND.founded)}</div>
      </div>
      <div class="brand-strip__right">
        <div class="brand-strip__active-label">ACTIVE BRAND IN THIS DEMO</div>
        <div class="brand-strip__active">${escapeHtml(BRAND.activeBrand)}</div>
        <div class="brand-strip__active-foot">${escapeHtml(BRAND.activeRevenue)}</div>
        <div class="brand-strip__lines">
          ${BRAND.lines.map(l => `
            <div class="brand-line ${l.isActive ? 'is-active' : ''}" title="${escapeHtml(l.code)} — ${escapeHtml(l.promise)}">
              <span class="brand-line__swatch" style="background:${l.hex}"></span>
              <span class="brand-line__code">${escapeHtml(l.code)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </header>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
