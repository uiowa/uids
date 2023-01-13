import UidsCallout from './Callout.vue'
import Background from '../shared/background'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'

export default {
  title: 'Components/Callout',
  component: UidsCallout,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    alignment: {
      name: 'Alignment',
      options: ['', 'left', 'right', 'center'],
      control: {
        type: 'select',
        labels: {
          '': 'full-width',
        },
      },
    },
    details: {
      control: { type: 'text' },
    },
    ...Background.argTypes,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsCallout },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-callout
      :background="args.background"
      :details="args.details"
      :size="args.size"
      :alignment="args.alignment"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    </uids-callout>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  details: '<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Resources </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',
  size: 'medium',
  background: 'gray',
  alignment: 'right',
};

const GridTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsGrid, UidsGridItem, UidsCallout },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-grid :type="args.type">
      <uids-grid-item v-for="item in args.records" :key="item">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <uids-callout
          :background="args.background"
          :details="args.details"
          :size="args.size"
          :alignment="args.alignment"
        >
          <template #details v-if="args.details"><div v-html="args.details" ></div></template>
        </uids-callout>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </uids-grid-item>
    </uids-grid>
  `,
})

export const Grid3Columns = GridTemplate.bind({})
Grid3Columns.args = {
  ...Default.args,
  type: 'threecol--33-34-33',
  records: 3,
}

export const Grid2Columns = GridTemplate.bind({})
Grid2Columns.args = {
  ...Default.args,
  type: 'twocol--50-50',
  records: 2,
}

export const Grid1Columns = GridTemplate.bind({})
Grid1Columns.args = {
  ...Default.args,
  type: 'onecol',
  records: 1,
}

export const Grid1NarrowColumn = GridTemplate.bind({})
Grid1NarrowColumn.args = {
  ...Default.args,
  type: 'onecol--narrow',
  records: 1,
}
