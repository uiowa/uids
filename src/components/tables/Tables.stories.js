import UidsTables from './Tables.vue'

export default {
  title: 'Not yet implemented/Tables',
  component: UidsTables,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsTables },
  setup() {
    return { args }
  },
  template: `
    <uids-tables></uids-tables>
  `,
})

export const Default = Template.bind({})
