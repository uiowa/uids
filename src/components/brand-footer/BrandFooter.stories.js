import UidsIowaFooter from './BrandFooter.vue'
import BrandFooterDocs from './BrandFooterDocs.mdx';
import BrandBarDocs from '../brand-bar/BrandBarDocs.mdx';

const socialLinks = [
  { icon: 'facebook-square', text: 'Facebook' },
  { icon: 'twitter-square', text: 'Twitter' },
  { icon: 'instagram', text: 'Instagram' },
  { icon: 'snapchat', text: 'Snapchat' },
  { icon: 'youtube', text: 'Youtube' },
  { icon: 'linkedin', text: 'LinkedIn' },
  { icon: 'pinterest', text: 'Pinterest' }
];

const contactInfo = `
  <p>
    300 Plaza Centre One<br>
    Iowa City, Iowa 52242<br>
    <a href="tel:319-384-0019">
      <span class="fa-phone fas" role="presentation"></span> 319-384-0019
    </a><br>
    <a href="mailto:osc-brand@uiowa.edu?subject=OSC Contact Email:">
      <span class="fa-envelope fas" role="presentation"></span> osc-brand@uiowa.edu
    </a>
  </p>
`;

const socialNav = `
  <nav role="navigation">
    <ul class="menu">
      ${socialLinks.map(link => `
        <li>
          <a href="https://uiowa.edu/">
            <i class="fab fa-${link.icon}"></i>
            <span class="link-text">${link.text}</span>
          </a>
        </li>
      `).join('')}
    </ul>
  </nav>
`;

// Define default args that will be shared across all stories
const defaultArgs = {
  default: 'Brand Manual',
  healthcare: false,
  parent_site_title: 'Office of Strategic Communication',
  contact_info: contactInfo + socialNav
};

export default {
  title: 'Components/Branding/Brand Footer',
  component: UidsIowaFooter,
  args: defaultArgs, // Set default args at the component level
  argTypes: {
    default: {
      control: { type: 'text' },
      name: 'Site name'
    },
    healthcare: {
      control: { type: 'boolean' },
      name: 'Healthcare'
    },
    parent_site_title: {
      control: { type: 'text' },
      name: 'Parent site name'
    },
    contact_info: {
      control: { type: 'text' },
      name: 'Contact information'
    },
  },
parameters: {
  docs: {
    source: {
      code: null,
    },
    page: BrandFooterDocs,
  },
},
};

const Template = (args) => ({
  components: { UidsIowaFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `,
})

export const Default = Template.bind({});
Default.args = {};

const SiteTitleTemplate = (args) => ({
  components: { UidsIowaFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `
})

export const WithSiteTitle = SiteTitleTemplate.bind({})
WithSiteTitle.args = {
  ...Default.args
};

const ParentSiteTitleTemplate = (args) => ({
  components: { UidsIowaFooter },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `
})

  export const WithParentSiteTitle = ParentSiteTitleTemplate.bind({})
  WithParentSiteTitle.args = {
    ...Default.args
  };
