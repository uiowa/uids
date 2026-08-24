import UidsBreadcrumbs from './Breadcrumbs.vue';

export default {
  title: 'Components/Breadcrumbs',
  component: UidsBreadcrumbs,
  tags: ['autodocs'],
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsBreadcrumbs },
    template: `
    <uids-breadcrumbs v-bind="args" />
  `,
  }),
};

// Mirrors the production test page: linked Home, an unlinked parent (no menu
// link), and the unlinked current page.
export const Default = {
  args: {
    items: [
      { text: 'Home', url: '#' },
      { text: 'Parent page with menu link' },
      { text: 'Current page' },
    ],
  },
};

export const AllLinked = {
  args: {
    items: [
      { text: 'Home', url: '#' },
      { text: 'Academics', url: '#' },
      { text: 'Programs', url: '#' },
      { text: 'Current page' },
    ],
  },
};

// Pins the [class*="bg--black"] context rule (crumbs and links flip to white).
// Also a regression-baseline fixture — renaming this export changes the
// kebab-cased story id that regression/config.json will reference.
export const OnBlack = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsBreadcrumbs },
    template: `
    <div class="bg--black" style="padding: 1rem">
      <uids-breadcrumbs v-bind="args" heading_id="breadcrumb-on-black" />
    </div>
  `,
  }),
  args: {
    ...Default.args,
  },
};
