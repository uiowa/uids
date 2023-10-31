import UidsBanner from './Banner.vue'
import media_image from '../../assets/images/viewbook/sections/122.jpg'
import UidsStub from "../../components/stub/Stub.vue";

export default {
  title: 'Not implemented/Banner',
  component: UidsBanner,
  argTypes: {
    media: {
      control: 'text',
    },
  },
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  parameters: { options: { showPanel: false } },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsStub },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-stub
      path="components/detail/banner--default.html"
      title="Banner"
    >
    </uids-stub>
  `,
});

export const Default = Template.bind({})
//
// Default.args = {
//   media: '<img src="' + media_image + '" alt="Alt">',
//   title: 'Write Your Story',
//   url: 'https://uiowa.edu',
// }
