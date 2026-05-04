// act1.js — workflow overview page (§5) + brand identity strip + headline metrics + narrated bridge.
import { HEADLINE, STAGES, BRAND, HEADLINE_METRICS, BRIDGE_NOTES } from '../data.js';

export function renderAct1(host, opts) {
  host.innerHTML = `
    ${brandStripHTML()}

    <div class="a1-eyebrow">${escapeHtml(HEADLINE.topEyebrow)}</div>

    <h1 class="a1-title">${escapeHtml(HEADLINE.title)}</h1>
    <p class="a1-subtitle">${escapeHtml(HEADLINE.subtitle)}</p>

    <div class="a1-hero-line">${escapeHtml(HEADLINE.hero)}</div>

    <div class="a1-metric-strip">
      ${HEADLINE_METRICS.map(m => `
        <div class="a1-metric">
          <div class="a1-metric__value">${escapeHtml(m.value)}</div>
          <div class="a1-metric__label">${escapeHtml(m.label)}</div>
          <div class="a1-metric__foot">${escapeHtml(m.foot)}</div>
        </div>
      `).join('')}
    </div>

    <p class="a1-orient">${escapeHtml(HEADLINE.bodyOrientLong)}</p>

    <div class="a1-section-eyebrow">THE EIGHT-STAGE PIPELINE</div>
    <div class="pipeline" id="a1-pipeline">
      <span class="pipeline__line"></span>
      ${STAGES.map(stageHTML).join('')}
    </div>

    <div class="a1-section-eyebrow">THE CANONICAL BRIDGE — HOW THE ENGINE TOUCHES ASSETHUB</div>
    <div class="bridge bridge--narrated" id="a1-bridge">
      ${bridgeSVG()}
      <div class="bridge__caption">${escapeHtml(HEADLINE.bridgeCaption)}</div>
      <div class="bridge__failnotes">
        <div class="bridge__failnote"><span class="bridge__failtag">2018</span> ${escapeHtml(BRIDGE_NOTES.story2018.replace(/^2018 — /, ''))}</div>
        <div class="bridge__failnote"><span class="bridge__failtag">2022</span> ${escapeHtml(BRIDGE_NOTES.story2022.replace(/^2022 — /, ''))}</div>
        <div class="bridge__failnote bridge__failnote--resolve">${escapeHtml(BRIDGE_NOTES.resolution)}</div>
      </div>
    </div>

    <div class="a1-cta-row">
      <button class="btn-primary" id="a1-begin">${escapeHtml(HEADLINE.beginButton)}</button>
      <div class="a1-cta-foot">A 7-scene visual walkthrough · ~2 minutes</div>
    </div>
  `;

  host.querySelector('#a1-begin').addEventListener('click', () => opts.onBegin?.());
}

function brandStripHTML() {
  return `
    <header class="brand-strip">
      <div class="brand-strip__left">
        <button class="brand-strip__wordmark brand-strip__wordmark--link" type="button" data-act="home" aria-label="Return to overview">${escapeHtml(BRAND.wordmark)}</button>
        <div class="brand-strip__tag">${escapeHtml(BRAND.tagline)}</div>
        <div class="brand-strip__founded">${escapeHtml(BRAND.founded)}</div>
      </div>
      <div class="brand-strip__right">
        <div class="brand-strip__active-label">ACTIVE BRAND IN THIS DEMO</div>
        <div class="brand-strip__active">${escapeHtml(BRAND.activeBrand)}</div>
        <div class="brand-strip__active-foot">${escapeHtml(BRAND.activeRevenue)}</div>
        <div class="brand-strip__lines">
          ${BRAND.lines.map(l => `
            <div class="brand-line ${l.isActive ? 'is-active' : ''} ${l.isPilot ? 'is-pilot' : ''}" title="${escapeHtml(l.code)} — ${escapeHtml(l.promise)}${l.badge ? ' (' + l.badge + ')' : ''}">
              <span class="brand-line__swatch" style="background:${l.hex}" aria-hidden="true"></span>
              <span class="brand-line__code">${escapeHtml(l.code)}</span>
              ${l.badge ? `<span class="brand-line__badge">${escapeHtml(l.badge)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </header>
  `;
}

function stageHTML(s) {
  return `
    <button class="pipeline-node" data-stage-id="${s.num}" data-state="future">
      <span class="pipeline-node__dot"></span>
      <span class="pipeline-node__num">${s.num}</span>
      <span class="pipeline-node__label">${escapeHtml(s.label)}</span>
      <span class="pipeline-node__sub">${escapeHtml(s.sub)}</span>
      <span class="pipeline-node__primitive">${escapeHtml(shortPrimitive(s.primitive))}</span>
      <span class="pipeline-caption" role="tooltip">
        <span class="pipeline-caption__name">${escapeHtml(s.label)} · ${escapeHtml(s.sub)}</span>
        <span class="pipeline-caption__primitive">${escapeHtml(s.primitive)}</span>
        <span class="pipeline-caption__desc">${escapeHtml(s.desc)}</span>
      </span>
    </button>
  `;
}

function shortPrimitive(s) {
  // Trim primitive line to first comma/period for display under the node label.
  return s.split(/[·]/)[0].trim();
}

function bridgeSVG() {
  // Narrated bridge: Brief flows in (left), AssetHub (left box) is read,
  // Engine resolves 188 tasks, Firefly executes (right top), results write
  // back to AssetHub. All arrows annotated.
  return `
    <svg class="bridge__svg" viewBox="0 0 920 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#5C7A72"/>
        </marker>
        <marker id="arr-gold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#B89968"/>
        </marker>
      </defs>

      <!-- Brief in -->
      <g transform="translate(20,140)">
        <rect x="0" y="0" width="120" height="48" rx="2" fill="#FCFAF4" stroke="#C8C0AE"/>
        <text x="60" y="22" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="13" fill="#1F3A34">Brief</text>
        <text x="60" y="38" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#8FA39B">FROM CMO</text>
      </g>

      <!-- Brief → Engine arrow -->
      <line x1="140" y1="164" x2="280" y2="164" stroke="#5C7A72" stroke-width="1" marker-end="url(#arr)"/>
      <text x="210" y="156" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#5C7A72">FILE</text>

      <!-- Engine (center, dominant) -->
      <g transform="translate(280,80)">
        <rect x="0" y="0" width="360" height="160" fill="#FCFAF4" stroke="#1F3A34" stroke-width="1.5"/>
        <text x="180" y="34" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="18" fill="#1F3A34">The Variant Engine</text>
        <text x="180" y="52" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.5" fill="#8FA39B">STATELESS · ORCHESTRATION ONLY</text>
        <line x1="20" y1="68" x2="340" y2="68" stroke="#DDD4BE"/>
        <text x="40" y="92"  font-family="Manrope,sans-serif" font-weight="500" font-size="11" fill="#1F3A34">·  Resolve 188 tasks from spec library</text>
        <text x="40" y="112" font-family="Manrope,sans-serif" font-weight="500" font-size="11" fill="#1F3A34">·  Fan out to Firefly primitives in parallel</text>
        <text x="40" y="132" font-family="Manrope,sans-serif" font-weight="500" font-size="11" fill="#1F3A34">·  Brand-check, C2PA-stamp, write back</text>
      </g>

      <!-- AssetHub (top right) -->
      <g transform="translate(700,32)">
        <rect x="0" y="0" width="200" height="80" fill="#F5EFE3" stroke="#C8C0AE" stroke-width="1"/>
        <text x="100" y="28" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="14" fill="#1F3A34">AssetHub</text>
        <text x="100" y="46" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#8FA39B">CANONICAL · OPENTEXT · 4.2 PB</text>
        <text x="100" y="66" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#8FA39B">SYSTEM OF RECORD · UNCHANGED</text>
      </g>
      <!-- Engine ↔ AssetHub: read up, write up -->
      <line x1="560" y1="80" x2="780" y2="112" stroke="#5C7A72" stroke-width="1" marker-end="url(#arr)"/>
      <text x="650" y="86" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#5C7A72">READ HERO</text>
      <line x1="780" y1="112" x2="600" y2="80" stroke="#5C7A72" stroke-width="1" marker-end="url(#arr)" stroke-dasharray="3 3"/>
      <text x="660" y="106" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#5C7A72">WRITE 188 BACK</text>

      <!-- Firefly (bottom right) -->
      <g transform="translate(700,208)">
        <rect x="0" y="0" width="200" height="80" fill="#F5EFE3" stroke="#C8C0AE" stroke-width="1"/>
        <text x="100" y="28" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="14" fill="#1F3A34">Firefly Services</text>
        <text x="100" y="46" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#8FA39B">CUSTOM MODELS · REFRAME v2</text>
        <text x="100" y="66" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#8FA39B">OBJECT COMPOSITE · TRANSLATE</text>
      </g>
      <!-- Engine → Firefly -->
      <line x1="640" y1="200" x2="780" y2="208" stroke="#B89968" stroke-width="1" marker-end="url(#arr-gold)"/>
      <text x="700" y="214" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#B89968">188 PARALLEL JOBS</text>

      <!-- Activate (far right top) -->
      <g transform="translate(560,280)">
        <text x="40" y="14" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#8FA39B">→ META · GOOGLE · AMAZON · OOH · IN-STORE</text>
      </g>
    </svg>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
