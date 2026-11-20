# Design tokens

`src/tokens/` defines UIDS global color, typography, spacing, and layout tokens.

```
src/tokens/primitives/   context-free values named by measurement or appearance
src/tokens/semantic/     purpose-named roles that may reference primitives or carry direct values
```

Token files follow [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/).

## Breakpoints

Breakpoint values are stored in px and generated as Sass rem values. Media-query rem
units use the browser's default font size; container-query rem units use the document
root font size, which UIDS fixes at 16px. At a 16px browser default the thresholds
match. A different browser default can make media and container queries switch at
different CSS-pixel widths.

## Generate

Style Dictionary compiles the token files into `src/scss/abstracts/_tokens-generated.scss`.
Do not edit that generated file. When changing `src/tokens/**`, run:

```
yarn build:tokens
```

`yarn build` runs this step automatically, and CI validates it. No token command is
needed for a CSS-only change. Generated token files are not committed; `prepack` runs the
build so release artifacts include the generated Sass and CSS.

## UIDS extensions

UIDS currently defines one namespaced extension using DTCG's `$extensions` property.

### `edu.uiowa.fluid`

Adds responsive scaling to a typography token. The generator resolves the token's
`fontSize` reference to a CSS `clamp()` value. The extension declares
`minViewport` and `maxViewport` as px dimensions, then either a `max` size or
`strategy: "exponential"` with a numeric `exponent`.

## Typography roles

The roles are base + multiples. Body X-Small, Small, Medium, Large and X-Large
(`typography.body.x-small`, `.small`, `.medium`, `.large`, `.x-large`) are the five body sizes, and each names a
hierarchy. The other roles, the Labels aside, are each held once: their own family, weight, line height and letter
spacing, and a `multiple`, so a role's size in a hierarchy is that hierarchy's body size times the multiple. A
hierarchy group inside a role holds only what differs in that hierarchy. The gaps are the body size times
`typography.scale.related` and `.break`. Use one hierarchy's styles together. Each body size's description lists
its formats. `typography.headline-6x` and `headline-8x` are bigger steps of the Headline. The Labels are one set
for every hierarchy, `large`, `medium` and `small`, measured from Body Medium and written as plain sizes, so they
don't follow it if it changes.

The classes that apply the roles are in `src/scss/base/_type-roles.scss`. A hierarchy class on a piece, a section or a
component sets the body size every role inside it multiplies. Medium is the default, so a web page needs none:

```html
<section class="type-scale--large">
  <h2 class="type-headline">…</h2>
  <p class="type-body">…</p>
</section>
```

The nearest hierarchy class wins, so a section or a component can take its own. The hierarchy classes also
set the gaps as `--uiowa-type-space-related` and `--uiowa-type-space-break`. The Labels are
`.type-label--large`, `--medium` and `--small`. Subhead 2's emphasis weight is `.type-subhead-2--emphasis`, on the
element or on a span for part of a line; a `strong` or `b` inside `.type-subhead-2` takes it too. The intro under a
page's title is `.element--light-intro` or `.element--bold-intro`, which set the same style: Subhead 2 at its regular
weight, at the Subhead's size, so the intro is the h2's size in every hierarchy. A banner's or poster's lead-in is the
Subhead.

Application pages take the Headline at 3× the body rather than 4×, 57px on Medium. UIDS has no 3× token or class:
the application's own CSS sets `--uiowa-typography-headline-multiple: 3` on its wrapper, and `.type-headline` inside
it follows.

`typography.paragraph` is the style UIDS's base styles set on paragraphs.

The highlight tokens are multiples of the role's own font size, em in CSS. A highlight on chosen
headline words is a box from cap height to baseline plus `typography.highlight.headline.padding` on all four
sides, and the headline takes `.leading` more leading per line; the subhead's band runs from
`typography.highlight.subhead.above` above the baseline to `.below` below it, and `.bleed` past the text at each
end.

`llms/llms.txt` and `llms/typography.md` give the typography as plain text, for readers that can't run the docs
site. They're kept by hand: when a typography token changes, change `llms/typography.md` with it.
