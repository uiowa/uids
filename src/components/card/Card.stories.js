import UidsCard from './Card.vue'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'
import card_image from '../../assets/images/demo/122.jpg'
import person_image from '../../assets/images/demo/herky2.jpeg'
import Background from '../shared/background'
import Borderless from '../shared/borderless'
import Media from '../shared/media'
import preview from '../../../.storybook/preview'

export default {
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  title: 'Components/Card',
  component: UidsCard,
  tags: ['autodocs'],
  argTypes: {
    // Props
    headline_style: {
      name: 'Title style',
      options: ['serif', ''],
      control: {
        type: 'select',
        labels: {
          'serif': 'Zilla Slab (default)',
          '': 'Roboto',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    url: {
      name: 'URL',
      table: {
        category: 'Content',
      },
    },
    link_text: {
      name: 'Link text',
      table: {
        category: 'Content',
      },
    },
    link_indicator: {
      name: 'Display button when there is no link text',
      if: {
        arg: 'link_text',
        truthy: false,
      },
      table: {
        category: 'Display options',
      },
    },
    button_align_bottom: {
      name: 'Align button to bottom',
      table: {
        category: 'Display options',
      },
    },
    ...Background.argTypes,
    // Modifiers
    ...Borderless.argTypes,
    centered: {
      name: 'Centered',
      table: {
        category: 'Display options',
      },
    },
    // Media properties
    ...Media.argTypes,
    orientation: {
      name: 'Orientation',
      options: ['', 'left', 'right'],
      control: {
        type: 'select',
        labels: {
          '': 'stacked',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    media_padded: {
      name: 'Padded',
      table: {
        category: 'Media',
      },
    },
    // Slots
    media: {
      name: 'Media',
      control: 'text',
      table: {
        category: 'Media',
      },
    },
    title: {
      name: 'Title',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      table: {
        category: 'Content',
      },
    },
    meta: {
      name: 'Meta',
      control: { type: 'text' },
      table: {
        category: 'Content',
      },
    },
    default: {
      name: 'Content',
      control: { type: 'text' },
      table: {
        category: 'Content',
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

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <div class="grid--threecol--33-34-33">
        <div class="list-container">
          <uids-card
            :url="args.url"
            :link_text="args.link_text"
            :link_indicator="args.link_indicator"
            :button_align_bottom="args.button_align_bottom"
            :headline_style="args.headline_style"
            :borderless="args.borderless"
            :background="args.background"
            :orientation="args.orientation"
            :media_size="args.media_size"
            :media_shape="args.media_shape"
            :media_border="args.media_border"
            :media_padded="args.media_padded"
            :centered="args.centered"
          >
            <template #media v-if="args.media"><span v-html="args.media" ></span></template>
            <template #title v-if="args.title"><div v-html="args.title" ></div></template>
            <template #subtitle v-if="args.subtitle"><div v-html="args.subtitle" ></div></template>
            <template #meta v-if="args.meta"><div v-html="args.meta" ></div></template>
            <template #default><div v-html="args.default"></div></template>
          </uids-card>
        </div>
      </div>
    </div>
  `,
})

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  media: '<img src="' + card_image + '" alt="Alt">',
  title: 'Arts and Culture',
  subtitle: '',
  meta: '',
  default:
    'For decades, Iowa City has been a gathering place for artists, creating a cultural hub that’s more accessible than any major city. ',
  url: 'https://uiowa.edu',
  link_text: 'Explore the arts',
  link_indicator: true,
  button_align_bottom: false,
  headline_style: 'serif',
  borderless: false,
  background: '',
  centered: false,
  orientation: '',
  media_border: false,
  media_size: 'large',
  media_shape: 'widescreen',
  media_padded: false,
  section_background: '',
}

export const LinkedWithNoButtonText = Template.bind({});
LinkedWithNoButtonText.args = {
  ...Default.args,
  link_text: '',
}

export const LinkedWithNoTitle = Template.bind({});
LinkedWithNoTitle.args = {
  ...Default.args,
  title: '',
}

export const LinkedImage = Template.bind({});
LinkedImage.args = {
  ...Default.args,
  title: '',
  link_text: '',
}

export const ImageUsingUiowaIcon = Template.bind({});
ImageUsingUiowaIcon.args = {
  ...Default.args,
  centered: true,
  media_padded: true,
  media_size: 'small',
  media_shape: 'circle',
  media_border: true,
  title: '24hour-phone',
  media:
    '<img icon="24hour-phone" variant="two-color" src="https://icons.brand.uiowa.edu/brand-icons/megaphone-bullhorn-two-color.png" alt="24hour-phone" loading="lazy" class="two-color">',
  url: 'https://uiowa.edu',
  default: '',
}

// export const ImageUsingFontAwesomeIcon = Template.bind({});
// ImageUsingFontAwesomeIcon.args = {
//   ...Default.args,
//   centered: true,
//   media_size: 'small',
//   media_padded: true,
//   title: 'very cool card',
//   media:
//     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M430.3 503.8L382.3 447.8C378.4 443.4 376.3 437.7 376.3 431.7V376.3L351.1 344.7V407.8C351.1 425.4 337.7 439.8 319.1 439.8C302.3 439.8 287.1 425.4 287.1 407.8V344.7L263.7 376.3V431.7C263.7 437.7 261.6 443.4 257.7 447.8L209.7 503.8C201.1 513.8 186.1 514.8 176.3 505.9C166.5 497 165.6 481.6 174.3 471.6L216.3 422.5V367.8C216.3 362.3 218.1 357 221.5 352.7L287.1 266.3V266L154.6 387.8C97.58 447.6 .0003 405.2 0 320.6C0 272.7 34.02 232.3 79.35 226.4L232.3 202.5L191.5 161.6C183.7 153.8 182.1 141.5 187.6 131.8L211.5 90.06L173.3 39.18C165.3 28.54 167.2 13.26 177.5 5.046C187.9-3.17 202.7-1.207 210.7 9.429L258.7 73.34C264.6 81.21 265.3 91.99 260.4 100.6L237.8 140L287.1 190.3V152.1C287.1 137.2 298.2 124.7 311.1 121.1V63.93C311.1 59.51 315.6 55.93 319.1 55.93C324.4 55.93 327.1 59.51 327.1 63.93V121.1C341.8 124.7 351.1 137.2 351.1 152.1V190.3L402.2 140L379.6 100.6C374.7 91.99 375.4 81.21 381.3 73.34L429.3 9.429C437.3-1.207 452.1-3.169 462.5 5.047C472.8 13.26 474.7 28.55 466.7 39.18L428.5 90.06L452.4 131.8C457.9 141.5 456.3 153.8 448.5 161.6L407.7 202.5L560.6 226.4C605.1 232.3 640 272.7 640 320.6C640 405.2 542.4 447.6 485.4 387.8L351.1 266V266.3L418.5 352.7C421.9 357 423.7 362.3 423.7 367.8V422.5L465.7 471.6C474.4 481.6 473.5 497 463.7 505.9C453.9 514.8 438.9 513.8 430.3 503.8L430.3 503.8z"/></svg>',
//   url: 'https://uiowa.edu',
// }

export const WithNoBorder = Template.bind({});
WithNoBorder.args = {
  ...Default.args,
  borderless: true,
}

export const PersonProfile = Template.bind({});
PersonProfile.args = {
  ...Default.args,
  media: '<img src="' + person_image + '" alt="Herky">',
  orientation: 'right',
  media_size: 'small',
  media_shape: 'circle',
  media_border: true,
  title: 'Herky Hawk',
  subtitle: 'University of Iowa Mascot',
  default:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  borderless: true,
}
PersonProfile.parameters = {
  viewport: {
    viewports: preview.parameters.viewport.viewports,
    defaultViewport: 'tablet',
  },
}

export const WithVideoMedia = Template.bind({})
WithVideoMedia.args = {
  ...Default.args,
  media:
    '<iframe src="https://www.youtube.com/embed/iYv2KBtE7e4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
}

export const WithNoLink = Template.bind({})
WithNoLink.args = {
  ...Default.args,
  url: '',
}

export const ButtonAlignedToBottom = Template.bind({})
ButtonAlignedToBottom.args = {
  ...Default.args,
  button_align_bottom: true,
}

const GridTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsGrid, UidsGridItem, UidsCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-card
            :url="args.url"
            :link_text="args.link_text"
            :link_indicator="args.link_indicator"
            :button_align_bottom="args.button_align_bottom"
            :headline_style="args.headline_style"
            :borderless="args.borderless"
            :background="args.background"
            :orientation="args.orientation"
            :media_size="args.media_size"
            :media_shape="args.media_shape"
            :media_border="args.media_border"
            :media_padded="args.media_padded"
            :centered="args.centered"
          >
            <template #media v-if="args.media"><span v-html="args.media" ></span></template>
            <template #title v-if="args.title"><div v-html="args.title" ></div></template>
            <template #subtitle v-if="args.subtitle"><div v-html="args.subtitle" ></div></template>
            <template #meta v-if="args.meta"><div v-html="args.meta" ></div></template>
            <template #default><div v-html="args.default"></div></template>
          </uids-card>
        </uids-grid-item>
      </uids-grid>
    </div>
  `,
})

export const Grid = GridTemplate.bind({})
Grid.args = {
  ...Default.args,
  grid_type: 'threecol--33-34-33',
  record_count: 3,
}

export const MediaDate = GridTemplate.bind({})
MediaDate.args = {
  ...Default.args,
  orientation: 'left',
  media_size: 'default',
  media_shape: 'no-crop',
  media:
    '<div class="media--date">\n' +
    '  <span class="media--date__month">June</span>\n' +
    '  <span class="media--date__day">9</span>\n' +
    '</div>',
  grid_type: 'onecol',
  record_count: 1,
}
