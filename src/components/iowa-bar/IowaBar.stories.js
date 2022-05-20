import UidsIowaBar from './IowaBar.vue'

export default {
  title: 'Branding/Iowa Bar',
  component: UidsIowaBar,
  argTypes: {
    height: {
      control: { type: 'select' },
      options: ['full', 'narrow'],
      // defaultValue: 'full',
    }
  },
  args: {
    height: 'full',
  }
}

const Template = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar></uids-iowa-bar>
  `,
})

export const Default = Template.bind({})
