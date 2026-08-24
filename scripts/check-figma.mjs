#!/usr/bin/env node
/**
 * Figma view checker — the fifth and last generated view to get a gate.
 *
 * THE PROBLEM THIS SOLVES
 * Figma's state lives behind an authenticated API that only an agent session can
 * reach (the MCP is a tool call, not something CI can invoke). So unlike the SCSS,
 * catalog, contract and Claude Design views, nothing was proving that the Figma
 * library still matched tokens/ and contracts/. Verification was "an agent looked
 * at it once", which is exactly the kind of dependence-on-memory that let the
 * Claude Design resolution bug hide for a month.
 *
 * THE SPLIT
 *   scripts/figma-readback.js  — runs IN a session via the Figma MCP, captures the
 *                                live library into figma/snapshot.json (committed).
 *   THIS FILE                  — plain Node, no network, no auth. Diffs that
 *                                snapshot against tokens/ + contracts/ on every PR.
 *
 * That leaves exactly one thing unautomatable — whether the snapshot is CURRENT —
 * so we make that an explicit, cheap check too (see "staleness" below) instead of
 * an unbounded unknown.
 *
 * WHAT IT COMPARES AGAINST
 * catalog/tokens.json, not tokens/ directly: the catalog is already the flat,
 * alias-resolved, slash-named projection of tokens/ (and build-catalog.mjs --check
 * guarantees it is current). Comparing Figma -> catalog -> tokens/ transitively
 * avoids duplicating the name-mapping logic in two places.
 *
 * Usage:
 *   node scripts/check-figma.mjs            # verify (exit 1 on drift)
 *   node scripts/check-figma.mjs --stamp    # re-record sourceHash after a refresh
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const STAMP = process.argv.includes('--stamp');
const SNAPSHOT = 'figma/snapshot.json';
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const errors = [];
const snapshot = readJson(SNAPSHOT);
const catalog = readJson('catalog/tokens.json').tokens;
const scss = readFileSync(join(root, 'src/scss/abstracts/_tokens-generated.scss'), 'utf8');

// Figma's mode names carry the breakpoint px ("md (980)"); the token JSON uses bare
// keys ("md"). Map by prefix so a mode rename in Figma is caught rather than silently
// mismatched.
const COMPONENT_MODES = { mobile: 'mobile', 'md (980)': 'md', 'page (1350)': 'page' };
const SEMANTIC_MODES = { 'small (600)': 'mobile', 'large (1310)': 'desktop' };

// `heading-serif-h1` is byte-identical to `heading-h1` (in 4.x the h1 is ALREADY
// Zilla Slab, so the "serif" variant is a redundant alias of the same primitives).
// Figma deliberately does not duplicate the variable. Candidate for token cleanup
// in 5.x; until then this is an intentional, documented omission.
const CSS_PROPS_WITHOUT_FIGMA_VARIABLE = new Set(['--uiowa-font-size-heading-serif-h1']);

// ---------- staleness ----------
// A content hash over only the FIGMA-RELEVANT projection of tokens/ + contracts/, so
// editing a token's `comment` doesn't force a needless Figma re-readback, but changing
// a value, alias, axis or tokensUsed entry does.
function sourceHash() {
  const tokenProjection = Object.entries(catalog)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, t]) => [name, t.resolved ?? null, t.px ?? null, t.ref ?? null, t.breakpoints ?? null]);

  const contractProjection = readdirSync(join(root, 'contracts'))
    .filter((f) => f.endsWith('.json') && !['contract.schema.json', 'rules.json'].includes(f))
    .sort()
    .map((f) => {
      const c = readJson(`contracts/${f}`);
      return [
        f,
        c.identity?.figma?.componentSetName ?? null,
        (c.options ?? []).map((o) => [o.name, o.figma?.axis ?? null, o.figma?.map ?? null]),
        c.tokensUsed ?? [],
        (c.children ?? []).map((ch) => ch.contract),
      ];
    });

  return createHash('sha256')
    .update(JSON.stringify({ tokenProjection, contractProjection }))
    .digest('hex')
    .slice(0, 16);
}

const expectedHash = sourceHash();
if (STAMP) {
  // Called right after refreshing the snapshot from Figma: record what it was
  // captured against, so future runs can tell whether it has gone stale.
  const raw = readFileSync(join(root, SNAPSHOT), 'utf8');
  writeFileSync(join(root, SNAPSHOT), raw.replace(/"sourceHash":\s*(?:null|"[^"]*")/, `"sourceHash": "${expectedHash}"`));
  console.log(`stamped ${SNAPSHOT} sourceHash = ${expectedHash}`);
} else if (snapshot.sourceHash !== expectedHash) {
  errors.push(
    `SNAPSHOT STALE: figma/snapshot.json was captured against sourceHash ` +
    `${snapshot.sourceHash ?? '(none)'} but tokens/contracts now hash to ${expectedHash}. ` +
    `Re-run scripts/figma-readback.js via the Figma MCP, save the result, then ` +
    `node scripts/check-figma.mjs --stamp.`
  );
}

// ---------- resolve a Figma variable name -> its catalog token ----------
// 146 of 164 variables share their name with the catalog key. The other 18 are the
// semantic composite type styles: Figma calls the size variable font/size/heading/h1
// while the catalog calls the bundle channel heading-h1/font-size. The WEB code
// syntax is the reliable join for those, since build-tokens.mjs generates the same
// name from the same source.
function catalogKeyFor(name, variable) {
  if (catalog[name]) return name;
  const m = /^var\(--uiowa-font-size-([\w-]+)\)$/.exec(variable.web ?? '');
  const composite = m && `${m[1]}/font-size`;
  return composite && catalog[composite] ? composite : null;
}

// Figma stores only the family NAME ("Zilla Slab"); the token holds a full CSS stack
// ("'Zilla Slab', 'Zilla-fallback', serif"). Compare against the first family.
const firstFamily = (cssList) => {
  const m = /^\s*'([^']+)'|^\s*"([^"]+)"|^\s*([^,]+)/.exec(String(cssList));
  return (m?.[1] ?? m?.[2] ?? m?.[3] ?? '').trim();
};
const REM = 16;
const near = (a, b) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) < 0.01;

// The px a token's value denotes, resolved the way a BROWSER would resolve it — that is
// what Figma's numbers have to be compared against. Unitless values (weights,
// line-heights) and explicit px carry through unchanged; sentinel 0 = auto.
//
// `rem` is always root-relative. A bare `em` is NOT: it resolves against the font-size of
// the element the declaration lands on, which for a component-tier token is that
// component's own `<component>/font-size`. Until 2026-08-21 this file multiplied both
// units by 16, justified by the only em tokens then in the system being page container
// widths (81.875em = 1310px) that really do resolve against the root. Badge broke that
// justification: `padding: 0 .75em` and `border-radius: 1em` (badge.scss:6,12) resolve
// against badge's own 12px type, so production paints 9px and 12px where this checker
// was computing 12 and 16. The last knownIssue in contracts/badge.json predicted exactly
// this and named the unblocker — the 2026-08-20 de-flex made the base an absolute
// 0.75rem, so "the em values are computable from tokens alone". layout/container/max/*
// keep their old, correct answer for free: there is no `layout/font-size`, so emBasis
// falls back to the root.
//
// The leading `-?` matters: card/subtitle/margin-top is -0.4rem, the first NEGATIVE rem
// token in the system. Without it the match failed, parseFloat('-0.4rem') gave -0.4, and
// that was compared against Figma's correct -6.4 — a false error that would have been
// "fixed" by writing the wrong value into Figma.
function pxOf(token, key, bp, seen = new Set()) {
  const resolved = token.resolved ?? token.value;
  const rel = /^(-?[\d.]+)(r?em)$/.exec(String(resolved));
  if (rel) return parseFloat(rel[1]) * (rel[2] === 'rem' ? REM : emBasis(key, bp, seen));
  return token.px !== undefined ? token.px : parseFloat(String(resolved));
}

// The font-size, in px, that a bare `em` written under `key` resolves against. Falls back
// to the root whenever the owning component has no font-size token of its own, which is
// simultaneously the CORRECT answer for the semantic layout/* widths and the safe answer
// for anything unforeseen. `seen` breaks the cycle a font-size token expressed in em would
// otherwise create — pathological, but a checker must not hang on it, so the second visit
// to the same font-size takes the root fallback instead of recursing.
function emBasis(key, bp, seen) {
  const fsKey = `${String(key).split('/')[0]}/font-size`;
  const fs = catalog[fsKey];
  if (!fs || seen.has(fsKey)) return REM;
  seen.add(fsKey);
  const slice = fs.breakpoints ? fs.breakpoints[bp] : fs;
  if (!slice) return REM;
  const px = pxOf(slice, fsKey, bp, seen);
  return isNaN(px) ? REM : px;
}

// Compare one Figma mode value against the token value it should equal.
// `token` is a catalog entry (or one breakpoint slice of one); `key` is that entry's
// catalog key and `bp` its breakpoint, both needed only so a bare `em` can be resolved
// against the owning component's font-size in the same breakpoint context.
function compareValue(where, figmaValue, token, key, bp) {
  // Alias: check the TARGET NAME, not the resolved value — that is what catches a
  // re-aliasing (e.g. this session's site-name-narrow 100 -> 150 change).
  if (figmaValue && typeof figmaValue === 'object' && 'alias' in figmaValue) {
    if (!snapshot.variables[figmaValue.alias]) {
      errors.push(`${where}: alias target "${figmaValue.alias}" is not a variable in the snapshot`);
      return;
    }
    // The target must be compared under BOTH naming schemes. Most variables share their
    // name with the catalog key, but the semantic composite type styles do not: Figma
    // calls it font/size/heading/h1 where the catalog calls the bundle channel
    // heading-h1/font-size. catalogKeyFor already performs exactly this translation for
    // variable LOOKUP; without doing it here too, the first token to alias a composite
    // channel (page-title/font-size, 2026-08-17) reported a false "aliased to X but
    // tokens say Y" against a correctly-built variable.
    const targetKey = catalogKeyFor(figmaValue.alias, snapshot.variables[figmaValue.alias]);
    if (token.ref && token.ref !== figmaValue.alias && token.ref !== targetKey) {
      errors.push(`${where}: aliased to "${figmaValue.alias}" but tokens say "${token.ref}"`);
    }
    return;
  }

  const resolved = token.resolved ?? token.value;
  if (resolved === undefined || resolved === null) return;

  // Alpha colors: tokens author them as CSS-canonical rgba() strings; the readback
  // snapshots them as 8-digit hex (#RRGGBBAA). Both sides round with
  // Math.round(a * 255), so Figma's float32 noise (0.325 stored as
  // 0.32499998807907104) lands on the same byte and never false-positives.
  const rgbaMatch = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(String(resolved));
  if (typeof figmaValue === 'string' && figmaValue.startsWith('#') && rgbaMatch) {
    const byte = (n) => Math.round(Number(n)).toString(16).padStart(2, '0').toUpperCase();
    const [, r, g, b, a] = rgbaMatch;
    const alphaHex = a !== undefined && Number(a) < 1 ? byte(Number(a) * 255) : '';
    const expected = `#${byte(r)}${byte(g)}${byte(b)}${alphaHex}`;
    if (figmaValue.toUpperCase() !== expected) {
      errors.push(`${where}: Figma ${figmaValue} != token ${resolved} (${expected})`);
    }
    return;
  }

  // Colors are hex on both sides.
  if (typeof figmaValue === 'string' && figmaValue.startsWith('#')) {
    if (figmaValue.toUpperCase() !== String(resolved).toUpperCase()) {
      errors.push(`${where}: Figma ${figmaValue} != token ${resolved}`);
    }
    return;
  }

  // Font families: family name vs CSS stack.
  if (typeof figmaValue === 'string' && /rem|px|^#/.test(String(resolved)) === false && isNaN(Number(resolved))) {
    const expected = firstFamily(resolved);
    if (figmaValue !== expected) errors.push(`${where}: Figma "${figmaValue}" != token first family "${expected}"`);
    return;
  }

  if (typeof figmaValue === 'number') {
    // Figma stores every length as px, so the token has to be reduced to px too — see
    // pxOf for how each unit resolves and why `em` is not `rem`.
    const expected = pxOf(token, key, bp);
    if (!isNaN(expected) && !near(figmaValue, expected)) {
      errors.push(`${where}: Figma ${figmaValue} != token ${resolved} (${expected})`);
    }
  }
}

// ---------- 1. coverage: generated CSS properties <-> Figma variables ----------
const cssProps = new Set([...scss.matchAll(/(--uiowa-[\w-]+)\s*:/g)].map((m) => m[1]));
const claimedBy = new Map();
for (const [name, v] of Object.entries(snapshot.variables)) {
  const m = /^var\((--uiowa-[\w-]+)\)$/.exec(v.web ?? '');
  if (!m) continue;
  if (claimedBy.has(m[1])) {
    errors.push(`CSS property ${m[1]} is claimed by two Figma variables: ${claimedBy.get(m[1])} and ${name}`);
  }
  claimedBy.set(m[1], name);
  if (!cssProps.has(m[1])) {
    errors.push(`Figma variable "${name}" declares code syntax ${v.web}, which no longer exists in the generated SCSS`);
  }
}
for (const prop of cssProps) {
  if (!claimedBy.has(prop) && !CSS_PROPS_WITHOUT_FIGMA_VARIABLE.has(prop)) {
    errors.push(`Token ${prop} exists in the generated SCSS but no Figma variable declares it`);
  }
}

// ---------- 2. every Figma variable maps to a token, and its values agree ----------
for (const [name, v] of Object.entries(snapshot.variables)) {
  const key = catalogKeyFor(name, v);
  if (!key) {
    errors.push(`Figma variable "${name}" does not correspond to any token in catalog/tokens.json`);
    continue;
  }
  const token = catalog[key];

  if (token.breakpoints) {
    // Component tier: one Figma mode per breakpoint.
    for (const [figmaMode, value] of Object.entries(v.modes)) {
      const bp = COMPONENT_MODES[figmaMode];
      if (!bp) { errors.push(`${name}: unexpected Figma mode "${figmaMode}" (collection modes renamed?)`); continue; }
      const slice = token.breakpoints[bp];
      if (!slice) { errors.push(`${name}: token has no "${bp}" breakpoint`); continue; }
      compareValue(`${name} [${figmaMode}]`, value, slice, key, bp);
    }
  } else if (v.collection === 'Semantic' && Object.keys(v.modes).length === 2) {
    // Semantic tier: small (600) is the -mobile twin, large (1310) the desktop value.
    // Composites that don't change size have no twin, so fall back to the same token.
    for (const [figmaMode, value] of Object.entries(v.modes)) {
      const which = SEMANTIC_MODES[figmaMode];
      if (!which) { errors.push(`${name}: unexpected Figma mode "${figmaMode}"`); continue; }
      let target = token;
      let targetKey = key;
      if (which === 'mobile') {
        const twinKey = key.replace(/^([\w-]+)\//, '$1-mobile/');
        if (catalog[twinKey]) { target = catalog[twinKey]; targetKey = twinKey; }
      }
      compareValue(`${name} [${figmaMode}]`, value, target, targetKey);
    }
  } else {
    for (const [figmaMode, value] of Object.entries(v.modes)) {
      compareValue(`${name} [${figmaMode}]`, value, token, key);
    }
  }
}

// ---------- 3. documentation-only variables ----------
// layout/breakpoint/* exist for designers and docs but are NEVER emitted to CSS
// (a custom property cannot drive an @media query), so they must carry no WEB code
// syntax and no scopes — otherwise they show up in pickers and invite misuse.
for (const [name, v] of Object.entries(snapshot.variables)) {
  if (!name.startsWith('layout/breakpoint/')) continue;
  if (v.web) errors.push(`${name}: documentation-only variable must have no WEB code syntax (has ${v.web})`);
  if (v.scopes.length) errors.push(`${name}: documentation-only variable must have empty scopes (has ${v.scopes.join(', ')})`);
}

// ---------- 4 + 5. contracts <-> component sets ----------
const contractFiles = readdirSync(join(root, 'contracts'))
  .filter((f) => f.endsWith('.json') && !['contract.schema.json', 'rules.json'].includes(f));
const contracts = new Map(contractFiles.map((f) => [`contracts/${f}`, readJson(`contracts/${f}`)]));
const componentTierTokens = new Set(
  Object.entries(catalog).filter(([, t]) => t.tier === 'component').map(([k]) => k)
);

for (const [file, contract] of contracts) {
  const setName = contract.identity?.figma?.componentSetName;
  if (!setName) {
    // Foundation contracts have no component set — but a contract that records a
    // set ID or key without the NAME would silently skip every axes/bound check
    // below (the Headline contract shipped that way for one commit, 2026-08-15).
    if (contract.identity?.figma?.componentSetId || contract.identity?.figma?.componentKey) {
      errors.push(`${file}: identity.figma has componentSetId/componentKey but no componentSetName — set checks would be silently skipped; add the name`);
    }
    continue;
  }
  const set = snapshot.componentSets[setName];
  if (!set) {
    errors.push(`${file}: identity.figma.componentSetName "${setName}" is not in the snapshot`);
    continue;
  }
  if (contract.identity.figma.componentSetId && contract.identity.figma.componentSetId !== set.id) {
    errors.push(`${file}: componentSetId ${contract.identity.figma.componentSetId} != snapshot ${set.id}`);
  }

  // 4. Each contract option that declares a Figma axis must match that axis's values.
  for (const opt of contract.options ?? []) {
    const axis = opt.figma?.axis;
    if (!axis) continue;
    const actual = set.axes[axis];
    if (!actual) {
      errors.push(`${file}: option "${opt.name}" maps to Figma axis "${axis}", absent from set "${setName}" (axes: ${Object.keys(set.axes).join(', ')})`);
      continue;
    }
    // The contract's map values are the axis values it claims to cover. Every one
    // must exist; extras in Figma are allowed only if the contract documents them
    // (e.g. Brand Bar's Style=Parent Title, which maps to slots rather than a prop).
    for (const expected of Object.values(opt.figma.map ?? {})) {
      if (!actual.includes(expected)) {
        errors.push(`${file}: option "${opt.name}" expects axis ${axis}="${expected}", but Figma has [${actual.join(', ')}]`);
      }
    }
  }

  // 5. Component-tier variables bound inside the set must be claimed by this
  // contract or by a child's (Brand Bar legitimately binds logo/* because it nests
  // the Logo component). Semantic/primitive bindings are always fine.
  const allowed = new Set(contract.tokensUsed ?? []);
  for (const child of contract.children ?? []) {
    for (const t of contracts.get(child.contract)?.tokensUsed ?? []) allowed.add(t);
  }
  for (const bound of set.boundVariables) {
    if (!componentTierTokens.has(bound)) continue;
    if (!allowed.has(bound)) {
      errors.push(`${file}: set "${setName}" binds component token "${bound}", which is not in tokensUsed (or a child contract's)`);
    }
  }

  // 6. The Figma description must POINT AT this contract.
  //
  // Until 2026-08-21 this surface was unguarded in both directions: the readback
  // captured no description and nothing here read one, so a description could be
  // absent, or a stale COPY of contract prose, and no gate would ever say so. A
  // spot-check that day found 13 of 23 sets had no description at all.
  //
  // The check is deliberately for the POINTER and nothing else. Asserting that the
  // prose matched the contract would just relocate the staleness problem into the
  // checker, and it would fight every legitimate Figma-only note (Card's drawn-widths
  // rationale, Brand Bar's second-row behaviour). A path reference stays true for as
  // long as the contract exists, and it tells a designer where the authority is.
  if (!('description' in set)) {
    errors.push(`${file}: snapshot set "${setName}" has no description field — refresh figma/snapshot.json with the current scripts/figma-readback.js`);
  } else if (!set.description.includes(file)) {
    const shown = set.description ? `has "${set.description.slice(0, 60)}…"` : 'is EMPTY';
    errors.push(`${file}: Figma set "${setName}" description must name its contract (${file}) — ${shown}. contracts/README.md step 5: the description is the contract POINTER, not a copy of its prose.`);
  }
}

// ---------- Report ----------
for (const e of errors) console.log(`ERROR ${e}`);
const counts = `${Object.keys(snapshot.variables).length} variables | ${Object.keys(snapshot.componentSets).length} component sets`;
console.log(`\nfigma: ${counts} | errors: ${errors.length}`);
process.exit(errors.length ? 1 : 0);
