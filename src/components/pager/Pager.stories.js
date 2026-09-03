import UidsPager from './Pager.vue';

export default {
  title: 'Components/Pager',
  component: UidsPager,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
      name: 'Current page',
    },
    total: {
      control: { type: 'number', min: 1 },
      name: 'Total pages',
    },
    quantity: {
      control: { type: 'number', min: 1 },
      name: 'Max page links',
    },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsPager },
    template: `
    <uids-pager v-bind="args" />
  `,
  }),
};

export const Default = {
  args: {
    current: 5,
    total: 12,
    quantity: 5,
  },
};

export const FirstPage = {
  args: {
    ...Default.args,
    current: 1,
  },
};

export const LastPage = {
  args: {
    ...Default.args,
    current: 12,
  },
};

// Pins the [class*="bg--*"] context rules (link fills per band, active flips).
// Also a regression-baseline fixture — renaming this export changes the kebab-cased
// story id that regression/config.json will reference.
export const OnBackgrounds = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsPager },
    template: `
    <div>
      <div class="bg--white" style="padding: 1rem"><uids-pager v-bind="args" heading_id="pager-on-white" /></div>
      <div class="bg--gray" style="padding: 1rem"><uids-pager v-bind="args" heading_id="pager-on-gray" /></div>
      <div class="bg--gold" style="padding: 1rem"><uids-pager v-bind="args" heading_id="pager-on-gold" /></div>
      <div class="bg--black" style="padding: 1rem"><uids-pager v-bind="args" heading_id="pager-on-black" /></div>
    </div>
  `,
  }),
  args: {
    ...Default.args,
  },
};
