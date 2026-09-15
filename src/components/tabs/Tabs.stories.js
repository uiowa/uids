import UidsTabs from './Tabs.vue';

export default {
  title: 'Components/Tabs',
  component: UidsTabs,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      name: 'Unique id',
      description: 'Required — tabs.js keys panel switching and #hash activation off it.',
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

// Pins the [class*="bg--*"] context rules (tab text on black, selected bar flip on
// gold). Also a regression-baseline fixture — renaming this export changes the
// kebab-cased story id that regression/config.json will reference.
export const OnBackgrounds = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsTabs },
    template: `
    <div>
      <div class="bg--gold" style="padding: 1rem"><uids-tabs v-bind="args" id="tabs-on-gold" /></div>
      <div class="bg--black" style="padding: 1rem"><uids-tabs v-bind="args" id="tabs-on-black" /></div>
    </div>
  `,
  }),
  args: {
    aria_label: Default.args.aria_label,
    items: items,
  },
};
