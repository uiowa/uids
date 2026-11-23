import { ref, onMounted } from 'vue';
import breakpointTokens from '../../tokens/primitives/breakpoints.json';
import semanticBreakpointTokens from '../../tokens/semantic/breakpoint.json';
import { TYPOGRAPHY_CHANNELS, computedValue, css } from './tokenDisplay.js';

/**
 * A Tokens page for one component, laid out like the Tokens stories. Rows come from the
 * component's token file, which says which tokens exist, what each points at, and what a
 * breakpoint or variant swaps in. Values and previews come from the loaded CSS.
 *
 *   export const Tokens = {
 *     ...componentTokensStory(brandBarTokens),
 *     tags: ['!autodocs', 'noAddonsDrawer'],
 *   };
 *
 * Export it first in the stories file so it sits right under Docs. The tags go in the
 * stories file because Storybook reads them from the source, not from what this returns.
 */

const RESPONSIVE = 'edu.uiowa.responsive';
const VARIANT = 'edu.uiowa.variant';
const VARIANT_SELECTORS = 'edu.uiowa.variants';

const CHANNEL_PROPERTY = Object.fromEntries(TYPOGRAPHY_CHANNELS.map(({ name, property }) => [name, property]));

// Style Dictionary's name/kebab: path segments joined with hyphens, camelCase split.
const kebab = (segment) => segment.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const varName = (path) => `--uiowa-${path.map(kebab).join('-')}`;
const refVar = (reference) => {
  const match = typeof reference === 'string' && reference.match(/^\{([^{}]+)\}$/);
  return match ? varName(match[1].split('.')) : null;
};

/** A responsive key names a breakpoint token, semantic (md) or primitive (980). */
function breakpointPx(key) {
  const semantic = semanticBreakpointTokens.breakpoint[key]?.$value;
  const primitive = typeof semantic === 'string' ? semantic.match(/^\{breakpoint\.(\w+)\}$/)?.[1] : key;
  return breakpointTokens.breakpoint[primitive]?.$value?.value;
}

/** The nearest group that maps the variant to a selector wins, as in the token build. */
function variantSelector(path, groups, variant) {
  let selector = `.${path[0]}--${variant}`;
  for (const group of groups) {
    selector = group.$extensions?.[VARIANT_SELECTORS]?.[variant] ?? selector;
  }
  return selector;
}

function overridesOf(token, path, groups) {
  const list = [];
  for (const [key, value] of Object.entries(token.$extensions?.[RESPONSIVE] ?? {})) {
    const px = breakpointPx(key);
    list.push({ id: `bp:${key}`, label: `At ${px}px and up (${key})`, px, ref: refVar(value) });
  }
  for (const [variant, value] of Object.entries(token.$extensions?.[VARIANT] ?? {})) {
    list.push({ id: `variant:${variant}`, label: `${variantSelector(path, groups, variant)} (${variant} variant)`, ref: refVar(value) });
  }
  return list;
}

function collect(node, path, groups, inheritedType, rows) {
  const type = node.$type ?? inheritedType;
  if ('$value' in node) {
    const last = path.at(-1);
    rows.push({
      path,
      name: varName(path),
      ref: refVar(node.$value),
      kind: CHANNEL_PROPERTY[last] ? last : type === 'color' ? 'color' : 'other',
      overrides: overridesOf(node, path, groups),
    });
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || typeof child !== 'object' || child === null) continue;
    collect(child, [...path, key], [...groups, node], type, rows);
  }
}

export function componentTokensStory(tokenFile) {
  const rows = [];
  collect(tokenFile, [], [], undefined, rows);
  const component = Object.keys(tokenFile).find((key) => !key.startsWith('$'));
  const title = `${component[0].toUpperCase()}${component.slice(1).replace(/-/g, ' ')}`;

  return {
    name: 'Tokens',
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      html: { disable: true },
      docs: { source: { code: null } },
    },
    render: () => ({
      setup() {
        const tokens = ref([]);
        onMounted(() => {
          tokens.value = rows.map((row) => ({
            ...row,
            value: computedValue(row.ref ?? row.name),
            // A token a breakpoint re-points would preview whatever applies at the width
            // you're viewing at, so its rows preview the token each row points at.
            preview: row.overrides.length && row.ref ? row.ref : row.name,
            overrides: row.overrides.map((o) => ({ ...o, value: o.ref ? computedValue(o.ref) : '' })),
          }));
        });
        const specimenStyle = (t, name) => ({ [CHANNEL_PROPERTY[t.kind]]: `var(${name})` });
        return { tokens, title, specimenStyle, css };
      },
      template: `
        <div class="tk">
          <component is="style">{{ css }}</component>
          <h1>{{ title }} tokens</h1>
          <p>Each preview is drawn by the token it references.</p>
          <p v-if="tokens.some(t => t.overrides.length)" class="tk__note">
            An indented row is a value that replaces the token's default at a breakpoint or when a
            modifier class is on the component.
          </p>

          <template v-if="tokens.some(t => t.kind === 'color')">
            <h2>Color</h2>
            <table>
              <thead><tr><th>Token</th><th>References</th><th>Resolves to</th><th>Swatch</th></tr></thead>
              <tbody>
                <template v-for="t in tokens.filter(t => t.kind === 'color')" :key="t.name">
                  <tr>
                    <td><code>{{ t.name }}</code></td>
                    <td><code class="tk__note">{{ t.ref }}</code></td>
                    <td><code>{{ t.value }}</code></td>
                    <td><span class="tk__swatch" :style="{ background: 'var(' + t.preview + ')' }"></span></td>
                  </tr>
                  <tr v-for="o in t.overrides" :key="o.id" class="tk__override">
                    <td><code class="tk__note">{{ o.label }}</code></td>
                    <td><code class="tk__note">{{ o.ref }}</code></td>
                    <td><code>{{ o.value }}</code></td>
                    <td><span class="tk__swatch" :style="{ background: 'var(' + o.ref + ')' }"></span></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>

          <template v-if="tokens.some(t => t.kind !== 'color' && t.kind !== 'other')">
            <h2>Typography</h2>
            <table>
              <thead><tr><th>Token</th><th>References</th><th>Resolves to</th><th>Specimen</th></tr></thead>
              <tbody>
                <template v-for="t in tokens.filter(t => t.kind !== 'color' && t.kind !== 'other')" :key="t.name">
                  <tr>
                    <td><code>{{ t.name }}</code></td>
                    <td><code class="tk__note">{{ t.ref }}</code></td>
                    <td><code>{{ t.value }}</code></td>
                    <td>
                      <span v-if="t.kind === 'line-height'" class="tk__leading" :style="specimenStyle(t, t.preview)">Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                      <span v-else class="tk__specimen" :style="specimenStyle(t, t.preview)">Aa Hawkeye</span>
                    </td>
                  </tr>
                  <tr v-for="o in t.overrides" :key="o.id" class="tk__override">
                    <td><code class="tk__note">{{ o.label }}</code></td>
                    <td><code class="tk__note">{{ o.ref }}</code></td>
                    <td><code>{{ o.value }}</code></td>
                    <td>
                      <span v-if="t.kind === 'line-height'" class="tk__leading" :style="specimenStyle(t, o.ref)">Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                      <span v-else class="tk__specimen" :style="specimenStyle(t, o.ref)">Aa Hawkeye</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>

          <template v-if="tokens.some(t => t.kind === 'other')">
            <h2>Other</h2>
            <table>
              <thead><tr><th>Token</th><th>References</th><th>Resolves to</th></tr></thead>
              <tbody>
                <template v-for="t in tokens.filter(t => t.kind === 'other')" :key="t.name">
                  <tr>
                    <td><code>{{ t.name }}</code></td>
                    <td><code class="tk__note">{{ t.ref }}</code></td>
                    <td><code>{{ t.value }}</code></td>
                  </tr>
                  <tr v-for="o in t.overrides" :key="o.id" class="tk__override">
                    <td><code class="tk__note">{{ o.label }}</code></td>
                    <td><code class="tk__note">{{ o.ref }}</code></td>
                    <td><code>{{ o.value }}</code></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>
        </div>
      `,
    }),
  };
}
