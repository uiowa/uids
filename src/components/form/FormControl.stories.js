import '../../scss/components/form.scss';

export default {
  title: 'Components/Form/Controls',
  parameters: {
    docs: {
      source: {
        code: null
      },
    }
  },
  tags: ['autodocs'],
  argTypes: {
    compact: {
      name: 'Compact',
    },
    large: {
      name: 'Large',
    },
    inline: {
      name: 'Inline',
    },
    flex: {
      name: 'Flex',
    },
    required: {
      name: 'Required',
    },
    error: {
      name: 'Error',
    },
  }
};

const checkboxRadioOptions = [
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

const InputTemplate = {
  render: (args) => ({
    setup() {
      return { args };
    },
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
          <div class="form-item" :class="formItemClasses">
            <label for="full_name" :class="args.required ? 'form-required' : false">Full name</label>
            <input type="text" name="full_name" id="full_name" :class="args.error ? 'error' : false">
          </div>
        </form>
      </div>
    `
  }),
}

export const Input = {
  ...InputTemplate,
  args: {
    large: false,
    compact: false,
    inline: false,
    flex: false,
    required: false,
    error: false,
  }
}
