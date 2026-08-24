#!/usr/bin/env node
/**
 * check-judge-rules.mjs — bind the judge's rule-id vocabulary to `contracts/rules.json`.
 *
 * WHY THIS EXISTS
 *
 * `CLAUDE.md` and `contracts/rules.json`'s own description both say rules.json is THE ONLY
 * PLACE A GOVERNANCE RULE IS EDITED, and `eval/README.md` says "the taxonomy in rules.json
 * stays the authority". `scripts/judge.mjs` names a rule id in every violation it reports.
 * Nothing connected the two.
 *
 * Found 2026-08-22 while reviewing `docs/examples/rules.example.json`: judge.mjs read
 * rules.json into `const ruleById = new Map(...)` and then never referenced it — dead code,
 * presumably written to enforce exactly this coupling and never finished. So renaming or
 * deleting a rule id in rules.json broke the judge's reporting silently: the judge kept
 * emitting the old id, every generated report cited a rule that no longer existed, and no
 * checker noticed. rules.example.json had to carry a CORRECTED note saying so, and telling
 * the reader to re-score the fixtures by hand.
 *
 * WHY A STATIC CHECKER AND NOT VALIDATION INSIDE THE JUDGE
 *
 * The obvious fix — have judge.mjs validate each id as it emits it — is weaker, for two
 * reasons that matter:
 *
 *   1. The judge emits an id ONLY when a page violates that rule. A clean page emits
 *      nothing, so it would validate nothing. The governed fixture scores 100/100 with zero
 *      violations: detection would be anti-correlated with the healthy case, and a renamed
 *      rule would stay hidden until someone happened to judge a page that broke it.
 *   2. It puts the failure in the wrong place. A rules.json rename would then crash the
 *      SCORING harness mid-A/B. The judge's contract is "a deterministic score for a page
 *      you supply"; a repo-consistency bug must not break that.
 *
 * Checking the vocabulary statically detects the rename at the moment it happens, whatever
 * any page contains. And it respects the boundary in `CLAUDE.md`: `yarn judge` is NOT in
 * `check:drift` because it grades inputs you supply. This checker grades the REPO — it reads
 * judge.mjs as text and never runs it against anything — so it belongs in the chain.
 *
 * WHAT IT CHECKS
 *
 *   1. Every rule id judge.mjs emits is either in rules.json or a declared VIEW_LOCAL id.
 *   2. Every VIEW_LOCAL id is actually emitted (no stale exceptions).
 *   3. No VIEW_LOCAL id is ALSO in rules.json (if a rule gets promoted into rules.json, the
 *      exception must go, so the id is governed by the file rather than by this list).
 *   4. Each VIEW_LOCAL entry's `view` and `enforcedBy` paths exist. Pointers only — never the
 *      prose, the same discipline `check-figma` uses for contract pointers in Figma
 *      descriptions. Asserting the wording would just relocate the staleness into here.
 *   5. `eval/README.md`'s check-to-rule table lists exactly the emitted ids, both directions.
 *      That table is the documented mapping; nothing kept it honest either.
 *
 * The vocabulary is DERIVED from judge.mjs's source, never declared here. A hand-written
 * list of "ids the judge emits" would be the same bug one level up — a snapshot of someone's
 * attention that silently rots. Which means this checker has to detect its own blindness:
 * if the `add()` helper is renamed, or any call site passes a non-literal id, the derivation
 * would quietly return a short list and pass. Both cases are hard errors below.
 *
 * WHAT IT DELIBERATELY DOES NOT CHECK
 *
 * That every rules.json id is emitted by the judge. Four are not, correctly:
 * `respect-breakpoint-modes` is a Figma rule enforced by `check-figma`, and
 * `contract-first-changes` / `item-list-is-stacked-cards` / `page-title-under-brand-bar` are
 * `enforcement: agent` — guidance only a human review can verify. Note that
 * `enforcement: "judge"` in rules.json means "mechanically checkable by a checker script OR
 * Figma readback", NOT "judge.mjs emits it" — so do not be tempted to assert that either;
 * `respect-breakpoint-modes` is judge-enforcement and would fail it.
 *
 * Usage: node scripts/check-judge-rules.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const JUDGE = 'scripts/judge.mjs';
const RULES = 'contracts/rules.json';
const README = 'eval/README.md';

// Rule ids the judge may emit that are deliberately NOT in contracts/rules.json.
//
// rules.json's own scope rule: "A rule that describes a single VIEW's own mechanics does NOT
// belong here — it belongs in that view." So a view-local rule is not drift, but it is the
// ONLY legitimate way an emitted id can be absent from rules.json — hence an explicit,
// justified list rather than a blanket exemption. Each entry names the view that owns the
// rule and the checker that enforces it there; both paths are verified to exist.
const VIEW_LOCAL = {
  'no-bare-element-styles': {
    why: "dc-import shares one document and one cascade, so a bare `h2 {}` in a page's own <style> reaches inside every component it imports. That is a fact about the claude-design view's runtime, not about UIDS.",
    view: 'claude-design/readme.md',
    enforcedBy: 'scripts/check-claude-design.mjs',
  },
};

const errors = [];

// ---------- 1. derive the emitted vocabulary from judge.mjs ----------
const judgeSrc = read(JUDGE);
const lineAt = (idx) => judgeSrc.slice(0, idx).split('\n').length;

// Anchor the derivation on the helper. If it is renamed or inlined, every regex below still
// "works" and returns a plausible-looking list, which is the silent pass worth preventing.
if (!/const add = \(rule, severity, line, message\)/.test(judgeSrc)) {
  errors.push(
    `${JUDGE}: cannot find the \`const add = (rule, severity, line, message)\` helper that ` +
      `this checker derives the rule vocabulary from. If the judge's violation-reporting shape ` +
      `changed, update the extraction here — do not leave it matching nothing, because nothing ` +
      `is what it would report.`
  );
}

// `add(` not preceded by a dot or word char, so Set.add() calls (fontSizes.add, declaredVars.add)
// are excluded. Two passes: all call sites, then only those with a literal first argument. A
// difference between the counts means an id is computed at runtime and the vocabulary is no
// longer statically knowable.
const allCalls = [...judgeSrc.matchAll(/(?<![.\w])add\(/g)];
const literalCalls = [...judgeSrc.matchAll(/(?<![.\w])add\(\s*(?:'([^']+)'|"([^"]+)")\s*,/g)];
const emitted = new Set(literalCalls.map((m) => m[1] ?? m[2]));

if (allCalls.length !== literalCalls.length) {
  const literalIdx = new Set(literalCalls.map((m) => m.index));
  const bad = allCalls.filter((m) => !literalIdx.has(m.index)).map((m) => lineAt(m.index));
  errors.push(
    `${JUDGE}: ${allCalls.length - literalCalls.length} add() call(s) at line(s) ${bad.join(', ')} ` +
      `do not pass a string-literal rule id. The id must stay a literal so this checker can read ` +
      `the vocabulary out of the source; a computed id is unverifiable and would silently shrink ` +
      `the set this check covers.`
  );
}
if (!emitted.size) {
  errors.push(`${JUDGE}: extracted zero rule ids. The derivation is broken, not the judge.`);
}

// ---------- 2. the authority ----------
const ruleIds = new Set(JSON.parse(read(RULES)).rules.map((r) => r.id));
const viewLocalIds = new Set(Object.keys(VIEW_LOCAL));

// ---------- 3. emitted ⊆ rules.json ∪ view-local ----------
for (const id of [...emitted].sort()) {
  if (ruleIds.has(id) || viewLocalIds.has(id)) continue;
  errors.push(
    `${JUDGE} emits rule id "${id}", which is not in ${RULES} and is not a declared view-local ` +
      `rule. Either it was renamed or removed there (fix the judge and re-score the eval fixtures), ` +
      `or it is genuinely view-local — in which case add it to VIEW_LOCAL in this file with the ` +
      `view that owns it and the checker that enforces it.`
  );
}

// ---------- 4. the converse, on the exceptions ----------
// check-figma enforces "bound ⊆ tokensUsed" and never the converse, and the repo has the gap
// written down as a known blind spot. Same shape here: without these two checks a VIEW_LOCAL
// entry could outlive the check it exempts, or shadow a rule that has since been promoted
// into rules.json, and the exemption would keep silently applying.
for (const [id, meta] of Object.entries(VIEW_LOCAL)) {
  if (!emitted.has(id)) {
    errors.push(
      `VIEW_LOCAL declares "${id}" but ${JUDGE} no longer emits it. Remove the entry — a stale ` +
        `exemption widens what this checker will accept for no reason.`
    );
  }
  if (ruleIds.has(id)) {
    errors.push(
      `VIEW_LOCAL declares "${id}" as view-local, but it is now a rule in ${RULES}. A rule cannot ` +
        `be both: drop the VIEW_LOCAL entry so the id is governed by ${RULES}, or remove it from ` +
        `${RULES} if it really is one view's own mechanics.`
    );
  }
  for (const [field, p] of [['view', meta.view], ['enforcedBy', meta.enforcedBy]]) {
    if (!p || !existsSync(join(root, p))) {
      errors.push(
        `VIEW_LOCAL "${id}": ${field} points at "${p}", which does not exist. A view-local rule ` +
          `has to live somewhere and be enforced by something; an entry that names neither is an ` +
          `unchecked exemption.`
      );
    }
  }
}

// ---------- 5. eval/README.md's documented mapping ----------
// The table under "## What it checks" is the human-readable half of this coupling. It named
// `no-bare-element-styles` correctly, which is how the view-local rule was known to be
// deliberate — worth keeping true.
const readmeSrc = read(README);
const secStart = readmeSrc.indexOf('## What it checks');
if (secStart === -1) {
  errors.push(
    `${README}: no "## What it checks" section. That section's table is the documented ` +
      `check-to-rule mapping this checker verifies; without it the check would pass vacuously.`
  );
} else {
  const nextH2 = readmeSrc.indexOf('\n## ', secStart + 1);
  const section = readmeSrc.slice(secStart, nextH2 === -1 ? undefined : nextH2);
  const documented = new Set([...section.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|/gm)].map((m) => m[1]));
  if (!documented.size) {
    errors.push(`${README}: the "What it checks" table lists no rule ids. Extraction is broken.`);
  }
  for (const id of [...emitted].sort()) {
    if (!documented.has(id)) {
      errors.push(
        `${README}: the "What it checks" table does not list "${id}", which ${JUDGE} emits. ` +
          `A report can cite a rule the mapping never mentions.`
      );
    }
  }
  for (const id of [...documented].sort()) {
    if (!emitted.has(id)) {
      errors.push(
        `${README}: the "What it checks" table lists "${id}", which ${JUDGE} no longer emits. ` +
          `The table promises a check that does not run.`
      );
    }
  }
}

for (const e of errors) console.log(`ERROR ${e}`);
console.log(
  `\njudge rules: ${emitted.size} ids emitted | ${ruleIds.size} in ${RULES} | ` +
    `${viewLocalIds.size} view-local | errors: ${errors.length}`
);
process.exit(errors.length ? 1 : 0);
