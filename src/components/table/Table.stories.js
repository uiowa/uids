import UidsTable from './Table.vue';
import Background from '../shared/background';
import '../../scss/components/_background.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Table',
  component: UidsTable,
  parameters: {
    docs: {
      description: {
        component: `A data table: a caption, a header row, body rows with row headers, inside a wrapper that scrolls sideways on narrow screens.

**Variants.** Two looks, chosen with \`variant\`:

| Variant | Looks like | Use it for |
| --- | --- | --- |
| \`default\` | A rounded box: gray header row, a rule between rows | Most tables: costs, dates, records |
| \`minimal\` | No box: uppercase column heads in Label Large, hairline row rules | Reference lists and specifications: tokens, values, ramps |

\`border\` (column rules), \`highlight\` (hover) and \`sticky\` (header) work with either variant.

**Caption.** The caption names the table for screen readers. In the default look it is the box's first row. \`caption_hidden\` hides it visually and screen readers still read it: use it when a heading or label above the table already names it. Leave the caption empty and none renders, as in the No caption story; then name the table another way.

**Alignment.** Cells are left aligned. Add \`table__cell--center\` or \`table__cell--right\` to a \`th\` or \`td\`, and repeat it down the column: right for numbers you compare and for a trailing link, as in the No caption story. \`table__cell--left\` undoes an \`align\` attribute.`,
      },
    },
  },
  argTypes: {
    ...Background.argTypes,
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal'],
      name: 'Variant',
      table: {
        category: 'Display options',
      },
    },
    links: { name: 'Links', control: 'boolean' },
    summary: {
      control: { type: 'text' },
      name: 'Summary',
    },
    caption: {
      control: { type: 'text' },
      name: 'Caption',
    },
    caption_hidden: {
      control: { type: 'boolean' },
      name: 'Hide caption visually',
    },
    sticky: {
      control: { type: 'boolean' },
      name: 'Sticky',
      table: {
        category: 'Display options',
      },
    },
    highlight: {
      control: { type: 'boolean' },
      name: 'Hover highlight',
      table: {
        category: 'Display options',
      },
    },
    border: {
      control: { type: 'boolean' },
      name: 'Border',
      table: {
        category: 'Display options',
      },
    },
  },
};

const Template = (args) => ({
  components: { UidsTable },
  setup() {
    return { args };
  },
  template: `
    <div :class="args.background ? 'bg--' + args.background : ''" style="padding: 1rem;">
    <uids-table
      :summary="args.summary"
      :caption="args.caption"
      :caption_hidden="args.caption_hidden"
      :sticky="args.sticky"
      :highlight="args.highlight"
      :border="args.border"
      :variant="args.variant"
    >
      <template #thead>
        <tr>
          <th scope="row">Category</th>
          <th scope="col">Resident</th>
          <th scope="col">Nonresident</th>
        </tr>
      </template>
      <template #tbody>
        <tr>
          <th scope="row"><a v-if="args.links" href="#tuition">Tuition & Fees</a><template v-else>Tuition & Fees</template></th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><a v-if="args.links" href="#housing">Housing & Meals</a><template v-else>Housing & Meals</template></th>
          <td>$00,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><strong>Total</strong></th>
          <td><strong>$00,000</strong></td>
          <td><strong>$00,000</strong></td>
        </tr>
      </template>
    </uids-table>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  summary: 'Undergraduate Cost of Attendance - Living on Campus Example Table',
  caption: 'Living On Campus - Example Table',
  sticky: true,
  highlight: true,
  border: false,
};

export const Links = Template.bind({});
Links.args = { ...Default.args, links: true, background: 'black' };

export const Minimal = Template.bind({});
Minimal.args = { ...Default.args, variant: 'minimal', sticky: false };

// Records: a year per row, a link at the end. No caption.
const RecordsTemplate = (args) => ({
  components: { UidsTable },
  setup() {
    const rows = [
      ['2025', 'None reported', 'July 18, 2025'],
      ['2024', '2 entities', 'August 2, 2024'],
      ['2023', '1 entity', 'July 26, 2023'],
      ['2022', 'None reported', 'August 11, 2022'],
    ];
    return { args, rows };
  },
  template: `
    <div :class="args.background ? 'bg--' + args.background : ''" style="padding: 1rem;">
    <uids-table
      :summary="args.summary"
      :caption="args.caption"
      :caption_hidden="args.caption_hidden"
      :sticky="args.sticky"
      :highlight="args.highlight"
      :border="args.border"
      :variant="args.variant"
    >
      <template #thead>
        <tr>
          <th scope="col">Year</th>
          <th scope="col">Entities disclosed</th>
          <th scope="col">Completed</th>
          <th scope="col"><span class="element-invisible">Report</span></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="r in rows" :key="r[0]">
          <th scope="row">{{ r[0] }}</th>
          <td>{{ r[1] }}</td>
          <td>{{ r[2] }}</td>
          <td class="table__cell--right"><a :href="'#disclosure-' + r[0]">View<span class="element-invisible"> the {{ r[0] }} disclosure</span></a></td>
        </tr>
      </template>
    </uids-table>
    </div>
  `,
});

export const NoCaption = RecordsTemplate.bind({});
NoCaption.args = { summary: '', caption: '', border: false, sticky: false, highlight: false };
