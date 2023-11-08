import UidsLogo from './Logo.vue'

export default {
  title: 'Components/Branding/Logo',
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
