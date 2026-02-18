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
  argTypes: {
    collapsible: {
      name: 'Collapsible',
    },
    inline: {
      name: 'Inline',
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
          :inline="args.inline"
        ></example-filters-form>
      </div>
    `,
  }),
}

export const Filters = {
  ...Template,
  args: {
    collapsible: false,
    inline: true,
  }
}
