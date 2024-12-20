import UidsBanner from './Banner.vue'
import Background from "../shared/background";


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
    // Props
    pre_title: {
      name: 'Pre-title',
      control: { type: 'text' },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
    },
    content: {
      name: 'Excerpt',
      control: { type: 'text' },
    },
    url: {
      name: 'First link',
      control: { type: 'text' },
    },
    url_2: {
      name: 'Second link',
      control: { type: 'text' },
    },
    url_3: {
      name: 'Third link',
      control: { type: 'text' },
    },
    button_label: {
      name: 'First link text',
      control: { type: 'text' },
    },
    button_label_2: {
      name: 'Second link text',
      control: { type: 'text' },
    },
    button_label_3: {
      name: 'Third link text',
      control: { type: 'text' },
    },
    button_icon: {
      name: 'Button icon',
      control: { type: 'text' },
    },
    button_color: {
      name: 'Button style',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'transparent'],
      table: { category: 'Display options' },
    },
    button_light_font: {
      name: 'Button light font',
      control: { type: 'boolean' },
      table: { category: 'Display options' },
    },
    headline_size: {
      name: 'Headline size',
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    headline_style: {
      name: 'Headline options',
      options: ['uppercase', 'uppercase-highlight', 'serif', 'serif-highlight',  ''],
      control: {
        type: 'select',
        labels: {
          'uppercase': 'Antonio',
          'uppercase-highlight': 'Antonio highlighted',
          'serif': 'Zilla Slab',
          'serif-highlight': 'Zilla Slab highlighted',
        },
      },
      table: { category: 'Display options' },
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
      name: '[Mobile] Content below image/video',
      control: { type: 'boolean' },
      table: { category: 'Display options' },
    },
    // Media properties.
    enable_autoplay: {
      name: 'Enable autoplay for video',
      control: { type: 'boolean' },
      table: { category: 'Media' },
    },
    media_type: {
      name: 'Media type',
      options: ['image', 'remote_video'],
      control: {
        type: 'select',
        labels: {
          'image': 'Image (default)',
          'remote_video': 'Video',
        },
      },
      table: {
        category: 'Media',
      },
    },
    section_background: {
      name: 'Section background',
      options: [
        '',
        'bg--black',
        'bg--black--pattern--brain',
        'bg--black--pattern--community',
        'bg--black--pattern--particle',
        'bg--gold',
        'bg--gold--pattern--brain',
        'bg--gold--pattern--community',
        'bg--gold--pattern--particle',
        'bg--gray',
        'bg--gray--pattern--brain',
        'bg--gray--pattern--community',
        'bg--gray--pattern--particle',
        'bg--white',
        'bg--white--pattern--brain',
        'bg--white--pattern--community',
        'bg--white--pattern--particle',
      ],
      control: {
        type: 'select',
        labels: {
          '': '- None -',
          'bg--black': 'Black',
          'bg--black--pattern--brain': 'Black - Brain pattern',
          'bg--black--pattern--community': 'Black - Community pattern',
          'bg--black--pattern--particle': 'Black - Particle pattern',
          'bg--gold': 'Gold',
          'bg--gold--pattern--brain': 'Gold - Brain pattern',
          'bg--gold--pattern--community': 'Gold - Community pattern',
          'bg--gold--pattern--particle': 'Gold - Particle pattern',
          'bg--gray': 'Gray',
          'bg--gray--pattern--brain': 'Gray - Brain pattern',
          'bg--gray--pattern--community': 'Gray - Community pattern',
          'bg--gray--pattern--particle': 'Gray - Particle pattern',
          'bg--white': 'White',
          'bg--white--pattern--brain': 'White - Brain pattern',
          'bg--white--pattern--community': 'White - Community pattern',
          'bg--white--pattern--particle': 'White - Particle pattern',
        },
      },
      table: {
        category: 'Container',
      },
    },
    ...Background.argTypes,
  },
};


const Template = (args) => ({
  components: { UidsBanner },
  setup() {
    return { args };
  },
  template: `
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :horizontal_alignment="args.horizontal_alignment"
      :vertical_alignment="args.vertical_alignment"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    > <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  `,

});

export const Centered = Template.bind({});
Centered.args = {
  pre_title: 'University of Iowa',
  title: 'Living on Campus',
  content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
  url: 'https://uiowa.edu/',
  url_2: 'https://uiowa.edu/about',
  url_3: 'https://uiowa.edu/explore',
  button_label: 'Apply',
  button_label_2: 'Learn More',
  button_label_3: 'Explore',
  button_icon: '<i class="fas fa-arrow-right"></i>',
  button_color: 'primary',
  button_light_font: false,
  headline_style: 'serif',
  headline_size: 'large',
  background: '',
  horizontal_alignment: 'center',
  vertical_alignment: 'center',
  gradient:'dark',
  height: 'large',
  media_type: 'image',
  mobile_content_below_image: false,
  enable_autoplay: false,
  section_background: '',
};
Centered.storyName = 'Centered horizontally and vertically w/ image';

export const CenterBottom= Template.bind({});
CenterBottom.args = {
  ...Centered.args,
  horizontal_alignment: 'center',
  vertical_alignment: 'bottom',
}
CenterBottom.storyName = 'Centered horizontally and bottom-aligned vertically w/ image';

export const LeftCenter = Template.bind({});
LeftCenter.args = {
  ...Centered.args,
  horizontal_alignment: 'left',
  vertical_alignment: 'center',
}
LeftCenter.storyName = 'Left-aligned and centered vertically w/ image';

export const LeftBottom = Template.bind({});
LeftBottom.args = {
  ...Centered.args,
  horizontal_alignment: 'left',
  vertical_alignment: 'bottom',
}
LeftBottom.storyName = 'Left-aligned horizontally and bottom-aligned vertically w/ image';
export const Video = Template.bind({});
Video.args = {
  ...Centered.args,
  enable_autoplay: true,
  media_type: 'remote_video',
};
Video.storyName = 'Centered horizontally and vertically w/ video';
