---
name: iowa-design
description: Use this skill to generate well-branded interfaces and assets for the University of Iowa, either for production or throwaway prototypes/mocks/etc. Contains the UIDS design tokens (color, typography, spacing/layout), the layout and background systems, and twenty migrated components (Banner, Card, Brand Bar, Logo, Brand Footer, Button, Form, Headline, Accordion, Alert, Badge, Blockquote, Breadcrumbs, Callout, CTA, Menu, Pager, Stat, Table, Tabs).
user-invocable: true
---

Read `Design System Guide.md` first — it is the authoritative guide (scope, the copy-in
protocol, rules, type ramp, color, layout system, backgrounds, component props). Link
`tokens.css`, `layout.css` and `backgrounds.css` in anything you build and use only
`var(--uiowa-*)` tokens for color, type, and spacing.

**Start from `Page Scaffold.dc.html`** — it is the canonical page structure (Brand Bar →
`.layout__container` sections → Brand Footer), already wired to the tokens and layout
classes. Copy it and replace the content rather than composing a page from scratch.

**Copy before you import.** `<dc-import name="Brand Bar">` resolves a SIBLING file, so the
templates must be copied into one directory of your project: `copy_files` the scaffold, the
components you need, **`Logo.dc.html`** (Brand Bar and Brand Footer both import it),
**`Headline.dc.html` and `Button.dc.html`** (`CTA.dc.html` imports both), `tokens.css`,
`layout.css`, and `backgrounds.css`; then `create_support_js` in that directory. A missing
sibling renders NOTHING, silently — there is no error. Do not rewrite the templates'
`./tokens.css` link — copying `tokens.css` beside them makes it resolve, and keeps the
copies re-copyable when the design system updates. Details in the guide.

Notes specific to this brand:
- This system currently covers the token foundations, the layout system, the background
  system (`backgrounds.css` — `bg--*` bands set the fill AND the text cascade; pattern
  variants render color-only in this view), and twenty components:
  - **Page furniture** — Brand Bar (`Brand Bar.dc.html`), Logo (`Logo.dc.html`),
    Brand Footer (`Brand Footer.dc.html`), Banner (`Banner.dc.html`).
  - **Content** — Card (`Card.dc.html`), Headline (`Headline.dc.html`), Blockquote (`Blockquote.dc.html`),
    Callout (`Callout.dc.html`), Stat (`Stat.dc.html`), Table (`Table.dc.html`),
    Badge (`Badge.dc.html`), Alert (`Alert.dc.html`).
  - **Actions** — Button (`Button.dc.html`), CTA (`CTA.dc.html`), Form (`Form.dc.html`).
  - **Navigation** — Menu (`Menu.dc.html`), Tabs (`Tabs.dc.html`), Pager (`Pager.dc.html`),
    Breadcrumbs (`Breadcrumbs.dc.html`), Accordion (`Accordion.dc.html`).
- **Still NOT migrated: cards, sliders, grid and showcase.** Do not improvise
  Iowa-looking versions of these; use the `.uids-placeholder` convention from the scaffold
  and report the gap.
- Some components depend on behavior this view cannot carry. Tabs will not switch panels,
  the Accordion will not open on click, and the Alert's dismiss button does nothing — each
  template exposes a prop to select which state renders instead. Font Awesome is not
  loadable here, so glyph-bearing components either inline the SVG or say in a comment what
  is standing in. Never present these as interactive.
- The IOWA / IOWA Health Care lockups are included as real SVGs in `Logo.dc.html`. They are
  protected trademarks — never redraw, recolor, distort, or approximate them.
- Antonio (the caps display font) is for short headlines/callouts only — never body text.
- Every uiowa.edu site requires the Brand Bar at the top and the Brand Footer at the bottom.
- Section rhythm steps at 768px (not 980px), and adjacent sections sharing a `.bg--*` class
  intentionally merge into one band.
- This is a generated view of the `uiowa/uids` repo — changes flow contract-first through
  the repo, never by hand-editing files here.
