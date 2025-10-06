import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';
import '../../scss/components/form.scss';
import '../../scss/layout/_flexbox.scss';
import '../../scss/layout/_grid.scss';

import UidsButton from '../button/Button.vue';
import BrandBar from '../brand-bar/BrandBar.vue';
import UidsMenu from '../menu/Menu.vue';

export default {
  title: 'Showcase/Forms',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: null
      },
    },
  },
};

const horizontalMenuItems = [
  { label: 'Home', url: '#', icon: 'fas fa-house' },
  { label: 'Directories', url: '#', icon: 'fas fa-users', children: [] },
  { label: 'Reports', url: '#', icon: 'fas fa-file-lines' },
  { label: 'Roles', url: '#', icon: 'fas fa-user-gear' },
  { label: 'Contact', url: '#', icon: 'fas fa-mobile-screen' },
];

const sidebarMenuItems = [
  { label: 'Preview', url: '#' },
  { label: 'Status', url: '#' },
  { label: 'Memberships', url: '#' },
  { label: 'Introduction', url: '#', active: true },
  { label: 'Profile Photo', url: '#' },
  { label: 'Contacts', url: '#' },
  { label: 'Websites', url: '#' },
  { label: 'Positions', url: '#' },
  { label: 'Education', url: '#' },
  { label: 'Graduate Program Affiliations', url: '#' },
  { label: 'Center, Program, and Institute Affiliations', url: '#' },
  { label: 'Research Interests', url: '#' },
  { label: 'Licenses & Certifications', url: '#' },
  { label: 'Publications', url: '#' },
];

const Template = {
  render: (args) => ({
    components: { UidsButton, BrandBar, UidsMenu },
    setup() {
      return { args, horizontalMenuItems, sidebarMenuItems };
    },
    template: `
      <brand-bar
        :narrow='true'
        :healthcare='false'
      >
        <h1 class="site-name flex--10">Profiles</h1>
        <div class="user-menu-toggle bg--gold">
          <uids-button
            :url=""
            :color='link'
            :size='small'
            :borderless='true'
            :full='false'
            :transparent='true'
            :light_font='true'
          ><i style="color: var(--brand-secondary)" class="fas fa-user"></i> HawkID <i style="color: var(--brand-secondary)" class="fas fa-caret-down"></i></uids-button>
          <ul class="menu">
            <li><a href="/">Sign out</a></li>
          </ul>
        </div>
      </brand-bar>
      <nav class="menu--container">
        <div class="layout-container">
          <uids-menu
            variant="horizontal"
            :items="horizontalMenuItems"
          />
        </div>
      </nav>
      <div class="layout-container element--margin__top--extra">
        <div class="content flex flex--wrap flex--gap__md">
          <div class="sidebar flex--2 bg--gray element--padding__all--sm element--margin__bottom--extra">
            <div class="form">
              <div class="form-item">
                <select class="form-select">
                  <option id="medicine">Medicine</option>
                  <option id="uiowa">University of Iowa</option>
                </select>
              </div>
            </div>
            <div>
              <uids-menu
                variant="vertical"
                :items="sidebarMenuItems"
              />
            </div>
          </div>
          <div class="main-panel flex--8">
            <div class="breadcrumb">
              Directory
            </div>
            <h1 class="headline headline--serif">Francois Abboud</h1>
            <p class="element--light-intro">Introduction</p>
            <form class="form element--margin__top--extra">
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
                  <label for="suffix">Suffix</label>
                  <input type="text" id="suffix" placeholder="Jr, Sr, III">
                </div>
              </div>
              <div class="flex flex--wrap flex--gap__sm">
                <div class="form-item flex--1">
                  <label for="credentials">Credentials</label>
                  <input type="text" id="credentials" placeholder="BS, MS, PhD">
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
      </div>
    `,
  }),
}

export const ApplicationFormLayout = {
  ...Template,
}
