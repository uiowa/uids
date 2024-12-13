import Accordion from './Accordion.vue';
import AccordionDocs from "./AccordionDocs.mdx";

export default {
  title: 'Components/Accordion',
  component: Accordion,
  // tags: ['autodocs'],
  argTypes: {
    multiselectable: {
      control: 'boolean',
      name: 'Multi select'
    },
  },
  // parameters: {
    // docs: {
    //   source: {
    //     code: null,
    //   },
    //   page: AccordionDocs,
    // },
  // },
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
    { title: 'Section 1 title', active: true, expanded: true, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>' },
    { title: 'Section 2 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { title: 'Section 3 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { title: 'Section 4 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
  ],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  multiselectable: true,
  items: [
    { title: 'Section 1 title', active: true, expanded: true, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>' },
    { title: 'Section 2 title', active: true, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { title: 'Section 3 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { title: 'Section 4 title', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
  ]
};
