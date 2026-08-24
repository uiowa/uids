#!/usr/bin/env node
/**
 * Generates the rules section of the Claude Design view from contracts/rules.json.
 *
 * There were THREE hand-maintained copies of the rule set: contracts/rules.json,
 * claude-design/readme.md's "Composition rules", and Design System Guide.md's "Rules"
 * list. Hand-maintaining three copies produced two live contradictions, both shipped:
 *
 *   1. rules.json's badge-inline-only said "To flag a whole block, put the badge inside
 *      that block's heading or first line" while readme.md rule 2 said "Never put a Badge
 *      inside a heading" — direct opposites.
 *   2. Design System Guide.md said "One h1 per page — typically the Brand Bar's site
 *      name", which is the exact text rules.json's page-heading-structure records as
 *      CORRECTED for being wrong about production and for having "actively caused harm"
 *      (agents demoted the page title to an h2 and lost the page-title type ramp).
 *
 * So the rules are now emitted from one source into both files, between markers.
 * contracts/rules.json is the only place a rule is edited.
 *
 * A rule is published to this view when it carries publishTo: ["claude-design"]. Rules
 * without it are repo-facing (e.g. respect-breakpoint-modes, which is about authoring
 * Figma variants and means nothing to a page-building agent).
 *
 * NOT generated, deliberately: readme.md's "Do not declare bare element styles in YOUR
 * page" rule. It describes THIS VIEW'S mechanics — dc-import shares one document and one
 * cascade — rather than a property of the design system. Figma has no cascade; production
 * scopes through SCSS. check-claude-design.mjs already enforces it for this view. The test
 * for where a rule belongs: a rule belongs to a view only when it describes that view's
 * mechanics.
 *
 * Usage: node scripts/build-dc-rules.mjs [--check]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const VIEW = 'claude-design';
const BEGIN = '<!-- BEGIN GENERATED RULES — source contracts/rules.json, run node scripts/build-dc-rules.mjs -->';
const END = '<!-- END GENERATED RULES -->';

const rules = JSON.parse(readFileSync(join(root, 'contracts/rules.json'), 'utf8')).rules.filter(
  (r) => (r.publishTo ?? []).includes(VIEW)
);
if (!rules.length) throw new Error(`contracts/rules.json: no rules marked publishTo "${VIEW}"`);

// Markdown list items must not contain raw newlines mid-item, so wrap to a hanging indent.
const wrap = (text, width, indent) => {
  const out = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && (line + ' ' + word).length > width) {
      out.push(line);
      line = word;
    } else {
      line = line ? line + ' ' + word : word;
    }
  }
  if (line) out.push(line);
  return out.map((l, i) => (i === 0 ? l : indent + l)).join('\n');
};

const body = rules
  .map((r, i) => {
    const n = `${i + 1}.`;
    const head = `${n} **${r.id}** (${r.enforcement}) — `;
    return wrap(head + r.rule, 92, '   ');
  })
  .join('\n');

const block = [
  BEGIN,
  '',
  '<!-- Do not edit these by hand: edit contracts/rules.json and re-run the generator. -->',
  '',
  body,
  '',
  END,
].join('\n');

const targets = [`${VIEW}/readme.md`, `${VIEW}/Design System Guide.md`];
const stale = [];
let wrote = 0;

for (const rel of targets) {
  const path = join(root, rel);
  const text = readFileSync(path, 'utf8');
  const start = text.indexOf(BEGIN);
  const stop = text.indexOf(END);
  if (start === -1 || stop === -1) {
    stale.push(`${rel}: missing the generated-rules markers (${BEGIN.slice(0, 30)}…)`);
    continue;
  }
  const next = text.slice(0, start) + block + text.slice(stop + END.length);
  if (next === text) continue;
  if (check) stale.push(`${rel}: generated rules section is out of date`);
  else {
    writeFileSync(path, next);
    wrote++;
  }
}

if (stale.length) {
  for (const s of stale) console.log(`ERROR ${s}`);
  console.log(`\nRun: node scripts/build-dc-rules.mjs`);
  process.exit(1);
}
console.log(
  check
    ? `claude-design rules up to date (${rules.length} rules in ${targets.length} files)`
    : `claude-design rules written (${rules.length} rules, ${wrote} of ${targets.length} files changed)`
);
