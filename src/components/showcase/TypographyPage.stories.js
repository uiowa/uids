// Generated from docs/site/typography.html by .claude/uids-components-2026-11-10/build_typography_story.py:
// the Typography page on the real components. Edit the page or the generator, not this file.
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
import typographyMd from '../../../docs/site/typography.md?raw';

const exampleImages = import.meta.glob('../../../docs/site/images/examples/typography-*.png', { eager: true, query: '?url', import: 'default' });
const imageUrl = (name) => exampleImages[`../../../docs/site/images/examples/${name}`] || '';
const brandIcons = import.meta.glob('../../../docs/site/images/brand-icons/*.svg', { eager: true, query: '?url', import: 'default' });
const iconUrl = (name) => brandIcons[`../../../docs/site/images/brand-icons/${name}`] || '';

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
   "text": "Typography"
  }
 ],
 "lede": "Iowa brand fonts reflect our personality and reinforce our identity. Together, they create a cohesive typography system that supports brand recognition across print and digital communications.",
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
 "before": {
  "icon": "warning-two-color.svg",
  "title": "Before you start",
  "text": "<strong>Only approved brand fonts are permitted in marketing and communications materials.</strong> To install these fonts on university computers, open the Self-Service application on your desktop. Once the app has launched, search “University Brand Fonts” and click “Install.” Once complete, fonts should appear in your font dropdown menus. Downloads of each font are also provided below if needed."
 },
 "fonts": {
  "title": "Use fonts intentionally",
  "intro": "Each font serves a distinct purpose within our typography system. Understanding these roles helps you use fonts consistently across different applications. Many brand templates and tools already include approved font styles to make this easier."
 },
 "cards": [
  {
   "href": "#special-gothic-condensed",
   "name": "Special Gothic Condensed",
   "role": "Promotional, bold, attention-getting"
  },
  {
   "href": "#roboto",
   "name": "Roboto",
   "role": "Functional, everyday, readable"
  },
  {
   "href": "#zilla-slab",
   "name": "Zilla Slab",
   "role": "Warm, editorial, publication-like"
  },
  {
   "href": "#lora",
   "name": "Lora",
   "role": "Formal, traditional, ceremonial or institutional"
  }
 ],
 "sections": [
  {
   "id": "special-gothic-condensed",
   "title": "Special Gothic Condensed",
   "titleStyle": "font-family:var(--uiowa-typography-font-family-special-gothic-condensed);font-weight:600",
   "intro": "Special Gothic Condensed is a tall, condensed typeface that creates strong visual presence. Its bold character adds emphasis and impact, helping important messages and information stand out.",
   "specimen": "<div class=\"spX\" style=\"font-family:var(--uiowa-typography-font-family-special-gothic-condensed)\"><p class=\"ty-label\">Weights</p><p class=\"spX-alpha\" style=\"font-weight:400\">Aa<wbr>Bb<wbr>Cc<wbr>Dd<wbr>Ee<wbr>Ff<wbr>Gg<wbr>Hh<wbr>Ii<wbr>Jj<wbr>Kk<wbr>Ll<wbr>Mm<wbr>Nn<wbr>Oo<wbr>Pp<wbr>Qq<wbr>Rr<wbr>Ss<wbr>Tt<wbr>Uu<wbr>Vv<wbr>Ww<wbr>Xx<wbr>Yy<wbr>Zz<wbr>0123456789</p><ul class=\"spX-w\"><li style=\"font-weight:400\">Special Gothic Condensed Regular</li><li style=\"font-weight:500\">Special Gothic Condensed Medium</li><li style=\"font-weight:600\">Special Gothic Condensed SemiBold</li><li style=\"font-weight:700\">Special Gothic Condensed Bold</li></ul></div>",
   "action": {
    "url": "https://github.com/AlistairMcCready/Special-Gothic",
    "label": "Get Special Gothic Condensed"
   },
   "wtu": [
    "Headlines and titles in promotional communications",
    "Callouts and key messages",
    "Eyebrows and labels",
    "Facts, rankings, and statistics",
    "Other concise text that needs to stand out"
   ],
   "examples": [
    {
     "kind": "do",
     "img": "typography-special-gothic-condensed-do-1.png",
     "caption": "Keep headlines and display text concise."
    },
    {
     "kind": "do",
     "img": "typography-special-gothic-condensed-do-2.png",
     "caption": "Create emphasis through size and weight."
    },
    {
     "kind": "do",
     "img": "typography-special-gothic-condensed-do-3.png",
     "caption": "Only use all caps for short headlines or display text of 1–5 words when you need to create emphasis."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "typography-special-gothic-condensed-dont-1.png",
     "caption": "Never use Special Gothic Condensed for body copy, long passages, or text that requires sustained reading."
    },
    {
     "kind": "dont",
     "img": "typography-special-gothic-condensed-dont-2.png",
     "caption": "Don’t add artificial italics, stretch, skew, or further condense the letterforms."
    },
    {
     "kind": "dont",
     "img": "typography-special-gothic-condensed-dont-3.png",
     "caption": "Don’t use Special Gothic Condensed for small text such as captions, credits, or fine print."
    }
   ]
  },
  {
   "id": "roboto",
   "title": "Roboto",
   "titleStyle": "font-family:var(--uiowa-typography-font-family-roboto);font-weight:700",
   "intro": "Roboto is our functional typeface. It is clean, neutral, and easy to read across a wide range of sizes. It offers a broad range of weights and styles that makes it highly versatile across print and digital communications.",
   "specimen": "<div class=\"spX\" style=\"font-family:var(--uiowa-typography-font-family-roboto)\"><p class=\"ty-label\">Weights and styles</p><p class=\"spX-alpha\" style=\"font-weight:400\">Aa<wbr>Bb<wbr>Cc<wbr>Dd<wbr>Ee<wbr>Ff<wbr>Gg<wbr>Hh<wbr>Ii<wbr>Jj<wbr>Kk<wbr>Ll<wbr>Mm<wbr>Nn<wbr>Oo<wbr>Pp<wbr>Qq<wbr>Rr<wbr>Ss<wbr>Tt<wbr>Uu<wbr>Vv<wbr>Ww<wbr>Xx<wbr>Yy<wbr>Zz<wbr>0123456789</p><ul class=\"spX-w\"><li style=\"font-weight:100\">Roboto Thin<i>Italic</i></li><li style=\"font-weight:300\">Roboto Light<i>Italic</i></li><li style=\"font-weight:400\">Roboto Regular<i>Italic</i></li><li style=\"font-weight:500\">Roboto Medium<i>Italic</i></li><li style=\"font-weight:700\">Roboto Bold<i>Italic</i></li><li style=\"font-weight:900\">Roboto Black<i>Italic</i></li></ul></div>",
   "action": {
    "url": "https://fonts.google.com/specimen/Roboto",
    "label": "Download Roboto"
   },
   "wtu": [
    "Body text and long passages",
    "Captions and explanatory text",
    "Interface labels, controls, and forms",
    "Email and everyday documents",
    "Tables, labels, and dense layouts"
   ],
   "examples": [
    {
     "kind": "do",
     "img": "typography-roboto-do-1.png",
     "caption": "Use Roboto as the standard for body text and functional information."
    },
    {
     "kind": "do",
     "img": "typography-roboto-do-2.png",
     "caption": "Use Roboto for interface labels, controls, and forms."
    },
    {
     "kind": "do",
     "img": "typography-roboto-do-3.png",
     "caption": "Use Roboto Thin and Light only at large sizes. At small sizes they become faint and hard to read."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "typography-roboto-dont-1.png",
     "caption": "Don’t set paragraphs or longer passages of Roboto in all caps."
    },
    {
     "kind": "dont",
     "img": "typography-roboto-dont-2.png",
     "caption": "Don’t use Roboto for formal or ceremonial titles. Use Lora instead."
    },
    {
     "kind": "dont",
     "img": "typography-roboto-dont-3.png",
     "caption": "Don’t use Roboto Black for paragraphs. Reserve it for short, high-impact text."
    }
   ]
  },
  {
   "id": "zilla-slab",
   "title": "Zilla Slab",
   "titleStyle": "font-family:var(--uiowa-typography-font-family-zilla-slab);font-weight:600",
   "intro": "Zilla Slab adds warmth and contrast to the typography system. Its distinctive serif letterforms are well suited for editorial communications, while offering flexibility to lead or support other brand fonts.",
   "specimen": "<div class=\"spX\" style=\"font-family:var(--uiowa-typography-font-family-zilla-slab)\"><p class=\"ty-label\">Weights and styles</p><p class=\"spX-alpha\" style=\"font-weight:400\">Aa<wbr>Bb<wbr>Cc<wbr>Dd<wbr>Ee<wbr>Ff<wbr>Gg<wbr>Hh<wbr>Ii<wbr>Jj<wbr>Kk<wbr>Ll<wbr>Mm<wbr>Nn<wbr>Oo<wbr>Pp<wbr>Qq<wbr>Rr<wbr>Ss<wbr>Tt<wbr>Uu<wbr>Vv<wbr>Ww<wbr>Xx<wbr>Yy<wbr>Zz<wbr>0123456789</p><ul class=\"spX-w\"><li style=\"font-weight:300\">Zilla Slab Light<i>Italic</i></li><li style=\"font-weight:400\">Zilla Slab Regular<i>Italic</i></li><li style=\"font-weight:500\">Zilla Slab Medium<i>Italic</i></li><li style=\"font-weight:600\">Zilla Slab SemiBold<i>Italic</i></li><li style=\"font-weight:700\">Zilla Slab Bold<i>Italic</i></li></ul></div>",
   "action": {
    "url": "https://fonts.google.com/specimen/Zilla+Slab",
    "label": "Download Zilla Slab"
   },
   "wtu": [
    "Headlines for feature stories and profiles",
    "Subheads and introductory or lead-in text",
    "Pull quotes",
    "Select section labels",
    "Other moments where a warmer, more editorial tone is useful"
   ],
   "examples": [
    {
     "kind": "do",
     "img": "typography-zilla-slab-do-1.png",
     "caption": "Use Zilla Slab to support other brand fonts or as a primary typeface in editorial communications."
    },
    {
     "kind": "do",
     "img": "typography-zilla-slab-do-2.png",
     "caption": "Use Zilla Slab at headline and subhead sizes, not in captions or small labels. Its slab serifs fill in at small sizes."
    },
    {
     "kind": "do",
     "img": "typography-zilla-slab-do-3.png",
     "caption": "Use Zilla Slab to add warmth to pieces that would otherwise feel purely functional, such as reports and data summaries."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "typography-zilla-slab-dont-1.png",
     "caption": "Don’t use Zilla Slab for body text. Its heavier serifs can make longer passages harder to read."
    },
    {
     "kind": "dont",
     "img": "typography-zilla-slab-dont-2.png",
     "caption": "Don’t use Zilla Slab for promotional, attention-getting headlines. That’s the role of Special Gothic Condensed."
    },
    {
     "kind": "dont",
     "img": "typography-zilla-slab-dont-3.png",
     "caption": "Don’t set Zilla Slab in all caps. Its heavy serifs make all-caps text dense and harder to read."
    }
   ]
  },
  {
   "id": "lora",
   "title": "Lora",
   "titleStyle": "font-family:var(--uiowa-typography-font-family-lora);font-weight:400",
   "intro": "Lora is our more traditional serif typeface reserved for formal and ceremonial communications. Its refined letterforms give these materials a polished appearance while maintaining strong readability.",
   "specimen": "<div class=\"spX\" style=\"font-family:var(--uiowa-typography-font-family-lora)\"><p class=\"ty-label\">Weights and styles</p><p class=\"spX-alpha\" style=\"font-weight:400\">Aa<wbr>Bb<wbr>Cc<wbr>Dd<wbr>Ee<wbr>Ff<wbr>Gg<wbr>Hh<wbr>Ii<wbr>Jj<wbr>Kk<wbr>Ll<wbr>Mm<wbr>Nn<wbr>Oo<wbr>Pp<wbr>Qq<wbr>Rr<wbr>Ss<wbr>Tt<wbr>Uu<wbr>Vv<wbr>Ww<wbr>Xx<wbr>Yy<wbr>Zz<wbr>0123456789</p><ul class=\"spX-w\"><li style=\"font-weight:400\">Lora Regular<i>Italic</i></li><li style=\"font-weight:500\">Lora Medium<i>Italic</i></li><li style=\"font-weight:600\">Lora SemiBold<i>Italic</i></li><li style=\"font-weight:700\">Lora Bold<i>Italic</i></li></ul></div>",
   "action": {
    "url": "https://fonts.google.com/specimen/Lora",
    "label": "Download Lora"
   },
   "wtu": [
    "Headlines and titles for formal events, ceremonies, awards, and invitations",
    "Subheads and introductory or lead-in text in formal pieces",
    "Formal tributes, citations, and quotes",
    "Names and titles on certificates and ceremonial programs",
    "Other moments where a formal, traditional tone is useful"
   ],
   "examples": [
    {
     "kind": "do",
     "img": "typography-lora-do-1.png",
     "caption": "Reserve Lora for communications with a clear formal or ceremonial purpose."
    },
    {
     "kind": "do",
     "img": "typography-lora-do-2.png",
     "caption": "Use Lora for prominent titles and shorter passages of text."
    },
    {
     "kind": "do",
     "img": "typography-lora-do-3.png",
     "caption": "Use italics to add contrast or emphasis to short passages and callouts."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "typography-lora-dont-1.png",
     "caption": "Don’t use Lora as decoration or to make routine pieces feel formal."
    },
    {
     "kind": "dont",
     "img": "typography-lora-dont-2.png",
     "caption": "Don’t use Lora for interface elements such as navigation, buttons, and forms."
    },
    {
     "kind": "dont",
     "img": "typography-lora-dont-3.png",
     "caption": "Don’t use Lora for long body text. Keep longer body text in Roboto."
    }
   ]
  },
  {
   "id": "font-awesome",
   "title": "Font Awesome icons",
   "titleStyle": "",
   "intro": "Font Awesome provides small, functional icons that support actions, information, and interface states. Use these icons minimally. For more expressive applications, use Iowa Brand Icons.",
   "specimen": "<div class=\"spX\"><p class=\"ty-label\">Styles</p><div class=\"faS-row\"><span class=\"nm\" style=\"font-weight:700\">Solid</span><span class=\"ic\"><i class=\"fa-solid fa-envelope\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-calendar\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-bell\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-user\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-star\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-comment\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-clock\" aria-hidden=\"true\"></i><i class=\"fa-solid fa-file\" aria-hidden=\"true\"></i><span class=\"sr-only\">envelope, calendar, bell, user, star, comment, clock, file</span></span></div><div class=\"faS-row\"><span class=\"nm\" style=\"font-weight:400\">Regular</span><span class=\"ic\"><i class=\"fa-regular fa-envelope\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-calendar\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-bell\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-user\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-star\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-comment\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-clock\" aria-hidden=\"true\"></i><i class=\"fa-regular fa-file\" aria-hidden=\"true\"></i><span class=\"sr-only\">envelope, calendar, bell, user, star, comment, clock, file</span></span></div><p class=\"faS-more\"><a href=\"#\">View all suggested icons</a></p></div>",
   "action": {
    "url": "https://fontawesome.com/icons",
    "label": "Use Font Awesome"
   },
   "wtu": [
    "Interface and navigation elements",
    "Social media platform icons",
    "Directional arrows and wayfinding cues",
    "Action icons paired with buttons or links"
   ],
   "examples": [
    {
     "kind": "do",
     "img": "typography-font-awesome-do-1.png",
     "caption": "Choose either Solid or Regular icons based on the level of emphasis needed and use that style consistently."
    },
    {
     "kind": "do",
     "img": "typography-font-awesome-do-2.png",
     "caption": "Keep icons smaller and less prominent than the text they support. As a starting point, size an icon to about 75% of the text line height, then adjust for visual balance."
    },
    {
     "kind": "do",
     "img": "typography-font-awesome-do-3.png",
     "caption": "Pair icons with visible text unless their meaning is widely understood. When text already explains the icon, hide it from screen readers to avoid repetition. When an icon appears alone, provide an accessible name and add a tooltip when helpful."
    },
    {
     "break": true
    },
    {
     "kind": "dont",
     "img": "typography-font-awesome-dont-1.png",
     "caption": "Don’t use Thin, Light, Duotone, Sharp, animated, or other specialty styles."
    },
    {
     "kind": "dont",
     "img": "typography-font-awesome-dont-2.png",
     "caption": "Don’t use Font Awesome as a substitute for Iowa brand icons in larger-scale or expressive applications."
    },
    {
     "kind": "dont",
     "img": "typography-font-awesome-dont-3.png",
     "caption": "Don’t mix Font Awesome with Iowa brand icons in the same set or row."
    }
   ]
  }
 ],
 "use": {
  "title": "Use in your work",
  "intro": "Fonts, styles and code for the typography system, built from the same approved decisions on this page.",
  "tabs": [
   "Downloads",
   "Code",
   "Markdown"
  ],
  "downloads": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "code": ":root {\n      --lorem-ipsum:  \"Dolor Sit\", sans-serif;\n      --consectetur:  \"Adipiscing\", sans-serif;\n      --sed-eiusmod:  \"Tempor\", serif;\n      --incididunt:   \"Labore\", serif;\n    }"
 }
};

const examplesHtml = (examples) => '<div class="list-container grid--threecol--33-34-33 grid--gap__sm ty-ex-grid"><div class="list-container__inner">' +
  examples.map((e) => e.break
    ? '<div class="tg-break" aria-hidden="true"></div>'
    : `<div class="grid__column"><div class="card">
        <div class="media media--no-crop"><div class="media__inner"><img src="${imageUrl(e.img)}" alt="" width="280" height="230" loading="lazy"></div></div>
        <div class="card__body"><div class="card__pre-title mk-${e.kind}"><i class="fa-solid ${e.kind === 'do' ? 'fa-circle-check' : 'fa-circle-xmark'}" aria-hidden="true"></i>${e.kind === 'do' ? 'Do' : 'Don’t'}</div><p>${e.caption}</p></div>
      </div></div>`).join('') + '</div></div>';

// Page-only glue: the specimens, the Do / Don't pre-title at full strength, the accordion's
// paragraph size kept off the cards inside it.
const css = `
.ty-page { padding-bottom: 4rem; }
.ty-page .ty-actions { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0 2.5rem; }
.ty-page .ty-actions .bttn i:first-child { margin-right: .5em; }   /* the 10-30 page story's gap between icon and label */
.ty-page .ty-actions .ty-md-status { align-self: center; font-weight: 500; }
.ty-page .ty-before { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); gap: 2rem; align-items: center; margin-bottom: 3rem; }
.ty-page .ty-before img { width: 5.5rem; height: 5.5rem; }
.ty-page .ty-before .ty-label { margin: 0 0 .5rem; }
.ty-page .ty-before p { margin: 0; }
.ty-page .ty-section { margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid var(--uiowa-color-neutral-175); }
.ty-page .ty-specimen-h { overflow-wrap: anywhere; }
.ty-page .ty-intro-cards { margin-top: 1.5rem; }
.ty-page .ty-intro-cards .card { height: 100%; }
.ty-page .ty-intro-cards .card__body p { margin: 0; }
.ty-page .grid--gap__sm .list-container__inner { row-gap: var(--uiowa-space-125); }
.ty-page .spX { margin: 2rem 0 1.5rem; }
.ty-page .spX .ty-label { margin: 0 0 .75rem; }
.ty-page .spX-alpha { margin: 0 0 1rem; font-family: inherit; font-size: 1.925rem; line-height: 1.15; letter-spacing: .005em; overflow-wrap: anywhere; }
.ty-page ul.spX-w { list-style: none; margin: 0; padding: 0; }
.ty-page .spX-w li { margin: 0; font-family: inherit; font-size: 1.2375rem; line-height: 1.45; }
.ty-page .spX-w i { margin-left: .6em; }
.ty-page #special-gothic-condensed .spX-alpha { font-size: 2.5rem; }
.ty-page #special-gothic-condensed .spX-w li { font-size: 1.6rem; line-height: 1.35; }
.ty-page .faS-row { display: flex; align-items: center; gap: 1.25rem; margin: 0 0 .6rem; }
.ty-page .faS-row .nm { width: 4.5rem; font: 400 1.2375rem / 1.3 var(--uiowa-typography-font-family-roboto); }
.ty-page .faS-row .ic { display: flex; flex-wrap: wrap; gap: 1.1rem; font-size: 1.5rem; }
.ty-page .faS-more { margin: .9rem 0 0; }
.ty-page .ty-action { margin: 1.5rem 0 0; }
.ty-page .ty-wtu { padding-bottom: 1.5rem; }
.ty-page .ty-wtu .ty-label { margin: 0 0 1rem; }
.ty-page .ty-wtu ul { margin: 0; padding-left: 1.25em; }
.ty-page .ty-wtu li { margin: 0 0 .6rem; font: var(--uiowa-typography-body-small-font-weight) var(--uiowa-typography-body-small-font-size) / var(--uiowa-typography-body-small-line-height) var(--uiowa-typography-body-small-font-family); letter-spacing: var(--uiowa-typography-body-small-letter-spacing); }
.ty-page .ty-label { margin: 2.5rem 0 1rem; font: var(--uiowa-typography-label-large-font-weight) var(--uiowa-typography-label-large-font-size) / var(--uiowa-typography-label-large-line-height) var(--uiowa-typography-label-large-font-family); letter-spacing: .06em; text-transform: uppercase; }   /* as the Color story's .cl-label */
.ty-page .accordion .card p { margin: 0; font-size: 1rem; line-height: 1.5; }
.ty-page .card__pre-title { font: 600 .875rem / 1.2 var(--uiowa-typography-font-family-roboto); opacity: 1; }
.ty-page .card__pre-title i { margin-right: .35em; }
.ty-page .card__pre-title.mk-do { color: var(--uiowa-color-success); }
.ty-page .card__pre-title.mk-dont { color: var(--uiowa-color-danger); }
.ty-page .tg-break { grid-column: 1 / -1; height: 0; margin: 0; padding: 0; }
.ty-page .ty-ex-grid .media img { width: 100%; height: auto; }
.ty-page .ty-use { margin-top: 4rem; padding: 2.5rem 1.5rem 1.5rem; background: var(--uiowa-color-neutral-100); }
.ty-page .ty-use [role="tabpanel"] { padding-top: 2rem; }
.ty-page .ty-use pre { margin: 0; padding: 1rem 1.25rem; background: #fff; border: 1px solid var(--uiowa-color-neutral-175); overflow: auto; white-space: pre-wrap; font-size: .8125rem; line-height: 1.5; }
`;

export default {
  title: 'Showcase/Typography page',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { source: { code: null } } },
};

export const Default = {
  render: () => ({
    components: { DocsFrame, UidsAccordion, UidsButton, UidsCallout, UidsCard, UidsGrid, UidsGridItem, UidsHeadline, UidsTabs },
    setup() {
      onMounted(() => {
        if (!document.getElementById('ty-page-css')) { const s = document.createElement('style'); s.id = 'ty-page-css'; s.textContent = css; document.head.appendChild(s); }
      });
      const accordionItems = (s) => [{ id: `${s.id}-examples`, title: 'Examples', content: examplesHtml(s.examples) }];
      const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const useTabs = [
        { title: page.use.tabs[0], content: `<p>${esc(page.use.downloads)}</p>` },
        { title: page.use.tabs[1], content: `<pre><code>${page.use.code}</code></pre>` },
        { title: page.use.tabs[2], content: `<p class="ty-actions"><button type="button" class="bttn bttn--light-font bttn--tertiary bttn--small" data-copy-md><i class="fa-regular fa-copy" aria-hidden="true"></i>${esc(page.md_copy)}</button><span class="ty-md-status" role="status"></span></p><pre><code>${esc(typographyMd)}</code></pre>` },
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
            copyText(typographyMd).then(() => say('Copied.'), () => say('Could not copy. Select the Markdown below and copy it.'));
          });
        });
      });
      return { page, useTabs, accordionItems, iconUrl };
    },
    template: `
      <docs-frame current="Typography" :crumbs="page.crumbs">
        <div class="ty-page">
          <uids-headline level="h1">Typography</uids-headline>
          <p v-html="page.lede"></p>
          <div class="ty-actions">
            <uids-button v-for="b in page.buttons" :key="b.label" :url="b.url" color="tertiary" size="small" :light_font="true"><i :class="b.icon" aria-hidden="true"></i>{{ b.label }}</uids-button>
          </div>

          <uids-callout background="gray" class="ty-before">
            <img :src="iconUrl(page.before.icon)" alt="" width="88" height="88">
            <div><h2 class="ty-label">{{ page.before.title }}</h2><p v-html="page.before.text"></p></div>
          </uids-callout>

          <uids-headline level="h2">{{ page.fonts.title }}</uids-headline>
          <p v-html="page.fonts.intro"></p>
          <div class="ty-intro-cards">
            <uids-grid type="twocol--50-50">
              <uids-grid-item v-for="c in page.cards" :key="c.name">
                <uids-card :url="c.href">
                  <template #title>{{ c.name }}</template>
                  <p v-html="c.role"></p>
                </uids-card>
              </uids-grid-item>
            </uids-grid>
          </div>

          <section v-for="s in page.sections" :key="s.id" :id="s.id" class="ty-section">
            <uids-grid type="twocol--67-33">
              <uids-grid-item>
                <uids-headline level="h2" class="ty-specimen-h" :style="s.titleStyle">{{ s.title }}</uids-headline>
                <p v-html="s.intro"></p>
                <div v-html="s.specimen"></div>
                <p class="ty-action"><uids-button :url="s.action.url" color="primary" :light_font="true">{{ s.action.label }}</uids-button></p>
              </uids-grid-item>
              <uids-grid-item>
                <uids-callout background="gray" class="ty-wtu">
                  <h3 class="ty-label">When to use</h3>
                  <ul><li v-for="(i, n) in s.wtu" :key="n" v-html="i"></li></ul>
                </uids-callout>
              </uids-grid-item>
            </uids-grid>
            <p class="ty-label">Guidance</p>
            <uids-accordion label_color="white" heading_level="h3" :items="accordionItems(s)" />
          </section>

          <section id="use-in-your-work" class="ty-use">
            <uids-headline level="h2">{{ page.use.title }}</uids-headline>
            <p v-html="page.use.intro"></p>
            <uids-tabs id="use-tabs" aria_label="Use in your work" :items="useTabs" :selected="1" />
          </section>
        </div>
      </docs-frame>
    `,
  }),
};
