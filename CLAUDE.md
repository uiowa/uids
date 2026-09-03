# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

## Project Overview

UIDS (University of Iowa Design System) — Vue 3 component library with SCSS and Storybook docs.

- **Main branch**: `4.x` · **Node**: 20.19 (`nvm use`, per `.nvmrc`) · **Package manager**: Yarn 3.7.0
- **Docs**: https://uids.brand.uiowa.edu · **Figma library**: https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS

## Essential Commands

| Command | What it does |
|---|---|
| `yarn storybook` | Storybook dev server (port 6006) |
| `yarn dev` | Watch-mode SCSS compilation |
| `yarn build` | Build tokens, then compile SCSS to `dist/` |
| `yarn lint` | ESLint with auto-fix |
| `yarn test:unit` | Vitest (`yarn test:unit ComponentName` for one) |
| `yarn check:drift` | The eight drift checkers — see below |
| `yarn test:styles` | Computed-style regression; needs Storybook running |

**Before a PR:** run `yarn build` (confirms tokens + SCSS compile — `dist/` is gitignored) and
`yarn check:drift`. CI (`.github/workflows/checks.yml`) additionally enforces `yarn lint:ci`
(errors only — warnings are tracked legacy debt, see `.eslintrc.cjs`), `yarn test:unit:ci`, and
`yarn test:styles` against `regression/baselines/`. Re-baseline deliberately with
`yarn test:styles:update`, never to make a red run green.

## Component Structure

Each component in `src/components/`:

```
component-name/
├── ComponentName.vue        # Vue 3, <script setup lang="ts">
├── ComponentName.stories.js # Storybook stories, tags: ['autodocs']
└── index.ts                 # export { default } from './ComponentName.vue'
```

Import SCSS directly (`import '../../scss/components/component.scss';`), give constrained props
a validator, use namespaced BEM (`block--modifier`, `block__element`, single hyphen for the
namespace), and carry the ARIA attributes the contract's `a11y` block names.

To add one: create the three files, add it to `src/components/index.ts`, create
`src/scss/components/_component-name.scss`, and `@use` it from `src/scss/uids.scss`. Note the
standing ruling below — the contract-backed set is closed, so a new component ships as an
ordinary Vue component and does not get a contract or tier-3 tokens without a decision.

## SCSS Architecture

`uids.scss` is the entry point; `uids-core.scss` holds the reset, base HTML and CSS custom
properties; `abstracts/` holds mixins and variables; `components/` holds one partial per
component. Use `@use`, never `@import`.

`src/scss/abstracts/_tokens-generated.scss` is **generated** — edit `tokens/`, not it.
The Sass variables in `_variables.scss` now mostly hold `var(--uiowa-*)` references, so Sass
arithmetic and Sass colour functions on them fail; see `docs/whats-changed.md` §5 for the
downstream consequences.

## Tokens, Contracts and the Generated Views

`tokens/` and `contracts/` are the authored source. Everything else — the SCSS custom
properties, `catalog/`, the Figma library, `claude-design/` — is a generated or audited view
of them.

- `tokens/` — tier 1 primitives → tier 2 semantic → tier 3 component.
  `node scripts/build-tokens.mjs` emits the SCSS partial and `claude-design/tokens.css`.
- `contracts/` — one JSON per component: options ↔ Vue props ↔ Figma axes, plus `slots`,
  `behavior`, `a11y`, `knownIssues`, `changes`. **Changes to a component's public shape are
  contract-first**: the contract moves before Figma or code.
- `catalog/` — derived agent entry point (`node scripts/build-catalog.mjs`). Hand an agent
  **`catalog/tokens.lean.json`**, not `tokens.json`: same tokens and values, per-token
  provenance dropped, ~66k → ~30k model tokens. `tokens.json` keeps the provenance for humans.
- `contracts/rules.json` — **the only place a governance rule is edited.** Rules carrying
  `publishTo: ["claude-design"]` are emitted into `claude-design/readme.md` and
  `Design System Guide.md` by `build-dc-rules.mjs`. A rule about one view's own mechanics
  belongs in that view, not here.

Migrating a component into the system, or changing one that is already in it, follows the
pipeline in **[contracts/README.md](contracts/README.md)** — read that before touching
`tokens/` or `contracts/`. `docs/agentic-design-system.md` explains why the system is shaped
this way and is honest about what it does not check.

## `yarn check:drift` — the eight checkers

**`package.json` is the source of truth for the chain**; this table is a convenience copy and
has been found stale before. `.github/workflows/checks.yml` runs the same eight.

| Checker | Re-run it after touching |
|---|---|
| `build-tokens --check` | `tokens/` — fails if the SCSS partial or `tokens.css` is stale |
| `build-catalog --check` | `tokens/`, or a contract's top-level `description`/`version` |
| `check-contracts` | `contracts/`, or any Vue prop a contract names |
| `check-claude-design` | `claude-design/` — sibling imports, the injected `readme.md`, the manifest |
| `build-dc-rules --check` | `contracts/rules.json` |
| `check-figma` | `tokens/`, `contracts/`, **or the Figma file** |
| `check-citations` | any `file:line` evidence written into `contracts/` or `tokens/` |
| `check-token-consumers` | `tokens/`, or any SCSS that reads (or stops reading) a `var(--uiowa-*)` |

Three of these deserve a warning:

**`check-figma`** works from the committed `figma/snapshot.json`, so CI needs no Figma access.
After any change to the Figma file, refresh the snapshot by running `scripts/figma-readback.js`
through the Figma MCP — **its header is the only source of truth for the slice list; re-derive
it there, never from memory** — then `node scripts/check-figma.mjs --stamp`. A truncated slice
merges as a component set *deleted* from Figma, so have each slice report
`totalSeen`/`captured`/`excluded` and check the halves are mutual complements. The checker
fails if the snapshot predates the current tokens, so a Figma-affecting token change cannot
merge with a stale snapshot. Note it enforces bound ⊆ `tokensUsed` but never the converse: a
raw value where a token exists is invisible to it.

**`check-claude-design`** guards a view with no compiler. A `<dc-import name="X">` whose sibling
file is missing renders **nothing, silently**, and `dc-import` shares one document and one
cascade with the page, so no template may declare bare element selectors.

**`check-token-consumers`** closes the converse of every other check here: they all ask whether a
token is well-formed, and none asked whether any stylesheet *reads* it. It is **warning-only
until the utility-class rebind lands** — pass `--strict` to gate. Two classes, and the second is
the dangerous one: `ORPHAN` (nothing reaches it) is usually a token consumed by uids_base
downstream, which is legitimate and belongs in `tokens/orphans-allowed.json` **with a reason**;
`DOC-ONLY` (reached from `claude-design/` but never from `src/`) means the token previews
correctly and does not ship. Reachability follows the alias graph, so a primitive read only by
a semantic token is correctly layered, not orphaned — and an allowlist entry is inherited by
everything it aliases to, so list the semantic token, not the primitive.

## Standing rulings

- **Contract-first.** Public shape changes land in `contracts/` before Figma or code.
- **Tokenize as-shipped; never silently fix.** These contracts were reverse-engineered from
  code that live Drupal sites already depend on. A bug becomes a `knownIssues` entry, not a
  correction — "fixing" it downstream is a breaking change nobody asked for.
- **…except where a deliberate design change is ruled.** Record those in `changes[]`, with the
  reasoning, so a later reader cannot mistake an intended departure for a defect. `changes[]`
  also covers public-shape decisions that move no pixels, including declining a proposal.
- **The migrated component set is CLOSED.** The closure is about MIGRATING: do not give a new
  component a contract, tier-3 tokens or a `.dc.html` template without a decision from the
  design system owner. Adding an option to a component that is already in the set is ordinary
  contract-first work and is not blocked by this — see `contracts/headline.json` `changes[]`
  for the case that settled the distinction.

## Git Workflow

Work on feature branches from `4.x`. PRs auto-deploy to GitHub Pages at `/branches/{branch-name}`.
Releases use semantic versioning via `npm version [major|minor|patch]`.

## Code Style

Vue: Composition API with `<script setup lang="ts">`. SCSS: namespaced BEM. Stories:
`tags: ['autodocs']`, bind shared argTypes from `src/components/shared/`. Editor: 2 spaces,
single quotes, semicolons.
