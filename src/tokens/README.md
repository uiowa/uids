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

Style Dictionary compiles the token files into `src/scss/abstracts/_tokens-generated.scss`, and the
typography classes' declarations into `_type-roles-generated.scss`. Do not edit those generated files. When changing `src/tokens/**`, run:

```
yarn build:tokens
```

`yarn build` runs this step automatically, and CI validates it. No token command is
needed for a CSS-only change. Generated token files are not committed; `prepack` runs the
build so release artifacts include the generated Sass and CSS.

The same build writes `dist/typography-roles.json`: every typography role style in every hierarchy, resolved to its
face, weight, leading and size, and every text gap, with each size in rem, px (at the 16px
root) and pt (1pt = 4/3px), and each group's description. It is for tools that read numbers
rather than CSS, such as an agent building print templates. Points are worked out there,
never stored in a token, since DTCG dimensions take only px and rem.

## UIDS extensions

UIDS defines two namespaced extensions using DTCG's `$extensions` property.

### `edu.uiowa.fluid`

Adds responsive scaling to a typography token. The generator resolves the token's
`fontSize` reference to a CSS `clamp()` value. The extension declares
`minViewport` and `maxViewport` as px dimensions, then either a `max` size or
`strategy: "exponential"` with a numeric `exponent`.

### `edu.uiowa.multiply`

Makes a size a multiple of another size. The token's `$value` references the size it
starts from, and `by` is the multiplier: a number token's reference, or a number. The
generator prints a `calc()` that keeps the reference as a custom property, so the math
stays visible in the CSS. The Labels use it, each a size measured from Body Medium:

```json
"fontSize": {
  "$type": "dimension",
  "$value": "{typography.body.medium.fontSize}",
  "$extensions": { "edu.uiowa.multiply": { "by": 0.875 } }
}
```

prints `calc(var(--uiowa-typography-body-medium-font-size) * 0.875)`.

A tool that does not support this extension reads only the `$value`, so it gets the size a
token starts from: the example above would come out at Body Medium's size, not 0.875 times
it. Such a tool should read the resolved sizes in `dist/typography-roles.json` instead.

The roles are base + multiples. Body X-Small, Small, Medium, Large and X-Large
(`typography.body.x-small`, `.small`, `.medium`, `.large`, `.x-large`; 12.67, 16, 19, 24 and 36px) are the five
body sizes, and each names a hierarchy. Every other role is held once: its own family, weight, line height and
letter spacing, and a `multiple`, so its size in a hierarchy is that hierarchy's body size times the multiple
(`typography.headline.multiple` is 4). A hierarchy group inside a role holds only what differs in that
hierarchy: Subhead's line height in X-Small and Small, Subhead 2's in Large and X-Large. The gaps are the body
size times `typography.scale.related` (1.5) and `.break` (2). Use one hierarchy's styles together. Each body
size's description lists its formats. The Headline is 4× its body size; `typography.headline-6x` and
`headline-8x` are the bigger steps. The Labels are one set for every hierarchy, `large`, `medium` and `small`,
measured from Body Medium.

The token build also writes the classes that apply the roles. A hierarchy class on a piece, a section or a
component sets the body size every role inside it multiplies. Medium is the default, so a web page needs none:

```html
<section class="type-scale--large">
  <h2 class="type-headline">…</h2>
  <p class="type-body">…</p>
</section>
```

The nearest hierarchy class wins, so a section or a component can take its own. The hierarchy classes also
set the gaps as `--uiowa-type-space-related` and `--uiowa-type-space-break`. The Labels are
`.type-label--large`, `--medium` and `--small`.

`typography.paragraph` is the style UIDS's base styles set on paragraphs, 1.2rem with a line height of 1.7.
It was `typography.body` until the Body role took that name.

Label Large (Roboto Medium, 0.875 × Body Medium, line height 1.4, normal tracking) is also the
small head of a box or a table. The docs site (uiowa/uids#1105) sets it for “When to use”,
“Guidance” and table column heads, in uppercase with 0.04–0.06em tracking that the page adds; the
role itself carries no transform. Whether that treatment belongs to the role, to a component, or
stays with the page is still to decide.

The highlight tokens are multiples of the role's own font size, em in CSS. A highlight on chosen
headline words is a box from cap height to baseline plus `typography.highlight.headline.padding`
(0.1) on all four sides, and the headline takes `.leading` (0.05) more leading per line; the subhead's
band runs from `typography.highlight.subhead.above` (0.32) above the baseline to `.below` (0.16)
below it, and `.bleed` (0.08) past the text at each end.
