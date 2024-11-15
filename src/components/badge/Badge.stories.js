import UidsBadge from './Badge.vue';

export default {
  title: 'Components/Badge',
  component: UidsBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      name: 'Type',
      options: ['primary', 'secondary', 'cool-gray', 'blue', 'green', 'orange'],
      description: 'The color type of the badge',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    text: {
      control: 'text',
      name: 'Text',
      description: 'The text to display in the badge',
    },
  },
};

const Template = (args) => ({
  components: { UidsBadge },
  setup() {
    return { args };
  },
  template: '<uids-badge v-bind="args" />',
});

// Individual types
export const Default = Template.bind({});
Default.args = {
  type: 'primary',
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  text: 'Secondary',
};

export const CoolGray = Template.bind({});
CoolGray.args = {
  type: 'cool-gray',
  text: 'Cool Gray',
};

export const Blue = Template.bind({});
Blue.args = {
  type: 'blue',
  text: 'Blue',
};

export const Green = Template.bind({});
Green.args = {
  type: 'green',
  text: 'Green',
};

export const Orange = Template.bind({});
Orange.args = {
  type: 'orange',
  text: 'Orange',
};
