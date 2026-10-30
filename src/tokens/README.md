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
generator prints a `calc()` that keeps the reference as a custom property, so setting the
size it starts from once resizes every token built on it. The typography roles use it on
the reading size, `typography.base.fontSize`:

```json
"fontSize": {
  "$type": "dimension",
  "$value": "{typography.base.fontSize}",
  "$extensions": { "edu.uiowa.multiply": { "by": 8 } }
}
```

prints `calc(var(--uiowa-typography-base-font-size) * 8)`.
