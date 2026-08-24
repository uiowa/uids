# UIDS + agents: how this works

Internal explainer. Comparisons are to [southleft/ds-contracts-poc](https://github.com/southleft/ds-contracts-poc),
based on its README — not a source-level read.

## The fact that explains everything else

- **UIDS is code-first. ds-contracts-poc is contract-first.**
- Their contract *generates* a React library and a Figma library.
- Our Vue components shipped years ago and live Drupal sites depend on them — so our contracts were **reverse-engineered from working code**. They describe and verify; they don't emit.
- Hence the standing policy: **tokenize as-shipped, never silently fix.** Bugs get recorded as `knownIssues`; "fixing" them would break live sites.
- Deliberate design changes go in a separate `changes[]` field, so a later agent can't mistake an intended departure for a defect.

## Shape of the system

- **Authored source:** `tokens/` (108 primitive, 229 semantic, 372 component) and `contracts/` (27).
- **Five generated views:** SCSS custom properties · `catalog/` · Figma variables + sets · `claude-design/` · Storybook.
- **Nine checkers**, one per direction, all dependency-free Node, all in CI.
- Plus a browser regression harness that needs Storybook running.

## Tokenizing UIDS 4

- Local Sass variables → a three-tier token set; every component's SCSS rewritten to consume generated CSS custom properties.
- Tiers encode intent: **primitives** are raw values, **semantic** names roles, **component** is what a component binds.
- Trap: token steps are an **abstract gapped scale**, not rem×100 — `font-size.75` is `0.9rem`.
- Trap: Figma can't interpolate `clamp()`, so fluid heading ramps live there as two endpoint modes (`small (600)` / `large (1310)`). A frame on the wrong mode renders type that looks wrong but isn't broken.

## Figma ↔ Storybook drift

- Figma MCP finds where the two disagree; we fix whichever side is wrong.
- Works without live Figma access: `figma-readback.js` captures the file to `figma/snapshot.json`, `check-figma.mjs` diffs it against tokens + contracts.
- The snapshot is hash-stamped, so a token change can't merge with a stale Figma view.
- *vs. theirs:* they have a richer three-way differ (ahead / behind / mismatched) — but their Figma is generated, ours has designers in it, so we audit.

## `contracts/`

- One JSON per component: `options` (mapped to both a Vue prop and a Figma axis), `slots`, `tokensUsed`, `behavior`, `a11y`, `knownIssues`, `changes`, `geometryNotTokenized`.
- Three kinds: `component`, `foundation` (shared behaviour), `pattern` (a composition — no code file).
- Rule: **contract-first.** Public shape changes here before Figma or code.
- *vs. theirs:* yes, 56 to our 27. Theirs are complete enough to emit React; ours carry provenance and defect records.

## `catalog/`

- Fully derived, never hand-edited, content-hashed, with a `--check` mode.
- `catalog.json` (component index + pointers) and the token inventory, emitted twice.
- **Hand an agent `tokens.lean.json`** — all 709 tokens and values with the per-token provenance dropped. ~66k → ~30k tokens, a 55% cut in the largest thing a governed session loads.
- `tokens.json` keeps the provenance for humans. Both are generated; both are `--check`ed, so they can't drift apart.
- The point: one artifact that answers "what exists and what may I use?"
- *vs. theirs:* yes — same idea, reached independently.

## `contracts/rules.json`

- 11 rules, each tagged `judge` (6, mechanically checkable) or `agent` (5, guidance).
- Examples: only use what's in the catalog; no raw hex where a token holds the value; a list of items is stacked borderless cards.
- Every rule exists because a real page got it wrong.
- **Generated** into the consuming docs from this one file — we used to keep three hand-maintained copies and they drifted into two live contradictions.
- *vs. theirs:* partly — their conformance file constrains the *machinery*; ours constrains the *page author*.

## `scripts/`

- **Builders** generate a view from source (`build-tokens`, `build-catalog`, `build-dc-rules`, `build-dc-manifest`), each with `--check`.
- **Checkers** guard a view (`check-contracts`, `check-figma`, `check-claude-design`, `check-memory-size`, `check-citations`, `check-judge-rules`, `check-styles`).
- `yarn check:drift` runs nine of them — all but `check-styles`, which needs Storybook running, and `build-dc-manifest --check`.
- Deliberately dependency-free — they run on bare `node` with no install.
- *vs. theirs:* in spirit. Their `core/` is a real engine; ours is single-purpose scripts, smaller because we generate far less.

## `regression/`

- `config.json` lists story + selector + properties; `baselines/` holds 24 files of recorded values.
- `check-styles.mjs` drives a real browser against Storybook at three viewports.
- This is what made tokenization safe: capture the baseline from the **published build before** the swap, then prove the swap moved nothing.
- *vs. theirs:* theirs asks "did generation reproduce the source?" Ours asks "did refactoring change what already ships?"

## `claude-design/`

- 21 `.dc.html` templates plus `tokens.css`, `layout.css`, `backgrounds.css`, a manifest, two docs.
- **Yes — this is the whole thing.** There's no theme on the Claude Design server we can't see. We copy these files in, the platform injects `readme.md` into every session, that's the entire surface.
- No compiler: a `<dc-import>` whose sibling is missing renders **nothing, silently**. Hence its own checker.
- `dc-import` shares **one document and one cascade** with the page — a bare `h2 {}` in your page reaches inside every imported component.
- *vs. theirs:* no equivalent.

## `scripts/judge.mjs`

- Every other checker verifies the *system's* consistency. None looks at what an agent actually **built**. This does.
- Catches: invented components, invented props, illegal enum values, raw hex where a token exists (it names the token), ad-hoc type sizes, a `var()` that doesn't exist, bare element selectors.
- **Deterministic — no model in the loop.** Reproducible, and any finding is checkable by hand.
- Use as the scoring half of an A/B: one prompt run twice, with and without the catalog. **The gap is the evidence, not either score.**
- *vs. theirs:* this is the piece we took from their work. Theirs grades a component; ours grades a page.

## Side by side

| Capability | UIDS | ds-contracts-poc |
|---|---|---|
| Component contracts | 27 | 56 |
| Compiled catalog for agents | yes | yes |
| Design tokens | 709, 3 tiers | 282, DTCG |
| Governance rules for agents | 11, judge/agent split | conformance expectations |
| Deterministic output scoring | yes, page-level | yes, component-level |
| Generates a component library | **no** | yes (React) |
| Generates a Figma library | **no** | yes |
| Three-way parity differ | one-way checkers | yes |
| Extract contracts from existing code | by hand | adapters |
| Browser computed-style regression | yes, 24 baselines | conformance fixture |
| Claude Design view | yes, 21 templates | **no** |
| Playground / dashboard | **no** | yes |

## Figma Make

- Parallel track, early. Consumes the tokens, links to Figma components.
- Waiting on closed beta so it can read the local file system.
- Useful principle: **a Figma frame earns its place when it introduces new visual information** — new type, colour, spacing, graphic. Not when the only change is a CSS layout prop.
- So `horizontal_alignment: center` needs no frame; a new background pattern does.
- Matches a rule we already had — Button went from 144 naive variants to 27 by treating booleans as axes.

## What we're trying to learn

- **What agentic workflows need.** Most of what's here exists because something failed first.
- **An internal agentic design system** — test visual changes against the current system, and watch how these tools apply our tokens and components.
- **Put it in front of the landing-page and content teams.** Their misses are our next rules.

## Honest status

- ✅ Tokens, contracts, catalog, 9 checkers in CI. `check-contracts` at zero warnings for the first time.
- ✅ Computed-style regression against Storybook — what made the SCSS tokenization safe.
- ✅ 21 Claude Design templates, byte-synced to a registered design system.
- ⚠️ Judge discriminates (34/100 ungoverned vs 100/100 governed) — but those fixtures are **hand-written stand-ins, not captured model output**. That gap shows the judge works, not yet that the catalog changes model behaviour.
- ⚠️ Figma is audited, not generated — and the audit only sees *bound* variables. A raw value where a token belongs is invisible to it.
- ⬜ "Reported the gap instead of inventing around it" — the most interesting behaviour — isn't machine-scorable. Scored by hand.
- ⬜ The pattern tier (list = stacked borderless cards) has its schema but not its contract. It's the case a real page got wrong.
