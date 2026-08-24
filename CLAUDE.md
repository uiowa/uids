This # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIDS (University of Iowa Design System) - Vue 3 component library with SCSS and Storybook docs.
- **Main branch**: `4.x` | **Package manager**: Yarn 3.7.0 | **Docs**: https://uids.brand.uiowa.edu

## Essential Commands

- `yarn storybook` - Start Storybook dev server (port 6006)
- `yarn dev` - Watch mode for SCSS compilation
- `yarn build` - Compile SCSS to `dist/`
- `yarn lint` - ESLint with auto-fix
- `yarn test:unit` - Vitest tests (use `yarn test:unit ComponentName` to run specific tests)

**Before PRs**: Run `yarn build` to confirm tokens + SCSS compile (`dist/` is gitignored). If `tokens/` or `contracts/` changed, run `node scripts/build-tokens.mjs`, `node scripts/build-catalog.mjs`, and `node scripts/check-contracts.mjs`. CI (`.github/workflows/checks.yml`) also enforces `yarn lint:ci` (lint errors only — warnings are tracked legacy debt, see `.eslintrc.cjs`), `yarn test:unit:ci`, and `yarn test:styles` (computed-style regression for migrated components against `regression/baselines/`; needs Storybook running locally, `yarn test:styles:update` to intentionally re-baseline).

**Requirements**: Node 20.19 (use `nvm use` to set correct version per `.nvmrc`)

## Component Structure

Each component in `src/components/`:
```
component-name/
├── ComponentName.vue       # Vue 3 with <script setup lang="ts">
├── ComponentName.stories.js # Storybook stories
└── index.ts                # Export for barrel
```

**Key patterns**:
- Import SCSS directly: `import '../../scss/components/component.scss';`
- Props use validators for constrained values
- BEM CSS naming (block--modifier, block__element)
- ARIA attributes required for accessibility

## SCSS Architecture

- `uids.scss` - Main entry (imports all components)
- `uids-core.scss` - Core styles, CSS variables, reset, base HTML
- `abstracts/` - Mixins, variables, utilities
- `components/` - Component-specific styles
- Use `@use` instead of `@import`

**CSS Variables** (in `uids-core.scss`): `--uiowa-gold`, `--uiowa-black`, `--brand-primary`, `--uids-gray-*`, `--link-color`

## Shared Logic

`src/components/shared/` - Reusable prop/argType utilities:
- `borderless.ts` - Borderless styling option
- `background.ts` - Background color variants
- `media.ts` - Media-related props
- Each exports `{ props, argTypes }` - use via spread: `...Borderless.props`

`src/assets/js/` - ES6 classes for interactivity (accordion, tabs, slider, video, click-a11y)

## Creating New Components

1. Create `src/components/component-name/ComponentName.vue` with `<script setup lang="ts">`
2. Create `ComponentName.stories.js` with Storybook config
3. Create `index.ts`: `export { default } from './ComponentName.vue'`
4. Add to `src/components/index.ts` barrel export
5. Create `src/scss/components/_component-name.scss`
6. Import in `src/scss/uids.scss`: `@use 'components/component-name';`
7. Run `yarn storybook` to test, then `yarn build` before PR

**Prototype components**: New experimental components should have `status: prototype` and be placed in `src/components/prototypes/`

## Design Tokens, Contracts & Figma

The design system has machine-readable artifacts that Figma and the SCSS are both
generated views of:

- `tokens/` — source of truth for colors/typography/component values (tier 1 primitives →
  tier 2 semantic → tier 3 component). SCSS consumes them via the GENERATED partial
  `src/scss/abstracts/_tokens-generated.scss` (`node scripts/build-tokens.mjs`).
- `contracts/` — per-component contracts (options ↔ code props ↔ Figma axes). **Changes to
  a component's public shape are contract-first.**
- `catalog/` — derived agent entry point (`node scripts/build-catalog.mjs`). Hand an agent
  **`catalog/tokens.lean.json`**, not `tokens.json`: same 709 tokens and values with the
  per-token `note`/`source` provenance dropped, ~66k → ~30k tokens. `tokens.json` keeps the
  provenance for humans. Both are generated and both are `--check`ed.
- Figma library: https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS

**Migrating a component into the design system** (e.g. "move the footer over"): follow the
pipeline in [contracts/README.md](contracts/README.md#migrating-a-component-into-the-design-system-the-pipeline)
— explore code → tier-3 tokens → contract → regenerate/check → Figma (variables +
component set) → SCSS consumes tokens → verify (`yarn check:drift` + Figma readback +
Storybook computed-style regression).

Drift checks (run after touching `tokens/`, `contracts/`, `claude-design/`, `scripts/judge.mjs`,
or Figma) — `yarn check:drift`. Nine scripts as of 2026-08-22; **`package.json` is the source of
truth for the chain**, this list is a convenience copy and has been found stale before:
`build-tokens --check` · `build-catalog --check` · `check-contracts` · `check-claude-design` ·
`build-dc-rules --check` · `check-judge-rules` · `check-figma` · `check-memory-size` ·
`check-citations`

`check-claude-design.mjs` guards the Claude Design view, which has no compiler to catch
mistakes: sibling `dc-import` targets exist (a missing one renders nothing, silently),
relative links resolve, `readme.md` (the file the platform injects into every consuming
session) documents every template and the copy-before-import protocol, every
`var(--uiowa-*)` is defined, and `_ds_manifest.json` matches `tokens.css`.

`check-figma.mjs` guards the Figma view without needing API access: it diffs the committed
`figma/snapshot.json` against `catalog/tokens.json` + `contracts/` (variable coverage,
alias targets, per-mode values, doc-only breakpoint variables, variant axes vs contract
options, bound variables ⊆ `tokensUsed`, and **every component set's description naming its
own contract** — the pointer convention from `contracts/README.md` step 5, enforced since
2026-08-21. It checks for the POINTER only, never the prose, so a Figma-only drawing note
sits happily alongside it; asserting the prose would just move the staleness into the
checker). **After any Figma change**, refresh the snapshot:
run `scripts/figma-readback.js` through the Figma MCP in named slices — **its header is the
only source of truth for the slice list; re-derive it there, never from prose or memory**. It
grows every time a slice outgrows the ~20KB tool-result limit, most recently on 2026-08-22 when
`sets` came back silently truncated mid-`Card`, the last set: **a truncated slice merges as a
component set DELETED from Figma**, so split by name filter and have each half report
`totalSeen`/`captured`/`excluded`/`excludedNames` — mutual complement, not assumed coverage.
Save the merged result to `figma/snapshot.json`, then `node scripts/check-figma.mjs --stamp`.
The checker fails if the snapshot predates the current tokens/contracts, so a Figma-affecting
token change can't merge without a refreshed snapshot.

## Eval — judging an agent's output (`eval/`, `yarn judge`)

The drift checkers verify the SYSTEM's internal consistency. They say nothing about what an
agent actually *builds* with it. `scripts/judge.mjs` closes that gap: it scores a generated
page against the compiled catalog, deterministically, and every violation names a rule id
from `contracts/rules.json`, a line, and — for tokens — the exact token that already holds
the value the agent hardcoded.

```sh
yarn judge <page.html> [more.html ...]   # add --json for machine-readable output
```

Use it as the scoring half of an A/B: run one prompt twice against the same model, once with
the catalog supplied and once without, and compare. **The gap is the evidence, not either
score.** `eval/README.md` has the method, the check-to-rule mapping, and what the judge
deliberately does NOT measure. It is NOT in `check:drift` — it grades inputs you supply, not
the repo.

`check-judge-rules.mjs` **is** in `check:drift`, and that is not a contradiction: it grades the
repo, deriving the rule ids out of `judge.mjs`'s source and never running the judge against any
page. It fails unless every emitted id is in `contracts/rules.json` or a declared view-local
rule (only `no-bare-element-styles`, which per rules.json's own scope rule belongs to the
claude-design view), and unless `eval/README.md`'s mapping table lists exactly those ids. Added
2026-08-22, when `judge.mjs` was found building a `Map` of rules.json ids and never using it —
so "rules.json is the ONLY place a governance rule is edited" was true of the *rule text* while
renaming a rule *id* silently broke every judge report. Keep the ids string LITERALS at the call
sites; the checker errors rather than quietly verifying less.

Current fixture scores: ungoverned 34/100, governed 100/100. Those fixtures are hand-written
stand-ins, not captured model output — good as the judge's own regression test, not yet
evidence about model behaviour.

## Session memory (`CLAUDE.local.md`)

`CLAUDE.local.md` is committed at the repo root, so Claude Code injects it into **every
session and every request**. It carries exactly **one** Active Context plus durable
decisions, rulings and gotchas. When a session ends the outgoing Active Context is
**replaced, not appended** — its narrative goes to `.claude/sessions/<date>_<slug>.md`.
Anything already written in a session log does not belong in the memory file. Target
≤ 16 KB.

`check-memory-size.mjs` enforces this (it is in `yarn check:drift`): it fails above 24 KB
or on more than one `## Prior Active Context` section, and warns above 16 KB. The prose rule
alone had already failed once — the file reached 89,744 bytes (~22k tokens per turn), 95%
of it eleven superseded Prior Active Context sections that were all already written up in
`.claude/sessions/`.

The budget has been raised twice on the design system owner's ruling — 8/12 → 12/16 (2026-08-21) → **16/24**
(2026-08-22) — because the content genuinely outgrew the number both times, not because the
rule was weak. The rationale for each raise, and the option set rejected at the second one, is
in `scripts/check-memory-size.mjs`'s header. **These numbers appear in four places and only
`SOFT_KB`/`HARD_KB` is executable**; this paragraph was itself found quoting the original 8/12
on 2026-08-22, having never been updated for the first raise. If you change the budget, change
all four.

## Git Workflow

- Work on feature branches from `4.x`
- PRs auto-deploy to GitHub Pages for preview at `/branches/{branch-name}`
- Releases use semantic versioning via `npm version [major|minor|patch]`

## Code Style

- Vue: Composition API with `<script setup lang="ts">`
- SCSS: Namespaced BEM - modifiers use `--`, elements use `__`, single hyphen for namespace
- Stories: `tags: ['autodocs']`, bind shared argTypes
- Editor: 2 spaces, single quotes, semicolons
