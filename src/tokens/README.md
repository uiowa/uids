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

Style Dictionary compiles the token files into `src/scss/abstracts/_tokens-generated.scss`
and the dark mode values into `src/scss/abstracts/_tokens-dark-generated.scss`. Do not
edit those generated files. When changing `src/tokens/**`, run:

```
yarn build:tokens
```

`yarn build` runs this step automatically, and CI validates it. No token command is
needed for a CSS-only change. Generated token files are not committed; `prepack` runs the
build so release artifacts include the generated Sass and CSS.

## Color modes

UIDS has a light and a dark color mode. Dark mode follows the operating system
(`prefers-color-scheme`). A page can fix the mode with `data-theme="light"` or
`data-theme="dark"` on its root element; without the attribute, it follows the system.

Color roles such as `color.text`, `color.background.panel` and `color.divider` name a
job, not a color. Each has a light value and, when the job needs a different color on
dark, a dark value in `edu.uiowa.dark`. A role without a dark value uses one color in
both modes. Primitives have no modes.

A group's own token is written `$root`: `color.text.$root` is `--uiowa-color-text`,
beside `--uiowa-color-text-default` and `--uiowa-color-text-inverse`.

## UIDS extensions

UIDS defines two namespaced extensions using DTCG's `$extensions` property.

### `edu.uiowa.dark`

Gives a color role its dark mode value, as a reference to another token:

```json
"$root": { "$value": "{color.text.default}", "$extensions": { "edu.uiowa.dark": "{color.neutral.100}" } }
```

The generator writes these values twice: under `:root[data-theme="dark"]`, and under
`@media (prefers-color-scheme: dark)` for a root without `data-theme="light"`. Both set
`color-scheme: dark`, so form controls and scrollbars follow. A dark value that is not a
reference fails the build.

### `edu.uiowa.fluid`

Adds responsive scaling to a typography token. The generator resolves the token's
`fontSize` reference to a CSS `clamp()` value. The extension declares
`minViewport` and `maxViewport` as px dimensions, then either a `max` size or
`strategy: "exponential"` with a numeric `exponent`.
