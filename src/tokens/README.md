# Design tokens

`src/tokens/` is the source of truth for UIDS color, typography, spacing, and layout
values. Everything else is generated from it.

```
src/tokens/primitives/   raw values — the only place a literal is authored
src/tokens/semantic/     intent-based roles that reference primitives
```

## Generated output — do not edit

`scripts/build-tokens.mjs` compiles these files into
`src/scss/abstracts/_tokens-generated.scss`, the custom properties the SCSS build uses.
Regenerate with:

```
yarn build:tokens
```

It is committed, so a fresh checkout can run Storybook and a git-URL install can read
the Sass source without a build step. CI fails if it drifts from `src/tokens/**`.

CSS comes from Sass, not from the generator. `src/scss/tokens.scss` is an entrypoint the
existing `sass src/scss:dist` build compiles to `dist/tokens.css`, alongside
`uids-core.css` and `uids.css`.

**Never hand-edit a generated file.** Change `src/tokens/` and regenerate.

## Format

Token files are DTCG-shaped: `$value` for the value, `$type` where the type is not obvious
from context, `$description` for what the token is for, and `{dot.path}` for references.

A text style is one `$type: "typography"` composite rather than a token per property, so
the file records that a style's channels belong together. Its sub-values are references,
and the generator emits every channel as `--uiowa-typography-<role>-<property>`.

Two deliberate deviations from DTCG 2025.10, both because nothing but this repo's
generator reads these files:

- Dimensions are strings (`"1.2rem"`) rather than the spec's `{ "value": 1.2, "unit": "rem" }`.
- A fluid `fontSize` is `{ min, max }`. The spec has no way to express a value that varies
  with viewport, and storing the endpoints rather than a `clamp()` string keeps the inputs
  recoverable — re-point either reference and the generated slope follows.

```json
"neutral": {
  "100": { "$value": "#F3F3F3" }
},
"text": {
  "default": { "$value": "{color.neutral.900}", "$description": "Text on white, gray, and gold surfaces." }
}
```

A `$description` says what the token is for, in one sentence. Leave it off where the
name already says it — a numbered step on a scale needs no gloss. Group-level
`$description` carries the scale's naming convention.

**Not yet strictly conformant.** DTCG 2025.10 wants object-form dimensions
(`{"value": 16, "unit": "px"}`) and numeric font weights; every value here is a string.
`$type` is therefore omitted rather than declared falsely. Adding it means converting
every value and updating the generator to match.

## Legacy aliases

`uids-core.scss` still defines the pre-token custom property names — `--uiowa-gold`,
`--uids-light`, `--transparent-border`, `--space-sm-width-gutter`, and the rest — now
pointing at tokens instead of literals. They are public API, so they stay until they are
deliberately retired.

They are value-exact with what they replaced: introducing this layer changed **no**
resolved value anywhere in the compiled CSS. Retirement path:

1. Repoint usage at the `--uiowa-*` names, one at a time.
2. Delete an alias once nothing references it.

Both steps are breaking changes for anything consuming the old names, so they belong to a
release, not to a refactor.

Some SCSS variables are also still literals rather than token references. They are public
API on the same terms — removing one is a breaking change, not a cleanup — and the
untokenized set includes `$label-font-size`, `$xsm-sm`, `$xxlg`, `$xxxlg`, `$xlg`,
`$sm-md`, `$gutter`, and `$mobile-width-gutter`.

The SCSS variables converted to `var()` references can no longer be used in Sass math or
color functions. Nothing in `src/scss` does, and `color.scale()` call sites are kept on
literals for that reason. A new calculation needs the raw token value, not the variable.
