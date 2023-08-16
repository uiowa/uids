import UidsAlert from './Alert.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Alert',
  component: UidsAlert,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    type: {
      name: 'Type',
      control: { type: 'select' },
      options: ['hawk', 'success', 'warning', 'info', 'danger',],
    },
    dismissible: {
      name: 'Dismissible',
      table: {
        category: 'props'
      }
    },
    title: {
      name: 'Title',
      control: 'text',
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
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsAlert },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-alert :type="args.type" :dismissible="args.dismissible">
      <template #title v-if="args.title"><div v-html="args.title" ></div></template>
      <template #default><div v-html="args.default"></div></template>
    </uids-alert>`,
})

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
const dateOptions = { timeZone: 'UTC' };
Default.args = {
  // label: 'Hello world',
  type: '',
  dismissible: false,
  title: 'Default alert',
  default: 'Lorem ipsum sit dolor amet.',
};

// export const HawkAlert = Template.bind({});
// HawkAlert.args = {
//   ...Default.args,
//   type: 'hawk',
// };
//
// export const Success = Template.bind({});
// Success.args = {
//   ...Default.args,
//   type: 'success',
// };
//
// export const Warning = Template.bind({});
// Warning.args = {
//   ...Default.args,
//   type: 'warning',
// };
//
// export const Info = Template.bind({});
// Info.args = {
//   ...Default.args,
//   type: 'info',
// };
//
// export const Danger = Template.bind({});
// Danger.args = {
//   ...Default.args,
//   type: 'danger',
// };
//
// export const Dismissible = Template.bind({});
// Dismissible.args = {
//   ...Default.args,
//   type: 'success',
//   dismissible: true,
// };
