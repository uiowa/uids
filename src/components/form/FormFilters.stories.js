import ExampleFiltersForm from "./ExampleFiltersForm.vue";

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
  argTypes: { },
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
        ></example-filters-form>
      </div>
    `,
  }),
}

export const Filters = {
  ...Template,
  args: { }
}
