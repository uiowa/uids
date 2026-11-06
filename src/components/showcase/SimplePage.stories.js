import '../../scss/components/_headline.scss';
import '../../scss/layout/_flexbox.scss';

import BrandBar from '../brand-bar/BrandBar.vue';
import UidsMenu from '../menu/Menu.vue';

export default {
  title: 'Showcase/Simple page',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: null
      },
    },
  },
  argTypes: {
    dark_mode: {
      name: 'Dark mode',
      control: 'boolean',
    },
  },
};

// Dark mode: the logo flips to a gold tab with black IOWA, and the bar, menu
// and page are all black, split by neutral-700 dividers (decoration, 1.73:1).
// Text is white (text.inverse), links #588DD6 (link.inverse); menu icons are
// neutral-300 (6.55:1).
const darkCss = `
  .on-dark {
    --uiowa-color-text: var(--uiowa-color-text-inverse);
    min-height: 100vh;
    background: var(--uiowa-color-neutral-900);
  }
  .on-dark .iowa-bar { background: var(--uiowa-color-brand-black); }
  .on-dark .iowa-bar .site-name {
    background: transparent;
    color: var(--uiowa-color-text-inverse);
  }
  .on-dark .logo--tab { background: var(--uiowa-color-brand-gold); }
  .on-dark .logo-icon { fill: var(--uiowa-color-brand-black); }
  .on-dark > .layout-container { color: var(--uiowa-color-text); }
  .on-dark .menu { --menu-link-color: var(--uiowa-color-text); }
  .on-dark .menu .fas { color: var(--uiowa-color-neutral-300); }
  .on-dark .menu--container {
    background: var(--uiowa-color-neutral-900);
    border-top: 1px solid var(--uiowa-color-neutral-700);
    border-bottom-color: var(--uiowa-color-neutral-700);
  }
  .on-dark .menu--container li { border-bottom-color: var(--uiowa-color-neutral-700); }
  .on-dark .content a { color: var(--uiowa-color-link-inverse); }
`;

const horizontalMenuItems = [
  { label: 'Home', url: '#', icon: 'fas fa-house' },
  { label: 'Directories', url: '#', icon: 'fas fa-users', children: [] },
  { label: 'Reports', url: '#', icon: 'fas fa-file-lines' },
  { label: 'Roles', url: '#', icon: 'fas fa-user-gear' },
  { label: 'Contact', url: '#', icon: 'fas fa-mobile-screen' },
];

const Template = {
  render: (args) => ({
    components: { BrandBar, UidsMenu },
    setup() {
      return { args, darkCss, horizontalMenuItems };
    },
    template: `
      <main :class="{ 'on-dark': args.dark_mode }">
        <component is="style">{{ darkCss }}</component>
        <brand-bar
          :narrow='true'
          :healthcare='false'
        >
          <h1 class="site-name flex--10">Profiles</h1>
        </brand-bar>
        <nav class="menu--container">
          <div class="layout-container">
            <uids-menu
              variant="horizontal"
              :items="horizontalMenuItems"
              label="Main"
              top
            />
          </div>
        </nav>
        <div class="layout-container element--margin__top--extra">

          <div class="breadcrumb">
            Directory
          </div>

          <h1 class="headline headline--serif">University Directory</h1>

          <div class="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in <a href="#">reprehenderit in voluptate</a> velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia <strong>deserunt mollit</strong> anim id est <em>laborum</em>.
            </p>

            <h2>Lorem ipsum dolor sit</h2>
            <p>
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
              commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
              Integer in mauris eu nibh euismod gravida.
            </p>
            <ul>
              <li>Duis ac tellus et risus vulputate vehicula</li>
              <li>Donec lobortis risus a elit, <a href="#">etiam tempor</a></li>
              <li>Ut ullamcorper, ligula eu tempor congue</li>
            </ul>

            <h3>Consectetur adipiscing</h3>
            <p>
              Eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
              Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget,
              consequat quis, neque.
            </p>
            <ol>
              <li>Aliquam faucibus, elit ut dictum aliquet</li>
              <li>Felis nisl adipiscing sapien, sed malesuada</li>
              <li>Diam lacus eget erat</li>
            </ol>
            <blockquote>
              <p>Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat.</p>
            </blockquote>
            <p>
              Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis
              quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
            </p>
          </div>
        </div>
      </main>
    `,
  }),
};

export const SimplePage = {
  ...Template,
  args: {
    dark_mode: false,
  },
};

export const DarkMode = {
  ...Template,
  args: {
    dark_mode: true,
  },
};
