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
    inline: {
      name: 'Inline',
      table: { category: 'Modifiers' },
    },
    flex: {
      name: 'Flex',
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
        <example-search></example-search>
      </div>
    `
  }),
}
