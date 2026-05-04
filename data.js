// data.js — the bible. All strings/numbers verbatim from §7, §10.4, §12.
// No string literals appear in scene files. If a value is needed and not
// here, it should be added here, not invented inline.

export const HEADLINE = {
  topEyebrow: 'HALCYON × ADOBE FORWARD DEPLOYED ENGINEERING · CO-INNOVATION',
  title: 'The Halcyon Variant Engine',
  subtitle: 'How one brief becomes 188 variants in four hours.',
  bridgeCaption: 'AssetHub remains the system of record. The Engine reads, orchestrates, writes back. Nothing migrates. Nothing duplicates.',
  bridgeOrchestratorLabel: 'The Variant Engine (stateless)',
  bridgeOrchestratorSub: 'Spec Library · Firefly Orchestrator · Logger',
  bridgeBoxLabel: 'AssetHub',
  bridgeBoxSub: '(canonical)',
  beginButton: 'Begin walkthrough  →',
  bodyOrient: 'The Engine sits between AssetHub (your DAM) and Firefly Services. AssetHub stays canonical. Firefly does the work. We orchestrate the seam.',
};

// §5.2 — eight pipeline nodes
export const STAGES = [
  { num: 1, label: 'Brief',       sub: 'Intake',      primitive: 'GenStudio for Performance Marketing',                                            desc: 'Marketing director files a structured brief — campaign, line, target markets, surfaces.' },
  { num: 2, label: 'AssetHub',    sub: 'Ingest',      primitive: 'Stateless read-through bridge → OpenText',                                       desc: 'The Engine queries the legacy DAM for the canonical hero asset and its rights metadata.' },
  { num: 3, label: 'Spec Library',sub: 'Resolution',  primitive: 'Halcyon Spec Library (versioned JSON)',                                          desc: 'Brand standards, surface specs, and locale rules resolve the brief into 188 generation tasks.' },
  { num: 4, label: 'Firefly',     sub: 'Generation',  primitive: 'Custom Models · Reframe v2 · Object Composite · Translate · Photoshop API',     desc: 'Adobe Firefly Services orchestrates the variant fan-out across 188 parallel jobs.' },
  { num: 5, label: 'Brand Check', sub: 'Compliance',  primitive: 'GenStudio AI Brand Check + MLR/legal hooks',                                     desc: 'Every variant scored against line standards. Below-threshold variants route to human review.' },
  { num: 6, label: 'C2PA',        sub: 'Provenance',  primitive: 'Adobe Content Credentials (signed manifest)',                                    desc: 'Each approved variant stamped with provenance — source, model, briefer, score.' },
  { num: 7, label: 'AssetHub',    sub: 'Writeback',   primitive: 'Stateless read-through bridge → OpenText',                                       desc: 'Approved variants written back to the legacy DAM as child assets with full lineage.' },
  { num: 8, label: 'Activate',    sub: 'Distribution',primitive: 'GenStudio channel connectors',                                                   desc: 'Variants pushed to retail, social, OOH, and e-commerce endpoints.' },
];

// §10.4 — the 8 audience cues, in canonical order
export const CUES = {
  a: { id: 'a', act: 1, scene: 0, voiceTitle: 'VP CONTENT OPS · VELOCITY',        voiceShort: 'VP Content Ops',     anchor: 'spec-library-node',
       body: 'Specs are an artifact your team owns and edits. Versioned in git. Adobe doesn’t own your standards.' },
  b: { id: 'b', act: 1, scene: 0, voiceTitle: 'IT / ENGINEERING · INTEGRATION',  voiceShort: 'IT / Engineering',   anchor: 'bridge-diagram',
       body: 'Stateless read-through. AssetHub stays canonical. The 2018 migration and the 2022 rebuild — both failure modes are structurally avoided.' },
  c: { id: 'c', act: 1, scene: 0, voiceTitle: 'BRAND DIRECTOR · STANDARDS',      voiceShort: 'Brand Director',     anchor: 'firefly-node',
       body: 'Custom Models are line-bounded by design. Apparel-Black trains on Apparel-Black. The model can’t drift outside the line.' },
  d: { id: 'd', act: 2, scene: 1, voiceTitle: 'VP CONTENT OPS · VELOCITY',        voiceShort: 'VP Content Ops',     anchor: 'estimated-variants',
       body: 'One brief. The estimator runs against the Spec Library. The 188 isn’t pulled from the air — it’s surfaces × markets × versions, fully traced.' },
  e: { id: 'e', act: 2, scene: 2, voiceTitle: 'IT / ENGINEERING · INTEGRATION',  voiceShort: 'IT / Engineering',   anchor: 'used-by-engine',
       body: 'AssetHub is the system of record. We read; we never own. The 2018 and 2022 failure modes — neither is reachable from this architecture.' },
  f: { id: 'f', act: 2, scene: 3, voiceTitle: 'JAPAN LEAD · RESONANCE',           voiceShort: 'Japan Lead',         anchor: 'co-authored-by',
       body: 'Tokyo is a co-author of the spec, not a downstream filter on it. Trim zones, character density, the kana mark — all of it lives here, owned by Tokyo.' },
  g: { id: 'g', act: 2, scene: 5, voiceTitle: 'BRAND DIRECTOR · STANDARDS',      voiceShort: 'Brand Director',     anchor: 'review-tiles',
       body: 'Two of 188 below the 0.92 threshold. Auto-routed to human review. The threshold is yours, set per line. Adobe doesn’t see your floor — you do.' },
  h: { id: 'h', act: 2, scene: 7, voiceTitle: 'CMO · SPONSOR',                    voiceShort: 'CMO',                anchor: 'elapsed-time',
       body: 'Brief at nine. Live at one. 188 surfaces. $500 per variant manually — $6.28 through the engine. The unit economics of the long tail flip.' },
};

// §12.5 — brief intake form fields (Scene 1)
export const BRIEF_FORM = {
  title: 'GenStudio · New Campaign Brief',
  fields: [
    { label: 'Campaign name',  value: 'Spring ’26 — Quiet Strength' },
    { label: 'Brand line',     value: 'Halcyon Apparel — Black' },
    { label: 'Hero asset',     value: 'assethub://halcyon/apparel/black/ss26/quiet-strength/hero-001.psd', mono: true },
  ],
  marketsLabel: 'Target markets',
  markets: ['US', 'UK', 'DE', 'JP'],
  surfacesLabel: 'Target surfaces',
  surfaces: [
    'IG square (1:1)',         'Amazon hero tile (1:1)',
    'IG story (9:16)',         'OOH 4×6 sheet',
    'YouTube preroll (16:9)',  'Paid social display (4:5)',
    'Email header (4:1)',      'In-store digital (16:9)',
  ],
  estimateLabel: 'Estimated variants',
  estimateValue: '188',
  estimateNote: '(4 markets × 8 surfaces × ~5.9 copy/A-B versions)',
  cancel: 'Cancel',
  submit: 'Submit  →',
};

// §12.1 — AssetHub metadata block (Scene 2)
export const ASSETHUB = {
  title: 'AssetHub · OpenText',
  tree: [
    { label: 'halcyon',         depth: 0, expand: true },
    { label: 'apparel',         depth: 1, expand: true },
    { label: 'black',           depth: 2, expand: true },
    { label: 'ss26',            depth: 3, expand: true },
    { label: 'quiet-strength',  depth: 4, expand: true },
    { label: 'hero-001.psd',    depth: 5, file: true, selected: true },
    { label: 'hero-002.psd',    depth: 5, file: true },
    { label: 'brief-deck.indd', depth: 5, file: true },
    { label: 'specs.json',      depth: 5, file: true },
  ],
  selectedTitle: 'hero-001.psd',
  meta: [
    { k: 'Line',    v: 'Apparel — Black' },
    { k: 'Surface', v: 'master / 2:3' },
    { k: 'Rights',  v: 'Cleared, perpetual, global' },
    { k: 'Score',   v: '96 / brand-compliant' },
    { k: 'Created', v: '2026-02-14' },
    { k: 'Used by', v: 'Variant Engine ●  stateless read', highlight: true },
  ],
};

// §12.2, §12.3, §12.4 — three JSON files (Scene 3)
export const SPEC_FILES = {
  active: 'locale-rules.json',
  tabs: ['brand-standards.json', 'surface-specs.json', 'locale-rules.json'],
  status: '188 generation tasks resolved · git: specs@a3f4c21 · clean',
  brand: `{
  "brand": "halcyon",
  "line": "apparel-black",
  "version": "2026.04",
  "palette": {
    "primary":   "#1F1815",
    "secondary": "#3B3530",
    "accent":    "#B89968",
    "paper":     "#F5EFE3"
  },
  "typography": {
    "display":  "Halcyon Serif Display",
    "body":     "Halcyon Sans",
    "fallback": "EB Garamond, Manrope"
  },
  "voice": {
    "register":  "considered, restrained, warm",
    "avoid":     ["exclamatory", "casual", "ironic"],
    "headline_constraints": {
      "max_words": 6,
      "no_questions": true
    }
  },
  "compliance_threshold": 0.92,
  "co_authored_by": "halcyon.brand.standards",
  "version_control": "git@halcyon-internal/specs"
}`,
  surface: `{
  "surfaces": [
    {
      "id": "ig-square",
      "label": "Instagram square",
      "aspect": "1:1",
      "dimensions_px": [1080, 1080],
      "subject_lock": "center"
    },
    {
      "id": "ig-story",
      "label": "Instagram story",
      "aspect": "9:16",
      "dimensions_px": [1080, 1920],
      "subject_lock": "center-tight"
    },
    {
      "id": "amz-hero",
      "label": "Amazon hero tile",
      "aspect": "1:1",
      "background": "#F7F2E8",
      "compositing_mode": "object-composite"
    }
  ]
}`,
  locale: `{
  "line": "apparel-black",
  "locale": "ja-JP",
  "typography": {
    "primary": "Noto Serif JP",
    "secondary": "Noto Sans JP",
    "vertical_safe": true,
    "density": "high",
    "kana_glyph_mark": "静"
  },
  "trim_safe_zones": { "top": 48, "bottom": 64 },
  "color_temperature_offset": -120,
  "co_authored_by": "halcyon.studio.tokyo",
  "version": "2026.04",
  "compliance_threshold": 0.94,
  "copy": {
    "headline": "静かな力",
    "cta": "コレクションを見る",
    "detail": "あなたの暮らしに寄り添う仕立て。"
  }
}`,
  // The line in locale-rules.json that anchors cue f
  highlightLine: 11, // 0-indexed: "co_authored_by": "halcyon.studio.tokyo"
};

// §12.6 — Firefly job dashboard rows (Scene 4)
export const JOB_ROWS = [
  { id: 'vrt-0001', surface: 'IG-1:1',        market: 'US', primitive: 'Custom Model · Apparel-Black',         end: 'done' },
  { id: 'vrt-0002', surface: 'IG-9:16',       market: 'US', primitive: 'Reframe v2 · subject-locked',          end: 'done' },
  { id: 'vrt-0003', surface: 'YT-16:9',       market: 'US', primitive: 'Reframe v2 · subject-locked',          end: 'done' },
  { id: 'vrt-0004', surface: 'AMZ-1:1',       market: 'US', primitive: 'Object Composite · ME model',          end: 'done' },
  { id: 'vrt-0005', surface: 'OOH-4×6',       market: 'US', primitive: 'Generative Expand · ratio-fit',        end: 'done' },
  { id: 'vrt-0006', surface: 'IG-1:1',        market: 'UK', primitive: 'Custom Model + Translate (en-GB)',     end: 'done' },
  { id: 'vrt-0007', surface: 'IG-9:16',       market: 'UK', primitive: 'Reframe v2',                           end: 'running' },
  { id: 'vrt-0008', surface: 'IG-1:1',        market: 'DE', primitive: 'Custom Model + Translate (de)',        end: 'running' },
  { id: 'vrt-0009', surface: 'AMZ-1:1',       market: 'DE', primitive: 'Object Composite + legal-overlay',     end: 'running' },
  { id: 'vrt-0010', surface: 'IG-1:1',        market: 'JP', primitive: 'Custom Model · Studio Tokyo',          end: 'queued', tokyoCue: true },
  { id: 'vrt-0011', surface: 'IG-9:16',       market: 'JP', primitive: 'Reframe v2 · ja trim-safe',            end: 'queued' },
  { id: 'vrt-0012', surface: 'OOH-4×6',       market: 'JP', primitive: 'Generative Expand · vertical',         end: 'queued' },
  { id: 'vrt-0013', surface: 'EMAIL-4:1',     market: 'US', primitive: 'Photoshop API · template-fill',        end: 'queued' },
  { id: 'vrt-0014', surface: 'IN-STORE-16:9', market: 'US', primitive: 'Reframe v2 + color grade',             end: 'queued' },
  { id: 'vrt-0015', surface: 'PAID-4:5',      market: 'US', primitive: 'Reframe v2',                           end: 'queued' },
];

// Apparel-Black row (cue c anchor in scene 4)
export const APPAREL_BLACK_JOB_ID = 'vrt-0001';

// §12.6 dashboard top numbers
export const FIREFLY_HEADER = {
  active: '188 / 188',
  latency: '3.2s',
  cost: '$1,180',
};

// §12.7 — brand check 16 scores (Scene 5)
export const BRAND_CHECK = {
  threshold: '0.92',
  passing: '186 / 188',
  avg: '0.96',
  rows: [
    ['.96','.95','.97','.94','.96','.98','.93','.95'],
    ['.96','.94','.89','.96','.95','.97','.88','.96'],
  ],
  flagged: [[1,2],[1,6]], // row, col indices of the two ⚐ tiles
  c2paLine1: 'Each approved variant → Adobe Content Credentials (C2PA)',
  c2paLine2: 'Manifest: source · model · briefer · score · timestamp · sig',
};

// §7.4 — eight surfaces, ordered for the contact sheet
export const SURFACES = [
  { id: 'ig-sq',     label: 'IG sq',     code: 'IG-1:1',       aspectW: 1, aspectH: 1,   subjectLock: 'center' },
  { id: 'ig-st',     label: 'IG st',     code: 'IG-9:16',      aspectW: 9, aspectH: 16,  subjectLock: 'center-tight' },
  { id: 'yt',        label: 'YT',        code: 'YT-16:9',      aspectW: 16, aspectH: 9,  subjectLock: 'left-third' },
  { id: 'amz',       label: 'AMZ',       code: 'AMZ-1:1',      aspectW: 1, aspectH: 1,   subjectLock: 'center', amazonLight: true },
  { id: 'ooh',       label: 'OOH',       code: 'OOH-4×6',      aspectW: 2, aspectH: 3,   subjectLock: 'lower-left' },
  { id: 'paid',      label: 'PaidS',     code: 'PAID-4:5',     aspectW: 4, aspectH: 5,   subjectLock: 'center-low' },
  { id: 'email',     label: 'Email',     code: 'EMAIL-4:1',    aspectW: 4, aspectH: 1,   subjectLock: 'right-third' },
  { id: 'instore',   label: 'In-store',  code: 'IN-STORE-16:9',aspectW: 16, aspectH: 9,  subjectLock: 'center', noCopy: true },
];

// §7.3 — copy lines per locale
export const LOCALES = {
  US: { code: 'US', lang: 'en',    headline: 'Quiet Strength',  cta: 'Shop SS26',            detail: 'Tailored for the way you live.',         eyebrow: 'HALCYON APPAREL — BLACK', font: 'serif', kana: null,                                            disclaimer: null },
  UK: { code: 'UK', lang: 'en-GB', headline: 'Quiet Strength',  cta: 'Shop SS26 collection', detail: 'Tailored for the way you live.',         eyebrow: 'HALCYON APPAREL — BLACK', font: 'serif', kana: null,                                            disclaimer: null },
  DE: { code: 'DE', lang: 'de',    headline: 'Stille Stärke',   cta: 'Jetzt entdecken',      detail: 'Auf Ihren Alltag zugeschnitten.',        eyebrow: 'HALCYON APPAREL — BLACK', font: 'serif', kana: null,                                            disclaimer: '§ Werbeangabe gemäß TMG' },
  JP: { code: 'JP', lang: 'ja',    headline: '静かな力',         cta: 'コレクションを見る',     detail: 'あなたの暮らしに寄り添う仕立て。',       eyebrow: 'HALCYON APPAREL — BLACK', font: 'jp',    kana: '静',                                           disclaimer: null },
};

// §7.4 — orderings
export const MARKETS = ['US', 'UK', 'DE', 'JP'];

// §12.8 — channel activation (Scene 7)
export const CHANNELS = [
  { name: 'Meta',       count: 47, status: 'live'      },
  { name: 'Google',     count: 24, status: 'live'      },
  { name: 'Amazon',     count: 32, status: 'live'      },
  { name: 'Pinterest',  count: 16, status: 'live'      },
  { name: 'TikTok',     count: 22, status: 'live'      },
  { name: 'Retail OOH', count: 28, status: 'scheduled', when: '04 May 06:00' },
  { name: 'In-store',   count: 19, status: 'scheduled', when: '04 May 09:00' },
];
export const ACTIVATION_FOOTER = {
  totalLabel: 'Total',
  total: '188 / 188',
  totalStatus: 'complete',
  filed: '2026-05-03  09:14',
  liveAcross: '188 surfaces, 4 markets',
  elapsed: '4h 17m',
};

// §12.9 — closing frame text
export const CLOSING = {
  l1: '$500 per variant → $6.28 per variant.',
  l2: 'Six weeks → four hours.',
  l3: 'One brief. One hero. 188 ways.',
  replay: 'Replay walkthrough',
  back: '↑ Return to overview',
};

// §11.2 — narrate-mode timings (ms). Each scene's events as offsets from scene start.
export const NARRATE = {
  act1Hold: 30000,
  act1CueA: 5000,
  act1CueB: 12000,
  act1CueC: 20000,
  scenes: [
    { id: 1, duration: 12000, events: [ { at: 8000, type: 'cue', cue: 'd' } ] },
    { id: 2, duration: 10000, events: [ { at: 6000, type: 'cue', cue: 'e' } ] },
    { id: 3, duration: 14000, events: [ { at: 7000, type: 'cue', cue: 'f' } ] },
    { id: 4, duration: 18000, events: [] }, // §11.2: cues NOT shown in scene 4 narrate mode (volume is the message)
    { id: 5, duration: 12000, events: [ { at: 8000, type: 'cue', cue: 'g' }, { at: 10000, type: 'c2pa' } ] },
    { id: 6, duration: 22000, events: [] },
    { id: 7, duration: 10000, events: [ { at: 6000, type: 'cue', cue: 'h' } ] },
  ],
  endHold: 8000,
};

// Scene labels for the breadcrumb / scene header
export const SCENE_LABELS = [
  null,
  'Scene 1 — The Brief Intake',
  'Scene 2 — AssetHub Lookup',
  'Scene 3 — The Spec Library',
  'Scene 4 — Firefly Generation',
  'Scene 5 — Brand Check',
  'Scene 6 — The Contact Sheet',
  'Scene 7 — Activation',
];

// Which pipeline stage is "active" for each scene (1-indexed)
export const SCENE_TO_STAGE = {
  1: [1],
  2: [2],
  3: [3],
  4: [4],
  5: [5, 6],
  6: [7],
  7: [8],
};
