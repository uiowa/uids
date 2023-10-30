import UidsBanner from './Banner.vue'
import media_image from '../../assets/images/viewbook/sections/122.jpg'

export default {
  title: 'Not yet implemented/Banner',
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
    hello banner
  `
})

export const Default = Template.bind({})
//
// Default.args = {
//   media: '<img src="' + media_image + '" alt="Alt">',
//   title: 'Write Your Story',
//   url: 'https://uiowa.edu',
// }
