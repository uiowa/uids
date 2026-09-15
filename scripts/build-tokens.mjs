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

// ---------- Load token leaves ----------
// A leaf is any object carrying $value; everything above it is a group.
function collectLeaves(data, tier, file) {
  const leaves = [];
  (function walk(node, path, inheritedType, inheritedExtensions) {
    if (node && typeof node === 'object' && '$value' in node) {
      leaves.push({
        path,
        value: node.$value,
        type: node.$type,
        inheritedType,
        extensions: node.$extensions ?? inheritedExtensions,
        tier,
        file,
      });
      return;
    }
    if (node && typeof node === 'object') {
      const type = node.$type ?? inheritedType;
      const extensions = node.$extensions ?? inheritedExtensions;
      for (const [k, v] of Object.entries(node)) {
        if (k.startsWith('$')) continue; // group-level $type / $description
        walk(v, [...path, k], type, extensions);
      }
    }
  })(data, [], undefined, undefined);
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

function resolveType(leaf, seen = new Set()) {
  if (leaf.type) return leaf.type;
  const ref = refTarget(leaf.value);
  if (ref) {
    if (seen.has(ref)) throw new Error(`circular type reference: ${ref}`);
    seen.add(ref);
    const target = byDotPath.get(ref);
    if (!target) throw new Error(`unresolved ref: ${ref}`);
    return resolveType(target, seen);
  }
  if (leaf.inheritedType) return leaf.inheritedType;
  throw new Error(`missing $type: ${leaf.path.join('.')}`);
}

const DTCG_TYPES = new Set(['color', 'dimension', 'fontFamily', 'fontWeight', 'number', 'typography']);

function validateValue(value, type, path) {
  const ref = refTarget(value);
  if (ref) {
    const target = byDotPath.get(ref);
    if (!target) throw new Error(`unresolved ref: ${ref}`);
    if (type !== resolveType(target)) {
      throw new Error(`type mismatch: ${path} (${type}) references ${ref} (${resolveType(target)})`);
    }
    resolveDeep(value);
    return;
  }

  if (type === 'dimension') {
    if (!value || typeof value !== 'object' || typeof value.value !== 'number' || !['px', 'rem'].includes(value.unit)) {
      throw new Error(`${path} must be a DTCG dimension`);
    }
  } else if (type === 'color') {
    if (!value || typeof value !== 'object' || typeof value.colorSpace !== 'string' || !Array.isArray(value.components) || value.components.length !== 3) {
      throw new Error(`${path} must be a DTCG color`);
    }
    if (value.colorSpace !== 'srgb' || value.components.some((component) => typeof component !== 'number' || component < 0 || component > 1)
      || (value.alpha !== undefined && (typeof value.alpha !== 'number' || value.alpha < 0 || value.alpha > 1))
      || (value.hex !== undefined && !/^#[0-9a-f]{6}$/i.test(value.hex))) {
      throw new Error(`${path} has an invalid sRGB color value`);
    }
  } else if (type === 'fontFamily') {
    if (!(typeof value === 'string' || (Array.isArray(value) && value.every((family) => typeof family === 'string')))) {
      throw new Error(`${path} must be a font family or ordered list of font families`);
    }
  } else if (type === 'fontWeight') {
    if (typeof value !== 'number' || value < 1 || value > 1000) throw new Error(`${path} must be a font weight from 1 through 1000`);
  } else if (type === 'number') {
    if (typeof value !== 'number') throw new Error(`${path} must be a number`);
  } else if (type === 'typography') {
    const members = { fontFamily: 'fontFamily', fontSize: 'dimension', fontWeight: 'fontWeight', letterSpacing: 'dimension', lineHeight: 'number' };
    if (!value || typeof value !== 'object') throw new Error(`${path} must be a typography object`);
    for (const [member, memberType] of Object.entries(members)) {
      if (!(member in value)) throw new Error(`${path} is missing typography.${member}`);
      validateValue(value[member], memberType, `${path}.${member}`);
    }
  }
}

for (const leaf of allLeaves) {
  const type = resolveType(leaf);
  if (!DTCG_TYPES.has(type)) throw new Error(`unsupported DTCG type: ${type}`);
  validateValue(leaf.value, type, leaf.path.join('.'));
}

const remToPx = (v) => {
  const m = String(v).match(/^([\d.]+)rem$/);
  return m ? parseFloat(m[1]) * REM : null;
};
const dimensionCss = (value) => `${value.value}${value.unit}`;
const GENERIC_FONT_FAMILIES = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui']);
const fontFamilyCss = (value) => (Array.isArray(value) ? value : [value])
  .map((family) => (GENERIC_FONT_FAMILIES.has(family) ? family : `'${family.replace(/'/g, "\\'")}'`))
  .join(', ');
const colorCss = (value) => {
  if (value.hex && value.alpha === undefined) return value.hex;
  if (!value.hex) {
    const alpha = value.alpha === undefined ? '' : ` / ${value.alpha}`;
    return `color(srgb ${value.components.join(' ')}${alpha})`;
  }
  const [red, green, blue] = value.components.map((component) => Math.round(component * 255));
  return `rgba(${red}, ${green}, ${blue}, ${value.alpha})`;
};
const cssValue = (value, type) => {
  const ref = refTarget(value);
  if (ref) return `var(${cssVarName(ref)})`;
  if (type === 'dimension') return dimensionCss(value);
  if (type === 'color') return colorCss(value);
  if (type === 'fontFamily') return fontFamilyCss(value);
  return String(value);
};
const trim = (n) => String(Number(n.toFixed(4)));
const leafValue = (l) => cssValue(l.value, resolveType(l));

// ---------- Build declarations ----------
const decls = []; // [name, value, trailingComment?]

for (const l of allLeaves.filter((l) => l.tier === 'primitive')) {
  decls.push([cssVarName(l.path.join('.')), leafValue(l)]);
}

const CHANNEL_PROP = {
  fontFamily: 'font-family',
  fontWeight: 'font-weight',
  fontSize: 'font-size',
  letterSpacing: 'letter-spacing',
  lineHeight: 'line-height',
};

function dimension(value, name) {
  const resolved = resolveDeep(value);
  if (!resolved || typeof resolved !== 'object' || typeof resolved.value !== 'number' || !['px', 'rem'].includes(resolved.unit)) {
    throw new Error(`${name} must be a DTCG dimension`);
  }
  return resolved;
}

function px(value, name) {
  const resolved = dimension(value, name);
  if (resolved.unit !== 'px') throw new Error(`${name} must use px`);
  return resolved.value;
}

function fontSizeValue(size, fluid) {
  if (fluid === undefined) return cssValue(size);
  if (!fluid || typeof fluid !== 'object') {
    throw new Error('edu.uiowa.fluid must declare its viewport bounds and sizing strategy');
  }
  const min = dimension(size, 'fluid fontSize minimum');
  const minRem = dimensionCss(min);
  const minViewport = px(fluid.minViewport, 'edu.uiowa.fluid.minViewport');
  const maxViewport = px(fluid.maxViewport, 'edu.uiowa.fluid.maxViewport');
  if (maxViewport <= minViewport) throw new Error('edu.uiowa.fluid maxViewport must exceed minViewport');
  const minPx = min.unit === 'rem' ? min.value * REM : null;
  if (minPx === null) throw new Error(`fluid fontSize minimum must be rem: got ${minRem}`);
  let maxRem;
  if (fluid.max) {
    maxRem = dimensionCss(dimension(fluid.max, 'fluid fontSize maximum'));
  } else if (fluid.strategy === 'exponential' && typeof fluid.exponent === 'number') {
    maxRem = `${Number((minPx / REM) ** fluid.exponent).toFixed(4).replace(/\.?0+$/, '')}rem`;
  } else {
    throw new Error('edu.uiowa.fluid must declare max or an exponential strategy and exponent');
  }
  if (minRem === maxRem) return cssValue(size, 'dimension');
  const maxPx = remToPx(maxRem);
  if (maxPx === null) {
    throw new Error(`fluid fontSize maximum must be rem: got ${maxRem}`);
  }
  const slope = Number((((maxPx - minPx) / (maxViewport - minViewport)) * 100).toFixed(4));
  const intercept = Number(((minPx - (slope / 100) * minViewport) / REM).toFixed(4));
  return [
    `clamp(${minRem}, calc(${trim(slope)}vw + ${trim(intercept)}rem), ${maxRem})`,
    `${minPx}px @ ${minViewport}px -> ${maxPx}px @ ${maxViewport}px`,
  ];
}

for (const l of allLeaves.filter((l) => l.tier === 'semantic')) {
  const [first] = l.path;
  if (first === 'color') {
    decls.push([cssVarName(l.path.join('.')), leafValue(l)]);
  } else if (resolveType(l) === 'typography') {
    for (const [channel, prop] of Object.entries(CHANNEL_PROP)) {
      if (!(channel in l.value)) continue;
      const name = `--uiowa-typography-${l.path.slice(1).join('-')}-${prop}`;
      const v = channel === 'fontSize'
        ? fontSizeValue(l.value[channel], l.extensions?.['edu.uiowa.fluid'])
        : cssValue(l.value[channel], { fontFamily: 'fontFamily', fontWeight: 'fontWeight', letterSpacing: 'dimension', lineHeight: 'number' }[channel]);
      decls.push(Array.isArray(v) ? [name, ...v] : [name, v]);
    }
  } else if (first === 'typography') {
    // Role-first, keeping the prefix that cssVarName strips from primitives.
    decls.push([`--uiowa-typography-${l.path.slice(1).join('-')}`, cssValue(l.value, resolveType(l))]);
  } else {
    decls.push([cssVarName(l.path.join('.')), cssValue(l.value, resolveType(l))]);
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
