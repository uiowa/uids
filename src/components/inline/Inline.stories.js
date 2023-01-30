import UidsCallout from '../callout/Callout.vue'
import Background from '../shared/background'
import UidsGrid from '../grid/Grid.vue'
import UidsGridItem from '../grid/GridItem.vue'

export default {
  title: 'Elements/Inline',
  component: UidsCallout,
  argTypes: {
    alignment: {
      name: 'Alignment',
      options: [/*'', */'left', 'right', 'center'],
      control: {
        type: 'select',
        // labels: {
        //   '': 'full-width',
        // },
      },
    },
    default: {
      name: 'Content',
      control: { type: 'text' },
    },
    ...Background.argTypes,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsGrid, UidsGridItem, UidsCallout },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-grid :type="args.type">
      <uids-grid-item v-for="item in args.records" :key="item">
        <template v-for="size in ['small', 'medium', 'large']" :key="size">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <uids-callout
            :background="args.background"
            :inline_alignment="args.alignment"
            :inline_size="size"
          >
            <h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center">
              <span class="headline__heading"> Callout ({{ size }}) </span>
            </h4>
            <template v-if="args.default"><div v-html="args.default" ></div></template>
            Small
          </uids-callout>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <figure class="inline--align-right" role="group">
            <div class="inline--size-small">
              <img width="" height="" alt="Ernst, Erika" class=" lazyloaded" data-src="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w" data-srcset="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__384w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=3znFPZ72 384w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w 768w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1024w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=2afxzkLZ 1024w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1312w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=L-k1paKP 1312w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__2592w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=GmyW4wuT 1398w" data-sizes="(min-width: 1024px) calc(25vw - 5em), (min-width: 768px) calc(50vw - 3.75em), 100vw" sizes="(min-width: 1024px) calc(25vw - 5em), (min-width: 768px) calc(50vw - 3.75em), 100vw" srcset="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__384w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=3znFPZ72 384w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w 768w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1024w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=2afxzkLZ 1024w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1312w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=L-k1paKP 1312w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__2592w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=GmyW4wuT 1398w" src="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w">            </div>
            <figcaption>Erika Ernst</figcaption>
          </figure>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        </template>
      </uids-grid-item>
    </uids-grid>
  `,
})

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  default: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',
  background: 'gray',
  alignment: 'right',
  type: 'onecol',
  records: 1,
};

export const Narrow = Template.bind({})
Narrow.args = {
  ...Default.args,
  type: 'onecol__narrow',
  records: 1,
}

export const TwoColumnEqual = Template.bind({})
TwoColumnEqual.args = {
  ...Default.args,
  type: 'twocol--50-50',
  records: 2,
}

export const TwoColumnSidebar = Template.bind({})
TwoColumnSidebar.args = {
  ...Default.args,
  type: 'twocol--67-33',
  records: 2,
}

export const ThreeColumn = Template.bind({})
ThreeColumn.args = {
  ...Default.args,
  type: 'threecol--33-34-33',
  records: 3,
}
