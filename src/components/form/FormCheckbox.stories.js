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
      table: { category: 'States' },
    },
    error: {
      name: 'Error',
      table: { category: 'States' },
    },
  }
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

const Template = {
  render: (args) => ({
    setup() {
      return { args, checkboxOptions };
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
        if (args.inline) {
          classes.push('form--inline');
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
          <fieldset>
            <legend>Single checkbox</legend>
            <div class="form-item form-item--checkbox form-type-checkbox">
              <input type="checkbox" :class="args.error ? 'error' : false" :disabled="args.disabled" :checked="args.checked" value="subscribe" id="subscribe">
              <label for="subscribe" :class="args.required ? 'form-required' : false">Subscribe</label>
            </div>
          </fieldset>

          <uids-form-checkbox-or-radio-group
            label="Checkbox group"
            type="checkbox"
            :inline="args.inline"
          >
            <div class="form-item form-item--checkbox form-type-checkbox" v-for="item in checkboxOptions" :key="item.id">
              <input
                type="checkbox"
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

export const Checkbox = {
  ...Template,
  args: {
    checked: false,
    disabled: false,
    error: false,
    compact: false,
    inline: false,
    large: false,
  }
}
