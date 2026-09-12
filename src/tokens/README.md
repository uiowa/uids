# Design tokens

`src/tokens/` is the source of truth for UIDS color, typography, spacing, and layout
values. The generator produces everything else from it.

```
src/tokens/primitives/   raw values. The only place a literal is authored.
src/tokens/semantic/     intent-based roles that reference primitives
```

## Generated output, do not edit

`scripts/build-tokens.mjs` compiles these files into
`src/scss/abstracts/_tokens-generated.scss`, the custom properties the SCSS build uses.
Regenerate with:

```
yarn build:tokens
```

The output is committed, and CI fails if it drifts from `src/tokens/**`. Change
`src/tokens/` and regenerate; do not hand-edit it.

`src/scss/tokens.scss` is an entrypoint the `sass src/scss:dist` build compiles to
`dist/tokens.css`, alongside `uids-core.css` and `uids.css`.

## Format

Token files are DTCG-shaped. `$value` holds the value, `$type` names the type where
context does not, `$description` says what the token is for, and `{dot.path}` references
another token.

A text style is one `$type: "typography"` composite. Its sub-values are references, and
the generator emits every channel as `--uiowa-typography-<role>-<property>`.

`fontSize` is always one reference: the small end for a style that scales, the only size
otherwise. `$extensions."edu.uiowa.fluid"` says whether it scales and where to. `true`
derives the large end from the small one, which is how the six headings work. A reference
names the large end outright, for the two intro styles the curve does not fit.

Dimensions are strings (`"1.2rem"`), a deliberate deviation from DTCG 2025.10, which
specifies `{ "value": 1.2, "unit": "rem" }`.

```json
"neutral": {
  "100": { "$value": "#F3F3F3" }
},
"text": {
  "default": { "$value": "{color.neutral.900}", "$description": "Text on white, gray, and gold surfaces." }
}
```

A `$description` says what the token is for, in one sentence. Leave it off where the
name already says it. A numbered step on a scale needs no gloss. Group-level
`$description` carries the scale's naming convention.

## Legacy aliases

`uids-core.scss` still defines the pre-token custom property names, now pointing at
tokens instead of literals. That covers `--uiowa-gold`, `--uids-light`,
`--transparent-border`, `--space-sm-width-gutter`, and the rest. They are public API, so
they stay until someone retires them deliberately.

Three shifted when the palette moved to the Foundations neutral steps, and the rest
resolve to what they always did. The shifts are recorded in the changelog. To retire
one:

1. Repoint usage at the `--uiowa-*` names, one at a time.
2. Delete an alias once nothing references it.

Both steps are breaking changes for anything consuming the old names, so they belong to a
release, not to a refactor.

Some SCSS variables are also still literals rather than token references. They are public
API on the same terms, so removing one is a breaking change rather than a cleanup. The
untokenized set includes `$label-font-size`, `$xsm-sm`, `$xxlg`, `$xxxlg`, `$xlg`,
`$sm-md`, `$gutter`, and `$mobile-width-gutter`.

Sass math and color functions cannot operate on the variables that hold `var()`
references. A calculation needs the raw token value, not the variable.
