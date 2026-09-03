#!/usr/bin/env node
/**
 * Compiles src/tokens/** into two generated views:
 *
 *   src/scss/abstracts/_tokens-generated.scss   the SCSS build's custom properties
 *   css/tokens.css                              the package entry point for consumers
 *                                               with no Sass toolchain
 *
 * Both are emitted from one pass so they cannot diverge. Both are COMMITTED —
 * Storybook, fresh checkouts, and git-URL installs all need them without a build
 * step — and `--check` fails if either is stale (wired into CI).
 *
 * Token names match the WEB code syntax stamped on Figma variables (var(--uiowa-*)),
 * so design and code trace 1:1.
 *
 * Emission rules
 *  - Primitives emit plain :root declarations (--uiowa-font-size-150: 1.2rem).
 *  - Semantic role aliases emit var() chains (--uiowa-color-text: var(--uiowa-color-black)).
 *  - A semantic color group whose variants are all context names (see CONTEXTS) also
 *    emits the group name itself aimed at default (--uiowa-color-text). Components read
 *    that one name; _background.scss re-points it inside each surface. Variants keep
 *    their own names too, so a consumer outside a bg-- container can address one directly.
 *  - Semantic composite type styles emit their font-size channel as
 *    --uiowa-font-size-<role>. When a composite has a -mobile twin with a different
 *    size, a fluid clamp() is generated from the two endpoints across the
 *    600 -> 1310px viewport range, reproducing the clamps 4.x hardcoded by hand.
 *  - letter-spacing and text-transform primitives are not emitted; they are set
 *    directly in styles. layout.breakpoint.* is not emitted either, because custom
 *    properties cannot drive @media queries.
 *
 * Usage
 *   node scripts/build-tokens.mjs           (re)generate
 *   node scripts/build-tokens.mjs --check   exit 1 if either output is stale
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const OUT_SCSS = 'src/scss/abstracts/_tokens-generated.scss';
const OUT_CSS = 'css/tokens.css';
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const REM = 16;
const CLAMP_RANGE = [600, 1310]; // viewport px endpoints of the 4.x fluid type range

// Surface contexts. A semantic color group whose variants are all named here emits an
// unsuffixed pointer (--uiowa-color-text) alongside its variants, aimed at default.
// Re-pointing it per surface is scss/components/_background.scss's job: which class means
// which context is markup knowledge, not token data.
const CONTEXT_NAMES = new Set(['default', 'gold', 'inverse']);
const { version } = readJson('package.json');

// ---------- Load token leaves ----------
// A leaf is any object carrying $value; everything above it is a group.
function collectLeaves(data, tier, file) {
  const leaves = [];
  (function walk(node, path) {
    if (node && typeof node === 'object' && '$value' in node) {
      leaves.push({ path, value: node.$value, tier, file });
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k.startsWith('$')) continue; // group-level $type / $description
        walk(v, [...path, k]);
      }
    }
  })(data, []);
  return leaves;
}

const tierFiles = ['primitives', 'semantic'].flatMap((tier) =>
  readdirSync(join(root, 'src/tokens', tier))
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ file: `src/tokens/${tier}/${f}`, tier: tier === 'primitives' ? 'primitive' : 'semantic' })),
);
const allLeaves = tierFiles.flatMap(({ file, tier }) => collectLeaves(readJson(file), tier, file));
const byDotPath = new Map(allLeaves.map((l) => [l.path.join('.'), l]));

// Composite type styles are `typography.<role>.<channel>`. Every second-level key
// under semantic typography that is not font-family/font-weight is such a role.
// The emitter names them --uiowa-font-size-<role> rather than by dot path, so
// cssVarName has to agree or a {ref} to one would emit a dangling var().
const COMPOSITE_ROLES = new Set(
  allLeaves
    .filter((l) => l.tier === 'semantic' && l.path[0] === 'typography'
      && !['font-family', 'font-weight'].includes(l.path[1]))
    .map((l) => l.path[1]),
);

// ---------- Naming: dot path -> --uiowa-* custom property ----------
// color.gray.150            -> --uiowa-color-gray-150
// typography.font-size.150  -> --uiowa-font-size-150
// typography.heading-h1.*   -> --uiowa-font-size-heading-h1  (font-size channel only)
function cssVarName(dotPath) {
  let parts = dotPath.split('.');
  if (parts[0] === 'typography') {
    parts = parts.slice(1);
    if (COMPOSITE_ROLES.has(parts[0])) {
      if (parts[1] !== 'font-size') {
        throw new Error(`{typography.${parts[0]}.${parts[1]}} has no CSS custom property: only the `
          + 'font-size channel of a composite type style is emitted (the rest are Figma-only role aliases)');
      }
      return `--uiowa-font-size-${parts[0]}`;
    }
  }
  return `--uiowa-${parts.join('-')}`;
}

const refTarget = (value) => (String(value).match(/^\{(.+)\}$/) ?? [])[1] ?? null;

function resolveDeep(value, seen = new Set()) {
  const ref = refTarget(value);
  if (!ref) return value;
  if (seen.has(ref)) throw new Error(`circular ref: ${ref}`);
  seen.add(ref);
  const target = byDotPath.get(ref);
  if (!target) throw new Error(`unresolved ref: ${ref}`);
  return resolveDeep(target.value, seen);
}

const remToPx = (v) => {
  const m = String(v).match(/^([\d.]+)rem$/);
  return m ? parseFloat(m[1]) * REM : null;
};
const cssValue = (value) => {
  const ref = refTarget(value);
  return ref ? `var(${cssVarName(ref)})` : String(value);
};
const trim = (n) => String(Number(n.toFixed(4)));
const leafValue = (l) => cssValue(l.value);

// ---------- Build declarations ----------
const decls = []; // [name, value, trailingComment?]

for (const l of allLeaves.filter((l) => l.tier === 'primitive')) {
  const head = l.path[0] === 'typography' ? l.path[1] : l.path[0];
  if (head === 'letter-spacing' || head === 'text-transform') continue;
  decls.push([cssVarName(l.path.join('.')), String(l.value)]);
}

const composites = new Map(); // role -> { channel: leaf }
const colorGroups = new Map(); // group -> Set(variant), for color.<group>.<variant>
for (const l of allLeaves.filter((l) => l.tier === 'semantic')) {
  const [first, second, third] = l.path;
  if (first === 'color') {
    if (l.path.length === 3) {
      colorGroups.set(second, (colorGroups.get(second) ?? new Set()).add(third));
    }
    decls.push([cssVarName(l.path.join('.')), leafValue(l)]);
  } else if (first === 'layout') {
    if (second === 'breakpoint') continue;
    decls.push([cssVarName(l.path.join('.')), cssValue(l.value)]);
  } else if (second === 'font-family' || second === 'font-weight') {
    decls.push([cssVarName(l.path.join('.')), cssValue(l.value)]);
  } else {
    composites.set(second, { ...(composites.get(second) ?? {}), [third]: l });
  }
}

for (const [role, channels] of composites) {
  if (role.endsWith('-mobile')) continue;
  const fontSize = channels['font-size'];
  if (!fontSize) continue;
  const varName = `--uiowa-font-size-${role}`;
  const mobile = composites.get(`${role}-mobile`)?.['font-size'];
  const maxRem = String(resolveDeep(fontSize.value));
  const minRem = mobile ? String(resolveDeep(mobile.value)) : maxRem;

  if (mobile && minRem !== maxRem) {
    const minPx = remToPx(minRem);
    const maxPx = remToPx(maxRem);
    const slope = Number((((maxPx - minPx) / (CLAMP_RANGE[1] - CLAMP_RANGE[0])) * 100).toFixed(4));
    const intercept = Number(((minPx - (slope / 100) * CLAMP_RANGE[0]) / REM).toFixed(4));
    decls.push([
      varName,
      `clamp(${minRem}, calc(${trim(slope)}vw + ${trim(intercept)}rem), ${maxRem})`,
      `${minPx}px @ ${CLAMP_RANGE[0]}px -> ${maxPx}px @ ${CLAMP_RANGE[1]}px`,
    ]);
  } else {
    decls.push([varName, cssValue(fontSize.value)]);
  }
}

// ---------- Context group pointers ----------
// A group qualifies when every one of its variants names a context and one of them is
// default. That excludes color.bg, whose variants are surfaces (black/gray/white) rather
// than contexts. Each qualifying group emits its bare name aimed at the default variant,
// so components read one name; _background.scss re-points it inside a surface.
for (const [group, variants] of colorGroups) {
  if (!variants.has('default') || ![...variants].every((v) => CONTEXT_NAMES.has(v))) continue;
  const name = `--uiowa-color-${group}`;
  if (decls.some(([n]) => n === name)) {
    throw new Error(`color.${group} has context variants, so the generator emits ${name}; `
      + 'remove the token of that name or rename the group');
  }
  decls.push([name, `var(--uiowa-color-${group}-default)`]);
}

// ---------- Emit ----------
// The SCSS view keeps trailing // comments (Sass strips them); the CSS view drops
// them rather than converting, so the published artifact stays declarations only.
const scss = [
  '// GENERATED FILE — do not edit. Source: src/tokens/**. Regenerate: node scripts/build-tokens.mjs',
  '// Names match the Figma variable code syntax (var(--uiowa-*)) 1:1.',
  '',
  ':root {',
  ...decls.map(([n, v, c]) => `  ${n}: ${v};${c ? ` // ${c}` : ''}`),
  '}',
  '',
].join('\n');

// css/tokens.css is the same declarations as a standalone stylesheet, for consumers with
// no Sass toolchain (Claude Design systems, prototypes, web components). Legacy aliases
// are deliberately NOT included: they live in uids-core.scss, which serves the Sass and
// full-CSS paths. Fonts are not loaded here either — an @import would force a network
// request on every consumer and take an opinion about font loading that belongs to the page.
const css = [
  `/* Iowa Design System tokens — v${version} — GENERATED from src/tokens/**. Do not edit. */`,
  '/* Regenerate: node scripts/build-tokens.mjs */',
  '',
  ':root {',
  ...decls.map(([n, v]) => `  ${n}: ${v};`),
  '}',
  '',
].join('\n');

const targets = [[OUT_SCSS, scss], [OUT_CSS, css]];
const summary = `${decls.length} declarations`;

if (CHECK) {
  let stale = false;
  for (const [file, expected] of targets) {
    const full = join(root, file);
    if (!existsSync(full) || readFileSync(full, 'utf8') !== expected) {
      console.error(`TOKENS STALE — regenerate with: node scripts/build-tokens.mjs (${file})`);
      stale = true;
    }
  }
  if (stale) process.exit(1);
  console.log(`tokens up to date — ${summary}`);
} else {
  for (const [file, out] of targets) writeFileSync(join(root, file), out);
  console.log(`${OUT_SCSS} + ${OUT_CSS} written — ${summary}`);
}
