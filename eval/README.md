# Eval — does the contract layer change what an agent produces?

The drift checkers verify the **system's internal consistency**: tokens match SCSS,
contracts match Vue, Figma matches the catalog. None of them looks at what an agent actually
*built* with the system. That gap is the difference between "the design system is coherent"
and "the design system changes what an agent produces" — and only the second one justifies
the cost of maintaining five generated views.

`scripts/judge.mjs` closes it. It scores a generated page against the compiled catalog.

## The A/B

Run the same prompt twice against the same model:

| run | context supplied |
|---|---|
| **ungoverned** | the prompt alone |
| **governed** | the prompt **+** `catalog/catalog.json`, `catalog/tokens.lean.json`, `contracts/rules.json`, `claude-design/readme.md` |

Supply the **lean** token file: it is the same inventory with per-token provenance dropped
(~66k → ~30k tokens), so the governed run spends its context on the system rather than on
notes about the system's history.

Then judge both:

```sh
node scripts/judge.mjs run-a.html run-b.html      # or: yarn judge <files>
node scripts/judge.mjs run-a.html --json          # machine-readable
```

**The interesting number is the gap, not either score.** A governed run scoring 100 proves
nothing on its own — the fixture may just be easy. The claim is comparative, and the same
deterministic judge scores both sides, so the comparison is the evidence.

## Why the judge is deterministic

No model in the loop. A score is reproducible, and every violation names a rule id, a line,
and (for tokens) the exact token the agent should have used — so any finding can be checked
by hand against the file. A model-graded rubric would be easier to write and worth much less:
you could not tell a real regression from grader drift.

## What it checks

Each check maps to a rule id in `contracts/rules.json`. Rules marked `judge` there are
mechanically checkable by definition. Three marked `agent` turn out to be *partly* checkable
and are scored **advisory** (zero weight) rather than promoted to hard violations — the
taxonomy in `rules.json` stays the authority.

**This table is enforced.** `scripts/check-judge-rules.mjs` (in `yarn check:drift`) reads the
rule ids out of `judge.mjs`'s source and fails unless each one is in `contracts/rules.json` or
a declared view-local rule, *and* unless this table lists exactly those ids — in both
directions, so it also catches a row promising a check that no longer runs. Until 2026-08-22
the coupling was convention only: `judge.mjs` built a `Map` of rules.json ids and never used
it, so renaming a rule there silently broke every report the judge produces. The checker reads
`judge.mjs` as text and never runs it, which is how it stays inside `check:drift` while
`yarn judge` stays out.

| rule | severity | what it catches |
|---|---|---|
| `components-from-catalog` | critical | invented components, invented props, illegal enum values |
| `tokens-only` | critical | a `var(--uiowa-*)` that is not declared anywhere — an **invented token**, which renders as nothing while reading as system usage, so it is worse than a raw value |
| `tokens-only` | major/minor | raw hex (major when a token already holds that value, and it is named), ad-hoc type sizes off the scale |
| `no-planned-options` | major | options marked `planned` / `deprecated` |
| `second-row-forces-narrow` | major | Brand Bar with a second row but no narrow |
| `no-bare-element-styles` | major | bare `h2` / `p` / `a` in the page's own `<style>` — `dc-import` shares one cascade. **View-local**: a fact about claude-design's runtime, not about UIDS, so per `rules.json`'s scope rule it lives in `claude-design/readme.md` and is *not* one of that file's ids. The one declared exemption in `check-judge-rules.mjs`. |
| `badge-inline-only` | critical | a badge given `position:absolute` / `float` |
| `page-heading-structure` | critical / advisory | page title demoted to `h2`; no `h1` at all |
| `semantic-tier-first` | advisory | a primitive var used where a semantic exists |

Scoring: `100 − Σ weights`, where critical = 10, major = 5, minor = 2, advisory = 0.

### What it deliberately does NOT judge

**"Reported the gap instead of faking around it."** This is the most interesting behaviour in
the whole A/B and a deterministic judge cannot see it: an agent that says *"the system has no
component for X, here is a contract proposal"* is doing the right thing, and one that quietly
invents X is not, but both produce a file. Score that dimension by hand, and record it beside
the machine score rather than pretending the script measured it.

## The interface a page programs against

One subtlety worth knowing before reading a report. A `.dc.html` template has **no slot
mechanism**, so slot content is exposed as editor props (`siteName`, `crumb_1_text`,
`title_1`). Judging attributes against contract *options* alone reports every one of those as
an invented prop, which it is not. So the allowed set is the template's `data-props` **union**
the contract's options and slots, and only an attribute in none of them is invented.

## Fixtures

`fixtures/news-listing.*` — the prompt, plus a representative ungoverned and governed page.

Current scores: **ungoverned 34/100 (14 violations), governed 100/100 (0)**.

The news-listing prompt is chosen deliberately: a list of items is exactly the case
`item-list-is-stacked-cards` exists for, and it is the one a real consuming page got wrong in
2026-08. An ungoverned agent reliably hand-writes a `<ul>` with its own date/heading/summary
CSS instead of reaching for borderless Cards — and the hand-written version then needs
invented colours and type sizes to look right. So one prompt exercises component invention,
raw hex, ad-hoc type, and the cascade leak at once.

The two fixture pages are hand-written stand-ins, not captured model output. They encode
failure modes this repo has actually observed, so they are useful for testing the judge —
but **the real experiment is running a live model against the prompt.** Keep these two as the
judge's own regression test; captured runs go in `runs/<date>/` beside them.

They are **not** a preview of live behaviour, and the 2026-08-22 run measured how far off:
a live ungoverned page scored −29 unclamped against this fixture's 34, and broke a different
set of rules (2 vs 5). The ungoverned fixture invents `<dc-import name="NewsCard">` — an
invented component *in the system's own syntax* — which only an agent that already knows the
`dc-import` interface can do. That is a **half-governed** agent, not an ungoverned one.

## Live runs

- **2026-08-22** — [pages](./runs/2026-08-22/). The two write-ups (`2026-08-22_live-model-ab.md`
  and `2026-08-22_findings-from-the-ab.md`) were **retired 2026-08-24**; the scores, the two method
  changes and the defects they found are all restated inline below, so nothing here depends on them.

  Opus 5, four arms. Ungoverned **0** (−29 unclamped, 33 violations) · interface-only
  (`readme.md` only) **0** (10) · governed **100** (0). `readme.md` alone eliminates the token
  and cascade violations; the **catalog** is what eliminates the component violations, and
  nothing else does.

  Two method changes came out of it and are worth carrying forward: run an **interface-only**
  third arm, because `readme.md` supplies the output *format* while the catalog supplies the
  *contents*, and a two-arm test moves both at once; and state in the prompt that the page
  lands in a directory alongside the templates and the generated CSS, because the first
  governed arm correctly deduced that "one self-contained file" is incompatible with
  `dc-import`'s sibling resolution, acted on that, and scored 0 for it.

## Judging the judge

The judge was validated four ways on a scratch copy of the governed fixture: an illegal enum
value, an invented prop, an invented component, and a bare selector plus raw hex. All four
were caught and correctly weighted.

It also caught a real mistake in its own governed fixture on first run: that fixture used
`<dc-import name="Page Title">`, but `readme.md` says the page title is **plain markup**, not
an import, and there is no `Page Title.dc.html`. A judge that flags its author's error is
worth more than one tuned until it agrees with them.
