import '../../scss/components/form.scss';
import UidsFormCheckboxOrRadioGroup from './FormCheckboxOrRadioGroup.vue';

export default {
  title: 'HTML Elements/Forms/Controls',
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
    inline: {
      name: 'Inline',
      table: { category: 'Modifiers' },
    },
    large: {
      name: 'Large',
      table: { category: 'Modifiers' },
    },
    checked: {
      name: 'Checked',
      control: { type: 'boolean' },
      table: { category: 'States' },
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

const radioOptions = [
  {
    id: 'text-permission-yes',
    name: 'permission',
    value: true,
    label: 'Yes',
  },
  {
    id: 'text-permission-no',
    name: 'permission',
    value: false,
    label: 'No',
  }
];

const Template = {
  render: (args) => ({
    setup() {
      return { args, radioOptions };
    },
    components: { UidsFormCheckboxOrRadioGroup },
    computed: {
      formClasses() {
        let classes = [];
        if (args.large) {
          classes.push('form--large');
        }
        if (args.compact) {
          classes.push('form--compact');
        }
        if (args.flex) {
          classes.push('form--flex');
        }
        return classes;
      },
    },
    template: `
      <div class="layout-container">
        <form class="form" :class="formClasses">
          <uids-form-checkbox-or-radio-group
            label="Radio group"
            type="radio"
            :inline="args.inline"
          >
            <div class="form-item form-item--checkbox form-type-checkbox" v-for="item in radioOptions" :key="item.id">
              <input
                type="radio"
                :id="item.id"
                :name="item.name"
                :value="item.value"
                :disabled="args.disabled"
                :checked="args.checked"
                :class="args.error ? 'error' : false"
                :required="args.required"
              >
              <label :for="item.id">{{ item.label }}</label>
            </div>
          </uids-form-checkbox-or-radio-group>
        </form>
      </div>
    `
  }),
}

export const Radio = {
  ...Template,
  args: {
    checked: false,
    disabled: false,
    error: false,
    required: false,
    compact: false,
    inline: false,
    large: false,
  }
}
