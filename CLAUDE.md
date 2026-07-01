# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Iowa Design System (UIDS) 5.x — A brand refresh is in-progress and this branch supports that work. `tokens.css` is the source of design tokens.

## Docs (`docs/`)

Markdown docs so designers can experiment with documentation treatment, previewed with real token values.

- Content lives in `docs/content/*.md` — one file per page. Add a page by adding a file.
- `npm run docs:preview` builds and serves it locally.
- Token examples use inline HTML with `var(--uiowa-color-x)` so they render with real values; if a token isn't in `tokens.css` yet, confirm it should be added and add it there.

## Workflow

**Designer:** A designer describes the change in plain language, Claude edits the markdown, and shows the preview locally. When the designer is satisfied, Claude commits changes and opens the PR against `5.x`.

## Branching

5.x and 4.x are parallel branches — target PRs at the branch they belong to, never merge one into the other.
