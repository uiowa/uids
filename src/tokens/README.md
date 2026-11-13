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

## Layout tiers

`layout.digital.*` holds the column count, margin, gutter, padding, and reading width for each
digital size tier. The Medium tier starts at `breakpoint.768` and Large at `breakpoint.980`.
Padding is an alias of gutter in every tier.

## Generate

Style Dictionary compiles the token files into `src/scss/abstracts/_tokens-generated.scss`.
Do not edit that generated file. When changing `src/tokens/**`, run:

```
yarn build:tokens
```

`yarn build` runs this step automatically, and CI validates it. No token command is
needed for a CSS-only change. Generated token files are not committed; `prepack` runs the
build so release artifacts include the generated Sass and CSS.

The same build writes `dist/typography-roles.json`: every typography role style resolved to its
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
stays visible in the CSS. The typography roles use it on the body sizes:

```json
"fontSize": {
  "$type": "dimension",
  "$value": "{typography.body.medium.fontSize}",
  "$extensions": { "edu.uiowa.multiply": { "by": 4 } }
}
```

prints `calc(var(--uiowa-typography-body-medium-font-size) * 4)`.

A tool that does not support this extension reads only the `$value`, so it gets the size a
token starts from: the example above would come out at Body Medium's size, not four times
it. Such a tool should read the resolved sizes in `dist/typography-roles.json` instead.

The roles are one scale of fixed sizes. Body X-Small, Small, Medium, Large and X-Large
(`typography.body.x-small`, `.small`, `.medium`, `.large`, `.x-large`; 12.67, 16, 19, 24 and 36px) are the five
body sizes, and each names a hierarchy: the X-Small, Small, Medium, Large or X-Large of every other
role, and of `typography.space.related` and `.break`, is a multiple of the body size of the same
name. Use one hierarchy's styles together. Each body size's description lists its formats. The Headline is 4× its body size;
`typography.headline-6x` and `headline-8x` are the bigger steps, in every hierarchy. The Labels are
one set for every hierarchy, `large`, `medium` and `small`, measured from Body Medium.

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
