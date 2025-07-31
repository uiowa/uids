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
    template: `
      <brand-bar
        :narrow='true'
        :healthcare='false'
      >
        Profiles
      </brand-bar>
      <div class='user-menu'>
        <uids-button
          :url=""
          :color='tertiary'
          :size='small'
          :borderless='true'
          :full='false'
          :transparent='true'
          :light_font='true'
        ><i style='color: var(--brand-secondary)' class='fas fa-house'></i>  Home</uids-button>
        <uids-button
          :url=""
          :color='tertiary'
          :size='small'
          :borderless='true'
          :full='false'
          :transparent='true'
          :light_font='true'
        ><i style='color: var(--brand-secondary)' class='fas fa-people-line'></i>  Directories</uids-button>
        <uids-button
          :url=""
          :color='tertiary'
          :size='small'
          :borderless='true'
          :full='false'
          :transparent='true'
          :light_font='true'
        ><i style='color: var(--brand-secondary)' class='fas fa-file'></i>  Reports</uids-button>
        <uids-button
          :url=""
          :color='tertiary'
          :size='small'
          :borderless='true'
          :full='false'
          :transparent='true'
          :light_font='true'
        ><i style='color: var(--brand-secondary)' class='fas fa-user-gear'></i>  Roles</uids-button>
        <uids-button
          :url=""
          :color='tertiary'
          :size='small'
          :borderless='true'
          :full='false'
          :transparent='true'
          :light_font='true'
        ><i style='color: var(--brand-secondary)' class='fas fa-mobile-screen'></i>  Contact</uids-button>
      </div>
    `,
  }),
}

export const InformationRequestForm = {
  ...Template,
}
