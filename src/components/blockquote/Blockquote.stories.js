import UidsBlockquote from './Blockquote.vue'

export default {
  title: 'Not yet implemented/Blockquote',
  component: UidsBlockquote,
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  // parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  components: { UidsBlockquote },
  setup() {
    return { args }
  },
  template: `
    <uids-blockquote></uids-blockquote>
  `,
})

export const Default = Template.bind({})
