import UidsCta from './Cta.vue';


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
    default: {
      control: { type: 'text' },
    },
    link_text: {
      control: { type: 'text' },
    },
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
      :title="args.title"
      :details="args.details"
      :link_text="args.link_text"

    >
    <template #default v-if="args.label">{{ args.label }}</template>
    </uids-cta>
  `,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  url: 'https://example.com',
  label: 'Read more',
  title: 'Buy Now',
  details: 'Lorem Ipsum',
  default: 'dsfad',
  link_text: 'Buy Now',
};


