// data.js — the bible. All strings/numbers verbatim from §7, §10.4, §12.
// No string literals appear in scene files. If a value is needed and not
// here, it should be added here, not invented inline.

export const HEADLINE = {
  topEyebrow: 'HALCYON × ADOBE FORWARD DEPLOYED ENGINEERING · CO-INNOVATION',
  title: 'The Halcyon Variant Engine',
  subtitle: 'How one brief becomes 188 variants in four hours.',
  hero: 'One brief.  One hero.  188 ways.',
  bridgeCaption: 'AssetHub remains the system of record. The Engine reads, orchestrates, writes back. Nothing migrates. Nothing duplicates.',
  bridgeOrchestratorLabel: 'The Variant Engine (stateless)',
  bridgeOrchestratorSub: 'Spec Library · Firefly Orchestrator · Logger',
  bridgeBoxLabel: 'AssetHub',
  bridgeBoxSub: '(canonical)',
  beginButton: 'Begin walkthrough  →',
  bodyOrient: 'The Engine sits between AssetHub (your DAM) and Firefly Services. AssetHub stays canonical. Firefly does the work. We orchestrate the seam.',
  bodyOrientLong: 'A thin orchestration layer between AssetHub — Halcyon’s 4.2-petabyte OpenText DAM — and Adobe Firefly Services. A marketing director files one brief. The Engine reads the canonical hero from AssetHub, resolves the brand-standards, surface-spec, and locale-rules JSON into 188 generation tasks, fans them out across Firefly primitives in parallel, scores every output against the brand-compliance threshold, stamps approved variants with C2PA provenance, writes them back to AssetHub as child assets with full lineage, and pushes them to retail, social, OOH, and e-commerce endpoints. Brief at nine. Live at one.',
};

// P11 — Act 0 (pre-page) content. Challenge synthesized from the FDE case-study
// prompt; solution synthesized from the four source MD files.
export const ACT0 = {
  eyebrow: 'ADOBE FIREFLY · FORWARD DEPLOYED ENGINEERING · CASE STUDY',
  title: 'From Pilot to Transformation',
  subtitle: 'A Fortune-100 lifestyle brand’s 6-month path from one successful Firefly pilot to enterprise-scale creative production across 52 brands and 20 markets.',

  challenge: {
    eyebrow: 'THE CHALLENGE',
    headline: 'A pilot worked. The scale-out doesn’t fit any existing product.',
    body: 'Six months ago Halcyon ran a Firefly Services pilot on one brand in one market — Apparel-Green in North America. The pilot cut brief-to-post cycle time by 60% and lifted brand-compliance scores from 78 to 94. The CMO has now asked for transformation across 52 sub-brands and 20 markets. Discovery surfaced where the pilot’s success doesn’t generalize: hero imagery is fast, but the long tail — 500+ localized e-commerce, OOH, and retail variants per campaign, an estimated 18 million variants per year — remains a manual, $340M/year process. Standard Adobe products do not have a one-click localization-and-spec-compliance engine that connects to a 4.2-petabyte legacy OpenText DAM that two prior replacement attempts (2018, 2022) failed to migrate.',
    pillars: [
      { tag: 'SCALE',     line: '52 sub-brands × 20 markets × 500+ surface specs per campaign' },
      { tag: 'VOLUME',    line: '~18M long-tail variants per year — currently manual at ~$340M' },
      { tag: 'NUANCE',    line: 'Brand standards live at the line level (Green/Blue/Black/White/Red), not master-brand' },
      { tag: 'CONSTRAINT',line: 'AssetHub (OpenText, 4.2 PB) must remain canonical — two prior replacements failed' },
    ],
  },

  stakeholders: {
    eyebrow: 'FIVE STAKEHOLDERS · ONE ROOM',
    headline: 'Each carries a legitimate concern rooted in past experience.',
    list: [
      { role: 'Global CMO',                       concern: 'Wants Value Realization beyond speed. Needs to justify the enterprise investment to the board.' },
      { role: 'VP Content Operations',            concern: 'Agile-first. Worried about standardizing before scaling and losing creative experimentation.' },
      { role: 'Brand & Creative Standards',       concern: 'Protective of brand nuance. Fears automation means lower-quality creative.' },
      { role: 'Head of Japanese Market',          concern: 'Tokyo cannot be a downstream filter. Local resonance is non-negotiable.' },
      { role: 'IT / Engineering',                 concern: 'Skeptical of custom builds. Carries the institutional memory of two failed DAM replacements.' },
    ],
  },

  solution: {
    eyebrow: 'THE CO-INNOVATION SOLUTION',
    headline: 'The Halcyon Variant Engine — a thin orchestration layer between AssetHub and Firefly Services.',
    body: 'A stateless bridge that fills the product gap: it reads the canonical hero from AssetHub, resolves a brief into 188 generation tasks against a versioned brand-standards / surface-spec / locale-rules JSON library that Halcyon owns in git, fans out to Firefly primitives in parallel (Custom Models, Reframe v2, Object Composite, Translate, Photoshop API), scores every output against the line’s brand-compliance threshold, stamps approved variants with C2PA Content Credentials, and writes them back to AssetHub as child assets with full lineage. AssetHub stays canonical. The 2018 and 2022 failure modes are structurally avoided.',
    pillars: [
      { tag: 'AUTOMATES',  line: 'Localization + spec-compliance via a versioned spec library Halcyon owns' },
      { tag: 'CONNECTS',   line: 'Stateless read-through bridge to AssetHub — nothing migrates, nothing duplicates' },
      { tag: 'SCALES',     line: '188 parallel Firefly jobs per brief · ~$6.28 per variant · 4-hour brief-to-live' },
      { tag: 'GOVERNS',    line: 'Per-line compliance threshold gate · C2PA provenance on every approved variant' },
    ],
  },

  roadmap: {
    eyebrow: 'THE TRANSFORMATION ROADMAP · 6 MONTHS',
    headline: 'Three waves. 8 / 17 / 29 brands. Compounding leverage, not heroics.',
    body: 'A defensible default — eight weighted criteria scored per brand — with one explicit override (Studio Tokyo swapped into Wave 1 to prove cultural nuance early). Each wave is structurally different work: Wave 1 is hand-tuned with FDE engineers in the room with brand directors; Wave 2 is templated through onboarding squads; Wave 3 is playbook-driven, brand-champion-led. The unit of effort per brand drops ~5× between Wave 1 and Wave 3.',
    waves: [
      { num: 'WAVE 1',  months: 'Months 1–2',  brands: '6 brands',  markets: 'US · UK · DE · JP',                  character: 'Hand-tuned · FDE in the room' },
      { num: 'WAVE 2',  months: 'Months 3–4',  brands: '17 brands', markets: '+ 8 mid-tier (FR, IT, KR, AU/NZ…)', character: 'Templated · onboarding squads' },
      { num: 'WAVE 3',  months: 'Months 5–6',  brands: '29 brands', markets: '+ 8 tail / emerging',                character: 'Playbook · brand-champion-led' },
    ],
    wave1Jobs: [
      'Anchor on the proven success — pilot-brand continuity',
      'Demonstrate commercial scale beyond the pilot — Apparel-Black ($2.8B)',
      'Prove cultural nuance early — Studio Tokyo as Wave 1 co-author',
      'Convert the loudest skeptic — brand standards director as platform co-author',
    ],
  },

  value: {
    eyebrow: 'VALUE & ROI · FIVE LENSES',
    headline: 'Productivity is the floor. Five lenses are the proof.',
    body: 'A defensible Year-1 ROI story for an enterprise AI transformation needs five lenses, not one. Productivity is the easy number every vendor pitch claims. It earns the program funding. The other four prove the transformation actually worked.',
    lenses: [
      { lens: 'SPEED',         metric: 'Brief-to-post 10 d → 3.5 d',     y1: 'Year-1 target' },
      { lens: 'QUALITY',       metric: 'Brand compliance ≥ 95',          y1: 'Audit-grade · per line' },
      { lens: 'REVENUE',       metric: '$85M attributable uplift',       y1: 'CFO-validated methodology' },
      { lens: 'OPTIONALITY',   metric: '12 tier-3 markets newly viable', y1: 'Concept-to-test ≤ 14 d' },
      { lens: 'ORG HEALTH',    metric: 'NCPS ≥ +60 sustained',           y1: 'Custom-code surface declining' },
    ],
    boardNumbers: [
      { value: '$95M',  label: 'Production cost savings', sub: 'Annualized, Year-1' },
      { value: '$85M',  label: 'Attributable revenue uplift', sub: 'Methodology peer-reviewed by CFO Month 2' },
      { value: '3.4×',  label: 'Year-1 ROI multiple', sub: 'Savings + revenue ÷ enterprise investment' },
      { value: '94',    label: 'Brand compliance, sustained', sub: 'Across all 52 brands at Wave 3' },
      { value: '+6 pt', label: 'Brand consideration uplift', sub: 'In tested campaigns, pre/post' },
    ],
  },

  ctaPrimary: 'Open the Variant Engine prototype  →',
  ctaSecondary: 'A 7-scene live walkthrough — what the engine looks like in motion',
};

// HALCYON identity (from halcyon_brand_overview.md)
export const BRAND = {
  wordmark: 'HALCYON',
  tagline: 'Made for the way you live.',
  founded: 'Boulder, Colorado · est. 1968',
  activeBrand: 'Halcyon Apparel — Black',
  activeLine: 'Black',
  activeRevenue: '$2.8B · the largest single sub-brand',
  lines: [
    { code: 'Green', promise: 'Sustainable',  hex: '#7A8F5C', isActive: false },
    { code: 'Blue',  promise: 'Performance',  hex: '#3E5C72', isActive: false },
    { code: 'Black', promise: 'Premium',      hex: '#1F1815', isActive: true  },
    { code: 'White', promise: 'Essentials',   hex: '#E8E2D5', isActive: false },
    { code: 'Red',   promise: 'Collab drops', hex: '#A8553A', isActive: false },
  ],
};

// §7.2 — four headline numbers (the test per §13.5)
export const HEADLINE_METRICS = [
  { value: '$500 → $6.28', label: 'Cost per variant',     foot: 'Manual baseline → Variant Engine' },
  { value: '6 wk → 4h 17m', label: 'Brief to live',       foot: 'Across 188 surfaces, 4 markets'    },
  { value: '188 / 188',    label: 'Variants generated',   foot: 'One hero. Four locales. Eight surfaces.' },
  { value: '0.96 avg',     label: 'Brand compliance',     foot: 'Threshold 0.92 · 186 of 188 passing' },
];

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

// P10 — Adobe product wordmarks as inline SVGs. Recognizable but not pixel-exact:
// the red "A" mark + product name. Used in panel chrome to ground each scene
// in a real Adobe surface.
export const ADOBE_LOGO_SVG = `
  <svg class="adobe-mark" width="22" height="22" viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M167.34 0H240v234L167.34 0zM72.66 0H0v234L72.66 0zM120 86.4l46.5 147.6h-30.4l-13.9-46.5H89l45.4-69.2c-3.4-7.7-8.5-19.4-14.4-31.9z" fill="#EB1000"/>
  </svg>
`;

export const PRODUCT_CHROME = {
  genstudio: {
    productName: 'GenStudio',
    productSub:  'Performance Marketing',
    workspace:   'Halcyon  ▾',
    user:        'M. Chen  ●',
    nav:         ['Campaigns', 'Briefs', 'Assets', 'Activations', 'Insights', 'Settings'],
    activeNav:   'Briefs',
    accent:      '#1473E6',
  },
  assethub: {
    productName: 'AssetHub',
    productSub:  'Adobe Experience Manager · OpenText',
    workspace:   'halcyon-prod  ▾',
    user:        'service-account-engine',
    nav:         ['Assets', 'Collections', 'Search', 'Insights', 'Reports', 'Tools'],
    activeNav:   'Assets',
    accent:      '#0265DC',
  },
  editor: {
    productName: 'specs/',
    productSub:  'github.com/halcyon-internal/specs',
    workspace:   'main · a3f4c21',
    user:        'studio.tokyo',
    nav:         ['EXPLORER', 'SEARCH', 'SOURCE CONTROL', 'EXTENSIONS'],
    activeNav:   'EXPLORER',
    accent:      '#007ACC',
  },
  firefly: {
    productName: 'Firefly Services',
    productSub:  'Job Console · Variant Engine',
    workspace:   'halcyon-prod  ▾',
    user:        'service-account-engine',
    nav:         ['Jobs', 'Models', 'Datasets', 'Webhooks', 'Logs', 'Quotas'],
    activeNav:   'Jobs',
    accent:      '#D7373F',
  },
  brandcheck: {
    productName: 'GenStudio',
    productSub:  'Brand Check · MLR Hooks',
    workspace:   'Halcyon  ▾',
    user:        'M. Chen  ●',
    nav:         ['Campaigns', 'Briefs', 'Assets', 'Activations', 'Insights', 'Settings'],
    activeNav:   'Assets',
    accent:      '#1473E6',
  },
  activation: {
    productName: 'GenStudio',
    productSub:  'Channel Activation',
    workspace:   'Halcyon  ▾',
    user:        'M. Chen  ●',
    nav:         ['Campaigns', 'Briefs', 'Assets', 'Activations', 'Insights', 'Settings'],
    activeNav:   'Activations',
    accent:      '#1473E6',
  },
};

// Unsplash photo bank — dark editorial apparel imagery, indexed per market.
// Each entry is an Unsplash photo ID; loaded from images.unsplash.com CDN with
// per-surface crop params at request time. Per-market chosen so the locales
// read distinct in the contact sheet.
export const UNSPLASH = {
  // Dark / charcoal apparel, editorial 3/4 pose where possible
  US: [
    '1539109136881-3be0616acf4b',
    '1488161628813-04466f872be2',
    '1490481651871-ab68de25d43d',
    '1517630800677-932d836ab680',
  ],
  UK: [
    '1521572163474-6864f9cf17ab',
    '1507003211169-0a1dd7228f2d',
    '1551836022-d5d88e9218df',
    '1503342217505-b0a15ec3261c',
  ],
  DE: [
    '1483985988355-763728e1935b',
    '1516257984-b1b4d707412e',
    '1559563458-527698bf5295',
    '1536243298747-ea8874136d64',
  ],
  // JP — slightly different cast: tighter portraits, warmer tones
  JP: [
    '1492288991661-058aa541ff43',
    '1469334031218-e382a71b716b',
    '1485043163111-b6cd47fece3a',
    '1543610892-0b1f7e6d8ac1',
  ],
  // Hero on the contact sheet (master 2:3)
  HERO: '1539109136881-3be0616acf4b',
};

export function unsplashURL(id, w, h) {
  const cw = Math.max(200, Math.min(1600, Math.round(w)));
  const ch = Math.max(200, Math.min(1600, Math.round(h)));
  return `https://images.unsplash.com/photo-${id}?w=${cw}&h=${ch}&fit=crop&crop=faces,entropy&auto=format&q=70`;
}

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
  'Scene 5 — Brand Check & Provenance',
  'Scene 6 — The Contact Sheet',
  'Scene 7 — Activation',
];

// P9-4: per-scene "what just happened" captions in italic display serif.
// Tells the viewer in plain language what they're watching and why it matters.
export const SCENE_CAPTIONS = [
  null,
  'A marketing director files one structured brief. The Engine resolves it into 188 generation tasks before they finish typing.',
  'The Engine reads the canonical hero from AssetHub. Stateless. Read-through. AssetHub stays canonical — the 2018 migration and 2022 rebuild failure modes are structurally avoided.',
  'The brand standards, surface specs, and locale rules live as versioned JSON in Halcyon’s git. Tokyo co-authors the locale layer. Adobe never owns the standards.',
  'One hero asset fans out across 188 parallel Firefly jobs. Custom Models per line. Reframe v2 per surface. Translate per market. The volume becomes visceral.',
  'Every variant scored against the line’s brand-compliance threshold. Two of 188 below floor → human review. Each approved variant stamped with C2PA provenance.',
  'The bloom. One brief. Four markets. Eight surfaces. 188 brand-compliant, locale-aware variants — visibly distinct where they should be.',
  'Live across 188 surfaces in four hours. Brief filed at nine. Live at one. The unit economics of the long tail flip from $500/variant to $6.28.',
];

// P9-3 bridge — failure-mode footnotes shown next to the diagram
export const BRIDGE_NOTES = {
  story2018: '2018 — vendor DAM replacement. Migration broke rights metadata. $14M abandoned.',
  story2022: '2022 — internal rebuild. Couldn’t handle the line-architecture without infinite customization. 18 months lost.',
  resolution: 'AssetHub stays. The Engine is stateless. Neither failure mode is reachable from this architecture.',
};

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
