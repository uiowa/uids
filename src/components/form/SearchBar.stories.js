import ExampleSearch from './ExampleSearch.vue';
import UidsFormFieldset from './FormFieldset.vue';
import UidsFormItem from './FormItem.vue'
import UidsFormCheckboxOrRadioGroup from './FormCheckboxOrRadioGroup.vue';
import UidsFormContainer from './FormContainer.vue'

export default {
  title: 'Components',
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
  }
};

export const SearchBar = {
  render: (args) => ({
    components: { ExampleSearch },
    setup() {
      return { args };
    },
    template: `
      <div class="layout-container">
        <example-search :class="{
          'form--compact': args.compact,
          'form--large': args.large,
        }"></example-search>
      </div>
    `
  }),
  args: {
    compact: false,
    large: false,
  },
}
