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
    uihc: {
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

const Template = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `,
})

export const Default = Template.bind({})
Default.args = {
  narrow: false,
  default: '',
  second_row_content: '',
  uihc: false,
}

const SiteTitleTemplate = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`
})

export const WithSiteTitle = SiteTitleTemplate.bind({})
WithSiteTitle.args = {
  ...Default.args,
  default: 'Brand',
}

export const Narrow = SiteTitleTemplate.bind({})
Narrow.args = {
  ...WithSiteTitle.args,
  narrow: true,
}

const ParentSiteTitleTemplate = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`
})

export const WithParentSiteTitle = ParentSiteTitleTemplate.bind({})
WithParentSiteTitle.args = {
  ...Default.args,
  default: 'Brand',
  second_row_content: 'Icon Browser',
}
