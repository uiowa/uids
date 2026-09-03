#!/usr/bin/env node
/**
 * Rebuilds claude-design/_ds_manifest.json's `tokens` array from
 * claude-design/tokens.css's :root block. Every other manifest field is
 * preserved untouched; output stays minified (the platform's own format).
 *
 * Exists because the manifest previously had NO generator — it was rebuilt by
 * hand whenever tokens.css changed, and lagged twice (162 vs 199 declarations
 * pre-Buttons; 162 vs 237 through Forms). check-claude-design.mjs CATCHES the
 * lag; this script REPAIRS it. Run after build-tokens.mjs whenever token
 * changes land:  node scripts/build-dc-manifest.mjs
 *
 * `kind` inference was reverse-engineered to reproduce all 237 pre-existing
 * entries exactly (2026-08-15):
 *   1. resolved value (var() chains followed within :root) looks like a color -> color
 *   2. name contains -line-height -> font (before the spacing words — 'height'!)
 *   3. name contains padding|margin|gap|height|width|space|stack|max|offset -> spacing
 *   4. name contains font -> font
 *   5. else -> spacing
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(root, 'claude-design/_ds_manifest.json');

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const css = readFileSync(join(root, 'claude-design/tokens.css'), 'utf8');
const rootBlock = css.match(/:root\s*\{(.*?)\n\}/s)?.[1] ?? '';
const allDecls = new Map(
  [...rootBlock.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
);

function resolve(value, depth = 0) {
  const m = /^var\((--[\w-]+)\)$/.exec(value.trim());
  if (m && depth < 10 && allDecls.has(m[1])) return resolve(allDecls.get(m[1]), depth + 1);
  return value.trim();
}
function inferKind(name, value) {
  const rv = resolve(value);
  if (/^(#|rgba?\(|hsla?\()/.test(rv)) return 'color';
  if (name.includes('-line-height')) return 'font';
  if (/padding|margin|gap|height|width|space|stack|max|offset/.test(name)) return 'spacing';
  if (name.includes('font')) return 'font';
  return 'spacing';
}

manifest.tokens = [...allDecls.entries()]
  .filter(([name]) => name.startsWith('--uiowa-'))
  .map(([name, value]) => ({ name, value, kind: inferKind(name, value), definedIn: 'tokens.css' }));

writeFileSync(MANIFEST, JSON.stringify(manifest));
console.log(`manifest rebuilt: ${manifest.tokens.length} tokens`);
