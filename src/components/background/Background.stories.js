import UidsBackground from './Background.vue'

export default {
  title: 'Not yet implemented/background',
  component: UidsBackground,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsBackground },
  setup() {
    return { args }
  },
  template: `
    <uids-background></uids-background>
  `,
})

export const Default = Template.bind({})
