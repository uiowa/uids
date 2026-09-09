#!/usr/bin/env node
/**
 * Compiles src/tokens/** into the SCSS build's custom properties:
 *
 *   src/scss/abstracts/_tokens-generated.scss
 *
 * CSS comes from Sass, not from here. src/scss/tokens.scss is an entrypoint the
 * existing `sass src/scss:dist` build compiles to dist/tokens.css, the same way it
 * handles uids.scss and uids-core.scss. This file's output is committed, because
 * Storybook, fresh checkouts and git-URL installs all read the Sass source without a
 * build step. CI runs `--check`, which exits 1 if the output has gone stale.
 *
 * Token names match the WEB code syntax stamped on Figma variables (var(--uiowa-*)),
 * so one name works in both places.
 *
 * Emission rules
 *  - Primitives emit plain :root declarations (--uiowa-font-size-150: 1.2rem).
 *  - Semantic role aliases emit var() chains (--uiowa-color-text: var(--uiowa-color-black)).
 *  - A semantic color group whose variants are all context names (see CONTEXTS) also
 *    emits the group name itself aimed at default (--uiowa-color-text). Components read
 *    that one name; _background.scss re-points it inside each surface. Variants keep
 *    their own names too, so a consumer outside a bg-- container can address one directly.
 *  - A $type: "typography" style emits every channel it declares, as
 *    --uiowa-typography-<role>-<property>, repeats included. A fontSize written as
 *    { min, max } becomes a clamp() across the 600 -> 1310px viewport range.
 *  - breakpoint primitives emit nothing. A custom property resolves per element and a
 *    media query has no element to resolve against, so Sass reads them via $break-*.
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
      leaves.push({ path, value: node.$value, type: node.$type, tier, file });
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

// ---------- Naming: dot path -> --uiowa-* custom property ----------
// A primitive keeps its property-first path, because a primitive is that thing:
//   typography.font-size.150 -> --uiowa-font-size-150
// A type style is role-first, so one style's channels sort together and never collide
// with the primitives they reference (see emitComposite):
//   typography.heading-h2 + fontSize -> --uiowa-typography-heading-h2-font-size
function cssVarName(dotPath) {
  const parts = dotPath.split('.');
  if (parts[0] === 'typography') return `--uiowa-${parts.slice(1).join('-')}`;
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
  if (head === 'breakpoint') continue;
  decls.push([cssVarName(l.path.join('.')), String(l.value)]);
}

const CHANNEL_PROP = {
  fontFamily: 'font-family',
  fontWeight: 'font-weight',
  fontSize: 'font-size',
  lineHeight: 'line-height',
};

// A fluid fontSize is { min, max }: two endpoint references, from which the clamp() is
// computed across CLAMP_RANGE. Storing the endpoints rather than the clamp string keeps
// the inputs recoverable. Re-point either reference and the slope follows.
function fontSizeValue(size) {
  if (typeof size === 'string') return cssValue(size);
  const minRem = String(resolveDeep(size.min));
  const maxRem = String(resolveDeep(size.max));
  if (minRem === maxRem) return cssValue(size.max);
  const minPx = remToPx(minRem);
  const maxPx = remToPx(maxRem);
  if (minPx === null || maxPx === null) {
    throw new Error(`fluid fontSize endpoints must be rem: got ${minRem} and ${maxRem}`);
  }
  const slope = Number((((maxPx - minPx) / (CLAMP_RANGE[1] - CLAMP_RANGE[0])) * 100).toFixed(4));
  const intercept = Number(((minPx - (slope / 100) * CLAMP_RANGE[0]) / REM).toFixed(4));
  return [
    `clamp(${minRem}, calc(${trim(slope)}vw + ${trim(intercept)}rem), ${maxRem})`,
    `${minPx}px @ ${CLAMP_RANGE[0]}px -> ${maxPx}px @ ${CLAMP_RANGE[1]}px`,
  ];
}

const colorGroups = new Map(); // group -> Set(variant), for color.<group>.<variant>
for (const l of allLeaves.filter((l) => l.tier === 'semantic')) {
  const [first, second] = l.path;
  if (first === 'color') {
    if (l.path.length === 3) {
      colorGroups.set(second, (colorGroups.get(second) ?? new Set()).add(l.path[2]));
    }
    decls.push([cssVarName(l.path.join('.')), leafValue(l)]);
  } else if (l.type === 'typography') {
    // Emit every channel, including ones that repeat a neighbour's value. A consumer
    // reading one style should not have to work out which ones we left off.
    for (const [channel, prop] of Object.entries(CHANNEL_PROP)) {
      if (!(channel in l.value)) continue;
      const name = `--uiowa-typography-${l.path.slice(1).join('-')}-${prop}`;
      const v = channel === 'fontSize' ? fontSizeValue(l.value[channel]) : cssValue(l.value[channel]);
      decls.push(Array.isArray(v) ? [name, ...v] : [name, v]);
    }
  } else {
    decls.push([cssVarName(l.path.join('.')), cssValue(l.value)]);
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
  '// GENERATED FILE, do not edit. Source: src/tokens/**. Regenerate: node scripts/build-tokens.mjs',
  '// Names match the Figma variable code syntax (var(--uiowa-*)) 1:1.',
  '',
  ':root {',
  ...decls.map(([n, v, c]) => `  ${n}: ${v};${c ? ` // ${c}` : ''}`),
  '}',
  '',
].join('\n');

const targets = [[OUT_SCSS, scss]];
const summary = `${decls.length} declarations`;

if (CHECK) {
  let stale = false;
  for (const [file, expected] of targets) {
    const full = join(root, file);
    if (!existsSync(full) || readFileSync(full, 'utf8') !== expected) {
      console.error(`TOKENS STALE. Regenerate with: node scripts/build-tokens.mjs (${file})`);
      stale = true;
    }
  }
  if (stale) process.exit(1);
  console.log(`tokens up to date, ${summary}`);
} else {
  for (const [file, out] of targets) writeFileSync(join(root, file), out);
  console.log(`${OUT_SCSS} written, ${summary}`);
}
