import UidsLogo from './Logo.vue'

export default {
  title: 'Branding/Logo',
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
