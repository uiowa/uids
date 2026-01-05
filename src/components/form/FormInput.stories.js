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
    description: {
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
              <label :for="args.id" :class="args.required ? 'form-required' : false" v-html="args.label"></label>
              <input :type="args.type" :name="args.id" :id="args.id" :class="{ error: args.error }" :disabled="args.disabled">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `,
  }),
};

export const Text = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'text',
    id: 'fullname',
    label: 'Full name',
    description: 'As it appears on your official documents.',
  },
}

export const Date = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'date',
    id: 'dob',
    label: 'Date of birth',
  },
}

export const Email = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'email',
    id: 'email',
    label: 'Email',
    description: 'Your uiowa.edu email address.',
  },
}

export const Phone = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'tel',
    id: 'phone',
    label: 'Phone number',
    description: 'Include area code.',
  },
}
