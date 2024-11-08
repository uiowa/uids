import UidsStub from "../../components/stub/Stub.vue";

export default {
  title: 'Not implemented/Badge',
  tags: ['!autodocs'],
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
    options: {
      showPanel: false,
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
      path="badge.html"
      title="Badge"
    >
    </uids-stub>
  `,
});

export const Badge = Template.bind({})
