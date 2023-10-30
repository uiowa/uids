import UidsCta from './cta.vue'

export default {
  title: 'Not yet implemented/Cta',
  component: UidsCta ,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsCta },
  setup() {
    return { args }
  },
  template: `
    <uids-cta></uids-cta>
  `,
})

export const Default = Template.bind({})
