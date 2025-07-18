import UidsForm from './Form.vue'
import BrandBarDocs from '../brand-bar/BrandBarDocs.mdx';

export default {
  title: 'Components/Form',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsForm,
  tags: ['autodocs'],
  argTypes: {
  },
};

const Template = (args) => ({
  components: { UidsForm },
  setup() {
    return { args }
  },
  template: `
    <uids-form/>
  `,
})

export const Form = Template.bind({})

Form.args = {
}
