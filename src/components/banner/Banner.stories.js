import UidsBanner from './Banner.vue'
import Background from "../shared/background";

import ExampleImage from '../media/ExampleImage.vue';
import * as ButtonStories from '../button/Button.stories';
import ExampleVideoFile from "../media/ExampleVideoFile.vue";

export default {
  title: 'Components/Banner',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsBanner,
  tags: ['autodocs'],
  argTypes: {
    background_media: {
      table: { disable: true },
    },
    // Props
    button_color: {
      name: 'Button style',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'transparent'],
      table: { category: 'Buttons' },
    },
    button_light_font: {
      name: 'Button light font',
      control: { type: 'boolean' },
      table: { category: 'Buttons' },
    },
    headline_size: {
      name: 'Headline size',
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      table: { category: 'Headline' },
    },
    headline_style: {
      name: 'Headline options',
      options: ['uppercase', 'serif'],
      control: {
        type: 'select',
        labels: {
          'uppercase': 'Antonio',
          'serif': 'Zilla Slab',
        },
      },
      table: { category: 'Headline' },
    },
    headline_highlight: {
      name: 'Headline highlight',
      table: { category: 'Headline' },
    },
    horizontal_alignment: {
      name: 'Horizontal alignment',
      options: ['left', 'center'],
      control: {
        type: 'select',
        labels: {
          'left': 'Left',
          'center': 'Center',
        },
      },
      table: { category: 'Display options' },
    },
    vertical_alignment: {
      name: 'Vertical alignment',
      options: ['center', 'bottom'],
      control: {
        type: 'select',
        labels: {
          'center': 'Center',
          'bottom': 'Bottom',
        },
      },
      table: { category: 'Display options' },
    },
    gradient: {
      name: 'Gradient',
      options: ['dark', 'light'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    height: {
      name: 'Height',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    mobile_content_below_image: {
      name: 'Content below media (Mobile-only)',
      control: { type: 'boolean' },
      table: { category: 'Display options' },
    },
  },
};

const Template = {
  render: (args) => ({
    components: { UidsBanner, ExampleImage, ExampleVideoFile },
    setup() {
      return { args };
    },
    template: `
    <uids-banner
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :headline_highlight="args.headline_highlight"
      :gradient="args.gradient"
      :height="args.height"
      :horizontal_alignment="args.horizontal_alignment"
      :vertical_alignment="args.vertical_alignment"
      :buttons="args.buttons"
      :button_light_font="args.button_light_font"
      :button_color="args.button_color"
      :mobile_content_below_image="args.mobile_content_below_image"
    >
      <template #media>
        ${args.background_media}
      </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      ${args.content}
    </uids-banner>`,
  }),
}

export const BackgroundImage = {
  ...Template,
  args: {
    background_media: `<example-image />`,
    pre_title: 'University of Iowa',
    title: 'Living on Campus',
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline_style: 'serif',
    headline_highlight: false,
    headline_size: 'large',
    horizontal_alignment: 'center',
    vertical_alignment: 'center',
    gradient:'dark',
    height: 'large',
    mobile_content_below_image: true,
    button_light_font: false,
    button_color: 'primary',
    buttons: [
      { ...ButtonStories.Primary.args, label: 'Read More ' + ButtonStories.Primary.args.icon, color: 'primary' },
    ],
  }
}

export const BackgroundVideo = {
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: `<example-video-file />`,
    props: {
      ...BackgroundImage.args.props,
    },
  },
}

export const MultipleButtons = {
  ...Template,
  args: {
    ...BackgroundImage.args,
    buttons: [
      { ...ButtonStories.Primary.args, label: 'Apply ' + ButtonStories.Primary.args.icon },
      { ...ButtonStories.Primary.args, label: 'Learn More ' + ButtonStories.Primary.args.icon, url: 'https://uiowa.edu/about' },
      { ...ButtonStories.Primary.args, label: 'Explore ' + ButtonStories.Primary.args.icon, url: 'https://uiowa.edu/explore' },
    ],
  }
}
