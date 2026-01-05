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
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
  }
};

const Template = {
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
  ...Template,
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
  }
}
