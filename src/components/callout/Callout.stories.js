import UidsCallout from './Callout.vue'
import Background from '../shared/background'
import Inline from '../shared/inline'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'

export default {
  title: 'Components/Callout',
  component: UidsCallout,
  argTypes: {
    // ...Inline.argTypes,
    ...Background.argTypes,
    default: {
      name: 'Content',
      control: { type: 'text' },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsCallout },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-callout
      :background="args.background"
      :size="args.inline_size"
      :alignment="args.inline_alignment"
    >
    <div v-html="args.default" ></div>
    </uids-callout>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  default: '<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',
  // inline_size: 'small',
  background: 'gray',
  // inline_alignment: 'right',
};
