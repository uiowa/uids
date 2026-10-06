# Changelog

Notable changes to UIDS. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Entries that change a rendered value carry both the old value and the new one, so a
design system built from UIDS can be realigned from this file alone.

One `##` heading per release, newest first, carrying its version. A released heading
also carries its date.

## [5.0.0-alpha.1](https://github.com/uiowa/uids/compare/v5.0.0-alpha.0...v5.0.0-alpha.1)

### Added

- A Storybook `Review/CSS cleanup` page with migration comparisons and a prominent
  review of existing component text-color overrides against background defaults.

### Changed

- Form buttons use `.bttn--small` and `.bttn--full` in place of `.button--small` and
  `.button--full-width`. Inside `.form`, they keep `font-size: 1.05rem` and `width: 100%`,
  respectively. With the button stylesheet loaded, replacing `.bttn.button--small` with
  `.bttn.bttn--small` also changes horizontal padding from `2rem` to `1rem`.
- Component documentation now describes Vue 3 and Storybook in place of Fractal and Twig.

### Removed

- `.tabs-collection [role="tabpanel"].is-hidden`. Use the native `hidden` attribute
  to hide a tab panel, as the tabs JavaScript already does.
- `.footer-cta__wrapper`, `.footer-cta__container`, and `.socket__container` styles for
  obsolete brand-footer wrappers, including `.footer-cta__wrapper .bttn--outline`
  and descendant menu styles. No replacement classes.
- `.grid--3-2 .stat__description`, an unused stat-layout override. Default stat
  descriptions inside `.grid--3-2` now use `width: 85%` instead of `60%` at the
  medium breakpoint and above.

#### Legacy class names

Replace the removed classes with the names below. Exceptions to a direct rename follow
the table.

| Removed | Replacement |
| --- | --- |
| `.bold-headline` | `.headline` |
| `.bold-headline--negative` | `.headline--negative` |
| `.bold-headline--caps` | `.headline--uppercase` |
| `.bold-headline--serif` | `.headline--serif` |
| `.bold-headline--highlight` | `.headline--highlight` |
| `.bold-headline--underline` | `.headline--underline` |
| `.block-padding__top`, `__right`, `__bottom`, `__left` and their `--minimal` modifiers | the same suffix on `.element--padding` |
| `.block-padding__all`, `__all--extra`, `__all--minimal` | the same suffix on `.element--padding` |
| `.block-margin__top`, `__right`, `__bottom`, `__left` | the same suffix on `.element--margin` |
| `.block-margin__top--extra`, `.block-margin__bottom--extra` | `.element--margin__top--extra`, `.element--margin__bottom--extra` |
| `.uids-component--circle-list` | `.element--circle-list` |
| `.uids-component--bold-intro` | `.element--bold-intro` |
| `.uids-component--light-intro` | `.element--light-intro` |
| `.uids-component--gray` ancestor of `.element--circle-list` | `.bg--gray` |
| `.visually-hidden` | `.element-invisible` |
| `.flex--center` | `.element--flex-center` |
| `.flex--left` | `.element--flex-left` |
| `.blockquote-center` | `.blockquote--center` |
| `.blockquote-right` | `.blockquote--right` |
| `.button--small` | `.bttn--small` |
| `.button--full-width` | `.bttn--full` |
| `.bg-pattern--brain` | `.bg--white--pattern--brain` |
| `.bg-pattern--brain-black` | `.bg--black--pattern--brain` |
| `.bg-pattern--brain-reversed` | `.bg--gold--pattern--brain` |

- Move `.blockquote-center` and `.blockquote-right` from the wrapper to the blockquote
  element, using `.blockquote--center` and `.blockquote--right`.
  Plain alignment rules match. The 4.x Vue blockquote component already uses the
  replacement classes, including for image layouts.
- Replace `.bg-pattern--brain*` ancestors with the matching `.bg--*--pattern--brain`
  classes. The replacements preserve the removed descendant declarations and also apply
  the background images and each surface's background, text, link, and border colors.
  The removed selectors only applied descendant styles.
- `.cta__wrapper.element--left .bold-headline` sizing and margin overrides are removed.
  Replacing `.bold-headline` with `.headline` changes `font-size` from `2.5rem` to
  `2.8rem` and `margin-bottom` from `var(--uiowa-space-50)` (`0.5rem`) to `0`.
- Replacing `.bold-headline--highlight.bold-headline--serif` with
  `.headline--highlight.headline--serif` changes span padding from `0.85rem 1rem` to
  `0.2rem 1rem 0.5rem` through an existing canonical rule.
- `.headline--uppercase` also styles spans inside `.headline__text`; the old
  `.bold-headline--caps` class only styled spans inside `.headline__heading`.
  The additional spans gain highlight colors, `display: inline-block`, top and bottom
  margins of `0.8rem`, and padding of `0.4rem 1.2rem 0.8rem`.
- Replacing `.bold-headline` with `.headline` can activate existing banner and card
  headline rules that did not apply to the legacy class.
- Replacing a circle-list ancestor's `.uids-component--gray` with `.bg--gray`
  preserves the circle's inset shadow. With background styles loaded, `.bg--gray`
  also applies `background-color: var(--uiowa-color-background-gray)` and the gray
  surface's text, link, and border colors.
- Replacing `.flex--center` or `.flex--left` preserves the utility declarations,
  but can activate existing stat component rules. `.element--flex-center` also
  excludes horizontal stats from the `.stat--horizontal:not(.element--flex-center)`
  layout rules.
- `.element-invisible` preserves UIDS's visually hidden declarations. It does not
  provide focus-reveal rules for `.visually-hidden.focusable`; preserve any such
  behavior supplied by other stylesheets when migrating focusable elements.
- The unused `.bold-headline--caps .headline__headline span` selector is removed.

## [5.0.0-alpha.0](https://github.com/uiowa/uids/releases/tag/v5.0.0-alpha.0)

First release of the 5.x line. 5.x starts as a copy of 4.x, so every value below is
stated against 4.0.1. The major version reflects rendered changes to spacing, heading
sizes, status colors, and grays.

### Added

- `--uiowa-color-text`, `--uiowa-color-link`, and `--uiowa-color-border` resolve against
  the nearest `bg--*` ancestor.
- `font-family` is now declared on `h2` through `h6`, `p`, `.uids-component--light-intro`,
  and `.element--light-intro`; `font-weight` on `h3` and `p`. The values match what those
  elements already inherited.
- A Storybook `Tokens` section with Colors, Typography, and Space and layout pages, each
  reading the custom properties out of the loaded stylesheets and rendering every token
  through itself.
- A Storybook `Showcase/Web page` story that builds a full page out of existing
  components.
- Package subpath exports, so a JS build system can reach the CSS and the token source
  by specifier rather than by relative path:

  | Specifier | File |
  | --- | --- |
  | `uids/uids.css` | the full stylesheet |
  | `uids/uids-core.css` | reset, base HTML, and custom properties |
  | `uids/tokens.css` | custom properties alone |
  | `uids/components/<name>.css` | one component |
  | `uids/scss/<path>` | Sass source |
  | `uids/tokens/<tier>/<group>.json` | DTCG token source |

  The `.css` specifiers need `dist/`, which is gitignored, so they do not resolve from a
  git-URL install. Publishing a release now attaches an installable tarball carrying both
  `dist/` and `src/`, and depending on that asset resolves everything:

  ```json
  "@uiowa/uids": "https://github.com/uiowa/uids/releases/download/v5.0.0/uids-5.0.0.tgz"
  ```

#### Design tokens

`src/tokens/` is the source of truth for color, typography, space, and layout values.
The build compiles them to generated Sass source and publishes the resulting custom
properties as `dist/tokens.css`.

### Changed

- Token generation now uses Style Dictionary on Node 22. Token source and generated
  custom-property names use their full token paths; Node 22 is the minimum supported
  version.
- Release packages now contain the compiled CSS, Sass and token source, and the assets
  required by the Sass source.
- Serif headings take the sans size. `.headline--serif` and `.bold-headline--serif` still
  set Zilla Slab, but no longer carry their own `font-size` at `h2` through `h6`. They
  now render slightly larger at narrow viewports and slightly smaller at wide ones.
- Sass variables such as `$success` and `$container-width` hold `var()` references rather
  than literals, so Sass color and math functions cannot operate on them. A calculation
  needs the raw token value.
- Component and shared CSS now references the existing color tokens for white, black,
  gold, and gray where their roles are clear. These replacements preserve the current colors.

#### Spacing scale

Sass spacing variables now point at steps on a 4px grid, affecting padding and margin on
cards, alerts, tables, buttons, forms, and menus.

| Variable | Was | Now |
| --- | --- | --- |
| `$xsm` | `0.325rem` (5.2px) | `0.25rem` (4px) |
| `$sm` | `0.625rem` (10px) | `0.5rem` (8px) |
| `$md` | `1.05rem` (16.8px) | `1rem` (16px) |
| `$lg` | `1.875rem` (30px) | `2rem` (32px) |

#### Heading sizes

Every heading is fluid and every minimum is unchanged. The maximum moves at each level,
and `h6` becomes fluid rather than fixed.

| Level | Was | Now |
| --- | --- | --- |
| `h1` | `clamp(2.3rem, 2.3662vw + 1.4127rem, 3.35rem)` | `clamp(2.3rem, calc(1.6967vw + 1.6637rem), 3.0529rem)` |
| `h2` | `clamp(1.95rem, 0.7887vw + 1.6542rem, 2.3rem)` | `clamp(1.95rem, calc(1.1202vw + 1.5299rem), 2.4471rem)` |
| `h3` | `clamp(1.65rem, 0.5915vw + 1.4282rem, 1.9125rem)` | `clamp(1.65rem, calc(0.6903vw + 1.3911rem), 1.9563rem)` |
| `h4` | `clamp(1.45rem, 0.338vw + 1.3232rem, 1.6rem)` | `clamp(1.45rem, calc(0.4401vw + 1.285rem), 1.6453rem)` |
| `h5` | `clamp(1.3rem, 0.2254vw + 1.2155rem, 1.4rem)` | `clamp(1.3rem, calc(0.2734vw + 1.1975rem), 1.4213rem)` |
| `h6` | `1.2rem` | `clamp(1.2rem, calc(0.1728vw + 1.1352rem), 1.2767rem)` |

`h1` also gains `line-height: 1.15`, which was `unset`.

#### Status colors

| Role | Was | Now |
| --- | --- | --- |
| Info | `#00558C` | `#3375D1` |
| Info surface | `#ECF7FF` | `#EAF1FB` |
| Success | `#00664F` | `#0E6B4D` |
| Success surface | `#EAFFFA` | `#E6F4EE` |
| Warning | `#BD472A` | `#8B6B13` |
| Warning surface | `#FFF7D8` | `#FBF3DC` |
| Danger | `#BD472A` | `#C0392B` |
| Danger surface | `#F7E2DC` | `#FBEAEA` |

Warning previously rendered in the same red as danger. It is now an ochre that reaches
4.5:1 on its own surface.

Affects `.alert--info`, `.alert--success`, `.alert--warning`, `.alert--danger` and their
`.fa-circle` icons, `.badge--blue`, `.badge--green`, `.badge--orange`, `mark.deletion`,
and the form error states.

#### Grays

Neutral steps moved to the values in the brand Foundations palette. Components now use
the canonical neutral tokens.

| Role | Property | Was | Now |
| --- | --- | --- | --- |
| Light | `--uiowa-color-neutral-200` | `#CACACA` | `#BCBEC0` |
| Mid | `--uiowa-color-neutral-300` | `#9A9A9A` | `#8D9094` |
| Default | `--uiowa-color-neutral-400` | `#737373` | `#777A7F` |

Affects `.form-item--toggle input`, `.menu li a:after`, `.form select[multiple]`, and the
form focus shadow.

#### Background contexts

Every `bg--*` class still exists and still takes the same fill. What changed is how
content inside one gets its color. Each surface re-points `--uiowa-color-text`,
`--uiowa-color-link` and `--uiowa-color-border`, and inheritance carries the choice down.

An element now takes its colors from the nearest background ancestor at any nesting depth.
Before, the stylesheet handled only explicit nesting levels, and deeper nesting fell back
to the outermost background.

Selector text changed from `.bg--black` to `[class*="bg--black"]`, which also matches the
pattern variants such as `.bg--black--pattern--brain`. No class was added or removed.

### Removed

- Root-level compatibility aliases. Use the canonical token properties instead:

  | Removed | Replacement |
  | --- | --- |
  | `--uiowa-gold` | `--uiowa-color-brand-gold` |
  | `--uiowa-black` | `--uiowa-color-brand-black` |
  | `--brand-primary` | `--uiowa-color-brand-gold` |
  | `--brand-secondary` | `--uiowa-color-brand-black` |
  | `--uids-gray-cool` | `--uiowa-color-neutral-500` |
  | `--link-color` | `--uiowa-color-link-default` |
  | `--uids-light` | `--uiowa-color-neutral-100` |
  | `--uids-gray-mid` | `--uiowa-color-neutral-300` |
  | `--uids-gray` | `--uiowa-color-neutral-400` |
  | `--uids-gray-light` | `--uiowa-color-neutral-200` |
  | `--transparent-border` | `--uiowa-color-border-default` |
  | `--space-lg-width-gutter` | `--uiowa-space-300` |
  | `--space-md-width-gutter` | `--uiowa-space-200` |
  | `--space-sm-width-gutter` | `--uiowa-space-125` |
- Serif `font-size` overrides in `_headings.scss`, at `h2` through `h6`.
- The blanket `[class*="bg--"] *` border rule and its `:before` / `:after` counterpart.
  Nothing in UIDS had a visible border that depended on it.
- `[class*="bg--black"]` border-color overrides on `.alert`, `.border`, and `.card`,
  replaced by `--uiowa-color-border`.
- `$orange` (`#BD472A`). It was a workaround for a warning icon that was illegible in
  gold. The new warning color is legible on its own surface.
- `src/scss/abstracts/_background-mixins.scss` and `src/scss/abstracts/_placeholders.scss`.
  The `uids-dynamic-extend` and `bg-fg-colors` mixins are gone with them.
- `main`, `module`, and the `.` export. All three pointed at `dist/uids.es.js` and
  `dist/uids.umd.js`, which no script has ever built, so `import 'uids'` failed to
  resolve. It now fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` instead of a missing file.
