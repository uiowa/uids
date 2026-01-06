import '../../scss/components/form.scss';
import UidsFormContainer from './FormContainer.vue'

export default {
  title: 'Elements/Form',
  parameters: {
    docs: {
      source: {
        code: null
      },
    },
  },
  tags: ['!autodocs'],
  argTypes: {
    compact: {
      name: 'Compact',
      table: { category: 'Modifiers' },
    },
    large: {
      name: 'Large',
      table: { category: 'Modifiers' },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    error: {
      name: 'Error',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    // These arguments control the template and are hidden from the Storybook UI.
    type: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UidsFormContainer },
    template: `
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
          >
            <div class="form-item">
              <input :type="args.type" :name="args.id" :id="args.id" :class="{ error: args.error }" :disabled="args.disabled" :value="args.label">
            </div>
          </uids-form-container>
        </form>
      </div>
    `,
  }),
};

export const Button = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'button',
    id: 'continue',
    label: 'Continue',
  },
}

export const Reset = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'reset',
    id: 'reset',
    label: 'Reset',
  },
}

export const Submit = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'submit',
    id: 'submit',
    label: 'Submit',
  },
}
