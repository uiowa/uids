import { computed, ref } from 'vue';
import primitives from '../../tokens/primitives/typography.json';
import semantic from '../../tokens/semantic/typography.json';

/**
 * The proposed UIDS roles beside the type scale of eight other systems, one system at a time, at actual size.
 * Each system's values are from its own documentation, read on 2026-11-10 (Material 3's from the M3 type scale
 * image on developer.android.com); the UIDS values are read from the token files, and each UIDS specimen is set
 * through the live custom properties the token build ships. A face not installed here falls back to the system
 * font; the sizes hold.
 */

const WEIGHT_NAMES = { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' };
const round = (n) => String(Math.round(n * 100) / 100);
const titleCase = (key) => key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

const TREE = { typography: { ...primitives.typography, ...semantic.typography } };
const at = (path) => path.split('.').reduce((node, key) => node?.[key], TREE);
const deref = (value) => (typeof value === 'string' && value.startsWith('{') ? deref(at(value.slice(1, -1)).$value) : value);

// The jobs the rows pair by, and the UIDS families that do each.
const JOBS = [
  ['display', 'A bigger statement'],
  ['title', 'The title'],
  ['section', 'Section heads'],
  ['subheading', 'Short headings and details'],
  ['eyebrow', 'The label above the title'],
  ['body', 'Reading text'],
  ['small', 'Small print'],
  ['label', 'Controls and captions'],
];
const UIDS_JOBS = { display: ['headline-6x', 'headline-8x'], title: ['headline'], section: ['subhead'], subheading: ['subhead-2'], eyebrow: ['eyebrow'], body: ['body'], small: ['small-print'], label: ['label'] };

// Each system in its default context: its body size, its face and the stack that renders it here, a note on the
// context, its styles by job as [name, font size, line height, weight] in px, and what it has no style for.
const lh = (px, ratio) => Math.round(px * ratio * 100) / 100;
const SYSTEMS = [
  {
    key: 'm3', name: 'Material 3', context: 'its one scale', body: 16, face: 'Roboto', stack: 'var(--uiowa-typography-font-family-roboto)',
    note: 'Fifteen styles, five roles in three sizes, on a 16px body (Body Large). Large, Medium and Small are sizes an element picks, not contexts. From the M3 type scale image on developer.android.com; the Compose source differs slightly.',
    styles: {
      display: [['Display Large', 57, 64, 400], ['Display Medium', 45, 52, 400], ['Display Small', 36, 44, 400]],
      title: [['Headline Large', 32, 40, 400], ['Headline Medium', 28, 36, 400], ['Headline Small', 24, 32, 400]],
      section: [['Title Large', 22, 28, 500]],
      subheading: [['Title Medium', 16, 24, 500], ['Title Small', 14, 20, 500]],
      body: [['Body Large', 16, 24, 400], ['Body Medium', 14, 20, 400], ['Body Small', 12, 16, 400]],
      label: [['Label Large', 14, 20, 500], ['Label Medium', 12, 16, 500], ['Label Small', 11, 16, 500]],
    },
    none: { eyebrow: 'No eyebrow style; Material 2’s Overline was dropped.', small: 'No small print style; Body Small is the smallest body text.' },
  },
  {
    key: 'apple', name: 'Apple', context: 'Dynamic Type at Large, the default size category', body: 17, face: 'SF Pro', stack: '-apple-system, system-ui, sans-serif',
    note: 'Eleven text styles, in points. The reader picks one of twelve size categories on the device and every style moves with it; Large is the default. Controls use Body and Headline.',
    styles: {
      title: [['Large Title', 34, 41, 400]],
      section: [['Title 1', 28, 34, 400], ['Title 2', 22, 28, 400], ['Title 3', 20, 25, 400]],
      subheading: [['Headline', 17, 22, 600]],
      body: [['Body', 17, 22, 400], ['Callout', 16, 21, 400], ['Subhead', 15, 20, 400]],
      small: [['Footnote', 13, 18, 400], ['Caption 1', 12, 16, 400], ['Caption 2', 11, 13, 400]],
    },
    none: { display: 'No display size; Large Title is the biggest text style.', eyebrow: 'No eyebrow style.', label: 'No label styles; controls use Body and Headline.' },
  },
  {
    key: 'fluent', name: 'Fluent 2', context: 'the web ramp', body: 14, face: 'Segoe UI', stack: "'Segoe UI', system-ui, sans-serif",
    note: 'One ramp per platform, the web ramp shown: Body 1 at 14px up to Display at 68px, Semibold above the body. Windows, macOS, iOS and Android each have their own ramp.',
    styles: {
      display: [['Display', 68, 92, 600], ['Large Title', 40, 52, 600]],
      title: [['Title 1', 32, 40, 600]],
      section: [['Title 2', 28, 36, 600], ['Title 3', 24, 32, 600]],
      subheading: [['Subtitle 1', 20, 26, 600], ['Subtitle 2', 16, 22, 600]],
      body: [['Body 1', 14, 20, 400]],
      small: [['Caption 1', 12, 16, 400], ['Caption 2', 10, 14, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; controls use Body 1 and Caption 1.' },
  },
  {
    key: 'atlassian', name: 'Atlassian', context: 'its heading and body tokens', body: 16, face: 'Atlassian Sans', stack: "'Atlassian Sans', system-ui, sans-serif",
    note: 'Seven heading sizes, each with a use: XXL and XL for brand and marketing, L for app page titles, M for modals, S and XS for small components, XXS for fine print. Body L is the long-form default and Body M the default in components.',
    styles: {
      title: [['Heading XXL', 32, 36, 700], ['Heading XL', 28, 32, 700]],
      section: [['Heading L', 24, 28, 700], ['Heading M', 20, 24, 700]],
      subheading: [['Heading S', 16, 20, 700], ['Heading XS', 14, 20, 700], ['Heading XXS', 12, 16, 700]],
      body: [['Body L', 16, 24, 400], ['Body M', 14, 20, 400]],
      small: [['Body S', 12, 16, 400]],
    },
    none: { display: 'No display size; Heading XXL is the biggest, for brand and marketing.', eyebrow: 'No eyebrow style.', label: 'No label styles; components use Body M.' },
  },
  {
    key: 'govuk', name: 'GOV.UK', context: 'the large-screen scale', body: 19, face: 'GDS Transport', stack: "'GDS Transport', Arial, sans-serif",
    note: 'Seven points, 80 to 16, each with a small-screen size below 640px that the browser applies. Body and heading-s share 19px; 80 and 27 are for exceptional circumstances.',
    styles: {
      display: [['80, exceptional', 80, 80, 700]],
      title: [['48 · heading-xl', 48, 50, 700]],
      section: [['36 · heading-l', 36, 40, 700], ['27, exceptional', 27, 30, 700]],
      subheading: [['24 · heading-m', 24, 30, 700]],
      body: [['19 · body', 19, 25, 400], ['24 · body-l', 24, 30, 400]],
      small: [['16 · body-s', 16, 20, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; form labels use the same scale.' },
  },
  {
    key: 'uswds', name: 'USWDS', context: 'the default theme sizes', body: 16, face: 'Public Sans', stack: "'Public Sans', system-ui, sans-serif",
    note: 'Nine theme sizes set once in the project’s settings, 3xs 13px to 3xl 48px, drawn from 21 system sizes. The defaults: body sm 16px, lead lg 22px, h1 2xl 40px down to h6 3xs 13px, headings at line height 1.15 and body at 1.62.',
    styles: {
      title: [['h1 · 2xl', 40, lh(40, 1.15), 700]],
      section: [['h2 · xl', 32, lh(32, 1.15), 700], ['h3 · lg', 22, lh(22, 1.15), 700]],
      subheading: [['h4 · sm', 16, lh(16, 1.15), 700], ['h5 · xs', 15, lh(15, 1.15), 700], ['h6 · 3xs', 13, lh(13, 1.15), 700]],
      body: [['body · sm', 16, lh(16, 1.62), 400], ['lead · lg', 22, lh(22, 1.62), 400]],
      small: [['small · 2xs', 14, lh(14, 1.62), 400]],
    },
    none: { display: 'No display size in the defaults; 3xl, 48px, is the largest theme size.', eyebrow: 'No eyebrow style.', label: 'No label styles; form labels use the body size.' },
  },
  {
    key: 'carbon', name: 'Carbon', context: 'the expressive set, for web pages', body: 16, face: 'IBM Plex Sans', stack: "'IBM Plex Sans', system-ui, sans-serif",
    note: 'Two type sets: Expressive on a 16px body for editorial and web pages, its headings and display sizes fluid (shown at their base), and Productive on a 14px body with fixed headings for product pages. One set per task or region.',
    styles: {
      display: [['fluid-display-04', 92, 102, 300], ['fluid-display-03', 60, 70, 300], ['fluid-display-01', 54, 64, 300]],
      title: [['fluid-heading-06', 42, 50, 600], ['fluid-heading-05', 42, 50, 300]],
      section: [['fluid-heading-04', 28, 36, 400]],
      subheading: [['fluid-heading-03', 20, 28, 400], ['heading-02', 16, 24, 600]],
      body: [['body-02', 16, 24, 400], ['body-compact-02', 16, 22, 400]],
      small: [['legal-02', 14, 18, 400], ['helper-text-02', 14, 18, 400]],
      label: [['label-02', 14, 18, 400]],
    },
    none: { eyebrow: 'No eyebrow style.' },
  },
  {
    key: 'radix', name: 'Radix Themes', context: 'its nine steps', body: 16, face: 'the system font', stack: 'system-ui, sans-serif',
    note: 'Nine font-size steps, 12 to 60px, shared by Text and Heading through a size prop; weight is a separate prop, so the steps are shown Regular. The Theme’s scaling setting, 90 to 110 percent, scales every step at once. Ratios here are of step 3, 16px.',
    styles: {
      display: [['Step 9', 60, 60, 400], ['Step 8', 35, 40, 400]],
      title: [['Step 7', 28, 36, 400]],
      section: [['Step 6', 24, 30, 400]],
      subheading: [['Step 5', 20, 28, 400], ['Step 4', 18, 26, 400]],
      body: [['Step 3', 16, 24, 400], ['Step 2', 14, 20, 400]],
      small: [['Step 1', 12, 16, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; a step and a weight make one.' },
  },
];

// University homepages, from the survey of 2026-10-29 captured at 1440px: each site's link, general reading size,
// hero headline and section headings, in px. A range is [low, high]; null is no measurable headline.
const HOMEPAGES = [
  ['Cal Poly', 'https://www.calpoly.edu/', 19.2, 100, [60, 64], 'Intros 25.6px, compact cards 16px.'],
  ['NDSCS', 'https://ndscs.edu/', 18, 72, 72, 'Section display words 106px, 5.9×.'],
  ['Simmons', 'https://www.simmons.edu/', 22, 96, 50, 'Promotional statement 28px, cards 16px.'],
  ['North Dakota', 'https://und.edu/', 16, null, 72, 'The 234px hero is a decorative word; intros 28px.'],
  ['Louisiana at Lafayette', 'https://louisiana.edu/', 20, 38, 32, 'News and culture descriptions 16px.'],
  ['Virginia, Admission', 'https://www.virginia.edu/admission/', 18, 90, [81, 86.4], 'Opening introduction 32px.'],
  ['Quincy College', 'https://quincycollege.edu/', 21, 90, 48, 'Section introductions 26px.'],
  ['Alfred University', 'https://www.alfred.edu/', 20, null, 65, 'A video hero with no HTML headline.'],
  ['SUNY Adirondack', 'https://www.sunyacc.edu/', 17, 100, 60, 'One reading size; Campus Life 96px, 5.6×, closing 84px, 4.9×.'],
  ['College of Wooster', 'https://wooster.edu/', 18, 86, 40, 'One reading size; cards 30.4 and 24px.'],
  ['UA Little Rock', 'https://ualr.edu/', 20, 54, [38, 44], 'One reading size; news lead 32px.'],
  ['Southern Virginia', 'https://svu.edu/', 20, 128, 72, ''],
  ['USC Upstate', 'https://uscupstate.edu/', 20, 172.8, 64, 'The hero is 12vw, so it scales with the viewport.'],
];
const ratio = (px, body) => (px == null ? '—' : Array.isArray(px) ? `${round(px[0] / body)}–${round(px[1] / body)}×` : `${round(px / body)}×`);
const pxText = (px) => (px == null ? '—' : Array.isArray(px) ? `${px[0]}–${px[1]}px` : `${px}px`);
const HOMEPAGE_ROWS = HOMEPAGES.map(([site, url, body, hero, section, note]) => ({ site, url, body: `${body}px`, hero: pxText(hero), heroX: ratio(hero, body), section: pxText(section), sectionX: ratio(section, body), note }));

// A UIDS family's styles. Each size is a multiple of the body size it names (Headline Medium of Body Medium);
// a body size is the 1× of its hierarchy.
const SIZE_NAMES = { 'x-large': 'X-Large', large: 'Large', medium: 'Medium', small: 'Small', 'x-small': 'X-Small' };
const uidsStyles = (family) => Object.keys(SIZE_NAMES).filter((size) => at(`typography.${family}.${size}`))
  .map((size) => [`${family}-${size}`, at(`typography.${family}.${size}`), size]);
const uidsFamily = (family) => uidsStyles(family).map(([key, token, size]) => {
  const multiply = token.fontSize.$extensions?.['edu.uiowa.multiply'];
  const px = (multiply ? multiply.by : 1) * deref(token.fontSize.$value).value * 16;
  const body = multiply && SIZE_NAMES[token.fontSize.$value.split('.')[2]];
  const leading = deref(token.lineHeight.$value);
  const weight = deref(token.fontWeight.$value);
  return {
    key,
    size,
    badge: family === 'label' ? 'Every hierarchy' : `${SIZE_NAMES[size]} hierarchy`,
    name: `${titleCase(family).replace(/(\d)x$/, '$1×')} ${SIZE_NAMES[size]}`,
    px,
    spec: `${round(px)}/${round(px * leading)} · ${WEIGHT_NAMES[weight]} ${weight} · ${multiply ? `${multiply.by}× Body ${body}` : 'the body size'}`,
    style: Object.fromEntries(['font-family', 'font-weight', 'font-size', 'line-height', 'letter-spacing'].map((name) => [
      name.replace(/-(\w)/g, (_, c) => c.toUpperCase()),
      `var(--uiowa-typography-${key}-${name})`,
    ])),
  };
});
const UIDS_COUNT = Object.values(UIDS_JOBS).flat().reduce((n, family) => n + uidsStyles(family).length, 0);
const familyName = (family) => titleCase(family).replace(/(\d)x$/, '$1×');
const familyFace = (family) => deref(uidsStyles(family)[0][1].fontFamily.$value)[0];

// Special Gothic Condensed is not in UIDS yet; Google's Special Gothic at width 75 stands in for it,
// through the second name in the token's font stack.
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Gothic:wdth,wght@75,600&display=swap');
  .m3c { box-sizing: border-box; max-width: 1440px; margin: 0 auto; padding: 40px 24px 64px; color: var(--uiowa-color-neutral-800); font-family: var(--uiowa-typography-font-family-roboto); }
  .m3c *, .m3c *::before, .m3c *::after { box-sizing: border-box; }
  /* The page's own text sits on the Medium hierarchy. */
  .m3c {
    --tr-f-title: var(--uiowa-typography-subhead-medium-font-weight) var(--uiowa-typography-subhead-medium-font-size)/var(--uiowa-typography-subhead-medium-line-height) var(--uiowa-typography-subhead-medium-font-family);
    --tr-f-h2: var(--uiowa-typography-subhead-2-medium-font-weight-emphasis) var(--uiowa-typography-subhead-2-medium-font-size)/var(--uiowa-typography-subhead-2-medium-line-height) var(--uiowa-typography-subhead-2-medium-font-family);
    --tr-f-body: var(--uiowa-typography-body-medium-font-weight) var(--uiowa-typography-body-medium-font-size)/var(--uiowa-typography-body-medium-line-height) var(--uiowa-typography-body-medium-font-family);
    --tr-f-small: var(--uiowa-typography-small-print-medium-font-weight) var(--uiowa-typography-small-print-medium-font-size)/var(--uiowa-typography-small-print-medium-line-height) var(--uiowa-typography-small-print-medium-font-family);
    --tr-f-label: var(--uiowa-typography-label-large-font-weight) var(--uiowa-typography-label-large-font-size)/var(--uiowa-typography-label-large-line-height) var(--uiowa-typography-label-large-font-family);
    --tr-f-tag: var(--uiowa-typography-label-small-font-weight) var(--uiowa-typography-label-small-font-size)/var(--uiowa-typography-label-small-line-height) var(--uiowa-typography-label-small-font-family);
  }
  .m3c__eyebrow { margin: 0 0 6px; font: var(--tr-f-small); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .m3c__title { margin: 0 0 12px; font: var(--tr-f-title); color: var(--uiowa-color-neutral-900); }
  .m3c__lede { margin: 0 0 16px; max-width: 70ch; font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .m3c__lede b { color: var(--uiowa-color-neutral-900); }
  .m3c__lede code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .m3c__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 48px; margin-top: 32px; }
  .m3c__head { padding-bottom: 12px; border-bottom: 2px solid var(--uiowa-color-neutral-900); }
  .m3c__head h2 { margin: 0; font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .m3c__head p, .m3c__job { margin: 4px 0 0; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__cell { padding: 20px 0 28px; border-bottom: 1px solid var(--uiowa-color-neutral-175); }
  .m3c__family { margin: 0; font: var(--tr-f-small); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .m3c__entry { margin-top: 16px; }
  .m3c__badge { padding: 2px 9px; border-radius: 999px; background: var(--uiowa-color-neutral-200); font: var(--tr-f-tag); font-weight: 700; letter-spacing: .02em; color: var(--uiowa-color-neutral-900); }
  .m3c__spec { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin: 0 0 4px; font: var(--tr-f-small); font-family: var(--uiowa-font-family-mono, monospace); color: var(--uiowa-color-neutral-500); }
  .m3c__specimen { margin: 0; color: var(--uiowa-color-neutral-900); overflow-wrap: anywhere; }
  .m3c__specimen--eyebrow { text-transform: uppercase; }
  .m3c__none { margin: 16px 0 0; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__note { margin: 24px 0 0; max-width: 80ch; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__note--system { margin-top: 12px; max-width: 90ch; color: var(--uiowa-color-neutral-700); }
  .m3c__toggles { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 32px; margin-top: 4px; }
  .m3c__toggle { display: inline-flex; align-items: center; gap: 6px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-700); cursor: pointer; }
  .m3c__pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 16px 0 8px; padding: 0; border: 0; }
  .m3c__pick legend { float: left; margin-right: 6px; padding: 0; font: var(--tr-f-label); color: var(--uiowa-color-neutral-500); }
  .m3c__pick label { position: relative; display: inline-flex; align-items: center; gap: 6px; margin: 0; padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-175); border-radius: 999px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .m3c__pick label.on { background: var(--uiowa-color-neutral-800); border-color: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .m3c__pick label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  .m3c__pick input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .m3c__h2 { margin: 48px 0 8px; padding-bottom: 8px; border-bottom: 1px solid var(--uiowa-color-neutral-175); font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .m3c__table { width: 100%; margin: 12px 0 0; border-collapse: collapse; font: var(--tr-f-body); }
  .m3c__table th { padding: 8px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-175); text-align: left; font: var(--tr-f-small); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .m3c__table td { padding: 10px; border-bottom: 1px solid var(--uiowa-color-neutral-150); vertical-align: top; color: var(--uiowa-color-neutral-700); }
  .m3c__table td:first-child { color: var(--uiowa-color-neutral-900); }
  .m3c__table a { color: inherit; text-decoration: underline; text-underline-offset: .15em; }
  .m3c__table td:last-child { font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__cell::before { display: none; content: attr(data-side); }
  @media (max-width: 899px) {
    .m3c__grid { grid-template-columns: minmax(0, 1fr); }
    .m3c__head { display: none; }
    .m3c__cell::before { display: block; margin-bottom: 4px; font-weight: 700; color: var(--uiowa-color-neutral-900); }
  }
`;

export default {
  title: 'Tokens (typography)',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

export const ScalesCompared = {
  name: 'Type scales compared',
  render: () => ({
    setup() {
      const picked = ref('m3');
      // Medium, the web's hierarchy, shows by default; the toggle adds the other four. Label is one set for every
      // hierarchy, so its three sizes always show.
      const others = ref(false);
      const system = computed(() => SYSTEMS.find((s) => s.key === picked.value));
      const theirs = (s, job) => (s.styles[job] || []).map(([name, px, lineHeight, weight]) => ({
        key: name,
        name,
        spec: `${px}/${round(lineHeight)} · ${WEIGHT_NAMES[weight]} ${weight} · ${round(px / s.body)}×`,
        style: { fontFamily: s.stack, fontSize: `${px}px`, lineHeight: `${lineHeight}px`, fontWeight: weight },
      }));
      const ours = (job) => UIDS_JOBS[job].flatMap((family) => uidsFamily(family).filter((s) => others.value || family === 'label' || s.size === 'medium'));
      const rows = computed(() => JOBS.map(([job, label]) => ({
        job,
        label,
        theirs: theirs(system.value, job),
        none: system.value.none?.[job] || 'No style for this job.',
        ours: ours(job),
        family: UIDS_JOBS[job].map(familyName).join(' and '),
        face: familyFace(UIDS_JOBS[job][0]),
      })));
      const theirCount = computed(() => Object.values(system.value.styles).flat().length);
      const shownCount = computed(() => rows.value.reduce((n, row) => n + row.ours.length, 0));
      return { css, systems: SYSTEMS, picked, system, others, rows, theirCount, shownCount, uidsCount: UIDS_COUNT, homepages: HOMEPAGE_ROWS };
    },
    template: `
      <div class="m3c">
        <component is="style">{{ css }}</component>
        <p class="m3c__eyebrow">Typography roles</p>
        <h1 class="m3c__title">Type scales compared</h1>
        <p class="m3c__lede">
          <b>Eight systems, one context each, beside the proposed UIDS roles.</b> Each system is shown in its default
          context: Material 3's one scale, Apple's Large size category, Fluent 2's web ramp, Atlassian's heading and
          body tokens, GOV.UK's large-screen scale, USWDS's default theme sizes, Carbon's expressive set and Radix
          Themes' nine steps. Each has one body size and a fixed ladder of sizes above and below it, and a style is
          picked per element. UIDS is one formula at five body sizes, each naming a hierarchy a piece picks once, by
          its format; within it every role is a multiple of the body, and the Headline steps up to 6× or 8× for a
          bigger statement. The rows pair the styles that do the same job.
        </p>
        <p class="m3c__lede">
          <b>Why the numbers do not line up.</b> The other systems set screens, one context at a time, so their
          ladders are fixed sizes; UIDS sets print and screens from the same tokens, so its ladder scales with the
          format. Their body text runs 14 to 19px against Medium's 19; their page titles about two to two and a half
          times the body against UIDS's four; their display sizes three to six times, where UIDS's steps reach six
          and eight. UIDS carries three typefaces and sets no tracking; each of the others carries one. On a page UIDS
          adds emphasis by stepping the Headline and density by dropping roles, where the others pick a different
          style per element.
        </p>
        <p class="m3c__lede">
          <b>Working with the other hierarchies.</b> Pick by format, as the Formats page lists: X-Small and Small for
          print documents, Large and X-Large for posters, digital signs and slides; screens stay on Medium. In code
          every role of every hierarchy ships as custom properties, <code>--uiowa-typography-&lt;role&gt;-&lt;size&gt;-*</code>,
          so a template takes its hierarchy by using one size's properties throughout, never two. The comparison opens
          on Medium; the toggle adds the other four. The ratio beside each style is of that system's body size, each
          UIDS multiple names the body size it is measured from, and the badge names the hierarchy the style belongs to.
        </p>
        <div class="m3c__toggles">
          <fieldset class="m3c__pick"><legend>Compare with</legend>
            <label v-for="s in systems" :key="s.key" :class="{ on: picked === s.key }"><input v-model="picked" type="radio" name="m3c-system" :value="s.key"> {{ s.name }}</label>
          </fieldset>
          <label class="m3c__toggle"><input v-model="others" type="checkbox"> Show the other formats: X-Small, Small, Large and X-Large</label>
        </div>
        <p class="m3c__note m3c__note--system">{{ system.note }}</p>
        <div class="m3c__grid">
          <div class="m3c__head"><h2>{{ system.name }}</h2><p>{{ system.context }} · {{ system.face }} · body {{ system.body }}px · {{ theirCount }} styles</p></div>
          <div class="m3c__head"><h2>UIDS, proposed</h2><p>{{ others ? 'Five hierarchies' : 'The Medium hierarchy' }} · {{ shownCount }} of {{ uidsCount }} styles</p></div>
          <template v-for="row in rows" :key="row.job">
            <section class="m3c__cell" :data-side="system.name">
              <h3 class="m3c__family">{{ row.label }}</h3>
              <template v-if="row.theirs.length">
                <div v-for="s in row.theirs" :key="s.key" class="m3c__entry">
                  <p class="m3c__spec">{{ s.spec }}</p>
                  <p class="m3c__specimen" :style="s.style">{{ s.name }}</p>
                </div>
              </template>
              <p v-else class="m3c__none">{{ row.none }}</p>
            </section>
            <section class="m3c__cell" data-side="UIDS, proposed">
              <h3 class="m3c__family">{{ row.family }} · {{ row.face }}</h3>
              <div v-for="s in row.ours" :key="s.key" class="m3c__entry">
                <p class="m3c__spec"><span class="m3c__badge">{{ s.badge }}</span>{{ s.spec }}</p>
                <p :class="['m3c__specimen', { 'm3c__specimen--eyebrow': row.job === 'eyebrow' }]" :style="s.style">{{ s.name }}</p>
              </div>
            </section>
          </template>
        </div>
        <h2 class="m3c__h2">Headline steps on university homepages</h2>
        <p class="m3c__lede">
          <b>Where 6× and 8× show up in the wild.</b> Thirteen university homepages, captured on 2026-10-29 at 1440px,
          each headline divided by the site's general reading size. Heroes mostly run four to six times the body:
          two of the eleven measured reach 6×, and only one reaches 8×, set in viewport units. No section heading
          reaches 6×; the two that come close are a display-word treatment and one feature band. So a hero near 6×
          has company, a section at 6× or 8× does not, and 8× is one site's choice rather than a pattern.
        </p>
        <table class="m3c__table">
          <thead><tr><th>Homepage</th><th>Body</th><th>Hero</th><th>Hero ÷ body</th><th>Section heading</th><th>Section ÷ body</th><th>Note</th></tr></thead>
          <tbody>
            <tr v-for="h in homepages" :key="h.site"><td><a :href="h.url" target="_blank" rel="noopener">{{ h.site }}</a></td><td>{{ h.body }}</td><td>{{ h.hero }}</td><td>{{ h.heroX }}</td><td>{{ h.section }}</td><td>{{ h.sectionX }}</td><td>{{ h.note }}</td></tr>
          </tbody>
        </table>
        <p class="m3c__note">
          Values are from each system's own documentation, read on 2026-11-10: Material 3 from the M3 type scale image
          on developer.android.com (the Compose source differs slightly: Title Large is Regular, Display Large tracks
          -0.2), Apple from the Human Interface Guidelines, Fluent 2 from fluent2.microsoft.design, Atlassian from
          atlassian.design, GOV.UK from its type scale page, USWDS from its font size, line height and settings pages,
          Carbon from its type sets page, Radix from its Themes typography page. Adobe Spectrum's sizes could not be
          read from its documentation and are left out. Faces not installed here fall back to the system font; the
          sizes hold. Special Gothic Condensed stands in as Google's Special Gothic at width 75. The homepage sizes are
          the survey's desktop captures; TCU could not be measured.
        </p>
      </div>
    `,
  }),
};
