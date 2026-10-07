import { computed, ref, onMounted } from 'vue';
import breakpointTokens from '../../tokens/primitives/breakpoints.json';
import layoutTokens from '../../tokens/semantic/layout.json';

const TOKEN_FILES = import.meta.glob('../../tokens/**/*.json', { eager: true, import: 'default' });

const TYPOGRAPHY_CHANNELS = [
  { name: 'font-family', property: 'fontFamily' },
  { name: 'font-weight', property: 'fontWeight' },
  { name: 'font-size', property: 'fontSize' },
  { name: 'letter-spacing', property: 'letterSpacing' },
  { name: 'line-height', property: 'lineHeight' },
];
const TYPOGRAPHY_CHANNEL_PATTERN = new RegExp(`-(${TYPOGRAPHY_CHANNELS.map(({ name }) => name).join('|')})$`);

/**
 * These stories read the --uiowa-* custom properties out of the loaded stylesheets and
 * render each one through itself: a color swatch is painted by its own token, a type
 * specimen is set with its own channels.
 */
function readTokens() {
  const found = new Map();
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet
    }
    for (const rule of rules) {
      if (!rule.style || !rule.selectorText) continue;
      for (const prop of rule.style) {
        if (prop.startsWith('--uiowa-')) {
          found.set(prop, rule.style.getPropertyValue(prop).trim());
        }
      }
    }
  }
  return found;
}

/** A semantic token's declared value is a var() reference; the reader wants the primitive's name. */
const primitiveOf = (declared) => declared.replace(/^var\(\s*/, '').replace(/\s*\)$/, '');

/** The alpha color a shadow is drawn in: the var() inside its declared value. */
const colorOf = (declared) => (declared.match(/var\(\s*(--uiowa-[\w-]+)\s*\)/) || [])[1] || '';

const tokensIn = (group) => Object.entries(group).filter(([key]) => !key.startsWith('$'));
const breakpointRow = (path, px) => ({
  name: `$uiowa-${path.join('-')}`,
  px: `${px}px`,
  rem: `${String(Number((px / 16).toFixed(4)))}rem`,
});
const BREAKPOINT_PX = Object.fromEntries(
  tokensIn(breakpointTokens.breakpoint).map(([key, token]) => [key, token.$value.value]),
);
const BREAKPOINTS = [
  ...Object.entries(BREAKPOINT_PX).map(([key, px]) => ({
    tier: 'primitive',
    ...breakpointRow(['breakpoint', key], px),
  })),
  ...tokensIn(layoutTokens.layout.breakpoint).map(([key, token]) => {
    const target = token.$value.match(/^\{breakpoint\.(\w+)\}$/)[1];
    return {
      tier: 'semantic',
      primitive: `$uiowa-breakpoint-${target}`,
      ...breakpointRow(['layout', 'breakpoint', key], BREAKPOINT_PX[target]),
    };
  }),
];

/** The tokens this PR adds, by tier and token file. */
const ADDED = {
  primitives: {
    colors: [
      'color.green-light', 'color.purple', 'color.cyan', 'color.olive', 'color.rose', 'color.gray-warm', 'color.gray-cool',
      'color.alpha.black-200', 'color.alpha.black-425', 'color.alpha.near-black-150', 'color.alpha.white-425',
    ],
    stroke: ['stroke.width.1', 'stroke.width.2', 'stroke.width.4', 'stroke.width.5', 'stroke.width.6', 'stroke.width.8'],
    radius: ['radius.3', 'radius.full'],
    motion: ['duration.150', 'duration.250', 'duration.400'],
    breakpoints: [
      'breakpoint.400', 'breakpoint.600', 'breakpoint.768', 'breakpoint.930', 'breakpoint.980',
      'breakpoint.1200', 'breakpoint.1350',
    ],
  },
  semantic: {
    colors: [
      'color.accent.blue', 'color.border.strong', 'color.border.strong-inverse',
      'color.data-visualization.categorical.1', 'color.data-visualization.categorical.2', 'color.data-visualization.categorical.3', 'color.data-visualization.categorical.4', 'color.data-visualization.categorical.5', 'color.data-visualization.categorical.6',
      'color.data-visualization.categorical.7', 'color.data-visualization.categorical.8', 'color.data-visualization.categorical.9', 'color.data-visualization.categorical.10', 'color.data-visualization.categorical.11', 'color.data-visualization.categorical.12',
    ],
    stroke: ['stroke.width.default', 'stroke.width.focused'],
    shadow: ['shadow.inset', 'shadow.raised'],
    motion: ['motion.duration.fast', 'motion.duration.medium', 'motion.duration.slow', 'easing.standard', 'easing.overshoot'],
    form: ['form.height.medium', 'form.height.large'],
    logo: ['logo.minWidth'],
    layout: ['layout.breakpoint.standard'],
  },
};
const ADDED_SECTIONS = {
  colors: 'Colors',
  stroke: 'Stroke widths',
  radius: 'Radius',
  motion: 'Motion',
  breakpoints: 'Breakpoints',
  shadow: 'Shadows',
  form: 'Form heights',
  logo: 'Logo',
  layout: 'Breakpoints',
};
const ADDED_SECTION_NOTES = {
  'primitives-breakpoints': breakpointTokens.breakpoint.$description,
  'semantic-motion': 'Duration is the speed: how long the move takes. Easing is how the speed changes along the way, its expression.',
  'semantic-layout': "Only one, because a semantic token names a job, and 1350 is the only breakpoint with one in the layout: the width at which the content column reaches its maximum, 1310px (layout.container.max.standard) plus the 20px gutter on each side. $break-page-container reads from it. The other six have only size names in Sass ($break-xxsm to $break-lg, and 930 in the grid mixins), which say how wide, not what changes there, so they stay primitives, named by value.",
};
const ADDED_GROUP_INTROS = {
  'color.alpha.black-200': { label: 'Alpha colors', path: 'color.alpha' },
  'color.accent.blue': { label: 'Accent colors', path: 'color.accent' },
  'color.border.strong': { label: 'Border colors', path: 'color.border' },
  'color.data-visualization.categorical.1': { label: 'Categorical data visualization', path: 'color.data-visualization.categorical' },
};
/**
 * Component examples for the In this PR page: a story, and the args that bring out the
 * token or the change. The background is the component's own background arg:
 * Storybook's backgrounds only paint the canvas, and these tokens follow the bg-- class a
 * component sets.
 */
const EXAMPLES = {
  ctaGold: { label: 'CTA on gold', id: 'components-cta--centered', args: 'background:gold' },
  ctaBlack: { label: 'CTA on black', id: 'components-cta--centered', args: 'background:black' },
  cardGold: { label: 'Card on gold', id: 'components-card--default', args: 'background:gold' },
  cardBlack: { label: 'Card on black', id: 'components-card--default', args: 'background:black' },
  card: { label: 'Card', id: 'components-card--default' },
  table: { label: 'Table', id: 'components-table--default' },
  text: { label: 'Text field', id: 'elements-form--text' },
  textLarge: { label: 'Large text field', id: 'elements-form--text', args: 'large:!true' },
  textFocus: { label: 'Text field (click into it)', id: 'elements-form--text' },
  checkboxFocus: { label: 'Checkbox (tab to it)', id: 'elements-form--checkbox' },
  checkboxError: { label: 'Checkbox with an error', id: 'elements-form--checkbox', args: 'error:!true' },
  select: { label: 'Select', id: 'elements-form--select' },
  toggle: { label: 'Toggle', id: 'elements-form--toggle' },
  badge: { label: 'Badge', id: 'components-badge--default' },
  alert: { label: 'Info alert', id: 'components-alert--info' },
  alertSuccess: { label: 'Success alert', id: 'components-alert--success' },
  alertDanger: { label: 'Danger alert', id: 'components-alert--danger' },
  button: { label: 'Button (point at it)', id: 'components-button--primary' },
  headlineH2: { label: 'Underlined h2', id: 'components-headline--underline', args: 'level:h2' },
  headlineH5: { label: 'Underlined h5', id: 'components-headline--underline', args: 'level:h5' },
  headlineH6: { label: 'Underlined h6', id: 'components-headline--underline', args: 'level:h6' },
  menu: { label: 'Horizontal menu', id: 'components-menu--horizontal-menu' },
  stat: { label: 'Stat', id: 'components-stat--default' },
  blockquote: { label: 'Blockquote', id: 'components-blockquote--left' },
  accordion: { label: 'Accordion', id: 'components-accordion--default' },
  accordionFocus: { label: 'Accordion (tab to a heading)', id: 'components-accordion--default' },
  cardLink: { label: 'Card text link', id: 'components-card--default' },
  cardLinkGray: { label: 'Card text link on gray', id: 'components-card--default', args: 'background:gray' },
  cardLinkBlack: { label: 'Card text link on black', id: 'components-card--default', args: 'background:black' },
  badgeBlue: { label: 'Blue badge', id: 'components-badge--blue' },
  buttonDefault: { label: 'Button', id: 'components-button--primary' },
  buttonSmall: { label: 'Small button', id: 'components-button--primary', args: 'size:small' },
  statGold: { label: 'Horizontal stat on gold, 980 to 1350px wide', id: 'components-stat--horizontal', args: 'background:gold' },
  spaceAndLayout: { label: 'Tokens › Space and layout', id: 'tokens--space-and-layout' },
};
const ADDED_EXAMPLES = {
  'color.alpha.black-200': ['toggle'],
  'color.alpha.black-425': ['ctaGold', 'cardGold'],
  'color.alpha.near-black-150': ['text'],
  'color.alpha.white-425': ['ctaBlack', 'cardBlack'],
  'stroke.width.1': ['card', 'table'],
  'stroke.width.2': ['checkboxError', 'textFocus'],
  'stroke.width.4': ['button', 'headlineH6'],
  'stroke.width.5': ['menu', 'headlineH5'],
  'stroke.width.6': ['headlineH2'],
  'stroke.width.8': ['stat', 'blockquote'],
  'radius.3': ['text', 'alert'],
  'radius.full': ['badge', 'toggle'],
  'duration.150': ['text', 'select'],
  'duration.250': ['toggle', 'accordion', 'menu'],
  'duration.400': ['stat'],
  'easing.standard': ['text', 'accordion'],
  'easing.overshoot': ['toggle'],
  'color.border.strong': ['ctaGold', 'cardGold'],
  'color.border.strong-inverse': ['ctaBlack', 'cardBlack'],
  'stroke.width.default': ['card', 'table'],
  'stroke.width.focused': ['textFocus', 'checkboxFocus', 'accordionFocus'],
  'shadow.inset': ['text'],
  'shadow.raised': ['toggle'],
  'motion.duration.fast': ['text', 'select'],
  'motion.duration.medium': ['toggle', 'accordion', 'menu'],
  'motion.duration.slow': ['stat', 'blockquote'],
  'form.height.medium': ['text'],
  'form.height.large': ['textLarge'],
};
// Where each added token is used, shown after its description in the Use column.
const USES = {
  'color.green-light': 'Used through color.data-visualization.categorical.4.',
  'color.purple': 'Used through color.data-visualization.categorical.5.',
  'color.cyan': 'Used through color.data-visualization.categorical.8.',
  'color.olive': 'Used through color.data-visualization.categorical.9.',
  'color.rose': 'Used through color.data-visualization.categorical.10.',
  'color.gray-warm': 'Used through color.data-visualization.categorical.11.',
  'color.gray-cool': 'Used through color.data-visualization.categorical.12.',
  'color.alpha.black-200': 'The toggle knob shadow (shadow.raised).',
  'color.alpha.black-425': 'A strong border on light surfaces: buttons (color.border.strong).',
  'color.alpha.near-black-150': "The inset shadow on form fields (shadow.inset): UIDS's rgba(10, 10, 10, 0.15). #0A0A0A is not a step on the neutral ramp.",
  'color.alpha.white-425': 'A strong border on dark surfaces: buttons (color.border.strong-inverse).',
  'stroke.width.1': 'The resting outline on form fields (form.scss), through stroke.width.default.',
  'stroke.width.2': 'Focus rings, through stroke.width.focused.',
  'stroke.width.4': 'The button focus and hover bar, and the h6 headline underline.',
  'stroke.width.5': 'The tab and menu indicators, and the h5 headline underline.',
  'stroke.width.6': 'The headline underline on h1 to h4, and the gold spacer.',
  'stroke.width.8': 'Stat titles and blockquotes.',
  'duration.150': 'Used through motion.duration.fast.',
  'duration.250': 'Used through motion.duration.medium.',
  'duration.400': 'Used through motion.duration.slow.',
  'easing.standard': 'Form field focus, select options and the toggle track (form.scss), the button focus bar (_utilities.scss), accordion icons (accordion.scss), menu and tab indicators (menu.scss, tabs.scss) and expanding stat content (stat.scss).',
  'easing.overshoot': 'The toggle switch knob (form.scss).',
  'breakpoint.930': 'The grid mixins (abstracts/_grid-mixins.scss).',
  'breakpoint.1350': 'The page container ($break-page-container), through layout.breakpoint.standard.',
  'stroke.width.focused': 'Form fields, file inputs, checkboxes and radios (form.scss), accordion headings (accordion.scss) and circle buttons (button.scss). Toggles and accordion summaries use a 1px outline; standard buttons use an underline and accent bar.',
  'shadow.inset': 'Form fields (form.scss).',
  'shadow.raised': 'The toggle switch knob (form.scss).',
  'motion.duration.fast': 'Form field focus and select options (form.scss).',
  'motion.duration.medium': 'The toggle switch (form.scss), accordion icons (accordion.scss), menu and tab indicators (menu.scss, tabs.scss) and the button focus bar (_utilities.scss).',
  'motion.duration.slow': 'Expanding stat content (stat.scss).',
  'logo.minWidth': 'The Logo component does not use this token yet.',
};
// Relative to the preview's iframe.html, so the link works wherever Storybook is served.
const linksFor = (keys = []) => keys.map((key) => {
  const { label, id, args } = EXAMPLES[key];
  return { label, href: `./?path=/story/${id}${args ? `&args=${args}` : ''}` };
});
const exampleLinks = (path) => linksFor(ADDED_EXAMPLES[path]);

/**
 * The token values this PR changes. was: 5.x's value (dc0efcf697). wasPoints: what a
 * semantic token pointed at then.
 */
const CHANGED_VALUES = [
  { path: 'color.blue-dark', was: '#00558C', shows: 'Links on white and gray (color.link.default points here), and now info.', examples: ['cardLink', 'cardLinkGray'] },
  { path: 'color.link.inverse', was: '#FFCD00', wasPoints: '--uiowa-color-brand-gold', shows: 'Links on black. Links on gold stay black; footer and table caption links set gold directly, so they stay gold.', examples: ['cardLinkBlack'] },
  { path: 'color.info', was: '#3375D1', wasPoints: '--uiowa-color-blue', shows: 'Info, now the same blue as links on light surfaces: .badge--blue and the .alert--info icon.', examples: ['badgeBlue', 'alert'] },
  { path: 'color.blue-wash', was: '#EAF1FB', shows: 'The info surface: info alert backgrounds. A shade lighter, so links clear 4.5:1 on it.', examples: ['alert'] },
  { path: 'color.green-wash', was: '#E6F4EE', shows: 'The success surface: success alert backgrounds. A shade lighter, so links clear 4.5:1 on it.', examples: ['alertSuccess'] },
  { path: 'color.red-wash', was: '#FBEAEA', shows: 'The danger surface: danger alerts, form fields and toggles with an error, and mark.deletion. A shade lighter, so links clear 4.5:1 on it.', examples: ['alertDanger'] },
  { path: 'color.blue', was: '#3375D1', shows: 'The blue accent, and now links on black.', examples: ['cardLinkBlack'] },
  { path: 'color.orange', was: '#CC6D17', shows: 'An accent. No component uses one yet.' },
  { path: 'color.magenta', was: '#AA4981', shows: 'An accent. No component uses one yet.' },
  { path: 'color.ochre', was: '#C08C00', shows: 'An accent. No component uses one yet.' },
];
const CHANGED_COMPONENTS = [
  {
    section: 'Sizes',
    note: 'Large, light-font and circle buttons are unchanged.',
    rows: [
      { what: 'Form field', was: '46.4px', now: '48px', token: '--uiowa-form-height-medium', examples: ['text'] },
      { what: 'Large form field', was: '56px', now: '64px', token: '--uiowa-form-height-large', examples: ['textLarge'] },
      { what: 'Default button', was: '65.2px', now: '64px', token: '--uiowa-space-400', examples: ['buttonDefault'] },
      { what: 'Small button', was: '47.9px', now: '48px', token: '--uiowa-space-300', examples: ['buttonSmall'] },
      { what: 'Lowercase button', was: '59.6px', now: '64px', token: '--uiowa-space-400' },
    ],
  },
  {
    section: 'Borders and corners',
    rows: [
      { what: 'Circle button focus ring', was: '3px', now: '2px', token: '--uiowa-stroke-width-focused' },
      { what: 'Blockquote rule', was: '10px', now: '8px', token: '--uiowa-stroke-width-8', examples: ['blockquote'] },
      { what: 'Alert corners', was: '2px', now: '3px', token: '--uiowa-radius-3', examples: ['alert'] },
    ],
  },
  {
    section: 'Motion',
    note: 'Transitions use the motion tokens. The form field shadow has the largest visible timing change; the rest move by 150ms or less.',
    rows: [
      { what: 'Form field shadow', was: '500ms', now: '150ms', token: '--uiowa-motion-duration-fast', examples: ['textFocus'] },
    ],
  },
  {
    section: 'Breakpoints',
    note: "At a 16px browser default font size, thresholds do not move. Five formerly px breakpoints now use rem in media queries and follow the browser's default font size; container-query rem uses the fixed 16px :root. $break-page-container, formerly em, behaves as before. $break-xlg (106em) is removed: nothing used it.",
    rows: [
      { what: 'Sass breakpoints', was: 'px or em', now: 'rem', token: '$uiowa-breakpoint-*', examples: ['spaceAndLayout'] },
    ],
  },
];
const FIXED = [
  {
    what: 'Horizontal stats on gold, 980 to 1350px wide',
    was: 'The rule above the content was gold on gold.',
    now: 'It shows in black.',
    how: "Open both, then narrow the window until the canvas is 980 to 1350px wide. There the live site's rule is gold on gold and disappears; here it stays black. Below 980px neither draws a rule.",
    examples: ['statGold'],
    compare: { label: 'The same story on the live site', href: 'https://uids.brand.uiowa.edu/?path=/story/components-stat--horizontal&args=background:gold' },
  },
];
const CHANGED_COMPONENT_COUNT = CHANGED_COMPONENTS.reduce((sum, s) => sum + s.rows.length, 0);
const hexCase = (value) => (/^#[0-9a-f]{3,8}$/i.test(value) ? value.toUpperCase() : value);
const ADDED_COUNT = Object.fromEntries(
  Object.entries(ADDED).map(([tier, files]) => [tier, Object.values(files).flat().length]),
);

/** A token path's custom property, as the build names it: logo.minWidth is --uiowa-logo-min-width. */
const cssName = (path) => `--uiowa-${path.split('.').map((part) => part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()).join('-')}`;
const tokenAt = (tier, file, path) => path.split('.').reduce((node, key) => node?.[key], TOKEN_FILES[`../../tokens/${tier}/${file}.json`]);

const computedValue = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** The group a reader looks for a token under. */
function group(name, declared) {
  const n = name.replace('--uiowa-', '');
  if (n.startsWith('typography-font-') || n.startsWith('typography-letter-') || n.startsWith('typography-line-')) return 'type primitive';
  if (n.startsWith('typography-')) return 'type style';
  // Color and stroke-width semantic tokens alias a primitive; a primitive holds a literal.
  if (n.startsWith('color-')) return declared.startsWith('var(') ? 'color semantic' : 'color primitive';
  if (n.startsWith('space-')) return 'space';
  if (n.startsWith('layout-')) return 'layout';
  if (/^(font|letter|line)-/.test(n)) return 'type primitive';
  if (n.startsWith('stroke-width-')) return declared.startsWith('var(') ? 'stroke semantic' : 'stroke primitive';
  if (n.startsWith('radius-')) return 'radius';
  if (n.startsWith('shadow-')) return 'shadow';
  if (n.startsWith('duration-')) return 'duration primitive';
  if (n.startsWith('motion-duration-')) return 'duration semantic';
  if (n.startsWith('easing-')) return 'easing';
  if (n.startsWith('form-height-')) return 'form height';
  if (n.startsWith('logo-')) return 'logo';
  return 'other';
}

const SPECIMEN_PROPERTY = Object.fromEntries(TYPOGRAPHY_CHANNELS.map(({ name, property }) => [name, property]));

const kindOf = (name) =>
  (name.match(new RegExp(`^--uiowa-typography-(${TYPOGRAPHY_CHANNELS.map(({ name }) => name).join('|')})-`)) || [])[1];

const specimenStyle = (token) => ({ [SPECIMEN_PROPERTY[token.kind]]: `var(${token.name})` });
const typographyStyle = (base) => Object.fromEntries(
  TYPOGRAPHY_CHANNELS.map(({ name, property }) => [property, `var(${base}-${name})`]),
);

const useTokens = () => {
  const tokens = ref([]);
  onMounted(() => {
    tokens.value = [...readTokens()].map(([name, declared]) => ({
      name,
      declared,
      value: computedValue(name),
      group: group(name, declared),
      kind: kindOf(name),
    }));
  });
  return tokens;
};

const css = `
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-font-family); }
  .tk h2 { margin-top: var(--uiowa-space-300); }
  .tk h3 { margin-top: var(--uiowa-space-200); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-typography-font-weight-medium); white-space: nowrap; }
  /* Column headings stay in view while a long table scrolls past. A sticky cell needs its
     own background, and a collapsed table's border scrolls away, so the rule under the
     headings is a shadow. */
  .tk thead th {
    position: sticky; top: 0; z-index: 1;
    background: var(--uiowa-color-background-white);
    box-shadow: inset 0 -1px 0 var(--uiowa-color-border-default);
  }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand-gold); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
  /* A form height's box. The row's token sets its height, inline. */
  .tk__box { display: inline-block; width: 3rem; background: var(--uiowa-color-brand-gold); vertical-align: middle; }
  /* A stroke width's line. The row's token sets border-top-width, inline. */
  .tk__line {
    display: block; width: 8rem;
    border-top-style: solid; border-top-color: var(--uiowa-color-brand-black);
  }
  .tk__corner {
    display: inline-block; width: 6rem; height: 2rem;
    background: var(--uiowa-color-neutral-100);
    border: var(--uiowa-stroke-width-default) solid var(--uiowa-color-border-default);
  }
  .tk__card {
    display: inline-block; width: 6rem; height: 3rem; margin: var(--uiowa-space-100);
    background: var(--uiowa-color-background-white);
  }
  /* Motion: the track a dot crosses. */
  .tk__track {
    display: block; position: relative; width: 12rem; height: 1rem;
    background: var(--uiowa-color-neutral-100);
  }
  /* The dot. The row's token sets its duration, inline, and on the easing table its curve
     too; standard easing is the default. Reduce motion stops it, through uids-core.scss. */
  .tk__dot {
    position: absolute; top: 0; left: 0; width: 1rem; height: 1rem;
    border-radius: var(--uiowa-radius-full); background: var(--uiowa-color-brand-black);
    transition-property: transform; transition-timing-function: var(--uiowa-easing-standard);
  }
  /* Pointing at the track plays the dot to the far end: the 12rem track less the 1rem dot. */
  .tk__track:hover .tk__dot { transform: translateX(11rem); }
  /* In this PR: a section's heading row, the token's own description, and its examples. */
  .tk__section th {
    padding-top: var(--uiowa-space-150);
    font-weight: var(--uiowa-typography-font-weight-bold); color: var(--uiowa-color-neutral-800);
  }
  .tk tbody + tbody .tk__section th { padding-top: var(--uiowa-space-400); }
  .tk__section-note {
    font-weight: var(--uiowa-typography-font-weight-normal); color: var(--uiowa-color-neutral-500);
    white-space: normal;
  }
  .tk__group-intro th { padding-top: var(--uiowa-space-150); color: var(--uiowa-color-neutral-800); }
  .tk__use { max-width: 28rem; }
  .tk__links { display: flex; flex-wrap: wrap; gap: 0 var(--uiowa-space-150); margin-top: var(--uiowa-space-50); }
  /* A changed color: the old swatch, then the new one. */
  .tk__pair { display: inline-flex; align-items: center; gap: var(--uiowa-space-50); white-space: nowrap; }
`;

export default {
  title: 'Tokens',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

export const Colors = {
  render: () => ({
    setup() {
      return { tokens: useTokens(), primitiveOf, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Color tokens</h1>
        <p>Each swatch is painted by the token beside it.</p>

        <template v-for="g in ['color primitive', 'color semantic']" :key="g">
          <h2>{{ g === 'color primitive' ? 'Primitives' : 'Semantic' }}</h2>
          <p v-if="g === 'color semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'color semantic'">Primitive</th>
                <th>{{ g === 'color semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'color semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `,
  }),
};

export const Typography = {
  render: () => ({
    setup() {
      const tokens = useTokens();
      const styles = computed(() => {
        const names = new Set(
          tokens.value
            .map(({ name }) => name)
            .filter((name) => name.startsWith('--uiowa-typography-') && !name.startsWith('--uiowa-typography-size-'))
            .filter((name) => TYPOGRAPHY_CHANNEL_PATTERN.test(name))
            .map((name) => name.replace(TYPOGRAPHY_CHANNEL_PATTERN, '')),
        );
        return [...names].sort().map((base) => ({
          base,
          channels: TYPOGRAPHY_CHANNELS.map(({ name }) => ({
            prop: name,
            name: `${base}-${name}`,
            value: computedValue(`${base}-${name}`),
          })),
        }));
      });
      return { tokens, styles, specimenStyle, typographyStyle, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Typography tokens</h1>
        <p>Each specimen is set by the token beside it.</p>

        <h2>Primitives</h2>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td>
                <span
                  v-if="t.kind === 'line-height'"
                  class="tk__leading"
                  :style="specimenStyle(t)"
                >Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                <span v-else class="tk__specimen" :style="specimenStyle(t)">Aa Hawkeye</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Semantic</h2>
        <p class="tk__note">Each style sets its channels together. Use a style wherever one exists.</p>
        <table>
          <thead><tr><th>Style</th><th>Channels</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="s in styles" :key="s.base">
              <td><code>{{ s.base.replace('--uiowa-typography-', '') }}</code></td>
              <td>
                <div v-for="c in s.channels" :key="c.name">
                  <code class="tk__note">{{ c.prop }}</code> <code>{{ c.value }}</code>
                </div>
              </td>
              <td :style="typographyStyle(s.base)">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>

        <h3>Size modifiers</h3>
        <p class="tk__note">These change a size and nothing else about the style.</p>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.name.startsWith('--uiowa-typography-size-'))" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td :style="{ fontSize: 'var(' + t.name + ')' }">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const SpaceAndLayout = {
  name: 'Space and layout',
  render: () => ({
    setup() {
      return { tokens: useTokens(), primitiveOf, breakpoints: BREAKPOINTS, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Space and layout tokens</h1>

        <h2>Space scale</h2>
        <p class="tk__note">
          Each bar is as wide as the token beside it. Step names are rem x 100, so values sit
          on a 4px grid at the 16px root size.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Width</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'space')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__bar" :style="{ width: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Container widths</h2>
        <table>
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'layout')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>

        <h2>Form heights</h2>
        <p class="tk__note">
          Each points at a step of the space scale. Buttons use the same steps directly, so a
          button lines up with the field beside it. Each box is as tall as the token beside it.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Space step</th><th>Resolves to</th><th>Height</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'form height')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__box" :style="{ height: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Logo minimum</h2>
        <p class="tk__note">The narrowest the logo may appear on screen. The bar is that wide.</p>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Width</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'logo')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__bar" :style="{ width: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Breakpoints</h2>
        <p class="tk__note">
          A media query can't read a custom property, so breakpoints have none, and these
          tables read the token files. The build writes the values to Sass in rem, in
          <code>src/scss/abstracts/_breakpoints-generated.scss</code>, and the
          <code>$break-*</code> variables in <code>_variables.scss</code> read from there.
        </p>
        <template v-for="g in ['primitive', 'semantic']" :key="g">
          <h3>{{ g === 'primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'semantic'">Primitive</th>
                <th>{{ g === 'semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>In Sass</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in breakpoints.filter(b => b.tier === g)" :key="b.name">
                <td><code>{{ b.name }}</code></td>
                <td v-if="g === 'semantic'"><code class="tk__note">{{ b.primitive }}</code></td>
                <td><code>{{ b.px }}</code></td>
                <td><code>{{ b.rem }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Unclassified</h2>
        <p class="tk__note">
          Legacy aliases from <code>uids-core.scss</code> land here. A new token group
          landing here needs a page.
        </p>
        <table v-if="tokens.some(t => t.group === 'other')">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'other')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
        <p v-else class="tk__note">None.</p>
      </div>
    `,
  }),
};

export const BordersAndShapes = {
  name: 'Borders and shapes',
  render: () => ({
    setup() {
      return { tokens: useTokens(), primitiveOf, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Border and shape tokens</h1>
        <p>Each specimen is drawn by the token beside it.</p>

        <h2>Stroke widths</h2>
        <p class="tk__note">
          A stroke width is the weight of a line, however it is drawn: a border, an outline, or a
          bar drawn with a pseudo-element's height.
        </p>
        <template v-for="g in ['stroke primitive', 'stroke semantic']" :key="g">
          <h3>{{ g === 'stroke primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'stroke semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'stroke semantic'">Primitive</th>
                <th>{{ g === 'stroke semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'stroke semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__line" :style="{ borderTopWidth: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Radius</h2>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Corner</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'radius')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__corner" :style="{ borderRadius: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const Shadows = {
  render: () => ({
    setup() {
      return { tokens: useTokens(), colorOf, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Shadow tokens</h1>
        <p>Each card is shadowed by the token beside it.</p>
        <p class="tk__note">
          Shadows are semantic tokens, named by use. Each takes its color from an alpha
          primitive on the Colors page.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Color</th><th>Resolves to</th><th>Shadow</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'shadow')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code class="tk__note">{{ colorOf(t.declared) }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__card" :style="{ boxShadow: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>
        <p class="tk__note">
          Text shadows aren't tokens. The banner's takes its color from the banner's overlay,
          black or white, which a fixed token can't follow.
        </p>
      </div>
    `,
  }),
};

export const Motion = {
  render: () => ({
    setup() {
      return { tokens: useTokens(), primitiveOf, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Motion tokens</h1>
        <p>Point at a track to play it. Each dot moves with the token beside it.</p>
        <p class="tk__note">
          With Reduce motion turned on, UIDS stops every transition, so the dots jump instead.
        </p>

        <h2>Durations</h2>
        <template v-for="g in ['duration primitive', 'duration semantic']" :key="g">
          <h3>{{ g === 'duration primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'duration semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'duration semantic'">Primitive</th>
                <th>{{ g === 'duration semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'duration semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td>
                  <span class="tk__track">
                    <span class="tk__dot" :style="{ transitionDuration: 'var(' + t.name + ')' }"></span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Easing</h2>
        <p class="tk__note">
          These purpose-named semantic curves hold their values directly. Each plays at the slow
          speed, so its shape is easy to see.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Track</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'easing')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td>
                <span class="tk__track">
                  <span
                    class="tk__dot"
                    :style="{
                      transitionDuration: 'var(--uiowa-motion-duration-slow)',
                      transitionTimingFunction: 'var(' + t.name + ')',
                    }"
                  ></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const InThisPR = {
  name: 'In this PR',
  render: () => ({
    setup() {
      const tokens = useTokens();
      const pointsAt = (live) => {
        if (live.group === 'shadow') return colorOf(live.declared);
        return live.declared.startsWith('var(') ? primitiveOf(live.declared) : 'Direct value';
      };
      const rowFor = (tier, file, path) => {
        const token = tokenAt(tier, file, path);
        const use = [token.$description, USES[path]].filter(Boolean).join(' ');
        const intro = ADDED_GROUP_INTROS[path];
        const groupIntro = intro && {
          label: intro.label,
          description: tokenAt(tier, file, intro.path)?.$description,
        };
        const links = exampleLinks(path);
        const live = tokens.value.find((t) => t.name === cssName(path));
        if (live) return { path, name: live.name, value: live.value, group: live.group, points: pointsAt(live), use, links, groupIntro };
        // A breakpoint: it has no custom property, so its token file supplies the value.
        const target = typeof token.$value === 'string' ? token.$value.match(/^\{breakpoint\.(\w+)\}$/)[1] : '';
        const sass = breakpointRow(path.split('.'), target ? BREAKPOINT_PX[target] : token.$value.value);
        return {
          path,
          name: sass.name,
          value: `${sass.px}, ${sass.rem} in Sass`,
          group: 'breakpoint',
          points: target ? `$uiowa-breakpoint-${target}` : '',
          use,
          links,
          groupIntro,
        };
      };
      const tiers = computed(() => (tokens.value.length ? Object.entries(ADDED).map(([tier, files]) => ({
        tier,
        sections: Object.entries(files).map(([file, paths]) => ({
          key: `${tier}-${file}`,
          label: ADDED_SECTIONS[file],
          note: ADDED_SECTION_NOTES[`${tier}-${file}`] || '',
          rows: paths.map((path) => rowFor(tier, file, path)),
        })),
      })) : []));
      const changedValues = computed(() => (tokens.value.length ? CHANGED_VALUES.map((c) => {
        const name = cssName(c.path);
        const live = tokens.value.find((t) => t.name === name);
        return {
          ...c,
          name,
          was: hexCase(c.was),
          now: hexCase(live.value),
          nowPoints: live.declared.startsWith('var(') ? primitiveOf(live.declared) : '',
          links: linksFor(c.examples),
        };
      }) : []));
      const changedComponents = CHANGED_COMPONENTS.map((s) => ({
        ...s,
        rows: s.rows.map((r) => ({ ...r, links: linksFor(r.examples) })),
      }));
      const fixed = FIXED.map((f) => ({ ...f, links: linksFor(f.examples) }));
      return {
        tiers, count: ADDED_COUNT, changedValues, changedComponents, fixed,
        componentCount: CHANGED_COMPONENT_COUNT, valueCount: CHANGED_VALUES.length, css,
      };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>In this PR</h1>
        <p>
          Everything this PR adds and changes, against 5.0.0-alpha.0, as its
          <code>CHANGELOG.md</code> entry lists it: {{ count.primitives + count.semantic }} tokens
          added, {{ valueCount }} token values changed, {{ componentCount }} values that moved when
          a component took a token, and {{ fixed.length }} fix. Nothing was removed or renamed.
        </p>
        <p class="tk__note">
          The links under Use open a component example with its props and background set to show
          the token or the change. Motion and focus show when you point at, click or tab to the
          element.
        </p>

        <h2>Added</h2>
        <p class="tk__note">
          {{ count.primitives }} primitives and {{ count.semantic }} semantic tokens. Typography adds
          none. Each specimen is drawn by the token beside it, and the Use column is the token's own
          description, then where it is used. Point at a motion track to play it.
        </p>
        <template v-for="t in tiers" :key="t.tier">
          <h3>{{ t.tier === 'primitives' ? 'Primitives' : 'Semantic' }}</h3>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="t.tier === 'semantic'">Points at</th>
                <th>{{ t.tier === 'semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Specimen</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody v-for="s in t.sections" :key="s.key">
              <tr class="tk__section">
                <th :colspan="t.tier === 'semantic' ? 5 : 4">
                  {{ s.label }}
                  <div v-if="s.note" class="tk__section-note">{{ s.note }}</div>
                </th>
              </tr>
              <template v-for="r in s.rows" :key="r.path">
                <tr v-if="r.groupIntro" class="tk__group-intro">
                  <th :colspan="t.tier === 'semantic' ? 5 : 4">
                    {{ r.groupIntro.label }}
                    <div v-if="r.groupIntro.description" class="tk__section-note">{{ r.groupIntro.description }}</div>
                  </th>
                </tr>
                <tr>
                  <td><code>{{ r.name }}</code></td>
                  <td v-if="t.tier === 'semantic'"><code class="tk__note">{{ r.points }}</code></td>
                  <td><code>{{ r.value }}</code></td>
                  <td>
                    <span v-if="r.group.startsWith('color')" class="tk__swatch" :style="{ background: 'var(' + r.name + ')' }"></span>
                    <span v-else-if="r.group.startsWith('stroke')" class="tk__line" :style="{ borderTopWidth: 'var(' + r.name + ')' }"></span>
                    <span v-else-if="r.group === 'radius'" class="tk__corner" :style="{ borderRadius: 'var(' + r.name + ')' }"></span>
                    <span v-else-if="r.group === 'shadow'" class="tk__card" :style="{ boxShadow: 'var(' + r.name + ')' }"></span>
                    <span v-else-if="r.group.startsWith('duration')" class="tk__track">
                      <span class="tk__dot" :style="{ transitionDuration: 'var(' + r.name + ')' }"></span>
                    </span>
                    <span v-else-if="r.group === 'easing'" class="tk__track">
                      <span
                        class="tk__dot"
                        :style="{
                          transitionDuration: 'var(--uiowa-motion-duration-slow)',
                          transitionTimingFunction: 'var(' + r.name + ')',
                        }"
                      ></span>
                    </span>
                    <span v-else-if="r.group === 'form height'" class="tk__box" :style="{ height: 'var(' + r.name + ')' }"></span>
                    <span v-else-if="r.group === 'logo'" class="tk__bar" :style="{ width: 'var(' + r.name + ')' }"></span>
                    <span v-else class="tk__note">No custom property</span>
                  </td>
                  <td class="tk__use">
                    {{ r.use }}
                    <div v-if="r.links.length" class="tk__links">
                      <!-- target="_top" opens the story in the Storybook window, not inside this canvas. -->
                      <a v-for="l in r.links" :key="l.href + l.label" :href="l.href" target="_top">{{ l.label }}</a>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </template>

        <h2>Changed</h2>
        <h3>Token values</h3>
        <p class="tk__note">
          Was is 5.0.0-alpha.0's value; Now is read from the build. A semantic token shows what it
          points at, then and now. Links and info change everywhere they appear.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Was</th><th>Now</th><th>Specimen</th><th>Where it shows</th></tr></thead>
          <tbody>
            <tr v-for="r in changedValues" :key="r.path">
              <td><code>{{ r.name }}</code></td>
              <td>
                <div v-if="r.wasPoints"><code class="tk__note">{{ r.wasPoints }}</code></div>
                <code>{{ r.was }}</code>
              </td>
              <td>
                <div v-if="r.nowPoints"><code class="tk__note">{{ r.nowPoints }}</code></div>
                <code>{{ r.now }}</code>
              </td>
              <td>
                <span class="tk__pair">
                  <span class="tk__swatch" :style="{ background: r.was }" :title="'Was ' + r.was"></span>
                  →
                  <span class="tk__swatch" :style="{ background: 'var(' + r.name + ')' }" :title="'Now ' + r.now"></span>
                </span>
              </td>
              <td class="tk__use">
                {{ r.shows }}
                <div v-if="r.links.length" class="tk__links">
                  <a v-for="l in r.links" :key="l.href + l.label" :href="l.href" target="_top">{{ l.label }}</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Values that moved when a component took a token</h3>
        <p class="tk__note">
          No token changed here. Each component now takes the value from a token, and its rendered
          value moved to the token's.
        </p>
        <table>
          <thead><tr><th>Element</th><th>Was</th><th>Now</th><th>Token</th><th>Use</th></tr></thead>
          <tbody v-for="s in changedComponents" :key="s.section">
            <tr class="tk__section">
              <th colspan="5">
                {{ s.section }}
                <div v-if="s.note" class="tk__section-note">{{ s.note }}</div>
              </th>
            </tr>
            <tr v-for="r in s.rows" :key="r.what">
              <td>{{ r.what }}</td>
              <td><code>{{ r.was }}</code></td>
              <td><code>{{ r.now }}</code></td>
              <td><code class="tk__note">{{ r.token }}</code></td>
              <td class="tk__use">
                <div v-if="r.links.length" class="tk__links">
                  <a v-for="l in r.links" :key="l.href + l.label" :href="l.href" target="_top">{{ l.label }}</a>
                </div>
                <span v-else class="tk__note">No story</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Fixed</h2>
        <table>
          <thead><tr><th>Where</th><th>Was</th><th>Now</th><th>Use</th></tr></thead>
          <tbody>
            <tr v-for="f in fixed" :key="f.what">
              <td>{{ f.what }}</td>
              <td>{{ f.was }}</td>
              <td>{{ f.now }}</td>
              <td class="tk__use">
                {{ f.how }}
                <div class="tk__links">
                  <a v-for="l in f.links" :key="l.href + l.label" :href="l.href" target="_top">{{ l.label }}</a>
                  <a v-if="f.compare" :href="f.compare.href" target="_blank" rel="noopener">{{ f.compare.label }}</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};
