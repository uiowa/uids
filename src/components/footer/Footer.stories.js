import UidsFooter from './Footer.vue'

export default {
  title: 'Not yet implemented/Footer',
  component: UidsFooter,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-footer></uids-footer>
  `,
})

export const Default = Template.bind({})
