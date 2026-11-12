import UidsIowaBar from './BrandBar.vue'
import UidsBadge from '../badge/Badge.vue'
import UidsButton from '../button/Button.vue'
import BrandBarDocs from './BrandBarDocs.mdx';
import './BrandBar.stories.scss';

// Example default slot content, picked from the Content control.
const contentExamples = {
  none: '',
  badge: '<uids-badge type="secondary" text="Beta" />',
  button: '<uids-button url="#" color="secondary" size="small" transparent>Apply now</uids-button>',
}

export default {
  title: 'Components/Branding/Brand Bar',
  component: UidsIowaBar,
  tags: ['autodocs'],
  // Story-only wrapper that scopes BrandBar.stories.scss to these stories.
  decorators: [
    () => ({ template: '<div class="sb-brand-bar-stories"><story /></div>' }),
  ],
  argTypes: {
    site_name: {
      control: { type: 'text' },
      name: 'Site name'
    },
    site_url: {
      control: { type: 'text' },
      name: 'Site URL'
    },
    default: {
      name: 'Content',
      options: Object.keys(contentExamples),
      mapping: contentExamples,
      control: {
        type: 'select',
        labels: { none: 'None', badge: 'Badge', button: 'Button' },
      },
    },
    narrow: {
      control: { type: 'boolean' },
      name: 'Narrow'
    },
    healthcare: {
      control: { type: 'boolean' },
      name: 'Healthcare'
    },
  },
  parameters: {
    // Keep the story-only wrapper out of the HTML tab.
    html: {
      root: '.sb-brand-bar-stories',
    },
    docs: {
      source: {
        code: null,
      },
      page: BrandBarDocs,
    },
  },
};

const Template = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args, UidsBadge, UidsButton }
  },
  template: `
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
    >
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
  `,
})

export const Default = Template.bind({})
Default.args = {
  site_name: '',
  site_url: '',
  default: 'none',
  narrow: false,
  healthcare: false,
}

export const WithSiteTitle = Template.bind({})
WithSiteTitle.args = {
  ...Default.args,
  site_name: 'Brand',
}

export const Narrow = Template.bind({})
Narrow.args = {
  ...WithSiteTitle.args,
  narrow: true,
}

// The second row is story-only markup, styled in BrandBar.stories.scss,
// recreating the removed `.iowa-bar__below` row. It is not part of UIDS.
const ContentTemplate = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args, UidsBadge, UidsButton }
  },
  template: `
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
    >
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
    <div class="sb-brand-bar-stories__row">
      <div class="sb-brand-bar-stories__row-container">
        <div class="site-name">Icon Browser</div>
      </div>
    </div>
  `,
})

export const WithParentSiteTitle = ContentTemplate.bind({})
WithParentSiteTitle.args = {
  ...Default.args,
  narrow: true,
  site_name: 'Brand',
  site_url: '#',
}

export const ContentExamples = Template.bind({})
ContentExamples.args = {
  ...WithSiteTitle.args,
  default: 'badge',
}
