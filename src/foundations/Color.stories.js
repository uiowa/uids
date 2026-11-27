import UidsCard from '../components/card/Card.vue';
import UidsGrid from '../components/grid/Grid.vue';
import UidsGridItem from '../components/grid/GridItem.vue';
import UidsTable from '../components/table/Table.vue';
import primitives from '../tokens/primitives/colors.json';
import semantic from '../tokens/semantic/colors.json';

// The Color page (Color.mdx) embeds these stories. Each carries a story-level `tags: ['!dev']`
// to stay out of the sidebar. Keep it a literal in every story, because Storybook reads tags
// statically when it builds the index, and a meta-level tag would hide the docs page too.
export default {
  title: 'Foundations/Color',
};

const lookup = (tree, path) => path.split('.').reduce((node, key) => node[key], tree);

// A primitive token: its hex and CSS custom property.
const primitive = (path) => ({
  hex: lookup(primitives.color, path).$value.hex,
  token: `--uiowa-color-${path.replaceAll('.', '-')}`,
});

// A semantic token: it references a primitive, so resolve it to a hex.
const role = (path) => ({
  hex: primitive(lookup(semantic.color, path).$value.replace(/^\{color\.|\}$/g, '')).hex,
  token: `--uiowa-color-${path.replaceAll('.', '-')}`,
});

// The card media slot takes an image, so a swatch is a one-color image that fills the media.
const swatch = (hex) => `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9" preserveAspectRatio="none"><rect width="16" height="9" fill="${hex}"/></svg>`,
)}`;

const card = ({ title, hex, details = [], tokens = [] }) => ({
  title,
  image: swatch(hex),
  hex,
  details,
  tokens,
});

// Grid.vue prefixes its type with `grid--`, so the system's smaller column gap
// (`grid--gap__sm`) rides along in the same string.
const SwatchGrid = (args) => ({
  components: { UidsCard, UidsGrid, UidsGridItem },
  setup() {
    return { args };
  },
  template: `
    <uids-grid :type="args.grid + ' grid--gap__sm'">
      <uids-grid-item v-for="color in args.colors" :key="color.title">
        <uids-card headline_style="serif">
          <template #media><img :src="color.image" alt=""></template>
          <template #title>{{ color.title }}</template>
          <p>{{ color.hex }}</p>
          <p v-for="line in color.details" :key="line">{{ line }}</p>
          <p v-for="token in color.tokens" :key="token"><code>{{ token }}</code></p>
        </uids-card>
      </uids-grid-item>
    </uids-grid>
  `,
});

export const Primary = {
  render: SwatchGrid,
  tags: ['!dev'],
  args: {
    grid: 'twocol--50-50',
    colors: [
      card({
        title: 'Iowa gold',
        hex: primitive('gold').hex,
        details: ['PMS 116 C', 'CMYK: 0 18 100 0', 'Madeira Thread: 910-1069 Classic Rayon #40'],
        tokens: [role('brand.gold').token],
      }),
      card({
        title: 'Black',
        hex: primitive('neutral.900').hex,
        details: ['CMYK: 0 0 0 100', 'Rich Black: 40 30 30 100'],
        tokens: [role('brand.black').token],
      }),
    ],
  },
};

export const Neutral = {
  render: SwatchGrid,
  tags: ['!dev'],
  args: {
    grid: 'fourcol--25',
    colors: ['0', '100', '150', '175', '200', '300', '400', '500', '700', '800', '900'].map((step) => (
      card({ title: `Neutral ${step}`, hex: primitive(`neutral.${step}`).hex })
    )),
  },
};

export const Accent = {
  render: SwatchGrid,
  tags: ['!dev'],
  args: {
    grid: 'threecol--33-34-33',
    colors: [
      ['Blue', 'blue', 'CMYK — pending'],
      ['Teal', 'teal', 'CMYK 84, 3, 56, 9'],
      ['Orange', 'orange', 'CMYK — pending'],
      ['Magenta', 'magenta', 'CMYK — pending'],
      ['Ochre', 'ochre', 'CMYK — pending'],
    ].map(([title, name, cmyk]) => {
      const { hex, token } = role(`accent.${name}`);
      return card({ title, hex, details: [cmyk], tokens: [token] });
    }),
  },
};

const dataNames = ['Blue', 'Orange', 'Magenta', 'Green', 'Purple', 'Ochre', 'Teal', 'Cyan', 'Olive', 'Rose', 'Warm gray', 'Cool gray'];

export const DataVisualization = {
  render: SwatchGrid,
  tags: ['!dev'],
  args: {
    grid: 'fourcol--25',
    colors: dataNames.map((name, i) => (
      card({ title: `${String(i + 1).padStart(2, '0')} ${name}`, hex: role(`data-visualization.categorical.${i + 1}`).hex })
    )),
  },
};

export const Status = {
  render: SwatchGrid,
  tags: ['!dev'],
  args: {
    grid: 'fourcol--25',
    colors: ['info', 'success', 'warning', 'danger'].flatMap((name) => {
      const label = name[0].toUpperCase() + name.slice(1);
      return [
        card({ title: `${label} background`, hex: role(`${name}-surface`).hex }),
        card({ title: `${label} edge`, hex: role(name).hex }),
      ];
    }),
  },
};

const roles = [
  ['Information', 'Helpful or explanatory information that is not urgent.', 'Notices, instructions, wayfinding information, system messages, and informational signs'],
  ['Success', 'Completion, approval, availability, or a positive condition.', 'Confirmations, passed checks, completed steps, and available or open states'],
  ['Warning', 'Caution, a potential problem, or the need for attention.', 'Warning signs, pending issues, restricted conditions, and caution messages'],
  ['Danger', 'Immediate risk, prohibition, failure, or required intervention.', 'Hazards, stop messages, emergency information, critical errors, and prohibited actions'],
];

export const StatusRoles = {
  tags: ['!dev'],
  render: () => ({
    components: { UidsTable },
    setup() {
      return { roles };
    },
    template: `
      <uids-table caption="Status color roles" border>
        <template #thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">What it communicates</th>
            <th scope="col">Common uses</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="[name, communicates, uses] in roles" :key="name">
            <th scope="row">{{ name }}</th>
            <td>{{ communicates }}</td>
            <td>{{ uses }}</td>
          </tr>
        </template>
      </uids-table>
    `,
  }),
};
