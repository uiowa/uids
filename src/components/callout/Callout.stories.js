import UidsCallout from './Callout.vue'
import Background from '../shared/background'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'

export default {
  title: 'Components/Callout',
  component: UidsCallout,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    alignment: {
      name: 'Alignment',
      options: ['', 'left', 'right', 'center'],
      control: {
        type: 'select',
        labels: {
          '': 'full-width',
        },
      },
    },
    default: {
      name: 'Content',
      control: { type: 'text' },
    },
    ...Background.argTypes,
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
      :size="args.size"
      :alignment="args.alignment"
    >
    <div v-html="args.default" ></div>
    </uids-callout>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  default: '<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',
  size: 'small',
  background: 'gray',
  alignment: 'right',
};
