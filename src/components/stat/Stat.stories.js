import UidsStat from './Stat.vue';
import Background from "../shared/background";

export default {
  title: 'Components/Stat',
  component: UidsStat,
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      options: ['default', 'horizontal'],
      description: 'Display style of the stat',
    },
    stat_title: {
      control: 'text',
      description: 'The main statistic number/text',
    },
    stat_summary: {
      control: 'text',
      description: 'Description of the statistic',
    },
    stat_content: {
      control: 'text',
      description: 'Additional content below the summary',
    },
    stat_prefix: {
      control: 'text',
      description: 'Text/symbol to display before the title',
    },
    stat_suffix: {
      control: 'text',
      description: 'Text/symbol to display after the title',
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
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  display: 'horizontal',
  stat_title: '15:1',
  stat_summary: 'student-to-faculty<br /> ratio',
  stat_content: 'Among the top 2% of universities worldwide.',
};
