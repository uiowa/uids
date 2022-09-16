import UidsCta from './Cta.vue';
import UidsHeadline from '../headline/Headline.vue';
import Background from "../shared/background";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/CTA',
  component: UidsCta,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    url: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    details: {
      control: { type: 'text' },
    },
    button_label: {
      control: { type: 'text' },
    },
    button_icon: {
      control: { type: 'text' },
    },
    ...Background.argTypes,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsCta },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :details="args.details"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  url: 'https://uiowa.edu/',
  title: 'Be a Hawkeye',
  details: 'Iowa is where great stories begin. It\'s time to start yours. Find out how.',
  button_label: 'Request Information',
  button_icon: '<i class="fas fa-arrow-right"></i>',
};


