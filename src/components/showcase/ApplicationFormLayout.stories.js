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
        <div class="user-menu-toggle">
          <uids-button
            :url=""
            :color='link'
            :size='small'
            :borderless='true'
            :full='false'
            :transparent='true'
            :light_font='true'
          ><i style="color: var(--brand-secondary)" class="fas fa-user"></i>  flast <i style="color: var(--brand-secondary)" class="fas fa-caret-down"></i></uids-button>
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
        <div class="sidebar flex--1">
          <div class="uiowa-form">
            <div class="form-item">
              <select class="form-select">
                <option id="medicine">Medicine</option>
                <option id="uiowa">University of Iowa</option>
              </select>
            </div>
            <div class="form-item">
              <div class="form-type-radio form-item">
                <input id="text-permission-yes" type="radio" name="permissionToText" value="true">
                <label for="text-permission-yes" class="radio">Profile</label>
              </div>
              <div class="form-type-radio form-item">
                <input id="text-permission-no" type="radio" name="permissionToText" value="false">
                <label for="text-permission-no" class="radio">CV</label>
              </div>
            </div>
          </div>
          <div class="menu">
            <ul>
              <li><a href="#">Preview</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Memberships</a></li>
              <li><a href="#">Introduction</a></li>
              <li><a href="#">Profile Photo</a></li>
              <li><a href="#">Contacts</a></li>
              <li><a href="#">Websites</a></li>
              <li><a href="#">Positions</a></li>
              <li><a href="#">Education</a></li>
              <li><a href="#">Graduate Program Affiliations</a></li>
              <li><a href="#">Center, Program, and Institute Affiliations</a></li>
              <li><a href="#">Research Interests</a></li>
              <li><a href="#">Licenses & Certifications</a></li>
              <li><a href="#">Publications</a></li>
            </ul>
          </div>
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
                <div class="description">No periods in degrees – PhD, not Ph.D.</div>
              </div>
              <div class="form-item flex--1">
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="first-last@uiowa.edu">
                <div class="description">UI email address</div>
              </div>
            </div>
            <div class="form-item">
              <label for="title">Directory Title</label>
              <input type="text" id="title" placeholder="Professor of Microbiology">
              <div class="description">Most prominent UI role (e.g. Dean, DEO, Director, Endowed Position)</div>
            </div>
            <div class="form-item">
              <label for="introduction">Introduction</label>
              <textarea id="introduction" name="textarea" rows="5" cols="60"
                        aria-describedby="introduction--description"></textarea>
              <div id="introduction--description" class="description">Textarea description goes here.</div>
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
