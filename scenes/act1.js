// act1.js — workflow overview page (§5).
import { HEADLINE, STAGES, CUES } from '../data.js';
import { attachMarker } from '../cues.js';

export function renderAct1(host, opts) {
  host.innerHTML = `
    <div class="a1-eyebrow">${escapeHtml(HEADLINE.topEyebrow)}</div>
    <h1 class="a1-title">${escapeHtml(HEADLINE.title)}</h1>
    <p class="a1-subtitle">${escapeHtml(HEADLINE.subtitle)}</p>
    <div class="a1-rule"></div>
    <div class="pipeline" id="a1-pipeline">
      <span class="pipeline__line"></span>
      ${STAGES.map(stageHTML).join('')}
    </div>
    <div class="bridge" id="a1-bridge">
      ${bridgeSVG()}
      <div class="bridge__caption">${escapeHtml(HEADLINE.bridgeCaption)}</div>
    </div>
    <p class="a1-orient">${escapeHtml(HEADLINE.bodyOrient)}</p>
    <div class="a1-cta-row">
      <button class="btn-primary" id="a1-begin">${escapeHtml(HEADLINE.beginButton)}</button>
    </div>
  `;

  // Wire cue anchors per §5.4
  // a → Spec Library node
  const specNode = host.querySelector('[data-stage-id="3"]');
  if (specNode) attachMarker('a', specNode);
  // b → Bridge diagram
  const bridge = host.querySelector('#a1-bridge');
  if (bridge) attachMarker('b', bridge);
  // c → Firefly Generation node
  const fireflyNode = host.querySelector('[data-stage-id="4"]');
  if (fireflyNode) attachMarker('c', fireflyNode);

  // CTA
  host.querySelector('#a1-begin').addEventListener('click', () => opts.onBegin?.());
}

function stageHTML(s) {
  return `
    <button class="pipeline-node" data-stage-id="${s.num}" data-state="${s.num === 1 ? 'active' : 'future'}">
      <span class="pipeline-node__dot"></span>
      <span class="pipeline-node__num">${s.num}</span>
      <span class="pipeline-node__label">${escapeHtml(s.label)}</span>
      <span class="pipeline-node__sub">${escapeHtml(s.sub)}</span>
      <span class="pipeline-caption" role="tooltip">
        <span class="pipeline-caption__name">${escapeHtml(s.label)} · ${escapeHtml(s.sub)}</span>
        <span class="pipeline-caption__primitive">${escapeHtml(s.primitive)}</span>
        <span class="pipeline-caption__desc">${escapeHtml(s.desc)}</span>
      </span>
    </button>
  `;
}

function bridgeSVG() {
  return `
    <svg class="bridge__svg" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <!-- Two AssetHub boxes -->
      <g transform="translate(20,20)">
        <rect x="0" y="0" width="160" height="56" fill="none" stroke="#C8C0AE" stroke-width="1"/>
        <text x="80" y="24" text-anchor="middle" font-family="EB Garamond, serif" font-style="italic" font-size="14" fill="#1F3A34">${escapeHtml(HEADLINE.bridgeBoxLabel)}</text>
        <text x="80" y="42" text-anchor="middle" font-family="Manrope, sans-serif" font-size="10" letter-spacing="1" fill="#8FA39B">${escapeHtml(HEADLINE.bridgeBoxSub).toUpperCase()}</text>
      </g>
      <g transform="translate(540,20)">
        <rect x="0" y="0" width="160" height="56" fill="none" stroke="#C8C0AE" stroke-width="1"/>
        <text x="80" y="24" text-anchor="middle" font-family="EB Garamond, serif" font-style="italic" font-size="14" fill="#1F3A34">${escapeHtml(HEADLINE.bridgeBoxLabel)}</text>
        <text x="80" y="42" text-anchor="middle" font-family="Manrope, sans-serif" font-size="10" letter-spacing="1" fill="#8FA39B">${escapeHtml(HEADLINE.bridgeBoxSub).toUpperCase()}</text>
      </g>
      <!-- Read arrow (top middle, leftward to right) -->
      <g stroke="#5C7A72" stroke-width="1" fill="none">
        <line x1="180" y1="48" x2="540" y2="48"/>
        <polygon points="540,48 532,44 532,52" fill="#5C7A72"/>
      </g>
      <text x="360" y="38" text-anchor="middle" font-family="Manrope, sans-serif" font-size="10" letter-spacing="1.5" fill="#5C7A72">READ          ⟶          WRITE</text>
      <!-- Down line from left box to orchestrator -->
      <g stroke="#5C7A72" stroke-width="1" fill="none">
        <line x1="100" y1="76" x2="100" y2="118"/>
      </g>
      <!-- Up line from orchestrator to right box -->
      <g stroke="#5C7A72" stroke-width="1" fill="none">
        <line x1="620" y1="118" x2="620" y2="76"/>
        <polygon points="620,76 616,84 624,84" fill="#5C7A72"/>
      </g>
      <!-- Orchestrator box -->
      <g transform="translate(100,118)">
        <rect x="0" y="0" width="520" height="64" fill="#FCFAF4" stroke="#C8C0AE" stroke-width="1"/>
        <text x="260" y="28" text-anchor="middle" font-family="EB Garamond, serif" font-style="italic" font-size="15" fill="#1F3A34">${escapeHtml(HEADLINE.bridgeOrchestratorLabel)}</text>
        <text x="260" y="48" text-anchor="middle" font-family="Manrope, sans-serif" font-size="10" letter-spacing="1.2" fill="#8FA39B">${escapeHtml(HEADLINE.bridgeOrchestratorSub).toUpperCase()}</text>
      </g>
    </svg>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

