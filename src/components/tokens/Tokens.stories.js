import { computed, ref, onMounted } from 'vue';
import breakpointTokens from '../../tokens/primitives/breakpoints.json';
import layoutTokens from '../../tokens/semantic/layout.json';

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
