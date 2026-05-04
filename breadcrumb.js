// breadcrumb.js — Act 2 8-stage breadcrumb (sticky thin bar).
// Note: The Act 1 hero pipeline lives in act1.js as a separate, larger
// rendering. The two share visual language; "morphing" between them is
// achieved by both being tasteful, well-aligned 8-node arrays — a true
// SVG morph is overkill at this scale and was scoped down.

import { STAGES } from './data.js';

let host;
let activeStages = [];

export function mountBreadcrumb(el) {
  host = el;
  render();
}

export function setActiveStage(stages /* array of 1-indexed stage nums */) {
  activeStages = stages || [];
  if (host) updateStates();
}

function render() {
  host.innerHTML = `
    <nav class="breadcrumb" aria-label="Pipeline progress">
      <span class="breadcrumb__line"></span>
      ${STAGES.map((s, i) => `
        <button class="breadcrumb-node" data-stage="${s.num}" data-state="future">
          <span class="breadcrumb-node__dot"></span>
          <span class="breadcrumb-node__label">${escapeHtml(s.label)}</span>
        </button>
      `).join('')}
    </nav>
  `;
  host.querySelectorAll('.breadcrumb-node').forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = parseInt(btn.dataset.stage, 10);
      const sceneIdx = stageToScene(stage);
      if (sceneIdx == null) return;
      // Only navigate to past scenes per §6.0
      const cur = window.__halcyonState?.scene || 0;
      if (sceneIdx <= cur) {
        window.__halcyon?.showScene(sceneIdx);
      }
    });
  });
  updateStates();
}

function stageToScene(stage) {
  if (stage === 1) return 1;
  if (stage === 2) return 2;
  if (stage === 3) return 3;
  if (stage === 4) return 4;
  if (stage === 5 || stage === 6) return 5;
  if (stage === 7) return 6;
  if (stage === 8) return 7;
  return null;
}

function updateStates() {
  const cur = window.__halcyonState?.scene || 0;
  host.querySelectorAll('.breadcrumb-node').forEach(btn => {
    const stage = parseInt(btn.dataset.stage, 10);
    const sceneIdx = stageToScene(stage);
    if (activeStages.includes(stage)) {
      btn.dataset.state = 'active';
    } else if (sceneIdx != null && sceneIdx < cur) {
      btn.dataset.state = 'past';
    } else if (sceneIdx === cur && !activeStages.includes(stage)) {
      btn.dataset.state = 'past';
    } else {
      btn.dataset.state = 'future';
    }
    btn.disabled = sceneIdx == null || sceneIdx > cur;
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

