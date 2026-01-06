import '../../scss/components/form.scss';
import UidsFormCheckboxOrRadioGroup from './FormCheckboxOrRadioGroup.vue';
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
      control: { type: 'boolean' },
      table: { category: 'Modifiers' },
    },
    inline: {
      name: 'Inline',
      control: { type: 'boolean' },
      table: { category: 'Modifiers' },
    },
    large: {
      name: 'Large',
      control: { type: 'boolean' },
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
    label: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => ({
    setup() {
      return { args, checkboxOptions, radioOptions };
    },
    components: { UidsFormCheckboxOrRadioGroup, UidsFormContainer },
    computed: {
      optionItems() {
        return args.type === 'radio' ? radioOptions : checkboxOptions;
      },
    },
    template: `
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
          >
            <uids-form-checkbox-or-radio-group
              :label="args.label"
              :type="args.type"
              :inline="args.inline"
              :required="args.required"
            >
              <div class="form-item form-item--checkbox form-type-checkbox" v-for="item in optionItems" :key="item.id">
                <input
                  :type="args.type"
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
          </uids-form-container>
        </form>
      </div>
    `
  }),
};

const checkboxOptions = [
  {
    id: 'financial-aid',
    name: 'interests',
    value: 'FINANCIAL_AID',
    label: 'Costs & Financial Aid',
  },
  {
    id: 'marching-band',
    name: 'interests',
    value: 'MARCHING_BAND',
    label: 'Hawkeye Marching Band',
  },
  {
    id: 'rotc-air-force',
    name: 'interests',
    value: 'ROTC_AIR_FORCE',
    label: 'ROTC - Air Force (Aerospace Studies)',
  },
  {
    id: 'rotc-army',
    name: 'interests',
    value: 'ROTC_ARMY',
    label: 'ROTC - Army (Military Science)',
  },
  {
    id: 'study-abroad',
    name: 'interests',
    value: 'STUDY_ABROAD',
    label: 'Study Abroad',
  },
  {
    id: 'band',
    name: 'interests',
    value: 'BAND',
    label: 'University Concert Bands and Jazz Bands',
  },
  {
    id: 'honors',
    name: 'interests',
    value: 'HONORS',
    label: 'University Honors Program',
  },
  {
    id: 'veteran-services',
    name: 'interests',
    value: 'VETERAN_SERVICES',
    label: 'Veteran & Military Connected Student Services',
  },
];

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
  },
];

export const Checkbox = {
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
            <div class="form-item form-item--checkbox form-type-checkbox">
              <input type="checkbox" :class="args.error ? 'error' : false" :disabled="args.disabled" :checked="args.checked" value="subscribe" id="subscribe">
              <label for="subscribe" :class="args.required ? 'form-required' : false">I would like to subscribe the newsletter</label>
            </div>
          </uids-form-container>
        </form>
      </div>
    `
  }),
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

export const Checkboxes = {
  args: {
    ...Checkbox.args,
    label: 'Select your interests',
    type: 'checkbox',
  },
}

export const Radios = {
  args: {
    ...Checkbox.args,
    label: 'Do you give permission to receive text messages?',
    type: 'radio',
  },
}
