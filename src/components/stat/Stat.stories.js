import UidsStat from './Stat.vue'

export default {
  title: 'Not yet implemented/Stat',
  component: UidsStat,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsStat },
  setup() {
    return { args }
  },
  template: `
    <uids-stat></uids-stat>
  `,
})

export const Default = Template.bind({})
