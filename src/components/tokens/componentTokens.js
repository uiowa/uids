import { ref, onMounted } from 'vue';
import { kebabCase } from 'change-case';
import breakpointTokens from '../../tokens/primitives/breakpoints.json';
import semanticBreakpointTokens from '../../tokens/semantic/breakpoint.json';
import { breakpointPixels, variantSelector } from '../../tokens/resolve.js';
import { CHANNEL_PROPERTY, computedValue, css } from './tokenDisplay.js';

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

// Style Dictionary's name/kebab with the build's uiowa prefix.
const varName = (path) => `--${kebabCase(['uiowa', ...path].join(' '))}`;
const refVar = (reference) => {
  const match = typeof reference === 'string' && reference.match(/^\{([^{}]+)\}$/);
  return match ? varName(match[1].split('.')) : null;
};
// A value that isn't a {reference}, as CSS. A dimension is stored as { value, unit }.
const literalOf = (value) => {
  if (refVar(value)) return null;
  return typeof value === 'object' && value !== null && 'unit' in value ? `${value.value}${value.unit}` : String(value);
};

// Primitive (980) and semantic (md) breakpoints, as the build sees them.
const breakpoints = { breakpoint: { ...breakpointTokens.breakpoint, ...semanticBreakpointTokens.breakpoint } };
const breakpointToken = (path) => path.split('.').reduce((node, key) => node?.[key], breakpoints);

function overridesOf(token, path, source) {
  const responsive = Object.entries(token.$extensions?.[RESPONSIVE] ?? {})
    .map(([key, value]) => {
      const px = breakpointPixels(key, breakpointToken);
      return { id: `bp:${key}`, label: `At ${px}px and up (${key})`, px, ref: refVar(value), literal: literalOf(value) };
    })
    // Narrowest first, the order the build emits its media blocks in.
    .sort((a, b) => a.px - b.px);
  const variants = Object.entries(token.$extensions?.[VARIANT] ?? {}).map(([variant, value]) => ({
    id: `variant:${variant}`,
    label: `${variantSelector(source, path, variant)} (${variant} variant)`,
    ref: refVar(value),
    literal: literalOf(value),
  }));
  return [...responsive, ...variants];
}

function collect(node, path, inheritedType, rows, source) {
  const type = node.$type ?? inheritedType;
  if ('$value' in node) {
    const last = path.at(-1);
    rows.push({
      path,
      name: varName(path),
      ref: refVar(node.$value),
      literal: literalOf(node.$value),
      kind: CHANNEL_PROPERTY[last] ? last : type === 'color' ? 'color' : 'other',
      overrides: overridesOf(node, path, source),
    });
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || typeof child !== 'object' || child === null) continue;
    collect(child, [...path, key], type, rows, source);
  }
}

// A preview paints through the custom property it names, or else with its literal.
const paint = (name, literal) => (name ? `var(${name})` : literal);

// One table per section a token's kind falls in; preview names the last column, if any.
const SECTIONS = [
  { title: 'Color', preview: 'Swatch', has: (kind) => kind === 'color' },
  { title: 'Typography', preview: 'Specimen', has: (kind) => Boolean(CHANNEL_PROPERTY[kind]) },
  { title: 'Other', preview: null, has: (kind) => kind === 'other' },
];

/** A token's table rows: its default, then each value a breakpoint or variant swaps in. */
function displayRows(row) {
  // A token a breakpoint or variant re-points would read and preview whatever applies
  // at the width you're viewing at, so its default row shows its own declared value:
  // the token it points at, or its literal.
  const preview = row.overrides.length ? row.ref : row.name;
  return [
    {
      key: row.name,
      label: row.name,
      override: false,
      kind: row.kind,
      ref: row.ref,
      value: preview ? computedValue(preview) : row.literal,
      css: paint(preview, row.literal),
    },
    ...row.overrides.map((o) => ({
      key: `${row.name}|${o.id}`,
      label: o.label,
      override: true,
      kind: row.kind,
      ref: o.ref,
      value: o.ref ? computedValue(o.ref) : o.literal,
      css: paint(o.ref, o.literal),
    })),
  ];
}

/** A component token file's tokens, each with what it points at and its overrides. */
export function tokenRows(tokenFile) {
  const rows = [];
  collect(tokenFile, [], undefined, rows, tokenFile);
  return rows;
}

export function componentTokensStory(tokenFile) {
  const rows = tokenRows(tokenFile);
  const groups = Object.keys(tokenFile).filter((key) => !key.startsWith('$'));
  if (groups.length !== 1) {
    throw new Error(`componentTokensStory expects one component group in its token file, found ${groups.length ? groups.join(', ') : 'none'}`);
  }
  const [component] = groups;
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
        const sections = ref([]);
        onMounted(() => {
          sections.value = SECTIONS
            .map(({ title, preview, has }) => ({ title, preview, rows: rows.filter((row) => has(row.kind)).flatMap(displayRows) }))
            .filter((section) => section.rows.length);
        });
        const hasOverrides = rows.some((row) => row.overrides.length);
        const specimenStyle = (row) => ({ [CHANNEL_PROPERTY[row.kind]]: row.css });
        return { sections, title, hasOverrides, specimenStyle, css };
      },
      template: `
        <div class="tk">
          <component is="style">{{ css }}</component>
          <h1>{{ title }} tokens</h1>
          <p>Each preview is drawn by the token it references.</p>
          <p v-if="hasOverrides" class="tk__note">
            An indented row is a value that replaces the token's default at a breakpoint or when a
            modifier class is on the component.
          </p>

          <template v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <table>
              <thead>
                <tr><th>Token</th><th>References</th><th>Resolves to</th><th v-if="section.preview">{{ section.preview }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in section.rows" :key="row.key" :class="{ tk__override: row.override }">
                  <td><code :class="{ tk__note: row.override }">{{ row.label }}</code></td>
                  <td><code class="tk__note">{{ row.ref }}</code></td>
                  <td><code>{{ row.value }}</code></td>
                  <td v-if="section.title === 'Color'"><span class="tk__swatch" :style="{ background: row.css }"></span></td>
                  <td v-else-if="section.preview">
                    <span v-if="row.kind === 'line-height'" class="tk__leading" :style="specimenStyle(row)">Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                    <span v-else class="tk__specimen" :style="specimenStyle(row)">Aa Hawkeye</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      `,
    }),
  };
}
