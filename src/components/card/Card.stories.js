import UidsCard from './Card.vue';
import card_image from '../../assets/images/viewbook/sections/122.jpg'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/Card',
  component: UidsCard,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    link: {
      control: { type: 'text' },
    },
    enclosed: {
      control: { type: 'boolean' },
    },
    image: {
      control: { type: 'text' },
    },
    details: {
      control: { type: 'text' },
    },
    default: {
      control: { type: 'text' },
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="max-width: 300px">
      <uids-card
        :link="args.link"
        :image="args.image"
        :enclosed="args.enclosed"
      >
        <template #title v-html="args.title" v-if="args.title"></template>
        <template #default><div v-html="args.default"></div></template>
      </uids-card>
    </div>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  link: '',
  image: '',
  enclosed: true,
  title: 'Title',
  default: '<strong>Hello!</strong> Here is some card content',
};

export const LinkedCard = Template.bind({});
LinkedCard.args = {
  ...Default.args,
  image: card_image,
  link: 'https://uiowa.edu',
}
