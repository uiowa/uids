import Accordion from './Accordion.vue';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    multiselectable: {
      control: 'boolean',
      name: 'Multi select'
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
    { title: 'Section 1 title', expanded: true, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>' },
    { title: 'Section 2 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { title: 'Section 3 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { title: 'Section 4 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
  ],
  activeIndices: [0],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  multiselectable: true,
};
