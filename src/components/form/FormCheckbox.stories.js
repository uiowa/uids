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
    },
    large: {
      name: 'Large',
    },
    required: {
      name: 'Required',
    },
    error: {
      name: 'Error',
    },
    disabled: {
      name: 'Disabled',
    },
    value: {
      control: { type: 'boolean' },
    }
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
      checkboxItems() {
        let checkboxItems = checkboxOptions;
        checkboxItems.forEach(item => {
          item.disabled = args.disabled;
          item.checked = args.value;
          item.error = args.error;
          item.required = args.required;
        })
        return checkboxItems;
      }
    },
    template: `
      <div class="layout-container">
        <form class="form" :class="formClasses">
          <div class="form-item form-item--checkbox form-type-checkbox">
            <input type="checkbox" :class="args.error ? 'error' : false" :disabled="args.disabled" :checked="args.value">
            <label for="full_name" :class="args.required ? 'form-required' : false">Subscribe</label>
          </div>

          <uids-form-checkbox-or-radio-group
            label="Checkboxes"
            type="checkbox"
            :items="checkboxItems"
          />

          <uids-form-checkbox-or-radio-group
            label="Checkboxes inline"
            type="checkbox"
            :items="checkboxItems"
            inline
          />
        </form>
      </div>
    `
  }),
}

export const Checkbox = {
  ...Template,
  args: {
    large: false,
    compact: false,
    required: false,
    error: false,
    disabled: false,
    value: false
  }
}
