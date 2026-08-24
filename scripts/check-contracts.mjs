#!/usr/bin/env node
/**
 * Contract drift checker: verifies that component contracts, component code,
 * and component tokens agree. The contract↔Figma half of the check runs via
 * the Figma MCP readback snippet documented in contracts/README.md.
 *
 * Checks:
 *  1. Contract shape (minimal structural validation against contract.schema.json rules)
 *  2. Every contract option with code.prop exists as a Vue prop (type + default match);
 *     every Vue prop is claimed by some contract option
 *  3. Every tokensUsed entry resolves to a token in tokens/ (component contracts
 *     use tokens/components; foundation contracts — identity.codePath not a .vue
 *     file — use shared primitives/semantic tokens)
 *  4. Every component token variable is claimed by exactly one contract
 *     (foundation tokens are shared and exempt from exclusivity)
 *
 * Usage: node scripts/check-contracts.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

// ---------- Load contracts ----------
const contractFiles = readdirSync(join(root, 'contracts'))
  .filter((f) => f.endsWith('.json') && !['contract.schema.json', 'rules.json'].includes(f));
const contracts = contractFiles.map((f) => ({ file: `contracts/${f}`, data: readJson(`contracts/${f}`) }));

// ---------- 1. Structural validation ----------
// Allowed key sets are read FROM contract.schema.json so the schema stays the single
// source of truth. (Before this, they were duplicated here and had already drifted:
// identity.kind was in use but absent from the schema, and nothing caught it.)
const schema = readJson('contracts/contract.schema.json');

// Walks the contract against the schema at every depth, enforcing `required` and
// `additionalProperties: false`. Deliberately not a full JSON-Schema implementation —
// it covers the two rules that actually catch drift, with no dependency to add.
function validateShape(data, node, file, path = '') {
  if (!node) return;
  const where = path || '(root)';
  if (node.enum && !node.enum.includes(data)) {
    errors.push(`${file}: ${where} value ${JSON.stringify(data)} not one of ${node.enum.join(' | ')}`);
    return;
  }
  // maxLength is enforced because prose fields in this repo have a documented habit of
  // becoming dumping grounds: identity.figma.note reached 3,292 characters in card.json,
  // doing five jobs at once, and banner.json's copy still described a defect that had been
  // fixed the same day. A cap is what keeps a field a field.
  if (typeof data === 'string' && node.maxLength && data.length > node.maxLength) {
    warnings.push(
      `${file}: ${where} is ${data.length} chars, over the ${node.maxLength} cap — split it into the ` +
        `neighbouring structured fields, and move any build narrative to the commit message`
    );
  }
  if (data === null || typeof data !== 'object') return;
  if (Array.isArray(data)) {
    if (node.items) data.forEach((item, i) => validateShape(item, node.items, file, `${path}[${i}]`));
    return;
  }
  for (const key of node.required ?? []) {
    if (!(key in data)) errors.push(`${file}: ${where} missing required field "${key}"`);
  }
  if (node.properties) {
    for (const key of Object.keys(data)) {
      if (node.additionalProperties === false && !(key in node.properties)) {
        errors.push(`${file}: unknown field "${path ? path + '.' : ''}${key}" (not in contract.schema.json)`);
        continue;
      }
      validateShape(data[key], node.properties[key], file, path ? `${path}.${key}` : key);
    }
  }
}
for (const { file, data } of contracts) {
  validateShape(data, schema, file);
  if (data.version && !/^\d+\.\d+\.\d+$/.test(data.version)) errors.push(`${file}: version must be semver`);
  // A pattern is a prescribed COMPOSITION of existing components, so there is no single
  // file to point at — the pattern lives in the arrangement. Every other kind needs one.
  const isPattern = data.identity?.kind === 'pattern';
  if (data.identity && !data.identity.codePath && !isPattern) errors.push(`${file}: identity.codePath required`);
  if (isPattern && !(data.composedOf ?? []).length) errors.push(`${file}: pattern contracts need composedOf[]`);
  for (const id of data.composedOf ?? []) {
    if (!contracts.some((c) => c.data.name === id)) errors.push(`${file}: composedOf "${id}" is not a contract in this repo`);
  }
  for (const opt of data.options ?? []) {
    if (!opt.name || !opt.type) errors.push(`${file}: option missing name/type: ${JSON.stringify(opt)}`);
    if (opt.type === 'enum' && !Array.isArray(opt.values)) errors.push(`${file}: enum option "${opt.name}" needs values[]`);
  }
}

// ---------- 2. Contract options ↔ Vue props ----------
const VUE_TYPE = {
  boolean: 'Boolean', string: 'String', enum: 'String', number: 'Number',
  object: 'Object', array: 'Array',
};
function parsePropEntries(block) {
  // Extract `name: { type: X, default: Y }` entries at the first nesting level.
  const props = {};
  const entryRe = /(\w+):\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    const [, name, body] = m;
    const type = body.match(/type:\s*(\w+)/)?.[1] ?? null;
    const defRaw = body.match(/default:\s*([^,\n]+)/)?.[1]?.trim() ?? null;
    props[name] = { type, default: defRaw };
  }
  return props;
}

// Resolve `...Shared.props` spreads (src/components/shared/*) so contracts can bind
// shared options to a real code prop. Button is the first component to use one; the
// Forms family leans on them heavily.
function parseSharedSpreads(block, source, codePath) {
  const props = {};
  for (const [, ident] of block.matchAll(/\.\.\.(\w+)\.props\b/g)) {
    const importRe = new RegExp(`import\\s+${ident}\\s+from\\s+['"]([^'"]+)['"]`);
    const rel = source.match(importRe)?.[1];
    if (!rel) { warnings.push(`${codePath}: spread ...${ident}.props has no matching import — props unresolved`); continue; }
    const base = join(root, dirname(codePath), rel);
    const file = ['', '.ts', '.js'].map((ext) => base + ext).find((p) => existsSync(p));
    if (!file) { warnings.push(`${codePath}: spread ...${ident}.props resolves to a missing file (${rel})`); continue; }
    const shared = readFileSync(file, 'utf8');
    const propsBlock = shared.match(/(?:const|let|var)\s+props\s*=\s*\{([\s\S]*?)\n\}/);
    if (!propsBlock) { warnings.push(`${codePath}: could not parse props from ${rel}`); continue; }
    Object.assign(props, parsePropEntries(propsBlock[1]));
  }
  return props;
}

// Return the substring between `{` at `open` and its MATCHING `}`. A non-greedy
// regex stops at the first `})`, which a prop default like `default: () => ({...})`
// reaches long before the props object ends — Banner declares fourteen props and the
// regex saw one. Truncation is only loud when the contract claims a prop that got cut
// off; the unclaimed-prop warning silently under-reports for every prop past the cut.
function braceBlock(source, open) {
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}' && --depth === 0) return source.slice(open + 1, i);
  }
  return null;
}

function parseVueProps(source, codePath) {
  // Match `props: {...}` (options API) or `defineProps({...})`.
  const defineAt = source.search(/defineProps\(\s*\{/);
  const block = defineAt !== -1
    ? braceBlock(source, source.indexOf('{', defineAt))
    : source.match(/props:\s*\{([\s\S]*?)\n\s\s\}/)?.[1];
  if (block == null) return {};
  return { ...parseSharedSpreads(block, source, codePath), ...parsePropEntries(block) };
}

for (const { file, data } of contracts) {
  // Patterns have no code file to diff options against (see identity.kind).
  if (!data.identity?.codePath) continue;
  const source = readFileSync(join(root, data.identity.codePath), 'utf8');
  const vueProps = parseVueProps(source, data.identity.codePath);
  const claimedProps = new Set();
  for (const opt of data.options ?? []) {
    const codeProp = opt.code?.prop;
    if (!codeProp) continue; // figma-only or media-query options
    claimedProps.add(codeProp);
    const vp = vueProps[codeProp];
    if (!vp) { errors.push(`${file}: option "${opt.name}" maps to code prop "${codeProp}" not found in ${data.identity.codePath}`); continue; }
    const expected = VUE_TYPE[opt.type];
    if (expected && vp.type && vp.type !== expected) {
      errors.push(`${file}: option "${opt.name}" type ${opt.type} (${expected}) != Vue prop type ${vp.type}`);
    }
    if ('default' in opt && vp.default !== null) {
      const contractDefault = typeof opt.default === 'string' ? `'${opt.default}'` : String(opt.default);
      // Object/Array props must declare their default as a factory (`() => []`);
      // compare what it returns, which is what the contract records.
      const vueDefault = /^\(\s*\)\s*=>\s*/.test(vp.default)
        ? vp.default.replace(/^\(\s*\)\s*=>\s*/, '').replace(/^\((.*)\)$/, '$1').trim()
        : vp.default;
      if (vueDefault !== contractDefault && vueDefault !== String(opt.default)) {
        errors.push(`${file}: option "${opt.name}" default ${JSON.stringify(opt.default)} != Vue default ${vp.default}`);
      }
    }
  }
  for (const propName of Object.keys(vueProps)) {
    if (!claimedProps.has(propName)) warnings.push(`${file}: Vue prop "${propName}" in ${data.identity.codePath} is not claimed by any contract option`);
  }
}

// ---------- 3 + 4. tokensUsed ↔ tokens/ ----------
const BP = new Set(['mobile', 'md', 'page']);
function collectTokens(dirs, collapseBp) {
  const tokens = new Set(); // slash-form variable names; component breakpoint leaves collapsed
  for (const dir of dirs) {
    for (const f of readdirSync(join(root, dir)).filter((f) => f.endsWith('.json'))) {
      const data = readJson(`${dir}/${f}`);
      (function walk(node, path) {
        if (node && typeof node === 'object' && 'value' in node) {
          const leaf = path[path.length - 1];
          tokens.add((collapseBp && BP.has(leaf) ? path.slice(0, -1) : path).join('/'));
          return;
        }
        if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, [...path, k]);
      })(data, []);
    }
  }
  return tokens;
}
const componentTokens = collectTokens(['tokens/components'], true);
// Foundation contracts (identity.codePath not a .vue file) consume primitive/semantic
// tokens; those are shared by design, so they resolve here but are never exclusively
// claimed. Semantic breakpoint-named leaves (layout.gutter.width.mobile) are real
// distinct tokens, not component-mode leaves — no collapse.
const foundationTokens = collectTokens(['tokens/primitives', 'tokens/semantic'], false);
const claimedTokens = new Map(); // component token -> contract file

for (const { file, data } of contracts) {
  for (const t of data.tokensUsed ?? []) {
    if (!componentTokens.has(t) && !foundationTokens.has(t)) {
      errors.push(`${file}: tokensUsed entry "${t}" does not resolve in tokens/`);
      continue;
    }
    if (!componentTokens.has(t)) continue; // foundation token: shared, no exclusivity
    if (claimedTokens.has(t)) errors.push(`token "${t}" claimed by both ${claimedTokens.get(t)} and ${file}`);
    claimedTokens.set(t, file);
  }
}
for (const t of componentTokens) {
  if (!claimedTokens.has(t)) errors.push(`component token "${t}" is not claimed by any contract`);
}

// ---------- Report ----------
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\ncontracts: ${contracts.length} | component tokens: ${componentTokens.size} | errors: ${errors.length} | warnings: ${warnings.length}`);
process.exit(errors.length ? 1 : 0);
