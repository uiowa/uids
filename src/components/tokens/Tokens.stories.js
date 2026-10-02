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
 * specimen is set with its own channels. Nothing here transcribes a value, so the page
 * cannot fall out of step with src/tokens/**. Adding a token makes it appear.
 * Breakpoints are the exception: they have no custom property, so they are read from
 * the token files (see BREAKPOINTS).
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

/**
 * Breakpoints, read from the token files, because a media query can't read a custom
 * property and the build writes none. Names and rem values repeat what the build writes
 * to _breakpoints-generated.scss: the Sass name is the token path, and rem is
 * breakpointRem() in style-dictionary.config.js, px over the 16px root.
 */
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

/**
 * The tokens this PR adds, by tier and token file: every path in src/tokens/ that 5.x
 * (dc0efcf697, 5.0.0-alpha.0's tokens) lacks. A story can't diff branches, so the names
 * are listed here; values, specimens and descriptions are still read live. To regenerate,
 * compare each file's token paths at that commit and HEAD. Typography adds none.
 */
const ADDED = {
  primitives: {
    colors: [
      'color.data.1', 'color.data.2', 'color.data.3', 'color.data.4', 'color.data.5', 'color.data.6',
      'color.data.7', 'color.data.8', 'color.data.9', 'color.data.10', 'color.data.11', 'color.data.12',
      'color.alpha.black-200', 'color.alpha.black-425', 'color.alpha.near-black-150', 'color.alpha.white-425',
    ],
    border: ['border.width.1', 'border.width.2'],
    'accent-rule': ['accent-rule.4', 'accent-rule.5', 'accent-rule.6', 'accent-rule.8'],
    radius: ['radius.3', 'radius.full'],
    motion: ['duration.150', 'duration.250', 'duration.400', 'easing.standard', 'easing.enter', 'easing.overshoot'],
    breakpoints: [
      'breakpoint.400', 'breakpoint.600', 'breakpoint.768', 'breakpoint.930', 'breakpoint.980',
      'breakpoint.1200', 'breakpoint.1350',
    ],
  },
  semantic: {
    colors: ['color.accent.blue', 'color.border.strong', 'color.border.strong-inverse'],
    border: ['border.width.default', 'border.width.focused'],
    shadow: ['shadow.inset', 'shadow.raised'],
    motion: ['motion.duration.fast', 'motion.duration.medium', 'motion.duration.slow'],
    form: ['form.height.medium', 'form.height.large'],
    logo: ['logo.minWidth'],
    layout: ['layout.breakpoint.standard'],
  },
};
const ADDED_SECTIONS = {
  colors: 'Colors',
  border: 'Border widths',
  'accent-rule': 'Accent rules',
  radius: 'Radius',
  motion: 'Motion',
  breakpoints: 'Breakpoints',
  shadow: 'Shadows',
  form: 'Form heights',
  logo: 'Logo',
  layout: 'Breakpoints',
};
const ADDED_SECTION_NOTES = {
  motion: 'Duration is the speed: how long the move takes. Easing is how the speed changes along the way, its expression.',
};
/**
 * Component examples for the Added in this PR page: a story, and the args that bring out
 * the token. Each was checked on 2026-10-02 by rendering the story with these args and
 * measuring the token on the element (a CTA on gold draws its button border in
 * color.border.strong, an underlined h6 draws a 4px bar, and so on). The background is
 * the component's own background arg: Storybook's backgrounds only paint the canvas,
 * and these tokens follow the bg-- class a component sets. Tabs (tabs.scss) has no story.
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
  button: { label: 'Button (point at it)', id: 'components-button--primary' },
  headlineH2: { label: 'Underlined h2', id: 'components-headline--underline', args: 'level:h2' },
  headlineH5: { label: 'Underlined h5', id: 'components-headline--underline', args: 'level:h5' },
  headlineH6: { label: 'Underlined h6', id: 'components-headline--underline', args: 'level:h6' },
  menu: { label: 'Horizontal menu', id: 'components-menu--horizontal-menu' },
  stat: { label: 'Stat', id: 'components-stat--default' },
  blockquote: { label: 'Blockquote', id: 'components-blockquote--left' },
  accordion: { label: 'Accordion', id: 'components-accordion--default' },
  accordionFocus: { label: 'Accordion (tab to a heading)', id: 'components-accordion--default' },
  logo: { label: 'Logo', id: 'components-branding-logo--iowa' },
};
const ADDED_EXAMPLES = {
  'color.alpha.black-200': ['toggle'],
  'color.alpha.black-425': ['ctaGold', 'cardGold'],
  'color.alpha.near-black-150': ['text'],
  'color.alpha.white-425': ['ctaBlack', 'cardBlack'],
  'border.width.1': ['card', 'table'],
  'border.width.2': ['checkboxError', 'textFocus'],
  'accent-rule.4': ['button', 'headlineH6'],
  'accent-rule.5': ['menu', 'headlineH5'],
  'accent-rule.6': ['headlineH2'],
  'accent-rule.8': ['stat', 'blockquote'],
  'radius.3': ['text', 'alert'],
  'radius.full': ['badge', 'toggle'],
  'duration.150': ['text', 'select'],
  'duration.250': ['toggle', 'accordion', 'menu'],
  'duration.400': ['stat', 'blockquote'],
  'easing.standard': ['text', 'accordion'],
  'easing.overshoot': ['toggle', 'stat'],
  'color.border.strong': ['ctaGold', 'cardGold'],
  'color.border.strong-inverse': ['ctaBlack', 'cardBlack'],
  'border.width.default': ['card', 'table'],
  'border.width.focused': ['textFocus', 'checkboxFocus', 'accordionFocus'],
  'shadow.inset': ['text'],
  'shadow.raised': ['toggle'],
  'motion.duration.fast': ['text', 'select'],
  'motion.duration.medium': ['toggle', 'accordion', 'menu'],
  'motion.duration.slow': ['stat', 'blockquote'],
  'form.height.medium': ['text'],
  'form.height.large': ['textLarge'],
  'logo.minWidth': ['logo'],
};
// Relative to the preview's iframe.html, so the link works wherever Storybook is served;
// target="_top" opens it in the Storybook window rather than inside the canvas.
const exampleLinks = (path) => (ADDED_EXAMPLES[path] || []).map((key) => {
  const { label, id, args } = EXAMPLES[key];
  return { label, href: `./?path=/story/${id}${args ? `&args=${args}` : ''}` };
});
const ADDED_COUNT = Object.fromEntries(
  Object.entries(ADDED).map(([tier, files]) => [tier, Object.values(files).flat().length]),
);

/** A token path's custom property, as the build names it: logo.minWidth is --uiowa-logo-min-width. */
const cssName = (path) => `--uiowa-${path.split('.').map((part) => part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()).join('-')}`;
const tokenAt = (tier, file, path) => path.split('.').reduce((node, key) => node?.[key], TOKEN_FILES[`../../tokens/${tier}/${file}.json`]);

const computedValue = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** The group a reader looks for a token under. A semantic token aliases; a primitive holds a literal. */
function group(name, declared) {
  const n = name.replace('--uiowa-', '');
  if (n.startsWith('typography-font-') || n.startsWith('typography-letter-') || n.startsWith('typography-line-')) return 'type primitive';
  if (n.startsWith('typography-')) return 'type style';
  if (n.startsWith('color-')) return declared.startsWith('var(') ? 'color semantic' : 'color primitive';
  if (n.startsWith('space-')) return 'space';
  if (n.startsWith('layout-')) return 'layout';
  if (/^(font|letter|line)-/.test(n)) return 'type primitive';
  if (n.startsWith('border-width-')) return declared.startsWith('var(') ? 'border semantic' : 'border primitive';
  if (n.startsWith('accent-rule-')) return 'accent rule';
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
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand-gold); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
  /* Space and layout: a form height's box. The row's token sets its height, inline. */
  .tk__box { display: inline-block; width: 3rem; background: var(--uiowa-color-brand-gold); vertical-align: middle; }
  /* Borders and shapes: a border width's line. The row's token sets border-top-width, inline. */
  .tk__line {
    display: block; width: 8rem;
    border-top-style: solid; border-top-color: var(--uiowa-color-brand-black);
  }
  /* An accent bar, at the headline underline's 75px length. The row's token sets its height. */
  .tk__accent { display: block; width: 75px; background: var(--uiowa-color-brand-gold); }
  /* A radius's corner. The row's token sets border-radius; the box is wider than it is
     tall, so radius-full reads as a pill. */
  .tk__corner {
    display: inline-block; width: 6rem; height: 2rem;
    background: var(--uiowa-color-neutral-100);
    border: var(--uiowa-border-width-default) solid var(--uiowa-color-border-default);
  }
  /* A shadow's card: white, with a margin so the shadow has room to show. The row's
     token sets box-shadow. */
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
  /* Added in this PR: a section's heading row, the token's own description, and its examples. */
  .tk__section th {
    padding-top: var(--uiowa-space-150);
    font-weight: var(--uiowa-typography-font-weight-bold); color: var(--uiowa-color-neutral-800);
  }
  .tk tbody + tbody .tk__section th { padding-top: var(--uiowa-space-400); }
  .tk__section-note {
    font-weight: var(--uiowa-typography-font-weight-normal); color: var(--uiowa-color-neutral-500);
    white-space: normal;
  }
  .tk__use { max-width: 28rem; }
  .tk__links { display: flex; flex-wrap: wrap; gap: 0 var(--uiowa-space-150); margin-top: var(--uiowa-space-50); }
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

        <h2>Border widths</h2>
        <template v-for="g in ['border primitive', 'border semantic']" :key="g">
          <h3>{{ g === 'border primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'border semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'border semantic'">Primitive</th>
                <th>{{ g === 'border semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'border semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__line" :style="{ borderTopWidth: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Accent bars</h2>
        <p class="tk__note">
          Accent bars are drawn with a pseudo-element's height, or its width for a side rule,
          not with a border.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Bar</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'accent rule')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__accent" :style="{ height: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

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
        <p class="tk__note">Each curve plays at the slow speed, so its shape is easy to see.</p>
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

export const AddedInThisPR = {
  name: 'Added in this PR',
  render: () => ({
    setup() {
      const tokens = useTokens();
      const pointsAt = (live) => {
        if (live.group === 'shadow') return colorOf(live.declared);
        return live.declared.startsWith('var(') ? primitiveOf(live.declared) : '';
      };
      const rowFor = (tier, file, path) => {
        const token = tokenAt(tier, file, path);
        const use = token.$description || '';
        const links = exampleLinks(path);
        const live = tokens.value.find((t) => t.name === cssName(path));
        if (live) return { path, name: live.name, value: live.value, group: live.group, points: pointsAt(live), use, links };
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
        };
      };
      const tiers = computed(() => (tokens.value.length ? Object.entries(ADDED).map(([tier, files]) => ({
        tier,
        sections: Object.entries(files).map(([file, paths]) => ({
          key: `${tier}-${file}`,
          label: ADDED_SECTIONS[file],
          note: ADDED_SECTION_NOTES[file] || '',
          rows: paths.map((path) => rowFor(tier, file, path)),
        })),
      })) : []));
      return { tiers, count: ADDED_COUNT, css };
    },
    template: `
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Tokens added in this PR</h1>
        <p>
          The {{ count.primitives + count.semantic }} tokens this PR adds, against 5.0.0-alpha.0:
          {{ count.primitives }} primitives and {{ count.semantic }} semantic. Typography adds none.
          Each specimen is drawn by the token beside it, and the Use column is the token's own
          description.
        </p>
        <p class="tk__note">
          Values this PR changes, such as links, info and the accent colors, are in
          <code>CHANGELOG.md</code>, not here. Point at a motion track to play it.
        </p>
        <p class="tk__note">
          The links under Use open a component example with its props and background set to show
          the token. Motion and focus show when you point at, click or tab to the element.
        </p>

        <template v-for="t in tiers" :key="t.tier">
          <h2>{{ t.tier === 'primitives' ? 'Primitives' : 'Semantic' }}</h2>
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
              <tr v-for="r in s.rows" :key="r.path">
                <td><code>{{ r.name }}</code></td>
                <td v-if="t.tier === 'semantic'"><code class="tk__note">{{ r.points }}</code></td>
                <td><code>{{ r.value }}</code></td>
                <td>
                  <span v-if="r.group.startsWith('color')" class="tk__swatch" :style="{ background: 'var(' + r.name + ')' }"></span>
                  <span v-else-if="r.group.startsWith('border')" class="tk__line" :style="{ borderTopWidth: 'var(' + r.name + ')' }"></span>
                  <span v-else-if="r.group === 'accent rule'" class="tk__accent" :style="{ height: 'var(' + r.name + ')' }"></span>
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
                    <a v-for="l in r.links" :key="l.href + l.label" :href="l.href" target="_top">{{ l.label }}</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `,
  }),
};
