#!/usr/bin/env node
/**
 * Claude Design view checker.
 *
 * `claude-design/` is the repo's source of record for the Claude Design view of the
 * design system (synced byte-identical to the registered DS). Unlike the SCSS view it
 * has no compiler and no runtime errors to lean on: a `<dc-import>` whose sibling is
 * missing renders NOTHING, silently. These checks make that class of failure loud.
 *
 * Checks:
 *  1. Every `dc-import name="X"` resolves to a sibling `X.dc.html`.
 *  2. Every relative `./…` link/script in a template resolves (support.js is
 *     platform-provided via create_support_js and is allowed to be absent).
 *  2b. No BARE element selectors (h2, a, table th). dc-import shares one document and one
 *     cascade, so a bare selector applies to every matching element on the page. A
 *     selector confined only by a :not() is warned about separately — :not() is a
 *     negation and confines nothing.
 *  3. readme.md — the file the PLATFORM INJECTS into every consuming session — names
 *     every shipped .dc.html, so a component cannot ship undocumented where consumers
 *     actually read. It must also carry the copy-before-import protocol. SKILL.md (the
 *     user-invocable wrapper) must name every template too: it sat at "three migrated
 *     components" through TWO migrations (Buttons, Forms) because nothing checked it.
 *  3b. Design System Guide.md names every shipped component (warn). Nothing checked the
 *     Guide until 2026-08-21, which is how a stale "banners are not covered" line survived
 *     a full day after Banner shipped.
 *  4. Every var(--uiowa-*) referenced anywhere in the view is defined in tokens.css.
 *  5. _ds_manifest.json agrees with tokens.css (same token names and :root values) and
 *     every globalCssPaths entry exists.
 *  6. One prop, one predicate (warn). A prop tested two different ways (bare truthiness in
 *     one place, an explicit comparison in another) is how the 2026-08-20 Alert icon bug
 *     shipped. Warn, not error: the template may be faithfully mirroring the same split in
 *     the Vue source, in which case the fix belongs upstream, not in the mirror.
 *  7. dc enum values are a subset of the contract's (warn) — an agent following
 *     components-from-catalog must not be handed a value the template rejects.
 *  8. dc defaults agree with the contract's (warn) — only for props that map to a contract
 *     OPTION, since slot content and empty contract defaults are by design.
 *
 * Usage: node scripts/check-claude-design.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = 'claude-design';
const dir = join(root, DIR);
const errors = [];
const warnings = [];
const read = (f) => readFileSync(join(dir, f), 'utf8');
// Comments in these templates carry provenance prose that quotes code, so any check that
// reads the templates as code has to drop them first or it will match the prose.
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const files = readdirSync(dir);
const templates = files.filter((f) => f.endsWith('.dc.html'));
// support.js is written by the platform's create_support_js, not stored here.
const PLATFORM_PROVIDED = new Set(['support.js']);

if (!templates.length) errors.push(`${DIR}/: no .dc.html templates found`);

// ---------- 1 + 2. sibling imports and relative assets ----------
for (const file of templates) {
  const src = read(file);

  for (const [, name] of src.matchAll(/<dc-import\s+name="([^"]+)"/g)) {
    if (!files.includes(`${name}.dc.html`)) {
      errors.push(`${DIR}/${file}: dc-import "${name}" has no sibling ${name}.dc.html (renders nothing, silently)`);
    }
  }

  for (const [, ref] of src.matchAll(/(?:href|src)="\.\/([^"]+)"/g)) {
    if (PLATFORM_PROVIDED.has(ref)) continue;
    if (!existsSync(join(dir, ref))) errors.push(`${DIR}/${file}: relative reference "./${ref}" does not resolve`);
  }

  // Every template must load the runtime, or it renders as inert markup.
  if (!/<script src="\.\/support\.js">/.test(src)) {
    errors.push(`${DIR}/${file}: missing <script src="./support.js"> (the dc runtime)`);
  }
}

// ---------- 2b. bare element selectors leak across the whole page ----------
// dc-import shares ONE document and ONE cascade with its parent, so a bare element
// selector in a component's <style> applies to EVERY matching element on the page, not
// just that component's own. Worse, bare selectors are all (0,0,1), so collisions between
// components resolve by INJECTION ORDER — which nothing in this repo controls.
//
// Found the hard way (2026-08-18): a consumer's page rendered every body link GOLD.
// Brand Footer declared `a{color:var(--uiowa-brand-footer-link-color)}`; that escaped and
// repainted the table and news links page-wide, while the footer's OWN links were pulled
// back to black by a later rule. Exactly inverted. The same mechanism broke an Alert that
// "was working previously" — Alert, Headline and the consuming page each declared a bare
// h2, and the winner changed when an import was added.
//
// ALLOWED: html/body/:root/* — page-context resets every template reproduces deliberately
// (see the box-sizing note in any template header). Page Scaffold is exempt entirely: it
// IS the page, and defining page-level element defaults is its whole job.
const BARE_OK = new Set(['html', 'body', ':root', '*', '*::before', '*::after']);
const SCAFFOLD_EXEMPT = new Set(['Page Scaffold.dc.html']);

for (const file of templates) {
  if (SCAFFOLD_EXEMPT.has(file)) continue;
  const src = read(file);
  const offenders = new Set();
  const notConfined = new Set();

  for (const [, styleBody] of src.matchAll(/<style>([\s\S]*?)<\/style>/g)) {
    // Strip comments so commented-out CSS and prose never register.
    const css = styleBody.replace(/\/\*[\s\S]*?\*\//g, '');
    // Innermost rules only: a prelude with no braces, followed by a declaration block.
    for (const [, prelude] of css.matchAll(/([^{}]+)\{[^{}]*\}/g)) {
      const sel = prelude.trim();
      if (!sel || sel.startsWith('@')) continue;
      // Split on commas at depth 0 ONLY: `:is(h2,h3)` and `:not(a,b)` are ONE selector,
      // and a naive split reports garbage like `h6)` — which it did on the first run.
      const parts = [];
      let depth = 0, buf = '';
      for (const ch of sel) {
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        if (ch === ',' && depth === 0) { parts.push(buf); buf = ''; continue; }
        buf += ch;
      }
      parts.push(buf);
      for (const one of parts) {
        const s = one.trim();
        if (!s || BARE_OK.has(s)) continue;
        // "Bare" = carries no class, id or attribute anywhere, so nothing confines it
        // to this component's subtree. `a`, `a:hover`, `table thead th` all qualify.
        if (!/[.#[]/.test(s)) offenders.add(s);
        // Weaker case, warn-only: the only class/attribute sits inside :not(), which is a
        // NEGATION and so confines nothing — `table th:not([align])` still matches every
        // th on the page. :is()/:where() are positive matches and DO confine, so they are
        // left alone (`:where(.alert) h2` really is scoped to .alert).
        else if (!/[.#[]/.test(s.replace(/:not\([^()]*\)/g, ''))) notConfined.add(s);
      }
    }
  }

  for (const sel of [...notConfined].sort()) {
    warnings.push(
      `${DIR}/${file}: selector "${sel}" is confined only by a :not(), which is a negation — ` +
        `it still matches page-wide. Check the SCSS before rescoping: if production is bare too, ` +
        `this mirrors it faithfully and rescoping trades fidelity for cascade safety (a human call).`
    );
  }

  for (const sel of [...offenders].sort()) {
    errors.push(
      `${DIR}/${file}: bare selector "${sel}" leaks page-wide — dc-import shares one cascade, ` +
      `so this styles every matching element on any page that imports this component. ` +
      `Scope it to this component's own root class.`,
    );
  }
}

// ---------- 3. readme.md is the injected channel ----------
// The platform inlines readme.md (NOT Design System Guide.md) into every consuming
// session, and a consumer's read access to the DS project may be binding-only.
if (!files.includes('readme.md')) {
  errors.push(`${DIR}/readme.md missing — it is the file the platform injects into consuming sessions`);
} else {
  const readme = read('readme.md');
  for (const file of templates) {
    if (!readme.includes(file)) {
      errors.push(`${DIR}/readme.md does not mention ${file} — consumers would not know it exists`);
    }
  }
  // The protocol itself: dc-import is sibling-only, so consumers must copy first.
  for (const [needle, why] of [
    ['copy_files', 'the copy-before-import protocol'],
    ['create_support_js', 'the create_support_js step'],
    ['sibling', 'the sibling-resolution caveat'],
  ]) {
    if (!readme.includes(needle)) errors.push(`${DIR}/readme.md no longer documents ${why} ("${needle}" absent)`);
  }
}

// SKILL.md is the user-invocable entry point; a stale scope list there tells consumers
// a shipped component doesn't exist (it lagged two whole migrations unnoticed).
if (!files.includes('SKILL.md')) {
  errors.push(`${DIR}/SKILL.md missing — it is the user-invocable skill wrapper`);
} else {
  const skill = read('SKILL.md');
  for (const file of templates) {
    if (!skill.includes(file)) {
      errors.push(`${DIR}/SKILL.md does not mention ${file} — the skill's scope list is stale`);
    }
  }
}

// The Guide is the authoritative human-facing doc, and NOTHING checked it until now: that
// is how a stale "banners are not covered" line survived a full day after Banner shipped.
// It is prose, not an index, so it is warn-only — but a component it never names is a
// component its readers do not know exists.
const GUIDE = 'Design System Guide.md';
if (!files.includes(GUIDE)) {
  errors.push(`${DIR}/${GUIDE} missing — it is the authoritative guide the readme points at`);
} else {
  const guide = read(GUIDE);
  for (const file of templates) {
    const component = file.replace('.dc.html', '');
    if (!guide.includes(file) && !guide.includes(component)) {
      warnings.push(`${DIR}/${GUIDE} never mentions ${component} — its readers would not know it exists`);
    }
  }
}

// ---------- 4. token references resolve ----------
const tokensCss = read('tokens.css');
const defined = new Set([...tokensCss.matchAll(/(--uiowa-[\w-]+)\s*:/g)].map((m) => m[1]));
const cssFiles = files.filter((f) => f.endsWith('.css'));
for (const file of [...templates, ...cssFiles]) {
  const src = read(file);
  for (const [, name] of src.matchAll(/var\((--uiowa-[\w-]+)/g)) {
    if (!defined.has(name)) errors.push(`${DIR}/${file}: var(${name}) is not defined in tokens.css`);
  }
}

// ---------- 5. manifest agrees with tokens.css ----------
const manifest = JSON.parse(read('_ds_manifest.json'));
for (const path of manifest.globalCssPaths ?? []) {
  if (!existsSync(join(dir, path))) errors.push(`${DIR}/_ds_manifest.json: globalCssPaths entry "${path}" does not exist`);
}
// The manifest mirrors the :root block (media-query overrides are not separate entries).
const rootBlock = tokensCss.match(/:root\s*\{(.*?)\n\}/s)?.[1] ?? '';
const rootDecls = new Map([...rootBlock.matchAll(/(--uiowa-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const manifestTokens = new Map((manifest.tokens ?? []).map((t) => [t.name, String(t.value).trim()]));
for (const [name, value] of rootDecls) {
  if (!manifestTokens.has(name)) {
    errors.push(`${DIR}/_ds_manifest.json: token "${name}" is in tokens.css but missing from the manifest`);
  } else if (manifestTokens.get(name) !== value) {
    errors.push(`${DIR}/_ds_manifest.json: token "${name}" is "${manifestTokens.get(name)}" but tokens.css says "${value}" (stale manifest)`);
  }
}
for (const name of manifestTokens.keys()) {
  if (!rootDecls.has(name)) errors.push(`${DIR}/_ds_manifest.json: token "${name}" is in the manifest but not in tokens.css`);
}

// ---------- 6. one prop, one predicate ----------
// The 2026-08-20 Alert bug was two hand-written predicates for ONE Vue prop that drifted
// apart: the alert--icon CLASS was gated on `this.props.icon` (bare truthiness) while the
// icon ELEMENT was gated on `icon !== false`. They agree when a caller passes the attribute
// and DIVERGE when it is omitted -- `undefined` is falsy, but `undefined !== false` is true
// -- so the class was dropped while the element still rendered, and the icon stacked above
// the heading instead of sitting inline. Omitting the attribute is the common case.
//
// The fix established the invariant: normalize the prop ONCE into a local, then use that
// local everywhere. This check enforces it, so the bug class cannot come back by hand.
const PRED = /this\.props\.(\w+)\s*(!==|===|==|!=)\s*([A-Za-z0-9_'"]+)/g;
const BARE = /(?<![.\w])this\.props\.(\w+)(?!\s*(?:!==|===|==|!=|\?\?|\.|=[^=]))/g;
for (const t of templates) {
  const body = stripComments(read(t).match(/<script[^>]*data-dc-script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '');
  const forms = new Map();
  const add = (k, v) => forms.set(k, (forms.get(k) ?? new Set()).add(v));
  for (const m of body.matchAll(PRED)) add(m[1], `${m[2]} ${m[3]}`);
  for (const m of body.matchAll(BARE)) add(m[1], 'bare truthiness');
  for (const [prop, set] of forms) {
    if (set.size > 1 && set.has('bare truthiness')) {
      warnings.push(
        `${DIR}/${t}: prop "${prop}" is tested two ways in one script — ${[...set].map((f) => `\`${f}\``).join(' and ')}. ` +
          `Two predicates over one prop is the shape of the 2026-08-20 Alert icon bug: they agree when the ` +
          `attribute is passed and diverge when it is omitted. Check the Vue source before "fixing" it here: ` +
          `if the component splits the same way, the template is mirroring it correctly and the fix belongs ` +
          `upstream. If the template invented the split, normalize once into a local and use that local.`
      );
    }
  }
}

// ---------- 7/8. dc props vs the contract ----------
// A .dc.html's data-props IS the public shape agents program against, so it has to agree
// with the contract that rules.json's components-from-catalog points them at. Only props
// that map to a contract OPTION are compared: .dc.html has no slot mechanism, so slot
// content is templated as editor props (title_1, crumb_1_text) by design, and a contract
// default of "" against dc sample content is an editor affordance, not drift.
const contractsDir = join(root, 'contracts');
const byName = new Map();
for (const f of readdirSync(contractsDir).filter((x) => x.endsWith('.json'))) {
  if (['contract.schema.json', 'rules.json'].includes(f)) continue;
  const c = JSON.parse(readFileSync(join(contractsDir, f), 'utf8'));
  byName.set(c.name, c);
}
for (const t of templates) {
  const c = byName.get(t.replace('.dc.html', '').toLowerCase().replace(/ /g, '-'));
  if (!c) continue;
  const raw = read(t).match(/data-props='(\{[\s\S]*?\})'/)?.[1];
  if (!raw) continue;
  let props;
  try { props = JSON.parse(raw); } catch { errors.push(`${DIR}/${t}: data-props is not valid JSON`); continue; }
  const opts = new Map((c.options ?? []).map((o) => [o.name.toLowerCase(), o]));
  for (const [key, spec] of Object.entries(props)) {
    if (key.startsWith('$') || key.startsWith('preview_')) continue;
    const opt = opts.get(key.toLowerCase()) ?? opts.get(key.replace(/_/g, '').toLowerCase());
    if (!opt) continue; // slot content or an editor-only knob — by design
    if (Array.isArray(opt.values) && Array.isArray(spec.options)) {
      // A contract value of "" is the option's off state, which emits no modifier class.
      // An enum editor cannot offer "" as a readable choice, so the templates label it
      // ("default", "none", "stacked"). That rename is by design; allow exactly one such
      // stand-in rather than flagging every component that has an off state.
      const offState = opt.values.includes('');
      let bad = spec.options.filter((v) => !opt.values.includes(v));
      if (offState && bad.length === 1) bad = [];
      if (bad.length) {
        warnings.push(
          `${DIR}/${t}: prop "${key}" offers ${bad.map((v) => `"${v}"`).join(', ')}, which contracts/${c.name}.json does not list ` +
            `(legal: ${opt.values.join(' | ')}). An agent following the catalog would write a value this template rejects.`
        );
      }
    }
    // Only booleans and enums: a free-string prop's contract default is a placeholder and
    // the template's is demo copy for the preview, so comparing them is pure noise.
    const constrained = opt.type === 'boolean' || Array.isArray(opt.values);
    const cd = opt.default;
    const dd = spec.default;
    const meaningful = (v) => v !== undefined && v !== null && v !== '';
    if (constrained && meaningful(cd) && meaningful(dd) && String(cd) !== String(dd)) {
      warnings.push(
        `${DIR}/${t}: prop "${key}" defaults to ${JSON.stringify(dd)} but contracts/${c.name}.json says ${JSON.stringify(cd)}. ` +
          `A deliberate preview default is fine — say so in the template — but an accidental one misreports the component's shape.`
      );
    }
  }
}

// ---------- Report ----------
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(
  `\nclaude-design: ${templates.length} templates | ${manifestTokens.size} tokens | ` +
    `errors: ${errors.length} | warnings: ${warnings.length}`
);
process.exit(errors.length ? 1 : 0);
