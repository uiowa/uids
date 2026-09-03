import UidsStat from './Stat.vue';
import Background from "../shared/background";
import UidsGrid from '../grid/Grid.vue';
import UidsGridItem from '../grid/GridItem.vue';

export default {
  title: 'Components/Stat',
  component: UidsStat,
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      name: 'Display',
      options: ['default', 'horizontal'],
    },
    stat_title: {
      control: 'text',
      name: 'Title',
    },
    stat_summary: {
      control: 'text',
      name: 'Summary',
    },
    stat_content: {
      control: 'text',
      name: 'Content',
    },
    stat_prefix: {
      control: 'text',
      name: 'Prefix',
    },
    stat_suffix: {
      control: 'text',
      name: 'Suffix',
    },
    stat_hover: {
      name: 'Hover',
    },
    ...Background.argTypes,
  },
};

const Template = (args) => ({
  components: { UidsStat },
  setup() {
    return { args };
  },
  template: '<uids-stat v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  display: 'default',
  stat_title: '15:1',
  stat_summary: 'student-to-faculty ratio',
  stat_content: 'Among the top 2% of universities worldwide.',
  stat_prefix: '',
  stat_suffix: '+',
  stat_hover: true,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  display: 'horizontal',
  stat_title: '15:1',
  stat_summary: 'student-to-faculty<br /> ratio',
  stat_content: 'Among the top 2% of universities worldwide.',
  stat_hover: true,
};

const GridTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsGrid, UidsGridItem, UidsStat },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-stat
            :display="args.display || 'default'"
            :stat_title="args.stat_title"
            :stat_summary="args.stat_summary"
            :stat_content="args.stat_content"
            :stat_prefix="args.stat_prefix"
            :stat_suffix="args.stat_suffix"
            :stat_hover="args.stat_hover"
          />
        </uids-grid-item>
      </uids-grid>
    </div>
  `,
})

export const Grid = GridTemplate.bind({})
Grid.args = {
  display: 'default',
  grid_type: 'threecol--33-34-33',
  record_count: 6,
  stat_title: '15:1',
  stat_summary: 'student-to-faculty ratio',
  stat_content: 'Among the top 2% of universities worldwide.',
  stat_prefix: '',
  stat_suffix: '+',
  stat_hover: true,
}

export const StaticExpanded = Template.bind({});
StaticExpanded.args = {
  ...Default.args,
  stat_hover: false,
};

export const StaticHorizontal = Template.bind({});
StaticHorizontal.args = {
  ...Horizontal.args,
  stat_hover: false,
};

// Pins the ancestor-context color and divider changes for both layouts. The
// prefix is included here so the shared prefix/suffix size rule is captured.
export const OnBackgrounds = {
  render: (args) => ({
    components: { UidsStat },
    setup() {
      return { args };
    },
    template: `
      <div>
        <uids-stat class="stat-context--gold-default" v-bind="args" background="gold" display="default" />
        <uids-stat class="stat-context--black-default" v-bind="args" background="black" display="default" />
        <uids-stat class="stat-context--gold-horizontal" v-bind="args" background="gold" display="horizontal" />
        <uids-stat class="stat-context--black-horizontal" v-bind="args" background="black" display="horizontal" />
      </div>
    `,
  }),
  args: {
    ...Default.args,
    stat_prefix: '$',
    stat_hover: false,
  },
};
