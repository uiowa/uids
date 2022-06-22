import UidsHeadline from './Headline.vue';
import { computed } from 'vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/Headline',
  component: UidsHeadline,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    default: {
      control: { type: 'text' },
      defaultValue: "Start your story here",
    },
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      defaultValue: 'h2',
    },
    highlight: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    uppercase: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    underline: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    url: {
      control: { type: 'text' },
      defaultValue: '',
    },
    aria_describedby: {
      control: { type: 'text' },
      defaultValue: '',
    },
    class: {
      control: { type: 'text' },
      defaultValue: '',
    },
  },
  args: {
    level: 'h2',
    default: 'Start your story here',
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsHeadline },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  // @todo Figure out how to not bind the `default` slot to the component.
  template: `
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  uppercase: false,
  underline: false,
  highlight: false,
};

export const Uppercase = Template.bind({});
Uppercase.args = {
  ...Default.args,
  uppercase: true,
};

export const Underline = Template.bind({});
Underline.args = {
  ...Default.args,
  underline: true,
}

export const Highlight = Template.bind({});
Highlight.args = {
  ...Default.args,
  highlight: true,
}

// @todo Figure out how to get this example working.
export const HighlightedSingleWord = Template.bind({});
HighlightedSingleWord.args = {
  ...Default.args,
  default: `Start your <span class="highlight">story</span> here`,
}
