import Background from '../shared/background';

import UidsBanner from './Banner.vue'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'
import ExampleImage from '../media/ExampleImage.vue';
import ExampleVideoFile from '../media/ExampleVideoFile.vue';

import BackgroundStories from '../background/Background.stories.js';
import * as ButtonStories from '../button/Button.stories';
import * as HeadlineStories from '../headline/Headline.stories';

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
    media_overlay_gradient_midpoint: {
      name: 'Overlay gradient midpoint',
      options: [ '', '20%', '30%', '40%', '50%', '60%', '70%'],
      control: {
        type: 'select',
        labels: {
          '': 'Default: 40% (Bottom to top/Top to bottom) or 70% (Left to right)',
          '20%': '20%',
          '30%': '30%',
          '40%': '40%',
          '50%': '50%',
          '60%': '60%',
          '70%': '70%',
        }
      },
      table: {
        category: 'Media',
      },
    },
    media_overlay_type: {
       name: 'Overlay type',
      options: ['', 'btt', 'ttb', 'ltr'],
      control: {
        type: 'select',
        labels: {
          '': 'No gradient',
          'btt': 'Bottom to top',
          'ttb': 'Top to bottom',
          'ltr': 'Left to right',
        }
      },
      table: {
        category: 'Media',
      },
    },
    media_overlay_light: {
      name: 'Overlay light',
      table: {
        category: 'Media',
      },
    },
    height: {
      name: 'Height',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      table: { category: 'Display options' },
    },
    narrow: {
      name: 'Narrow',
      table: {
        category: 'Display options',
      },
    },
    mobile_content_below_image: {
      name: 'Mobile - Display media above content',
      control: { type: 'boolean' },
      table: { category: 'Media' },
    },
    section_background: {
      ...BackgroundStories.argTypes.section_background,
    },
    grid_type: {
      name: 'Grid',
      options: [
        'onecol',
        'onecol__narrow',
        'twocol--50-50',
        'threecol--33-34-33',
        'fourcol--25',
      ],
      control: {
        type: 'select',
        labels: {
          'onecol': 'One column',
          'onecol__narrow': 'One column (narrow)',
          'twocol--50-50': 'Two columns',
          'threecol--33-34-33': 'Three columns',
          'fourcol--25': 'Four columns',
        }
      },
      table: {
        category: 'Container',
      },
    },
    record_count: {
      name: '# of records',
      table: {
        category: 'Container',
      },
    }
  },
};

const Template = {
  render: (args) => ({
    components: { UidsBanner, ExampleImage, ExampleVideoFile },
    setup() {
      return { args };
    },
    template: `
      <div class="column-container" :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
        <uids-banner
          :headline="args.headline"
          :pre_title="args.pre_title"
          :background="args.background"
          :media_overlay_type="args.media_overlay_type"
          :media_overlay_light="args.media_overlay_light"
          :media_overlay_gradient_midpoint="args.media_overlay_gradient_midpoint"
          :height="args.height"
          :narrow="args.narrow"
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
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline: HeadlineStories.Default.args,
    horizontal_alignment: 'left',
    vertical_alignment: 'center',
    media_overlay_type: '',
    media_overlay_light: false,
    height: 'large',
    narrow: true,
    mobile_content_below_image: true,
    button_light_font: false,
    button_color: 'primary',
    media_overlay_gradient_midpoint: '',
    buttons: [
      { ...ButtonStories.Primary.args, label: 'Read More ' + ButtonStories.Primary.args.icon, color: 'primary' },
    ],
    section_background: '',
  }
}
BackgroundImage.storyName = 'Background image';

export const BackgroundVideo = {
  name: 'Background video',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: `<example-video-file />`,
  },
}

export const BackgroundPattern = {
  name: 'Background pattern',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
  },
}

export const MultipleButtons = {
  name: 'Multiple buttons',
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

export const KitchenSink = {
  ...Template,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      highlight: true,
    },
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\n' +
      '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\n' +
      '</blockquote><blockquote>\n' +
      'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\n' +
      '</blockquote><h2>Heading 2</h2>\n' +
      '\n' +
      '<h3><a href="/">Heading 3</a></h3>\n' +
      '\n' +
      '<h4>Heading 4</h4>\n' +
      '\n' +
      '<h5>Heading 5</h5>\n' +
      '\n' +
      '<h6>Heading 6</h6>',
  }
}

const GridTemplate = {
  render: (args) => ({
    components: { UidsGrid, UidsGridItem, UidsBanner, ExampleImage, ExampleVideoFile },
    setup() {
      return { args };
    },
    template: `
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :pre_title="args.pre_title"
            :headline="args.headline"
            :background="args.background"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
            :narrow="args.narrow"
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
            ${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `,
  }),
};

export const GridImage = {
  name: 'Background image grid',
  ...GridTemplate,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      size: 'medium',
    },
    grid_type: 'threecol--33-34-33',
    record_count: 3,
    height: 'medium',
  }
}

export const GridVideo = {
  name: 'Background video grid',
  ...GridTemplate,
  args: {
    ...BackgroundImage.args,
    background_media: `<example-video-file />`,
    grid_type: 'threecol--33-34-33',
    record_count: 3,
    height: 'medium',
    headline_size: 'medium',
    horizontal_alignment: 'left',
    vertical_alignment: 'bottom',
    buttons: MultipleButtons.args.buttons,
  }
}
