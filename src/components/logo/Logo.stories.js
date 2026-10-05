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
    healthcare: {
      control: { type: 'boolean' },
    },
    linked: {
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
    <uids-logo :healthcare="args.healthcare" :linked="args.linked"></uids-logo>
  `,
})

export const Iowa = Template.bind({})

Iowa.args = {
  healthcare: false,
  linked: true,
}

export const IowaHealthCare = Template.bind({})

IowaHealthCare.args = {
  healthcare: true,
  linked: true,
}
