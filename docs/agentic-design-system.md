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

- **Authored source:** `tokens/` (108 primitive, 229 semantic, 378 component) and `contracts/` (28).
- **Five generated views:** SCSS custom properties · `catalog/` · Figma variables + sets · `claude-design/` · Storybook.
- **Seven checkers**, one per direction, all dependency-free Node, all in CI.
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
- *vs. theirs:* yes, 56 to our 28. Theirs are complete enough to emit React; ours carry provenance and defect records.

## `catalog/`

- Fully derived, never hand-edited, content-hashed, with a `--check` mode.
- `catalog.json` (component index + pointers) and the token inventory, emitted twice.
- **Hand an agent `tokens.lean.json`** — all 715 tokens and values with the per-token provenance dropped. ~66k → ~30k tokens, a 55% cut in the largest thing a governed session loads.
- `tokens.json` keeps the provenance for humans. Both are generated; both are `--check`ed, so they can't drift apart.
- The point: one artifact that answers "what exists and what may I use?"
- *vs. theirs:* yes — same idea, reached independently.

## `contracts/rules.json`

- 22 rules, each tagged `judge` (6, mechanically checkable) or `agent` (16, guidance); 21 are published into the Claude Design view.
- Examples: only use what's in the catalog; no raw hex where a token holds the value; a list of items is stacked borderless cards.
- Every rule exists because a real page got it wrong.
- **Generated** into the consuming docs from this one file — we used to keep three hand-maintained copies and they drifted into two live contradictions.
- *vs. theirs:* partly — their conformance file constrains the *machinery*; ours constrains the *page author*.

## `scripts/`

- **Builders** generate a view from source (`build-tokens`, `build-catalog`, `build-dc-rules`, `build-dc-manifest`), each with `--check`.
- **Checkers** guard a view (`check-contracts`, `check-figma`, `check-claude-design`, `check-citations`, `check-styles`).
- `yarn check:drift` runs seven of them — all but `check-styles`, which needs Storybook running, and `build-dc-manifest --check`.
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

## Output grading — deliberately not in this repo

- Every checker here verifies the *system's* consistency. **None looks at what an agent actually built** with it. That gap is real and it is knowingly left open upstream.
- A deterministic page grader (`judge.mjs`) and its governed-vs-ungoverned A/B fixtures exist, and stay in the research fork. They score inputs you supply, not the repo — so they guard nothing here, and shipping them would put a second, unenforced copy of the rule vocabulary next to `rules.json`.
- What survives upstream is the thing consumers actually need: `rules.json` is still the single place a rule is authored, and still publishes itself into the views agents read.
- Worth being blunt about the `judge` / `agent` tier while we're here: it says a rule *could* be checked mechanically, not that anything checks it. Of the six judge-tier rules, one (`components-from-catalog`) is named in a checker, at warn level; `respect-breakpoint-modes` is half-covered by `check-figma` (mode names and values, but not variant mode pins — the snapshot doesn't carry them); the other four are enforced by nobody. That was true before the grader left and is true after.
- *vs. theirs:* they grade a component at generation time; we grade a page after the fact, and only in the fork.

## Side by side

| Capability | UIDS | ds-contracts-poc |
|---|---|---|
| Component contracts | 28 | 56 |
| Compiled catalog for agents | yes | yes |
| Design tokens | 715, 3 tiers | 282, DTCG |
| Governance rules for agents | 22, judge/agent split | conformance expectations |
| Deterministic output scoring | not here — page-level, in the fork | yes, component-level |
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

- ✅ Tokens, contracts, catalog, 7 checkers in CI. `check-contracts` at zero warnings for the first time.
- ✅ Computed-style regression against Storybook — what made the SCSS tokenization safe.
- ✅ 21 Claude Design templates, byte-synced to a registered design system.
- ⚠️ Nothing here measures what an agent *produces*. The fork's judge discriminates (34/100 ungoverned vs 100/100 governed), but those fixtures are **hand-written stand-ins, not captured model output** — that gap shows the judge works, not yet that the catalog changes model behaviour. Until it's run against real model output, treat it as a hypothesis.
- ⚠️ Figma is audited, not generated — and the audit only sees *bound* variables. A raw value where a token belongs is invisible to it.
- ⬜ "Reported the gap instead of inventing around it" — the most interesting behaviour — isn't machine-scorable. Scored by hand.
- ⬜ The pattern tier (list = stacked borderless cards) has its schema but not its contract. It's the case a real page got wrong.
