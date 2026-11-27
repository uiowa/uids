# UIDS rules for composing pages and using components

The page-layout reference is the Showcase story `src/components/showcase/WebPage.stories.js`
(`showcase-web-page--web-page`). Editing rules for the Foundations pages are in `overview.md`.

## Governance

- **components-as-shipped** — Use only the props, slots and values a component defines in its
  `.vue` file and styles in its SCSS. Never invent a prop, variant or value; if something needed
  is missing, say so instead of improvising.
- **tokens-only** — Every color, font family, weight, size, spacing, radius, stroke and shadow
  comes from `src/tokens` (`var(--uiowa-…)`). No raw hex, px or rem where a token exists.
- **semantic-tier-first** — Prefer semantic tokens (`color.text.default`, `typography.heading.h2`,
  `stroke.width.default`) to primitives (`color.neutral.900`, `typography.font-size.195`), unless the
  component's own SCSS already binds the primitive.
- **props-change-by-pr** — A new prop, slot, option value or token is a pull request reviewed by the
  Web team, never something added inside a page, a Make edit or a Figma edit. Propose it; don't
  ship it.

## Page

- **page-anatomy** — A page is, in order: `<main>` › Brand Bar carrying `<h1 class="site-name">` ›
  nav strip › Banner or first section › sections › Brand Footer. Nothing sits between the nav strip
  and the Banner. The site name is stated by the Brand Bar and the Footer; never repeat it as a
  heading.
- **page-heading-structure** — The Banner headline and every section heading are `h2`; headings
  inside a section step down from there. Never add a second `h1`.
- **banner-led-page** — A banner-led page has one Banner directly under the nav strip, carrying the
  page's headline, its supporting line as body copy and its primary actions as buttons. Never stack
  a second Banner, or a full-width band, beneath it.
- **section-rhythm** — A section is one wrapper (plain, or a `bg--*` class) around one
  `page__container` that carries `element--padding__top` and `element--padding__bottom`. Spacing
  between sections, and between the components inside one, comes from those utilities and the
  components' own margins, never from a margin you add.
- **alternate-section-backgrounds** — Alternate backgrounds down the page. Never put two colored
  bands next to each other; the plain section between them is what makes each read as a band.
- **nav-strip** — The horizontal navigation is `<div class="menu--container">` (a full-bleed strip
  with a hairline bottom border) around `<div class="layout-container">` holding the Menu with
  `variant="horizontal"` and `top`. The Menu renders the `<nav>` landmark itself when `top` is set,
  so the wrapper is a `div`, not a second `nav`. Do not put the border on an inner container.

## Layout

- **column-container-around-components** — A component with a responsive layout must sit inside a
  `column-container` or `layout-container`, which establish the container query the component's
  layout switch listens to. Without one, a horizontal Menu renders stacked, a Card with
  `orientation` renders stacked, and a Banner's content loses its width cap, all silently. Grid items
  are already containers; put the wrapper inside the section's `page__container`.
- **container-width-by-content** — One thing that reads better narrow (body copy, a CTA, a
  Blockquote, an Accordion) goes inside a Grid with `type="onecol__narrow"`, which caps it at the
  narrow container width. Anything with columns (a card grid, a Stat row) takes a multi-column Grid
  `type` at full width.
- **centred-heading-goes-narrow** — A centred heading and its deck go in a Grid of their own with
  `type="onecol__narrow"`; the cards or grid they introduce go in a separate multi-column Grid in the
  same section. A left-aligned heading shares its content's Grid.
- **card-grid-uses-the-shipped-grid** — A row of cards or stats goes in the Grid component with one
  of the `type` values that have stylesheet rules (`onecol`, `onecol__narrow`, `twocol--50-50`,
  `twocol--67-33`, `threecol--33-34-33`, `fourcol--25`; see `src/scss/layout/_grid.scss`), one GridItem
  per card. Never a hand-rolled grid: it will not level the row and it invents breakpoints no
  component uses.

## Components

- **badge-inline-only** — A Badge is an inline pill in the flow of text, right after the thing it
  labels: a list item, a table cell, a card meta line, a heading. It has one size everywhere; never
  set a size on it. Never position it absolutely, float it, or mount it as a corner flag or ribbon.
- **item-list-is-stacked-cards** — A list of items (news, events, related items, search results) is
  stacked Cards with `borderless`, one per row, not hand-written markup. A grid of bordered Cards is
  for a set of parallel destinations, like a three-across "related programs" block.
- **list-card-action-is-the-circle-indicator** — In a stacked list, a Card's action is
  `link_indicator` with `link_text` empty, so the card ends in the round arrow and no text button.
  Labelled buttons belong on grid cards, where each label carries real information.
- **card-in-a-listing-is-a-destination** — A Card that stands for somewhere a reader can go gets a
  `url`; that is also what makes the whole card the click target. A card with no destination is
  content for prose or a Stat.
- **pre-title-is-not-a-category** — A Card's `pre_title` slot is a contextual label ("Pinned",
  "Applications close Friday"), not a taxonomy term. Don't tag every card in a listing with its
  section; the pre-title renders quiet on purpose and a column of them becomes noise. Same for an
  icon: it marks an exception, not a type.
- **card-background-contrasts-the-band** — A Card in a colored section needs its own `background`
  (white inside `bg--gray`) to read as an object on a surface. `borderless` is for cards already
  separated by the grid gap on a plain section; a borderless card on a gray band disappears.
- **banner-pre-title-is-a-hook** — A Banner's `pre_title` is a hook or topic label ("Research
  stories", "Undergraduate program"), not the owning unit's name.
- **banner-stacks-on-mobile** — Set `mobile_content_below_image` on every Banner that has media and
  no `background`: below the small container width it stops overlaying text on the photograph and
  stacks the content under it. With a `background` set, the prop has no effect and the text stays
  overlaid.
- **second-row-forces-narrow** — When a Brand Bar shows a second row, the top bar is `narrow`. The
  code enforces it; designs must match.
- **backgrounds-by-class** — A background is a class on a section wrapper: `bg--{black|gold|gray|white}`,
  optionally `--pattern--{brain|community|particle}`; no suffix is the no-pattern case. The class
  goes on the wrapper, never on the components inside it. Never reproduce a pattern with your own
  image, gradient or SVG, and never set opacity on a background or its pattern: strength is baked
  into the shipped asset.
- **pattern-over-a-flat-dark-band** — A full-width black or gold band with no image reads as stark.
  Reach for a pattern class on the section instead of bare `bg--black` or `bg--gold`; the pattern
  does the work an image would, with nothing to crop or caption.
- **alert-spacing** — An Alert brings its own padding. Never hand-set padding inside one or restyle
  its interior to fit a message; shorten the message. The space around an Alert is its section's
  job: give it a section of its own.
- **underline-scope** — The gold underline (`underline` on Headline) marks the first heading of each
  section, one per section. A site picks one heading treatment and uses it consistently. Never
  underline a sub-heading inside a section; that flattens the hierarchy.
- **heading-alignment-follows-content** — A heading takes the alignment of what it introduces:
  centred over a centred CTA, a Stat row or a card grid; left over prose. Never centre a heading
  over body copy or just to break up a page. Centre it on the heading itself (`headline--center`),
  not by centring the wrapper, or the underline stays hard left. Don't mix alignments in a section.
- **stats-come-in-threes** — Stats are comparison objects: put three across in a Grid, each with
  `stat_title`, `stat_summary` and enough `stat_content` to earn its column. Two is acceptable when
  there are only two figures; one is not, and belongs in body copy or a Callout.
- **cta-is-always-narrow** — A CTA's text never runs the full page width: put the band on the
  section, cap the measure with a Grid `type="onecol__narrow"` around the CTA, and leave the CTA's
  own `background` unset so it does not paint a second band inside the first.
- **callout-is-a-float** — A Callout is a floated aside beside prose, not a section band. Used
  full-width it escapes its section and the next heading wraps beside it.
- **light-font-buttons-belong-in-cards** — The Button's `light_font` style is the in-card treatment
  (quiet, text-like). On a section-level action it reads as an unstyled link. For a section action,
  use a Button with its default face and a real `color`.
- **menu-limits** — The horizontal Menu has no dropdowns: nested items are hidden in horizontal
  mode. Don't hand-build a dropdown to fill the gap; note it to the user.

## Editorial

- **no-heading-over-self-evident-content** — Content that states its own meaning needs no heading.
  A Stat row is the clear case: each stat carries its label, so "By the Numbers" adds nothing and
  unbalances the band.
- **section-heading-gets-a-deck** — A section heading that introduces a grid gets one or two
  sentences of body copy under it before the grid. The deck is body text, never the light intro
  treatment (`element--light-intro`), which belongs to the page's own introduction, once.
- **no-second-contact-block** — Don't build a section that restates the Brand Footer (address,
  phone, email) or the Brand Bar (site and parent names). If the closing section would only repeat,
  delete it; if there is genuinely more to say about visiting, that is a Visit page the nav links to.

## Figma

- **respect-breakpoint-modes** — In the library, every breakpoint variant of a component pins both
  the Components collection mode and the Semantic collection mode.
