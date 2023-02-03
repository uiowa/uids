import UidsCallout from '../callout/Callout.vue'
import Background from '../shared/background'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'
import UidsFigure from './Figure.vue'
import Media from '../media/Media.vue'

import { Callout } from '../callout/Callout.stories'
import {computed} from "vue";

export default {
  title: 'Elements/Inline',
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
          'onecol': getColumns('onecol'),
          'onecol__narrow': getColumns('onecol__narrow'),
          'twocol--50-50': getColumns('twocol--50-50'),
          'twocol--67-33': getColumns('twocol--67-33'),
          'threecol--33-34-33': getColumns('threecol--33-34-33')
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
        // 'video',
      ],
      control: {
        type: 'select',
        labels: {
          callout: 'Callout',
          image: 'Image',
          figure: 'Figure',
          // video: 'Video',
        }
      },
      table: {
        category: 'Inline items',
      },
    },
    item_sizes: {
      name: 'Inline item sizes',
      options: [
        'small',
        'medium',
        'large',
      ],
      control: {
        type: 'check',
        labels: {
          small: 'Small',
          medium: 'Medium',
          large: 'Large',
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
    getColumns(args.grid_type);
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
  filler_content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
  background: 'gray',
  alignment: 'right',
  inline_component: 'callout',
  grid_type: 'onecol',
  records: 1,
  item_sizes: [
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

// Helper functions.
function getColumns(column_class) {

  // Split the portions.
  let columnPortions = column_class.split(/['--''__']+/);

  // Get just the number string.
  let stringColumnsNumber = columnPortions[0].replace('col', '');

  // Capitalize the first letter.
  let capStringColumnsNumber = stringColumnsNumber[0].toUpperCase() + stringColumnsNumber.substring(1);

  // Determine plurality.
  let plural = stringColumnsNumber === 'one' ? '' : 's';

  // Put it together.
  let stringColumns = capStringColumnsNumber + ' column' + plural;

  // Get the column widths.
  let columnWidthsString = '';

  // If we have widths...
  if (columnPortions[1]) {

    // Get them.
    let columnWidths = columnPortions.slice(1);

    // Construct the widths string, starting with an opening paren.
    columnWidthsString = ' (';

    // For every width...
    columnWidths.forEach(function(width, index) {

      // If it's a number, give it a '%' sign.
      let isNum = Number(width) ? '%' : '';

      // Then concatenate, with commas as appropriate.
      if (index !== 0) {
        columnWidthsString += ', ';
      }
      columnWidthsString += width + isNum;
    });

    // Then cap the string with an end paren.
    columnWidthsString += ')';
  }

  // Put together the columns and the widths.
  return stringColumns+columnWidthsString;
};
