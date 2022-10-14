import UidsCard from './Card.vue';
import card_image from '../../assets/images/viewbook/sections/122.jpg';
import person_image from '../../assets/images/viewbook/sections/herky2.jpeg';
import Background from "../shared/background";
import Borderless from "../shared/borderless";
import Media from "../shared/media";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Basic/Card',
  component: UidsCard,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // Slots
    media: {
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
    // Props
    url: {
      control: { type: 'text' },
    },
    link_text: {
      control: { type: 'text' },
    },
    ...Background.argTypes,
    // Modifiers
    ...Borderless.argTypes,
    centered: {
      control: { type: 'boolean' },
    },
    // Media properties
    ...Media.argTypes,
    media_align: {
      control: { type: 'select',
        options: ['', 'media-left', 'media-right']
      },
    },
    media_padded: {
      control: { type: 'boolean' },
    },
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
<!--    <div style="max-width: 600px">-->
      <uids-card
        :url="args.url"
        :link_text="args.link_text"
        :borderless="args.borderless"
        :media_size="args.media_size"
        :media_shape="args.media_shape"
        :media_border="args.media_border"
        :media_cover="args.media_cover"
        :background="args.background"
        :media_align="args.media_align"
        :media_padded="args.media_padded"
        :centered="args.centered"
      >
        <template #media v-if="args.media"><span v-html="args.media" ></span></template>
        <template #title v-if="args.title"><div v-html="args.title" ></div></template>
        <template #details v-if="args.details"><div v-html="args.details" ></div></template>
        <template #default><div v-html="args.default"></div></template>
      </uids-card>
<!--    </div>-->
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  url: '',
  link_text: '',
  media: '',
  media_align: '',
  media_padded: false,
  centered: false,
  title: 'Title',
  details: '',
  default: '<strong>Hello!</strong> Here is some card content',
};

export const LinkedCard = Template.bind({});
LinkedCard.args = {
  ...Default.args,
  media: '<img src="' + card_image + '" alt="Alt">',
  url: 'https://uiowa.edu',
  link_text: 'Learn more',
}

export const LinkedCardWithoutButtonText = Template.bind({});
LinkedCardWithoutButtonText.args = {
  ...Default.args,
  media: '<img src="' + card_image + '" alt="Alt">',
  url: 'https://uiowa.edu',
}

export const LinkedCardWithoutTitle = Template.bind({});
LinkedCardWithoutTitle.args = {
  ...Default.args,
  media: '<img src="' + card_image + '" alt="Alt">',
  url: 'https://uiowa.edu',
  title: '',
  link_text: 'Learn more',
}

// export const UiowaIconCard = Template.bind({});
// UiowaIconCard.args = {
//   ...Default.args,
//   centered: true,
//   media_padded: true,
//   title: '24hour-phone',
//   media: '<img class="media--small" icon="24hour-phone" variant="two-color" src="https://sandbox.imu.uiowa.edu/brand-icons/24hour-phone-two-color.png" alt="24hour-phone" loading="lazy" class="two-color">',
//   url: 'https://uiowa.edu',
//   default: '',
// }
//
// export const FAIconCard = Template.bind({});
// FAIconCard.args = {
//   ...Default.args,
//   centered: true,
//   media_padded: true,
//   title: 'very cool card',
//   media: '<svg class="media--small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M430.3 503.8L382.3 447.8C378.4 443.4 376.3 437.7 376.3 431.7V376.3L351.1 344.7V407.8C351.1 425.4 337.7 439.8 319.1 439.8C302.3 439.8 287.1 425.4 287.1 407.8V344.7L263.7 376.3V431.7C263.7 437.7 261.6 443.4 257.7 447.8L209.7 503.8C201.1 513.8 186.1 514.8 176.3 505.9C166.5 497 165.6 481.6 174.3 471.6L216.3 422.5V367.8C216.3 362.3 218.1 357 221.5 352.7L287.1 266.3V266L154.6 387.8C97.58 447.6 .0003 405.2 0 320.6C0 272.7 34.02 232.3 79.35 226.4L232.3 202.5L191.5 161.6C183.7 153.8 182.1 141.5 187.6 131.8L211.5 90.06L173.3 39.18C165.3 28.54 167.2 13.26 177.5 5.046C187.9-3.17 202.7-1.207 210.7 9.429L258.7 73.34C264.6 81.21 265.3 91.99 260.4 100.6L237.8 140L287.1 190.3V152.1C287.1 137.2 298.2 124.7 311.1 121.1V63.93C311.1 59.51 315.6 55.93 319.1 55.93C324.4 55.93 327.1 59.51 327.1 63.93V121.1C341.8 124.7 351.1 137.2 351.1 152.1V190.3L402.2 140L379.6 100.6C374.7 91.99 375.4 81.21 381.3 73.34L429.3 9.429C437.3-1.207 452.1-3.169 462.5 5.047C472.8 13.26 474.7 28.55 466.7 39.18L428.5 90.06L452.4 131.8C457.9 141.5 456.3 153.8 448.5 161.6L407.7 202.5L560.6 226.4C605.1 232.3 640 272.7 640 320.6C640 405.2 542.4 447.6 485.4 387.8L351.1 266V266.3L418.5 352.7C421.9 357 423.7 362.3 423.7 367.8V422.5L465.7 471.6C474.4 481.6 473.5 497 463.7 505.9C453.9 514.8 438.9 513.8 430.3 503.8L430.3 503.8z"/></svg>',
//   url: 'https://uiowa.edu',
// }

export const BorderlessCard = Template.bind({});
BorderlessCard.args = {
  ...Default.args,
  media: '<img src="' + card_image + '" alt="Alt">',
  url: 'https://uiowa.edu',
  title: 'Your story starts here',
  link_text: 'Learn more',
  borderless: true,
}

export const PersonCard = Template.bind({});
PersonCard.args = {
  ...Default.args,
  media: '<img src="' + person_image + '" alt="Herky">',
  media_align: "media-right",
  media_size: "small",
  media_shape: "circle",
  media_border: true,
  url: "https://uiowa.edu",
  title: "Herky Hawk",
  details: "University of Iowa Mascot",
  default: "Short biography goes here.",
}
