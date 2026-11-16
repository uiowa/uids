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

UIDS defines these namespaced extensions using DTCG's `$extensions` property.

### `edu.uiowa.fluid`

Adds responsive scaling to a font size. Declare it on a typography token, where it
applies to the `fontSize` member, or on a standalone dimension token whose key is
`font-size`. The generator emits the font size as a CSS `clamp()` value instead of a
reference. The extension declares `minViewport` and `maxViewport` as px or rem
dimensions, then either a `max` size in rem or `strategy: "exponential"` with a
numeric `exponent`.

### `edu.uiowa.responsive`

Re-points a token at a breakpoint. Keys are breakpoint token names and values are
token references. The generator emits each override in a `min-width` media block, so
breakpoints stay out of token names.

### `edu.uiowa.variant`

Re-points a token for a component variant. Keys are variant names and values are
token references. The generator emits each override under the variant's selector, so
variants stay out of token names:

```json
"button": {
  "$extensions": { "edu.uiowa.variants": { "black": ".bttn--black" } },
  "background": {
    "$type": "color",
    "$value": "{color.background.gold}",
    "$extensions": { "edu.uiowa.variant": { "black": "{color.background.black}" } }
  }
}
```

```css
.bttn--black {
  --uiowa-button-background: var(--uiowa-color-background-black);
}
```

The selector defaults to the BEM modifier `.{component}--{variant}`, where the
component is the token's top-level group. A group can declare `edu.uiowa.variants`
to map a variant name to a different selector, as above. Interactive states remain
named tokens; give each state token its own variant override.

A typography token keys each override by member, so only that member is re-pointed.
The same applies to `edu.uiowa.responsive`:

```json
"$extensions": { "edu.uiowa.variant": { "narrow": { "fontSize": "{typography.font-size.100}" } } }
```

Setting the token on an ancestor does not reach a variant, because the variant
selector sets it on the element itself.
