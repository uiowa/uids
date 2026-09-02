# Iowa Design System (UIDS 4.x)

A generated view of the University of Iowa Design System. The source of truth is the
`uiowa/uids` repository (`tokens/` + `contracts/`); the files here are synced from it by
a Claude Code session — do not hand-edit them.

## Using these components — copy before you import (do this first)

`<dc-import name="Brand Bar">` resolves a **sibling** `Brand Bar.dc.html` in the same
directory. It cannot reach across projects, and a missing sibling renders **nothing** with
no error — so copy the files you need into ONE directory of your project before importing:

1. `copy_files` with `src_project_id` = `a371c390-7071-4ac7-a122-87440610e63a` on each entry:
   - `Page Scaffold.dc.html` — the canonical page structure; start here
   - whichever components you need (see Index below)
   - `Logo.dc.html` — **always**: Brand Bar and Brand Footer both `dc-import` it
   - `Headline.dc.html` **and** `Button.dc.html` if you use `CTA.dc.html`,
     `Banner.dc.html` or `Card.dc.html` — all three import both
   - `tokens.css`, `layout.css` **and** `backgrounds.css` (several templates link
     `./backgrounds.css` directly, so they need that sibling even standalone)
   - `assets/` (ONE recursive entry) if the page uses any `bg--*--pattern--*` class or a
     pattern banner fill — the texture files (all brain patterns + both files Banner's
     fills need; five heavy community/particle PNGs are deferred and render color-only)
2. `create_support_js` in that same directory (every `.dc.html` loads `./support.js`).
3. Then `<dc-import name="Brand Bar" siteName="…"></dc-import>` resolves.

**Do not rewrite the templates' `./tokens.css` link.** Copying `tokens.css` beside them
makes it resolve as-is and keeps your copies byte-identical to this system, so a later
`copy_files` picks up token updates. Repointing the links forks the templates and loses
that path.

**Never hand-edit `tokens.css`, and never add a token to it.** It is generated from
`tokens/` in the repo. **If a token you expect is missing, your copy is STALE — re-run
`copy_files` for `tokens.css` from this system.** Do not derive the value yourself: the
real values come from the source of truth and a plausible-looking guess will be wrong
(this has happened — a session invented button tokens at weight 700 when the real value is
300, plus wrong sizes, padding and icon colors). Any token you add is also silently
discarded the next time `tokens.css` is re-copied. Same rule for `layout.css` and
`backgrounds.css`. If re-copying does not produce the token, stop and report the gap to
the user rather than inventing a value.

If `copy_files` returns not-found, your access is binding-only — tell the user to open this
design system or refresh it from the project's design-systems panel.

## What this view cannot do

These templates are static. Anything driven by JavaScript or native browser state is
represented by a **prop that selects which state renders**, not by real interaction:

- `Tabs.dc.html` SWITCHES — the one interactive template (a CSS radio affordance;
  `selected` picks the initial tab; mouse and arrow keys both work).
- `Accordion.dc.html` will not open on click — set `open`.
- `Alert.dc.html`'s dismiss button does nothing — it renders, it does not dismiss.
- `Table.dc.html`'s row highlight is `:hover`-only, as in production.

Font Awesome is not loadable here. Components that ship FA glyphs either inline the SVG
(`Alert.dc.html`) or use a clearly-commented stand-in shape (`Accordion.dc.html`), and
some icon slots are omitted entirely (`Menu.dc.html`). **Never present these as
interactive or icon-complete to the user** — say what is standing in.

## Composition rules — read these before building a page

A real consuming page got each of these wrong in 2026-08, producing output that looked
plausible and was wrong.

The numbered rules below are GENERATED from `contracts/rules.json` in the repo, which is
the single source. They used to be maintained here by hand as well, and the copies drifted
into contradicting each other — this list said "never put a Badge inside a heading" while
the repo's own rule said to put it there. Do not edit them here.

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
   title identifies the page and has to be the first thing under the navigation. That unit also
   gets a section to itself — see page-title-is-its-own-section for the class it carries and
   why nothing else may share it.
11. **page-title-is-its-own-section** (agent) — The page title gets its OWN section and
   shares it with nothing but the breadcrumb: <section class="layout__container layout--title">
   wrapping a page__container that holds the Breadcrumbs import and the <h1 class="page-title
   headline headline--serif">, and then the first content section starts a NEW
   layout__container. layout--title drops that section's padding-bottom from 3rem to 1.25rem
   (src/scss/abstracts/_section-rhythm.scss:57), and that 20px is meant to be the gap between
   the TITLE and the content below it — measured on
   https://sandbox.prod.drupal.uiowa.edu/test-directory, where the title section computes
   padding-bottom 20px and the content section below it computes padding-top 0. Put an intro, a
   section heading or a button in with the title and the 20px lands under YOUR CONTENT instead:
   the title-to-content gap collapses to whatever the two elements' own margins give, and the
   content then ends 20px above the next section rather than 48px. Both arrangements compute
   the same two boxes (0/20px then 0/48px at 1200px) — the numbers stay right and start
   measuring the wrong edges, which is why no checker can catch it for you. A second rule,
   `.layout--title + .layout__container:not([class*="bg-"])`, zeroes the following section's
   padding-top; for a plain title section the adjacent-same-background merge already did that,
   and it earns its keep when the title section carries a bg--* class, where the merge does not
   apply. Downstream the class is DETECTED, not authored — uids_base.theme:797 adds it to the
   Layout Builder header section holding the page-title field block. The suppressed variant is
   layout--title--hidden: it zeroes BOTH of its own paddings and restores the next section's
   3rem top. One structural precondition, and it is easy to miss: put every layout__container
   inside ONE wrapper of its own, with the Brand Bar and the nav OUTSIDE it. Production uses
   <div class="node__content">, which holds sections and nothing else, and Page
   Scaffold.dc.html uses <main>. This matters because layout.css zeroes the top padding of
   `.layout__container:first-child`, and that is what starts a page flush under the navigation.
   Leave the sections as siblings of the Brand Bar and that selector never matches, so the
   title section adds 48px above the breadcrumb that no real page has — measured 77px against
   production's 28px, where the 28px is the breadcrumb's own 1.75rem margin-top
   (src/scss/components/breadcrumbs.scss:63-64) and nothing else.
12. **backgrounds-by-class** (agent) — A background is applied by CLASS on a section
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
13. **banner-led-page-is-a-composition** (agent) — A banner-led page is a COMPOSITION you
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
14. **column-container-around-components** (agent) — Every component that has a responsive
   layout goes inside a <div class="column-container">. UIDS gates a component's own layout
   switches on a CONTAINER query, not a viewport one — utilities.container-query() compiles to
   `@container column (min-width: 768px)` — and the only selectors that establish that
   container are .grid__column, .column-container and .layout-container
   (src/scss/layout/_grid.scss). A .page__container is NOT one, and neither is a bare
   <section>. Without a host the query never resolves and the component renders its fallback
   with NO error and NO warning, which is why this rule exists rather than a checker. Three
   components are affected, all measured at 1440px host vs no host: a horizontal Menu renders
   stacked with every submenu open, 363px instead of 57px (menu.scss:127); a Card with
   orientation left or right renders stacked, 963px instead of 419px (card.scss:367); and a
   Banner's content loses its width cap, running the full viewport bleed instead of capping at
   1310px in line with the page container (banner.scss:129-131). Every view except a
   hand-composed page hides this: production gets the class from a Layout Builder region,
   UIDS's own stories wrap their subjects in it, and each .dc.html template in this view bakes
   its own host in — so the preview looks correct whether or not you write it, and the omission
   only surfaces once the markup is ported. Put it inside the section's page__container,
   wrapping the components. A content grid does not need one: the .grid__column around each
   item already is a host.
15. **top-nav-on-every-page** (agent) — Every page gets navigation: the Brand Bar plus a
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
16. **section-rhythm** (agent) — One component per section. Stacking several components
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
   section that needs more room into extra. AMENDED 2026-09-02 with the ONE carved-out
   composition: a section heading, its deck and the content they introduce share one section —
   which is what section-heading-gets-a-deck and centred-heading-goes-narrow already prescribe
   — and the design system owner ruled the system owns that composition's internal spacing
   rather than splitting heading and content into separate sections (same-background sections
   merge, so a split spends section machinery to produce a 48px gap where the composition wants
   2rem). The named spacing: the grid — or the second container, where the heading block takes
   its own narrow one — gets margin-top: var(--uiowa-space-200), the value the Biochemistry
   parity story established, applied through a page-scoped class. NOTHING else inside the
   section carries a margin. The Well-Being page is the case this closes: five grids hand-set
   at 1.5rem plus a 1.75rem row, each its own invented number, because no value was named.
17. **alert-spacing** (agent) — An Alert brings its own internal spacing from tokens and
   needs none from you: alert/padding sets a uniform edge padding on all four sides
   (src/scss/components/alert.scss:9) and alert/icon-gap sets the gap between the icon block
   and the body (alert.scss:43). Never hand-set padding inside an Alert, and never restyle its
   interior to make a message fit — shorten the message. The space AROUND an Alert is the
   SECTION's job, not the Alert's: give it its own section.layout__container > .page__container
   and let section-rhythm supply the separation, exactly as any other one-component section. A
   bare margin on the Alert to push the next block away is the failure mode; it survives until
   someone changes the section padding and then it is double-counted.
18. **underline-scope** (agent) — The gold underline (headline--underline) marks the FIRST
   heading of each SECTION BAND — one per section, not one per page. AMENDED 2026-09-01,
   reversing this rule's previous position: it used to read "the first heading of a content or
   text area, and nothing else" and named a card grid and "any set of parallel tiles" as cases
   to avoid, which meant a correctly-built page carried the underline once and every other
   section heading read as a lesser thing. The design system owner ruled for per-site
   consistency instead — a site picks one heading treatment (sans, bold serif, bold serif
   underlined) and uses it across the components that offer the choice, so the underline is the
   site's section-heading style rather than a scarce emphasis marker. What survives the
   amendment is the anti-flattening intent, moved down one level: never underline a SUB-heading
   inside a section, because that is where repeating the bar genuinely does flatten a
   hierarchy. A stat row stays excluded, but not because of the underline — per
   no-heading-over-self-evident-content a stat row should carry no heading at all, so the
   question never arises. One mechanical consequence matters elsewhere: @mixin
   headline-underline sets overflow: auto (src/scss/abstracts/_headline-mixins.scss:85) so the
   bar clears its heading, which makes that heading a block formatting context. See
   callout-is-a-float for what that costs when a float is loose on the page.
19. **no-heading-over-self-evident-content** (agent) — Content that states its own meaning
   does not need a heading over it. A stat row is the clearest case: every stat already carries
   its own label and summary, so a "By the Numbers" heading above it adds no information and
   introduces a spacing imbalance — the heading's own margin stacks onto the section's top
   padding while the bottom keeps only the padding, so the block sits visibly low in its own
   band. Prefer no heading. If a section genuinely seems to need naming, that is usually
   evidence the content is not self-evident and should be rewritten, not labelled.
20. **container-width-by-content** (agent) — Pick the section container from what is INSIDE
   it, not by habit. page__container--narrow caps the measure at 1020px from 980px up, and it
   is for a SINGLE thing that reads better when it is not spanning the page: a block of body
   copy, a CTA, a Blockquote, an Accordion, a Tabs set, or one component that simply looks
   better narrow. Anything with COLUMNS takes the standard page__container — a content grid of
   cards, a row of Stats, any grid--* ratio. Measured at 1440px, a three-across grid gives
   405px columns in the standard container and 308px in the narrow one, and at 308px a card's
   title starts wrapping to three lines while its button drops onto its own row. The narrow
   container is a reading measure; a grid is a layout, and squeezing one into the other costs
   you a quarter of every column. See cta-is-always-narrow for the one component that is narrow
   by rule rather than by judgement.
21. **centred-heading-goes-narrow** (agent) — A centred heading and its deck go in their OWN
   narrow container, separate from the content they introduce. Centring only reads as centring
   when the line is short enough for the eye to take the whole measure at once; at the standard
   container the line simply runs the full page and the emphasis is lost. Measured at 1440px on
   a real intro line: 92 characters on ONE 1285px line in the standard container, against 46
   characters over two lines at 1020px narrow — a comfortable measure is roughly 45-75, so the
   standard container is about double it. The composition is TWO containers inside ONE section:
   <div class="page__container page__container--narrow"> holding the Headline
   (alignment="center") and its deck (body copy — section-heading-gets-a-deck records the
   treatment), then a second <div class="page__container"> holding the grid or cards below. The
   heading block and the content it introduces deliberately do not share a container — that is
   what lets each take the width it needs, and it is the one place container-width-by-content's
   two halves both apply inside a single section. This does not change when to centre in the
   first place: that is heading-alignment-follows-content, and a card grid or a stat row is
   exactly the case it says to centre over. A LEFT-aligned heading needs none of this — it
   starts at the same gutter as the content under it, so it shares the content's container.
22. **stats-come-in-threes** (agent) — Stats come in THREES, in a grid. A Stat is a
   comparison object — the number only means something next to other numbers — so put three
   across in a list-container--grid grid--threecol--33-34-33, in a STANDARD page__container
   (see container-width-by-content), and give each one a stat_title, a stat_summary and enough
   stat_content to earn its column. A lone Stat centred in a band is the failure mode to avoid:
   it reads as a pull-quote that lost its attribution, and the eye has nothing to compare it
   against. Two is acceptable when there are genuinely only two figures; one is not. If you
   have only one number worth showing, it belongs in body copy or in a Callout, not in a Stat
   band of its own.
23. **alternate-section-backgrounds** (agent) — Alternate section backgrounds down the page.
   A run of four or five default (white) sections reads as one undifferentiated column no
   matter how well each section is composed, because the ONLY thing separating them is 3rem of
   padding — and per section-rhythm, adjacent sections sharing a background merge, so two white
   sections in a row give one section's worth of separation, not two. Break a long page into
   bands: white, gray, white, or white, pattern, white. Put the band on the section wrapper
   with bg--gray or a bg--*--pattern--* class (backgrounds-by-class), not on the components
   inside it, and do not put two coloured bands next to each other — the white between them is
   what makes each one read as a band. The rhythm to aim for is a coloured section every second
   or third section, usually landing on the ones that carry a different KIND of content: a stat
   row, a highlight, a CTA.
24. **cta-is-always-narrow** (agent) — A CTA's text must never run the full page width. This
   is a NEW CONSTRAINT, not a bug fix, and the distinction matters: max-width does not appear
   anywhere in src/scss/components/cta.scss (zero occurrences, verified 2026-08-24), so nothing
   in code enforces it and a CTA dropped into a full-width container will happily span it.
   Recorded as a decision in contracts/cta.json changes[]. The composition needs no code
   change: put the band on the section (section.layout__container.bg--gold), cap the measure
   with div.page__container--narrow inside it, and give the CTA background="" so it does not
   paint a second band inside the first.
25. **callout-is-a-float** (agent) — A Callout is a FLOATED inline element, not a section
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
26. **pre-title-is-not-a-category** (agent) — A Card's pre_title is a CONTEXTUAL LABEL —
   "Pinned", "Featured", "Applications close Friday" — not a taxonomy term. Do not tag every
   item in a listing with its section ("Research", "Students", "Faculty"): the pre-title
   renders deliberately quiet, at card/pre-title/font-size 0.75rem with card/pre-title/opacity
   0.7, and a full column of them turns that quiet into noise while implying a filterable
   taxonomy the component does not provide. Reference:
   https://sandbox.prod.drupal.uiowa.edu/news. The icon slot beside it follows the same logic —
   an icon marks an exception, not a type, so do not give every card one.
27. **heading-alignment-follows-content** (agent) — A heading takes the alignment of the
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
28. **banner-pre-title-is-a-hook** (agent) — A Banner's pre_title is a HOOK or a topic label
   — "Research stories", "Undergraduate program", "Discover more" — the line that tells a
   reader what kind of thing the headline is and gives them a reason to keep reading. It is NOT
   the name of the owning unit. The Brand Bar already states the site and its parent (siteName
   / parentTitle) and the Brand Footer states them again, so putting the college or department
   name in pre_title spends the one line above the headline on information the page has shown
   twice already. Note this is the OPPOSITE advice to pre-title-is-not-a-category, which
   governs a CARD's pre_title: a card sits in a set of parallel siblings, so a repeated
   taxonomy term there is noise, while a banner is a singleton at the top of a page and
   orienting the reader is exactly its pre_title's job. Same option name, two components, two
   rules — do not generalise one to the other.
29. **card-background-contrasts-the-band** (agent) — A Card sitting in a coloured section
   band needs its own background to stay legible: inside bg--gray, set the Card's background to
   white. Card carries a background option for this (contracts/card.json, values
   black|gray|gold|white) and it is the difference between a card that reads as an object on a
   surface and one that dissolves into it — a default-background card on bg--gray is a bordered
   rectangle of the same colour as the band, so the border does all the work and the card stops
   looking like a card. This is not the same choice as borderless: borderless removes the frame
   and is for cards that are already separated by a grid gap on a white section. A borderless
   card on bg--gray is the worst case of all, because nothing at all distinguishes it from the
   band. Never put a card's background class on the section wrapper or the section's on the
   card — see backgrounds-by-class.
30. **card-in-a-listing-is-a-destination** (agent) — A Card that stands for a place a reader
   can go gets a url. Not a decorative tile, not a fact restated as a box — if the card names a
   programme, a story, a facility or an organisation that has a page behind it, link it.
   Passing url is also what makes the WHOLE card a click target rather than just its label:
   Card.dc.html:470 pushes `click-container` onto the root as soon as a url is present, and
   click-a11y then wires the surface up, so the reader gets a card-sized hit area instead of a
   one-line link. A grid of unlinked cards is the commonest dead end in a generated landing
   page: it looks finished, it reads as navigation, and it goes nowhere. If a card genuinely
   has no destination, that is a sign the content belongs in prose or a stat, not in a card.
31. **banner-stacks-on-mobile** (agent) — Set mobile_content_below_image on every
   media-filled Banner. Below the sm container query it stops overlaying the text on the
   photograph and stacks the content UNDER it: the media loses its scrim, the banner becomes
   display:block, and the foreground colours flip to black with the text-shadow removed
   (contracts/banner.json records banner.scss:324-361). Overlaid text at phone width is the
   worst case for both halves of the banner — the headline sits on whatever part of the image
   happens to be behind it, and the image is cropped to a band too short to read as a picture.
   Stacking fixes both at once, which is why it should be the standing choice and not a
   per-page rescue. It costs nothing above the switch, where the overlay is unchanged.
32. **section-heading-gets-a-deck** (agent) — A section heading that introduces a grid gets
   a line or two of prose under it before the grid starts. A bare heading over three tiles
   makes the reader infer the relationship between the heading and the set — what these things
   have in common, why they are grouped, what to do with them — and they will infer it wrong or
   not bother. The deck is where that goes. It is also the only place a section can carry an
   editorial voice: the tiles themselves are parallel and terse by construction. Keep it to one
   or two sentences; a deck long enough to need its own paragraph break is a prose section that
   happens to be followed by a grid, and it wants its own container (see
   container-width-by-content). A centred heading and its deck go in their own narrow container
   — centred-heading-goes-narrow covers that case. The deck is BODY COPY — a plain paragraph on
   the body ramp — never the intro treatment (element--light-intro /
   uids-component--light-intro, src/scss/base/_paragraph.scss:195-201; generated pages have
   hand-rolled an .intro equivalent when nothing told them otherwise). The intro voice belongs
   to the page's own introduction, once: set it under every section heading and the one place
   it means something stops reading as the page's voice. AMENDED 2026-09-02 to add the
   treatment — the rule was silent on it, and the Well-Being page showed what silence allows:
   five section decks plus the page introduction, all in the light intro style. The design
   system owner's ruling is that light intro text under headings is useful only once per page.
33. **no-second-contact-block** (agent) — Do not build a content section that restates the
   Brand Footer. The Brand Footer already carries the address, phone and email as props
   (contact / phone / email) on every page, so a "Visit us" or "Contact" section at the bottom
   of a landing page prints the same three facts twice within one screen of each other and
   spends the most valuable slot on the page — the last thing a reader sees — on a duplicate.
   The same test applies to any chrome the page already supplies: the site and parent names
   (Brand Bar and Brand Footer both), and the primary conversion action if a banner or CTA has
   already made it. If the closing section would only repeat, delete it and let the footer do
   its job; if there is genuinely more to say about visiting — parking, building access, hours,
   a map — that is new content and it belongs on a Visit page the footer or nav links to.
34. **landing-page-suppresses-a-redundant-title** (agent) — Suppress a page title the page
   has ALREADY STATED, rather than printing it twice. Two triggers, either one is enough: the
   title says the same thing as the site name, or a BANNER at the top of the page already
   states the page's subject. AMENDED 2026-09-01 -- this rule previously tested only site-name
   duplication, which meant a page whose banner had just announced its subject still printed a
   redundant h1 underneath it (the id changed with the scope: it was
   landing-page-suppresses-a-duplicate-title). Add layout--title--hidden to the title section:
   it zeroes that section's own top and bottom padding (claude-design/layout.css:104-107) and
   restores the following section's padding-top, and it hides the BREADCRUMB with the title:
   uids_base applies element-invisible to the breadcrumb block under this class
   (scss/layouts/onecol--background.scss:78, with a focus-within reveal), and as of 2026-09-02
   claude-design/layout.css ports the same pair onto nav.breadcrumb — so a suppressed page
   never shows an orphaned crumb strip, and focusing a crumb link reveals it on a gray chip.
   Hide the h1 itself with element-invisible or visually-hidden, both of which ship
   unconditionally in the shared sheet for exactly this case. For a banner-led page,
   banner-led-page-is-a-composition covers the fuller arrangement, including
   layout--title--with-background. SUPPRESS, NEVER DELETE: the h1 and the breadcrumb stay in
   the DOM, announced and focus-revealable -- a page with no h1 at all is a real accessibility
   regression, and this is the platform's mitigation for the two-h1 problem
   contracts/page-title.json knownIssues[0] records. A page whose title is genuinely NOT stated
   elsewhere should show it.
35. **nav-strip-border-is-full-bleed** (agent) — The horizontal main nav sits in its own
   FULL-BLEED strip with a hairline bottom border, and that strip is the thing separating the
   navigation from the page. Reproduce production's structure exactly: a plain wrapper carrying
   the border, OUTSIDE any container, holding a <div class="page__container"> that holds the
   Menu. Downstream this is a sibling AFTER the Brand Bar's </header> — uids_base
   templates/layout/header.html.twig emits <nav class="nav--horizontal"> wrapping a
   page__container — and the border is on that full-width element, so the rule reads edge to
   edge while the links stay on the container grid. Three ways to get it wrong. (1) The border
   colour is --uiowa-menu-container-border-color, which resolves to #E6E5E5; do NOT reach for
   --uiowa-color-gray-165, which is #DDDDDD and a visibly different hairline. Production
   hard-codes #e6e5e5 as a raw literal (uids_base
   scss/components/menus/superfish/horizontal-menu.scss:5), so the token is the correct
   expression of an as-shipped value rather than a change to it. (2) Make the strip a DIV,
   never a <nav>: Menu renders its own <nav aria-label> and a second landmark around it nests
   two. (3) This is NOT Menu's container_border / .menu--container, which lands the border on
   .column-container (claude-design/Menu.dc.html:211) and is therefore INSET to the container —
   a different pattern, for a horizontal nav sitting inside a page, as the Application stories
   use it. Reaching for it here gives a border that stops short of both edges.
36. **pattern-over-a-flat-dark-band** (agent) — A full-width dark band reads as stark when
   it is flat colour. If the section has no image and one is not the obvious first move, reach
   for a PATTERN background rather than bare bg--black or bg--gold: the shared sheet ships
   twelve combinations -- black, gold, gray and white each crossed with brain, community and
   particle (claude-design/backgrounds.css). The pattern does the work an image would have
   done, at no content cost and with no cropping or alt-text to get wrong, and it keeps a band
   from looking like an unstyled block of colour. Two notes. backgrounds-by-class lists only
   three of the twelve as examples, so do not read that list as the available set. And
   contracts/banner.json's background option enumerates only black--pattern--brain,
   gold--pattern--particle and gray--pattern--community, so a Banner is limited to those three
   where a section wrapper is not -- pick the class on the section, not the component, per
   backgrounds-by-class.
37. **light-font-buttons-belong-in-cards** (agent) — The light_font Button style is the
   IN-CARD recipe and does not belong on a standalone section button. It swaps the button's
   default caps face (--uiowa-button-font-family) for --uiowa-font-family-sans, which is
   'Roboto', sans-serif, at normal weight -- a quiet text-like treatment that reads correctly
   inside a card's footer and reads as an unstyled link when it is carrying a section's main
   action. The trap is that Card.dc.html's own footer button is declared with transparent plus
   light_font, so the recipe is right there to copy, and copying it onto a section-level button
   is the commonest way this goes wrong -- a real generated page put transparent + light_font
   on all six of its buttons, none of them in a card. For a section action, use a Button with
   its default face and a real colour.
38. **card-grid-uses-the-shipped-classes** (agent) — A row of cards goes in the SHIPPED
   grid, never a hand-rolled one. The markup is a section wrapper, then <div
   class="list-container list-container--grid grid--{ratio}">, then <div
   class="list-container__inner">, then one wrapper per card. The ratios that ship are
   grid--fourcol--25, grid--threecol--33-34-33, grid--twocol--50-50 and grid--twocol--25-75 --
   so a four-across row needs nothing invented. THE COST OF ROLLING YOUR OWN IS NOT COSMETIC:
   layout.css's content-grid rule that levels a row is scoped to `.list-container__inner > *`,
   so without that wrapper it never fires, the grid stretches each column while every card
   keeps its own content height, and the row renders ragged. Measured on a real generated page
   that declared its own .card-grid: five rows ragged by 33, 28, 79, 27 and 52 pixels, where
   production renders them level. A hand-rolled grid also invents breakpoints -- that page
   switched at 600px, which no UIDS component does. stats-come-in-threes shows the same markup
   for a Stat row; it is the same grid. AMENDED 2026-09-02, clarifying what 'one wrapper per
   card' means IN THIS VIEW, learned by falling into it while fixing the reviewed pages: put
   each dc-import DIRECTLY inside .list-container__inner — the runtime's own import wrapper IS
   the per-card grid item. Do not add a .grid__column div around it: production needs that div
   (Layout Builder emits it, and UIDS's own stories reproduce it), but here it adds a fourth
   layer the row-leveller cannot reach through — layout.css stretches the grid item and grows
   its only child, and with the extra div that growth stops at the runtime wrapper while the
   card inside keeps its content height. Measured 2026-09-02 on the Well-Being page: the same
   four-card row rendered 305/254/333/353 ragged with the divs and level without them.

<!-- END GENERATED RULES -->

### One more rule, specific to THIS view

**Do not declare bare element styles in YOUR page.** `dc-import` shares one document and
one cascade with every component it pulls in, so a bare `h2{...}`, `p{...}` or `a{...}` in
your page's own `<style>` reaches inside every imported component and fights its rules at
equal specificity — where the winner is decided by injection order, which nothing controls.
Scope your page styles to your own classes. (The components themselves follow this rule;
`scripts/check-claude-design.mjs` fails a build that breaks it.)

This one is not in `rules.json` on purpose: it describes this view's own mechanics rather
than a property of the design system. Figma has no cascade, and production scopes through
SCSS. `Page Scaffold.dc.html` is the single exception — it is allowed bare element
selectors because it supplies the page's baseline.

## Index

- `Page Scaffold.dc.html` — canonical page structure (Brand Bar → sections → Brand Footer)
- `Design System Guide.md` — the authoritative guide: rules, type ramp, color, layout
  system, component props. Read it if you can; this readme carries the essentials.
- `tokens.css` — every design token (color, typography, spacing); link it in everything
- `layout.css` — containers, section rhythm, content grids; link it after `tokens.css`
- `backgrounds.css` — the `bg--*` background bands and their text cascade; link it after
  `tokens.css`
- `SKILL.md` — skill wrapper

**Page furniture**
- `Brand Bar.dc.html` — required page header (needs `Logo.dc.html` as a sibling)
- `Logo.dc.html` — IOWA / IOWA Health Care lockup
- `Brand Footer.dc.html` — required page footer (needs `Logo.dc.html` as a sibling)
- `Banner.dc.html` — full-bleed hero over an image or a background band
  (**imports `Headline.dc.html` + `Button.dc.html`**)

**Content**
- `Card.dc.html` — bordered content surface: media, title, subtitle/meta, body, one button
  (**imports `Headline.dc.html` + `Button.dc.html`**). Its layout switches on a CONTAINER
  query at 400px, so it ships a `.dc-card-column` wrapper that supplies that context —
  without it the left/right orientations render stacked, silently. Pass `image` (a URL) for
  a real picture; empty falls back to a grey placeholder.
- `Headline.dc.html` — heading with serif/uppercase/underline/highlight treatments
- `Blockquote.dc.html` — pull quote with optional portrait, left/center/right
- `Callout.dc.html` — boxed aside with an optional background
- `Stat.dc.html` — big-number statistic, default or horizontal
- `Table.dc.html` — data table with optional sticky header and gridlines
- `Badge.dc.html` — small status pill
- `Alert.dc.html` — status message (danger/success/warning/info)

**Actions**
- `Button.dc.html` — the `.bttn` link/button (no sibling imports needed)
- `CTA.dc.html` — call-to-action band (**imports `Headline.dc.html` + `Button.dc.html`**)
- `Form.dc.html` — ONE labeled form control (8 archetypes; no sibling imports needed)

**Navigation**
- `Menu.dc.html` — vertical or horizontal nav with nesting
- `Tabs.dc.html` — tablist + panels
- `Pager.dc.html` — pagination
- `Breadcrumbs.dc.html` — breadcrumb trail
- `Accordion.dc.html` — expandable items

## Scope

Migrated so far: the token foundations (color, typography, spacing/layout), the layout
system (`layout.css`), the background system (`backgrounds.css`), and **twenty
components** — see the Index.

**Still NOT migrated: sliders, grid and showcase.** Do not improvise
Iowa-looking versions — use a clearly-labeled neutral placeholder (`.uids-placeholder` in
the scaffold) and report the gap to the user. That also includes the form patterns not yet
templated (fieldsets/side-legends, multi-column form layouts) — stack `Form.dc.html`
imports for what exists and report the rest.

## Essentials

- **Page structure**: Brand Bar → one or more
  `<section class="layout__container"><div class="page__container">…</div></section>` →
  Brand Footer.
- **Page title** — write it as plain markup, NOT as a `Headline` import:
  ```html
  <h1 class="page-title headline headline--serif">Understanding life at the molecular level</h1>
  ```
  That is exactly what production emits. `.page-title` (in `layout.css`) is Zilla Slab at
  weight **600**, on the standard h1 ramp — `--uiowa-page-title-font-size` resolves through
  `--uiowa-font-size-heading-h1` to `clamp(2.3rem, calc(2.3662vw + 1.4127rem), 3.35rem)`,
  measured at 53.6px on a desktop page. Do NOT substitute
  `<dc-import name="Headline" level="h1">`: the SIZE is the same, but `headline--serif`
  gives weight **700** where a page title is 600, so it looks close and is the wrong
  treatment. (An earlier version of this paragraph claimed a
  `clamp(2.2rem … 3.7rem)` ramp and argued from size. That clamp is real but scoped to
  BANNER layouts only — `uids_base scss/components/banner.scss:22`, under
  `.layout--title.banner .headline.page-title` — and an ordinary page title never gets it;
  `layout.css` records the correction and the measurement. Corrected here 2026-08-22: the
  weight argument was always the one doing the work.)
  `.page-title` is a real UIDS component as of 2026-08-17 (it began downstream in
  uids_base). It is a CLASS here rather than a `dc-import` because production writes it as
  plain markup and it is one element with two classes. Section headings below it are `h2`,
  and those DO use `Headline`.
  **It pairs with the breadcrumb.** Put `Breadcrumbs` immediately above it and they sit
  FLUSH — the breadcrumb carries the space above the pair (1.75rem) and the title has no
  top margin. If there is no breadcrumb, add `page-title--no-breadcrumbs` so the title
  reclaims that space:
  `<h1 class="page-title page-title--no-breadcrumbs headline headline--serif">`.
  A real page ships **two** `<h1>` elements: the Brand Bar's site name
  (`<h1 class="site-name">`) and the page title. That is as-shipped and is a known platform
  accessibility wrinkle — do not "resolve" it by demoting the page title to an h2. Raise it
  with the user if a single-h1 outline matters for a given build.
- **Containers**: `.page__container` caps at 1310px centered; `--narrow` 1020px from 980px;
  `--extended` 1600px; `--full` viewport-wide with margins; `--edge` no margins.
- **Section rhythm**: `.layout__container` pads 1.25rem → 3rem **at 768px** (not 980px).
  First section drops its top padding. Adjacent sections sharing a `.bg--*` class
  (`bg--gold` / `bg--black` / `bg--gray`) intentionally merge into one band.
- **Content grids**: `.list-container.list-container--grid.grid--threecol--33-34-33` with
  items inside `.list-container__inner` (also `grid--twocol--50-50`, `grid--fourcol--25`,
  `grid--twocol--25-75`).
- **Backgrounds** (`backgrounds.css`): put `bg--black`, `bg--gold`, `bg--gray` or
  `bg--white` on a section to get the band AND its text cascade — black flips text white
  and links gold automatically; gold/gray/white set black text. Never restyle text to
  compensate for a band; the class does it. Pattern variants
  (`bg--{color}--pattern--{brain|community|particle}`, e.g.
  `bg--black--pattern--brain`) RENDER THEIR REAL TEXTURES as of 2026-09-02 for every
  brain variant and for Banner's three fills — copy `assets/` beside `backgrounds.css`
  (color-only fallback without it; five heavy community/particle PNGs are deferred and
  stay color-only). Never fake a texture with gradients or drawings.
- **Tokens only** — no raw hex, type sizes, or spacing. Color: `--uiowa-color-brand` (gold
  #FFCD00), `--uiowa-color-text`, `--uiowa-color-background`, `--uiowa-color-link`. Type:
  `--uiowa-font-size-heading-h1…h6` (fluid clamps), `--uiowa-font-size-body` (1.2rem, lh
  1.7), families `--uiowa-font-family-body|heading|display`. Spacing:
  `--uiowa-space-{50,100,125,150,200,300,600,800}` (step = rem × 100).
- **Brand Bar**: a second row FORCES narrow styling; the parent-title pattern moves the
  site `h1` into the second row. Never redraw or recolor the IOWA lockups (trademarks).
- **Button — which colorway is a CONTENT decision, not a style one.** `primary` (gold) is
  the default and marks the single most important action in a section; `secondary` (black)
  is for supporting actions; `tertiary` (white) is for dark or busy backgrounds. Where
  several buttons sit together, at most one should be `primary`. Default to `primary` and
  `medium` unless the content makes the hierarchy obvious — and ask the user when a screen
  has several competing actions. Do not pick a colorway to match a mood; pick it to signal
  importance.
- **Button**: `<dc-import name="Button" label="Read more" color="primary" size="medium">`.
  Colors `primary|secondary|tertiary`; sizes `small|medium|large`; booleans `icon`,
  `transparent`, `light_font`, `borderless`, `full`. Buttons are UPPERCASE Antonio —
  `light_font` swaps to Roboto but stays uppercase. Two overrides to know: `transparent`
  beats the colorway, and `light_font` beats the size (it sets font-size AND padding). An
  empty `label` makes an icon-only button, which has **no accessible name** — give it
  visible text unless the surrounding markup names it.

- **Form**: `<dc-import name="Form" control="input" label="Email address">`. One labeled
  control per import; stack imports inside a section to build a form (each carries its
  own `.form` scope — spacing works out). Controls
  `input|textarea|select|select-multiple|file|checkbox|radio|toggle`; booleans `required`
  (red asterisk), `error`, `disabled`, `large`, `compact`; `description` adds help text.
  The single-line text field is `input`, NOT `text` — `contracts/form.json` is
  authoritative on that axis, and the template has no `text` arm, so the wrong value fails
  SILENTLY: the label renders and the control does not.
  Labels are 1rem bold; inputs are 2.9rem tall on a near-white `#FAFAFB` field — all from
  tokens, do not restyle. Not yet templated: fieldset/side-legend grouping and the
  flex/inline multi-column layouts — placeholder + report, don't improvise. A `disabled`
  control renders through a dc-only `.is-disabled` class that mirrors production's
  `:disabled` styles exactly. Every control needs a non-empty `label` (accessibility);
  `error` alone doesn't explain the problem — put the reason in `description`.

- **Card**: `<dc-import name="Card" title="Arts and Culture" body="…" url="/news/arts"
  link_text="Explore the arts">`. **Requires `Headline.dc.html` AND `Button.dc.html` as
  siblings.** Read the prop names carefully — this is the component the
  `item-list-is-stacked-cards` rule sends you to for every list, and in this view a wrong
  name fails **silently**: the card still renders, just without whatever you meant to set.
  The link is **`url` + `link_text`**, NOT `button_url` / `button_label` (those are CTA's
  and Banner's names, and guessing them from those components is the documented mistake).
  Content: `title`, `body`, `pre_title`, `subtitle`, `meta`, `image`, `image_alt`,
  `date_month` / `date_day`. Enums: `orientation` `stacked|left|right`, `media_size`
  `default|small|medium|large`, `media_shape` `widescreen|square|circle|no-crop|date`,
  `headline_style` `serif|default`, `background` `default|black|gold|gray|white`.
  Booleans: `borderless`, `link_indicator`, `show_media`, `centered`, `media_padded`,
  `button_align_bottom`.
  Leave `link_text` **empty** with `url` set and `link_indicator` on and you get the bare
  circular arrow — that is the list treatment, not a missing label.
  **`orientation` needs a container**: Card switches on a CONTAINER query at 400px, so wrap
  each card in `.dc-card-column` (the template ships it) or `left`/`right` render stacked
  with no warning. For a list of items: `borderless`, `orientation="right"`,
  `media_size="small"`, empty `link_text`, one per row, 2rem apart — see
  `item-list-is-stacked-cards` and `contracts/item-list.json`.

- **Headline**: `<dc-import name="Headline" text="Our research" level="h2"
  text_style="uppercase" underline="{{ true }}">`. Levels `h1…h6` (h2 default) — pick by
  DOCUMENT OUTLINE, not by size. A UIDS page already has TWO h1s as-shipped — the Brand
  Bar's site name and the page title — so a Headline in your content is a SECTION heading:
  h2 or lower. Do not add a third h1, and do not demote the page title to "fix" the pair
  (that loses the page-title type ramp). See `page-heading-structure`.
  `text_style` `default|serif|uppercase` (serif = Zilla Slab bold; uppercase = Antonio —
  write natural case and let CSS uppercase it); booleans `underline` (75px gold bar; gray
  on gold backgrounds) and `highlight` (gold band behind the text, black on gold
  backgrounds). `alignment` `default|center` — `default` INHERITS the container's
  alignment, so use `center` only when the heading's own content is centered (see
  `heading-alignment-follows-content`). Set it on the Headline rather than centering the
  wrapper: with `underline` on, the gold bar is a block with zero side margins, so a
  wrapper's text-align centers the text and leaves the bar hard left. There is no
  left/right value. Inside a `bg--gold` section the color flips happen automatically —
  `preview_on_gold` only simulates that context in the editor; don't ship it as a page
  prop. Needs `backgrounds.css` as a sibling. Word-level highlights inside a longer
  headline aren't expressible through this template's plain-text `text` prop — report
  that as a gap rather than nesting markup.

- **CTA**: `<dc-import name="CTA" title="Be a Hawkeye" details="…" button_label="Apply">`.
  `orientation` `centered|left|inline`, `background` `default|black|gold|gray|white`,
  boolean `button_align_right`. **Requires `Headline.dc.html` and `Button.dc.html` as
  siblings** — it imports both rather than restyling their markup. On a **gold**
  background the button renders black-on-white-text (secondary); everywhere else it is
  gold. That flip is production behavior and the template does it for you — do not
  override the button colorway to "fix" the contrast.

- **Stat**: `<dc-import name="Stat" stat_title="15:1" stat_summary="Student-faculty ratio">`.
  `display` `default|horizontal`, `background` `default|black|gold|gray|white`, boolean
  `stat_hover`. With `stat_hover` on (the default) the supporting content is collapsed at
  rest above 980px and expands on hover — that is production behavior, not breakage; set
  `stat_hover="{{ false }}"` for the always-open `.stat--static` rendering.

- **Table**: `<dc-import name="Table" caption="Cost of attendance">`. Booleans `sticky`
  (pins the header while the body scrolls), `border` (gridlines), `highlight` (row hover).
  Write real column headers — `<th>` scope carries the accessibility.

- **Alert**: `<dc-import name="Alert" type="info" heading="Heads up" body="…">`. `type`
  `info|success|warning|danger`, `heading_level` `h2…h6`, booleans `icon`, `dismissible`,
  `centered`. The dismiss button renders but does not dismiss. Note `warning` and `danger`
  ship the same icon color — that is as-shipped upstream, not a mistake here.

- **Badge**: `<dc-import name="Badge" text="New" type="primary">`. `type`
  `primary|secondary|cool-gray|blue|green|orange`. **A badge is an INLINE pill that sits in
  the flow of text**, immediately after the thing it labels — a list item, a table cell, a
  card meta line, a heading. It renders at ONE fixed size everywhere and does NOT scale
  with its surroundings, so never set a size on it and never compensate for its context.
  **Never position it absolutely** — no corner ribbons, no flags overlapping a card or
  callout edge, no `position:absolute`/`float` wrappers. UIDS has no such pattern and
  `badge.scss` contains no positioning at all, so a corner-mounted badge is invented, not
  design-system behaviour. (Badges used to grow to their parent's font-size, which is why
  older guidance banned them from headings; that was fixed at source on 2026-08-20 and the
  ban is retired. See `badge-inline-only`.)

- **Banner**: `<dc-import name="Banner" headline="…" pre_title="…" button_label="Read more">`.
  `fill` `media|black|gold|gray|white` — plus the three pattern fills the contract
  enumerates (`black--pattern--brain`, `gold--pattern--particle`,
  `gray--pattern--community`; needs `assets/` copied) — picks the FILL MECHANISM, and it is exclusive: a
  background band has no image and therefore no overlay, which is enforced in the CSS and
  not by convention. With `fill="media"`, `overlay_direction` `none|btt|ttb|ltr` and
  `overlay_light` cross freely — direction is the angle, light is the colour. `height`
  `none|medium|large` sets a MINIMUM via an aspect ratio, so long content still wins.
  Buttons: up to THREE numbered pairs — `button_label`/`button_url`, `button_2_label`/
  `button_2_url`, `button_3_label`/`button_3_url` — counted by non-empty labels; two or
  more render in the banner's own `.bttn--row`, spaced by its token margins. Know the
  trade the contract records before adding a second: in the Vue component ONE button
  makes the whole banner clickable and links the headline, and a second button gives both
  up — add buttons because the content needs them, not for symmetry.
  Pass `image` (a URL) for a real hero image; leave it empty and you get a labelled grey
  placeholder instead, which is fine for wireframing but say so to the user. Needs ≥768px
  of container width for the desktop rendering;
  narrower, it stacks the content under the image, which is the real mobile behaviour.

- **Callout**: `<dc-import name="Callout" heading="Did you know" body_text="…">`.
  `background` `none|black|gold|gray|white`, `inline_size` `none|small|medium|large`,
  `inline_alignment` `none|left|center|right`. Sized/aligned callouts float beside body
  copy; a full-width one should use `inline_size="none"`.

- **Blockquote**: `<dc-import name="Blockquote" content="…" footer="Jane Doe">`.
  `orientation` `left|center|right`, `media` `none|above|below`. The portrait is a neutral
  placeholder in this view — supply a real image in production and say so to the user.

- **Menu**: `<dc-import name="Menu" variant="vertical" item_1="About">`. `variant`
  `horizontal|vertical`, `active_item` selects the current page. The active indicator is
  **gray**; gold is the hover state — do not swap them. Horizontal menus need ≥768px of
  container width or they render vertically (as-shipped). Item icons are not carried here.

- **Tabs**: `<dc-import name="Tabs" tab_1="Hours" panel_1="…" selected="1">`. Three tabs
  with panels; `selected` picks which renders as active. Switching does not work — say so.

- **Pager**: `<dc-import name="Pager" active_page="5">`. Note the ellipsis renders
  unpadded — a known upstream quirk reproduced faithfully, not a defect to patch here.

- **Breadcrumbs**: `<dc-import name="Breadcrumbs" crumb_1_text="Home" current_page="…">`.
  Blanking a crumb's URL renders it as plain text (a parent with no link). The last crumb
  is always plain text and carries no `aria-current` — as-shipped upstream.

- **Accordion**: `<dc-import name="Accordion" title_1="…" content_1="…" open="{{ true }}">`.
  Four items; `open` controls the first. It will not open on click. The chevron is a
  stand-in shape, not the real Font Awesome glyph — mention that if fidelity matters.

Other views of the same system: the Figma library
(https://www.figma.com/design/hNShklBztaeaQneScM0KoM/UIDS) and the published Storybook
(https://uids.brand.uiowa.edu).
