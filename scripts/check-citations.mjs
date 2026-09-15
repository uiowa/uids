/**
 * check-citations.mjs — verify that `file.ext:LINE` citations in the AUTHORED prose
 * actually point at what they claim to.
 *
 * WHY THIS EXISTS
 *
 * The contracts and token files are dense with citations — `banner.scss:323`,
 * `Banner.vue:151`, `regression/baselines/banner.json:72`. They are the load-bearing
 * evidence for every "not tokenized because…" argument in the repo, and NOTHING checked
 * them. `check-contracts.mjs` validates that `tokensUsed` RESOLVES; it has never read a
 * line number. So a citation could rot silently, and the rot is worse than a missing
 * citation: a stale pointer reads as verified, and the next agent rebinds the value it
 * finds at that line instead of the value the sentence is about.
 *
 * The failure is not hypothetical. On 2026-08-22 a review pass machine-resolved the 36
 * `banner.scss:N` references in `contracts/banner.json` by hand and found roughly six
 * stale — including `options.height.description` citing `:365-374` for the aspect-ratio
 * hack that actually lives at `:371-380`, one field away from a NEW entry that cited it
 * correctly. Doing that by hand cost a large review; it is a query, so it should be a gate.
 *
 * WHAT IT CHECKS, AND WHY IT IS DELIBERATELY LOPSIDED
 *
 *   ERROR   — the cited line is past the end of the file. Unambiguous: the file shrank
 *             or the path is wrong. No judgement required, so it can block.
 *
 *   WARN    — a backticked snippet sitting next to the citation EXISTS in the cited file
 *             but NOT at the cited line. This is the self-healing check: it reports where
 *             the text actually is, so the fix is a number, not an investigation.
 *
 *   SILENT  — the snippet is not found anywhere in the file. That is the common, innocent
 *             case: the prose paraphrases rather than quotes ("the gate at banner.scss:318"),
 *             or the snippet is a token name, or SCSS compiles the quoted form from
 *             something spelled differently. Warning on those would drown the signal, and
 *             a checker nobody reads is worse than no checker.
 *
 * The asymmetry is the whole design. "Line 900 of a 400-line file" is a fact. "This text
 * is elsewhere in the same file" is strong evidence. "I could not find this text" is not
 * evidence of anything, so it says nothing at all.
 *
 * IS in `yarn check:drift`, from introduction. That was not the original plan — the repo's
 * own rule is to land a checker before the data conforms, so its output is a to-do list
 * rather than a puzzle — but the first run turned up exactly ONE error (a 33-36 citation
 * into a 34-line file), which was cheap to fix, so the gate went in green. The 15 warnings
 * it also found are the to-do list, and they do not block.
 *
 * Promote the content probe from WARN to ERROR only once those 15 are cleared AND the
 * probe has stayed quiet across a few real changes. Note what the first run taught about
 * the checker itself: it reported 35 warnings and 2 errors before two false-positive
 * mechanisms were closed — snippets were being paired with every citation within 200
 * characters rather than their nearest one, and a qualified path was falling back to a
 * basename match, which resolved `uids/scss/components/brand-footer.scss` (the UPSTREAM
 * repo) onto this repo's copy and reported a confident "the file shrank". A checker's own
 * first output is data about the checker, not only about the data.
 *
 * Usage:
 *   node scripts/check-citations.mjs            # contracts/ + tokens/
 *   node scripts/check-citations.mjs --verbose  # also list every citation checked
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERBOSE = process.argv.includes('--verbose');

// How far from the cited line a snippet may sit before it counts as misplaced. Ranges in
// this repo are hand-written and often off by a line or two at the edges; 3 absorbs that
// without absorbing a real relocation.
const WINDOW = 3;
// How far from the citation a backticked snippet may sit to be considered its evidence.
// The house style is `snippet` (file:line) or `snippet` at file:line, so this is generous.
const NEAR = 200;
const MIN_SNIPPET = 8;

const SOURCE_DIRS = ['contracts', 'tokens'];
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'storybook-static', 'coverage', '.yarn']);
const CITABLE = /\.(scss|vue|ts|js|mjs|cjs|json|html|md)$/;

// ---------- index every file in the repo, so a bare basename can be resolved ----------
const byBasename = new Map();
const allPaths = [];
(function walk(dir) {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.claude') continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    const rel = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walk(rel);
    else if (CITABLE.test(entry.name)) {
      allPaths.push(rel);
      if (!byBasename.has(entry.name)) byBasename.set(entry.name, []);
      byBasename.get(entry.name).push(rel);
    }
  }
})('');

const lineCache = new Map();
function linesOf(rel) {
  if (!lineCache.has(rel)) {
    lineCache.set(rel, readFileSync(join(root, rel), 'utf8').split('\n'));
  }
  return lineCache.get(rel);
}

/** Candidate repo paths a citation string might mean. Ambiguity is resolved by trying all. */
function resolve(cited) {
  const out = [];
  if (cited.includes('/')) {
    // A citation that spells out a path must MATCH that path. Falling back to the
    // basename here is what made `uids/scss/components/brand-footer.scss` — a pointer at
    // the upstream uiowa/uids checkout — resolve to this repo's brand-footer.scss and
    // report a confident, wrong "the file shrank". A qualified path that matches nothing
    // here is out of scope, not stale.
    if (existsSync(join(root, cited)) && statSync(join(root, cited)).isFile()) out.push(cited);
    for (const p of allPaths) if (p.endsWith('/' + cited)) out.push(p);
    return [...new Set(out)];
  }
  return [...new Set(byBasename.get(basename(cited)) ?? [])];
}

const norm = (s) => s.replace(/\s+/g, ' ').trim();

/**
 * Is `snippet` worth probing? Rejects the things that would generate noise rather than
 * signal: token names (badge/padding/inline), bare custom properties that appear on
 * dozens of lines, prose fragments, and anything too short to be distinctive.
 */
function probeworthy(snippet) {
  const s = norm(snippet);
  if (s.length < MIN_SNIPPET) return false;
  if (/^[a-z0-9-]+\/[a-z0-9/-]+$/.test(s)) return false; // token name
  if (/^--[a-z-]+$/.test(s)) return false; // bare custom property
  if (/^\$[a-z-]+$/.test(s)) return false; // bare Sass variable
  if (!/[:{}()=]/.test(s)) return false; // no code punctuation — almost certainly prose
  return true;
}

/** Where does `snippet` appear in `rel`? Returns 1-based line numbers. */
function findSnippet(rel, snippet) {
  const target = norm(snippet);
  const lines = linesOf(rel);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    if (norm(lines[i]).includes(target)) { hits.push(i + 1); continue; }
    // A declaration wrapped across two lines still counts as present.
    if (i + 1 < lines.length && norm(lines[i] + ' ' + lines[i + 1]).includes(target)) hits.push(i + 1);
  }
  return hits;
}

// ---------- collect every string in the source files, with its JSON path ----------
const strings = [];
function harvest(rel) {
  const data = JSON.parse(readFileSync(join(root, rel), 'utf8'));
  (function walk(node, path) {
    if (typeof node === 'string') { strings.push({ file: rel, path, text: node }); return; }
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
    }
  })(data, '');
}
for (const dir of SOURCE_DIRS) {
  (function walkDir(d) {
    for (const entry of readdirSync(join(root, d), { withFileTypes: true })) {
      const rel = `${d}/${entry.name}`;
      if (entry.isDirectory()) walkDir(rel);
      else if (entry.name.endsWith('.json') && entry.name !== 'contract.schema.json') harvest(rel);
    }
  })(dir);
}

// ---------- check ----------
const CITATION = /\b([A-Za-z0-9_][A-Za-z0-9_.\-/]*\.(?:scss|vue|ts|js|mjs|cjs|json|html|md)):(\d+)(?:\s*[-–]\s*(\d+))?/g;

const errors = [];
const warnings = [];
const unresolved = new Map();
let checked = 0;
let probed = 0;

for (const { file, path, text } of strings) {
  // Backticked snippets and where they sit, so a citation can be paired with its evidence.
  const snippets = [...text.matchAll(/`([^`]+)`/g)].map((m) => ({ at: m.index, body: m[1] }));
  const cites = [...text.matchAll(CITATION)];

  // Assign each snippet to its NEAREST citation. Without this, a string like
  // "…max-width: $container-width (banner.scss:131) and the narrow caps `calc(50% - 81.875em / 2)`
  // (banner.scss:424-436)" pairs the calc() with :131 as well as :424-436, and reports the
  // correct citation as broken. A snippet is evidence for one claim, not for every claim
  // within 200 characters of it.
  const owner = new Map();
  for (const s of snippets) {
    if (!probeworthy(s.body)) continue;
    let best = null;
    let bestDist = Infinity;
    for (const c of cites) {
      const d = Math.abs(c.index - s.at);
      if (d <= NEAR && d < bestDist) { best = c; bestDist = d; }
    }
    if (best) {
      if (!owner.has(best.index)) owner.set(best.index, []);
      owner.get(best.index).push(s);
    }
  }

  // Every line this string claims, so a snippet landing on a line some OTHER citation in
  // the same sentence already covers is not reported — the string is right, and only the
  // pairing was ambiguous.
  const claimed = cites.map((c) => [Number(c[2]), Number(c[3] ?? c[2])]);
  const isClaimed = (line) => claimed.some(([a, b]) => line >= a - WINDOW && line <= b + WINDOW);

  for (const m of cites) {
    const [, cited, startStr, endStr] = m;
    const start = Number(startStr);
    const end = endStr ? Number(endStr) : start;
    const candidates = resolve(cited);
    checked++;

    if (!candidates.length) {
      // Very often a legitimate pointer into the downstream SiteNow repo, or a file that
      // simply is not part of this checkout. Collected and reported once, not per hit.
      unresolved.set(cited, (unresolved.get(cited) ?? 0) + 1);
      continue;
    }

    // Bounds: pass if ANY candidate path contains the line, so an ambiguous basename
    // cannot manufacture a false error.
    const inBounds = candidates.filter((c) => linesOf(c).length >= end);
    if (!inBounds.length) {
      const shown = candidates.map((c) => `${c} has ${linesOf(c).length} lines`).join('; ');
      errors.push(
        `${file} ${path}: cites ${cited}:${endStr ? `${start}-${end}` : start}, but ${shown}. ` +
          `The file shrank or the path is wrong — the citation cannot be right.`
      );
      continue;
    }

    // Content probe against the snippets this citation actually owns.
    const near = owner.get(m.index) ?? [];
    if (!near.length) continue;

    let landed = false;
    const elsewhere = [];
    for (const s of near) {
      for (const cand of inBounds) {
        const hits = findSnippet(cand, s.body);
        if (!hits.length) continue;
        probed++;
        if (hits.some((h) => h >= start - WINDOW && h <= end + WINDOW)) { landed = true; break; }
        // Some other citation in the same string already covers where the text really is.
        if (hits.some(isClaimed)) { landed = true; break; }
        elsewhere.push({ cand, body: norm(s.body), hits });
      }
      if (landed) break;
    }

    if (!landed && elsewhere.length) {
      const e = elsewhere[0];
      warnings.push(
        `${file} ${path}: cites ${cited}:${endStr ? `${start}-${end}` : start}, but \`${e.body.slice(0, 70)}\` ` +
          `is at ${e.cand}:${e.hits.slice(0, 3).join(', ')}${e.hits.length > 3 ? ' …' : ''}. ` +
          `Text found, wrong line — the fix is the number.`
      );
    }
  }
}

if (VERBOSE) {
  console.log(`indexed ${allPaths.length} files | harvested ${strings.length} strings`);
}
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
if (unresolved.size) {
  const list = [...unresolved.entries()].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f} (${n}x)`);
  console.log(
    `\nNOTE  ${unresolved.size} cited path(s) are not in this checkout — expected for ` +
      `downstream SiteNow paths, worth a look otherwise: ${list.slice(0, 12).join(', ')}` +
      `${list.length > 12 ? `, +${list.length - 12} more` : ''}`
  );
}
console.log(
  `\ncitations: ${checked} checked | ${probed} content-probed | ` +
    `errors: ${errors.length} | warnings: ${warnings.length}`
);
process.exit(errors.length ? 1 : 0);
