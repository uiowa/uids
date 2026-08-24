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
- `package.json`: build scripts run `build:tokens` first; new scripts (`check:drift`, `test:styles`, `judge`, `lint:ci`, `test:unit:ci`); devDependencies added for CI only (eslint + plugins, vitest, `@vue/test-utils`, puppeteer, typescript).

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
9. `eval/` — deterministic judge + governed-vs-ungoverned A/B ([`eval/README.md`](eval/README.md))
