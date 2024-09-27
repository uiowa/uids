import UidsIowaFooter from './BrandFooter.vue'

export default {
  title: 'Branding/Brand Footer',
  component: UidsIowaFooter,
  argTypes: {
    default: {
      control: { type: 'text' },
    },
    second_row_content: {
      control: { type: 'text' },
    },
    third_row_content: {
      control: { type: 'text' },
    },
  },
}

const Template = (args) => ({
  components: { UidsIowaFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-footer>
    <div v-html="args.default"></div>
    </uids-iowa-footer>
  `,
})

export const Default = Template.bind({})
Default.args = {
  default: 'Brand',
  second_row_content: 'OSC',
  third_row_content: '<a href="https://uiowa.edu/"><i class="fab fa-youtube"></i><span class="link-text">Youtube</span></a>',
}

const SiteTitleTemplate = (args) => ({
  components: { UidsIowaFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-footer>
    <div class="site-name">{{ args.default }}</div>
    <div class="footer__links footer__links--icon" v-html="args.third_row_content" ></div>
    </uids-iowa-footer>
`
})

export const WithSiteTitle = SiteTitleTemplate.bind({})
WithSiteTitle.args = {
  ...Default.args,
}

const ParentSiteTitleTemplate = (args) => ({
  components: { UidsIowaFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-footer>
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.second_row_content  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.third_row_content" ></div>
    </uids-iowa-footer>
`
})

export const WithParentSiteTitle = ParentSiteTitleTemplate.bind({})
WithParentSiteTitle.args = {
  ...Default.args,
}
