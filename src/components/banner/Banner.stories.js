import UidsBanner from './Banner.vue'
import Background from "../shared/background";
import banner_image from '../../assets/images/demo/122.jpg';


// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
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
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // Props
    headline_size: {
      name: 'Headline Size',
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    content_position: {
      name: 'Content Position',
      options: ['center-center', 'center-bottom', 'left-center', 'left-bottom'],
      labels: {
        'center-bottom': 'Centered horizontally and bottom-aligned vertically',
        'left-center': 'Left-aligned and centered vertically (default)',
        'left-bottom': 'Left-aligned horizontally and bottom-aligned vertically',
        'center-center': 'Centered horizontally and vertically'
      },
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    gradient: {
      name: 'Gradient',
      options: ['dark', 'light'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    headline_style: {
      name: 'Title style',
      options: ['uppercase', 'uppercase-highlight', 'serif', 'serif-highlight',  ''],
      control: {
        type: 'select',
        labels: {
          'uppercase': 'Antonio (default)',
          'uppercase-highlight': 'Antonio highlighted',
          'serif': 'Zilla Slab',
          'serif-highlight': 'Zilla Slab highlighted',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    height: {
      name: 'Height',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    mobile_content_below_image: {
      name: '[Mobile] Content Below Image/Video',
      control: { type: 'boolean' },
    },
    url: {
      control: { type: 'text' },
    },
    url_2: {
      control: { type: 'text' },
    },
    url_3: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    content: {
      control: { type: 'text' },
    },
    media: {
      name: 'Media',
      control: 'text',
      table: {
        category: 'Media',
      },
    },
    button_label: {
      control: { type: 'text' },
    },
    button_label_2: {
      control: { type: 'text' },
    },
    button_label_3: {
      control: { type: 'text' },
    },
    button_icon: {
      control: { type: 'text' },
    },
    button_color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'transparent'],
    },
    button_light_font: {
      control: { type: 'boolean' },
    },
    ...Background.argTypes,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsBanner },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :title="args.title"
      :headline_size="args.headline_size"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :content="args.content"
      :headline_style="args.headline_style"
      :mobile_content_below_image="args.mobile_content_below_image"

    ><template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
  `,

});

export const Centered = Template.bind({});
Centered.args = {
  url: 'https://uiowa.edu/',
  url_2: 'https://uiowa.edu/about',
  url_3: 'https://uiowa.edu/explore',
  title: 'Welcome to your SiteNow site!',
  content: '<p>Iowa is where great stories begin. It\'s time to start yours. Find out how.</p>',
  button_label: 'Test',
  button_label_2: 'Learn More',
  button_label_3: 'Explore',
  button_icon: '<i class="fas fa-arrow-right"></i>',
  button_color: 'primary',
  button_light_font: false,
  headline_style: 'serif',
  headline_size: 'large',
  background: '',
  content_position: 'center-center',
  gradient:'dark',
  height: 'large',
  media: '<img src="' + banner_image + '" alt="Alt">',
  mobile_content_below_image: false,
};
export const CenterBottom= Template.bind({});
CenterBottom.args = {
  ...Centered.args,
  content_position: 'center-bottom',
}

export const LeftCenter = Template.bind({});
LeftCenter.args = {
  ...Centered.args,
  content_position: 'left-center',
}

export const LeftBottom = Template.bind({});
LeftBottom.args = {
  ...Centered.args,
  content_position: 'left-bottom',
}
