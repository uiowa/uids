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
