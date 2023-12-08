import UidsCallout from '../callout/Callout.vue'
import Background from '../shared/background'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'
import UidsFigure from './Figure.vue'
import Media from '../media/Media.vue'

import { Callout } from '../callout/Callout.stories'
import {computed} from "vue";

export default {
  title: 'Components/Inline',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsCallout,
  argTypes: {
    alignment: {
      name: 'Alignment',
      options: [/*'', */'left', 'right', 'center'],
      control: {
        type: 'select',
        // labels: {
        //   '': 'full-width',
        // },
      },
      table: {
        category: 'Inline items',
      },
    },
    default: {
      name: 'Callout content',
      control: { type: 'text' },
      table: {
        category: 'Inline items',
      },
    },
    ...Background.argTypes,
    filler_content: {
      name: 'Filler content',
      control: { type: 'text' },
      table: {
        category: 'Surrounding content',
      },
    },
    grid_type: {
      name: 'Grid type',
      options: [
        'onecol',
        'onecol__narrow',
        'twocol--50-50',
        'twocol--67-33',
        'threecol--33-34-33'
      ],
      control: {
        type: 'select',
        labels: {
          'onecol': 'One column',
          'onecol__narrow': 'One column (narrow)',
          'twocol--50-50': 'Two columns (50%, 50%)',
          'twocol--67-33': 'Two columns (67%, 33%)',
          'threecol--33-34-33': 'Three columns (33%, 34%, 33%)',
        },
      },
      table: {
        category: 'Surrounding content',
      },
    },
    inline_component: {
      name: 'Inline component',
      options: [
        'callout',
        'image',
        'figure',
        'video',
        'vertical_video',
      ],
      control: {
        type: 'select',
        labels: {
          callout: 'Callout',
          image: 'Image',
          figure: 'Figure',
          video: 'Video',
          vertical_video: 'Vertical video',
        }
      },
      table: {
        category: 'Inline items',
      },
    },
    item_sizes: {
      name: 'Inline item sizes',
      options: [
        'full',
        'small',
        'medium',
        'large',
      ],
      control: {
        type: 'check',
        labels: {
          full: 'Full',
          small: 'Small',
          medium: 'Medium',
          large: 'Large',
        }
      },
      table: {
        category: 'Inline items',
      },
    },
    aspect_ratio: {
      name: 'Aspect ratio',
      options: [
        'default',
        'ar_16_9',
        'ar_21_9',
      ],
      control: {
        type: 'select',
        labels: {
          default: 'Default',
          ar_16_9: '16 / 9',
          ar_21_9: '21 / 9',
        }
      },
      table: {
        category: 'Inline items',
      },
    },
    records: {
      name: 'Records',
      options: [1, 2, 3, 4],
      control: 'select',
      table: {
        category: 'Surrounding content',
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsGrid, UidsGridItem, UidsCallout, UidsFigure, Media},
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-grid :type="args.grid_type">
      <uids-grid-item v-for="item in args.records" :key="item">
        <template v-for="size in args.item_sizes" :key="size">
          <template v-if="args.filler_content"><div v-html="args.filler_content"></div></template>
          <uids-callout
            v-if="args.inline_component === 'callout'"
            :background="args.background"
            :inline_alignment="args.alignment"
            :inline_size="size"
          >
            <h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center">
              <span class="headline__heading"> Callout ({{ size }}) </span>
            </h4>
            <template v-if="args.default"><div v-html="args.default"></div></template>
          </uids-callout>
          <uids-figure
            v-else-if="args.inline_component === 'figure'"
            :inline_alignment="args.alignment"
            :inline_size="size"
          />
          <media
            v-if="args.inline_component === 'image'"
            :type="'image'"
            :aspect_ratio="args.aspect_ratio ? args.aspect_ratio : ''"
            :inline_alignment="args.alignment"
            :inline_size="size"
          />
          <media
            v-if="args.inline_component === 'video'"
            :type="'video'"
            :aspect_ratio="args.aspect_ratio ? args.aspect_ratio : 'media--16-9'"
            :inline_alignment="args.alignment"
            :inline_size="size"
          />
          <media
            v-if="args.inline_component === 'vertical_video'"
            :type="'vertical_video'"
            :aspect_ratio="args.aspect_ratio ? args.aspect_ratio : ''"
            :inline_alignment="args.alignment"
            :inline_size="size"
          />
          <template v-if="args.filler_content"><div v-html="args.filler_content"></div></template>
        </template>
      </uids-grid-item>
    </uids-grid>
  `,
})

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  default: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',
  filler_content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
  background: 'gray',
  alignment: 'right',
  inline_component: 'callout',
  aspect_ratio: 'default',
  grid_type: 'onecol',
  records: 1,
  item_sizes: [
    'full',
    'small',
    'medium',
    'large'
  ]
};

export const Narrow = Template.bind({})
Narrow.args = {
  ...Default.args,
  grid_type: 'onecol__narrow',
  records: 1,
}

export const TwoColumnEqual = Template.bind({})
TwoColumnEqual.args = {
  ...Default.args,
  grid_type: 'twocol--50-50',
  records: 2,
}

export const TwoColumnSidebar = Template.bind({})
TwoColumnSidebar.args = {
  ...Default.args,
  grid_type: 'twocol--67-33',
  records: 2,
}

export const ThreeColumn = Template.bind({})
ThreeColumn.args = {
  ...Default.args,
  grid_type: 'threecol--33-34-33',
  records: 3,
}
