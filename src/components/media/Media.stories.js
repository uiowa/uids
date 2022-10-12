import UidsMedia from './Media.vue';
import media_image from '../../assets/images/viewbook/sections/122.jpg'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/Media',
  component: UidsMedia,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // Slots
    media_markup: {
      control: { type: 'text' },
    },

    // Props

  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsMedia },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
      <uids-media>
      <template #media_markup v-if="args.media_markup"><span v-html="args.media_markup"></span></template>
      </uids-media>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  media_markup: '',
};
