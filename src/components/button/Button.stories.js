import UidsButton from './Button.vue';
import Borderless from "../shared/borderless";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsButton,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    url: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
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
    transparent: {
      name: 'transparent',
      control: { type: 'boolean' },
    },
    light_font: {
      control: { type: 'boolean' },
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
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
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
  transparent: false,
  light_font: false,
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

export const NoText = Template.bind({});
NoText.args = {
  ...Primary.args,
  label: '',
};

export const LightFont = Template.bind({});
LightFont.args = {
  ...Primary.args,
  light_font: true,
};


