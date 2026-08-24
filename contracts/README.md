# UIDS Component Contracts

A contract is the **neutral source of truth for a component's public shape** — its
options, slots, tokens, accessibility semantics, and behavior. The Vue code and the
[Figma library](https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS) are both
*views generated from the contract*; neither is allowed to update the other directly.

One JSON file per component, validated by [contract.schema.json](contract.schema.json).

## Why

- **Drift detection is mechanical.** A checker can diff the contract against code and
  against Figma and report exactly where they stopped agreeing — instead of a human
  eyeballing two tools.
- **AI agents get a strict ruleset.** An agent building pages (Claude Design reads this
  repo; Figma-MCP agents read the library) learns the *real* options from the contract
  instead of inventing props or hardcoding values.
- **Invisible rules become visible.** E.g. the brand bar's `second_row_content` slot
  silently forces narrow styling ([BrandBar.vue:34](../src/components/brand-bar/BrandBar.vue)) —
  behavior no one can see in Figma and few notice in code. The contract records it.

## Change workflow (contract-first)

1. Propose the change by editing the contract JSON (PR).
2. Review: does the option/token/behavior belong in the component's public shape?
3. After merge, update *both* views to match: the Vue/SCSS implementation and the Figma
   component set (via the Figma MCP).
4. Regenerate the agent catalog: `node scripts/build-catalog.mjs`.
5. Run the checkers to confirm all artifacts agree.

## The agent catalog (`catalog/`)

`catalog/` is the **entry point for AI agents** (Claude Design reads this repo; Figma MCP
agents can fetch it). It deliberately does NOT restate contract content — contracts are
already agent-readable and stay the single source for component shape. The catalog holds
only what compilation computes:

- `catalog/catalog.json` — index with reading order and per-component **links** (contract
  path, code path, Figma keys, token names).
- `catalog/tokens.json` — flat, alias-resolved token inventory (rem + px, per breakpoint) —
  the join across `tokens/**` that agents shouldn't have to do themselves.

Governance rules are authored in [rules.json](rules.json) (`enforcement: "judge"` =
mechanically checkable; `"agent"` = guidance) and linked, not copied.

**rules.json is the ONLY place a rule is edited.** A rule carrying
`publishTo: ["claude-design"]` is emitted into `claude-design/readme.md` (the file the
platform injects into every consuming session) and `claude-design/Design System Guide.md`
by `scripts/build-dc-rules.mjs`, between generated-block markers; `--check` is in
`yarn check:drift`. Rules without `publishTo` are repo-facing only — e.g.
`respect-breakpoint-modes`, which is about authoring Figma variants and means nothing to a
page-building agent.

This exists because the rules were previously hand-maintained in three places and the
copies drifted into two contradictions that both shipped: `badge-inline-only` told agents
to put a badge inside a heading while the readme told them never to, and the Guide carried
the "one h1 per page" claim that `page-heading-structure` itself records as corrected for
being wrong about production and for having actively caused harm.

A rule that describes a single VIEW's mechanics does not belong in `rules.json` — it
belongs in that view. The readme's "do not declare bare element styles in your page" rule
is about `dc-import` sharing one cascade; Figma has no cascade and production scopes
through SCSS, and `check-claude-design.mjs` already enforces it there.

`catalog/` is fully derived by `scripts/build-catalog.mjs` — never edit it by hand. It emits
the token inventory twice: `tokens.json` **with** per-token provenance (`note`, `source`) for
humans, and `tokens.lean.json` **without** it for agents — same tokens, same values, ~55%
smaller. Hand an agent the lean one.
`node scripts/build-catalog.mjs --check` fails if it is stale (deterministic output,
content-hashed) — suitable for CI alongside `check-contracts.mjs`.

## Checkers

**Contract ↔ code ↔ tokens** (run locally / CI):

```sh
node scripts/check-contracts.mjs
```

Verifies contract shape, contract options against Vue props (name/type/default),
`tokensUsed` against `tokens/components/`, and that every component token is claimed by
exactly one contract.

**Contract ↔ Figma** (run by an agent with the Figma MCP, via `use_figma`):

```js
// For each contract: find the component set by identity.figma.componentSetName,
// then assert axes/values match the contract's figma-mapped options.
const sets = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  page.findAll(n => { if (n.type === 'COMPONENT_SET') sets.push(n); return false; });
}
const target = sets.find(s => s.name === 'Brand Bar'); // from contract identity
const axes = target.variantGroupProperties; // { Breakpoint: {values}, Style: {values}, ... }
// Compare axes/values to contract options[].figma.axis/map; also walk instances for
// boundVariables and compare to contract tokensUsed.
return { name: target.name, key: target.key, axes };
```

Assert: every option with a `figma.axis` exists as a variant axis with exactly the
mapped values; bound variables on the set's nodes ⊆ `tokensUsed` (+ semantic/typography
tokens); the set's `key` matches `identity.figma.componentKey`.

## What goes in a contract, and what doesn't

Three kinds of text get confused with each other. Only the first two belong here.

| kind | example | where |
|---|---|---|
| **Contract fact** — what the component IS | "Fill=Background exists only at Direction=None because a `bg--*` class makes both inert in CSS" | the contract |
| **Ruling** — a decision, who made it, when | "the design system owner's ruling (2026-08-17): Medium and Large only." | the contract, in one or two sentences |
| **Build narrative** — what an earlier pass got wrong | "The first pass hand-drew a 3-point stroked polyline — wrong weight, wrong proportions" | `.claude/sessions/`, never here |

**The test:** would someone who wasn't there need this to use or change the component
correctly? Mechanism and constraint pass. "What the previous attempt got wrong" fails.

Narrative in a contract also goes **stale**, and nothing checks it. Two live examples found
on 2026-08-21: `banner.json` still reported a Headline defect as "FOUND WHILE BUILDING, NOT
FIXED" that `headline.json` recorded as corrected the same day; and `page-title.json` opened
with "BUILT 2026-08-17" and later said "NOT BUILT YET". Both were the same field.

Naming a person is right for a **ruling** — it records that a departure from as-shipped was
authorized, and by whom, which is what stops a later agent "fixing" it back. It is wrong
inside a blow-by-blow, where it turns a decision record into meeting minutes.

### `identity.figma` has named fields for this

`figma.note` is capped at 600 characters (enforced as a warning by `check-contracts.mjs`)
because it had become a dumping ground doing five jobs at once — `card.json`'s reached 3,292
characters. The other four jobs now have their own fields:

- `note` — what the set IS: axes, values, resulting variant count.
- `axisRationale[]` — why the axes are shaped this way. The part a later agent must not re-litigate.
- `measured{}` — values measured off the built set, so a verification pass compares against what was drawn.
- `deliberateOmissions[]` — what the set does NOT draw and why, so nobody "completes" it and reintroduces the problem the omission avoided.
- `precedent` — the earlier component whose pattern this follows.

## Kinds: component, foundation, pattern

`identity.kind` says what a contract describes.

- **`component`** (the default) — one Vue component. `codePath` is its `.vue` file, and
  `check-contracts` diffs every option against the real props.
- **`foundation`** — shared behaviour (layout, spacing, borders) rather than one component.
  `codePath` is a partial, and `tokensUsed` resolves against primitives/semantic.
- **`pattern`** — a prescribed COMPOSITION of existing components. **No `codePath` at all**:
  there is no single file to point at, because the pattern lives in the arrangement. A
  pattern names its parts in `composedOf` and PINS the options it depends on rather than
  re-declaring them, so a reader can always trace it back to the contracts it composes.

The conditional `codePath` requirement is enforced in `check-contracts.mjs`, not by the
schema's `required[]`, because it depends on `identity.kind` and the schema walker is not
kind-aware. `check-contracts` also verifies that every `composedOf` id is a real contract in
this repo, so a pattern cannot name a component that does not exist.

**Why the tier exists.** `item-list-is-stacked-cards` ("a list of items is stacked BORDERLESS
cards, not a hand-written list") is prose an agent can read and still get wrong — which is
exactly what a real consuming page did in 2026-08. Prose alone was not enough; the pattern
needs representation. The schema was extended first because `check-contracts` validates
recursively against it, so every pattern file would fail until it knew the shape.

## Schema overview

| Section | What it captures |
|---|---|
| `identity` | Where each view lives: code path, registered/barrel names, Storybook id, Figma file/set/key |
| `options` | The public API: name, type, values, default, and the mapping to a code prop AND a Figma axis/property |
| `slots` | Content areas, including behavioral side effects of slot presence |
| `tokensUsed` | Tier-3 tokens the component consumes (names match Figma variables 1:1) |
| `children` | Nested component contracts, fixed props, inherited props |
| `geometryNotTokenized` | Raw values intentionally left un-tokenized (deliberate, documented) |
| `a11y` / `behavior` / `breakpoints` / `assets` | Semantics and rules that live in neither tool cleanly |
| `knownIssues` | Dead code, broken refs, gaps — honesty prevents agents "fixing" intentional absences |

Field-by-field annotated examples — each field's purpose, its audience (system-builder agent
vs system-consumer agent vs checker), which scripts consume it, and which fields are in
check-figma's staleness hash — live in [docs/examples/](../docs/examples/) (contract, catalog,
tokens, rules). They live there and not here because `build-catalog.mjs` and
`check-contracts.mjs` treat every `contracts/*.json` as a real contract.

## Migrating a component into the design system (the pipeline)

The proven order (established by the Brand Bar phase). Each numbered stage is a commit;
verify before moving on.

1. **Explore the code.** Inventory the Vue component + SCSS: props, slots, every concrete
   value (px/rem/hex), breakpoints, hidden behaviors (e.g. slot presence forcing a class),
   dead code, broken refs. Dead code is NOT modeled — it goes in `knownIssues`.
2. **Tier-3 tokens** — `tokens/components/<name>.json`. Meaningful values only (heights,
   dimensions, colors, type sizes); one-off paddings stay raw geometry. Breakpoint leaf
   keys `mobile`/`md`/`page`; sentinel `0` = auto. New primitives (if any) use abstract
   scale steps with gaps. See the conventions in [tokens/README.md](../tokens/README.md).
3. **Contract** — `contracts/<name>.json` against [contract.schema.json](contract.schema.json).
   Every option maps to BOTH a code prop and a Figma axis; slot side effects go in
   `slots[].behavior`; un-tokenized values in `geometryNotTokenized`; a11y, behavior,
   `knownIssues`.
4. **Regenerate + check**: `node scripts/build-tokens.mjs && node scripts/build-catalog.mjs
   && node scripts/check-contracts.mjs`.
5. **Figma** (via the Figma MCP; load the `figma-use` + `figma-generate-library` skills):
   add the variables to the `Components` collection (aliases to primitives, scopes, WEB
   code syntax `var(--uiowa-*)`, descriptions); build the component set with Breakpoint
   as a variant axis; **pin explicit modes per breakpoint variant** (Components collection:
   mobile/md/page; Semantic collection: small for Mobile/MD, large for Page). SVGs import
   via `createNodeFromSvg` after stripping `<image>`/`<title>`/Vue-bound attrs (classes
   drop — bind fills by path order; icon vectors are sized at build time, not height-bound).
   Set the component description to the contract pointer. Backfill the component-set
   key/id into the contract.
   Layout gotchas: (a) read the CSS flex semantics carefully — a `display: flex` container
   often distributes COLUMNS, not the elements inside one column (the footer's logo/site-name
   stack INSIDE one flex child); (b) if you change a frame's `layoutMode` axis after
   building it, the sizing modes remap — re-assert `layoutSizingVertical/Horizontal = 'HUG'`
   on it and its children. (c) Screenshot the Figma set NEXT TO a screenshot of the real
   Storybook story before calling it done — structural readback can pass while the layout
   is wrong.
   Plugin API traps, each of which has cost a rebuild here:
   - `resize()` **resets both axis sizing modes to FIXED** — call it BEFORE setting
     `primaryAxisSizingMode` / `counterAxisSizingMode`, never after.
   - `combineAsVariants()` on nodes already inside an existing set **corrupts the existing
     children's names**. To extend a set, `set.appendChild()` each new component instead.
   - `layoutSizingHorizontal` / `layoutSizingVertical = 'FILL'` must be set strictly AFTER
     `parent.appendChild(child)`; setting it earlier throws.
   - `fontWeight` is **read-only** on TEXT nodes — represent weight via `fontName.style`.
   - A variable bound to a node's **`opacity` is read as a PERCENTAGE** (0.7 renders as
     0.7%, i.e. invisible). Put alpha in the paint instead.
   - Set frames do **not** grow to contain appended children — re-pack the frame.
   - `primaryAxisSizingMode: AUTO` collapses a FILL child, which clips text.
   - The Components-collection `codeSyntax` convention drops the `font-` prefix for
     **line-height** only (`--uiowa-line-height-167`), but keeps it for font-size/weight/family.
6. **SCSS consumes the tokens**: swap literals for `var(--uiowa-<name>-*)`; responsive
   switching for tokenized values collapses out of component media queries (the generated
   partial carries the @media switching).
7. **Verify**: the drift checkers (`yarn check:drift` — nine of them as of 2026-08-22). **Refresh the Figma snapshot** as
   part of this step: run `scripts/figma-readback.js` via the Figma MCP in named slices — the
   script's own header is the **only** source of truth for the slice list, and it has grown
   every time a slice outgrew the ~20KB tool-result limit, so re-derive it there rather than
   trusting a remembered count. Save the merged JSON to `figma/snapshot.json`, then
   `node scripts/check-figma.mjs --stamp`. Merging fewer than all sections looks like
   deleted variables to check-figma — and so does one section that came back TRUNCATED, which
   is the same failure one level down: on 2026-08-22 `sets` was cut off mid-`Card`, the last
   set in traversal order, and would have merged as a component set deleted from Figma. Split
   an over-limit section into name-filtered slices that each return `totalSeen`, `captured`,
   `excluded` and a sorted `excludedNames`, then require each slice's `excludedNames` to be
   exactly the other slices' captured names — that mutual complement also catches a set added
   or renamed since the last capture, which assumed coverage never will.
   `check-figma.mjs` then mechanically enforces what used to be a manual readback — variable coverage, alias targets, per-mode values, variant axes = contract
   option values, bound variables ⊆ tokensUsed — and refuses a snapshot older than the
   current tokens/contracts. Still eyeball the set next to the real story: the checker
   verifies structure and values, not visual correctness. Storybook computed-style
   regression at
   375/980/1350 — automated by `scripts/check-styles.mjs`: add the component's
   stories/selectors to `regression/config.json`, capture the published build as baseline
   (`node scripts/check-styles.mjs --url https://uids.brand.uiowa.edu --update
   --component <name>`), run `yarn test:styles` against local Storybook — an empty diff
   proves the migration didn't change rendering. Recapture from local before committing
   (CI compares its own Storybook build against the committed baselines). Screenshots;
   console clean.
8. **Regenerate the Claude Design system** (project id in each contract's
   `identity.claudeDesign`): `tokens.css` is emitted by `node scripts/build-tokens.mjs` in
   the same pass as the SCSS partial (just run it; `--check` guards both outputs — do not
   re-derive it by hand), write/update the component's `.dc.html` template (props mirror contract
   options; templates link `./tokens.css` so breakpoint switching comes free), and backfill
   the `claudeDesign` anchor. Author everything in `claude-design/` in THIS repo first —
   that is the source of record — then push byte-identical to the registered DS (a
   `finalize_plan` plan_token + `if_match` etags; a token-less `write_files` returns
   `needs_project_grant`). The Claude Design project is a GENERATED view like Figma —
   never hand-edit it; direct edits there are proposals to pull back through the contract.

   **`readme.md` is the load-bearing file — update it every time.** The platform injects
   `readme.md` (NOT `Design System Guide.md`) verbatim into every consuming session as
   `<design-system-guide>`, and a consuming agent's access to the DS project may be
   binding-only, so `read_file` on the guide can fail. Anything a consumer MUST know goes
   in `readme.md`; the guide is the deeper reference. Both must state the consumption
   protocol: `<dc-import name="X">` resolves SIBLING files only, so consumers `copy_files`
   the templates + `Logo.dc.html` (Brand Bar and Brand Footer both import it) +
   `tokens.css` + `layout.css` into one directory, then `create_support_js` there. Never
   tell consumers to repoint the templates' `./tokens.css` link — copying `tokens.css`
   beside them resolves it and keeps the copies re-copyable when tokens change.
   Add each new component to `Page Scaffold.dc.html` if it belongs in the canonical page
   structure. `node scripts/check-claude-design.mjs` enforces the mechanical half (sibling
   `dc-import` targets resolve, relative links resolve, `readme.md` names every template
   and keeps the protocol, tokens defined, manifest fresh) — but it cannot see the
   platform, so still verify by re-reading the injected prompt
   (`get_claude_design_prompt(design_system_id=…)`, confirming what consumers actually
   receive) plus a `render_preview` of the scaffold.

   Do NOT hand-populate the manifest's `components` / `templates` arrays: `components`
   feeds the server-side JS bundler that builds `_ds_bundle.js` (its header records
   `sourceHashes` / `inlinedExternals` / `unexposedExports`) and expects JS/JSX exports,
   not `.dc.html` documents. `globalCssPaths` IS ours to maintain — it drives the
   stylesheet links the platform injects. The manifest's `tokens` array is rebuilt by
   `node scripts/build-dc-manifest.mjs` after any token change — run it instead of editing
   the manifest by hand.

## Contracts

- [brand-bar.json](brand-bar.json) — the IOWA Bar (`uids-iowa-bar` / `UidsIowaBar`)
- [logo.json](logo.json) — the IOWA / Health Care lockup (`UidsLogo`)
