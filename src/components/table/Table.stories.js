import UidsTable from './Table.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Table',
  component: UidsTable,
  argTypes: {
    summary: {
      control: { type: 'text' },
      name: 'Summary',
    },
    caption: {
      control: { type: 'text' },
      name: 'Caption',
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
    <uids-table
      :summary="args.summary"
      :caption="args.caption"
      :sticky="args.sticky"
      :highlight="args.highlight"
      :border="args.border"
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
          <th scope="row">Tuition & Fees</th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row">Housing & Meals</th>
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
  `,
});

export const Default = Template.bind({});
Default.args = {
  summary: 'Undergraduate Cost of Attendance - Living on Campus Example Table',
  caption: 'Living On Campus - Example Table',
  sticky: true,
  highlight: true,
  border: true,
};
