import '../../scss/components/form.scss';

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
    // inline: {
    //   name: 'Inline',
    // },
    // flex: {
    //   name: 'Flex',
    // },
    required: {
      name: 'Required',
    },
    error: {
      name: 'Error',
    },
    disabled: {
      name: 'Disabled',
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
          <div class="form-item">
            <label for="full_name" :class="args.required ? 'form-required' : false">Full name</label>
            <input :type="args.type" name="full_name" id="full_name" :class="args.error ? 'error' : false" :disabled="args.disabled" :value="args.value">
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
    required: false,
    error: false,
    disabled: false,
    type: 'text',
    value: 'Person Student'
  }
}

const SelectTemplate = {
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
          <div class="form-item">
            <label for="country" :class="args.required ? 'form-required' : false">Country</label>
            <select name="country" id="country" :class="args.error ? 'error' : false" :disabled="args.disabled">
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>
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
