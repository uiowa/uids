import '../../scss/components/form.scss';
import UidsFormContainer from './FormContainer.vue'

export default {
  title: 'Elements/Form',
  parameters: {
    docs: {
      source: {
        code: null
      },
    }
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
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    type: {
      name: 'Input Type',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'date'],
    },
    value: {
    }
  }
};

const InputTemplate = {
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
              <label for="full_name" :class="args.required ? 'form-required' : false">Full name</label>
              <input :type="args.type" name="full_name" id="full_name" :class="args.error ? 'error' : false" :disabled="args.disabled" :value="args.value">
            </div>
          </uids-form-container>
        </form>
      </div>
    `
  }),
}

export const Input = {
  ...InputTemplate,
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    type: 'text',
    value: 'Person Student'
  }
}

const SelectTemplate = {
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
              <label for="country" :class="args.required ? 'form-required' : false">Country</label>
              <select name="country" id="country" :class="args.error ? 'error' : false" :disabled="args.disabled">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>
          </uids-form-container>
        </form>
      </div>
    `
  }),
}

export const Select = {
  ...SelectTemplate,
  args: {
    large: false,
    compact: false,
    required: false,
    error: false,
    disabled: false,
    // type: 'text',
    value: 'Person Student'
  }
}
