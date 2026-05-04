// app.js — boot, scene manager, mode toggle, narrate sequencer.

import { renderAct0 }       from './scenes/act0.js';
import { renderAct1 }       from './scenes/act1.js';
import { renderScene1 }     from './scenes/scene-1-brief.js';
import { renderScene2 }     from './scenes/scene-2-assethub.js';
import { renderScene3 }     from './scenes/scene-3-specs.js';
import { renderScene4 }     from './scenes/scene-4-firefly.js';
import { renderScene5 }     from './scenes/scene-5-brand-check.js';
import { renderScene6 }     from './scenes/scene-6-contact.js';
import { renderScene7 }     from './scenes/scene-7-activation.js';
import { mountBreadcrumb, setActiveStage } from './breadcrumb.js';
import { mountCueLayer, attachMarker, revealCue, hideAllCues, addToMarginLog, resetCues } from './cues.js';
import { CLOSING, NARRATE, SCENE_LABELS, SCENE_CAPTIONS, SCENE_TO_STAGE, CUES } from './data.js';

// ============================================================
// App-level state
// ============================================================
const state = {
  view: 'act0',           // 'act0' | 'act1' | 'scene' | 'end'
  scene: 0,               // 0 = none; 1..7 in Act 2
  mode: 'explore',        // 'explore' | 'narrate'
  revealedCues: new Set(),
  timers: [],             // cancellable timeout handles for narrate sequencer
  sceneCleanups: [],      // per-scene cleanup callbacks
  paused: false,
  pendingResume: null,    // { sceneIdx, fromOffset }
  narrateRunning: false,
};

// Narrative-cancellable setTimeout
function nTimeout(fn, ms) {
  const id = setTimeout(() => { fn(); state.timers = state.timers.filter(t => t !== id); }, ms);
  state.timers.push(id);
  return id;
}

function clearAllTimers() {
  state.timers.forEach(t => clearTimeout(t));
  state.timers = [];
}

function runSceneCleanups() {
  state.sceneCleanups.forEach(fn => { try { fn(); } catch(_) {} });
  state.sceneCleanups = [];
}

// ============================================================
// DOM refs
// ============================================================
const $ = sel => document.querySelector(sel);
const refs = {
  act0:        $('#act-0'),
  act1:        $('#act-1'),
  act2:        $('#act-2'),
  endFrame:    $('#end-frame'),
  breadcrumb:  $('#breadcrumb-host'),
  sceneTitle:  $('#scene-title'),
  sceneStage:  $('#scene-stage'),
  controls:    $('#scene-controls'),
  marginLog:   $('#margin-log'),
  cueOverlay:  $('#cue-overlay'),
  meta:        $('#meta-controls'),
};

// expose for cues.js
window.__halcyonState = state;

// ============================================================
// Boot
// ============================================================
function boot() {
  mountCueLayer(refs.cueOverlay, refs.marginLog, state);
  mountBreadcrumb(refs.breadcrumb);
  mountAct2BrandBar();
  mountMetaControls();
  showAct0();
}

function showAct0() {
  state.view = 'act0';
  state.scene = 0;
  refs.act1.classList.add('hidden');
  refs.act2.classList.add('hidden');
  refs.endFrame.classList.add('hidden');
  refs.act0.classList.remove('hidden');
  hideAllCues();
  refs.act0.innerHTML = '';
  renderAct0(refs.act0, { onIntoAct1: () => {
    refs.act0.classList.add('hidden');
    showAct1();
    window.scrollTo({ top: 0, behavior: 'instant' });
    refs.act1.focus({ preventScroll: true });
  }});
  refreshMetaControls();
  refs.act0.focus({ preventScroll: true });
}

function mountAct2BrandBar() {
  const el = document.getElementById('act2-brand-bar');
  if (!el) return;
  el.innerHTML = `
    <div class="act2-brand-bar__left">
      <span class="act2-brand-bar__wordmark">HALCYON</span>
      <span class="act2-brand-bar__sep"></span>
      <span class="act2-brand-bar__active">Halcyon Apparel — Black</span>
      <span class="act2-brand-bar__campaign"><span class="dot"></span>Campaign: Spring ’26 — Quiet Strength</span>
    </div>
    <div class="act2-brand-bar__right">
      <span class="act2-brand-bar__demo">VARIANT ENGINE  ·  WALKTHROUGH</span>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', boot);

// ============================================================
// View management
// ============================================================
function showAct1() {
  state.view = 'act1';
  state.scene = 0;

  refs.act2.classList.add('hidden');
  refs.endFrame.classList.add('hidden');
  refs.act1.classList.remove('hidden');

  hideAllCues();
  refs.act1.innerHTML = '';
  renderAct1(refs.act1, { onBegin: enterAct2 });

  refreshMetaControls();
}

function enterAct2() {
  // Transition: fade Act 1 out, then Act 2 in.
  refs.act1.classList.add('act--exiting');
  setTimeout(() => {
    refs.act1.classList.add('hidden');
    refs.act1.classList.remove('act--exiting');
    refs.act2.classList.remove('hidden');
    state.view = 'scene';
    showScene(1);
    if (state.mode === 'narrate') runNarrateForScene(1);
  }, 600);
}

function showScene(idx) {
  clearAllTimers();
  runSceneCleanups();
  hideAllCues();

  // P12-1: announce scene changes to assistive tech via the aria-live title

  state.scene = idx;
  refs.sceneTitle.innerHTML = `
    <span class="scene-title__label">${escapeHtml(SCENE_LABELS[idx] || '')}</span>
    <span class="scene-title__caption">${escapeHtml(SCENE_CAPTIONS[idx] || '')}</span>
  `;
  setActiveStage(SCENE_TO_STAGE[idx] || []);

  refs.sceneStage.innerHTML = '';
  const ctx = {
    onCueAnchor: (cueId, el) => attachMarker(cueId, el),
    addCleanup: fn => state.sceneCleanups.push(fn),
    isNarrate: () => state.mode === 'narrate',
  };

  switch (idx) {
    case 1: renderScene1(refs.sceneStage, ctx); break;
    case 2: renderScene2(refs.sceneStage, ctx); break;
    case 3: renderScene3(refs.sceneStage, ctx); break;
    case 4: renderScene4(refs.sceneStage, ctx); break;
    case 5: renderScene5(refs.sceneStage, ctx); break;
    case 6: renderScene6(refs.sceneStage, ctx); break;
    case 7: renderScene7(refs.sceneStage, ctx); break;
  }

  renderSceneControls();
  refreshMetaControls();
}

function showEndFrame() {
  clearAllTimers();
  runSceneCleanups();
  hideAllCues();
  state.view = 'end';

  refs.act2.classList.add('hidden');
  refs.endFrame.classList.remove('hidden');
  refs.endFrame.innerHTML = `
    <div class="end-frame__l1">${escapeHtml(CLOSING.l1)}</div>
    <div class="end-frame__l2">${escapeHtml(CLOSING.l2)}</div>
    <div class="end-frame__l3">${escapeHtml(CLOSING.l3)}</div>
    <div class="end-frame__actions">
      <button class="btn-primary" data-act="replay">${escapeHtml(CLOSING.replay)}</button>
      <button class="btn-link" data-act="back">${escapeHtml(CLOSING.back)}</button>
    </div>
  `;
  refs.endFrame.querySelector('[data-act="replay"]').addEventListener('click', () => {
    refs.endFrame.classList.add('hidden');
    refs.act2.classList.remove('hidden');
    state.view = 'scene';
    showScene(1);
    setMode('narrate');
    runNarrateForScene(1);
  });
  refs.endFrame.querySelector('[data-act="back"]').addEventListener('click', () => {
    refs.endFrame.classList.add('hidden');
    showAct1();
  });
  refreshMetaControls();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ============================================================
// Scene controls
// ============================================================
function renderSceneControls() {
  const prevDisabled = state.scene <= 1;
  const isLast = state.scene >= 7;
  refs.controls.innerHTML = `
    <button class="ctrl" data-act="prev" ${prevDisabled?'disabled':''}
            aria-label="Previous scene${prevDisabled ? ' (disabled at first scene)' : ''}">◂  Previous</button>
    <button class="ctrl ctrl--primary" data-act="next"
            aria-label="${isLast ? 'Show closing summary' : 'Next scene'}">${isLast ? 'Show closer' : 'Next  ▸'}</button>
  `;
  refs.controls.querySelector('[data-act="prev"]').addEventListener('click', () => {
    if (state.scene > 1) showScene(state.scene - 1);
  });
  refs.controls.querySelector('[data-act="next"]').addEventListener('click', () => {
    if (state.scene < 7) showScene(state.scene + 1);
    else showEndFrame();
  });
}

// ============================================================
// Meta controls (narrate toggle, return-to-overview)
// ============================================================
function mountMetaControls() {
  refs.meta.innerHTML = `
    <button class="meta-btn" data-act="narrate" aria-label="Toggle narrate mode (auto-play)">▶  Narrate</button>
    <span class="meta-divider" aria-hidden="true"></span>
    <button class="meta-btn" data-act="overview" aria-label="Return to case study overview">↑  Overview</button>
  `;
  refs.meta.querySelector('[data-act="narrate"]').addEventListener('click', toggleNarrate);
  refs.meta.querySelector('[data-act="overview"]').addEventListener('click', () => showAct0());
}

function refreshMetaControls() {
  if (!refs.meta) return;
  const narrateBtn = refs.meta.querySelector('[data-act="narrate"]');
  if (!narrateBtn) return;
  if (state.narrateRunning && !state.paused) {
    narrateBtn.textContent = '⏸  Pause';
    narrateBtn.classList.add('meta-btn--active');
  } else if (state.narrateRunning && state.paused) {
    narrateBtn.textContent = '▶  Resume';
    narrateBtn.classList.add('meta-btn--active');
  } else {
    narrateBtn.textContent = '▶  Narrate';
    narrateBtn.classList.remove('meta-btn--active');
  }
}

function setMode(mode) { state.mode = mode; refreshMetaControls(); }

function toggleNarrate() {
  if (!state.narrateRunning) {
    setMode('narrate');
    state.narrateRunning = true;
    state.paused = false;
    if (state.view === 'act1') runNarrateForAct1();
    else if (state.view === 'scene') runNarrateForScene(state.scene);
    refreshMetaControls();
  } else if (!state.paused) {
    state.paused = true;
    clearAllTimers();
    refreshMetaControls();
  } else {
    state.paused = false;
    if (state.view === 'scene') runNarrateForScene(state.scene);
    else if (state.view === 'act1') runNarrateForAct1();
    refreshMetaControls();
  }
}

// ============================================================
// Narrate-mode sequencer
// ============================================================
function runNarrateForAct1() {
  clearAllTimers();
  nTimeout(() => revealCue(CUES.a, true), NARRATE.act1CueA);
  nTimeout(() => revealCue(CUES.b, true), NARRATE.act1CueB);
  nTimeout(() => revealCue(CUES.c, true), NARRATE.act1CueC);
  nTimeout(() => enterAct2(), NARRATE.act1Hold);
}

function runNarrateForScene(idx) {
  clearAllTimers();
  const def = NARRATE.scenes.find(s => s.id === idx);
  if (!def) return;
  def.events.forEach(ev => {
    nTimeout(() => {
      if (ev.type === 'cue') {
        const cue = CUES[ev.cue];
        if (cue) revealCue(cue, true);
      }
      // c2pa stamp event handled inside the scene by listening to a custom event
      if (ev.type === 'c2pa') {
        document.dispatchEvent(new CustomEvent('halcyon:c2pa-stamp'));
      }
    }, ev.at);
  });
  // Auto-advance on scene end
  nTimeout(() => {
    if (idx < 7) {
      showScene(idx + 1);
      if (state.mode === 'narrate' && state.narrateRunning && !state.paused) {
        runNarrateForScene(idx + 1);
      }
    } else {
      showEndFrame();
      nTimeout(() => {
        state.narrateRunning = false;
        refreshMetaControls();
      }, NARRATE.endHold);
    }
  }, def.duration);
}

// expose for breadcrumb / cues internal nav
window.__halcyon = { showScene, showAct1, showEndFrame };


