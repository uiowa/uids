# Fixture: news listing page

> Build a news listing page for a University of Iowa site. It needs the site's brand bar,
> breadcrumbs, a page title, and a list of five news items — each with a date, a headline,
> a short summary, and a link to the full story. Finish with the brand footer.

Run this prompt twice against the same model:

- **ungoverned** — the prompt alone, no catalog.
- **governed** — the prompt plus `catalog/catalog.json`, `catalog/tokens.json`,
  `contracts/rules.json`, and `claude-design/readme.md`.

Judge both with `node scripts/judge.mjs`. The interesting number is not either score on its
own — it is the gap, and which rules the ungoverned run breaks.

**Why this prompt:** a list of items is the exact case `item-list-is-stacked-cards` exists
for, and it is the one a real consuming page got wrong in 2026-08. An ungoverned agent
reliably hand-writes a `<ul>` with its own date/heading/summary CSS instead of reaching for
borderless Cards, and the hand-written version needs invented colours and type sizes to look
right — so one prompt exercises component invention, raw hex, ad-hoc type, and the cascade
leak at once.
