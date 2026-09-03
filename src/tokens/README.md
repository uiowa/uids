# Design tokens

`src/tokens/` is the source of truth for UIDS color, typography, spacing, and layout
values. Everything else is generated from it.

```
src/tokens/primitives/   raw values — the only place a literal is authored
src/tokens/semantic/     intent-based roles that reference primitives
```

## Generated outputs — do not edit

| File | Consumer |
|---|---|
| `src/scss/abstracts/_tokens-generated.scss` | the SCSS build (`@use`d by `uids-core.scss`) |
| `css/tokens.css` | consumers with no Sass toolchain, via `@uiowa/uids/tokens.css` |

Regenerate both with:

```
yarn build:tokens
```

Both are committed, so a fresh checkout can run Storybook and a consumer can read either
view without running a build first. The `Tokens` CI workflow runs
`node scripts/build-tokens.mjs --check` and fails if either has drifted, so a committed
output cannot silently disagree with its source.

**Never hand-edit a generated file.** Change `src/tokens/` and regenerate.

## Format

Token files are DTCG-shaped: `$value` for the value, `$description` for what the token is for,
and `{dot.path}` for references.

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
