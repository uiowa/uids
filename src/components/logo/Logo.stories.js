import UidsLogo from './Logo.vue'
import BrandBarDocs from '../brand-bar/BrandBarDocs.mdx';

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
  tags: ['autodocs'],
  argTypes: {
    uihc: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { UidsLogo },
  setup() {
    return { args }
  },
  template: `
    <uids-logo :uihc="args.uihc"></uids-logo>
  `,
})

export const Default = Template.bind({})
