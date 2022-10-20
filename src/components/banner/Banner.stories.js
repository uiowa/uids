import UidsBanner from './Banner.vue'
import media_image from '../../assets/images/viewbook/sections/122.jpg'

export default {
  title: 'Components/Banner',
  component: UidsBanner,
  argTypes: {
    media: {
      control: 'text',
    },
  },
}

const Template = (args) => ({
  components: { UidsBanner },
  setup() {
    return { args }
  },
  template: `
    <uids-banner
      :title="args.title"
      :image="args.image"
      :url="args.url"
    >
      <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #default><div v-html="args.default"></div></template>
    </uids-banner>
  `
})

export const Default = Template.bind({})

Default.args = {
  media: '<img src="' + media_image + '" alt="Alt">',
  title: 'Write Your Story',
  url: 'https://uiowa.edu',
}
