# UIDS typography

The type styles of UIDS, the University of Iowa Design System, with every size worked out. Written from the design tokens of UIDS 5.0.0-alpha.1.

## How to use it

1. Find the piece's format under Formats. Its row names the piece's hierarchy: X-Small, Small, Medium, Large or X-Large.
2. Use that hierarchy's styles together, from its section below. Don't mix styles from two hierarchies in one piece.
3. The Label styles are one set for every hierarchy.
4. In CSS, use UIDS's classes rather than the numbers: the hierarchy's class on the piece, and each style's class, from the Class column, on its text. Medium is the default, so its pieces need no hierarchy class. An X-Small piece, for example, is `class="type-scale--x-small"` and its headline `class="type-headline"`. Subhead 2's emphasis weight is the class `type-subhead-2--emphasis`, on the element or on a span for part of a line; a `strong` or `b` inside Subhead 2 takes it too. UIDS's stylesheets uids.css and uids-core.css have the classes.

Sizes are in px, at a 16px root, and in pt (1pt = 4/3px). A line height is a multiple of the font size; the px and pt after it are the same height.

## Fonts

UIDS's CSS does not load the typefaces. Load Roboto, Special Gothic Condensed and Zilla Slab from Google Fonts with this link, which has every weight the styles use: https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Special+Gothic:wdth,wght@75,600&family=Zilla+Slab:wght@600&display=swap

Special Gothic Condensed is Google's Special Gothic at width 75, weight 600.

## Formats

| Hierarchy | Body size | Formats |
| --- | --- | --- |
| X-Small | 12.67px (9.5pt) | Programs, program flyers, mini flyers, brochures and Word documents |
| Small | 16px (12pt) | Letters, forms and covers |
| Medium | 19px (14.25pt) | Web pages and applications, video, the letter-size flyer and poster |
| Large | 24px (18pt) | The digital ad, web banner and 11 × 17 poster |
| X-Large | 36px (27pt) | Displays and slides read at a distance |

## What each style is for

- Eyebrow: The label above a title: it names the composition (a series, a unit, an event type); the component sets it in uppercase. The Banner pre-title is an eyebrow; the Card pre-title, a contextual tag, is a Label.
- Headline: The title: page titles (h1), banners and posters, once per piece.
- Headline 6×: The headline for a bigger statement: 6× its hierarchy's body size.
- Headline 8×: The headline for a bigger statement: 8× its hierarchy's body size.
- Subhead: The lead-in under a title, and section heads (h2).
- Subhead 2: Details and short headings (h3, h4): a date and place, a card's title.
- Intro: The text under a page's title (h1) that introduces the page: Subhead 2 at its regular weight, at the Subhead's size. Its class is `element--intro`; `element--light-intro` and `element--bold-intro` are deprecated names for it. A banner's or poster's lead-in is the Subhead.
- Small print: Credits, dates and fine print under body text.
- Related space: Between closely related elements, such as a heading and its text.
- Break space: Below display type, and between distinct sections or content groups.

## X-Small hierarchy

For programs, program flyers, mini flyers, brochures and Word documents. Body size 12.67px (9.5pt). Hierarchy class `type-scale--x-small`.

| Style | Class | Font | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
| Eyebrow | `type-eyebrow` | Special Gothic Condensed | 600 | 19px (14.25pt) | 1.2 (22.8px, 17.1pt) | 0 |
| Headline | `type-headline` | Special Gothic Condensed | 600 | 50.67px (38pt) | 1 (50.67px, 38pt) | 0 |
| Headline 6× | `type-headline-6x` | Special Gothic Condensed | 600 | 76px (57pt) | 0.9 (68.4px, 51.3pt) | 0 |
| Headline 8× | `type-headline-8x` | Special Gothic Condensed | 600 | 101.33px (76pt) | 0.9 (91.2px, 68.4pt) | 0 |
| Subhead | `type-subhead` | Zilla Slab | 600 | 25.33px (19pt) | 1.25 (31.67px, 23.75pt) | 0 |
| Subhead 2 | `type-subhead-2`, emphasis `type-subhead-2--emphasis` | Roboto | 400, emphasis 500 | 19px (14.25pt) | 1.3 (24.7px, 18.53pt) | 0 |
| Intro | `element--intro` | Roboto | 400 | 25.33px (19pt) | 1.3 (32.93px, 24.7pt) | 0 |
| Body | `type-body` | Roboto | 400 | 12.67px (9.5pt) | 1.5 (19px, 14.25pt) | 0 |
| Small print | `type-small-print` | Roboto | 400 | 9.5px (7.13pt) | 1.5 (14.25px, 10.69pt) | 0 |

Space between text: related 19px (14.25pt); break 25.33px (19pt). The hierarchy class sets them as `--uiowa-type-space-related` and `--uiowa-type-space-break`.

## Small hierarchy

For letters, forms and covers. Body size 16px (12pt). Hierarchy class `type-scale--small`.

| Style | Class | Font | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
| Eyebrow | `type-eyebrow` | Special Gothic Condensed | 600 | 24px (18pt) | 1.2 (28.8px, 21.6pt) | 0 |
| Headline | `type-headline` | Special Gothic Condensed | 600 | 64px (48pt) | 1 (64px, 48pt) | 0 |
| Headline 6× | `type-headline-6x` | Special Gothic Condensed | 600 | 96px (72pt) | 0.9 (86.4px, 64.8pt) | 0 |
| Headline 8× | `type-headline-8x` | Special Gothic Condensed | 600 | 128px (96pt) | 0.9 (115.2px, 86.4pt) | 0 |
| Subhead | `type-subhead` | Zilla Slab | 600 | 32px (24pt) | 1.25 (40px, 30pt) | 0 |
| Subhead 2 | `type-subhead-2`, emphasis `type-subhead-2--emphasis` | Roboto | 400, emphasis 500 | 24px (18pt) | 1.3 (31.2px, 23.4pt) | 0 |
| Intro | `element--intro` | Roboto | 400 | 32px (24pt) | 1.3 (41.6px, 31.2pt) | 0 |
| Body | `type-body` | Roboto | 400 | 16px (12pt) | 1.5 (24px, 18pt) | 0 |
| Small print | `type-small-print` | Roboto | 400 | 12px (9pt) | 1.5 (18px, 13.5pt) | 0 |

Space between text: related 24px (18pt); break 32px (24pt). The hierarchy class sets them as `--uiowa-type-space-related` and `--uiowa-type-space-break`.

## Medium hierarchy

For web pages and applications, video, the letter-size flyer and poster. Body size 19px (14.25pt). Hierarchy class `type-scale--medium`, the default, which a piece doesn't need.

| Style | Class | Font | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
| Eyebrow | `type-eyebrow` | Special Gothic Condensed | 600 | 28.5px (21.38pt) | 1.2 (34.2px, 25.65pt) | 0 |
| Headline | `type-headline` | Special Gothic Condensed | 600 | 76px (57pt) | 1 (76px, 57pt) | 0 |
| Headline 6× | `type-headline-6x` | Special Gothic Condensed | 600 | 114px (85.5pt) | 0.9 (102.6px, 76.95pt) | 0 |
| Headline 8× | `type-headline-8x` | Special Gothic Condensed | 600 | 152px (114pt) | 0.9 (136.8px, 102.6pt) | 0 |
| Subhead | `type-subhead` | Zilla Slab | 600 | 38px (28.5pt) | 1.1 (41.8px, 31.35pt) | 0 |
| Subhead 2 | `type-subhead-2`, emphasis `type-subhead-2--emphasis` | Roboto | 400, emphasis 500 | 28.5px (21.38pt) | 1.3 (37.05px, 27.79pt) | 0 |
| Intro | `element--intro` | Roboto | 400 | 38px (28.5pt) | 1.3 (49.4px, 37.05pt) | 0 |
| Body | `type-body` | Roboto | 400 | 19px (14.25pt) | 1.5 (28.5px, 21.38pt) | 0 |
| Small print | `type-small-print` | Roboto | 400 | 14.25px (10.69pt) | 1.5 (21.38px, 16.03pt) | 0 |

Space between text: related 28.5px (21.38pt); break 38px (28.5pt). The hierarchy class sets them as `--uiowa-type-space-related` and `--uiowa-type-space-break`.

## Large hierarchy

For the digital ad, web banner and 11 × 17 poster. Body size 24px (18pt). Hierarchy class `type-scale--large`.

| Style | Class | Font | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
| Eyebrow | `type-eyebrow` | Special Gothic Condensed | 600 | 36px (27pt) | 1.2 (43.2px, 32.4pt) | 0 |
| Headline | `type-headline` | Special Gothic Condensed | 600 | 96px (72pt) | 1 (96px, 72pt) | 0 |
| Headline 6× | `type-headline-6x` | Special Gothic Condensed | 600 | 144px (108pt) | 0.9 (129.6px, 97.2pt) | 0 |
| Headline 8× | `type-headline-8x` | Special Gothic Condensed | 600 | 192px (144pt) | 0.9 (172.8px, 129.6pt) | 0 |
| Subhead | `type-subhead` | Zilla Slab | 600 | 48px (36pt) | 1.1 (52.8px, 39.6pt) | 0 |
| Subhead 2 | `type-subhead-2`, emphasis `type-subhead-2--emphasis` | Roboto | 400, emphasis 500 | 36px (27pt) | 1.2 (43.2px, 32.4pt) | 0 |
| Intro | `element--intro` | Roboto | 400 | 48px (36pt) | 1.2 (57.6px, 43.2pt) | 0 |
| Body | `type-body` | Roboto | 400 | 24px (18pt) | 1.5 (36px, 27pt) | 0 |
| Small print | `type-small-print` | Roboto | 400 | 18px (13.5pt) | 1.5 (27px, 20.25pt) | 0 |

Space between text: related 36px (27pt); break 48px (36pt). The hierarchy class sets them as `--uiowa-type-space-related` and `--uiowa-type-space-break`.

## X-Large hierarchy

For displays and slides read at a distance. Body size 36px (27pt). Hierarchy class `type-scale--x-large`.

| Style | Class | Font | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
| Eyebrow | `type-eyebrow` | Special Gothic Condensed | 600 | 54px (40.5pt) | 1.2 (64.8px, 48.6pt) | 0 |
| Headline | `type-headline` | Special Gothic Condensed | 600 | 144px (108pt) | 1 (144px, 108pt) | 0 |
| Headline 6× | `type-headline-6x` | Special Gothic Condensed | 600 | 216px (162pt) | 0.9 (194.4px, 145.8pt) | 0 |
| Headline 8× | `type-headline-8x` | Special Gothic Condensed | 600 | 288px (216pt) | 0.9 (259.2px, 194.4pt) | 0 |
| Subhead | `type-subhead` | Zilla Slab | 600 | 72px (54pt) | 1.1 (79.2px, 59.4pt) | 0 |
| Subhead 2 | `type-subhead-2`, emphasis `type-subhead-2--emphasis` | Roboto | 400, emphasis 500 | 54px (40.5pt) | 1.2 (64.8px, 48.6pt) | 0 |
| Intro | `element--intro` | Roboto | 400 | 72px (54pt) | 1.2 (86.4px, 64.8pt) | 0 |
| Body | `type-body` | Roboto | 400 | 36px (27pt) | 1.5 (54px, 40.5pt) | 0 |
| Small print | `type-small-print` | Roboto | 400 | 27px (20.25pt) | 1.5 (40.5px, 30.38pt) | 0 |

Space between text: related 54px (40.5pt); break 72px (54pt). The hierarchy class sets them as `--uiowa-type-space-related` and `--uiowa-type-space-break`.

## Label

Controls and captions: buttons, form labels, badges, bylines. One set for every hierarchy, measured from Body Medium.

| Style | Class | Font | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
| Label Large | `type-label--large` | Roboto | 500 | 16.63px (12.47pt) | 1.4 (23.27px, 17.46pt) | 0 |
| Label Medium | `type-label--medium` | Roboto | 500 | 14.25px (10.69pt) | 1.4 (19.95px, 14.96pt) | 0 |
| Label Small | `type-label--small` | Roboto | 500 | 11.88px (8.91pt) | 1.4 (16.63px, 12.47pt) | 0 |

## Highlight

A highlight is a box behind chosen headline words, or a band under a subhead. Its five tokens are multiples of the role's own font size, so in CSS they are em of the highlighted text: `--uiowa-typography-highlight-headline-padding` and so on.

- `typography.highlight.headline.padding`, 0.1: the box runs from the cap height to the baseline plus this much on all four sides, and a highlighted headline takes it as padding at its top and bottom, so the gaps above and below measure from the box.
- `typography.highlight.headline.leading`, 0.05: added to the line height of every line of a highlighted headline.
- `typography.highlight.subhead.above`, 0.32: the band's top edge, above the baseline.
- `typography.highlight.subhead.below`, 0.16: the band's bottom edge, below the baseline.
- `typography.highlight.subhead.bleed`, 0.08: how far the band runs past the text at each end. The band adds no space.

UIDS's stylesheets have no highlight class: set the highlight in your own CSS from these tokens. With the 4× headline:

| Hierarchy | Headline | Box padding | More leading | Subhead | Band above | Band below | Band bleed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X-Small | 50.67px (38pt) | 5.07px (3.8pt) | 2.53px (1.9pt) | 25.33px (19pt) | 8.11px (6.08pt) | 4.05px (3.04pt) | 2.03px (1.52pt) |
| Small | 64px (48pt) | 6.4px (4.8pt) | 3.2px (2.4pt) | 32px (24pt) | 10.24px (7.68pt) | 5.12px (3.84pt) | 2.56px (1.92pt) |
| Medium | 76px (57pt) | 7.6px (5.7pt) | 3.8px (2.85pt) | 38px (28.5pt) | 12.16px (9.12pt) | 6.08px (4.56pt) | 3.04px (2.28pt) |
| Large | 96px (72pt) | 9.6px (7.2pt) | 4.8px (3.6pt) | 48px (36pt) | 15.36px (11.52pt) | 7.68px (5.76pt) | 3.84px (2.88pt) |
| X-Large | 144px (108pt) | 14.4px (10.8pt) | 7.2px (5.4pt) | 72px (54pt) | 23.04px (17.28pt) | 11.52px (8.64pt) | 5.76px (4.32pt) |

With the 6× or 8× headline, the box padding and the added leading are the same multiples of that headline's size.
