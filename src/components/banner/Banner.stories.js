import UidsBanner from './Banner.vue'
import Background from "../shared/background";
import banner_image from '../../assets/images/demo/122.jpg';
import banner_video from '../../assets/video/homepage-loop.mp4';

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
    title: {
      control: { type: 'text' },
    },
    pre_title: {
      control: { type: 'text' },
    },
    content: {
      control: { type: 'text' },
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
    headline_size: {
      name: 'Headline Size',
      options: ['large', 'medium', 'small'],
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
   enable_autoplay: {
      name: 'Enable autoplay for video',
      control: { type: 'boolean' },
    },
    media_type: {
      name: 'Media type',
      options: ['', 'video'],
      control: {
        type: 'select',
        labels: {
          '': 'Image (default)',
          'video': 'Video',
        },
      },
      table: {
        category: 'Media',
      },
    },
    media_poster: {
      name: 'Media poster',
      control: { type: 'text' },
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
  components: { UidsBanner },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-banner
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
  `,

});

export const Centered = Template.bind({});
Centered.args = {
  title: 'Welcome to your SiteNow site!',
  pre_title: 'SiteNow is awesome!',
  content: '<p>Iowa is where great stories begin. It\'s time to start yours. Find out how.</p>',
  url: 'https://uiowa.edu/',
  url_2: 'https://uiowa.edu/about',
  url_3: 'https://uiowa.edu/explore',
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
  media_type: '',
  media_poster: banner_image,
  mobile_content_below_image: false,
  enable_autoplay: false,
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

export const Video = Template.bind({});
Video.args = {
  ...Centered.args,
  enable_autoplay: true,
  media_type: 'video',
  media: banner_video,
};
