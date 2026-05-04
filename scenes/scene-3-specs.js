// scene-3-specs.js — §6.3 Spec Library editor. P10: VS Code-style chrome.

import { SPEC_FILES, ADOBE_LOGO_SVG, PRODUCT_CHROME } from '../data.js';

export function renderScene3(host, ctx) {
  const ch = PRODUCT_CHROME.editor;
  host.innerHTML = `
    <div class="scene scene--specs">
      <div class="adobe-surface vscode" style="max-width:1100px; margin:0 auto;">
        <div class="vscode__titlebar">
          <span class="vscode__win"></span>
          <span class="vscode__win vscode__win--y"></span>
          <span class="vscode__win vscode__win--g"></span>
          <span class="vscode__title">specs — Visual Studio Code</span>
          <span style="flex:1"></span>
          <span class="vscode__branch">⎇  main · a3f4c21</span>
        </div>
        <div class="vscode__workspace">
          <div class="vscode__activity-bar">
            <span class="vscode__activity-icon vscode__activity-icon--active">📁</span>
            <span class="vscode__activity-icon">🔍</span>
            <span class="vscode__activity-icon">⎇</span>
            <span class="vscode__activity-icon">⊞</span>
          </div>
          <div class="vscode__sidebar">
            <div class="vscode__explorer-title">EXPLORER</div>
            <div class="vscode__explorer-folder">▾  HALCYON-INTERNAL/SPECS</div>
            ${SPEC_FILES.tabs.map(t => `
              <div class="vscode__explorer-file ${t === SPEC_FILES.active ? 'is-active' : ''}">
                <span class="vscode__file-icon">{}</span>${escapeHtml(t)}
              </div>
            `).join('')}
            <div class="vscode__explorer-file"><span class="vscode__file-icon">▸</span>schemas/</div>
            <div class="vscode__explorer-file"><span class="vscode__file-icon">▸</span>tests/</div>
            <div class="vscode__explorer-file"><span class="vscode__file-icon">M</span>README.md</div>
          </div>
          <div class="vscode__editor-pane">
            <div class="vscode__tabs" id="editor-tabs">
              ${SPEC_FILES.tabs.map(t => `
                <button class="vscode__tab ${t === SPEC_FILES.active ? 'is-active' : ''}" data-tab="${escapeHtml(t)}">
                  <span class="vscode__file-icon">{}</span>${escapeHtml(t)}
                  <span class="vscode__tab-close">×</span>
                </button>
              `).join('')}
            </div>
            <div class="vscode__breadcrumb">specs › <span style="color:#3794FF">locale-rules.json</span></div>
            <div class="vscode__body" id="editor-body"></div>
          </div>
        </div>
        <div class="vscode__statusbar">
          <span class="vscode__status-item vscode__status-item--branch">⎇  main*</span>
          <span class="vscode__status-item">⊙ 0  ⚠ 0</span>
          <span style="flex:1"></span>
          <span class="vscode__status-item">JSON</span>
          <span class="vscode__status-item">UTF-8</span>
          <span class="vscode__status-item">Ln ${SPEC_FILES.highlightLine + 1}, Col 36</span>
          <span class="vscode__status-item vscode__status-item--engine">●  ${escapeHtml(SPEC_FILES.status)}</span>
        </div>
      </div>
    </div>
  `;

  const body = host.querySelector('#editor-body');
  renderTab(body, SPEC_FILES.active);

  host.querySelectorAll('.vscode__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      host.querySelectorAll('.vscode__tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      renderTab(body, tab.dataset.tab);
      if (tab.dataset.tab === 'locale-rules.json') {
        const line = body.querySelector('.is-highlight');
        if (line) ctx.onCueAnchor('f', line);
      }
    });
  });
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

  const lines = src.split('\n');
  body.innerHTML = lines.map((line, i) => {
    const lineNo = i + 1;
    const isHighlight = tabName === 'locale-rules.json' && line.includes('halcyon.studio.tokyo');
    return `
      <div class="vscode__line ${isHighlight ? 'is-highlight' : ''}">
        <span class="vscode__line-num">${lineNo}</span>
        <span class="vscode__line-content">${tokenize(line)}</span>
      </div>
    `;
  }).join('');
}

function tokenize(line) {
  let s = escapeHtml(line);
  s = s.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="tk-key">$1</span>$2');
  s = s.replace(/(?<!class=")("(?:[^"\\]|\\.)*")(?!&gt;)/g, '<span class="tk-str">$1</span>');
  s = s.replace(/\b(\d+\.\d+|\d+)\b/g, '<span class="tk-num">$1</span>');
  s = s.replace(/\b(true|false|null)\b/g, '<span class="tk-bool">$1</span>');
  s = s.replace(/([{}\[\]])/g, '<span class="tk-punct">$1</span>');
  return s;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
