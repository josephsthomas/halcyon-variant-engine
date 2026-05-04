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

    <div class="a1-section-eyebrow">THE CANONICAL BRIDGE · HOW THE ENGINE TOUCHES ASSETHUB</div>
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
      <div class="a1-cta-foot">7 scenes · about 2 minutes</div>
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
  // Bridge diagram. Layout is a 4-column flow with generous vertical spacing
  // so arrow labels sit in their own bands and never cross node text.
  // Columns:  Brief (col 1) → Engine (col 2) → AssetHub (col 3 top) + Firefly (col 3 bottom) → Channels (col 4)
  return `
    <svg class="bridge__svg" viewBox="0 0 1000 380" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#4F6B62"/>
        </marker>
        <marker id="arr-gold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#B89968"/>
        </marker>
      </defs>

      <!-- Brief (left) -->
      <g transform="translate(20,160)">
        <rect x="0" y="0" width="140" height="64" rx="2" fill="#FCFAF4" stroke="#C8C0AE"/>
        <text x="70" y="28" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="15" fill="#1F3A34">Brief</text>
        <text x="70" y="48" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#6E867D">FROM CMO</text>
      </g>

      <!-- Brief → Engine: label sits ABOVE the arrow line, well clear -->
      <text x="220" y="178" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#4F6B62">FILE BRIEF</text>
      <line x1="160" y1="192" x2="280" y2="192" stroke="#4F6B62" stroke-width="1" marker-end="url(#arr)"/>

      <!-- Engine (center) -->
      <g transform="translate(280,100)">
        <rect x="0" y="0" width="380" height="184" fill="#FCFAF4" stroke="#1F3A34" stroke-width="1.5"/>
        <text x="190" y="36" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="20" fill="#1F3A34">The Variant Engine</text>
        <text x="190" y="56" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.5" fill="#6E867D">STATELESS  ·  ORCHESTRATION ONLY</text>
        <line x1="24" y1="74" x2="356" y2="74" stroke="#DDD4BE"/>
        <text x="40" y="100" font-family="Manrope,sans-serif" font-weight="500" font-size="11.5" fill="#1F3A34">·  Resolve 188 tasks from the spec library</text>
        <text x="40" y="124" font-family="Manrope,sans-serif" font-weight="500" font-size="11.5" fill="#1F3A34">·  Fan out to Firefly primitives in parallel</text>
        <text x="40" y="148" font-family="Manrope,sans-serif" font-weight="500" font-size="11.5" fill="#1F3A34">·  Score, stamp with C2PA, write back</text>
      </g>

      <!-- AssetHub (top right, far enough above to keep arrow labels readable) -->
      <g transform="translate(740,40)">
        <rect x="0" y="0" width="240" height="84" fill="#F5EFE3" stroke="#C8C0AE" stroke-width="1"/>
        <text x="120" y="30" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="15" fill="#1F3A34">AssetHub</text>
        <text x="120" y="50" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#6E867D">CANONICAL  ·  OPENTEXT  ·  4.2 PB</text>
        <text x="120" y="68" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#6E867D">SYSTEM OF RECORD  ·  UNCHANGED</text>
      </g>
      <!-- Engine → AssetHub: read up. Solid arrow, label sits to the LEFT of the arrow -->
      <line x1="660" y1="140" x2="740" y2="100" stroke="#4F6B62" stroke-width="1" marker-end="url(#arr)"/>
      <text x="668" y="116" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#4F6B62">READ HERO</text>
      <!-- AssetHub → Engine: write back. Dashed return arrow with label below it -->
      <line x1="740" y1="124" x2="660" y2="160" stroke="#4F6B62" stroke-width="1" marker-end="url(#arr)" stroke-dasharray="3 3"/>
      <text x="668" y="172" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#4F6B62">WRITE 188 BACK</text>

      <!-- Firefly (bottom right) -->
      <g transform="translate(740,256)">
        <rect x="0" y="0" width="240" height="84" fill="#F5EFE3" stroke="#C8C0AE" stroke-width="1"/>
        <text x="120" y="30" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="15" fill="#1F3A34">Firefly Services</text>
        <text x="120" y="50" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#6E867D">CUSTOM MODELS  ·  REFRAME v2</text>
        <text x="120" y="68" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#6E867D">OBJECT COMPOSITE  ·  TRANSLATE</text>
      </g>
      <!-- Engine → Firefly: gold, label below -->
      <line x1="660" y1="244" x2="740" y2="280" stroke="#B89968" stroke-width="1" marker-end="url(#arr-gold)"/>
      <text x="668" y="276" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1" fill="#B89968">188 PARALLEL JOBS</text>

      <!-- Activation outputs -->
      <text x="500" y="370" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.2" fill="#6E867D">→  META  ·  GOOGLE  ·  AMAZON  ·  PINTEREST  ·  TIKTOK  ·  OOH  ·  IN-STORE</text>
    </svg>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
