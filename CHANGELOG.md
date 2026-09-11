# Changelog

Notable changes to UIDS. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Entries that change a rendered value carry both the old value and the new one. A design
system built from UIDS can be brought back in line from this file alone, without diffing
the compiled stylesheets.

Each release is one `##` heading carrying its version and release date, newest first. A
heading dated `Unreleased` has not shipped; it takes a date when it does.

## [5.0.0] - Unreleased

First release of the 5.x line. 5.x starts as a copy of 4.x, so every value below is
stated against 4.0.1. The major version reflects the rendered values that move: spacing,
heading sizes, status colors, and three grays.

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

  `dist/` stays untracked on branches and is built into the release commit by a `version`
  lifecycle script, so it is present at every tag.

#### Design tokens

`src/tokens/` is the source of truth for color, typography, space, and layout values.
111 tokens across two tiers compile to 135 CSS custom properties in
`src/scss/abstracts/_tokens-generated.scss`, published as `dist/tokens.css`.

| Group | Primitives | Roles |
| --- | --- | --- |
| Color | 28 | 25 |
| Typography | 30 | 9 type styles, 2 size modifiers |
| Space | 11 | None |
| Layout | None | 3 container widths |

Three breakpoint primitives are authored but not emitted. A type style is one
`$type: "typography"` composite and emits four custom properties, one per property, which
is why 111 tokens produce 135 declarations.

### Changed

- Serif headings take the sans size. `.headline--serif` and `.bold-headline--serif` still
  set Zilla Slab, but no longer carry their own `font-size` at `h2` through `h6`. Those
  five overrides made Zilla Slab optically match Roboto, which puts a dependency on the
  typeface into the size value; that compensation belongs at the `@font-face` layer, via
  `size-adjust`. Serif headings now render slightly larger at narrow viewports and
  slightly smaller at wide ones.
- Sass variables such as `$success` and `$container-width` hold `var()` references rather
  than literals, so Sass color and math functions cannot operate on them. A calculation
  needs the raw token value.

#### Spacing scale

Four Sass spacing variables now point at steps on a 4px grid. This is the largest
rendered change in the release. It moves 72 declarations across 59 selectors, covering
padding and margin on cards, alerts, tables, buttons, forms, and menus.

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

Three neutral steps moved to the values in the brand Foundations palette. The legacy
custom properties keep their names.

| Property | Was | Now |
| --- | --- | --- |
| `--uids-gray-light` | `#CACACA` | `#BCBEC0` |
| `--uids-gray-mid` | `#9A9A9A` | `#8D9094` |
| `--uids-gray` | `#737373` | `#777A7F` |

Affects `.form-item--toggle input`, `.menu li a:after`, `.form select[multiple]`, and the
form focus shadow. The other eleven legacy aliases are value-exact with what they
replaced.

#### Background contexts

Every `bg--*` class still exists and still takes the same fill. What changed is how
content inside one gets its color. Each surface re-points `--uiowa-color-text`,
`--uiowa-color-link` and `--uiowa-color-border`, and inheritance carries the choice down.

An element now takes its colors from the nearest background ancestor at any nesting
depth. Before, the stylesheet spelled out two levels of nesting as 27 selector
combinations, and a third level fell back to the outermost background.

Selector text changed from `.bg--black` to `[class*="bg--black"]`, which also matches the
pattern variants such as `.bg--black--pattern--brain`. No class was added or removed.

### Removed

- The five serif `font-size` overrides in `_headings.scss`, at `h2` through `h6`.
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

### Not changed

- No component markup. No `.vue` file differs from 4.0.1.
- No border, shadow, or breakpoint tokens are introduced. Two `box-shadow` values on
  `.form input` do change, but only because the colors inside them did.
