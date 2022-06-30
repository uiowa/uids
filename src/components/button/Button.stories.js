import UidsButton from './Button.vue';
import Borderless from "../shared/borderless";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/Button',
  component: UidsButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    url: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'transparent'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    ...Borderless.argTypes,
    full: {
      name: 'full width',
      control: { type: 'boolean' },
    },
    font: {
      control: { type: 'select' },
      options: ['None', 'serif', 'sans-serif']
    },
    icon: {
      control: { type: 'text' },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :font="args.font"
      :icon="args.icon"
    >
      {{ args.label }}
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  `,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  url: 'https://example.com',
  label: 'Read more',
  color: 'primary',
  size: 'medium',
  borderless: false,
  full: false,
  font: 'None',
  icon: '<i class="fas fa-arrow-right"></i>',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  color: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Primary.args,
  color: 'tertiary',
};

export const Transparent = Template.bind({});
Transparent.args = {
  ...Primary.args,
  color: 'transparent',
};
