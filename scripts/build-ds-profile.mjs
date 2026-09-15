#!/usr/bin/env node
/**
 * Generates the Claude Design foundation cards — Type, Colors, Spacing — into
 * claude-design/preview/, plus the one card that has to dc-import a real component
 * (Type Hierarchy) at claude-design/ root, since <dc-import> only resolves a sibling in
 * its OWN directory (probed empirically 2026-09-04: a preview/ importer's `<dc-import
 * name="Alert">` 404s on ./Alert.dc.html — it does not look at the project root).
 *
 * Every rendered value is `var(--uiowa-*)`, resolved the same way build-tokens.mjs
 * resolves tokens/** — this script duplicates that small resolver rather than importing
 * it, matching the existing precedent (build-catalog.mjs does the same). Only the
 * primitive and semantic tiers are needed; no card here reads a component token.
 *
 * Usage:
 *   node scripts/build-ds-profile.mjs           # (re)generate
 *   node scripts/build-ds-profile.mjs --check   # exit 1 if stale
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const PREVIEW_DIR = 'claude-design/preview';
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const REM = 16;

// ---------- token resolution (mirrors build-tokens.mjs / build-catalog.mjs) ----------
function collectLeaves(data, tier, file) {
  const leaves = [];
  (function walk(node, path) {
    if (node && typeof node === 'object' && 'value' in node) {
      leaves.push({ path, value: node.value, tier, file });
      return;
    }
    if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, [...path, k]);
  })(data, []);
  return leaves;
}
const tierFiles = [
  ...readdirSync(join(root, 'tokens/primitives')).map((f) => ({ file: `tokens/primitives/${f}`, tier: 'primitive' })),
  ...readdirSync(join(root, 'tokens/semantic')).map((f) => ({ file: `tokens/semantic/${f}`, tier: 'semantic' })),
].filter((e) => e.file.endsWith('.json'));
const allLeaves = tierFiles.flatMap(({ file, tier }) => collectLeaves(readJson(file), tier, file));
const byDotPath = new Map(allLeaves.map((l) => [l.path.join('.'), l]));

// Same composite-role detection as build-tokens.mjs: a second-level semantic typography
// key that isn't font-family/font-weight is a composite type style (heading-h1, body, …).
// Only its font-size channel is ever emitted as its own CSS custom property.
const COMPOSITE_ROLES = new Set(
  allLeaves
    .filter((l) => l.tier === 'semantic' && l.path[0] === 'typography' && !['font-family', 'font-weight'].includes(l.path[1]))
    .map((l) => l.path[1]),
);

// The CSS custom property build-tokens.mjs emits for a token, or null when it emits none:
// only the font-size channel of a composite type style (heading-h1, body, …) gets its own
// property; the other channels are Figma-only role aliases.
function emittedVarName(dotPath) {
  const parts = dotPath.split('.');
  if (parts[0] === 'typography' && COMPOSITE_ROLES.has(parts[1])) {
    return parts[2] === 'font-size' ? `--uiowa-font-size-${parts[1]}` : null;
  }
  return '--uiowa-' + (parts[0] === 'typography' ? parts.slice(1) : parts).join('-');
}

function resolveRefDot(value) {
  const m = String(value).match(/^\{(.+)\}$/);
  return m ? m[1] : null;
}
// Walks a {ref} chain to the literal value (a hex, a rem string, a bare number, a font stack).
function resolveDeep(value, seen = new Set()) {
  const ref = resolveRefDot(value);
  if (!ref) return value;
  if (seen.has(ref)) throw new Error('circular ref: ' + ref);
  seen.add(ref);
  const target = byDotPath.get(ref);
  if (!target) throw new Error('unresolved ref: ' + ref);
  return resolveDeep(target.value, seen);
}
const resolveDeepPath = (dotPath) => {
  const leaf = byDotPath.get(dotPath);
  if (!leaf) throw new Error('unknown token path: ' + dotPath);
  return resolveDeep(leaf.value);
};
// var() reference for a token: its own custom property when one is emitted, otherwise the
// nearest alias target that has one — heading-h1's font-family aliases
// typography.font-family.display, so it renders as var(--uiowa-font-family-display); its
// line-height aliases the primitive line-height.112 directly. Keeps the specimen bound to
// the same property the SCSS reads, one alias hop at most above the primitive.
function varRef(dotPath) {
  let leaf = byDotPath.get(dotPath);
  if (!leaf) throw new Error('unknown token path: ' + dotPath);
  const seen = new Set();
  for (;;) {
    const name = emittedVarName(leaf.path.join('.'));
    if (name) return `var(${name})`;
    const ref = resolveRefDot(leaf.value);
    if (!ref) throw new Error(`${dotPath}: no emitted CSS custom property anywhere on its alias chain`);
    if (seen.has(ref)) throw new Error('circular ref: ' + ref);
    seen.add(ref);
    leaf = byDotPath.get(ref);
    if (!leaf) throw new Error('unresolved ref: ' + ref);
  }
}
const remToPx = (rem) => {
  const m = String(rem).match(/^([\d.]+)rem$/);
  if (!m) throw new Error(`not a rem value: ${rem}`);
  return Math.round(parseFloat(m[1]) * REM * 100) / 100;
};
const familyLabel = (stack) => stack.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- shared card chrome ----------
// Chrome (borders, section titles, layout) is plain neutral CSS, same convention as the
// Storybook foundation stories (Colors.stories.js / Layout.stories.js) — only the
// SPECIMENS themselves are token-driven. box-sizing:border-box is reproduced everywhere
// because production applies it globally (see any component template's header).
const CHROME = `
  html{box-sizing:border-box}
  *,*::before,*::after{box-sizing:inherit}
  body{margin:0;padding:28px;font-family:system-ui,sans-serif;color:#111;background:#fff}
  h1.card-title{font-size:1.05rem;font-weight:700;margin:0 0 1.35rem;padding-bottom:.5rem;border-bottom:3px solid #FFCD00;text-transform:uppercase;letter-spacing:.02em;}
  section.group{margin-bottom:2rem;}
  section.group:last-child{margin-bottom:0;}
  h2.group-title{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.03em;color:#555;margin:0 0 .85rem;}
  dl.meta{display:flex;flex-wrap:wrap;gap:.25rem 1.5rem;margin:.6rem 0 0;font-size:.78rem;color:#444;}
  dl.meta div{display:flex;gap:.35rem;}
  dl.meta dt{font-weight:700;color:#111;}
  dl.meta dd{margin:0;}
`;
function page(title, bodyHtml, tokensDepth = '../') {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="${tokensDepth}tokens.css" />
    <style>${CHROME}</style>
  </head>
  <body>
    <h1 class="card-title">${esc(title)}</h1>
    ${bodyHtml}
  </body>
</html>
`;
}
function withMarker(marker, html) {
  const lines = html.split('\n');
  return [lines[0], marker, ...lines.slice(1)].join('\n');
}
const marker = ({ group, name, subtitle, viewport }) =>
  `<!-- @dsCard group="${group}" name="${name}" subtitle="${subtitle}" viewport="${viewport}" -->`;

// ---------- Type — Display (Zilla Slab) ----------
function typeDisplayCard() {
  const familyDot = 'typography.heading-h1.font-family';
  const weightDot = 'typography.heading-h1.font-weight';
  const lhDot = 'typography.heading-h1.line-height';
  const family = familyLabel(resolveDeepPath(familyDot));
  const weight = resolveDeepPath(weightDot);
  const lineHeight = resolveDeepPath(lhDot);
  const maxRem = resolveDeepPath('typography.heading-h1.font-size');
  const minRem = resolveDeepPath('typography.heading-h1-mobile.font-size');
  const sample = `<div style="font-family:${varRef(familyDot)};font-weight:${varRef(weightDot)};font-size:${varRef('typography.heading-h1.font-size')};line-height:${varRef(lhDot)};letter-spacing:0;">Simplicity begins here</div>`;
  const meta = `<dl class="meta">
    <div><dt>Family</dt><dd>${esc(family)}</dd></div>
    <div><dt>Weight</dt><dd>${esc(weight)}</dd></div>
    <div><dt>Size</dt><dd>${remToPx(minRem)}px &rarr; ${remToPx(maxRem)}px (clamp, mobile &rarr; desktop)</dd></div>
    <div><dt>Line height</dt><dd>${esc(lineHeight)}</dd></div>
  </dl>`;
  const body = `<section class="group">${sample}${meta}</section>`;
  return {
    file: 'type-display.html',
    html: withMarker(
      marker({ group: 'Brand', name: 'Type — Display (Zilla Slab)', subtitle: 'h1 family, weight, clamp endpoints, line-height', viewport: '640x210' }),
      page('Type — Display (Zilla Slab)', body),
    ),
  };
}

// ---------- Type — Headings & body (Roboto) ----------
function typeHeadingsBodyCard() {
  const headingFamily = familyLabel(resolveDeepPath('typography.font-family.heading'));
  const headingWeight = resolveDeepPath('typography.font-weight.heading');
  const headingLh = resolveDeepPath('typography.heading-h2.line-height');
  const bodyFamily = familyLabel(resolveDeepPath('typography.font-family.body'));
  const bodyWeight = resolveDeepPath('typography.font-weight.body');
  const bodyLh = resolveDeepPath('typography.body.line-height');
  const bodySize = resolveDeepPath('typography.body.font-size');

  const headingRows = ['h2', 'h3', 'h4', 'h5', 'h6']
    .map((tag) => {
      const role = `heading-${tag}`;
      const sizeDot = `typography.${role}.font-size`;
      const sizeRem = resolveDeepPath(sizeDot);
      return `<div style="display:flex;align-items:baseline;gap:1rem;margin-bottom:.5rem;">
        <${tag} style="margin:0;font-family:${varRef('typography.font-family.heading')};font-weight:${varRef(`typography.${role}.font-weight`)};font-size:${varRef(sizeDot)};line-height:${varRef(`typography.${role}.line-height`)};letter-spacing:0;">${tag.toUpperCase()} heading</${tag}>
        <code style="font-size:.72rem;color:#777;">${remToPx(sizeRem)}px</code>
      </div>`;
    })
    .join('');

  const bodyRow = `<p style="margin:.75rem 0 0;font-family:${varRef('typography.font-family.body')};font-weight:${varRef('typography.body.font-weight')};font-size:${varRef('typography.body.font-size')};line-height:${varRef('typography.body.line-height')};">Body copy runs in the same Roboto family as the headings, at a size and line height tuned for long-form reading on university pages.</p>`;

  const body = `
    <section class="group">
      <h2 class="group-title">Headings (h2&ndash;h6)</h2>
      ${headingRows}
      <dl class="meta">
        <div><dt>Family</dt><dd>${esc(headingFamily)}</dd></div>
        <div><dt>Weight</dt><dd>${esc(headingWeight)}</dd></div>
        <div><dt>Line height</dt><dd>${esc(headingLh)} (all of h2&ndash;h6)</dd></div>
      </dl>
    </section>
    <section class="group">
      <h2 class="group-title">Body</h2>
      ${bodyRow}
      <dl class="meta">
        <div><dt>Family</dt><dd>${esc(bodyFamily)}</dd></div>
        <div><dt>Weight</dt><dd>${esc(bodyWeight)}</dd></div>
        <div><dt>Size</dt><dd>${remToPx(bodySize)}px</dd></div>
        <div><dt>Line height</dt><dd>${esc(bodyLh)}</dd></div>
      </dl>
    </section>`;
  return {
    file: 'type-headings-body.html',
    html: withMarker(
      marker({ group: 'Brand', name: 'Type — Headings & body (Roboto)', subtitle: 'h2–h6 + body: family, weight, size, line-height', viewport: '640x540' }),
      page('Type — Headings & body (Roboto)', body),
    ),
  };
}

// ---------- Type — Uppercase (Antonio) ----------
function typeUppercaseCard() {
  // Weight is 300, the uppercase DISPLAY role the handoff plan fixed with the design system
  // owner (the same weight Button declares for its Antonio label — docs/whats-changed.md).
  // It is deliberately NOT the Headline component's own uppercase value: headline.json's
  // headline.uppercase.font-weight is 700 as-shipped (Antonio ships static 100/300/700
  // faces, so bold renders as declared there). A foundation role and a component token
  // may legitimately differ; this is a ruled divergence, not a mismatch to "fix".
  const familyDot = 'typography.font-family.caps';
  const weightDot = 'typography.font-weight.light';
  const family = familyLabel(resolveDeepPath(familyDot));
  const weight = resolveDeepPath(weightDot);
  const sample = `<div style="text-transform:uppercase;font-family:${varRef(familyDot)};font-weight:${varRef(weightDot)};font-size:${varRef('typography.font-size.400')};letter-spacing:0;-webkit-font-smoothing:auto;">Uppercase display</div>`;
  const meta = `<dl class="meta">
    <div><dt>Family</dt><dd>${esc(family)}</dd></div>
    <div><dt>Weight</dt><dd>${esc(weight)} (uppercase display role; the Headline component's own uppercase treatment declares 700 &mdash; contracts/headline.json)</dd></div>
  </dl>`;
  const body = `<section class="group">${sample}${meta}</section>`;
  return {
    file: 'type-uppercase.html',
    html: withMarker(
      marker({ group: 'Brand', name: 'Type — Uppercase (Antonio)', subtitle: 'Caps display family + owner-ruled weight', viewport: '640x210' }),
      page('Type — Uppercase (Antonio)', body),
    ),
  };
}

// ---------- Colors ----------
function colorsCard() {
  const swatch = (dot, label) => {
    const value = resolveDeepPath(dot);
    const cssVar = varRef(dot);
    return `<div style="display:flex;flex-direction:column;gap:.4rem;">
      <div style="height:48px;border:1px solid rgba(0,0,0,.14);background:${cssVar};"></div>
      <strong style="font-size:.82rem;">${esc(label)}</strong>
      <code style="font-size:.7rem;color:#777;">${esc(value)}</code>
    </div>`;
  };
  const grid = (items, columns) => `<div style="display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:1.1rem 1.25rem;">${items.join('')}</div>`;

  const brand = grid([swatch('color.gold', 'Gold'), swatch('color.black', 'Black')], 2);

  const grayKeys = allLeaves.filter((l) => l.file === 'tokens/primitives/colors.json' && l.path[0] === 'color' && l.path[1] === 'gray').map((l) => l.path[2]);
  const gray = grid(grayKeys.map((k) => swatch(`color.gray.${k}`, `Gray ${k}`)), 10);

  const link = grid([swatch('color.link', 'Link')], 1);

  const statusNames = ['success', 'info', 'warning', 'danger'];
  const status = grid(statusNames.map((n) => swatch(`color.status.${n}`, n[0].toUpperCase() + n.slice(1))), 4);

  const alertPairs = statusNames.map(
      (n) => `<div style="display:flex;flex-direction:column;gap:.4rem;">
        <div style="display:flex;height:48px;border:1px solid rgba(0,0,0,.14);">
          <div style="flex:1;background:${varRef(`color.status.${n}-light`)};"></div>
          <div style="width:14px;background:${varRef(`color.status.${n}`)};"></div>
        </div>
        <strong style="font-size:.82rem;">${n[0].toUpperCase() + n.slice(1)}</strong>
        <code style="font-size:.7rem;color:#777;">bg ${esc(resolveDeepPath(`color.status.${n}-light`))} &middot; icon ${esc(resolveDeepPath(`color.status.${n}`))}</code>
      </div>`,
  );
  const alert = grid(alertPairs, 4);

  // Storybook's AllColors order (Brand, Gray, Link, Status, Alert), with the one-row
  // groups paired side by side so the card stays a card rather than a page.
  const pair = (a, b) => `<div style="display:grid;grid-template-columns:2fr 1fr;gap:0 2.5rem;">${a}${b}</div>`;
  const body = `
    ${pair(
      `<section class="group"><h2 class="group-title">Brand</h2>${brand}</section>`,
      `<section class="group"><h2 class="group-title">Link</h2>${link}</section>`,
    )}
    <section class="group"><h2 class="group-title">Gray</h2>${gray}</section>
    ${pair(
      `<section class="group"><h2 class="group-title">Status</h2>${status}</section>`,
      `<section class="group"><h2 class="group-title">Alert</h2>${alert}</section>`,
    ).replace('grid-template-columns:2fr 1fr', 'grid-template-columns:1fr 1fr')}`;
  return {
    file: 'colors.html',
    html: withMarker(
      marker({ group: 'Brand', name: 'Colors', subtitle: 'Brand / Gray / Link / Status / Alert', viewport: '900x680' }),
      page('Colors', body),
    ),
  };
}

// ---------- Spacing ----------
function spacingCard() {
  const bar = (dot, label) => {
    const rem = resolveDeepPath(dot);
    return `<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.45rem;">
      <code style="font-size:.74rem;color:#444;flex:0 0 11rem;">${esc(label)}</code>
      <div style="width:${varRef(dot)};height:18px;background:#FFCD00;border:1px solid #E0B400;flex:0 0 auto;"></div>
      <code style="font-size:.74rem;color:#777;">${rem} &middot; ${remToPx(rem)}px</code>
    </div>`;
  };
  const spaceKeys = allLeaves.filter((l) => l.file === 'tokens/primitives/spacing.json').map((l) => l.path[1]);
  const scale = spaceKeys.map((k) => bar(`space.${k}`, `space/${k}`)).join('');

  const LAYOUT_BARS = [
    ['layout.gutter.width.mobile', 'gutter/width/mobile'],
    ['layout.gutter.width.desktop', 'gutter/width/desktop'],
    ['layout.gutter.height.mobile', 'gutter/height/mobile'],
    ['layout.gutter.height.desktop', 'gutter/height/desktop'],
    ['layout.section.padding.mobile', 'section/padding/mobile'],
    ['layout.section.padding.default', 'section/padding/default'],
    ['layout.section.padding.extra', 'section/padding/extra'],
    ['layout.block.stack.default', 'block/stack/default'],
    ['layout.block.stack.compact', 'block/stack/compact'],
    ['layout.block.stack.extra', 'block/stack/extra'],
  ];
  const layout = LAYOUT_BARS.map(([dot, label]) => bar(dot, label)).join('');

  const body = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 2rem;align-items:start;">
    <section class="group"><h2 class="group-title">Primitive scale</h2>${scale}</section>
    <section class="group"><h2 class="group-title">Layout tokens</h2>${layout}</section>
  </div>`;
  return {
    file: 'spacing.html',
    html: withMarker(
      marker({ group: 'Brand', name: 'Spacing', subtitle: 'Primitive scale + gutter / section-padding / block-stack', viewport: '900x600' }),
      page('Spacing', body),
    ),
  };
}

// ---------- Type Hierarchy (root — dc-imports the real Headline component) ----------
// Lives at claude-design/ root, NOT preview/: <dc-import> only resolves a sibling in its
// own directory (probed 2026-09-04), so a card that imports Headline.dc.html has to sit
// next to it.
function typeHierarchyCard() {
  return `<!doctype html>
<!-- @dsCard group="Brand" name="Type — Hierarchy in use" subtitle="Eyebrow + display + sub + body composition" viewport="700x280" -->
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="./support.js"></script>
  </head>
  <body>
    <x-dc>
      <helmet data-dc-atomics>
        <link rel="stylesheet" href="./tokens.css" />
        <style>
          html{box-sizing:border-box}
          *,*::before,*::after{box-sizing:inherit}
          body{margin:0;padding:24px;font-family:var(--uiowa-font-family-body);background:#fff}
          .hierarchy > * + *{margin-top:.5rem}
          .hierarchy p{font-family:var(--uiowa-font-family-body);font-weight:var(--uiowa-font-weight-body);font-size:var(--uiowa-font-size-body);line-height:var(--uiowa-line-height-170);margin:0}
        </style>
      </helmet>
      <div class="hierarchy">
        <dc-import name="Headline" text="COLLEGE OF ENGINEERING" level="h6" text_style="uppercase"></dc-import>
        <dc-import name="Headline" text="Discover what's next" level="h2" text_style="serif" highlight="{{ true }}"></dc-import>
        <dc-import name="Headline" text="A supporting subheading sets up the paragraph below" level="h3"></dc-import>
        <p>Body copy sits outside the Headline component &mdash; it uses the same body type role shown on the Headings &amp; Body card, so the hierarchy reads as one composed block instead of four unrelated specimens.</p>
      </div>
    </x-dc>
  </body>
</html>
`;
}

// ---------- Emit ----------
const previewCards = [typeDisplayCard(), typeHeadingsBodyCard(), typeUppercaseCard(), colorsCard(), spacingCard()];
const rootCards = [{ file: 'Type Hierarchy.dc.html', html: typeHierarchyCard() }];

const targets = [
  ...previewCards.map((c) => [join(PREVIEW_DIR, c.file), c.html]),
  ...rootCards.map((c) => [join('claude-design', c.file), c.html]),
];

// Every var(--uiowa-*) a card emits must be defined in tokens.css. check-claude-design.mjs
// makes this check for root-level templates only — preview/ is invisible to it — so the
// generator asserts it here, the same way, for every file it writes.
const tokensCss = readFileSync(join(root, 'claude-design/tokens.css'), 'utf8');
const defined = new Set([...tokensCss.matchAll(/(--uiowa-[\w-]+)\s*:/g)].map((m) => m[1]));
for (const [file, html] of targets) {
  for (const [, name] of html.matchAll(/var\((--uiowa-[\w-]+)/g)) {
    if (!defined.has(name)) throw new Error(`${file}: var(${name}) is not defined in claude-design/tokens.css`);
  }
}

if (CHECK) {
  const stale = [];
  for (const [file, expected] of targets) {
    const full = join(root, file);
    if (!existsSync(full) || readFileSync(full, 'utf8') !== expected) stale.push(file);
  }
  if (stale.length) {
    console.error(`DS PROFILE STALE — regenerate with: node scripts/build-ds-profile.mjs\n  ${stale.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`claude-design/preview + Type Hierarchy.dc.html up to date (${targets.length} files)`);
} else {
  if (!existsSync(join(root, PREVIEW_DIR))) mkdirSync(join(root, PREVIEW_DIR), { recursive: true });
  for (const [file, out] of targets) writeFileSync(join(root, file), out);
  console.log(`${targets.length} files written (${previewCards.length} in ${PREVIEW_DIR}/, ${rootCards.length} at claude-design/ root)`);
}
