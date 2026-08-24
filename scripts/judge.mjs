#!/usr/bin/env node
/**
 * Deterministic judge — scores a GENERATED page against the compiled catalog.
 *
 * The drift checkers verify the SYSTEM's internal consistency: tokens match SCSS,
 * contracts match Vue, Figma matches the catalog. None of them look at what an agent
 * actually built with the system. This does, and that is the whole difference between
 * "the design system is coherent" and "the design system changes what an agent produces".
 *
 * It is the scoring half of an A/B: run an agent on a fixture prompt WITHOUT the catalog,
 * then WITH it, judge both with this script, and compare. Same judge both runs, so the
 * comparison means something. See eval/README.md.
 *
 * Deterministic on purpose. No model in the loop, so a score is reproducible and a
 * violation can be checked by hand against the file and line it names.
 *
 * Checks map to rule ids in contracts/rules.json. Rules marked `judge` there are
 * mechanically checkable by definition; three marked `agent` turn out to be partly
 * checkable too and are scored as ADVISORY, never as hard violations.
 *
 * That mapping is ENFORCED, not conventional: scripts/check-judge-rules.mjs (in
 * `yarn check:drift`) derives the rule ids below out of this file's own source and fails if
 * one is neither in contracts/rules.json nor a declared view-local rule. Until 2026-08-22
 * this script read rules.json into a Map it never used, and the coupling held by convention
 * alone — so renaming a rule there silently broke every report this script produces.
 *
 * Usage:
 *   node scripts/judge.mjs <page.html> [more.html ...]
 *   node scripts/judge.mjs <page.html> --json
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const files = argv.filter((a) => !a.startsWith('--'));
if (!files.length) {
  console.error('usage: node scripts/judge.mjs <page.html> [...] [--json]');
  process.exit(2);
}

// ---------- load the catalog ----------
const tokens = readJson('catalog/tokens.json').tokens;
// contracts/rules.json is deliberately NOT read here. The checks below are hardcoded logic;
// this script never needed the rule DATA, only the rule IDS, and reading a file in order to
// ignore it is worse than not reading it — it reads as a coupling that isn't one. What has to
// stay true is that the ids match rules.json, which is a static property of this source and is
// enforced by scripts/check-judge-rules.mjs.

// hex -> the token name that already holds it. This is what makes "no raw hex" actionable:
// the judge can name the token the agent should have reached for.
const hexToToken = new Map();
for (const [name, t] of Object.entries(tokens)) {
  const v = String(t.resolved ?? '').trim().toLowerCase();
  if (/^#[0-9a-f]{3,8}$/.test(v) && !hexToToken.has(v)) hexToToken.set(v, name);
}
// the legal type scale, so an ad-hoc size is distinguishable from a real one
const fontSizes = new Set();
for (const [name, t] of Object.entries(tokens)) {
  if (/font-size|font\/size/.test(name)) {
    const v = String(t.resolved ?? '').trim();
    if (v) fontSizes.add(v);
  }
}

// The custom properties a page may actually reference. claude-design/tokens.css is the
// token surface a dc page is served, so an agent inventing a plausible-looking name
// (--uiowa-space-nonexistent) is checkable -- and inventing a token is the likeliest form
// of "hard-coded value dressed up as system usage". check-claude-design does this for
// templates; a generated page needs it just as much.
const declaredVars = new Set();
{
  const tokensCssPath = join(root, 'claude-design/tokens.css');
  if (existsSync(tokensCssPath)) {
    const css = readFileSync(tokensCssPath, 'utf8');
    for (const m of css.matchAll(/(--uiowa-[\w-]+)\s*:/g)) declaredVars.add(m[1]);
  }
}

// contracts: component -> options
const contracts = new Map();
for (const f of readdirSync(join(root, 'contracts')).filter((x) => x.endsWith('.json'))) {
  if (['contract.schema.json', 'rules.json'].includes(f)) continue;
  const c = readJson(`contracts/${f}`);
  contracts.set(c.name, c);
}
// Known components, as a page author would spell them in dc-import.
//
// The INTERFACE a dc page programs against is the template's own data-props, not the
// contract's options: .dc.html has no slot mechanism, so slot content is exposed as editor
// props (siteName, crumb_1_text, title_1). Judging attributes against contract options alone
// reports every one of those as an invented prop -- which it is not. So the allowed set is
// the template's data-props UNION the contract's options and slots, and only something in
// none of them is invented.
const templates = new Map();
const cdDir = join(root, 'claude-design');
if (existsSync(cdDir)) {
  for (const f of readdirSync(cdDir).filter((x) => x.endsWith('.dc.html'))) {
    const label = f.replace('.dc.html', '');
    const src = readFileSync(join(cdDir, f), 'utf8');
    let props = {};
    const raw = src.match(/data-props='(\{[\s\S]*?\})'/)?.[1];
    if (raw) { try { props = JSON.parse(raw); } catch { /* template owns its own syntax check */ } }
    templates.set(label.toLowerCase(), { contract: label.toLowerCase().replace(/ /g, '-'), props });
  }
}
// A component with a contract but no .dc.html is real, but cannot be dc-imported in this
// view. That is a gap in the view, not an invented component, so it is reported as such.
const contractOnly = new Set([...contracts.keys()].filter((n) => ![...templates.values()].some((t) => t.contract === n)));

// ---------- severities ----------
// A violation that would render wrong or invent API outweighs a style preference.
const WEIGHT = { critical: 10, major: 5, minor: 2, advisory: 0 };

function judge(file) {
  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch (e) {
    // Exit non-zero: a caller scripting the A/B must not read "file missing" as "scored 0".
    console.error(`judge: cannot read ${file} — ${e.code === 'ENOENT' ? 'no such file' : e.message}`);
    process.exit(2);
  }
  const v = [];
  const at = (idx) => src.slice(0, idx).split('\n').length;
  // `rule` must be a string LITERAL at every call site, and must exist in contracts/rules.json
  // or be declared view-local in scripts/check-judge-rules.mjs. That checker reads the ids out
  // of this source, so a computed id would shrink what it can verify without failing anything —
  // it errors on both, including on this helper being renamed.
  const add = (rule, severity, line, message) => v.push({ rule, severity, line, message });

  const styles = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  const inlineStyles = [...src.matchAll(/style="([^"]*)"/g)].map((m) => m[1]).join(';');
  const allCss = styles + ';' + inlineStyles;

  // ---- components-from-catalog ----
  for (const m of src.matchAll(/<dc-import\s+([^>]*)>/g)) {
    const attrs = m[1];
    const line = at(m.index);
    const name = attrs.match(/name="([^"]+)"/)?.[1];
    if (!name) { add('components-from-catalog', 'critical', line, `<dc-import> with no name attribute`); continue; }
    const key = name.toLowerCase();
    const tpl = templates.get(key);
    if (!tpl) {
      if (contractOnly.has(key.replace(/ /g, '-'))) {
        add('components-from-catalog', 'major', line,
          `"${name}" has a contract but no ${name}.dc.html, so it cannot be imported in this view`);
      } else {
        add('components-from-catalog', 'critical', line,
          `component "${name}" is not in the catalog (known: ${[...templates.keys()].slice(0, 6).join(', ')}…)`);
      }
      continue;
    }
    const c = contracts.get(tpl.contract);
    const opts = new Map((c?.options ?? []).map((o) => [o.name.toLowerCase(), o]));
    const slots = new Set((c?.slots ?? []).map((s) => s.name.toLowerCase()));
    const tplProps = new Map(Object.entries(tpl.props).map(([k, val]) => [k.toLowerCase(), val]));
    for (const am of attrs.matchAll(/([\w:-]+)="([^"]*)"/g)) {
      const [, attr, val] = am;
      const a = attr.toLowerCase();
      if (a === 'name' || a.startsWith('preview_') || a.startsWith('$')) continue;
      const tp = tplProps.get(a);
      const opt = opts.get(a) ?? opts.get(a.replace(/_/g, ''));
      if (!tp && !opt && !slots.has(a)) {
        add('components-from-catalog', 'critical', line,
          `"${name}" has no prop "${attr}" (template accepts: ${[...tplProps.keys()].filter((k) => !k.startsWith('$')).join(', ') || 'none'})`);
        continue;
      }
      // Enum values: the template's own option list is what the runtime will accept.
      const legal = Array.isArray(tp?.options) ? tp.options : Array.isArray(opt?.values) ? opt.values : null;
      if (legal && val && !legal.includes(val) && !/\{\{/.test(val)) {
        add('components-from-catalog', 'critical', line,
          `"${name}" prop "${attr}" = "${val}" is not a legal value (${legal.filter(Boolean).join(' | ')})`);
      }
      if (opt?.status && /planned|deprecated/i.test(opt.status)) {
        add('no-planned-options', 'major', line, `"${name}" prop "${attr}" is status: ${opt.status}`);
      }
    }
  }

  // ---- tokens-only: raw hex where a token already holds the value ----
  for (const m of allCss.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    const hex = m[0].toLowerCase();
    const known = hexToToken.get(hex);
    add('tokens-only', known ? 'major' : 'minor', at(src.indexOf(m[0])),
      known
        ? `raw hex ${m[0]} — use var(--uiowa-${known.replace(/\//g, '-')}) (token ${known})`
        : `raw hex ${m[0]} — no token holds this value, so it is an off-system colour`);
  }

  // ---- tokens-only: ad-hoc type sizes ----
  for (const m of allCss.matchAll(/font-size\s*:\s*([^;}"]+)/g)) {
    const val = m[1].trim();
    if (/var\(|inherit|100%|clamp\(/.test(val)) continue;
    if (!fontSizes.has(val)) {
      add('tokens-only', 'major', at(src.indexOf(m[0])),
        `ad-hoc type size "${val}" — not on the token scale; use a var(--uiowa-font-size-*)`);
    }
  }

  // ---- tokens-only: a var() that does not exist ----
  if (declaredVars.size) {
    for (const m of allCss.matchAll(/var\(\s*(--uiowa-[\w-]+)/g)) {
      if (!declaredVars.has(m[1])) {
        add('tokens-only', 'critical', at(src.indexOf(m[0])),
          `var(${m[1]}) is not a token — no such custom property is declared. An invented token name ` +
            `renders as nothing and reads as system usage, which is worse than a raw value.`);
      }
    }
  }

  // ---- semantic-tier-first (advisory: a contract may legitimately bind a primitive) ----
  for (const m of allCss.matchAll(/var\(--uiowa-(color-(?:black|white|gold|gray-\d+)|font-size-\d+)\)/g)) {
    add('semantic-tier-first', 'advisory', at(src.indexOf(m[0])),
      `primitive var(--uiowa-${m[1]}) used directly — prefer a semantic token unless a contract binds this primitive`);
  }

  // ---- second-row-forces-narrow ----
  for (const m of src.matchAll(/<dc-import\s+[^>]*name="Brand Bar"[^>]*>/gi)) {
    const tag = m[0];
    const hasSecond = /second_row|secondRow/i.test(tag) && !/second_row[a-z_]*="(\{\{ ?false ?\}\}|false|)"/i.test(tag);
    const narrow = /narrow="(\{\{ ?true ?\}\}|true)"/i.test(tag);
    if (hasSecond && !narrow) {
      add('second-row-forces-narrow', 'major', at(m.index),
        `Brand Bar has a second row but narrow is not set — the code enforces narrow implicitly, designs must match`);
    }
  }

  // ---- badge-inline-only (agent rule, but the positioning half is checkable) ----
  for (const m of allCss.matchAll(/\.badge[^{]*\{([^}]*)\}/g)) {
    if (/position\s*:\s*(absolute|fixed)|float\s*:/.test(m[1])) {
      add('badge-inline-only', 'critical', at(src.indexOf(m[0])),
        `badge is positioned or floated — badge.scss contains no positioning, so a corner-mounted badge is invented`);
    }
  }

  // ---- page-heading-structure (agent rule; the demotion half is checkable) ----
  const h1s = [...src.matchAll(/<h1\b/g)].length;
  if (/page-title/.test(src) && /<h2[^>]*class="[^"]*page-title/.test(src)) {
    add('page-heading-structure', 'critical', at(src.search(/<h2[^>]*class="[^"]*page-title/)),
      `page title demoted to h2 — a UIDS page has TWO h1s as shipped; demoting loses the page-title type ramp`);
  } else if (h1s === 0 && /<h[2-6]/.test(src)) {
    add('page-heading-structure', 'advisory', 1, `no h1 on the page — expected the Brand Bar site name and the page title`);
  }

  // ---- bare element selectors in the page's own style (dc-import shares one cascade) ----
  const BARE_OK = new Set(['html', 'body', ':root', '*', '*::before', '*::after']);
  for (const [, prelude] of styles.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{[^{}]*\}/g)) {
    const sel = prelude.trim();
    if (!sel || sel.startsWith('@')) continue;
    for (const part of sel.split(',')) {
      const s2 = part.trim();
      if (!s2 || BARE_OK.has(s2)) continue;
      if (!/[.#[]/.test(s2.replace(/:not\([^()]*\)/g, ''))) {
        add('no-bare-element-styles', 'major', at(src.indexOf(prelude)),
          `bare selector "${s2}" in the page's own <style> — dc-import shares one cascade, so this reaches inside every imported component`);
      }
    }
  }

  const hard = v.filter((x) => x.severity !== 'advisory');
  const penalty = hard.reduce((a, x) => a + WEIGHT[x.severity], 0);
  return { file, violations: v, score: Math.max(0, 100 - penalty) };
}

const results = files.map(judge);
if (asJson) {
  console.log(JSON.stringify({ results }, null, 2));
} else {
  for (const r of results) {
    console.log(`\n=== ${basename(r.file)} — score ${r.score}/100 ===`);
    const hard = r.violations.filter((x) => x.severity !== 'advisory');
    const adv = r.violations.filter((x) => x.severity === 'advisory');
    if (!hard.length) console.log('  no violations');
    for (const x of hard) console.log(`  [${x.severity.padEnd(8)}] ${String(x.line).padStart(4)}  ${x.rule}: ${x.message}`);
    for (const x of adv) console.log(`  [advisory]      ${String(x.line).padStart(4)}  ${x.rule}: ${x.message}`);
    console.log(`  ${hard.length} violation${hard.length === 1 ? '' : 's'}, ${adv.length} advisory`);
  }
}
process.exit(0);
