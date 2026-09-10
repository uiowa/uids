import { ref, onMounted } from 'vue';

/**
 * These stories read the --uiowa-* custom properties out of the loaded stylesheets and
 * render each one through itself: a color swatch is painted by its own token, a type
 * specimen is set with its own channels. Nothing here transcribes a value, so the page
 * cannot fall out of step with src/tokens/**. Adding a token makes it appear.
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

/** A role's declared value is a var() reference; the reader wants the primitive's name. */
const primitiveOf = (declared) => declared.replace(/^var\(\s*/, '').replace(/\s*\)$/, '');

const computed = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Split a token name into the group a reader would look for it under. */
function group(name) {
  const n = name.replace('--uiowa-', '');
  if (n.startsWith('typography-')) return 'type style';
  if (n.startsWith('color-')) {
    return /^color-(text|link|border|background|brand|bg|info|success|warning|danger)/.test(n)
      ? 'color role'
      : 'color primitive';
  }
  if (n.startsWith('space-')) return 'space';
  if (n.startsWith('layout-')) return 'layout';
  if (/^(font|line)-/.test(n)) return 'type primitive';
  return 'other';
}

const SPECIMEN_PROPERTY = {
  'font-family': 'fontFamily',
  'font-weight': 'fontWeight',
  'font-size': 'fontSize',
  'line-height': 'lineHeight',
};

/** The CSS property a type primitive sets, so a specimen can demonstrate it. */
const kindOf = (name) =>
  (name.match(/^--uiowa-(font-family|font-weight|font-size|line-height)-/) || [])[1];

const specimenStyle = (token) => ({ [SPECIMEN_PROPERTY[token.kind]]: `var(${token.name})` });

const useTokens = () => {
  const tokens = ref([]);
  onMounted(() => {
    tokens.value = [...readTokens()].map(([name, declared]) => ({
      name,
      declared,
      value: computed(name),
      group: group(name),
      kind: kindOf(name),
    }));
  });
  return tokens;
};

const css = `
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-font-family); }
  .tk h2 { margin-top: var(--uiowa-space-300); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-font-weight-medium); white-space: nowrap; }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
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

        <template v-for="g in ['color primitive', 'color role']" :key="g">
          <h2>{{ g === 'color primitive' ? 'Primitives' : 'Roles' }}</h2>
          <p v-if="g === 'color role'" class="tk__note">
            A role points at a primitive. Style from a role wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'color role'">Primitive</th>
                <th>{{ g === 'color role' ? 'Resolves to' : 'Value' }}</th>
                <th>Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
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
      const styles = ref([]);
      onMounted(() => {
        const names = new Set(
          [...readTokens().keys()]
            .filter((n) => n.startsWith('--uiowa-typography-') && !n.startsWith('--uiowa-typography-size-'))
            .map((n) => n.replace(/-(font-family|font-weight|font-size|line-height)$/, '')),
        );
        styles.value = [...names].sort().map((base) => ({
          base,
          channels: ['font-family', 'font-weight', 'font-size', 'line-height'].map((c) => ({
            prop: c,
            name: `${base}-${c}`,
            value: computed(`${base}-${c}`),
          })),
        }));
      });
      return { tokens, styles, specimenStyle, css };
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

        <h2>Roles</h2>
        <p class="tk__note">A role sets four channels together. Style from one wherever one exists.</p>
        <table>
          <thead><tr><th>Role</th><th>Channels</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="s in styles" :key="s.base">
              <td><code>{{ s.base.replace('--uiowa-typography-', '') }}</code></td>
              <td>
                <div v-for="c in s.channels" :key="c.name">
                  <code class="tk__note">{{ c.prop }}</code> <code>{{ c.value }}</code>
                </div>
              </td>
              <td :style="{
                fontFamily: 'var(' + s.base + '-font-family)',
                fontWeight: 'var(' + s.base + '-font-weight)',
                fontSize: 'var(' + s.base + '-font-size)',
                lineHeight: 'var(' + s.base + '-line-height)',
              }">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>

        <h2>Size modifiers</h2>
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
      return { tokens: useTokens(), css };
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
      </div>
    `,
  }),
};
