import UidsTabs from './Tabs.vue'

export default {
  title: 'Not yet implemented/Tabs',
  component: UidsTabs,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsTabs },
  setup() {
    return { args }
  },
  template: `
    <uids-tabs></uids-tabs>
  `,
})

export const Default = Template.bind({})
