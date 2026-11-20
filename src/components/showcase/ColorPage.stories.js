// Generated from docs/site/colors.html by .claude/uids-components-2026-11-10/build_color_story.py:
// the Color page on the real components. Edit the page or the generator, not this file.
import '../../scss/components/tabs.scss';
import '../../scss/components/_background.scss';
import '../../scss/components/_headline.scss';
import '../../scss/layout/_grid.scss';
import { onMounted } from 'vue';

import UidsAccordion from '../accordion/Accordion.vue';
import UidsButton from '../button/Button.vue';
import UidsCallout from '../callout/Callout.vue';
import UidsCard from '../card/Card.vue';
import UidsGrid from '../grid/Grid.vue';
import UidsGridItem from '../grid/GridItem.vue';
import UidsHeadline from '../headline/Headline.vue';
import UidsTabs from '../tabs/Tabs.vue';
import DocsFrame from './DocsFrame.js';
import UidsTable from '../table/Table.vue';
import colorsMd from '../../../docs/site/colors.md?raw';

// The example cards are captures of the Figma examples; the page lazy-loads the same files.
const exampleImages = import.meta.glob('../../../docs/site/images/examples/colors-*.png', { eager: true, query: '?url', import: 'default' });
const imageUrl = (name) => exampleImages[`../../../docs/site/images/examples/${name}`] || '';

const page = {
 "crumbs": [
  {
   "text": "Home",
   "url": "#"
  },
  {
   "text": "Design System",
   "url": "#"
  },
  {
   "text": "Color"
  }
 ],
 "lede": "Our black and gold color palette is distinct across higher education and serves as the foundation for Iowa brand recognition. Our system builds on that foundation to define how color consistently works across the formats and mediums we use to reach our audiences.",
 "buttons": [
  {
   "label": "Downloads",
   "url": "#use-tabs__tab--0",
   "icon": "fa-solid fa-download"
  },
  {
   "label": "Code",
   "url": "#use-tabs__tab--1",
   "icon": "fa-solid fa-code"
  },
  {
   "label": "View Markdown",
   "url": "#use-tabs__tab--2",
   "icon": "fa-regular fa-file-lines"
  }
 ],
 "md_copy": "Copy for LLM",
 "palettes": {
  "title": "Color palettes",
  "intro": "Each of the color palettes developed within our system serves a specific function and purpose."
 },
 "cards": [
  {
   "href": "#primary-colors",
   "strip": [
    "var(--uiowa-color-brand-gold)",
    "var(--uiowa-color-brand-black)"
   ],
   "name": "Primary colors",
   "role": "Reinforce the brand identity and create an immediate connection to Iowa."
  },
  {
   "href": "#neutral-colors",
   "strip": [
    "var(--uiowa-color-neutral-0)",
    "var(--uiowa-color-neutral-100)",
    "var(--uiowa-color-neutral-175)",
    "var(--uiowa-color-neutral-300)",
    "var(--uiowa-color-neutral-500)",
    "var(--uiowa-color-neutral-800)"
   ],
   "name": "Neutral colors",
   "role": "Support legibility, structure, and hierarchy across text, backgrounds, borders, and dividers."
  },
  {
   "href": "#accent-colors",
   "strip": [
    "var(--uiowa-color-accent-blue)",
    "var(--uiowa-color-accent-teal)",
    "var(--uiowa-color-accent-orange)",
    "var(--uiowa-color-accent-magenta)",
    "var(--uiowa-color-accent-ochre)"
   ],
   "name": "Accent colors",
   "role": "Add emphasis and create visual distinction for small, intentional details."
  },
  {
   "href": "#status-colors",
   "strip": [
    "var(--uiowa-color-info)",
    "var(--uiowa-color-success)",
    "var(--uiowa-color-warning)",
    "var(--uiowa-color-danger)"
   ],
   "name": "Status colors",
   "role": "Have universally recognized meanings related to status, risk, safety, or required action."
  }
 ],
 "sections": [
  {
   "id": "primary-colors",
   "title": "Primary colors",
   "intro": [
    "Black and gold are Iowa’s primary colors and should be the most prominent colors used to clearly connect your program and message to Iowa. Use the correct color values for the medium you’re working in to achieve the most accurate gold."
   ],
   "tables": [
    {
     "sub": null,
     "caption": "Primary colors: print, screen and thread values",
     "cols": [
      "PMS",
      "CMYK",
      "Rich black",
      "HEX",
      "Thread"
     ],
     "rows": [
      {
       "chip": "var(--uiowa-color-brand-gold)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#000\">Aa</span>",
       "name": "Iowa gold",
       "cells": [
        "<code>116 C</code>",
        "<code>0 18 100 0</code>",
        "—",
        "<code>#FFCD00</code>",
        "<code>Madeira 910-1069 Classic Rayon #40</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-brand-black)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#fff\">Aa</span><span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:var(--uiowa-color-brand-gold);margin-left:.5rem\">Aa</span>",
       "name": "Black",
       "cells": [
        "—",
        "<code>0 0 0 100</code>",
        "<code>40 30 30 100</code>",
        "<code>#000000</code>",
        "—"
       ]
      }
     ]
    }
   ],
   "wtu": [],
   "dv": "",
   "examples": [
    {
     "kind": "do",
     "img": "colors-primary-colors-do-1.png",
     "caption": "Black and gold should be the most prominent colors in every communication."
    },
    {
     "kind": "do",
     "img": "colors-primary-colors-do-2.png",
     "caption": "Reserve gold text for short headlines and callouts on dark backgrounds. Use white for body text on black."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "colors-primary-colors-dont-1.png",
     "caption": "Don’t tint, darken, or lighten Iowa gold. Always use it at full strength so it stays recognizable."
    },
    {
     "kind": "dont",
     "img": "colors-primary-colors-dont-2.png",
     "caption": "Never use gold text on white, or white text on gold. That pairing fails accessibility contrast. Use black text instead."
    }
   ]
  },
  {
   "id": "neutral-colors",
   "title": "Neutral colors",
   "intro": [
    "Neutral colors can help create structure, improve legibility, and organize information as text, backgrounds, borders, and dividers. They help establish hierarchy and clear space alongside Iowa’s primary colors."
   ],
   "tables": [
    {
     "sub": null,
     "caption": "Neutral colors, lightest to darkest",
     "cols": [
      "HEX",
      "CMYK"
     ],
     "rows": [
      {
       "chip": "var(--uiowa-color-neutral-0)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 0",
       "cells": [
        "<code>#FFFFFF</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-100)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 100",
       "cells": [
        "<code>#F3F3F3</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-150)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 150",
       "cells": [
        "<code>#EAEBEC</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-175)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 175",
       "cells": [
        "<code>#D8DADC</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-200)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 200",
       "cells": [
        "<code>#BCBEC0</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-300)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 300",
       "cells": [
        "<code>#8D9094</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-400)",
       "aa": "<span class=\"csw-aa\" style=\"color:#000\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 400",
       "cells": [
        "<code>#777A7F</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-500)",
       "aa": "<span class=\"csw-aa\" style=\"color:#fff\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 500",
       "cells": [
        "<code>#63666A</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-700)",
       "aa": "<span class=\"csw-aa\" style=\"color:#fff\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 700",
       "cells": [
        "<code>#33363A</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-800)",
       "aa": "<span class=\"csw-aa\" style=\"color:#fff\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 800",
       "cells": [
        "<code>#232527</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-neutral-900)",
       "aa": "<span class=\"csw-aa\" style=\"color:#fff\" aria-hidden=\"true\">Aa</span>",
       "name": "Neutral 900",
       "cells": [
        "<code>#000000</code>",
        "<code>Pending</code>"
       ]
      }
     ]
    }
   ],
   "wtu": [
    "Text and type hierarchy",
    "Page, section, and component backgrounds",
    "Borders, dividers, table rows, and interface structure",
    "Disabled, inactive, or secondary controls",
    "Light and dark mode foundations",
    "Presentation backgrounds, gridlines, and chart structure"
   ],
   "dv": "",
   "examples": [
    {
     "kind": "do",
     "img": "colors-neutral-colors-do-1.png",
     "caption": "Use black text on light neutral backgrounds."
    },
    {
     "kind": "do",
     "img": "colors-neutral-colors-do-2.png",
     "caption": "Use light neutrals for backgrounds, rows, and dividers. Use darker neutrals to create structure."
    },
    {
     "kind": "do",
     "img": "colors-neutral-colors-do-3.png",
     "caption": "Use white text on dark neutral backgrounds."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "colors-neutral-colors-dont-1.png",
     "caption": "Don’t place gold over light neutral backgrounds. Gold does not have enough contrast and does not meet accessibility standards."
    },
    {
     "kind": "dont",
     "img": "colors-neutral-colors-dont-2.png",
     "caption": "Don’t use light neutrals for text on light backgrounds. The low contrast makes text hard to read."
    },
    {
     "kind": "dont",
     "img": "colors-neutral-colors-dont-3.png",
     "caption": "Don’t use mid-tone neutrals for text on dark backgrounds. The low contrast makes text hard to read."
    }
   ]
  },
  {
   "id": "accent-colors",
   "title": "Accent colors",
   "intro": [
    "Accent colors add emphasis, create visual distinction, and draw attention to key details. Use them on small, intentional elements rather than across large areas or as the primary color of a layout.",
    "Accent colors work best when used sparingly. If a layout relies on repeated accents to make important information stand out, strengthen the hierarchy, spacing, or copy before adding more color."
   ],
   "tables": [
    {
     "sub": null,
     "caption": "Accent colors: HEX and CMYK values",
     "cols": [
      "HEX",
      "CMYK"
     ],
     "rows": [
      {
       "chip": "var(--uiowa-color-accent-blue)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#000\">Aa</span>",
       "name": "Blue",
       "cells": [
        "<code>#588DD6</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-accent-teal)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#000\">Aa</span>",
       "name": "Teal",
       "cells": [
        "<code>#06967E</code>",
        "<code>84 3 56 9</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-accent-orange)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#000\">Aa</span>",
       "name": "Orange",
       "cells": [
        "<code>#E16822</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-accent-magenta)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#000\">Aa</span>",
       "name": "Magenta",
       "cells": [
        "<code>#CE68AC</code>",
        "<code>Pending</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-accent-ochre)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#000\">Aa</span>",
       "name": "Ochre",
       "cells": [
        "<code>#B98100</code>",
        "<code>Pending</code>"
       ]
      }
     ]
    },
    {
     "sub": "Hyperlink colors",
     "caption": "Hyperlink colors: HEX value and where each is used",
     "cols": [
      "HEX",
      "Use"
     ],
     "rows": [
      {
       "chip": "var(--uiowa-color-link-default)",
       "aa": "",
       "name": "Hyperlink",
       "cells": [
        "<code>#2C6ECA</code>",
        "Light backgrounds"
       ]
      },
      {
       "chip": "var(--uiowa-color-link-inverse)",
       "aa": "",
       "name": "Hyperlink on dark",
       "cells": [
        "<code>#588DD6</code>",
        "Dark backgrounds"
       ]
      }
     ]
    }
   ],
   "wtu": [
    "Calls to action and links within approved styles",
    "Key details that need added visibility or distinction",
    "Font Awesome icons and interface icons",
    "Badges, tags, and other small, contained components",
    "Fills and supporting graphic elements used in limited areas",
    "Functional states or interactions defined by a component"
   ],
   "dv": "Creating charts, graphs, or maps? Data visualization has its own expanded palette and guidance. <a href=\"https://uids.brand.uiowa.edu/branches/docs-site-trial/data-visualization.html\">View data visualization guidelines</a>",
   "examples": [
    {
     "kind": "do",
     "img": "colors-accent-colors-do-1.png",
     "caption": "Keep accent colors to no more than 10% of a layout. Use primary colors and neutrals for larger areas so black and gold remain prominent."
    },
    {
     "kind": "do",
     "img": "colors-accent-colors-do-2.png",
     "caption": "Check contrast before placing text on an accent-colored background. Use black text only on the accent colors."
    },
    {
     "kind": "do",
     "img": "colors-accent-colors-do-3.png",
     "caption": "Links may use the approved blue style but should always be underlined."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "colors-accent-colors-dont-1.png",
     "caption": "Do not place accent colors directly against Iowa gold. The combination can make both colors harder to distinguish and reduce brand recognition."
    },
    {
     "kind": "dont",
     "img": "colors-accent-colors-dont-2.png",
     "caption": "Do not use accent colors for headlines, labels, body copy, or other text."
    },
    {
     "kind": "dont",
     "img": "colors-accent-colors-dont-3.png",
     "caption": "Do not use an accent color as the primary or identifying color for a college, school, center, institute, department, unit, or campaign. Keep these identities anchored in black and gold."
    }
   ]
  },
  {
   "id": "status-colors",
   "title": "Status colors",
   "intro": [
    "Status colors communicate widely recognized meanings such as state, risk, safety, information, or required action. They apply familiar associations from safety, signage, wayfinding, status indicators, and everyday use.",
    "Color is never the only signal. Every status needs a word, and ideally an icon, that says what happened and what to do next. The message should still work for someone who can’t see the color."
   ],
   "tables": [
    {
     "sub": null,
     "caption": "Status colors: meaning, color and surface values",
     "cols": [
      "Meaning",
      "Color",
      "Surface"
     ],
     "rows": [
      {
       "chip": "var(--uiowa-color-info)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#fff;display:flex;align-items:center;gap:.4rem\">Aa<i class=\"fa-solid fa-circle-info\" style=\"font-size:.9em\" aria-hidden=\"true\"></i></span>",
       "name": "Info",
       "cells": [
        "<p class=\"cl-meaning\">Helpful or explanatory information that is not urgent.</p><p class=\"cl-uses\"><span>Common uses</span>Notices, instructions, wayfinding information, system messages, and informational signs</p>",
        "<code>#2C6ECA</code>",
        "<span class=\"cl-mini\" style=\"background:var(--uiowa-color-info-surface)\" aria-hidden=\"true\"></span><code>#EDF4FE</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-success)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#fff;display:flex;align-items:center;gap:.4rem\">Aa<i class=\"fa-solid fa-circle-check\" style=\"font-size:.9em\" aria-hidden=\"true\"></i></span>",
       "name": "Success",
       "cells": [
        "<p class=\"cl-meaning\">Completion, approval, availability, or a positive condition.</p><p class=\"cl-uses\"><span>Common uses</span>Confirmations, passed checks, completed steps, and available or open states</p>",
        "<code>#0E6B4D</code>",
        "<span class=\"cl-mini\" style=\"background:var(--uiowa-color-success-surface)\" aria-hidden=\"true\"></span><code>#E8F6F0</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-warning)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#fff;display:flex;align-items:center;gap:.4rem\">Aa<i class=\"fa-solid fa-triangle-exclamation\" style=\"font-size:.9em\" aria-hidden=\"true\"></i></span>",
       "name": "Warning",
       "cells": [
        "<p class=\"cl-meaning\">Caution, a potential problem, or the need for attention.</p><p class=\"cl-uses\"><span>Common uses</span>Warning signs, pending issues, restricted conditions, and caution messages</p>",
        "<code>#8B6B13</code>",
        "<span class=\"cl-mini\" style=\"background:var(--uiowa-color-warning-surface)\" aria-hidden=\"true\"></span><code>#FBF3DC</code>"
       ]
      },
      {
       "chip": "var(--uiowa-color-danger)",
       "aa": "<span class=\"csw-aa\" aria-hidden=\"true\" style=\"color:#fff;display:flex;align-items:center;gap:.4rem\">Aa<i class=\"fa-solid fa-circle-exclamation\" style=\"font-size:.9em\" aria-hidden=\"true\"></i></span>",
       "name": "Danger",
       "cells": [
        "<p class=\"cl-meaning\">Immediate risk, prohibition, failure, or required intervention.</p><p class=\"cl-uses\"><span>Common uses</span>Hazards, stop messages, emergency information, critical errors, and prohibited actions</p>",
        "<code>#C0392B</code>",
        "<span class=\"cl-mini\" style=\"background:var(--uiowa-color-danger-surface)\" aria-hidden=\"true\"></span><code>#FFEFF0</code>"
       ]
      }
     ]
    }
   ],
   "wtu": [],
   "dv": "",
   "examples": [
    {
     "kind": "do",
     "img": "colors-status-colors-do-1.png",
     "caption": "Use status colors only when they communicate a familiar, widely recognized meaning, such as status, risk, safety, information, identification, or required action."
    },
    {
     "kind": "do",
     "img": "colors-status-colors-do-2.png",
     "caption": "Give every status a word that says what happened and, when action is needed, what to do next. Add an icon so it can be scanned quickly."
    },
    {
     "kind": "do",
     "img": "colors-status-colors-do-3.png",
     "caption": "Use each status color sparingly and only for its assigned meaning so it remains recognizable across applications."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "colors-status-colors-dont-1.png",
     "caption": "Don’t rely on color alone to communicate status. A colored dot doesn’t say what’s wrong or what to do, and it disappears for people with color vision deficiencies, screen reader users, and grayscale print."
    },
    {
     "kind": "dont",
     "img": "colors-status-colors-dont-2.png",
     "caption": "Don’t use status colors for decoration or emphasis outside their assigned meanings."
    },
    {
     "kind": "dont",
     "img": "colors-status-colors-dont-3.png",
     "caption": "Don’t swap meanings, such as using success green for a warning."
    }
   ]
  }
 ],
 "use": {
  "title": "Use in your work",
  "intro": "Swatches, values and code for the color system, built from the same approved decisions on this page.",
  "tabs": [
   "Downloads",
   "Code",
   "Markdown"
  ],
  "downloads": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "code": ":root {\n      --uiowa-color-brand-gold:  #ffcd00;\n      --uiowa-color-brand-black: #000000;\n      --uiowa-color-neutral-100: #f3f3f3;\n      --uiowa-color-accent-teal: #06967e;\n      --uiowa-color-info:        #2c6eca;\n      --uiowa-color-info-surface: #edf4fe;\n    }"
 }
};

// The accordion takes its content as HTML, so the example cards use the Card markup directly.
const examplesHtml = (examples) => '<div class="list-container grid--threecol--33-34-33 grid--gap__sm cl-ex-grid"><div class="list-container__inner">' +
  examples.map((e) => e.break
    ? '<div class="tg-break" aria-hidden="true"></div>'
    : `<div class="grid__column"><div class="card">
        <div class="media media--no-crop"><div class="media__inner"><img src="${imageUrl(e.img)}" alt="" width="280" height="230" loading="lazy"></div></div>
        <div class="card__body"><div class="card__pre-title mk-${e.kind}"><i class="fa-solid ${e.kind === 'do' ? 'fa-circle-check' : 'fa-circle-xmark'}" aria-hidden="true"></i>${e.kind === 'do' ? 'Do' : 'Don’t'}</div><p>${e.caption}</p></div>
      </div></div>`).join('') + '</div></div>';

// Page-only glue: the sample chips, the mono values, the Do / Don't pre-title at full strength,
// and the accordion's 1.3rem paragraph size kept off the cards inside it.
const css = `
.cl-page { padding-bottom: 4rem; }
.cl-page .cl-actions { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0 2.5rem; }
.cl-page .cl-actions .bttn i:first-child { margin-right: .5em; }   /* the 10-30 page story's gap between icon and label */
.cl-page .cl-actions .cl-md-status { align-self: center; font-weight: 500; }
.cl-page .cl-section { margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid var(--uiowa-color-neutral-175); }
.cl-page .cl-strip { display: flex; width: 100%; height: 6rem; }
.cl-page .cl-strip i { flex: 1; }
.cl-page .grid--gap__sm .list-container__inner { row-gap: var(--uiowa-space-125); }
.cl-page .cl-intro-cards { margin-top: 1.5rem; }
.cl-page .cl-intro-cards .card { height: 100%; }
.cl-page .cl-intro-cards .card__body p { margin: 0; }
.cl-page .cl-label { margin: 2.5rem 0 1rem; font: var(--uiowa-typography-label-large-font-weight) var(--uiowa-typography-label-large-font-size) / var(--uiowa-typography-label-large-line-height) var(--uiowa-typography-label-large-font-family); letter-spacing: .06em; text-transform: uppercase; }   /* the docs page's .ty-label: Label Large, uppercase */
.cl-page .cl-label.cl-sub { margin: 2rem 0 .75rem; }
.cl-page .cl-wtu { padding-bottom: 1.5rem; }
.cl-page .cl-wtu .cl-label { margin: 0 0 1rem; }
.cl-page .cl-wtu ul { margin: 0; padding-left: 1.25em; }
.cl-page .cl-wtu li { margin: 0 0 .6rem; font: var(--uiowa-typography-body-small-font-weight) var(--uiowa-typography-body-small-font-size) / var(--uiowa-typography-body-small-line-height) var(--uiowa-typography-body-small-font-family); letter-spacing: var(--uiowa-typography-body-small-letter-spacing); }
.cl-page .cl-dv { margin-top: 1.5rem; }
.cl-page .cl-dv p { margin: 0; }
.cl-page .table-responsive { margin-top: 1.5rem; }
.cl-page td.cl-chip { width: 4.5rem; min-width: 4.5rem; padding: .5rem .6rem; vertical-align: bottom; box-shadow: inset 0 0 0 1px var(--uiowa-color-neutral-150); }
.cl-page .csw-aa { font: 600 .9375rem / 1 var(--uiowa-typography-font-family-roboto); }
.cl-page .table code { padding: 0; border: 0; background: none; color: inherit; font-size: .8125rem; white-space: nowrap; }
.cl-page .cl-mini { display: inline-block; width: 1rem; height: 1rem; margin-right: .45rem; vertical-align: -.15rem; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .12); }
.cl-page .cl-meaning { margin: 0; font-size: .9375rem; line-height: 1.45; }
.cl-page .cl-uses { margin: .35rem 0 0; color: var(--uiowa-color-neutral-500); font-size: .8125rem; line-height: 1.45; }
.cl-page .cl-uses span { margin-right: .25rem; font-size: .625rem; letter-spacing: .04em; text-transform: uppercase; }
.cl-page .accordion .card p { margin: 0; font-size: 1rem; line-height: 1.5; }
.cl-page .card__pre-title { font: 600 .875rem / 1.2 var(--uiowa-typography-font-family-roboto); opacity: 1; }
.cl-page .card__pre-title i { margin-right: .35em; }
.cl-page .card__pre-title.mk-do { color: var(--uiowa-color-success); }
.cl-page .card__pre-title.mk-dont { color: var(--uiowa-color-danger); }
.cl-page .tg-break { grid-column: 1 / -1; height: 0; margin: 0; padding: 0; }
.cl-page .cl-ex-grid .media img { width: 100%; height: auto; }
.cl-page .cl-use { margin-top: 4rem; padding: 2.5rem 1.5rem 1.5rem; background: var(--uiowa-color-neutral-100); }
.cl-page .cl-use [role="tabpanel"] { padding-top: 2rem; }
.cl-page .cl-use pre { margin: 0; padding: 1rem 1.25rem; background: #fff; border: 1px solid var(--uiowa-color-neutral-175); overflow: auto; white-space: pre-wrap; font-size: .8125rem; line-height: 1.5; }
`;

export default {
  title: 'Showcase/Color page',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { source: { code: null } } },
};

export const Default = {
  render: () => ({
    components: { DocsFrame, UidsAccordion, UidsButton, UidsCallout, UidsCard, UidsGrid, UidsGridItem, UidsHeadline, UidsTabs, UidsTable },
    setup() {
      onMounted(() => {
        if (!document.getElementById('cl-page-css')) { const s = document.createElement('style'); s.id = 'cl-page-css'; s.textContent = css; document.head.appendChild(s); }
      });
      const accordionItems = (s) => [{ id: `${s.id}-examples`, title: 'Examples', content: examplesHtml(s.examples) }];
      const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const useTabs = [
        { title: page.use.tabs[0], content: `<p>${esc(page.use.downloads)}</p>` },
        { title: page.use.tabs[1], content: `<pre><code>${page.use.code}</code></pre>` },
        { title: page.use.tabs[2], content: `<p class="cl-actions"><button type="button" class="bttn bttn--light-font bttn--tertiary bttn--small" data-copy-md><i class="fa-regular fa-copy" aria-hidden="true"></i>${esc(page.md_copy)}</button><span class="cl-md-status" role="status"></span></p><pre><code>${esc(colorsMd)}</code></pre>` },
      ];
      // Copy for LLM, in the Markdown tab: copies the text shown there, as the docs page does.
      const copyText = (text) => navigator.clipboard.writeText(text).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        if (!ok) throw new Error('copy failed');
      });
      onMounted(() => {
        document.querySelectorAll('[data-copy-md]').forEach((btn) => {
          const say = (t) => { btn.nextElementSibling.textContent = t; };
          btn.addEventListener('click', () => {
            say('');
            copyText(colorsMd).then(() => say('Copied.'), () => say('Could not copy. Select the Markdown below and copy it.'));
          });
        });
      });
      return { page, useTabs, accordionItems };
    },
    template: `
      <docs-frame current="Color" :crumbs="page.crumbs">
        <div class="cl-page">
          <uids-headline level="h1">Color</uids-headline>
          <p v-html="page.lede"></p>
          <div class="cl-actions">
            <uids-button v-for="b in page.buttons" :key="b.label" :url="b.url" color="tertiary" size="small" :light_font="true"><i :class="b.icon" aria-hidden="true"></i>{{ b.label }}</uids-button>
          </div>

          <uids-headline level="h2">{{ page.palettes.title }}</uids-headline>
          <p v-html="page.palettes.intro"></p>
          <div class="cl-intro-cards">
            <uids-grid type="twocol--50-50">
              <uids-grid-item v-for="c in page.cards" :key="c.name">
                <uids-card :url="c.href">
                  <template #media><div class="cl-strip" aria-hidden="true"><i v-for="(bg, i) in c.strip" :key="i" :style="{ background: bg }"></i></div></template>
                  <template #title>{{ c.name }}</template>
                  <p v-html="c.role"></p>
                </uids-card>
              </uids-grid-item>
            </uids-grid>
          </div>

          <section v-for="s in page.sections" :key="s.id" :id="s.id" class="cl-section">
            <uids-headline level="h2">{{ s.title }}</uids-headline>
            <p v-for="(p, i) in s.intro" :key="i" v-html="p"></p>
            <uids-grid v-if="s.wtu.length" type="twocol--67-33">
              <uids-grid-item>
                <template v-for="t in s.tables" :key="t.caption">
                  <p v-if="t.sub" class="cl-label cl-sub">{{ t.sub }}</p>
                  <uids-table :caption="t.caption" :caption_hidden="true" variant="minimal">
                    <template #thead><tr><th scope="col">Sample</th><th scope="col">Name</th><th v-for="c in t.cols" :key="c" scope="col">{{ c }}</th></tr></template>
                    <template #tbody><tr v-for="r in t.rows" :key="r.name"><td class="cl-chip" :style="{ background: r.chip }" v-html="r.aa"></td><th scope="row">{{ r.name }}</th><td v-for="(c, i) in r.cells" :key="i" v-html="c"></td></tr></template>
                  </uids-table>
                </template>
                <uids-card v-if="s.dv" class="cl-dv"><p v-html="s.dv"></p></uids-card>
              </uids-grid-item>
              <uids-grid-item>
                <uids-callout background="gray" class="cl-wtu">
                  <h3 class="cl-label">When to use</h3>
                  <ul><li v-for="(i, n) in s.wtu" :key="n" v-html="i"></li></ul>
                </uids-callout>
              </uids-grid-item>
            </uids-grid>
            <template v-else>
              <template v-for="t in s.tables" :key="t.caption">
                <p v-if="t.sub" class="cl-label cl-sub">{{ t.sub }}</p>
                <uids-table :caption="t.caption" :caption_hidden="true" variant="minimal">
                  <template #thead><tr><th scope="col">Sample</th><th scope="col">Name</th><th v-for="c in t.cols" :key="c" scope="col">{{ c }}</th></tr></template>
                  <template #tbody><tr v-for="r in t.rows" :key="r.name"><td class="cl-chip" :style="{ background: r.chip }" v-html="r.aa"></td><th scope="row">{{ r.name }}</th><td v-for="(c, i) in r.cells" :key="i" v-html="c"></td></tr></template>
                </uids-table>
              </template>
            </template>
            <p class="cl-label">Guidance</p>
            <uids-accordion label_color="white" heading_level="h3" :items="accordionItems(s)" />
          </section>

          <section id="use-in-your-work" class="cl-use">
            <uids-headline level="h2">{{ page.use.title }}</uids-headline>
            <p v-html="page.use.intro"></p>
            <uids-tabs id="use-tabs" aria_label="Use in your work" :items="useTabs" :selected="1" />
          </section>
        </div>
      </docs-frame>
    `,
  }),
};
