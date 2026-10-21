# UIDS: where the approved decisions live

## What this repository is

UIDS is the University of Iowa Design System: a Vue 3 component library with SCSS, documented in
Storybook. SiteNow (the university's Drupal platform) consumes it.

## Sources of truth, in order

1. **Design tokens:** `src/tokens/primitives/*.json` and `src/tokens/semantic/*.json` (DTCG format:
   `$value`, `$type`, `$description`). `src/tokens/README.md` describes the build and the generated
   custom properties (`--uiowa-<path-with-dashes>`, for example `color.neutral.100` →
   `--uiowa-color-neutral-100`). The generated stylesheets `src/scss/abstracts/_tokens-generated.scss`
   and `_breakpoints-generated.scss` are not committed: run `yarn build:tokens` before searching for
   a `--uiowa-*` name, or a fresh checkout finds nothing.
2. **Components:** `src/components/<name>/<Name>.vue` (Vue 3, `<script setup lang="ts">`), styled
   by a stylesheet in `src/scss/components/` (imported at the top of the `.vue` file), with stories
   in `<Name>.stories.js`. `.figma/code-properties/*.json` is a generated prop list, not a source:
   it omits the shared props spread in from `src/components/shared/` (`background`, `borderless`,
   the media props) and can list option values that have no stylesheet. The `.vue` file and its
   SCSS decide.
3. **Foundations pages:** `src/foundations/<Page>.mdx` (the words) and `<Page>.stories.js` (the
   Vue examples the MDX embeds). The Color page is the model: see `components.md`.
4. **The Figma library** (file `hNShklBztaeaQneScM0KoM`): see `components.md`.

Token descriptions in the JSON are the usage rules. `foundations.md` collects them.

## Rules for any edit

- Use tokens by name. In SCSS: `var(--uiowa-…)`. In a Foundations story: read `src/tokens/*.json`
  and resolve the path (the Color page's `primitive()` / `role()` helpers).
- Use components through their props and slots. Do not re-create a component's markup or CSS
  locally, and do not add a new CSS file to a Foundations page.
- No new hard-coded design values (hex, px, rem) in code. A page may *display* a token's resolved
  value, such as a swatch's hex or an approved print value (PMS, CMYK).
- Do not change the root font size (16 px).
- For Foundations work, do not touch `.storybook/`, `src/scss/` or `src/tokens/` unless the task
  says so. The page lives in `src/foundations/`.
- Do not add separators, spacers or extra margins between sections; if a section looks cramped,
  say so.
- One commit per change, with a message that says what changed and why.
