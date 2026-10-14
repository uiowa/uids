import { computed, ref, onMounted } from 'vue';
import '../../scss/components/button.scss';
import step1Css from '../../tokens-after/typography-after-step-1.css?raw';
import step2Css from '../../tokens-after/typography-after-step-2.css?raw';

/**
 * PROTOTYPE for comparison with Tokens › Typography: the typography tokens arranged the
 * Material 3 way, in two steps. Step 1 restructures them with today's faces and sizes, so
 * nothing looks different. Step 2 adds Foundations' faces and fills the rest of the scale.
 * Each step's values come from its typography-after-step-N.jsonc files beside the real
 * typography.json in src/tokens/primitives and src/tokens/semantic, built by the real token
 * build on a scratch copy (see src/tokens-after/). They are set inline on each page's wrapper,
 * so they never reach the live stylesheets or the other token stories. "Before" values are
 * read from the live tokens on :root, not from the wrapper: intro-bold and intro-light keep
 * their names, so inside the wrapper they would read back the step's values. Both steps are
 * drawn by createStep(); only their config differs. Step 2 also says why the scale is worth it
 * and sets one block at three densities, today's way and step 2's (DENSITIES).
 */
const CHANNELS = [
  { name: 'font-family', property: 'fontFamily' },
  { name: 'font-weight', property: 'fontWeight' },
  { name: 'font-size', property: 'fontSize' },
  { name: 'line-height', property: 'lineHeight' },
  { name: 'letter-spacing', property: 'letterSpacing' },
];
const ROLES = ['display', 'headline', 'title', 'body', 'label'];
const SIZES = ['large', 'medium', 'small'];

// The live styles the steps replace, by custom property name.
const BEFORE = {
  'heading-h1': 'heading.h1',
  'heading-h2': 'heading.h2',
  'heading-h3': 'heading.h3',
  'heading-h4': 'heading.h4',
  'heading-h5': 'heading.h5',
  'heading-h6': 'heading.h6',
  body: 'body',
  'intro-bold': 'intro-bold',
  'intro-light': 'intro-light',
};

// Each style and what it replaces today, or a list where a step merges two of today's styles into
// one. key: a live style. size: a live size token in place of key's size; size.large and
// size.small are only sizes, so on a paragraph they take the rest from body. set: values in place
// of key's, where a --uiowa- name is read live; textTransform is today's component CSS, so it
// shows on the before side only. was: the name shown for what's replaced, where it isn't a live
// token.
const STEP_1_REPLACES = {
  'headline-large': { key: 'heading-h1' },
  'headline-medium': { key: 'heading-h2' },
  'headline-small': { key: 'heading-h3' },
  'title-large': { key: 'heading-h4' },
  'title-medium': { key: 'heading-h5' },
  'title-small': { key: 'heading-h6' },
  'body-large': { key: 'body', size: 'size-large' },
  'body-medium': { key: 'body' },
  'body-small': { key: 'body', size: 'size-small' },
  'intro-bold': { key: 'intro-bold' },
  'intro-light': { key: 'intro-light' },
};
// Step 2 proposes sentence case for button text, which is a CSS change, not a token. The banner
// sizes are banner.scss's wide-container clamps, with line height 1 from .headline. Large and
// medium are shown in the banner's uppercase text style (.headline--uppercase), the owner's
// ruling of 2026-10-02; small is in the h2's face. The label values were measured on the Button,
// Form and Badge stories on 2026-10-02. The intros fold into the scale, also the owner's ruling
// of 2026-10-02: the light intro becomes body.large and the bold intro takes title.large.
const UPPERCASE_HEADLINE = { fontFamily: '--uiowa-typography-font-family-antonio', fontWeight: '700', textTransform: 'uppercase' };
const STEP_2_REPLACES = {
  'display-large': {
    was: 'banner large headline',
    key: 'heading-h2',
    set: { ...UPPERCASE_HEADLINE, fontSize: 'clamp(2.5rem, calc(4.9577vw + 0.6408rem), 4.7rem)', lineHeight: '1' },
  },
  'display-medium': {
    was: 'banner medium headline',
    key: 'heading-h2',
    set: { ...UPPERCASE_HEADLINE, fontSize: 'clamp(2.2rem, calc(3.3803vw + 0.9324rem), 3.7rem)', lineHeight: '1' },
  },
  'display-small': { key: 'heading-h1' },
  'headline-large': {
    was: 'banner small headline',
    key: 'heading-h2',
    set: { fontSize: 'clamp(2rem, calc(1.5775vw + 1.4085rem), 2.7rem)', lineHeight: '1' },
  },
  'headline-medium': { key: 'heading-h2' },
  'headline-small': { key: 'heading-h3' },
  'title-large': [{ key: 'heading-h4' }, { key: 'intro-bold' }],
  'title-medium': { key: 'heading-h5' },
  'title-small': { key: 'heading-h6' },
  'body-large': [{ key: 'body', size: 'size-large' }, { key: 'intro-light' }],
  'body-medium': { key: 'body' },
  'body-small': { key: 'body', size: 'size-small' },
  'label-large': {
    was: 'button text',
    set: {
      fontFamily: '--uiowa-typography-font-family-antonio', fontWeight: '400', fontSize: '1.25rem',
      lineHeight: '1.4', letterSpacing: '0px', textTransform: 'uppercase',
    },
  },
  'label-medium': {
    was: 'form label',
    set: {
      fontFamily: '--uiowa-typography-font-family-roboto', fontWeight: '700', fontSize: '1rem',
      lineHeight: '1.15', letterSpacing: '0px',
    },
  },
  'label-small': {
    was: 'badge',
    set: {
      fontFamily: '--uiowa-typography-font-family-roboto', fontWeight: '500', fontSize: '0.75rem',
      lineHeight: '1.67', letterSpacing: '0px',
    },
  },
};

// Step 2 only. Foundations' four levels. Role and the Scale page's values come from the
// Foundations "Typography - Scale" page; the faces and weights are the owner's picks of
// 2026-10-01, and the mapping (display takes over h1, headline takes h2 and h3, subhead takes h4
// to h6) is the owner's ruling of 2026-10-02. "after" is the step 2 style that applies each
// pick; "today" reads the live tokens. Specimen text is lorem ipsum.
const LEVELS = [
  {
    level: 'Display',
    role: 'Primary visual message',
    face: 'Special Gothic Condensed SemiBold (600)',
    text: 'Lorem ipsum',
    scale: 'Special Gothic Condensed, 128px, leading 1.0, specimen at weight 500',
    typography: 'Special Gothic Condensed, recommended SemiBold (600)',
    uids: "No display level, and no Special Gothic Condensed font token, only Antonio, which the Typography page says to replace in new work. Today's h1, which display takes over: Zilla Slab 600, 36.8–48.8px fluid, leading 1.15",
    after: [{ key: 'display-small', label: 'display.small, was heading.h1' }],
    today: [{ key: 'heading-h1', label: 'heading.h1' }],
  },
  {
    level: 'Headline',
    role: 'Primary heading',
    face: 'Roboto Black (900)',
    text: 'Dolor sit amet',
    scale: 'Roboto Black (900), 48px, leading 1.1',
    typography: 'Calls Special Gothic Condensed "our primary headline font", and Roboto headings Bold (700)',
    uids: 'h2 and h3: Roboto 500, 26.4–39.2px fluid, leading 1.25',
    after: [{ key: 'headline-medium', label: 'headline.medium, was heading.h2' }],
    today: [{ key: 'heading-h2', label: 'heading.h2' }],
  },
  {
    level: 'Subhead',
    role: 'Supporting heading',
    face: 'Zilla Slab SemiBold (600)',
    text: 'Consectetur adipiscing elit',
    scale: 'Zilla Slab Semibold (600), 32px, leading 1.2',
    typography: 'Zilla headings Bold (700), but "use the semibold weight" in the same block',
    uids: 'h4 to h6: Roboto 500, 19.2–26.3px fluid, leading 1.25. Serif headings: Zilla Slab 700',
    after: [{ key: 'title-large', label: 'title.large, was heading.h4' }],
    today: [
      { key: 'heading-h4', label: 'heading.h4' },
      // .headline--serif swaps the face and weight and keeps the heading's size (_headline-mixins.scss).
      { key: 'heading-h4', label: 'heading.h4 with .headline--serif', override: { fontFamily: 'var(--uiowa-typography-font-family-zilla-slab)', fontWeight: 700 } },
    ],
  },
  {
    level: 'Reading text',
    role: 'Sustained reading',
    face: 'Roboto Regular (400)',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    scale: 'Roboto 400, 16px, leading 1.5',
    typography: 'Roboto Regular (400)',
    uids: "Body: Roboto 400, 19.2px, leading 1.7. Foundations' tokens.css says 1.65",
    after: [{ key: 'body-medium', label: 'body.medium, was body', override: { maxWidth: '56ch' } }],
    today: [{ key: 'body', label: 'body', override: { maxWidth: '56ch' } }],
  },
];

// The sample page: real h1 to h6 and p elements. Each step says which style each element takes.
const SAMPLE_TEXT = [
  { tag: 'h1', text: 'Lorem ipsum dolor sit amet' },
  { tag: 'p', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { tag: 'h2', text: 'Excepteur sint occaecat cupidatat' },
  { tag: 'p', text: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
  { tag: 'h3', text: 'Neque porro quisquam est' },
  { tag: 'p', text: 'Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' },
  { tag: 'h4', text: 'Ut enim ad minima veniam' },
  { tag: 'p', text: 'Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.' },
  { tag: 'h5', text: 'Quis autem vel eum iure' },
  { tag: 'p', text: 'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.' },
  { tag: 'h6', text: 'At vero eos et accusamus' },
  { tag: 'p', text: 'Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.' },
];
const STEP_1_TAGS = {
  h1: 'headline-large', h2: 'headline-medium', h3: 'headline-small', h4: 'title-large', h5: 'title-medium', h6: 'title-small', p: 'body-medium',
};
const STEP_2_TAGS = { ...STEP_1_TAGS, h1: 'display-small' };
const markupOf = (item) => `<${item.tag}>`;
// Today, each tag wears the style named for it.
const todayOf = (tag) => (tag === 'p' ? 'body' : `heading.${tag}`);

// Step 2 only. One block at three densities, set today's way (tokens where they reach, component
// CSS where they don't) and with step 2's scale. source: what sets an element's type today; warn:
// marks a size that isn't a token, a style borrowed from another tag, or a gap in the scale.
// Today's card values are card.scss's own (the title's 1.5rem, with line height 1 from .headline
// and Zilla Slab Bold from the card's default serif title; the text's 1rem and 1.7), measured on
// Components › Card › Default on 2026-10-02, where an h3 added to the card's text kept the page's
// heading.h3 size. The buttons are .bttn--large, .bttn and .bttn--small (button.scss), rendered by
// today's CSS; step 2 keeps their padding and sets only their text.
const DENSITY_TEXT = [
  { tag: 'h2', text: 'Lorem ipsum dolor sit' },
  { tag: 'p', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { tag: 'h3', text: 'Consectetur adipiscing' },
  { tag: 'p', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { tag: 'a', text: 'Dolor sit amet' },
];
const CARD_TITLE = {
  set: {
    fontFamily: '--uiowa-typography-font-family-zilla-slab', fontWeight: '700', fontSize: '1.5rem',
    lineHeight: '1', letterSpacing: '0px',
  },
};
const CARD_TEXT = {
  set: {
    fontFamily: '--uiowa-typography-font-family-roboto', fontWeight: '400', fontSize: '1rem',
    lineHeight: '1.7', letterSpacing: '0px',
  },
};
const DENSITIES = [
  {
    name: 'Spacious',
    use: 'A feature section.',
    button: 'bttn--large',
    today: [
      { replaced: { key: 'heading-h1' }, source: 'heading.h1', warn: true },
      { replaced: { key: 'intro-light' }, source: 'intro-light' },
      { replaced: { key: 'heading-h2' }, source: 'heading.h2', warn: true },
      { replaced: { key: 'intro-light' }, source: 'intro-light' },
      { source: '.bttn--large', warn: true },
    ],
    todayNote: "Only h1's style is bigger than an h2's, so the h2 borrows heading.h1 and turns Zilla Slab, and the h3 borrows heading.h2. The text uses the light intro. The large button's 1.45rem is set in button.scss, not by a token.",
    after: [{ key: 'headline-large' }, { key: 'body-large' }, { key: 'headline-medium' }, { key: 'body-large' }, { key: 'label-large', warn: true }],
    afterNote: "Each element steps up a size and keeps its role, so the h2 stays Roboto Black, and the text, body.large, is today's light intro. The label role tops out at label.large, today's default button size, so nothing matches the large button's 1.45rem.",
  },
  {
    name: 'Default',
    use: 'An article.',
    button: '',
    today: [
      { replaced: { key: 'heading-h2' }, source: 'heading.h2' },
      { replaced: { key: 'body' }, source: 'body' },
      { replaced: { key: 'heading-h3' }, source: 'heading.h3' },
      { replaced: { key: 'body' }, source: 'body' },
      { source: '.bttn', warn: true },
    ],
    todayNote: "Each tag wears the style named for it. The button's 1.25rem is set in .bttn, not by a token.",
    after: [{ key: 'headline-medium' }, { key: 'body-medium' }, { key: 'headline-small' }, { key: 'body-medium' }, { key: 'label-large' }],
    afterNote: "Each tag's default step, and label.large for the button text.",
  },
  {
    name: 'Compact',
    use: 'Inside a card.',
    button: 'bttn--small',
    card: true,
    today: [
      { replaced: CARD_TITLE, source: 'card.scss', warn: true },
      { replaced: CARD_TEXT, source: 'card.scss', warn: true },
      { replaced: { key: 'heading-h3' }, source: 'heading.h3', warn: true },
      { replaced: CARD_TEXT, source: 'card.scss', warn: true },
      { source: '.bttn--small', warn: true },
    ],
    todayNote: "The card sets its own sizes in card.scss: 1.5rem for the title and 1rem for the text, neither a token. A heading added to the card's text keeps its page size, so this h3 is bigger than the card's title. The small button's 1.05rem is set in button.scss.",
    after: [{ key: 'title-large' }, { key: 'body-medium', warn: true }, { key: 'title-medium' }, { key: 'body-medium', warn: true }, { key: 'label-medium' }],
    afterNote: "The title takes title.large, close to today's 24px, and the subheading steps below it to title.medium. The small button's text is label.medium, close to its 1.05rem today. The body role has nothing near the card's 16px text: body.medium is 19.2px and body.small 12.8px, so the text stays at body.medium.",
  },
];

const base = (key) => `--uiowa-typography-${key}`;
const styleOf = (key) => Object.fromEntries(CHANNELS.map(({ name, property }) => [property, `var(${base(key)}-${name})`]));
const isPrimitive = (name) => /^--uiowa-typography-(font-family|font-weight|font-size|line-height|letter-spacing)-/.test(name);
const kindOf = (name) => (name.match(/^--uiowa-typography-(font-family|font-weight|font-size|line-height|letter-spacing)-/) || [])[1];
const PROPERTY = Object.fromEntries(CHANNELS.map(({ name, property }) => [name, property]));
const pointsAt = (declared) => (declared.match(/^var\(\s*(--uiowa-[\w-]+)\s*\)$/) || [])[1] || '';
// Custom property name to token path: --uiowa-typography-font-family-zilla-slab is font-family.zilla-slab.
const tokenId = (name) => {
  const rest = name.replace(base(''), '');
  const group = rest.match(/^(font-family|font-weight|font-size|line-height|letter-spacing|typeface)-(.+)$/);
  return group ? `${group[1]}.${group[2]}` : rest.replace('-', '.');
};

const round = (n) => String(Math.round(n * 100) / 100);
const sizeText = (value) => {
  const clamp = value.match(/^clamp\(\s*([\d.]+)rem\s*,.*,\s*([\d.]+)rem\s*\)$/);
  if (clamp) return `${round(clamp[1] * 16)}–${round(clamp[2] * 16)}px`;
  const rem = value.match(/^([\d.]+)rem$/);
  return rem ? `${round(rem[1] * 16)}px` : value;
};
const faceText = (value) => value.split(',')[0].replace(/['"]/g, '').trim();
const show = (channel, value) => {
  if (channel === 'font-size') return sizeText(value);
  return channel === 'font-family' ? faceText(value) : value;
};

// The Typescale pages: Material 3's type scale image, redrawn for each step against today.
const WEIGHT_NAMES = { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 900: 'Black' };
const BEFORE_NAMES = {
  'heading.h1': 'Heading 1',
  'heading.h2': 'Heading 2',
  'heading.h3': 'Heading 3',
  'heading.h4': 'Heading 4',
  'heading.h5': 'Heading 5',
  'heading.h6': 'Heading 6',
  body: 'Body',
  'size.large': 'Size large',
  'size.small': 'Size small',
  'banner large headline': 'Banner large',
  'banner medium headline': 'Banner medium',
  'banner small headline': 'Banner small',
  'button text': 'Button text',
  'form label': 'Form label',
  badge: 'Badge',
  'intro-bold': 'Intro bold',
  'intro-light': 'Intro light',
};
const inScale = (key) => ROLES.some((role) => key.startsWith(`${role}-`));
const describe = (style) => `${faceText(style.fontFamily)} ${WEIGHT_NAMES[style.fontWeight] || style.fontWeight}`;
const titleCase = (key) => key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Gothic:wdth,wght@75,600&display=swap');
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-medium-font-family); }
  .tk > h2 { margin-top: var(--uiowa-space-300); }
  .tk > h3 { margin-top: var(--uiowa-space-200); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-typography-font-weight-medium); white-space: nowrap; }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
  .tk__banner {
    padding: var(--uiowa-space-100) var(--uiowa-space-150);
    background: var(--uiowa-color-neutral-100); border-left: 4px solid var(--uiowa-color-brand-gold);
  }
  .tk__grid td { width: 30%; vertical-align: top; padding-top: var(--uiowa-space-100); padding-bottom: var(--uiowa-space-100); }
  .tk__grid th[scope="row"] { vertical-align: top; padding-top: var(--uiowa-space-100); text-transform: capitalize; }
  .tk__side + .tk__side {
    margin-top: var(--uiowa-space-100); padding-top: var(--uiowa-space-100);
    border-top: 1px dashed var(--uiowa-color-border-default);
  }
  .tk__tag { font-size: 0.8rem; color: var(--uiowa-color-neutral-500); }
  .tk__empty { color: var(--uiowa-color-neutral-400); font-style: italic; }
  .tk__styles td { vertical-align: top; }
  .tk__group th { padding-top: var(--uiowa-space-150); color: var(--uiowa-color-neutral-500); }
  .tk__was { color: var(--uiowa-color-neutral-500); text-decoration: line-through; }
  .tk__scroll { overflow-x: auto; }
  .tk__picks th[scope="row"] { white-space: normal; width: 16rem; vertical-align: top; padding-top: var(--uiowa-space-150); }
  .tk__picks td { vertical-align: top; padding-top: var(--uiowa-space-150); padding-bottom: var(--uiowa-space-150); }
  .tk__today + .tk__today { margin-top: var(--uiowa-space-150); }
  .tk__why { max-width: 48rem; padding-left: 1.5rem; }
  .tk__why li + li { margin-top: var(--uiowa-space-100); }
  .tk__lede { max-width: 48rem; }
  /* Today and the step side by side, stacking when there isn't room for both. */
  .tk__docs {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
    gap: var(--uiowa-space-300); align-items: start;
  }
  .tk__docs-head {
    margin: 0 0 var(--uiowa-space-100) 11rem;
    font-weight: var(--uiowa-typography-font-weight-bold); color: var(--uiowa-color-neutral-800);
  }
  .tk__docs-note { margin: var(--uiowa-space-150) 0 0 11rem; }
  /* The sample page: its elements are plain siblings, as on a real page, so UIDS's base margins
     set the spacing (h2 to h6 take their top margin only when they aren't a first child). Each
     label is generated content in the gutter, out of the flow and hidden from screen readers. */
  .tk__doc { box-sizing: border-box; padding-left: 11rem; }
  .tk__doc > * { position: relative; }
  .tk__doc > [data-label]::before {
    content: attr(data-label) / "";
    position: absolute; top: 0; left: -11rem; width: 10.5rem;
    font: 400 0.8rem/1.4 'SF Mono', Monaco, Consolas, monospace;
    letter-spacing: 0; text-align: left; text-transform: none; color: var(--uiowa-color-neutral-500);
    white-space: nowrap;
  }
  .tk__doc > .tk__flag[data-label]::before { color: var(--uiowa-color-warning); }
  /* The compact row is a card: a frame around the text, not the labels, and card.scss's margins
     (no margin on p, none above a heading). */
  .tk__doc--card {
    --tk-pad: var(--uiowa-space-150);
    position: relative; padding: var(--tk-pad) var(--tk-pad) var(--tk-pad) calc(11rem + var(--tk-pad));
  }
  .tk__doc--card::after {
    content: ''; position: absolute; inset: 0 0 0 11rem; pointer-events: none;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__doc--card > [data-label]::before { left: calc(-11rem - var(--tk-pad)); }
  .tk__doc--card > p { margin-top: 0; margin-bottom: 0; }
  .tk__doc--card > :is(h2, h3) { margin-top: 0; }
  .tk__doc--card > a { margin-top: var(--uiowa-space-150); }
`;

const tsCss = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Special+Gothic:wdth,wght@75,600&display=swap');
  .ts {
    box-sizing: border-box; width: max-content; min-width: 100%; padding: 72px 88px 88px;
    background: var(--uiowa-color-neutral-100); color: var(--uiowa-color-neutral-800);
    font-family: Roboto, sans-serif;
  }
  .ts__grid {
    display: grid; grid-template-columns: 10rem max-content 8rem max-content;
    column-gap: 3rem; row-gap: 0.9rem; align-items: baseline;
  }
  .ts__head { grid-column: span 2; margin-bottom: 72px; }
  .ts__head + .ts__head { padding-left: 3rem; }
  .ts__eyebrow { margin: 0 0 10px; font: 400 15px/1.2 'Roboto Mono', monospace; color: var(--uiowa-color-neutral-500); }
  .ts .ts__title { margin: 0; font: 400 46px/1.1 'Roboto Mono', monospace; color: inherit; }
  .ts__label { font-size: 15px; line-height: 1.3; }
  .ts__spec { white-space: nowrap; }
  .ts__label--before { padding-left: 3rem; }
  .ts__empty { font-size: 15px; line-height: 1.3; color: var(--uiowa-color-neutral-400); font-style: italic; }
  .ts__first { margin-top: 36px; }
  .ts__note { grid-column: 1 / -1; margin: 64px 0 0; font-size: 14px; line-height: 1.5; color: var(--uiowa-color-neutral-500); }
`;

/**
 * Builds a step's two pages. afterCss: the step's generated custom properties. replaces: each
 * style and what it replaces today, one or a list. tags: the style each sample element takes.
 * eyebrow: the Typescale page's subtitle. levels: Foundations' levels, shown on step 2 only.
 * explain: adds why the scale is worth it and the density rows, on step 2 only.
 */
function createStep({ step, afterCss, replaces, tags, eyebrow, levels = null, explain = false }) {
  const AFTER = Object.fromEntries(
    [...afterCss.matchAll(/(--uiowa-[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
  );
  const exists = (key) => `${base(key)}-font-size` in AFTER;
  // What a style replaces, always as a list. Each entry is one of today's styles.
  const replacedOf = (key) => [].concat(replaces[key]);
  const wasOf = (replaced) => {
    if (replaced.was) return replaced.was;
    return replaced.size ? tokenId(base(replaced.size)) : BEFORE[replaced.key];
  };
  // Material 3's fifteen slots, then the step's styles outside them (step 1's intros).
  const SCALE = [
    ...ROLES.flatMap((role) => SIZES.map((size, i) => ({ key: `${role}-${size}`, first: i === 0 }))),
    ...Object.keys(replaces).filter((key) => !inScale(key)).map((key, i) => ({ key, first: i === 0 })),
  ];
  const merges = Object.values(replaces).some((replaced) => Array.isArray(replaced));
  const LIVE_NAMES = [
    ...Object.keys(BEFORE).flatMap((key) => CHANNELS.map(({ name }) => `${base(key)}-${name}`)),
    base('size-large'),
    base('size-small'),
    ...Object.keys(AFTER).filter(isPrimitive),
  ];
  const SAMPLE = SAMPLE_TEXT.map((item) => ({ ...item, key: tags[item.tag] }));

  // Reads the step's values from the page's wrapper and today's values from the live tokens on
  // :root, once the page has mounted.
  function useTokens() {
    const root = ref(null);
    const computedOf = ref({});
    const liveOf = ref({});
    onMounted(() => {
      const style = getComputedStyle(root.value);
      computedOf.value = Object.fromEntries(Object.keys(AFTER).map((name) => [name, style.getPropertyValue(name).trim()]));
      const live = getComputedStyle(document.documentElement);
      liveOf.value = Object.fromEntries(LIVE_NAMES.map((name) => [name, live.getPropertyValue(name).trim()]));
    });
    const value = (name) => computedOf.value[name] || AFTER[name];
    const live = (name) => liveOf.value[name] || '';
    const beforeStyleOf = (replaced) => {
      const style = replaced.key
        ? Object.fromEntries(CHANNELS.map(({ name, property }) => [property, live(`${base(replaced.key)}-${name}`)]))
        : {};
      if (replaced.size) style.fontSize = live(base(replaced.size));
      for (const [property, set] of Object.entries(replaced.set || {})) style[property] = set.startsWith('--') ? live(set) : set;
      return style;
    };
    return { root, liveOf, value, live, beforeStyleOf };
  }

  const Typography = {
    name: `Step ${step} Typography`,
    render: () => ({
      setup() {
        const { root, liveOf, value, live, beforeStyleOf } = useTokens();
        // A primitive this step adds is one the live tokens don't have.
        const primitives = computed(() => Object.keys(AFTER).filter(isPrimitive).map((name) => ({
          name, kind: kindOf(name), value: value(name), added: Object.keys(liveOf.value).length > 0 && !live(name),
        })));
        const added = computed(() => primitives.value.filter((t) => t.added).map((t) => tokenId(t.name)));
        const fonts = computed(() => Object.keys(AFTER).filter((name) => name.startsWith(base('typeface-'))).map((role) => {
          const primitive = pointsAt(AFTER[role]);
          const family = live(primitive);
          return {
            role: tokenId(role),
            primitive: tokenId(primitive),
            variable: primitive,
            face: faceText(value(primitive)),
            before: family ? Object.keys(BEFORE).filter((key) => live(`${base(key)}-font-family`) === family).map((key) => BEFORE[key]) : [],
            after: Object.keys(replaces).filter((key) => exists(key) && pointsAt(AFTER[`${base(key)}-font-family`]) === role).map(tokenId),
          };
        }));
        // One row per style and what it replaces, so a merged style has a row for each.
        const rowFor = (key, replaced) => {
          const before = beforeStyleOf(replaced);
          return {
            key: `${key}:${wasOf(replaced)}`,
            id: tokenId(key),
            was: wasOf(replaced),
            channels: CHANNELS.map(({ name, property }) => ({
              name,
              before: show(name, before[property]),
              after: show(name, value(`${base(key)}-${name}`)),
              via: name === 'font-family' ? tokenId(pointsAt(AFTER[`${base(key)}-${name}`])) : '',
            })),
          };
        };
        const groups = computed(() => [...ROLES, 'intro'].map((role) => ({
          role,
          label: role === 'intro' ? 'Intro, outside the Material 3 scale' : role[0].toUpperCase() + role.slice(1),
          rows: Object.keys(replaces)
            .filter((key) => key.startsWith(`${role}-`) && exists(key))
            .flatMap((key) => replacedOf(key).map((replaced) => rowFor(key, replaced))),
        })).filter((group) => group.rows.length));
        const semanticCount = Object.keys(AFTER).filter((name) => !isPrimitive(name)).length;
        const specStyle = (t) => ({ ...styleOf(t.key), ...(t.override || {}) });
        // Each density row's two sides, worked out element by element. The buttons keep today's
        // classes on both sides, so their padding matches; step 2 sets their text, in sentence case.
        const densities = computed(() => (explain ? DENSITIES : []).map((d) => {
          const buttonClass = (item) => (item.tag === 'a' ? ['bttn', 'bttn--primary', d.button] : null);
          return {
            ...d,
            sides: [
              {
                name: 'Today',
                note: d.todayNote,
                items: DENSITY_TEXT.map((item, i) => ({
                  ...item,
                  className: buttonClass(item),
                  style: d.today[i].replaced ? beforeStyleOf(d.today[i].replaced) : null,
                  label: `${markupOf(item)}  ${d.today[i].source}${d.today[i].warn ? ' *' : ''}`,
                  warn: d.today[i].warn,
                })),
              },
              {
                name: `Step ${step}`,
                note: d.afterNote,
                items: DENSITY_TEXT.map((item, i) => ({
                  ...item,
                  className: buttonClass(item),
                  style: { ...styleOf(d.after[i].key), ...(item.tag === 'a' ? { textTransform: 'none' } : {}) },
                  label: `${markupOf(item)}  ${tokenId(d.after[i].key)}${d.after[i].warn ? ' *' : ''}`,
                  warn: d.after[i].warn,
                })),
              },
            ],
          };
        }));
        return {
          root, step, vars: AFTER, css, CHANNELS, ROLES, SIZES, exists, styleOf, beforeStyleOf, replacedOf, wasOf,
          merges, PROPERTY, primitives, added, fonts, groups, semanticCount, levels, specStyle, SAMPLE, markupOf,
          tokenId, todayOf, explain, densities,
        };
      },
      template: `
        <div class="tk tokens-after" ref="root" :style="vars">
          <component is="style">{{ css }}</component>
          <h1>Typography tokens: step {{ step }}</h1>
          <p v-if="step === 1" class="tk__banner">
            <b>Prototype, step 1: Material 3 roles with today's faces and sizes.</b> Today's styles
            move into Material 3's role names, and no composites: each style is five separate
            tokens. Faces come from two typeface roles, brand and plain. h1 to h3 take the headline
            slots, h4 to h6 the title slots, and body text and its two size modifiers the body
            slots; display and label stay empty until step 2. Every style matches today's, so
            nothing looks different. Built from <code>typography-after-step-1.jsonc</code> over
            today's primitives; compare with <b>Tokens › Typography</b> and with step 2. Nothing in
            the live build changes.
          </p>
          <p v-else class="tk__banner">
            <b>Prototype, step 2: Material 3 roles with Foundations' faces.</b> Five roles (display,
            headline, title, body, label) in three sizes, and no composites: each style is five
            separate tokens. Faces come from three typeface roles named after Foundations' families.
            h1 takes display.small in Special Gothic Condensed SemiBold, h2 and h3 take Roboto Black,
            and h4 to h6 take Zilla Slab SemiBold. The banner's three headline sizes fill
            display.large, display.medium and headline.large, and the labels take Special Gothic
            Condensed SemiBold at today's button, form label and badge sizes. The intros fold into
            the scale: the light intro becomes body.large, unchanged, and the bold intro takes
            title.large. Sizes and leading are today's. Built from the
            <code>typography-after-step-2.jsonc</code> files beside each
            real <code>typography.json</code>; compare with <b>Tokens › Typography</b> and with
            step 1. Nothing in the live build changes.
          </p>

          <template v-if="explain">
            <h2>Why the Material scale</h2>
            <ol class="tk__why">
              <li>
                <b>Styles are named for their job, not a tag.</b> Today each heading style is named
                for the element that wears it (heading.h2), so restyling an h2 means borrowing
                another tag's style, as in <code>&lt;h2 class="h4"&gt;</code>. A role names what the
                text does. The h2 keeps its level for screen readers and the page outline, and how
                it looks is a separate choice.
              </li>
              <li>
                <b>One scale for all text.</b> Today's tokens cover headings, body text and the
                intros. The banner, card, button, form label and badge set their own sizes in
                component CSS, so nothing keeps them in proportion and no Figma variable holds them.
                Display and label give them places on the scale.
              </li>
              <li>
                <b>Three sizes in every role.</b> Large, medium and small let a layout get roomier or
                denser and keep its hierarchy: step a size up or down and stay in the role. Today
                each tag has one size, and no token is bigger than h1's.
              </li>
              <li>
                <b>Built for Figma.</b> Each style is five single-value tokens. Each becomes a Figma
                variable, and a Figma text style binds the five, so Figma and code share the same
                values. Today's composite tokens can only become text styles.
              </li>
              <li>
                <b>A known vocabulary.</b> These are Material 3's names. Designers and developers who
                have worked with Material already know what headline.small or label.large is for.
              </li>
            </ol>
            <p class="tk__note">
              The last two sections show the first three on a page: h1 to h6 today and in step 2,
              then one block at three densities.
            </p>
          </template>

          <h2>Primitives</h2>
          <p class="tk__note">
            <template v-if="added.length">
              {{ added.length }} added: <code>{{ added.join(', ') }}</code>. The rest match today's primitives.
            </template>
            <template v-else>The same primitives as today.</template>
          </p>
          <table>
            <thead><tr><th>Token</th><th>Value</th><th>Specimen</th></tr></thead>
            <tbody>
              <tr v-for="t in primitives" :key="t.name">
                <td><code>{{ t.name }}</code><span v-if="t.added" class="tk__note"> new</span></td>
                <td><code>{{ t.value }}</code></td>
                <td>
                  <span v-if="t.kind === 'line-height'" class="tk__leading" :style="{ lineHeight: 'var(' + t.name + ')' }">Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                  <span v-else class="tk__specimen" :style="{ [PROPERTY[t.kind]]: 'var(' + t.name + ')' }">Aa Hawkeye</span>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Semantic</h2>
          <p class="tk__note">{{ semanticCount }} tokens, against 11 today. Every one is a single value; none is a composite.</p>

          <h3>Typefaces</h3>
          <p class="tk__note">
            Today there are no typeface roles: each style names its font itself. After, each style
            points at a role, so changing a face is one edit.
          </p>
          <table>
            <thead><tr><th>Font</th><th>Before: styles that name it</th><th>After: role</th><th>After: styles that use the role</th><th>Specimen</th></tr></thead>
            <tbody>
              <tr v-for="f in fonts" :key="f.role">
                <td>{{ f.face }}<div><code class="tk__note">{{ f.primitive }}</code></div></td>
                <td>
                  <code v-if="f.before.length">{{ f.before.join(', ') }}</code>
                  <span v-else class="tk__empty">None. No token today.</span>
                </td>
                <td><code>{{ f.role }}</code></td>
                <td><code>{{ f.after.join(', ') }}</code></td>
                <td class="tk__specimen" :style="{ fontFamily: 'var(' + f.variable + ')' }">Aa Hawkeye</td>
              </tr>
            </tbody>
          </table>

          <h3>The scale</h3>
          <p class="tk__note">
            Material 3's fifteen slots. Each filled slot shows what it replaces today above its
            step {{ step }} style:
            <template v-if="step === 1">a heading or body token.</template>
            <template v-else>a heading, body or intro token, a banner headline size, or a component's text.</template>
            <template v-if="merges"> Where a slot replaces more than one of today's styles, each is shown.</template>
          </p>
          <table class="tk__grid">
            <thead><tr><th></th><th v-for="s in SIZES" :key="s" style="text-transform: capitalize">{{ s }}</th></tr></thead>
            <tbody>
              <tr v-for="r in ROLES" :key="r">
                <th scope="row">{{ r }}</th>
                <td v-for="s in SIZES" :key="s">
                  <template v-if="exists(r + '-' + s)">
                    <div v-for="x in replacedOf(r + '-' + s)" :key="wasOf(x)" class="tk__side">
                      <div class="tk__tag">Before · <code>{{ wasOf(x) }}</code></div>
                      <div class="tk__specimen" :style="beforeStyleOf(x)">Aa Hawkeye</div>
                    </div>
                    <div class="tk__side">
                      <div class="tk__tag">After · <code>{{ r }}.{{ s }}</code></div>
                      <div class="tk__specimen" :style="styleOf(r + '-' + s)">Aa Hawkeye</div>
                    </div>
                  </template>
                  <span v-else class="tk__empty">Not used</span>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Styles</h3>
          <p class="tk__note">
            One row per style and one column per token<template v-if="merges">, and a row for each
            of today's styles where a style replaces more than one</template>. Where step {{ step }} changes a value,
            today's value comes first, struck through. Sizes run from a 600px-wide screen to a
            1310px one.
          </p>
          <table class="tk__styles">
            <thead><tr><th>Style</th><th v-for="c in CHANNELS" :key="c.name">{{ c.name }}</th></tr></thead>
            <tbody v-for="g in groups" :key="g.role">
              <tr class="tk__group"><th :colspan="CHANNELS.length + 1">{{ g.label }}</th></tr>
              <tr v-for="s in g.rows" :key="s.key">
                <td><code>{{ s.id }}</code><div class="tk__note">was <code>{{ s.was }}</code></div></td>
                <td v-for="c in s.channels" :key="c.name">
                  <template v-if="c.before && c.before !== c.after"><span class="tk__was">{{ c.before }}</span> → </template>{{ c.after }}
                  <div v-if="c.via"><code class="tk__note">{{ c.via }}</code></div>
                </td>
              </tr>
            </tbody>
          </table>

          <template v-if="levels">
            <h2>Where the sources disagree</h2>
            <p class="tk__note">
              Foundations names four levels. Its Scale page, its Typography page and UIDS disagree on
              face, weight, size and leading.
            </p>
            <table>
              <thead><tr><th>Level</th><th>Foundations Scale page</th><th>Foundations Typography page</th><th>UIDS today</th></tr></thead>
              <tbody>
                <tr v-for="l in levels" :key="l.level">
                  <th scope="row">{{ l.level }}</th>
                  <td>{{ l.scale }}</td>
                  <td>{{ l.typography }}</td>
                  <td>{{ l.uids }}</td>
                </tr>
              </tbody>
            </table>

            <h3>Your picks beside UIDS today</h3>
            <p class="tk__note">
              Each level as this page's step 2 style and as UIDS renders it today. Special Gothic
              Condensed loads from Google Fonts' Special Gothic at its condensed width.
            </p>
            <div class="tk__scroll">
              <table class="tk__picks">
                <thead><tr><th>Level</th><th>After (step 2)</th><th>UIDS today</th></tr></thead>
                <tbody>
                  <tr v-for="l in levels" :key="l.level">
                    <th scope="row">
                      {{ l.level }}
                      <div class="tk__note">{{ l.role }}</div>
                      <div class="tk__note">{{ l.face }}</div>
                    </th>
                    <td>
                      <div v-for="t in l.after" :key="t.label" class="tk__today">
                        <div :style="specStyle(t)">{{ l.text }}</div>
                        <code class="tk__note">{{ t.label }}</code>
                      </div>
                    </td>
                    <td>
                      <div v-for="t in l.today" :key="t.label" class="tk__today">
                        <div :style="specStyle(t)">{{ l.text }}</div>
                        <code class="tk__note">{{ t.label }}</code>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <h2>h1 to h6, today and step {{ step }}</h2>
          <p class="tk__note">
            The same markup twice: h1 to h6 with body text between, as UIDS styles it today and as
            step {{ step }} does. Each keeps UIDS's own margins, so the gaps are the ones a page gets,
            and the column beside each element names its tag and token.
          </p>
          <p class="tk__lede">
            Today each tag has one style, named for it: an h2 is heading.h2 wherever it appears, and
            making it look different means borrowing another tag's style. In step {{ step }}, each
            tag starts from a default step on the scale, the h2 from headline.medium, and every
            other step has a name of its own.<template v-if="explain"> The density rows below show
            what that buys.</template>
          </p>
          <div class="tk__docs">
            <div>
              <div class="tk__docs-head">Today</div>
              <div class="tk__doc">
                <component
                  v-for="(item, i) in SAMPLE" :key="i" :is="item.tag"
                  :data-label="markupOf(item) + '  ' + todayOf(item.tag)"
                >{{ item.text }}</component>
              </div>
            </div>
            <div>
              <div class="tk__docs-head">Step {{ step }}</div>
              <div class="tk__doc">
                <component
                  v-for="(item, i) in SAMPLE" :key="i" :is="item.tag"
                  :data-label="markupOf(item) + '  ' + tokenId(item.key)"
                  :style="styleOf(item.key)"
                >{{ item.text }}</component>
              </div>
            </div>
          </div>

          <template v-if="explain">
            <h2>Density</h2>
            <p class="tk__note">
              Density is how much fits in a space: a feature section wants room, a card wants it
              tight. Each row sets the same block (a heading, text, a subheading, more text and a
              button) at one density, on the left with today's tokens and component CSS and on the
              right with step {{ step }}'s scale. Both sides of a row share their spacing, a card's
              own margins in the compact row, so only the type changes. An asterisk marks a size
              that isn't a token, a style borrowed from another tag, or a gap in the scale.
            </p>
            <template v-for="d in densities" :key="d.name">
              <h3>{{ d.name }}</h3>
              <p class="tk__note">{{ d.use }}</p>
              <div class="tk__docs">
                <div v-for="side in d.sides" :key="side.name">
                  <div class="tk__docs-head">{{ side.name }}</div>
                  <div :class="['tk__doc', { 'tk__doc--card': d.card }]">
                    <component
                      v-for="(item, i) in side.items" :key="i" :is="item.tag"
                      :class="[item.className, { tk__flag: item.warn }]"
                      :href="item.tag === 'a' ? '#' : null" @click.prevent
                      :data-label="item.label" :style="item.style"
                    >{{ item.text }}</component>
                  </div>
                  <p class="tk__note tk__docs-note">{{ side.note }}</p>
                </div>
              </div>
            </template>
            <p class="tk__lede">
              <b>What this shows.</b> The scale gives headings and button text a named step at each
              density, where today the card and the button set their own sizes and a heading inside a
              card can outgrow the card's title. It has two gaps: nothing near 16px for compact body
              text, and nothing above label.large for the large button.
            </p>
          </template>
        </div>
      `,
    }),
  };

  const Typescale = {
    name: `Step ${step} Typescale`,
    render: () => ({
      setup() {
        const { root, value, beforeStyleOf } = useTokens();
        const afterOf = (key) => Object.fromEntries(CHANNELS.map(({ name, property }) => [property, value(`${base(key)}-${name}`)]));
        // A style that replaces more than one of today's gets a further row for each, with its
        // own cells left empty.
        const rows = computed(() => SCALE.flatMap(({ key, first }) => {
          const used = exists(key);
          const style = {
            key,
            first,
            used,
            name: titleCase(key),
            afterStyle: used ? styleOf(key) : null,
            afterText: used ? describe(afterOf(key)) : 'Not used',
          };
          if (!used) return [{ ...style, beforeName: '', beforeStyle: null, beforeText: '' }];
          return replacedOf(key).map((replaced, i) => {
            const before = beforeStyleOf(replaced);
            return {
              ...(i === 0 ? style : { key: `${key}-${i}`, first: false, used, name: '', afterStyle: null, afterText: '' }),
              beforeName: BEFORE_NAMES[wasOf(replaced)],
              beforeStyle: before,
              beforeText: before.fontFamily ? describe(before) : '',
            };
          });
        }));
        const outside = SCALE.some(({ key }) => !inScale(key));
        return { root, step, eyebrow, vars: AFTER, tsCss, rows, merges, outside };
      },
      template: `
        <div class="ts tokens-after" ref="root" :style="vars">
          <component is="style">{{ tsCss }}</component>
          <div class="ts__grid">
            <header class="ts__head">
              <p class="ts__eyebrow">{{ eyebrow }}</p>
              <h1 class="ts__title">Step {{ step }} Typescale</h1>
            </header>
            <header class="ts__head">
              <p class="ts__eyebrow">UIDS 5.x · live tokens</p>
              <h1 class="ts__title">Today's Typescale</h1>
            </header>
            <template v-for="r in rows" :key="r.key">
              <div :class="['ts__label', { ts__first: r.first }]">{{ r.name }}</div>
              <div :class="['ts__spec', { ts__first: r.first, ts__empty: !r.used }]" :style="r.afterStyle">{{ r.afterText }}</div>
              <div :class="['ts__label', 'ts__label--before', { ts__first: r.first }]">{{ r.beforeName }}</div>
              <div :class="['ts__spec', { ts__first: r.first }]" :style="r.beforeStyle">{{ r.beforeText }}</div>
            </template>
            <p class="ts__note">
              Each style is set at its largest size, on screens 1310px and wider. Each style on the
              right is the one its left neighbour replaces.
              <template v-if="merges"> Where a style replaces more than one, each is listed.</template>
              <template v-if="outside"> The intros sit outside Material 3's fifteen styles.</template>
            </p>
          </div>
        </div>
      `,
    }),
  };

  return { Typography, Typescale };
}

export default {
  title: 'Tokens (after)',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

const step1 = createStep({
  step: 1,
  afterCss: step1Css,
  replaces: STEP_1_REPLACES,
  tags: STEP_1_TAGS,
  eyebrow: "Material 3 roles · today's faces",
});
const step2 = createStep({
  step: 2,
  afterCss: step2Css,
  replaces: STEP_2_REPLACES,
  tags: STEP_2_TAGS,
  eyebrow: 'Material 3 roles · Foundations faces',
  levels: LEVELS,
  explain: true,
});

export const Step1Typography = step1.Typography;
export const Step1Typescale = step1.Typescale;
export const Step2Typography = step2.Typography;
export const Step2Typescale = step2.Typescale;
