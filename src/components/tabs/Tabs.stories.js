import UidsTabs from './Tabs.vue';

export default {
  title: 'Components/Tabs',
  component: UidsTabs,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      name: 'Unique id',
      description: 'Required: tabs.js keys panel switching and #hash activation off it.',
    },
    aria_label: {
      control: 'text',
      name: 'Tablist label',
    },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsTabs },
    template: `
    <uids-tabs v-bind="args" />
  `,
  }),
};

const items = [
  {
    title: 'Hours',
    content: '<p>Open Monday through Friday, 8:00 a.m. to 5:00 p.m. Summer hours may vary by department.</p>',
  },
  {
    title: 'Departments',
    content: '<p>This building houses University College, Distance and Online Education, and the Division of Continuing Education.</p>',
  },
  {
    title: 'Accessibility',
    content: '<p>Accessible entrances are located on the north and east sides. An elevator serves all floors.</p>',
  },
];

export const Default = {
  args: {
    id: 'tabs-example',
    aria_label: 'Additional building information',
    items: items,
  },
};
