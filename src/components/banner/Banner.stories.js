import UidsBanner from './Banner.vue'
import Background from "../shared/background";
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'
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
    // Utility arg for dynamically setting the background.
    background_media: {
      table: { disable: true },
    },
    // Slots
    pre_title: {
      name: 'Pre-title',
    },
    title: {
      name: 'Title',
    },
    content: {
      name: 'Content',
    },
    // Props
    background: {
      name: 'Background',
      options: [
        '',
        ...Object.keys(Background.allBackgroundOptions),
      ],
      control: {
        type: 'select',
        labels: {
          '': 'Image or video',
          ...Background.allBackgroundOptions,
        },
      }
    },
    buttons: {
      name: 'Buttons',
    },
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
      name: 'Headline style',
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
      options: ['top', 'center', 'bottom'],
      control: {
        type: 'select',
        labels: {
          'top': 'Top',
          'center': 'Center',
          'bottom': 'Bottom',
        },
      },
      table: { category: 'Display options' },
    },
    gradient: {
      name: 'Gradient',
      default: 'dark',
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
    extra_padding: {
      name: 'Extra padding',
      control: { type: 'boolean' }
    },
    mobile_content_below_image: {
      name: 'Content below media (mobile-only)',
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
      <div class="column-container">
    <uids-banner
      :background="args.background"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :headline_highlight="args.headline_highlight"
      :gradient="args.gradient"
      :height="args.height"
      :extra_padding="args.extra_padding"
      :horizontal_alignment="args.horizontal_alignment"
      :vertical_alignment="args.vertical_alignment"
      :buttons="args.buttons"
      :button_light_font="args.button_light_font"
      :button_color="args.button_color"
      :mobile_content_below_image="args.mobile_content_below_image"
    >
      <template #media v-if="args.background === ''">
        ${args.background_media}
      </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      ${args.content}
    </uids-banner>
      </div>`,
  }),
}

export const BackgroundImage = {
  ...Template,
  args: {
    background: '',
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
    extra_padding: false,
    mobile_content_below_image: true,
    button_light_font: false,
    button_color: 'primary',
    buttons: [
      { ...ButtonStories.Primary.args, label: 'Read More ' + ButtonStories.Primary.args.icon, color: 'primary' },
    ],
  }
}
BackgroundImage.storyName = 'Background image';

export const BackgroundVideo = {
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: `<example-video-file />`,
  },
}
BackgroundVideo.storyName = 'Background video';

export const BackgroundPattern = {
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
    gradient: 'light',
  },
}
BackgroundPattern.storyName = 'Background pattern';

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
MultipleButtons.storyName = 'Multiple buttons';

const GridTemplate = (args) => ({
  components: { UidsGrid, UidsGridItem, UidsBanner },
  setup() {
    return { args };
  },
  template: `
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :gradient="args.gradient"
            :height="args.height"
            :extra_padding="args.extra_padding"
            :horizontal_alignment="args.horizontal_alignment"
            :vertical_alignment="args.vertical_alignment"
            :buttons="args.buttons"
            :button_light_font="args.button_light_font"
            :button_color="args.button_color"
            :mobile_content_below_image="args.mobile_content_below_image"
          >
            <template #media v-if="args.background === ''">
              <example-image />
            </template>
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <template #title><span class="headline__heading">Living on Campus</span></template>
            <p>A member of the Association of American Universities since 1909. Discover the rich academic tradition and vibrant campus life.</p>
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `,
});

export const Grid = GridTemplate.bind({});
Grid.args = {
  ...BackgroundImage.args,
  grid_type: 'threecol--33-34-33',
  record_count: 3,
  height: 'medium',
  headline_size: 'medium',
};
