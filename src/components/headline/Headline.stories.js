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
    },
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    highlight: {
      control: { type: 'boolean' },
    },
    text_style: {
      type: Boolean,
      default: false,
      options: ['', 'uppercase', 'serif'],
      control: {
        type: 'select',
        labels: {
          '': 'default',
          'uppercase': 'Uppercase',
          'serif': 'Serif',
        },
      },
    },
    underline: {
      control: { type: 'boolean' },
    },
    url: {
      control: { type: 'text' },
    },
    aria_describedby: {
      control: { type: 'text' },
    },
    class: {
      control: { type: 'text' },
    },
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
  text_style: '',
  underline: false,
  highlight: false,
  level: 'h2',
  default: 'Start your story here',
  url: '',
  aria_describedby: '',
  class: '',
};

export const Uppercase = Template.bind({});
Uppercase.args = {
  ...Default.args,
  text_style: 'uppercase',
};

export const Serif = Template.bind({});
Serif.args = {
  ...Default.args,
  text_style: 'serif',
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
