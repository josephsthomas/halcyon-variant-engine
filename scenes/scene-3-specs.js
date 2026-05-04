// scene-3-specs.js — §6.3 Spec Library editor.

import { SPEC_FILES } from '../data.js';

export function renderScene3(host, ctx) {
  host.innerHTML = `
    <div class="scene scene--specs">
      <div class="panel" style="max-width:920px; margin:0 auto;">
        <div class="panel__chrome">specs/</div>
        <div class="editor">
          <div class="editor__tabs" id="editor-tabs">
            ${SPEC_FILES.tabs.map(t => `
              <button class="editor__tab ${t === SPEC_FILES.active ? 'is-active' : ''}" data-tab="${escapeHtml(t)}">${escapeHtml(t)}</button>
            `).join('')}
          </div>
          <div class="editor__body" id="editor-body"></div>
          <div class="editor__statusbar">
            <span class="pulse-dot"></span>
            <span>${escapeHtml(SPEC_FILES.status)}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const body = host.querySelector('#editor-body');
  renderTab(body, SPEC_FILES.active);

  // Tab clicks
  host.querySelectorAll('.editor__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      host.querySelectorAll('.editor__tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      renderTab(body, tab.dataset.tab);
      // Re-anchor cue f if locale-rules
      if (tab.dataset.tab === 'locale-rules.json') {
        const line = body.querySelector('.is-highlight');
        if (line) ctx.onCueAnchor('f', line);
      }
    });
  });

  // Anchor cue f on the highlighted "co_authored_by" line in locale-rules.json
  setTimeout(() => {
    const line = body.querySelector('.is-highlight');
    if (line) ctx.onCueAnchor('f', line);
  }, 200);
}

function renderTab(body, tabName) {
  let src;
  if (tabName === 'brand-standards.json') src = SPEC_FILES.brand;
  else if (tabName === 'surface-specs.json') src = SPEC_FILES.surface;
  else src = SPEC_FILES.locale;

  // The line that anchors cue f only matters for locale-rules.json
  const highlightSubstring = (tabName === 'locale-rules.json') ? '"co_authored_by": "halcyon.studio.tokyo"' : null;

  const lines = src.split('\n');
  body.innerHTML = lines.map((line, i) => {
    const lineNo = i + 1;
    const isHighlight = highlightSubstring && line.includes('halcyon.studio.tokyo');
    return `
      <div class="editor__line ${isHighlight ? 'is-highlight' : ''}">
        <span class="num">${lineNo}</span>
        <span class="content">${tokenize(line)}</span>
      </div>
    `;
  }).join('');
}

function tokenize(line) {
  // Lightweight JSON token coloring without a full parser.
  // Order of replacements matters (escape first, then replace).
  let s = escapeHtml(line);
  // Strings (greedy on quoted content)
  s = s.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
  // Numbers
  s = s.replace(/\b(\d+\.\d+|\d+)\b/g, '<span class="num-val">$1</span>');
  // Punctuation cues kept faint
  s = s.replace(/([{}\[\]:,])/g, '<span class="punct">$1</span>');
  return s;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

