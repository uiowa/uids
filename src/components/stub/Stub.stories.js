import UidsStub from './Stub.vue';

export default {
  title: 'Components/Stub',
  component: UidsStub,
  argTypes: {
    path: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsStub },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-stub
      path="components/detail/background.html"
    >
    </uids-stub>
  `,
});

export const Info = Template.bind({});

