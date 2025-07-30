// import '../../scss/components/form.scss';
import '../../scss/layout/_grid.scss';
// import '../../scss/layout/_flexbox.scss';
import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';

import UidsButton from '../button/Button.vue';
import BrandBar from '../brand-bar/BrandBar.vue';

import BrandBarStories from '../brand-bar/BrandBar.stories.js';

export default {
  title: 'Showcase/Application form',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      source: {
        code: null
      },
    },
  },
};

const Template = {
  render: (args) => ({
    components: { UidsButton, BrandBar },
    setup() {
      return { args };
    },
    template: ``,
  }),
}

export const InformationRequestForm = {
  ...Template,
}
