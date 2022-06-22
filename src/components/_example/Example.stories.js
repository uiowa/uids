import UidsExample from './Example.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/Example',
  component: UidsExample,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    excited: {
      control: { type: 'boolean' },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsExample },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<uids-example :excited="args.example">{{ args.default }}</uids-example>',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  label: 'Hello world',
  excited: false,
};

export const Excited = Template.bind({});
Excited.args = {
  ...Default.args,
  excited: true,
};
