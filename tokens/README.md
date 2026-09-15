# UIDS Design Tokens

Source of truth for UIDS design tokens, starting with **base typography and color**.
Both the future CSS output and the Figma library (variables + text styles) are generated
from these files — never hand-edit one side without the other.

Values reflect **4.x as shipped** (root font-size 16px, so `1rem = 16px`). Naming follows
the direction set by 5.x `tokens.css` (`--uiowa-[category]-[property]-[step|name]`).

## Structure

Follows Brad Frost's tier architecture (as implemented in
[bfw-tokens](https://github.com/Brad-Frost-Web/bfw-tokens) and the
[atomic-design-course](https://github.com/Brad-Frost-Web/atomic-design-course) level-4 demo),
in Style Dictionary `.value` format. Directory names match the Figma collection names;
Brad's repos call the same tiers `tier-1-definitions` / `tier-2-usage`:

```
tokens/
  primitives/           # tier 1: raw, context-free values (no {references})
    colors.json
    typography.json     # family, weight, size, line-height, letter-spacing, text-transform
    spacing.json        # space.[step] scale, step = rem × 100 (space.300 = 3rem)
  semantic/             # tier 2: role-named aliases + composite type styles ({references} only)
    colors.json
    typography-usage.json
    layout.json         # gutters, section rhythm, block stacking, container caps, breakpoints
  components/           # tier 3: component tokens, one file per component
    brand-bar.json
    logo.json
```

### Spacing & layout conventions

- **`space.[step]` names are rem × 100** (`space.300` = 3rem). One rounding: `space.187`
  = 1.875rem. Steps `105`, `110`, `160` are shipped legacy oddballs — tokenized
  descriptively (4.x as shipped), flagged in comments as 5.x consolidation candidates.
- **`layout.*` semantics carry the breakpoint in the name** (`gutter.width.mobile` /
  `.desktop`) rather than using component-tier breakpoint leaves — consuming SCSS
  media-switches between them, matching how the hand-authored CSS is structured.
- **`layout.breakpoint.*` is never emitted to CSS** (custom properties cannot drive
  `@media`); those tokens exist for Figma and documentation. `page` is canonically
  `1350px` (= 4.x `$break-page-container: 84.375em`).
- **Column ratios, container behaviors, and Layout Builder classes are patterns, not
  tokens** — they belong in foundations documentation (Figma layout page, DS guide),
  not in variables.
- **uids_base (SiteNow) is a downstream consumer**: its section/Layout Builder values are
  described by these tokens, but its classes stay in that repo.

### Tier 3 (component) conventions

- One file per component; only **meaningful, identity-bearing values** are tokenized
  (heights, logo dimensions, component colors, component type sizes). One-off paddings and
  offsets stay as raw geometry, documented in the component's contract
  (`contracts/<component>.json` → `geometryNotTokenized`).
- **Responsive values** use a breakpoint leaf key: `mobile` / `md` (≥980px) / `page`
  (≥1350px) — the brand bar's breakpoints, distinct from typography's 600/1310 clamp
  endpoints. A token without a breakpoint key holds the same value at all breakpoints.
  In Figma these map to the `Components` collection's three modes.
- **Sentinel `0` = auto/content-driven** (e.g. mobile bar height hugs its content). The
  Figma sync skips binding dimensions whose mode value is 0.
- Component tokens reference primitives (`{color.gold}`) where a primitive exists; raw px
  values otherwise (component dimensions are not forced into an invented spacing scale).
- WEB code syntax omits the breakpoint (`var(--uiowa-brand-bar-height-default)`) — CSS
  resolves breakpoints via media queries, not variable names.
- **Brand channels** (`brandChannel: "primary" | "secondary"` on a component-token leaf
  or a semantic color role):
  values whose 4.x source was `$primary`/`$secondary` (= `var(--brand-primary/-secondary)`,
  the runtime theming channel uids-core.scss defines and uids_base rethemes per site —
  e.g. grayscale mode injects `--brand-primary: #d7d7d7 !important`) MUST carry this flag.
  The CSS emitters output `var(--brand-*)` so retheming keeps working; the token's `{ref}`
  stays the channel default (`{color.gold}` / `{color.black}`) so Figma and the catalog
  show the default rendering — build-tokens throws on a mismatch. Added 2026-08-14 after
  the Buttons swap shipped `--uiowa-button-primary-background: var(--uiowa-color-gold)`
  FLAT, which grayscale sites' `--brand-primary` override could no longer reach (gold
  buttons, gray hover borders). Invisible to check-styles by construction (the default
  theme computes identically), so provenance is the only guard: **when swapping SCSS,
  check whether each replaced value was `$primary`/`$secondary` in 4.x** — literals
  (like `logo.fill`, 4.x `$uiowa-gold`) stay flat. The dc `tokens.css` defines both
  channels itself since the templates load no uids-core.
  Semantic-tier support was added in the shared-foundations phase (2026-08-15) for the
  Background foundation's `color.on-light.*` / `color.on-dark.*` roles — 4.x
  `bg-fg-colors` wrote `$secondary`/`$primary` foregrounds, so the same rule applies one
  tier up. `build-tokens` allows the flag only on `color.*` semantic leaves (and still
  validates the `{ref}` against the channel default); `$light` and `$white` remain flat.
- **Alpha colors** (`color.alpha.*`, first minted in the shared-foundations phase):
  names are **alpha-per-mille** — `black-125` = black at 0.125 opacity — matching the
  `space.*` rem×100 spirit. Values are CSS-canonical `rgba(r, g, b, a)` strings (what
  browsers compute all legacy spellings to, so spelling unification is a computed no-op).
  In Figma they are single variables whose snapshot value is 8-digit hex (`#RRGGBBAA`);
  both `figma-readback.js` and `check-figma.mjs` round alpha with `Math.round(a × 255)`,
  which absorbs Figma's float32 storage noise.

## Naming algorithm

`[category].[property].[step | role]`

- **Tier-1 steps are abstract numeric** (`font-size.150`), ordered with gaps for future
  insertions — not px-keyed, so values can be re-tuned without renames. Anchors match 5.x:
  `font-size.100` = 1rem, `font-size.200` = 1.25rem.
- **Tier-1 tokens hold one honest value each** and never reference other tokens.
- **Tier-2 tokens are named by role** (`heading-h2`, `body`, `label`), never by value,
  and only ever reference other tokens — no raw values.
- **Responsive type** = desktop token + `-mobile` twin (Brad's pattern; there is no fluid
  clamp() at the token layer). The pair holds the 4.x `clamp()` endpoints: `-mobile` =
  the 600px-viewport value, desktop = the 1310px-container value. Intermediate fluid
  values are a CSS rendering concern, not a token concern.
- **Composite type styles** bundle exactly six properties: `font-family`, `font-weight`,
  `font-size`, `line-height`, `letter-spacing`, `text-transform`. A `-mobile` twin
  re-references its desktop sibling for every property that doesn't change.
- Line-heights are **unitless ratios** (`1.7`), keyed by percent (`line-height.170`).

## Figma mapping

Figma file: [UIDS](https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS)

| Tokens here | Figma |
|---|---|
| `primitives/*` | `Primitives` collection, single mode; rem × 16 → px floats |
| Tier-2 role aliases (`typography.font-family.heading`, `color.text`, …) | `Semantic` collection variables |
| Composite `font-size` + its `-mobile` twin | ONE `Semantic` size variable with two modes: `small (600)` = mobile value, `large (1310)` = desktop value |
| Each composite bundle (`heading-h2`, `body`, …) | A text style (`Heading/H2`, `Body/Default`, …) whose family/weight/size bind to Semantic variables; line-height set as static % (= the unitless ratio) |

Slash-group translation: `typography.font-size.150` → `font/size/150`;
`typography.heading-h2.font-size` (+ mobile twin) → `font/size/heading/h2`.

Exceptions: `letter-spacing` and `text-transform` primitives are not created as Figma
variables — text styles set them directly (0 / UPPER). `line-height` primitives exist in
Figma as hidden documentation tokens but are never bound (Figma treats bound line-height
numbers as px; styles use the equivalent static percent instead).

Spacing/layout: `space/*` primitives follow the file convention (scopes `[]`, hidden from
pickers — designers pick the semantic tier). `layout/*` semantics are scoped `GAP`
(gutters, padding, stacking) or `WIDTH_HEIGHT` (container caps) and hold the same value
in both Semantic modes — the breakpoint lives in the token NAME (`…/mobile`,
`…/desktop`), mirroring how the CSS media-switches between two custom properties.
`layout/breakpoint/*` variables are documentation-only: scopes `[]` and no WEB code
syntax (never emitted to CSS). The `Foundations / Layout` page holds the spacing-scale
specimen (bars width-bound to `space/*`), container and section-layout diagrams (gaps
bound to `layout/gutter/width/desktop`), and the token-reference/notes frames.

## Known divergences & decisions

- **5.x `font-size-body`**: 5.x currently aliases body → `font-size-100` (1rem); shipping
  4.x body copy is 1.2rem (`font-size.150` here). Reconciling is a one-line alias change
  when 5.x lands.
- **Label and Button typography are component-tier**, not core typography. **Buttons phase
  resolved this (2026-08-14): tier-3 only — no tier-2 `button` composite.** Component type
  treatments reference primitives directly from `tokens/components/<name>.json`, matching
  the brand-bar and brand-footer precedent. A tier-2 composite would emit a second custom
  property for the same value (`--uiowa-font-size-button` alongside
  `--uiowa-button-font-size`) and only its `font-size` channel reaches CSS anyway, so the
  bundle would be Figma-only machinery; buttons are consumed in Figma as a component set
  whose text binds the tier-3 size variables, not as a loose text style. **Forms should
  follow the same rule for `label`.**
  The `.bttn` font-weight caveat is now **settled**: Antonio is served as static instances
  at 100/300/700 (not a variable font), so the undeclared, inherited 400 always matched the
  **300** face. Verified in Storybook — 300 is the only Antonio face that loads, and the
  same button measures identically at both specified weights. `button.font-weight` codifies
  300 and the SCSS now declares it. `$label-font-size` (0.9rem) was removed from
  `_variables.scss` by `1fbefb6f94` ("Unused $label-font-size removed") and no longer
  exists — real form labels use `--form-label-font-size: 1rem` (`form.scss`), 1.1rem in
  `.form--large`. The 0.9rem value survives as `font-size.75` (figcaption → `caption`);
  the button's 1.25rem survives as `font-size.200` (5.x anchor).

- **The `$xsm…$xxxlg` Sass spacing vars are primitives, not tier-3** (decided in the
  Buttons phase). They are shared vocabulary — `$md` 34 uses, `$sm` ~26, `$lg` 21,
  `$xsm` 18, `$xlg` 7, `$sm-md` 4, spread across card, stat, blockquote, pager, slider,
  brand-footer, headline-mixins, paragraph and utilities — so modeling them as tier-3 would
  violate the one-contract-claims-each-token rule that `check-contracts.mjs` enforces.
  `space.105` already *is* `$md` and `space.187` already *is* `$lg`. Buttons consumed only
  `$sm`, which is now `space.62`.
  **TODO (separate sweep, deliberately not in the Buttons diff):** repoint the remaining
  vars at `space.*` the way `--space-sm/md/lg-width-gutter` were aliased, and **delete
  `$xsm-sm`, `$xxlg` and `$xxxlg` — all three have zero uses in UIDS.** That sweep touches
  ~10 SCSS files across five other components, so it wants its own regression baselines.
- **amnestyscript** (`$font-family-script`) is a custom woff Figma cannot load — excluded;
  known gap.
- Heading sizes come from the responsive `clamp()` mixins in
  `src/scss/abstracts/_utilities.scss` / `_headings.scss`, not the static `$hN-font-size`
  variables (which only match the large endpoints).
