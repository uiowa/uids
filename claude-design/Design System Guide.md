# UIDS 4.x — University of Iowa Design System

This design system is **generated from the `uiowa/uids` repository** (branch
`feature/design-tokens-figma`). The repo is the source of truth: tokens live in `tokens/`,
component contracts in `contracts/`, and the agent catalog in `catalog/`. Do not hand-edit
the generated files here (`tokens.css`, `layout.css`, the component `.dc.html` templates) —
changes flow contract-first through the repo and are re-synced by a Claude Code session.

Other views of this same system: the Figma library
(https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS) and the published Storybook
(https://uids.brand.uiowa.edu).

## Scope — what this system covers TODAY

**Foundations:** the full color + typography + spacing/layout token set (`tokens.css`),
the layout system (`layout.css` — containers, section rhythm, content grids), and the
background system (`backgrounds.css` — the `bg--*` bands and their text cascade).

**Components (20):**

- *Page furniture* — Brand Bar (`Brand Bar.dc.html`), Logo (`Logo.dc.html`),
  Brand Footer (`Brand Footer.dc.html`), Banner (`Banner.dc.html`).
- *Content* — Card (`Card.dc.html`), Headline (`Headline.dc.html`), Blockquote (`Blockquote.dc.html`),
  Callout (`Callout.dc.html`), Stat (`Stat.dc.html`), Table (`Table.dc.html`),
  Badge (`Badge.dc.html`), Alert (`Alert.dc.html`).
- *Actions* — Button (`Button.dc.html`), CTA (`CTA.dc.html`), Form (`Form.dc.html`).
- *Navigation* — Menu (`Menu.dc.html`), Tabs (`Tabs.dc.html`), Pager (`Pager.dc.html`),
  Breadcrumbs (`Breadcrumbs.dc.html`), Accordion (`Accordion.dc.html`).

**Starting point:** `Page Scaffold.dc.html` — the canonical page structure (Brand Bar →
sections → Brand Footer) wired to the tokens and layout classes. Start here for any page.

**Composition rules:** see [Rules](#rules) below. That section is generated from the
repo's `contracts/rules.json`, and `readme.md` — the file injected into every building
session — carries the same list from the same source. This summary used to restate them
by hand and drifted; it no longer does.

**NOT yet covered:** sliders, grid and showcase — plus the form patterns
beyond single controls (fieldset/side-legend grouping, flex/inline multi-column form
layouts). **Do not improvise Iowa-looking versions of missing components.** If a design
needs one, use a clearly-labeled neutral placeholder (see `.uids-placeholder` in the
scaffold) and tell the user the component hasn't been migrated into this system yet.
Honest gaps beat invented components.

**Static-only, by construction.** These templates carry no JavaScript and no native
interactive state. Tabs do not switch, accordions do not open on click, and the alert's
dismiss button does not dismiss — each exposes a prop that selects which state renders
instead. Font Awesome is not loadable in this view: `Alert.dc.html` inlines the glyph
SVGs, `Accordion.dc.html` uses a commented stand-in shape, and `Menu.dc.html` omits item
icons. Say which of these applies rather than presenting a template as interactive.

## Using these components in a project (read before building)

`<dc-import name="Brand Bar">` resolves a **sibling** `Brand Bar.dc.html` in the same
directory. It cannot reach across projects — so referencing these templates without
copying them first silently fails to render. Copy what you need into ONE directory of your
project:

1. **`copy_files`** (set `src_project_id` to this design system on each entry):
   - `Page Scaffold.dc.html` — start from it, then replace the content
   - the components you need — **and always `Logo.dc.html`**: both Brand Bar and Brand
     Footer `dc-import` it, so they render logo-less without it
   - `tokens.css`, `layout.css` **and** `backgrounds.css` (Headline links
     `./backgrounds.css` directly, so it needs that sibling even standalone)
2. **`create_support_js`** in that same directory (the `.dc.html` files load `./support.js`).
3. `<dc-import name="Brand Bar" siteName="…">` — now it resolves.

**Do not rewrite the templates' `./tokens.css` link.** Copying `tokens.css` beside them
makes it resolve as-is, and keeps your copies byte-identical to the design system — so a
later `copy_files` picks up token updates. Repointing the links forks the templates and
that update path is lost.

If a bound `_ds/<folder>/` exists in your project the platform also auto-links
`tokens.css` / `layout.css` / `backgrounds.css` from there; the copies are harmless
duplicates of the same values. A fresh project may have no `_ds/` folder at all — don't
depend on it.

## Rules

GENERATED from `contracts/rules.json` in the repo — the single source for these. Do not
edit them here; this list was previously maintained by hand and drifted (it carried "One
h1 per page — typically the Brand Bar's site name", which is the exact claim
`page-heading-structure` records as corrected for being wrong about production).

<!-- BEGIN GENERATED RULES — source contracts/rules.json, run node scripts/build-dc-rules.mjs -->

<!-- Do not edit these by hand: edit contracts/rules.json and re-run the generator. -->

1. **components-from-catalog** (judge) — Only use components, options, and option values
   that exist in the catalog. Never invent props, variants, or values not listed in a
   component's contract. If something needed is missing, report it as a contract proposal
   instead of improvising.
2. **tokens-only** (judge) — Every color, font family, font weight, and font size must come
   from a token in catalog/tokens.json. No raw hex values or ad-hoc type sizes where a token
   exists.
3. **semantic-tier-first** (judge) — Consume semantic-tier tokens (color/text,
   font/size/heading/h2) rather than primitives (color/black, font/size/750), except where a
   component contract explicitly binds a primitive.
4. **second-row-forces-narrow** (judge) — Brand Bar: when Show Second Row is on (code:
   second_row_content slot present), the top bar must use narrow styling (Figma: Style=Narrow).
   The code enforces this implicitly; designs must match.
5. **page-heading-structure** (agent) — A page has TWO h1 elements as-shipped, and that is
   deliberate to document, not a bug to design around: uids_base
   templates/uids/site-name.html.twig emits <h1 class="site-name"> in the Brand Bar, and
   templates/content/page-title.html.twig emits <h1 class="page-title headline--serif
   headline"> for the page title. Do NOT resolve the duplicate by demoting the page title. An
   earlier version of this rule claimed a page must have exactly one h1, and agents acting on
   it demoted the title to an h2 in the default Roboto treatment, losing the page-title type
   ramp entirely — that is the specific harm this wording exists to prevent. The duplicate is a
   real accessibility wrinkle in the platform, and fixing it is a SiteNow decision, not
   something a design may quietly do. Section headings below the page title are h2.
6. **contract-first-changes** (agent) — Never change a component's public shape (options,
   slots, tokens) in Figma or code directly. Propose the change in contracts/ first; Figma and
   code follow after review.
7. **no-planned-options** (judge) — Do not use options or option values marked status:
   planned or deprecated in a contract (e.g. Logo context=footer is planned, not available).
8. **badge-inline-only** (agent) — A badge is an INLINE pill that sits in the flow of text,
   immediately after the thing it labels — a list item, a table cell, a card meta line, a
   heading. It renders at ONE fixed size everywhere (0.75rem type, 9px inline padding, 12px
   radius): it does NOT scale with its surroundings, so never set a size on it and never
   compensate for its context. NEVER position a badge absolutely, float it, or mount it as a
   corner flag or ribbon on a card, callout or panel — src/scss/components/badge.scss contains
   no positioning of any kind, so a corner-mounted badge is invented, not design-system
   behaviour. A badge inside a heading is FINE as of 2026-08-20, when contracts/badge.json
   changes[0] fixed the font-size flex that made it look wrong: if you find an instruction
   anywhere saying never put a badge in a heading, it is SUPERSEDED, and so is the older
   instruction to put it there to flag a block.
9. **item-list-is-stacked-cards** (agent) — A list of items is stacked BORDERLESS cards, not
   hand-written markup. News listings, event listings, "related items" and search results all
   use the Card component with borderless set, stacked one per row (reference:
   https://sandbox.prod.drupal.uiowa.edu/news). Do not invent a <ul> with your own
   date/heading/summary CSS: it will not match production, and Card already supplies the title,
   subtitle, meta, body and link in the right proportions. Use a grid of BORDERED cards only
   for a set of parallel destinations, like a three-across "related programs" block.
10. **page-title-under-brand-bar** (agent) — Breadcrumbs and the page title go directly
   under the Brand Bar — before any banner, hero or content section — and both belong inside a
   page__container so they inherit the page's gutters. They are ONE unit: the breadcrumb
   supplies the space above (1.75rem top margin) and the title sits flush beneath it with no
   gap, by design. Putting them in a mid-page section, or after a banner, is wrong: the page
   title identifies the page and has to be the first thing under the navigation.
11. **backgrounds-by-class** (agent) — A background is applied by CLASS on a section
   wrapper: bg--{color}[--pattern--{type}], where color is black|gold|gray|white and type is
   brain|community|particle. Omitting the suffix entirely IS the no-pattern case. Two things
   you must never do. (1) Never reproduce a pattern with your own background-image, gradient or
   SVG: the eleven shipped assets are code-only files enumerated in contracts/background.json
   geometryNotTokenized.pattern-image-assets, and a hand-drawn approximation will not match
   production. (2) Never set opacity on a background or its pattern. There is NO CSS opacity
   anywhere in the shipped pattern system — strength is baked into the asset file itself, two
   different ways: the four brain SVGs declare one opacity each (0.15/0.2/0.7/0.15), while the
   community and particle PNGs fade per pixel, so any single opacity number quoted for those is
   a PEAK, not a level. No checker in any of the five views can ever verify this — the pattern
   layer is an image fill and a Figma variable is COLOR/FLOAT/STRING/BOOLEAN — so it is
   enforced by instruction here and in the Figma set description, and deliberately NOT by a
   checker that would appear to cover it.
12. **banner-led-page-is-a-composition** (agent) — A banner-led page is a COMPOSITION you
   assemble, not a component to ask for. The featured-image banner IS the pattern: breadcrumbs
   and the page title sit INSIDE the banner content area, and the section wrapper carries the
   Layout Builder classes layout--title and layout--title--with-background. Those wrapper
   classes are a downstream uids_base LAYOUT and are deliberately not Banner's —
   contracts/banner.json knownIssues records exactly that — and the component set is CLOSED. So
   compose the page from Banner + Breadcrumbs + the page-title markup; do NOT invent a hero
   component, and do not propose one. The title-suppressed variant is layout--title--hidden,
   and it is worth knowing what it really does: it zeroes the section padding AND makes the
   breadcrumb element-invisible (still focus-revealable, still announced) rather than deleting
   either.
13. **top-nav-on-every-page** (agent) — Every page gets navigation: the Brand Bar plus a
   Menu with variant horizontal across the top, and a vertical Menu for a sidebar or section
   nav. Reference stories are components-menu--horizontal-menu and
   components-menu--vertical-menu. Two honest limits to design around. (1) The horizontal menu
   is CONTAINER-gated, not viewport-gated: .menu--horizontal wraps its whole rule set in
   container-query() (src/scss/components/menu.scss:127), whose shared default is $break-sm
   (src/scss/abstracts/_breakpoints.scss:52, $break-sm: 768px at
   src/scss/abstracts/_variables.scss:94), so in a container narrower than 768px it renders
   stacked, silently. (2) THERE ARE NO DROPDOWNS: .menu--horizontal > li ul sets display: none
   (menu.scss:145-147), carrying the source's own @todo about doing hover menus without
   breaking WCAG 2.1 content-on-hover-or-focus. uiowa.edu's real dropdown primary nav is not in
   UIDS at all — do not hand-build one to fill the gap; note it to the user instead.
14. **section-rhythm** (agent) — One component per section. Stacking several components
   inside one .layout__container is not a designed experience — the design system has no
   opinion about how they space against each other, so you end up hand-setting margins, which
   is the thing this rule exists to prevent. Separation between sections comes from the
   section's own padding: the base is layout/section/padding/default (3rem) and the generous
   step is layout/section/padding/extra ({space.600} = 6rem, tokens/semantic/layout.json:17),
   opted into PER SECTION with the section-padding__top-extra / __bottom-extra classes. THE
   MERGE RULE IS THE PART PEOPLE GET WRONG: claude-design/layout.css zeroes padding-top between
   adjacent same-background siblings (the :not([class*="bg-"]) pair plus the explicit bg--gold
   / bg--black / bg--gray pairs), reproducing production parity from uids_base global.scss. So
   two adjacent default-padded white sections give 48px of total separation, never 96 — the
   second section contributes nothing. Do not add a margin to make up the difference; opt the
   section that needs more room into extra.
15. **alert-spacing** (agent) — An Alert brings its own internal spacing from tokens and
   needs none from you: alert/padding sets a uniform edge padding on all four sides
   (src/scss/components/alert.scss:9) and alert/icon-gap sets the gap between the icon block
   and the body (alert.scss:43). Never hand-set padding inside an Alert, and never restyle its
   interior to make a message fit — shorten the message. The space AROUND an Alert is the
   SECTION's job, not the Alert's: give it its own section.layout__container > .page__container
   and let section-rhythm supply the separation, exactly as any other one-component section. A
   bare margin on the Alert to push the next block away is the failure mode; it survives until
   someone changes the section padding and then it is double-counted.
16. **underline-scope** (agent) — The gold underline (headline--underline) marks the FIRST
   heading of a content or text area, and nothing else. Do not put it over a stat row, a card
   grid, or any set of parallel tiles: the bar reads as "prose follows", so repeating it across
   every section flattens the hierarchy it exists to create — if every heading is emphasised,
   none is. One mechanical consequence matters elsewhere: @mixin headline-underline sets
   overflow: auto (src/scss/abstracts/_headline-mixins.scss:85) so the bar clears its heading,
   which makes that heading a block formatting context. See callout-is-a-float for what that
   costs when a float is loose on the page.
17. **no-heading-over-self-evident-content** (agent) — Content that states its own meaning
   does not need a heading over it. A stat row is the clearest case: every stat already carries
   its own label and summary, so a "By the Numbers" heading above it adds no information and
   introduces a spacing imbalance — the heading's own margin stacks onto the section's top
   padding while the bottom keeps only the padding, so the block sits visibly low in its own
   band. Prefer no heading. If a section genuinely seems to need naming, that is usually
   evidence the content is not self-evident and should be rewritten, not labelled.
18. **cta-is-always-narrow** (agent) — A CTA's text must never run the full page width. This
   is a NEW CONSTRAINT, not a bug fix, and the distinction matters: max-width does not appear
   anywhere in src/scss/components/cta.scss (zero occurrences, verified 2026-08-24), so nothing
   in code enforces it and a CTA dropped into a full-width container will happily span it.
   Recorded as a decision in contracts/cta.json changes[]. The composition needs no code
   change: put the band on the section (section.layout__container.bg--gold), cap the measure
   with div.page__container--narrow inside it, and give the CTA background="" so it does not
   paint a second band inside the first.
19. **callout-is-a-float** (agent) — A Callout is a FLOATED inline element, not a section
   band. contracts/callout.json's inline_alignment option defaults to "left", which emits
   .inline--align-left { float: left; clear: left } (src/scss/components/_inline.scss:117) —
   as-shipped, not a bug. Used as a full-width band it escapes its section, and the damage
   lands on the NEXT section rather than on the Callout: because headline--underline carries
   overflow: auto, a block formatting context (src/scss/abstracts/_headline-mixins.scss:85),
   the following section's heading shrink-wraps beside the still-floating Callout instead of
   clearing it — measured 122.5px wide at x=1123 inside a 1245px container. It reads as a
   heading bug rather than a Callout one, which is why it took a measurement to find. To band a
   section, put a background class on the section wrapper (see backgrounds-by-class). Use a
   Callout for what it is: a short aside floated beside prose.
20. **pre-title-is-not-a-category** (agent) — A Card's pre_title is a CONTEXTUAL LABEL —
   "Pinned", "Featured", "Applications close Friday" — not a taxonomy term. Do not tag every
   item in a listing with its section ("Research", "Students", "Faculty"): the pre-title
   renders deliberately quiet, at card/pre-title/font-size 0.75rem with card/pre-title/opacity
   0.7, and a full column of them turns that quiet into noise while implying a filterable
   taxonomy the component does not provide. Reference:
   https://sandbox.prod.drupal.uiowa.edu/news. The icon slot beside it follows the same logic —
   an icon marks an exception, not a type, so do not give every card one.
21. **heading-alignment-follows-content** (agent) — A heading takes the alignment of the
   content it introduces; alignment follows the layout rather than being a separate styling
   choice. Centred content gets a centred heading — a centred CTA, a centred stat row, a single
   pull-quote — and a card grid or row of parallel tiles reads better with one, because the
   heading spans several columns and left-aligning it over a symmetrical grid puts the weight
   in one corner. Left-aligned prose keeps a left-aligned heading: never centre a heading over
   body copy, and never centre one just to break up a page. Set it ON THE HEADING
   (alignment="center", contracts/headline.json), not by centring the wrapper — with underline
   on, the gold bar is a display: block pseudo-element with zero side margins, so a wrapper
   text-align centres the text and leaves the bar hard left under the first word
   (src/scss/components/_headline.scss:23 supplies the text-align; the bar gets margin-inline
   auto only from src/scss/abstracts/_headline-mixins.scss:96). There is no left or right
   value: the default INHERITS, so a heading in a left-aligned container is already
   left-aligned, and forcing one against its container grain is deliberately impossible — if
   you want that, the container is wrong. Do not mix alignments within one section.

<!-- END GENERATED RULES -->

`readme.md` also documents one rule specific to this view — do not declare bare element
styles in your own page — which is deliberately not in `rules.json` because it describes
`dc-import`'s shared cascade rather than a property of the design system.

## Typography

Body: Roboto 400, `var(--uiowa-font-size-body)` (1.2rem), line-height 1.7.
Headings: Roboto 500, sizes `var(--uiowa-font-size-heading-h1 … h6)` (h1 is Zilla Slab 600).
Serif display variants: Zilla Slab via `--uiowa-font-size-heading-serif-h2 … h6`.
Intros: `--uiowa-font-size-intro-bold` (Zilla Slab 600, lh 1.3) and `-light` (Roboto 300, lh 1.4).
Heading sizes are fluid clamps (600→1310px viewport) — they respond automatically.

## Color

Brand: gold `--uiowa-color-brand` (#FFCD00) + black. Text `--uiowa-color-text`,
background `--uiowa-color-background`, links `--uiowa-color-link` (#00558C).
Gold is a background/accent color; text on gold is black. Text on black is white or
`--uiowa-color-gray-175`; links on black are gold. Status colors:
`--uiowa-color-status-{success,info,warning,danger}`.

## Layout & spacing

The authoring model, outermost-in — decide each layer before the next:

1. **Container** (`.page__container` + modifier) — outer width and page margin.
   Standard caps at `--uiowa-layout-container-max-standard` (81.875em / 1310px) centered;
   `--narrow` caps at 63.75em from 980px; `--extended` caps at 100em with 1.875rem side
   padding; `--full` is viewport-wide with margins; `--edge` touches the viewport edges.
2. **Section rhythm** (`.layout__container`) — vertical padding
   `--uiowa-layout-section-padding-mobile` (1.25rem) stepping to `-default` (3rem) **at
   768px, not 980px**. The first section drops its top padding; adjacent sections with the
   same background (`.bg--gold` / `.bg--black` / `.bg--gray` / none) merge into one band.
   Modifiers: `section-padding__removed-top/-bottom`, `__top-extra`/`__bottom-extra`
   (6rem), `__top-restored` (top only — no bottom restore exists).
3. **Content grids** (`.list-container--grid` + `grid--twocol--50-50` /
   `grid--threecol--33-34-33` / `grid--fourcol--25` / `grid--twocol--25-75`, items inside
   `.list-container__inner`) — repeated content like cards and feeds. Non-grid lists
   stack at 2rem.
4. **Everything else** uses the spacing scale directly: `--uiowa-space-{50,100,125,150,
   200,300,600,800}` (step = rem × 100; `space-105/110/160` exist but are legacy oddballs
   — prefer the round steps for new work). Never hardcode margins/paddings/gaps.

Multi-column *section* layouts (50/50, 33/67, sidebar…) exist in production but are not
shipped in `layout.css` yet — use a content grid for columnar repeated content, or a
one-off grid with `gap: var(--uiowa-layout-gutter-width-desktop)` for a two-region split,
and note the gap to the user. Breakpoints: 768 (rhythm), 980 (layout ratios, bar goes
gold), 1350 (containers cap).

## Backgrounds

`backgrounds.css` ships the production background system: sixteen classes on the grammar
`bg--{color}[--pattern--{type}]` with colors `black | gold | gray | white` and patterns
`brain | community | particle` (no class at all = the page-default white, which is NOT
the same as `bg--white` — an explicit white band participates in the border/link rules).

Put the class on the section (`<section class="layout__container bg--black">`). It sets
the fill AND the foreground cascade — black is the one dark background (white text, gold
links); gold, gray and white set black text. Components inside adapt on their own (e.g.
Headline's highlight and underline flip on gold). **Never restyle text to compensate for
a band** — if text looks wrong inside one, the markup is wrong, not the colors.

Three honesty notes:

1. **Pattern textures are not shipped in this view.** In production each pattern class
   layers a texture image (the brain circuit, the community photo-collage, the particle
   field) over the color; here the twelve pattern classes render as their base color
   band. The classes are still correct to use — the texture appears in production — but
   don't fake one with gradients or drawings, and tell the user the preview is
   texture-less.
2. Background fills ride the brand channels (`--brand-primary`/`--brand-secondary`), so
   a site's grayscale/retheme override reaches every band automatically. Don't bind a
   band to a raw hex.
3. Adjacent sections merge their shared padding only for exact `bg--gold` / `bg--black`
   / `bg--gray` (and unclassed) pairs — pattern variants and `bg--white` do NOT merge.
   That mirrors the production front-end as shipped (a known quirk, documented in the
   repo contract), not an oversight here.

## Components

**Brand Bar** — the required page header on every University of Iowa page. Props:
Narrow (bool), Healthcare (bool), Show Site Name + Site Name, Show Parent Title + Parent
Title, Show Second Row. Black bar below 980px, gold at 980px+; the logo tab hangs below
the bar at 1350px+. When Show Second Row is on, the top bar must be narrow (enforced in
the template, mirroring production code). Parent-title pattern: turning Show Parent Title
on puts the parent title beside the logo and moves the site h1 into the white second row
(also forcing narrow) — the top bar never shows a parent title and site name side by side.
**Requires `Logo.dc.html` as a sibling.**

**Logo** — the IOWA / IOWA Health Care lockup. Props: lockup (iowa | healthcare), context
(header = black tab, footer = transparent). Never recolor, redraw, or distort the lockup.

**Brand Footer** — the required page footer: black band, footer logo, site name (Roboto
900 white), optional parent title and contact block (address, phone, email with icons),
socket menu (© year + Privacy / Nondiscrimination / Accessibility — fixed links, do not
edit them). Props: Healthcare, Show Site Name + Site Name, Show Parent Title + Parent
Title, Show Contact + Contact/Phone/Email. **Requires `Logo.dc.html` as a sibling.**

**Button** — the `.bttn` call to action, rendered as a link. Props: label, url, color
(primary = gold fill / secondary = black fill / tertiary = white fill), size (small |
medium | large), and the booleans icon, transparent, light_font, borderless, full. No
sibling imports needed.

Buttons are UPPERCASE Antonio 300 — that is deliberate, not a mistake: Antonio ships only
100/300/700, so the weight the browser has always rendered is 300. `light_font` swaps to
Roboto 400 at a smaller size but **stays uppercase**.

Two overrides that surprise people, both inherited from the production stylesheet's order:
`transparent` beats the colorway (you get a transparent background whatever `color` says),
and `light_font` beats `size` (it sets font-size AND padding). The medium size emits an
intentionally unstyled `.bttn--medium` class — the base `.bttn` already holds the medium
values.

An empty `label` produces an icon-only button (`.bttn--no-text`), which has **no accessible
name**. Give buttons visible text unless the surrounding markup names them.

**Form** — one labeled native control per import. Props: control (input | textarea |
select | select-multiple | file | checkbox | radio | toggle), label, value, description
(help text below the control), and the booleans required (red asterisk), error, disabled,
large, compact. No sibling imports needed. Stack imports to build a form — each carries
its own `.form` scope, and the item margins compose correctly.

The single-line text field is `input`, not `text` — `contracts/form.json` is authoritative
on the control axis and names it that (the `type="text"` in the emitted markup is the HTML
attribute, not the option). `Form.dc.html` has no `text` arm, and an unmatched value fails
SILENTLY: the label arm still renders, so you get a labeled form item with no control
under it.

The styling rides the same two-layer custom-property system as production: `.form`
declares `--form-*` from the generated tokens, and modifiers (`large`, `compact`, error,
focus) retheme those properties rather than restyling elements. Labels are 1rem bold
black; inputs sit on a near-white `#FAFAFB` field, 2.9rem tall, with a 1px gray outline
and an inset shadow. Keyboard users get real focus styles from the stylesheet — nothing
to configure. A `disabled` control uses a dc-only `.is-disabled` class that carries
production's `:disabled` declarations verbatim (the dc runtime can't set the attribute
from a prop).

Three honesty notes: the select arrow's gray is baked into an SVG data-URI in production
(not a token) and is reproduced verbatim; the toggle's ON/OFF lettering is a load-bearing
CSS word-spacing trick copied exactly (don't "clean it up"); and `error` only recolors —
put the actual reason in `description` or the error is invisible to screen readers.

**Headline** — the `.headline` heading component. Props: text, level (h1…h6, default h2),
text_style (default | serif | uppercase), alignment (default | center), and the booleans
underline and highlight. Requires `backgrounds.css` as a sibling (its helmet links it for
the on-gold context rules).

Pick `level` by document outline, not by size — nothing stops an h1 inside an h4 context,
so that correctness is on you. A UIDS page already has TWO h1s as-shipped (the Brand Bar's
site name and the page title), so a Headline in your content is a SECTION heading: h2 or
lower. Do not add a third h1, and do not demote the page title to reconcile the pair — see
`page-heading-structure` in the Rules section.
`serif` is Zilla Slab bold at the serif type ramp; `uppercase` is Antonio bold,
transformed by CSS — author natural case ("Our research", not "OUR RESEARCH") so screen
readers pronounce it correctly. `underline` draws the 75px gold bar under the heading
(h5/h6 get a proportionally shorter bar); `highlight` puts the gold band behind the text,
wrapping cleanly across lines.

`alignment` is `default` or `center`, and `default` INHERITS — it emits no class, so the
heading takes whatever alignment its container gives it. Reach for `center` only when the
content the heading introduces is itself centered (see `heading-alignment-follows-content`
in Rules). Set it on the Headline rather than centering the wrapper: with `underline` on,
the gold bar is a `display: block` pseudo-element with zero side margins, so a wrapper's
`text-align` centers the text and leaves the bar hard left under the first word. There is
deliberately no left or right value — a heading in a left-aligned container is already
left-aligned, and if you need to fight the container, the container is wrong.

Context does the color work: inside a `bg--gold` band the highlight flips to black-on-
white text, the underline bar goes gray, and uppercase weight drops — automatically, from
the ancestor class. The `preview_on_gold` prop only simulates that ancestor in the
component editor; in a page, put the import inside the gold section instead of setting
it. On any `bg--*` band, links inside the headline inherit the band's color by design.

Two Vue-parity notes: the real component's `text_style` default is the empty string
(this editor labels it `default` — both mean "no extra class"); and word-level
highlights (one gold word inside a longer plain headline) exist in production via
authored inner markup that this template's plain-text `text` prop cannot express —
report that as a gap rather than improvising nested markup.

**CTA** — the call-to-action band. Props: title, details, button_label, url, button_icon,
orientation (centered | left | inline), background (default | black | gold | gray | white),
button_align_right. **Requires `Headline.dc.html` AND `Button.dc.html` as siblings** — it
imports both real components rather than restyling their markup, so a missing sibling
leaves the band empty. The title is always an h2 in the uppercase treatment; change the
title's look on the nested Headline, not through a CTA prop.

One behavior to know, because it looks like a bug and isn't: on a **gold** background the
button flips to black-with-white-text (the secondary colorway); on every other background
it is gold. That is what production renders — the flip comes from the platform theme's own
override, not from a choice made here. Do not "correct" it back to gold.

**Stat** — a large number with supporting copy. Props: stat_title, stat_summary,
stat_content, stat_prefix, stat_suffix, display (default | horizontal), background,
stat_hover. With `stat_hover` on (the default) the supporting content is collapsed at rest
above 980px and expands on hover — production behavior, not breakage. Set it false for the
always-open `.stat--static` rendering. On a gold background the horizontal layout's content
border is black while the title divider is white; those are two different tokens.

**Table** — a data table. Props: caption, summary, sticky, border, highlight. `sticky` pins
the header while the body scrolls; `border` adds gridlines; `highlight` is a `:hover` row
tint, so it only shows on hover, exactly as in production. Write real `<th>` column headers
— that is what carries the accessibility, not the visual styling.

**Alert** — a status message. Props: type (info | success | warning | danger), heading,
heading_level (h2…h6), body, icon, dismissible, centered, vertically_centered. The dismiss
button renders but does not dismiss; the dismissal behavior lives in the platform, not in
this component. `warning` and `danger` ship the same icon color upstream — reproduced
as-is, not a mistake here.

**Badge** — a small status pill. Props: text, type (primary | secondary | cool-gray | blue
| green | orange). It renders at **ONE fixed size everywhere** — 0.75rem type, 9px inline
padding, 12px radius — and does NOT scale with its surroundings, so never set a size on it
and never compensate for its context. Place it inline, in the flow of the text it labels.
It *used* to size itself as a percentage of the surrounding text; that was changed at
source on 2026-08-20 (contracts/badge.json `changes[0]`), which is why older guidance
banned badges from headings and this one does not — see `badge-inline-only` in Rules.
Only `primary` sets a text color (black); the other five declare a background only and
inherit the base white text.

**Banner** — a full-bleed hero. Props: fill (media | black | gold | gray | white),
overlay_direction (none | btt | ttb | ltr), overlay_light, height (none | medium | large),
narrow, horizontal_alignment, vertical_alignment, mobile_content_below_image, pre_title,
headline, body_text, button_label. The fill is the component's central rule: a banner is
EITHER an image with a tinted scrim over it OR a coloured band, never both, and four
`:not([class*="bg--"])` guards in the CSS make that real rather than conventional — a
background class silently switches off the overlay, the stacked mobile treatment and the
failsafe fill. The overlay is two independent choices: direction is the gradient's angle
(none leaves a flat 50% scrim), light inverts it to white at 70% and flips every
foreground to black. Height is an aspect ratio applied as a minimum, so a tall stack of
content simply overflows it. The image is a labelled placeholder here; supply a real one
in production and tell the user it is a placeholder.

**Callout** — a boxed aside. Props: heading, body_text, background (none | black | gold |
gray | white), inline_size (none | small | medium | large), inline_alignment (none | left |
center | right). Sized and aligned callouts float beside body copy; a full-width callout
should use `inline_size="none"`.

**Blockquote** — a pull quote. Props: content, footer, cite_text, orientation (left |
center | right), media (none | above | below), background. Orientation is pure CSS — the
markup is identical; what changes the DOM is the media position (above sits before the
quote, below sits inside the footer). The portrait is a neutral placeholder in this view:
supply a real image in production and tell the user it is a placeholder.

**Menu** — site navigation. Props: variant (horizontal | vertical), label, item_1…item_4,
child_1…child_3, active_item, container_border. The active indicator is **gray**; gold is
the hover state — they are not interchangeable, and gray is what ships. A horizontal menu
needs at least 768px of container width or it renders vertically, submenus included (also
as-shipped). Item icons are not carried in this view.

**Tabs** — a tablist with panels. Props: id, aria_label, selected (1 | 2 | 3), tab_1…tab_3,
panel_1…panel_3. Tab switching is JavaScript in production; here `selected` chooses which
tab renders active and which panel is visible. Clicking does nothing — say so rather than
demoing it as interactive.

**Pager** — pagination. Props: active_page, heading_id. The ellipsis renders unpadded
because the markup and the stylesheet disagree upstream; that quirk is reproduced
deliberately and should not be patched here.

**Breadcrumbs** — the breadcrumb trail. Props: crumb_1…crumb_3 text/url pairs,
current_page, heading_id. Blanking a crumb's URL renders it as plain text, which is how a
parent with no link appears. The final crumb is always plain text and carries no
`aria-current` — as-shipped upstream.

**Accordion** — expandable items. Props: label_color (gray | white), open, multiselectable,
title_1…title_4, content_1…content_4. It will not open on click; `open` selects which state
the first item renders in. The chevron is a commented stand-in shape rather than the real
Font Awesome glyph, which this view cannot load — mention that if icon fidelity matters.

## Page anatomy

A standard page = Brand Bar (top) → sections (each
`<section class="layout__container"><div class="page__container">…</div></section>`,
white background unless a `.bg--*` band) → Brand Footer (bottom). Container max-width is
1310px, centered. `Page Scaffold.dc.html` is this structure, ready to copy.
