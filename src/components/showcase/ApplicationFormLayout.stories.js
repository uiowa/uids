import '../../scss/components/form.scss';
import '../../scss/layout/_grid.scss';
import '../../scss/layout/_flexbox.scss';
import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';

import UidsButton from '../button/Button.vue';
import BrandBar from '../brand-bar/BrandBar.vue';

import BrandBarStories from '../brand-bar/BrandBar.stories.js';

export default {
  title: 'Showcase/Forms',
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
        <div class="menu-user">
          <ul class="menu">
            <li><a href="/">Sign out</a></li>
          </ul>
        </div>
        Profiles
      </brand-bar>
      <div class="menu">
        <ul class="flex">
          <li>
            <uids-button
              :url=""
              :color='tertiary'
              :size='small'
              :borderless='true'
              :full='false'
              :transparent='true'
              :light_font='true'
            ><i style='color: var(--brand-secondary)' class="fas fa-house"></i>  Home</uids-button>
          </li>
          <li>
            <uids-button
              :url=""
              :color='tertiary'
              :size='small'
              :borderless='true'
              :full='false'
              :transparent='true'
              :light_font='true'
            ><i style="color: var(--brand-secondary)" class="fas fa-people-line"></i>  Directories</uids-button>
          </li>
          <li>
            <uids-button
              :url=""
              :color='tertiary'
              :size='small'
              :borderless='true'
              :full='false'
              :transparent='true'
              :light_font='true'
            ><i style="color: var(--brand-secondary)" class="fas fa-file"></i>  Reports</uids-button>
          </li>
          <li>
            <uids-button
              :url=""
              :color='tertiary'
              :size='small'
              :borderless='true'
              :full='false'
              :transparent='true'
              :light_font='true'
            ><i style="color: var(--brand-secondary)" class="fas fa-user-gear"></i>  Roles</uids-button>
          </li>
          <li>
            <uids-button
              :url=""
              :color='tertiary'
              :size='small'
              :borderless='true'
              :full='false'
              :transparent='true'
              :light_font='true'
            ><i style='color: var(--brand-secondary)' class='fas fa-mobile-screen'></i>  Contact</uids-button>
          </li>
        </ul>
      </div>
      <div class="content flex flex--wrap flex--gap__sm">
        <div class="menu menu-sidebar flex--1">
          Sidebar menu here.
        </div>
        <div class="main-panel flex--5">
          <div class="breadcrumb">
            Directory
          </div>
          <h1 class="title">Francois Abboud</h1>
          <h2 class="section">Introduction</h2>
          <form class="uids-form element--margin__top--extra">
            <div class="flex flex--wrap flex--gap__sm">
              <div class="form-item flex--3">
                <label for="first">First</label>
                <input type="text" id="first" placeholder="First">
              </div>
              <div class="form-item flex--1">
                <label for="middle">Middle</label>
                <input type="text" id="middle" placeholder="Middle">
              </div>
              <div class="form-item flex--3">
                <label for="last">Last</label>
                <input type="text" id="last" placeholder="Last">
              </div>
              <div class="form-item flex--1">
                <label for="suffix">Middle</label>
                <input type="text" id="suffix" placeholder="Jr, Sr, III">
              </div>
            </div>
            <div class="flex flex--wrap flex--gap__sm">
              <div class="form-item flex--1">
                <label for="middle">Credentials</label>
                <input type="text" id="middle" placeholder="BS, MS, PhD">
                <div class="form-help">No periods in degrees – PhD, not Ph.D.</div>
              </div>
              <div class="form-item flex--1">
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="first-last@uiowa.edu">
                <div class="form-help">UI email address</div>
              </div>
            </div>
            <div class="form-item">
              <label for="edit-textarea">Textarea</label>
              <textarea id="edit-textarea" name="textarea" rows="5" cols="60"
                        aria-describedby="edit-textarea--description"></textarea>
              <div id="edit-textarea--description" class="description">Textarea description goes here.</div>
            </div>
          </form>
        </div>
      </div>
    `,
  }),
}

export const ApplicationForm = {
  ...Template,
}
