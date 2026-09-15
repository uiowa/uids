#!/usr/bin/env node
/**
 * Compiles tokens/ (+ contract metadata) into catalog/ — the machine-readable
 * entry point for AI agents (Claude Design, Figma MCP agents) generating with UIDS.
 *
 * The catalog does NOT restate contract content — contracts/*.json are already
 * agent-readable and remain the single source for component shape. The catalog
 * adds only what compilation computes:
 *   catalog/tokens.json   — flat, alias-resolved token inventory (rem + px, per breakpoint)
 *   catalog/catalog.json  — index: reading order + per-component pointers (contract,
 *                           code, Figma keys, token names)
 *
 * Output is deterministic (sorted keys, no timestamps; content hash in
 * catalog.json) so staleness is detectable.
 *
 * Usage:
 *   node scripts/build-catalog.mjs           # (re)generate catalog/
 *   node scripts/build-catalog.mjs --check   # exit 1 if catalog/ is stale
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

// ---------- Token inventory (flat, alias-resolved) ----------
const BP = ['mobile', 'md', 'page'];
const REM = 16;

function collectLeaves(data, tier, file) {
  const leaves = [];
  (function walk(node, path) {
    if (node && typeof node === 'object' && 'value' in node) {
      leaves.push({ path, value: node.value, comment: node.comment, tier, file });
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

function resolve(value, seen = new Set()) {
  const m = String(value).match(/^\{(.+)\}$/);
  if (!m) return { resolved: value, chain: [] };
  const ref = m[1];
  if (seen.has(ref)) throw new Error('circular ref: ' + ref);
  seen.add(ref);
  const target = byDotPath.get(ref);
  if (!target) throw new Error('unresolved ref: ' + ref);
  const inner = resolve(target.value, seen);
  return { resolved: inner.resolved, chain: [refToSlash(ref), ...inner.chain] };
}
// dot path → slash token name; typography.font-size.150 → font/size/150; color.gold → color/gold;
// component paths (brand-bar.site-name.font-size) join verbatim.
const TYPO_HEADS = {
  'font-family': 'font/family', 'font-weight': 'font/weight', 'font-size': 'font/size',
  'line-height': 'font/line-height', 'letter-spacing': 'font/letter-spacing', 'text-transform': 'font/text-transform',
};
function refToSlash(dot) {
  const parts = dot.split('.');
  if (parts[0] === 'typography') {
    parts.shift();
    if (TYPO_HEADS[parts[0]]) parts[0] = TYPO_HEADS[parts[0]];
  }
  return parts.join('/');
}
const remToPx = (v) => {
  const m = String(v).match(/^([\d.]+)rem$/);
  return m ? Number((parseFloat(m[1]) * REM).toFixed(2)) : undefined;
};

const tokens = {};
for (const l of allLeaves) {
  const last = l.path[l.path.length - 1];
  const isBp = l.tier === 'component' && BP.includes(last);
  const namePath = isBp ? l.path.slice(0, -1) : l.path;
  const name = refToSlash(namePath.join('.'));
  tokens[name] ??= { tier: l.tier, source: l.file };
  const entry = tokens[name];
  const { resolved, chain } = resolve(l.value);
  const record = { value: l.value, resolved };
  const px = remToPx(resolved);
  if (px !== undefined) record.px = px;
  if (chain.length) record.ref = chain[0];
  if (l.comment) entry.note = entry.note ?? l.comment;
  if (isBp) { (entry.breakpoints ??= {})[last] = record; }
  else Object.assign(entry, record);
}
for (const name of Object.keys(tokens)) {
  if (name.endsWith('-mobile') && tokens[name.replace(/-mobile$/, '')]) {
    tokens[name].mobileTwinOf = name.replace(/-mobile$/, '');
  }
}

// ---------- Component index entries (pointers, not restatements) ----------
const contractFiles = readdirSync(join(root, 'contracts'))
  .filter((f) => f.endsWith('.json') && !['contract.schema.json', 'rules.json'].includes(f));

const components = contractFiles.map((f) => {
  const c = readJson(`contracts/${f}`);
  for (const t of c.tokensUsed ?? []) {
    if (!tokens[t]) throw new Error(`${f}: tokensUsed "${t}" not in token inventory`);
  }
  return {
    id: c.name,
    name: c.identity?.figma?.componentSetName ?? c.name,
    version: c.version,
    description: c.description,
    contract: `contracts/${f}`,
    code: c.identity.codePath,
    figma: {
      componentSetId: c.identity.figma?.componentSetId || null,
      componentKey: c.identity.figma?.componentKey || null,
      page: c.identity.figma?.page || null,
    },
    storybook: c.identity.storybookUrl ?? c.identity.storybookId ?? null,
    options: (c.options ?? []).map((o) => o.name),
    tokens: c.tokensUsed ?? [],
  };
});

// ---------- Assemble + write ----------
const stable = (obj) => JSON.stringify(obj, null, 2) + '\n';
const rules = readJson('contracts/rules.json');

const files = new Map();
const sortedTokens = Object.fromEntries(Object.entries(tokens).sort(([a], [b]) => a.localeCompare(b)));
const TOKEN_BLURB = 'Root font size 16px. Component-tier breakpoints: mobile / md (>=980px) / page (>=1350px). Semantic *-mobile twins are the 600px clamp endpoints (Figma Semantic collection mode "small (600)").';

files.set('catalog/tokens.json', stable({
  description: 'Flat, alias-resolved UIDS token inventory, WITH provenance. Derived from tokens/ — do not edit. ' + TOKEN_BLURB,
  count: Object.keys(tokens).length,
  tokens: sortedTokens,
}));

// The same inventory minus `note` and `source` — the two fields that exist for a human
// reading a token's history, not for an agent deciding which token to use.
//
// This is the file to hand an agent. Measured 2026-08-21: `note` alone is 95 KB across 498
// of 709 tokens, and dropping it with `source` takes the inventory from ~66k tokens to ~30k
// — a 55% cut in the single largest thing a governed session loads. The provenance is not
// deleted, just not paid for on every turn: tokens.json still has it, and each token's
// authored source is one grep away.
//
// Emitted ALWAYS rather than behind a flag, deliberately: every generated file in this repo
// is regenerated and --check'd, and a flag-gated output is one nobody regenerates until it
// has silently drifted.
const LEAN_DROP = ['note', 'source'];
const leanTokens = Object.fromEntries(
  Object.entries(sortedTokens).map(([name, t]) => {
    const kept = { ...t };
    for (const f of LEAN_DROP) delete kept[f];
    return [name, kept];
  })
);
files.set('catalog/tokens.lean.json', stable({
  description: 'Flat, alias-resolved UIDS token inventory, WITHOUT provenance — the agent-facing copy. Same tokens and values as catalog/tokens.json with `note` and `source` dropped (~55% smaller). Read this one when generating; read tokens.json when you need to know WHY a token holds its value. Derived from tokens/ — do not edit. ' + TOKEN_BLURB,
  count: Object.keys(leanTokens).length,
  omittedFields: LEAN_DROP,
  provenance: 'catalog/tokens.json',
  tokens: leanTokens,
}));

const index = {
  description: 'UIDS agent catalog — entry point for generating designs or code with this system. DERIVED by scripts/build-catalog.mjs; do not edit by hand. This index LINKS to the authored sources rather than restating them.',
  readingOrder: [
    'contracts/rules.json — governance rules (judge = mechanically checked, agent = guidance)',
    'contracts/<component>.json — the authored contract: options, slots, behavior, a11y, geometry (linked per component below)',
    'catalog/tokens.lean.json — resolved values (rem/px, per breakpoint) for every token name a contract references. READ THIS ONE when generating: it is the same inventory as tokens.json with per-token provenance dropped, and roughly half the size.',
    'catalog/tokens.json — the same inventory WITH provenance. Read it when you need to know why a token holds the value it does, not to pick a token.',
  ],
  rules: 'contracts/rules.json',
  tokens: 'catalog/tokens.lean.json',
  tokensWithProvenance: 'catalog/tokens.json',
  figmaFile: 'https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS',
  regenerate: 'node scripts/build-catalog.mjs',
  components,
  tokenCount: Object.keys(tokens).length,
  ruleCount: rules.rules.length,
};
const hasher = createHash('sha256');
for (const [p, c] of [...files.entries()].sort(([a], [b]) => a.localeCompare(b))) hasher.update(p).update(c);
hasher.update('catalog/catalog.json').update(stable({ ...index, contentHash: null }));
index.contentHash = 'sha256:' + hasher.digest('hex');
files.set('catalog/catalog.json', stable(index));

if (CHECK) {
  const stale = [];
  for (const [p, content] of files) {
    const full = join(root, p);
    if (!existsSync(full) || readFileSync(full, 'utf8') !== content) stale.push(p);
  }
  const expected = new Set([...files.keys()].map((p) => p.replace('catalog/', '')));
  for (const f of readdirSync(join(root, 'catalog'))) {
    if (!expected.has(f)) stale.push(`catalog/${f} (unexpected file)`);
  }
  if (stale.length) {
    console.error('CATALOG STALE — regenerate with: node scripts/build-catalog.mjs');
    for (const p of stale) console.error('  differs: ' + p);
    process.exit(1);
  }
  console.log(`catalog up to date (${components.length} components, ${Object.keys(tokens).length} tokens, ${rules.rules.length} rules)`);
} else {
  if (existsSync(join(root, 'catalog'))) rmSync(join(root, 'catalog'), { recursive: true });
  mkdirSync(join(root, 'catalog'), { recursive: true });
  for (const [p, content] of files) writeFileSync(join(root, p), content);
  console.log(`catalog written (${components.length} components, ${Object.keys(tokens).length} tokens, ${rules.rules.length} rules)`);
  console.log(index.contentHash);
}
