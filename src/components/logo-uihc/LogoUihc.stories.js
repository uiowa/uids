import UihcLogo from './LogoUihc.vue'

export default {
  title: 'Components/Branding/LogoUihc',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UihcLogo,
  tags: ['autodocs'],
}

const Template = (args) => ({
  components: { UihcLogo },
  setup() {
    return { args }
  },
  template: `
    <uihc-logo></uihc-logo>
  `,
})

export const Default = Template.bind({})
