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
      control: { type: 'boolean' },
      table: { category: 'Modifiers' },
    },
    large: {
      name: 'Large',
      control: { type: 'boolean' },
      table: { category: 'Modifiers' },
    },
    inline: {
      name: 'Inline',
      control: { type: 'boolean' },
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
    min: {
      table: {
        disable: true,
      },
    },
    max: {
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
            :inline="args.inline"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form-required' : false" v-html="args.label"></label>
              <input :type="args.type" :name="args.id" :id="args.id" :class="{ error: args.error }" :disabled="args.disabled" :min="args.min" step="1" :max="args.max">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `,
  }),
};

export const Number = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'number',
    id: 'hours',
    label: 'Credit hours completed',
    description: 'Enter the number of credit hours you have completed.',
    min: 0,
    max: 10000,
  },
}

export const Range = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'range',
    id: 'volume',
    label: 'Volume',
    min: 0,
    max: 100,
  },
}
