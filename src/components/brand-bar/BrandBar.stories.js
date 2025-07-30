import UidsIowaBar from './BrandBar.vue'
import BrandBarDocs from './BrandBarDocs.mdx';

export default {
  title: 'Components/Branding/Brand Bar',
  component: UidsIowaBar,
  tags: ['autodocs'],
  argTypes: {
    narrow: {
      control: { type: 'boolean' },
    },
    default: {
      control: { type: 'text' },
    },
    second_row_content: {
      control: { type: 'text' },
    },
    healthcare: {
      control: { type: 'boolean' },
    },

  },
  parameters: {
    docs: {
      source: {
        code: null,
      },
      page: BrandBarDocs,
    },
  },
};

const Template = {
  render: (args) => ({
    components: { UidsIowaBar },
    setup() {
      return { args }
    },
    template: `
      <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.second_row_content || args.narrow">
        <div v-if="args.second_row_content" class="parent-site-name">{{ args.default }}</div>
        <template v-if="args.second_row_content" #second_row_content>
          <h1 class="site-name">{{ args.second_row_content }}</h1>
        </template>
        <h1 v-else-if="args.default" class="site-name">{{ args.default }}</h1>
      </uids-iowa-bar>
    `,
  }),
};

export const Default = {
  name: 'Default',
  ...Template,
  args: {
    narrow: false,
    default: '',
    second_row_content: '',
    healthcare: false,
  },
}

export const WithSiteTitle = {
  name: 'With site title',
  ...Template,
  args: {
    ...Default.args,
    default: `Brand`,
  },
}

export const Narrow = {
  name: 'Narrow',
  ...Template,
  args: {
    ...Default.args,
    narrow: true,
  },
}

export const WithParentSiteTitle = {
  name: 'With parent site title',
  ...Template,
  args: {
    ...Default.args,
    default: 'Brand',
    second_row_content: 'Icon Browser',
  },
}
