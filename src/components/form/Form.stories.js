import UidsForm from './Form.vue';

export default {
  title: 'Components/Form',
  parameters: {
    docs: {
      source: {
        code: null
      },
    }
  },
  component: UidsForm,
  tags: ['autodocs'],
  argTypes: {}
};

const BasicFormTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: '<uids-form v-bind="args" />'
});

export const Form = BasicFormTemplate.bind({});
Form.args = {};



const CompleteFormTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: `
    <uids-form />`
});

