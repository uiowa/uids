import Accordion from './Accordion.vue';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    multiselectable: {
      control: 'boolean',
      name: 'Multi select'
    },
    items: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => ({
  components: { Accordion },
  setup() {
    return { args };
  },
  template: `
    <Accordion v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  multiselectable: false,
  items: [
    { title: 'Set 1 - Chocolate Chip Cookie', expanded: true, content: '<p>Details about chocolate chip cookies.</p>' },
    { title: 'Set 1 - Sugar Cookie', content: '<p>Details about sugar cookies.</p>' },
    { title: 'Set 2 - Snickerdoodle Cookies', content: '<p>Details about snickerdoodles.</p>' },
    { title: 'Set 2 - Oatmeal Raisin', content: '<p>Details about oatmeal raisin cookies.</p>' },
  ],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  multiselectable: true,
};
