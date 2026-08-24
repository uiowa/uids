#!/usr/bin/env node
/**
 * Memory-file size checker.
 *
 * `CLAUDE.local.md` sits at the repo root, so Claude Code injects it into EVERY session
 * and every request. On 2026-08-20 it had reached 89,744 bytes (~22k tokens), of which
 * 85,258 bytes were eleven superseded "Prior Active Context" sections — all of them
 * already written up in `.claude/sessions/`. That is ~21k tokens of duplicated narrative
 * paid for on every turn of every future session.
 *
 * The prose rule alone had already failed: the file grew to 89 KB while every session was
 * reading its own instructions not to let it. So the budget is enforced here instead.
 *
 * Checks:
 *  1. Size. Hard fail above HARD_KB — the file is a memory file, not an archive.
 *  2. At most one "## Prior Active Context" section. Zero is the target; one is tolerated
 *     mid-handoff, when the incoming agent has not yet folded the outgoing context in.
 *  3. Warn above SOFT_KB so drift is visible well before it becomes a failure.
 *
 * Superseded narrative belongs in `.claude/sessions/<date>_<slug>.md`; durable rulings and
 * gotchas belong in the file's own "Decisions & rulings" / "Gotchas" sections.
 *
 * BUDGET RAISED 2026-08-21 (8/12 -> 12/16), on the design system owner's ruling, and the reason matters.
 * The original 8 KB target was set when the file was 90% superseded narrative, so it was
 * really a target for the DUPLICATION, not for the content. With the narrative gone the
 * remainder is one Active Context plus ~7 KB of rulings and gotchas that are load-bearing:
 * each gotcha records a specific way this repo has already burned a session, and several
 * (the reserved `mobile` leaf, per-mode error counting, the bare-`em` basis) are the
 * difference between a checker being readable and being a puzzle.
 *
 * The 2026-08-21 evening session is the evidence. Trying to hold 8 KB while recording four
 * new gotchas produced six rounds of shaving semantic content off durable entries to buy
 * tens of bytes — optimising the metric instead of the file. The content had outgrown the
 * number, so the number moved.
 *
 * SOFT_KB is deliberately set just above the current size, not comfortably above it: the
 * warning should fire the moment the file GROWS, which is the signal worth having. The
 * cheap win when it does is almost always a stale Active Context, not a gotcha.
 *
 * BUDGET RAISED AGAIN 2026-08-22 (12/16 -> 16/24), on the design system owner's ruling, presented with data.
 * The 08-21 raise assumed the cheap win would keep being a stale Active Context. It ran out:
 * by 08-22 the file was 16,326 bytes with 58 bytes of headroom, and a section-by-section
 * measurement showed GOTCHAS was 10.5 KB of 16.1 KB — 64% of the file. So no amount of
 * editing the Active Context (then 1.3 KB) or the rulings (2.7 KB) could fund another
 * finding; the previous raise's own escape hatch was spent.
 *
 * The design system owner was offered four options and chose the raise over (a) moving the task-specific gotcha
 * groups to un-injected `.claude/gotchas/<area>.md` files behind a pointer, (b) pushing each
 * gotcha down into the checker that would have caught it, and (c) per-session shaving. The
 * ruling keeps the strongest guarantee — every gotcha is in context at the moment of the
 * mistake, not one instruction away — and pays ~6k tokens per turn for it. That is the right
 * trade while gotchas are still being ADDED faster than checkers absorb them; revisit it when
 * option (b) has somewhere to put them.
 *
 * NOTE FOR WHOEVER RAISES IT NEXT: the numbers live in FOUR places and only one is executable
 * — SOFT_KB/HARD_KB below, this comment, `CLAUDE.md`'s "Session memory" section, and
 * `CLAUDE.local.md`'s own discipline header. On 2026-08-22 `CLAUDE.md` was found still quoting
 * the ORIGINAL 8/12, having never been updated for the 08-21 raise: true when written, never
 * re-checked. No checker guards prose against these constants. Update all four.
 *
 * Usage: node scripts/check-memory-size.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = process.env.MEMORY_FILE ?? 'CLAUDE.local.md';
const SOFT_KB = 16;
const HARD_KB = 24;
const MAX_PRIOR = 1;

const errors = [];
const warnings = [];
const path = join(root, FILE);

if (!existsSync(path)) {
  // Not an error: the file is optional, and a repo without one is trivially within budget.
  console.log(`\nmemory: ${FILE} not present | errors: 0`);
  process.exit(0);
}

const text = readFileSync(path, 'utf8');
const bytes = Buffer.byteLength(text, 'utf8');
const kb = (bytes / 1024).toFixed(1);

if (bytes > HARD_KB * 1024) {
  errors.push(
    `${FILE}: ${kb} KB exceeds the ${HARD_KB} KB budget. This file is injected into every ` +
      `request, so every KB is paid on every turn. Move superseded narrative to ` +
      `.claude/sessions/ and keep only the current Active Context plus durable rulings and gotchas.`
  );
} else if (bytes > SOFT_KB * 1024) {
  warnings.push(
    `${FILE}: ${kb} KB is over the ${SOFT_KB} KB target (hard limit ${HARD_KB} KB). ` +
      `Prune before adding.`
  );
}

// Count section headings only — a mention of the phrase in prose is not a section.
const prior = [...text.matchAll(/^##\s+Prior Active Context/gm)];
if (prior.length > MAX_PRIOR) {
  errors.push(
    `${FILE}: ${prior.length} "Prior Active Context" sections, at most ${MAX_PRIOR} allowed ` +
      `(zero is the target; one is tolerated mid-handoff). Each superseded section is ` +
      `duplicated in .claude/sessions/ — replace the Active Context, do not append to it.`
  );
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(
  `\nmemory: ${FILE} ${kb} KB | prior-context sections: ${prior.length} | ` +
    `errors: ${errors.length} | warnings: ${warnings.length}`
);
process.exit(errors.length ? 1 : 0);
