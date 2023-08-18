import UidsAlert from './Alert.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Alert',
  component: UidsAlert,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    type: {
      name: 'Type',
      options: ['info', 'success', 'warning', 'danger'],
      control: {
        type: 'select',
        labels: {
          'info': 'Info',
          'success': 'Success',
          'warning': 'Warning',
          'danger': 'Danger',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    centered: {
      name: 'Centered',
      table: {
        category: 'Display options',
      },
    },
    dismissible: {
      name: 'Dismissible',
      table: {
        category: 'Properties',
      },
    },
    verticallyCentered: {
      name: 'Center Icon Vertically',
      table: {
        category: 'Display options',
      },
    },
    default: {
      name: 'Content',
      control: { type: 'text' },
      table: {
        category: 'Content',
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsAlert },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :dismissible="args.dismissible"
      :centerIconVertically="args.centerIconVertically"
    >
      <div v-html="args.default"></div>
    </uids-alert>`,
})

export const Info = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Info.args = {
  type: 'info',
  centered: false,
  dismissible: false,
  centerIconVertically: false,
  default: `
    <h2 class="headline headline--serif">
      Alert title
    </h2>
    <p>Lorem ipsum sit dolor amet.</p>
`,
};

export const Success = Template.bind({});
Success.args = {
  ...Info.args,
  type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Info.args,
  type: 'warning',
};

export const Danger = Template.bind({});
Danger.args = {
  ...Info.args,
  type: 'danger',
};
