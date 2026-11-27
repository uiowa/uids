# UIDS foundations: tokens and how to use them

The rules here are the token `$description`s in `src/tokens/**/*.json` and the guidance on the
Color page (`src/foundations/Color.mdx`).

## Color

### Primary

| Token | Custom property | Value |
|---|---|---|
| `color.brand.gold` → `color.gold` | `--uiowa-color-brand-gold` | #FFCD00 (Hawkeye Gold) |
| `color.brand.black` → `color.neutral.900` | `--uiowa-color-brand-black` | #000000 |

- Black and gold should be the most prominent colors in every communication.
- Use Iowa gold at full strength, never tinted or translucent.
- Black text on gold. Never gold text on white, or white text on gold.
- Gold text only for short headlines and callouts on black. Never for body copy; use white for body
  text on black.
- Don't place gold over light neutral backgrounds.

### Neutral ramp (`--uiowa-color-neutral-{step}`; a higher number is darker)

| Step | Value | | Step | Value |
|---|---|---|---|---|
| 0 | #FFFFFF | | 300 | #8D9094 |
| 100 | #F3F3F3 | | 400 | #777A7F |
| 150 | #EAEBEC | | 500 | #63666A |
| 175 | #D8DADC | | 700 | #33363A |
| 200 | #BCBEC0 | | 800 | #232527 |
| | | | 900 | #000000 |

Use: text and type hierarchy; page, section and component backgrounds; borders, dividers, table
rows and interface structure; disabled or secondary controls; chart gridlines. Dark neutrals for
text on light backgrounds, light neutrals for text on dark; light neutrals for backgrounds, rows and
dividers, darker neutrals for structure.

### Roles on surfaces

| Role | Token | Resolves to |
|---|---|---|
| Text on white, gray, gold | `color.text.default` | neutral 900 |
| Text on black | `color.text.inverse` | neutral 0 |
| Backgrounds | `color.background.default` / `.white` (neutral 0), `.gray` (neutral 100), `.black`, `.gold` | |
| Link on white and gray | `color.link.default` | `color.blue-dark` #2C6ECA |
| Link on black | `color.link.inverse` | `color.blue` #588DD6 |
| Link on gold | `color.link.gold` | neutral 900 |
| Border on white, gray, gold | `color.border.default` | black at 12.5% |
| Border on black | `color.border.inverse` | white at 32.5% |
| Dark border for controls on white and gray | `color.border.strong` | black at 42.5% |
| Light border for controls on black or with black fills | `color.border.strong-inverse` | white at 42.5% |

Always underline links. Never rely on blue alone to signal a link.

### Accent (`color.accent.{blue, teal, orange, magenta, ochre}`)

Blue #588DD6, teal #06967E, orange #E16822, magenta #CE68AC, ochre #B98100.

- Decorative emphasis: draw one item out of a set. Small details only, about 10% of a layout at most.
- Never against gold, never as text (links may use the approved blue, underlined), never a unit's or
  campaign's identifying color. Text on an accent fill is black.
- Do not use accent color to convey status, or as the only cue to meaning.
- If a layout needs repeated accents to stand out, strengthen hierarchy, spacing or copy first.

### Status (`color.{info, success, warning, danger}` and `…-surface`)

| Status | Edge | Surface |
|---|---|---|
| Info | `color.info` → blue-dark #2C6ECA | `color.info-surface` → blue-wash #EDF4FE |
| Success | `color.success` → green #0E6B4D | `color.success-surface` → green-wash #E8F6F0 |
| Warning | `color.warning` → ochre-dark #8B6B13 | `color.warning-surface` → ochre-wash #FBF3DC |
| Danger | `color.danger` → red #C0392B | `color.danger-surface` → red-wash #FFEFF1 |

- Never decoration. Always pair with text or an icon; use words, symbols, shapes or placement so
  nobody relies on color alone.
- Use each status color only for its assigned, widely recognized meaning, and sparingly.
- Pair a surface with its edge color as the border.

### Data visualization (`color.data-visualization.categorical.1` – `.12`)

1 blue, 2 orange, 3 magenta, 4 green-light #43A06D, 5 purple #9586C6, 6 ochre, 7 teal, 8 cyan
#249CB0, 9 olive #7D9847, 10 rose #F0667D, 11 gray-warm #998D7E, 12 gray-cool #8D8F90.

- One color per categorical series, assigned in numerical order without skipping or reordering.
- Use labels or patterns so color is not the only cue. Categories only: accent for emphasis
  elsewhere, status colors for status. Never gold as a category. Text inside a fill is black.
- Around seven categories, change the structure instead of adding colors.

## Strokes, corners, shadows

| Token | Value | Use |
|---|---|---|
| `stroke.width.default` → `stroke.width.1` | 1px | Component borders and dividers, the resting outline on form fields; any border with no reason to be heavier |
| `stroke.width.focused` → `stroke.width.2` | 2px | The ring around a focused element |
| `stroke.width.2` | 2px | The red ring on an invalid checkbox, radio or toggle |
| `stroke.width.4` / `.5` / `.6` / `.8` | 4–8px | Button focus bar and h6 underline (4); tab and menu indicators, h5 underline (5); h1–h4 underline and the gold spacer (6); stat titles and blockquote rules (8) |
| `radius.3` | 3px | Subtle rounded corners for form fields and alerts |
| `radius.full` | 9999px | Pill corners for badges and toggle tracks |
| `shadow.inset` | 0 1px 3px, black at 15%, inset | A slightly sunken edge (form fields) |
| `shadow.raised` | 0 1px 2px, black at 20% | A small lift off the surface (the toggle knob) |

## Spacing (`space.{step}`, rem)

25 = 0.25rem, 50 = 0.5, 75 = 0.75, 100 = 1, 125 = 1.25, 150 = 1.5, 200 = 2, 300 = 3, 400 = 4,
600 = 6, 800 = 8. Form field heights: `form.height.medium` = space 300 (48px),
`form.height.large` = space 400 (64px).

## Typography

- Families: `typography.font-family.roboto` (sans, body and h2–h6), `zilla-slab` (serif, h1 and
  intro-bold), `lora`, `antonio`.
- Weights: light 300, normal 400, medium 500, medium-bold 600, bold 700, heavy 900.
- Roles (composites in `semantic/typography.json`): `typography.body` = Roboto 400, 1.2rem,
  line-height 1.7; `heading.h1` = Zilla Slab 600, 2.3rem, 1.15; `heading.h2`–`h6` = Roboto 500 at
  1.95 / 1.65 / 1.45 / 1.3 / 1.2rem, line-height 1.25; `intro-bold` = Zilla Slab 600, 1.6rem fluid to
  2.2rem; `intro-light` = Roboto 300, 1.6rem fluid to 2.1rem; `typography.size.small` = 0.8rem,
  `.large` = 1.6rem.
- Headings and the two intro roles are fluid: the build emits `clamp()` between the role's size and
  a larger end over the 600–1310px viewport range.

## Motion

Durations by purpose: `motion.duration.fast` 150ms (hover and focus feedback), `medium` 250ms
(state changes and small movement), `slow` 400ms (larger movement). Easing: `easing.standard`
cubic-bezier(0.4, 0, 0.2, 1) for movement and change on screen; `easing.overshoot`
cubic-bezier(0.3, 1.5, 0.7, 1) for a small playful overshoot (the toggle knob).

## Layout and breakpoints

Content column maximum: `layout.container.max.standard` 81.875rem (1310px), `.narrow` 63.75rem,
`.wide` 100rem. `layout.breakpoint.standard` = 1350px, the width at which the column reaches its
maximum. Breakpoints 400 / 600 / 768 / 930 / 980 / 1200 / 1350 are Sass variables
(`$uiowa-breakpoint-<px>` in `src/scss/abstracts/_breakpoints-generated.scss`).

## Logo

`logo.minWidth` = 85px: the minimum digital display width for the Block IOWA logo (Brand Manual).
