import UidsStat from './Stat.vue';
import Background from "../shared/background";

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
