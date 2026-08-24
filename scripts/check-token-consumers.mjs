/**
 * check-token-consumers.mjs — verify that every emitted token is actually READ by
 * something, and say WHERE from.
 *
 * WHY THIS EXISTS
 *
 * `build-tokens --check` proves the generated SCSS matches `tokens/`. `check-contracts`
 * proves every `tokensUsed` entry RESOLVES. `check-figma` proves a Figma binding is
 * declared in `tokensUsed`. Between them they answer "is this token well-formed, and does
 * the artifact match the source?" — and none of them answers the question that actually
 * bit us: DOES ANY STYLESHEET READ IT?
 *
 * On 2026-08-24 the answer for the whole layout tier turned out to be no. All fourteen
 * `--uiowa-layout-*` custom properties had ZERO consumers in `src/scss`; the only thing
 * reading them was `claude-design/layout.css`, a hand-written preview file. Shipped UIDS
 * CSS was still reading `$desktop-width-gutter: 3rem` and friends straight out of
 * `_variables.scss`. So the token layer rendered correctly in Figma and in the Claude
 * Design preview and had no effect whatsoever on `dist/uids.css`. A token edit would have
 * moved three of the five views and left the one that ships behind — silently, with
 * `check:drift` green the whole way.
 *
 * That is the same shape as the two gaps already documented in CLAUDE.md (`check-figma`
 * enforces bound ⊆ `tokensUsed` but never the converse; `check-claude-design` guards a
 * view with no compiler): a checker that looks authoritative while an entire direction of
 * drift passes underneath it.
 *
 * WHY IT MUST BE ALIAS-AWARE
 *
 * The naive version — "grep for var(--uiowa-x), report zero hits" — is worse than nothing,
 * because a correctly-layered primitive looks exactly like a dead one. `--uiowa-space-300`
 * is read by no component stylesheet; it is read by `--uiowa-layout-section-padding-default`,
 * which is read by a stylesheet. Reporting that as an orphan trains people to ignore the
 * output. So this builds the alias graph and propagates reachability DOWN it: a token is
 * reached if it is read directly, or if anything that aliases TO it is reached.
 *
 * The graph deliberately includes NON-`--uiowa-*` custom properties, because the shipped
 * alias layer runs through them. `uids-core.scss` declares
 * `--space-sm-width-gutter: var(--uiowa-space-125)`, and `.element--padding__all--sm`
 * reads the former. Drop those nodes and `--uiowa-space-125` reads as an orphan. Only
 * `--uiowa-*` tokens are REPORTED; everything else is graph plumbing.
 *
 * WHAT IT REPORTS
 *
 *   orphan    — nothing reaches it, from any view. Either dead, or consumed only by
 *               uids_base downstream (a real and legitimate case — see space/110, whose
 *               own token comment names `layout--onecol--fixed` in uids_base). The
 *               checker cannot tell those apart from inside this repo, which is exactly
 *               why the allowlist demands a written reason instead of a bare name.
 *
 *   doc-only  — reached from `claude-design/` but never from shipped SCSS. This is the
 *               layout-tier failure above. It is the more dangerous of the two: the token
 *               looks alive, renders in previews, and still does not ship.
 *
 * SEVERITY, AND WHY IT STARTS SOFT
 *
 * Warnings by default; `--strict` promotes orphan and doc-only to errors. The repo's own
 * rule is checker-first — land the gate, and its output is a to-do list rather than a
 * puzzle — but the data does not conform yet and other branches are in flight, so a hard
 * gate here would turn someone else's green run red for a defect they did not introduce.
 * Flip `check:drift` to `--strict` once the utility-class rebind lands.
 *
 * A stale allowlist entry (listed, but no longer an orphan) is ALWAYS a warning, never an
 * error. It means someone fixed something; that should not block them.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const VERBOSE = process.argv.includes('--verbose');

const GENERATED_SCSS = 'src/scss/abstracts/_tokens-generated.scss';
const GENERATED_CSS = 'claude-design/tokens.css';
const ALLOWLIST = 'tokens/orphans-allowed.json';

// Where a read counts as "this token ships". claude-design is a documentation view and
// deliberately does NOT count — that distinction is the whole point of the doc-only class.
const SHIPPED_ROOTS = ['src'];
const PREVIEW_ROOTS = ['claude-design'];
const SCANNED_EXT = /\.(scss|css|vue|js|ts|mjs|html)$/;

const errors = [];
const warnings = [];

// ---------- collect files ----------

function walk(dir) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { recursive: true })
    .map((f) => join(dir, String(f)))
    .filter((f) => SCANNED_EXT.test(f) && statSync(join(root, f)).isFile());
}

// ---------- parse one file into alias edges + direct reads ----------

/**
 * A `var(--x)` on the right-hand side of a custom-property DECLARATION is an alias edge,
 * not a read: `--a: var(--b)` does not prove anyone wants --b's value on screen. A
 * `var(--x)` anywhere else is a read. Splitting on `;` and looking only after the last
 * `{` isolates the declaration head without needing a real CSS parser.
 */
function scanSource(text) {
  const stripped = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  const edges = [];
  const reads = [];
  const declared = [];
  for (const chunk of stripped.split(';')) {
    const seg = chunk.slice(chunk.lastIndexOf('{') + 1);
    const decl = /^\s*(--[A-Za-z0-9_-]+)\s*:([\s\S]*)$/.exec(seg);
    const refs = [...seg.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)].map((m) => m[1]);
    if (decl) {
      declared.push(decl[1]);
      for (const r of refs) edges.push([decl[1], r]);
    } else {
      reads.push(...refs);
    }
  }
  return { edges, reads, declared };
}

// ---------- build the graph ----------

if (!existsSync(join(root, GENERATED_SCSS))) {
  console.log(`ERROR ${GENERATED_SCSS} is missing — run \`node scripts/build-tokens.mjs\` first`);
  process.exit(1);
}

const tokens = new Set(); // the --uiowa-* names this checker reports on
const aliasTo = new Map(); // parent -> Set(children it aliases to)

function addEdges(edges) {
  for (const [from, to] of edges) {
    if (!aliasTo.has(from)) aliasTo.set(from, new Set());
    aliasTo.get(from).add(to);
  }
}

{
  const { edges, declared } = scanSource(readFileSync(join(root, GENERATED_SCSS), 'utf8'));
  addEdges(edges);
  for (const d of declared) if (d.startsWith('--uiowa-')) tokens.add(d);
}

// The non-generated alias layer (`--space-sm-width-gutter: var(--uiowa-space-125)` in
// uids-core.scss and anything like it). These files are ALSO consumers, handled below —
// this pass only harvests their edges so reachability can flow through them.
const shippedFiles = SHIPPED_ROOTS.flatMap(walk).filter((f) => f !== GENERATED_SCSS);
const previewFiles = PREVIEW_ROOTS.flatMap(walk).filter((f) => f !== GENERATED_CSS);

const directShipped = new Set();
const directPreview = new Set();
const readSites = new Map(); // token -> Set(file) — so a report can name a place to look

function ingest(files, directSet) {
  for (const f of files) {
    const { edges, reads } = scanSource(readFileSync(join(root, f), 'utf8'));
    addEdges(edges);
    for (const r of reads) {
      directSet.add(r);
      if (!readSites.has(r)) readSites.set(r, new Set());
      readSites.get(r).add(f);
    }
  }
}

ingest(shippedFiles, directShipped);
ingest(previewFiles, directPreview);

// ---------- propagate reachability down the alias edges ----------

function reachable(seeds) {
  const seen = new Set();
  const queue = [...seeds];
  while (queue.length) {
    const n = queue.pop();
    if (seen.has(n)) continue;
    seen.add(n);
    for (const child of aliasTo.get(n) ?? []) if (!seen.has(child)) queue.push(child);
  }
  return seen;
}

const reachedShipped = reachable(directShipped);
const reachedPreview = reachable(directPreview);

// ---------- allowlist ----------

let allowed = {};
if (existsSync(join(root, ALLOWLIST))) {
  const raw = JSON.parse(readFileSync(join(root, ALLOWLIST), 'utf8'));
  allowed = raw.allowed ?? {};
  for (const [name, reason] of Object.entries(allowed)) {
    if (typeof reason !== 'string' || reason.trim().length < 12) {
      errors.push(
        `${ALLOWLIST}: "${name}" has no usable reason. An allowlist without reasons is a ` +
          `list of things nobody has to think about again — write where it IS consumed.`
      );
    }
  }
}

// ---------- classify ----------

// An exemption is inherited by everything the exempt token aliases to. Saying
// "layout/block/stack/default ships from uids_base" necessarily says the same of the
// space/160 underneath it, and making someone list both teaches them the allowlist is
// bookkeeping rather than an argument.
const reachedAllowed = reachable(Object.keys(allowed));

const orphans = [];
const docOnly = [];

for (const t of [...tokens].sort()) {
  if (reachedShipped.has(t) || reachedAllowed.has(t)) continue;
  if (reachedPreview.has(t)) docOnly.push(t);
  else orphans.push(t);
}

const report = STRICT ? errors : warnings;

for (const t of orphans) {
  report.push(`${t}: ORPHAN — no stylesheet in src/ or claude-design/ reads it, directly or through an alias. Wire it up, or record where it IS consumed in ${ALLOWLIST}.`);
}

for (const t of docOnly) {
  const where = [...(readSites.get(t) ?? [])].slice(0, 2).join(', ');
  report.push(`${t}: DOC-ONLY — read by ${where || 'claude-design/'} but by nothing in src/. It previews correctly and does not ship.`);
}

// Stale entries: always soft. Somebody fixed something; do not punish them for it.
for (const name of Object.keys(allowed)) {
  if (!tokens.has(name)) {
    warnings.push(`${ALLOWLIST}: "${name}" is not an emitted token any more — drop the entry.`);
  } else if (reachedShipped.has(name)) {
    warnings.push(`${ALLOWLIST}: "${name}" is consumed by src/ now — drop the entry.`);
  }
}

// ---------- output ----------

if (VERBOSE) {
  console.log(
    `graph: ${tokens.size} tokens | ${aliasTo.size} aliasing nodes | ` +
      `scanned ${shippedFiles.length} shipped + ${previewFiles.length} preview files`
  );
}
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);

const allowedCount = Object.keys(allowed).length;
console.log(
  `\ntoken consumers: ${tokens.size} emitted | ${orphans.length} orphan | ` +
    `${docOnly.length} doc-only | ${allowedCount} allowlisted | ` +
    `errors: ${errors.length} | warnings: ${warnings.length}` +
    (STRICT ? '' : '  (soft — pass --strict to gate)')
);
process.exit(errors.length ? 1 : 0);
