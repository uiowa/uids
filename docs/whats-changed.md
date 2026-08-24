# What changed vs upstream `uiowa/uids` 4.x

This repo is an experiment: UIDS 4.x made machine-readable (design tokens, per-component contracts, drift checkers) so that code, Figma, and AI agents all work from the same source of truth.

## 1. Tokens and component CSS

- New `tokens/` directory. See [`tokens/README.md`](tokens/README.md).
- `node scripts/build-tokens.mjs` generates `src/scss/abstracts/_tokens-generated.scss` — a `:root` block of `--uiowa-*` custom properties, imported by `uids-core.scss`. `yarn build` / `yarn dev` run it automatically.
- 24 of 27 component SCSS files now consume `var(--uiowa-*)` instead of literals (all except `slider.scss` and the legacy `cta_uids3.scss`; `_border.scss` uses the tokenized border mixin). Base styles and shared mixins are tokenized too.
- The Sass variables in `_variables.scss` still exist but now hold `var(--uiowa-*)` references — downstream SCSS compiles unchanged, but Sass math/color functions on them no longer work. Two variables were removed: `$label-font-size` and `$xsm-sm` (see §5).
- Badge is one fixed size — `font-size: 75%` → absolute `0.75rem` (padding/radius keep their 9px/12px equivalents). Badges no longer scale up inside headings. A size modifier was proposed and declined. `contracts/badge.json` `changes[]`.
  - [Badge docs](http://localhost:6008/?path=/docs/components-badge--docs)
- Narrow brand bar site name — `.iowa-bar--narrow` site-name and parent-site-name unified at `1.2rem` (was `1rem`). `tokens/components/brand-bar.json`.
  - [Brand Bar → Narrow story](http://localhost:6008/?path=/story/components-branding-brand-bar--narrow)
- Button declares `font-weight: 300` (previously undeclared). Renders identically — Antonio ships only 100/300/700 static faces, so browsers already matched 300; now code, tokens, and Figma state what actually renders. `tokens/components/button.json`.
- Grid gained `type="list"` (additive) — the stacked-list arrangement production used but UIDS itself could not render. `contracts/item-list.json`.
  - [Card → Item List story](http://localhost:6008/?path=/story/components-card--item-list)

## 2. Storybook

- No version bump — upstream was already on Storybook 10.4.1; so are we.
- `.storybook/main.mjs`: one bugfix (`fileURLToPath` so builds work from checkout paths containing spaces).
- `package.json`: build scripts run `build:tokens` first; new scripts (`check:drift`, `test:styles`, `lint:ci`, `test:unit:ci`); devDependencies added for CI only (eslint + plugins, vitest, `@vue/test-utils`, puppeteer, typescript).

## 3. Component stories and code

- Background's `AllBackgrounds` renders all 16 treatments in one story: [All Backgrounds](http://localhost:6008/?path=/story/components-background--all-backgrounds)
- Four new components: Breadcrumbs, PageTitle, Pager, Tabs:
  - [Breadcrumbs docs](http://localhost:6008/?path=/docs/components-breadcrumbs--docs)
  - [PageTitle docs](http://localhost:6008/?path=/docs/components-page-title--docs)
  - [Pager docs](http://localhost:6008/?path=/docs/components-pager--docs)
  - [Tabs docs](http://localhost:6008/?path=/docs/components-tabs--docs)
- Mechanical `let`→`const` lint fixes across Vue/JS (driven by the new ESLint CI), and small dead-code removals (BrandFooter's unused `contact_info` prop, Logo raster fallbacks).

## 4. New directories

1. `tokens/` — source of truth for all values
2. `scripts/` — token/catalog builders + 7 drift checkers
3. `regression/` — computed-style baselines proving the migration
4. `.github/workflows/checks.yml` — CI: drift checks, lint, tests, style regression
5. `contracts/` — component contracts and rules
6. `catalog/` — generated agent entry point (checked in CI)
7. `figma/snapshot.json` — committed Figma readback; lets CI check Figma drift without API access
8. `claude-design/` — Claude design templates

## 5. Downstream: what this breaks in `uids_base`

The Sass variables in `_variables.scss` mostly survive, but they now hold `var(--uiowa-*)` references instead of literal values, and two were removed outright. Consuming SCSS that only *emits* a variable compiles unchanged. Consuming SCSS that *computes* with one does not. Call sites verified in `uiowa/docroot/themes/custom/uids_base` on 2026-08-24:

**Compile errors — the build stops.**

| Cause | Call site |
|---|---|
| `$label-font-size` removed | `scss/components/form/forms.scss:80`, `:331` |
| `$xsm-sm` removed | `scss/components/uiowa-bar.scss:31`, `scss/views/bef/view-bef.scss:88`, `:131` |

`view-bef.scss:88` and `:131` also do Sass arithmetic — `#{2 * variables.$xsm-sm}` — which is the second, more general hazard: Dart Sass rejects arithmetic on a `var()` outright (`Error: Undefined operation "2 * var(--…)"`, probed 2026-08-24). Any downstream math on a now-tokenized variable fails the same way, whether or not that variable still exists.

**Silent, and therefore worse — compiles clean, the browser drops the rule.**

`scss/components/form/forms.scss:751` does `rgba(variables.$secondary, 0.2)`. Sass does not error: it can't decompose a `var()`, so it passes the call through verbatim and emits `rgba(var(--brand-secondary), 0.2)`. `--brand-secondary` resolves to `#000`, so that is not valid CSS, and the browser discards the declaration. Nothing in the build reports it. Search downstream for Sass color functions (`rgba`, `mix`, `darken`, `lighten`, `transparentize`) wrapping a `variables.$*` value — CSS-native `color-mix()` and `calc()` are fine, since they take a `var()` happily.

## 6. What is deliberately NOT here

Two things exist in the research fork this work came from and were left out of this PR on purpose:

- **A deterministic page grader** (`judge.mjs`) plus its governed-vs-ungoverned A/B fixtures. It scores an HTML page you hand it against the catalog and names the token behind every hardcoded value. It grades *inputs you supply*, not the repo, so it guards nothing here — and shipping it would put a second, unenforced copy of the rule vocabulary beside `contracts/rules.json`. Its finding so far (34/100 ungoverned vs 100/100 governed) is measured on hand-written fixtures, not captured model output, so it is a working grader rather than evidence about model behaviour.
- **A memory-size gate** for the agent-session notes, which aren't tracked here.

Consequence to be clear about: nothing in this repo measures what an agent *builds* with the system. The checkers prove the system agrees with itself.
