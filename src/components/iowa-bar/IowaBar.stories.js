import UidsIowaBar from './IowaBar.vue'

export default {
  title: 'Branding/Iowa Bar',
  component: UidsIowaBar,
  argTypes: {
    narrow: {
      control: { type: 'boolean' },
    },
    default: {
      control: { type: 'text' },
    },
    parent_title: {
      control: { type: 'text' },
    },
    bottom_content: {
      control: { type: 'text' },
    },
  },
}

const Template = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar :narrow="args.narrow">
      <template v-if="args.parent_title !== ''" #parent_title>{{ args.parent_title }}</template>
      {{ args.default }}
      <template v-if="args.bottom_content !== ''" #bottom_content><div v-html="args.bottom_content"></div></template>
    </uids-iowa-bar>
  `,
})

export const Default = Template.bind({})
Default.args = {
  narrow: false,
  parent_title: '',
  bottom_content: '',
}

export const WithSiteTitle = Template.bind({})
WithSiteTitle.args = {
  ...Default.args,
  default: 'Brand',
}

export const Narrow = Template.bind({})
Narrow.args = {
  ...WithSiteTitle.args,
  narrow: true,
}

export const WithParentSiteTitle = Template.bind({})
WithParentSiteTitle.args = {
  ...Default.args,
  default: 'Icon Browser',
  parent_title: 'Brand',
}

export const WithContentBelow = Template.bind({})
WithContentBelow.args = {
  ...WithSiteTitle,
  bottom_content: `
    <nav class="menu">
      <ul>
        <li><a href="/">About</a></li>
      </ul>
      <ul>
        <li><a href="/">Donate</a></li>
      </ul>
    </nav>
  `,
}
