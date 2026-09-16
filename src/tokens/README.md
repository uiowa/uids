# Design tokens

`src/tokens/` defines UIDS global color, typography, spacing, and layout tokens.

```
src/tokens/primitives/   raw values
src/tokens/semantic/     intent-based roles that reference primitives
```

Token files follow [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/).

## Generate

Style Dictionary compiles the token files into `src/scss/abstracts/_tokens-generated.scss`.
Do not edit that generated file. When changing `src/tokens/**`, run:

```
yarn build:tokens
```

`yarn build` runs this step automatically, and CI validates it. No token command is
needed for a CSS-only change. Generated token files are not committed; `prepack` runs the
build so release artifacts include the generated Sass and CSS.

## Fluid typography

Typography styles use one `fontSize` reference. Styles that scale carry the
`edu.uiowa.fluid` extension, which defines their viewport range and either an explicit
maximum or the shared heading-scale strategy. The generator resolves it to CSS `clamp()`.

## Compatibility

`uids-core.scss` retains legacy custom-property aliases for compatibility. Treat those
aliases as public API; remove one only in a deliberate breaking release.
