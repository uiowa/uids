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
};

// The page, its text and its links follow the color roles. These rules are what
// the components don't do yet in dark mode: the brand bar flips to a gold tab with
// black IOWA on a black bar, and the menu goes black between neutral-500 dividers,
// with neutral-300 icons (6.55:1).
const darkRules = `
  .iowa-bar { background: var(--uiowa-color-brand-black); }
  .iowa-bar .site-name {
    background: transparent;
    color: var(--uiowa-color-text-inverse);
  }
  .logo--tab { background: var(--uiowa-color-brand-gold); }
  .logo-icon { fill: var(--uiowa-color-brand-black); }
  .menu { --menu-link-color: var(--uiowa-color-text); }
  .menu .fas { color: var(--uiowa-color-neutral-300); }
  .menu--container {
    background: var(--uiowa-color-background);
    border-top: 1px solid var(--uiowa-color-divider);
    border-bottom-color: var(--uiowa-color-divider);
  }
  .menu--container li { border-bottom-color: var(--uiowa-color-divider); }
`;

const darkCss = `
  :root[data-theme="dark"] { ${darkRules} }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) { ${darkRules} }
  }
`;

const horizontalMenuItems = [
  { label: 'Home', url: '#', icon: 'fas fa-house' },
  { label: 'Directories', url: '#', icon: 'fas fa-users', children: [] },
  { label: 'Reports', url: '#', icon: 'fas fa-file-lines' },
  { label: 'Roles', url: '#', icon: 'fas fa-user-gear' },
  { label: 'Contact', url: '#', icon: 'fas fa-mobile-screen' },
];

const Template = {
  render: () => ({
    components: { BrandBar, UidsMenu },
    setup() {
      return { darkCss, horizontalMenuItems };
    },
    template: `
      <main>
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
};

export const DarkMode = {
  ...Template,
  globals: {
    theme: 'dark',
  },
};
