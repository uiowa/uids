import UidsPageTitle from './PageTitle.vue';
import UidsBreadcrumbs from '../breadcrumbs/Breadcrumbs.vue';

export default {
  title: 'Components/Page Title',
  component: UidsPageTitle,
  tags: ['autodocs'],
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsPageTitle },
    template: `
    <uids-page-title v-bind="args" />
  `,
  }),
};

// The production default: page-title.html.twig emits no modifier class, because the
// common case is a breadcrumb sitting immediately above the title and owning the
// space above the pair.
export const Default = {
  args: {
    title: 'Understanding life at the molecular level',
  },
};

// The pairing this component exists to express. UIDS already owned the breadcrumb but
// not the title, so the relationship between them could not be shown anywhere.
// Measured on https://sandbox.prod.drupal.uiowa.edu/test-breadcrumbs at 1385px: the
// breadcrumb carries margin-top 1.75rem / margin-bottom 0 and the title margin-top 0,
// so the two sit FLUSH — a 0px gap. Also a regression-baseline fixture; renaming this
// export changes the kebab-cased story id that regression/config.json would reference.
export const WithBreadcrumbs = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsPageTitle, UidsBreadcrumbs },
    template: `
    <div>
      <uids-breadcrumbs heading_id="page-title-breadcrumb" :items="args.items" />
      <uids-page-title :title="args.title" />
    </div>
  `,
  }),
  args: {
    title: 'Understanding life at the molecular level',
    items: [
      { text: 'Home', url: '#' },
      { text: 'Parent page with menu link' },
      { text: 'Current page' },
    ],
  },
};

// No breadcrumb above the title, so the title reclaims the space the breadcrumb would
// have held: `.page-title--no-breadcrumbs` restores margin-top 1.75rem (28px).
export const NoBreadcrumbs = {
  args: {
    title: 'Understanding life at the molecular level',
    no_breadcrumbs: true,
  },
};
