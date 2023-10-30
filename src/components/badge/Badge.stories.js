import UidsBadge from './Badge.vue'

export default {
  title: 'Not yet implemented/Badge',
  component: UidsBadge,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsBadge },
  setup() {
    return { args }
  },
  template: `
    <uids-badge></uids-badge>
  `,
})

export const Default = Template.bind({})
