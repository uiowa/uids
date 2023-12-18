import UidsAlert from './Alert.vue';

export default {
  title: 'Components/Alert',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      name: 'Type',
      options: ['info', 'success', 'warning', 'danger'],
      control: {
        type: 'select',
        labels: {
          'info': 'Info',
          'success': 'Success',
          'warning': 'Warning',
          'danger': 'Danger',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    centered: {
      name: 'Centered',
      table: {
        category: 'Display options',
      },
    },
    iconVisible: {
      name: 'Display Icon',
      table: {
        category: 'Display options',
      },
    },
    dismissible: {
      name: 'Dismissible',
      table: {
        category: 'Properties',
      },
    },
    verticallyCentered: {
      name: 'Center Alert Vertically',
      table: {
        category: 'Display options',
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

const Template = (args) => ({
  components: { UidsAlert },
  setup() {
    return { args };
  },
  template: `
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>`,
})

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  centered: false,
  iconVisible: true,
  dismissible: false,
  verticallyCentered: false,
  default: `
    <h2 class="headline headline--serif">
      Alert title
    </h2>
    <p>Lorem ipsum sit dolor amet.</p>
`,
};

export const Success = Template.bind({});
Success.args = {
  ...Info.args,
  type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Info.args,
  type: 'warning',
};

export const Danger = Template.bind({});
Danger.args = {
  ...Info.args,
  type: 'danger',
};
