import UidsBlockquote from './Blockquote.vue';
import Background from "../shared/background";
import blockquote_image from '../../assets/images/demo/herky-square.jpg'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Blockquote',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsBlockquote,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // Props
    orientation: {
      name: 'Orientation',
      options: ['', 'center', 'right'],
      control: {
        type: 'select',
        labels: {
          '': 'Left (default)',
          'center': 'Center',
          'right': 'Right',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    url: {
      control: { type: 'text' },
    },
    media_position_bottom: {
      control: { type: 'boolean' },
    },
    footer: {
      control: { type: 'text' },
    },
    cite_text: {
      control: { type: 'text' },
    },
    content: {
      control: { type: 'text' },
    },
    // Slots
    media: {
      name: 'Media',
      control: 'text',
      table: {
        category: 'Media',
      },
    },
    ...Background.argTypes,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsBlockquote },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-blockquote
      :url="args.url"
      :background="args.background"
      :content="args.content"
      :footer="args.footer"
      :cite_text="args.cite_text"
      :media_position_bottom="args.media_position_bottom"
      :orientation="args.orientation"
    >
      <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #content v-if="args.content"><div v-html="args.content" ></div></template>
      <template #footer v-if="args.footer"><div :class="getClasses" v-html="args.footer" ></div></template>
    </uids-blockquote>
  `,
});

export const Left = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Left.args = {
  url: 'https://uiowa.edu/',
  cite_text: 'Be a Hawkeye',
  content: '<p>Since his birth 60 years ago, Herky has symbolized intercollegiate athletics at the UI and epitomized University life in Iowa City. He even donned a military uniform during the Korean War and became the insignia of the 124th Fighting Squadron.</p>',
  footer: '<p>Herky the Hawk,<br/><strong>University of Iowa Mascot</strong></p>',
  media_position_bottom: false,
  background: '',
  orientation: '',
  media: '<img src="' + blockquote_image + '" alt="Alt">',
};

export const Centered= Template.bind({});
Centered.args = {
  ...Left.args,
  orientation: 'center',
}

export const Right = Template.bind({});
Right.args = {
  ...Left.args,
  orientation: 'right',
}
