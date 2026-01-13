import Accordion from './Accordion.vue';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    label_color: {
      name: 'Label color',
      options: [
        '',
        'white'
      ],
      control: {
        type: 'select',
        labels: {
          '': 'Gray',
          'white': 'White',
        },
      }
    },
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

let items = [
  { title: 'Brand Bar', id: 'brand-bar', content: '<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>' },
  { title: 'Brand Footer', id: 'brand-footer', content: '<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>' },
  { title: 'Logo', id: 'logo', content: '<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>' },
  { title: 'Favicon', id: 'favicon', content: '<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>' },
];

export const Default = Template.bind({});
Default.args = {
  multiselectable: false,
  label_color: '',
  items: items,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  multiselectable: true,
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  ...Default.args,
  items: [
    { open: true, ...items[0] },
    { ...items[1] },
    { ...items[2] },
    { ...items[3] },
  ],
};
