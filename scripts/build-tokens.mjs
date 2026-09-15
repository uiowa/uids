#!/usr/bin/env node
/**
 * Compiles tokens/** into src/scss/abstracts/_tokens-generated.scss — the CSS
 * custom properties the SCSS consumes. Names match the WEB code syntax stamped
 * on every Figma variable (var(--uiowa-*)), so design and code trace 1:1.
 *
 * Emission rules:
 *  - Primitives → plain :root declarations (--uiowa-font-size-150: 1.2rem).
 *  - Semantic role aliases → var() chains (--uiowa-color-text: var(--uiowa-color-black)).
 *  - Semantic composite type styles → --uiowa-font-size-<name>. When a composite
 *    has a -mobile twin with a different size, a fluid clamp() is GENERATED from
 *    the two endpoints over the 600→1310px range (reproduces the hand-computed
 *    clamps previously hardcoded in SCSS, 4-decimal slope/intercept).
 *  - Component tokens → base :root holds the mobile value; @media (min-width: 980px)
 *    and (min-width: 1350px) :root blocks override. Dimension sentinel 0 emits `auto`.
 *    This is the CSS equivalent of the Figma Components-collection modes.
 *  - letter-spacing / text-transform primitives are not emitted (set directly in
 *    styles, per tokens/README). Same for layout.breakpoint.* (CSS custom
 *    properties cannot drive @media queries).
 *  - Tokens flagged `brandChannel: "primary"|"secondary"` (component leaves and
 *    semantic color roles) emit var(--brand-primary/-secondary) — the runtime
 *    theming channel uids_base rethemes per site — instead of the alias chain.
 *    Their {ref} must resolve to the channel default (gold/black); validated
 *    below. Semantic support added for the Background foundation's on-light/
 *    on-dark roles (4.x bg-fg-colors used $secondary/$primary). See tokens/README.
 *
 * The output file is COMMITTED (Storybook and fresh checkouts need it without a
 * build step); `--check` fails if it is stale.
 *
 * Usage:
 *   node scripts/build-tokens.mjs           # (re)generate
 *   node scripts/build-tokens.mjs --check   # exit 1 if stale
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const OUT = 'src/scss/abstracts/_tokens-generated.scss';
const OUT_DC = 'claude-design/tokens.css';
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const REM = 16;
const BP = ['mobile', 'md', 'page'];
const BP_MIN = { md: 980, page: 1350 };
const CLAMP_RANGE = [600, 1310]; // viewport px endpoints of the 4.x fluid type range

// ---------- Load all token leaves ----------
function collectLeaves(data, tier, file) {
  const leaves = [];
  (function walk(node, path) {
    if (node && typeof node === 'object' && 'value' in node) {
      leaves.push({ path, value: node.value, brandChannel: node.brandChannel, tier, file });
      return;
    }
    if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, [...path, k]);
  })(data, []);
  return leaves;
}
const tierFiles = [
  ...readdirSync(join(root, 'tokens/primitives')).map((f) => ({ file: `tokens/primitives/${f}`, tier: 'primitive' })),
  ...readdirSync(join(root, 'tokens/semantic')).map((f) => ({ file: `tokens/semantic/${f}`, tier: 'semantic' })),
  ...readdirSync(join(root, 'tokens/components')).map((f) => ({ file: `tokens/components/${f}`, tier: 'component' })),
].filter((e) => e.file.endsWith('.json'));
const allLeaves = tierFiles.flatMap(({ file, tier }) => collectLeaves(readJson(file), tier, file));
const byDotPath = new Map();
for (const l of allLeaves) byDotPath.set(l.path.join('.'), l);

// Semantic composite type styles are `typography.<role>.<channel>`; every second-level
// key under semantic typography that is NOT font-family/font-weight is such a role.
// The composite emitter below names them by the Figma code syntax (--uiowa-font-size-
// <role>), not by their dot path, so cssVarName has to agree or a {ref} to one emits a
// dangling var(). Only the font-size channel reaches CSS at all — the other five are
// role aliases that exist for Figma text styles — so a ref to any other channel is an
// authoring error worth failing loudly on rather than emitting an undefined property.
const COMPOSITE_ROLES = new Set(
  allLeaves
    .filter((l) => l.tier === 'semantic' && l.path[0] === 'typography'
      && !['font-family', 'font-weight'].includes(l.path[1]))
    .map((l) => l.path[1]),
);

// ---------- Naming: dot path → --uiowa-* custom property ----------
// typography.font-size.150 → --uiowa-font-size-150 ; typography.line-height.170 → --uiowa-line-height-170
// color.gray.150 → --uiowa-color-gray-150 ; brand-bar.site-name.font-size → --uiowa-brand-bar-site-name-font-size
// composite: typography.heading-h1.font-size → --uiowa-font-size-heading-h1
function cssVarName(dotPath) {
  let parts = dotPath.split('.');
  if (parts[0] === 'typography') {
    parts = parts.slice(1);
    if (COMPOSITE_ROLES.has(parts[0])) {
      if (parts[1] !== 'font-size')
        throw new Error(`{typography.${parts[0]}.${parts[1]}} has no CSS custom property: only the `
          + `font-size channel of a composite type style is emitted (the rest are Figma-only role aliases)`);
      return `--uiowa-font-size-${parts[0]}`;
    }
  }
  return '--uiowa-' + parts.join('-');
}

function resolveRefDot(value) {
  const m = String(value).match(/^\{(.+)\}$/);
  return m ? m[1] : null;
}
function resolveDeep(value, seen = new Set()) {
  const ref = resolveRefDot(value);
  if (!ref) return value;
  if (seen.has(ref)) throw new Error('circular ref: ' + ref);
  seen.add(ref);
  const target = byDotPath.get(ref);
  if (!target) throw new Error('unresolved ref: ' + ref);
  return resolveDeep(target.value, seen);
}
// ---------- Brand-channel validation ----------
// A component token flagged `brandChannel: "primary"|"secondary"` rides the runtime
// theming channel (--brand-primary/--brand-secondary, defined in uids-core.scss and
// overridden per-site by uids_base — e.g. grayscale mode injects --brand-primary).
// CSS emission becomes var(--brand-*) so retheming keeps working; the token's {ref}
// stays the channel's DEFAULT resolution so Figma/catalog show what renders by
// default. The flag exists because a plain alias would FLATTEN the channel: the
// Buttons swap shipped --uiowa-button-primary-background: var(--uiowa-color-gold),
// which a grayscale site's --brand-primary override could no longer reach.
const BRAND_DEFAULT = { primary: '{color.gold}', secondary: '{color.black}' };
for (const l of allLeaves) {
  if (l.brandChannel === undefined) continue;
  if (!BRAND_DEFAULT[l.brandChannel])
    throw new Error(`${l.file}: ${l.path.join('.')} brandChannel must be "primary" or "secondary"`);
  if (!(l.tier === 'component' || (l.tier === 'semantic' && l.path[0] === 'color')))
    throw new Error(`${l.file}: ${l.path.join('.')} brandChannel is only supported on component tokens and semantic color roles`);
  if (resolveDeep(l.value) !== resolveDeep(BRAND_DEFAULT[l.brandChannel]))
    throw new Error(`${l.file}: ${l.path.join('.')} has brandChannel "${l.brandChannel}" but its value does not resolve to the channel default ${BRAND_DEFAULT[l.brandChannel]} — the token ref must show the default rendering or Figma would lie`);
}

const remToPx = (v) => {
  const m = String(v).match(/^([\d.]+)rem$/);
  return m ? parseFloat(m[1]) * REM : null;
};
// CSS value for a token value: refs become var() chains, raw values pass through
function cssValue(value) {
  const ref = resolveRefDot(value);
  return ref ? `var(${cssVarName(ref)})` : String(value);
}
const trim = (n) => String(Number(n.toFixed(4)));
// brand-channel leaves emit the live channel var, everything else the alias chain
const leafValue = (l) => (l.brandChannel ? `var(--brand-${l.brandChannel})` : cssValue(l.value));

// ---------- Build declaration sets ----------
const rootDecls = []; // [name, value, comment?]
const mediaDecls = { md: [], page: [] };

// Primitives (skip letter-spacing / text-transform)
for (const l of allLeaves.filter((l) => l.tier === 'primitive')) {
  const head = l.path[0] === 'typography' ? l.path[1] : l.path[0];
  if (head === 'letter-spacing' || head === 'text-transform') continue;
  rootDecls.push([cssVarName(l.path.join('.')), String(l.value)]);
}

// Semantic: role aliases (color.*, typography.font-family.*, typography.font-weight.*)
// and composite type styles (emit font-size channel only; other channels are role aliases)
const semLeaves = allLeaves.filter((l) => l.tier === 'semantic');
const composites = new Map(); // name -> { 'font-size': leaf, ... }
for (const l of semLeaves) {
  if (l.path[0] === 'color') { rootDecls.push([cssVarName(l.path.join('.')), leafValue(l)]); continue; }
  if (l.path[0] === 'layout') {
    // layout.breakpoint.* stays out of CSS: custom properties cannot drive @media
    // queries, so emitting them would only invite misuse. Figma/docs consume them.
    if (l.path[1] === 'breakpoint') continue;
    rootDecls.push([cssVarName(l.path.join('.')), cssValue(l.value)]);
    continue;
  }
  // typography.*
  const [, second, third] = l.path;
  if (second === 'font-family' || second === 'font-weight') {
    rootDecls.push([cssVarName(l.path.join('.')), cssValue(l.value)]);
  } else {
    // composite: typography.<name>.<channel>
    composites.set(second, { ...(composites.get(second) ?? {}), [third]: l });
  }
}
for (const [name, channels] of composites) {
  if (name.endsWith('-mobile')) continue;
  const fs = channels['font-size'];
  if (!fs) continue;
  // matches the Figma semantic variable code syntax: --uiowa-font-size-heading-h1
  const varName = `--uiowa-font-size-${name}`;
  const mobile = composites.get(`${name}-mobile`)?.['font-size'];
  const maxRem = String(resolveDeep(fs.value));
  const minRem = mobile ? String(resolveDeep(mobile.value)) : maxRem;
  if (mobile && minRem !== maxRem) {
    const minPx = remToPx(minRem), maxPx = remToPx(maxRem);
    const slope = Number((((maxPx - minPx) / (CLAMP_RANGE[1] - CLAMP_RANGE[0])) * 100).toFixed(4));
    const intercept = Number(((minPx - (slope / 100) * CLAMP_RANGE[0]) / REM).toFixed(4));
    rootDecls.push([varName, `clamp(${minRem}, calc(${trim(slope)}vw + ${trim(intercept)}rem), ${maxRem})`,
      `${minPx}px @ ${CLAMP_RANGE[0]}px → ${maxPx}px @ ${CLAMP_RANGE[1]}px`]);
  } else {
    rootDecls.push([varName, cssValue(fs.value)]);
  }
}

// Component tokens: breakpoint leaves → :root (mobile) + @media overrides
const compLeaves = allLeaves.filter((l) => l.tier === 'component');
const compVars = new Map(); // varName -> { mobile?, md?, page?, single? }
for (const l of compLeaves) {
  const last = l.path[l.path.length - 1];
  const isBp = BP.includes(last);
  const varName = cssVarName((isBp ? l.path.slice(0, -1) : l.path).join('.'));
  const entry = compVars.get(varName) ?? {};
  if (isBp) entry[last] = l; else entry.single = l;
  compVars.set(varName, entry);
}
const dimValue = (l) => (String(l.value) === '0' ? 'auto' : leafValue(l)); // sentinel 0 = auto
for (const [varName, entry] of compVars) {
  if ('single' in entry) { rootDecls.push([varName, leafValue(entry.single)]); continue; }
  rootDecls.push([varName, dimValue(entry.mobile)]);
  if (dimValue(entry.md) !== dimValue(entry.mobile)) mediaDecls.md.push([varName, dimValue(entry.md)]);
  if (dimValue(entry.page) !== dimValue(entry.md)) mediaDecls.page.push([varName, dimValue(entry.page)]);
}

// ---------- Emit ----------
const lines = [];
lines.push('// GENERATED FILE — do not edit. Source: tokens/**. Regenerate: node scripts/build-tokens.mjs');
lines.push('// Names match the Figma variable code syntax (var(--uiowa-*)) 1:1.');
lines.push('// Component-token responsive values switch here (the CSS equivalent of the');
lines.push('// Figma Components-collection modes); consuming SCSS declares them once, unconditioned.');
lines.push('');
lines.push(':root {');
for (const [name, value, comment] of rootDecls) {
  lines.push(`  ${name}: ${value};${comment ? ' // ' + comment : ''}`);
}
lines.push('}');
for (const bp of ['md', 'page']) {
  if (!mediaDecls[bp].length) continue;
  lines.push('');
  lines.push(`@media (min-width: ${BP_MIN[bp]}px) {`);
  lines.push('  :root {');
  for (const [name, value] of mediaDecls[bp]) lines.push(`    ${name}: ${value};`);
  lines.push('  }');
  lines.push('}');
}
const content = lines.join('\n') + '\n';

// ---------- Emit the Claude Design copy of the same declarations ----------
// claude-design/tokens.css is the SAME generated view in plain CSS: Claude Design
// has no build step, so it consumes custom properties directly. It used to be
// re-emitted by hand, which meant it could silently lag this file (it sat at 162
// declarations while this one had 199) — nothing compared the two. Generating both
// from one pass makes that impossible.
const DC_HEADER = [
  '/* UIDS design tokens — GENERATED from uiowa/uids tokens/. Do not hand-edit; regenerate via the repo pipeline. */',
  // Webfonts are loaded here rather than derived from tokens/: the Claude Design view
  // has no document <head> of its own to put them in.
  // Antonio deliberately requests 300;700 ONLY: production serves static faces at
  // 100/300/700 (no 400), so a declared weight 400 (headline uppercase on gold) has
  // always rendered the 300 face. Loading Google's real 400 here would render a
  // weight production cannot produce.
  "@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&family=Zilla+Slab:wght@400;600;700&family=Antonio:wght@300;700&display=swap');",
  '',
];
const bodyStart = lines.indexOf(':root {');
const dcBody = lines.slice(bodyStart).map((l) => l.replace(/;\s*\/\/.*$/, ';'));
// The dc templates have no uids-core.scss, so the brand theming channels that
// brandChannel-flagged tokens reference must be defined here (default resolutions).
// --link-color is the same class of runtime channel (uids-core.scss:25, overridable
// per-site downstream): backgrounds.css's white/gray link-restore rules reference it
// directly, exactly as production's _background.scss does.
dcBody.splice(1, 0,
  '  --brand-primary: var(--uiowa-color-gold);',
  '  --brand-secondary: var(--uiowa-color-black);',
  '  --link-color: var(--uiowa-color-link);');
const dcContent = [...DC_HEADER, ...dcBody].join('\n') + '\n';

const targets = [
  [OUT, content],
  [OUT_DC, dcContent],
];
if (CHECK) {
  for (const [file, expected] of targets) {
    const full = join(root, file);
    if (!existsSync(full) || readFileSync(full, 'utf8') !== expected) {
      console.error(`TOKENS CSS STALE — regenerate with: node scripts/build-tokens.mjs (${file})`);
      process.exit(1);
    }
  }
  console.log(`${OUT} up to date (${rootDecls.length} declarations, ${mediaDecls.md.length}+${mediaDecls.page.length} responsive overrides)`);
  console.log(`${OUT_DC} up to date (same declarations, plain CSS)`);
} else {
  for (const [file, out] of targets) writeFileSync(join(root, file), out);
  console.log(`${OUT} written (${rootDecls.length} declarations, ${mediaDecls.md.length} md + ${mediaDecls.page.length} page overrides)`);
  console.log(`${OUT_DC} written (same declarations, plain CSS)`);
}
