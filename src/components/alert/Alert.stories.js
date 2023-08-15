import UidsAlert from './Alert.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Alert',
  component: UidsAlert,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['hawk', 'success', 'warning', 'info', 'danger', 'dismissible',],
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
    <uids-alert :type="args.type">
      <template #title v-if="args.title"><div v-html="args.title" ></div></template>
      <template #subtitle v-if="args.subtitle"><div v-html="args.subtitle" ></div></template>
      <template #meta v-if="args.meta"><div v-html="args.meta" ></div></template>
      <template #default><div v-html="args.default"></div></template>
    </uids-alert>`,
})

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  // label: 'Hello world',
  type: '',
  title: '',
  subtitle: '',
  meta:'',
  default: '',
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
//   type: 'dismissible',
// };
