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
              <label :for="args.id" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
              <textarea :name="args.id" :id="args.id" :class="{ 'form--error': args.error }" :disabled="args.disabled"></textarea>
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `,
  }),
};

export const Textarea = {
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    id: 'experience',
    label: 'Describe your experience:',
    description: 'Provide a detailed description of your relevant experience.',
  },
}
