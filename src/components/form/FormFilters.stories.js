import UidsButton from '../button/Button.vue';
import ExampleFiltersForm from "./ExampleFiltersForm.vue";

import '../../scss/components/form.scss';
import '../../scss/components/form-filters.scss';
import '../../scss/components/_headline.scss';
import '../../scss/layout/_flexbox_showcase.scss';

export default {
  components: { ExampleFiltersForm },
  title: 'Components/Form',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      source: {
        code: null
      },
    },
  },
  argTypes: {
    collapsible: {
      name: 'Collapsible',
    },
  },
};

const Template = {
  render: (args) => ({
    components: { ExampleFiltersForm },
    setup() {
      return { args };
    },
    template: `
      <div class="layout-container">
        <example-filters-form
          :collapsible="args.collapsible"
        ></example-filters-form>
      </div>
    `,
  }),
}

export const Filters = {
  ...Template,
  args: {
    collapsible: false,
  }
}
