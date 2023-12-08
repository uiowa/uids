import UidsLogo from './Logo.vue'

export default {
  title: 'Components/Branding/Logo',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsLogo,
}

const Template = (args) => ({
  components: { UidsLogo },
  setup() {
    return { args }
  },
  template: `
    <uids-logo></uids-logo>
  `,
})

export const Default = Template.bind({})
