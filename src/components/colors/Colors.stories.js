import UidsColors from './Colors.vue'

export default {
  title: 'Not yet implemented/Colors',
  component: UidsColors,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsColors },
  setup() {
    return { args }
  },
  template: `
    <uids-colors></uids-colors>
  `,
})

export const Default = Template.bind({})
