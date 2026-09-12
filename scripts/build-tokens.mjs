#!/usr/bin/env node
/**
 * Compiles src/tokens/** into src/scss/abstracts/_tokens-generated.scss.
 *
 * Usage
 *   node scripts/build-tokens.mjs           (re)generate
 *   node scripts/build-tokens.mjs --check   exit 1 if the output is stale
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const OUT_SCSS = 'src/scss/abstracts/_tokens-generated.scss';
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const REM = 16;
const CLAMP_VIEWPORT_PX = [600, 1310];
// Derives a fluid style's large end as min ** GROWTH, in rem.
const GROWTH = 1.34;

// ---------- Load token leaves ----------
// A leaf is any object carrying $value; everything above it is a group.
function collectLeaves(data, tier, file) {
  const leaves = [];
  (function walk(node, path) {
    if (node && typeof node === 'object' && '$value' in node) {
      leaves.push({ path, value: node.$value, type: node.$type, extensions: node.$extensions, tier, file });
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
//   typography.font-size.150 -> --uiowa-font-size-150
//   color.text.default       -> --uiowa-color-text-default
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
  // A custom property resolves against an element and a media query has no element to
  // resolve against, so breakpoints stay Sass-only and emit nothing.
  if (head === 'breakpoint') continue;
  decls.push([cssVarName(l.path.join('.')), String(l.value)]);
}

const CHANNEL_PROP = {
  fontFamily: 'font-family',
  fontWeight: 'font-weight',
  fontSize: 'font-size',
  lineHeight: 'line-height',
};

function fontSizeValue(size, fluid) {
  if (!fluid) return cssValue(size);
  const minRem = String(resolveDeep(size));
  const maxRem = fluid === true
    ? `${Number((remToPx(minRem) / REM) ** GROWTH).toFixed(4).replace(/\.?0+$/, '')}rem`
    : String(resolveDeep(fluid));
  if (minRem === maxRem) return cssValue(size);
  const minPx = remToPx(minRem);
  const maxPx = remToPx(maxRem);
  if (minPx === null || maxPx === null) {
    throw new Error(`fluid fontSize endpoints must be rem: got ${minRem} and ${maxRem}`);
  }
  const slope = Number((((maxPx - minPx) / (CLAMP_VIEWPORT_PX[1] - CLAMP_VIEWPORT_PX[0])) * 100).toFixed(4));
  const intercept = Number(((minPx - (slope / 100) * CLAMP_VIEWPORT_PX[0]) / REM).toFixed(4));
  return [
    `clamp(${minRem}, calc(${trim(slope)}vw + ${trim(intercept)}rem), ${maxRem})`,
    `${minPx}px @ ${CLAMP_VIEWPORT_PX[0]}px -> ${maxPx}px @ ${CLAMP_VIEWPORT_PX[1]}px`,
  ];
}

for (const l of allLeaves.filter((l) => l.tier === 'semantic')) {
  const [first] = l.path;
  if (first === 'color') {
    decls.push([cssVarName(l.path.join('.')), leafValue(l)]);
  } else if (l.type === 'typography') {
    for (const [channel, prop] of Object.entries(CHANNEL_PROP)) {
      if (!(channel in l.value)) continue;
      const name = `--uiowa-typography-${l.path.slice(1).join('-')}-${prop}`;
      const v = channel === 'fontSize'
        ? fontSizeValue(l.value[channel], l.extensions?.['edu.uiowa.fluid'])
        : cssValue(l.value[channel]);
      decls.push(Array.isArray(v) ? [name, ...v] : [name, v]);
    }
  } else if (first === 'typography') {
    // Role-first, keeping the prefix that cssVarName strips from primitives.
    decls.push([`--uiowa-typography-${l.path.slice(1).join('-')}`, cssValue(l.value)]);
  } else {
    decls.push([cssVarName(l.path.join('.')), cssValue(l.value)]);
  }
}

// ---------- Emit ----------
const scss = [
  '// GENERATED FILE, do not edit. Source: src/tokens/**. Regenerate: node scripts/build-tokens.mjs',
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
