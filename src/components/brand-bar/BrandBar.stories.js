import UidsIowaBar from './BrandBar.vue'
import UserMenuExample from '../showcase/UserMenuExample.js';
import BrandBarDocs from './BrandBarDocs.mdx';
import brandBarTokens from '../../tokens/components/brand-bar.json';
import { componentTokensStory } from '../tokens/componentTokens.js';
import './BrandBar.stories.scss';

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
    site_name_element: {
      control: { type: 'select' },
      options: ['h1', 'span'],
      name: 'Site name element'
    },
    // Example default slot content: the name of a component the templates register.
    default: {
      name: 'Content',
      options: ['UserMenuExample'],
      control: {
        type: 'select',
        labels: { UserMenuExample: 'User menu' },
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

// First, so it sits right under Docs.
export const Tokens = {
  ...componentTokensStory(brandBarTokens),
  tags: ['!autodocs', 'noAddonsDrawer'],
};

const Template = (args) => ({
  components: { UidsIowaBar, UserMenuExample },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
  `,
})

export const Default = Template.bind({})
Default.args = {
  site_name: '',
  site_url: '#',
  site_name_element: 'h1',
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
  components: { UidsIowaBar, UserMenuExample },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
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
  ...Narrow.args,
}

export const ContentExamples = Template.bind({})
ContentExamples.args = {
  ...WithSiteTitle.args,
  default: 'UserMenuExample',
  narrow: true,
}
