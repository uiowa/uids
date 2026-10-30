import UidsIowaBar from './BrandBar.vue'
import BrandBarDocs from './BrandBarDocs.mdx';

export default {
  title: 'Components/Branding/Brand Bar',
  component: UidsIowaBar,
  tags: ['autodocs'],
  argTypes: {
    site_name: {
      control: { type: 'text' },
      name: 'Site name'
    },
    site_url: {
      control: { type: 'text' },
      name: 'Site URL'
    },
    default: {
      control: { type: 'text' },
      name: 'Content'
    },
    narrow: {
      control: { type: 'boolean' },
      name: 'Narrow'
    },
    healthcare: {
      control: { type: 'boolean' },
      name: 'Healthcare'
    },
  },
  parameters: {
    docs: {
      source: {
        code: null,
      },
      page: BrandBarDocs,
    },
  },
};

const Template = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
    >
      <component v-if="args.default" :is="{ template: args.default }" />
    </uids-iowa-bar>
  `,
})

export const Default = Template.bind({})
Default.args = {
  narrow: false,
  site_name: '',
  site_url: '',
  default: '',
  healthcare: false,
}

export const WithSiteTitle = Template.bind({})
WithSiteTitle.args = {
  ...Default.args,
  site_name: 'Brand',
}

export const Narrow = Template.bind({})
Narrow.args = {
  ...WithSiteTitle.args,
  narrow: true,
}

// The second row is story-only markup with inline styles, recreating the removed
// `.iowa-bar__below` row at desktop widths. It is not part of UIDS.
const ContentTemplate = (args) => ({
  components: { UidsIowaBar },
  setup() {
    return { args }
  },
  template: `
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
    >
      <component v-if="args.default" :is="{ template: args.default }" />
    </uids-iowa-bar>
    <div style="border-bottom: var(--uiowa-stroke-width-default) solid #e6e5e5; background: var(--uiowa-color-background-white);">
      <div style="display: flex; flex-wrap: wrap; min-height: 90px; max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto;">
        <div class="site-name" style="margin: 0; padding: 25px 20px 25px 0; line-height: 1;">Icon Browser</div>
      </div>
    </div>
  `,
})

export const WithParentSiteTitle = ContentTemplate.bind({})
WithParentSiteTitle.args = {
  ...Default.args,
  narrow: true,
  site_name: 'Brand',
  site_url: '#',
  default: ``,
}

// Mimics top links and the closed search button as
// default slot content.
export const Tippie = Template.bind({})
Tippie.args = {
  ...Default.args,
  site_name: 'Tippie College of Business',
  site_url: '#',
  default: `<nav aria-label="Top links" style="display: flex; flex: 0 1 25%; align-self: center; align-items: center; justify-content: flex-end; position: relative; left: 10px; z-index: 2; margin: 4px 0 0 auto;">
  <ul style="display: flex; margin: 0; padding: 0; list-style: none;">
    <li style="margin: 0;"><a href="#" style="display: block; padding: 0.325rem 1.05rem; color: var(--uiowa-color-brand-black); font-size: 1.1rem; font-weight: 300; line-height: 1.3; text-decoration: none;">Alumni</a></li>
    <li style="margin: 0;"><a href="#" style="display: block; padding: 0.325rem 1.05rem; color: var(--uiowa-color-brand-black); font-size: 1.1rem; font-weight: 300; line-height: 1.3; text-decoration: none;">People Directory</a></li>
  </ul>
</nav>
<div style="display: flex; position: relative; flex: 0 0 158px; height: 90px;">
  <button type="button" style="position: absolute; top: 0; right: 0; z-index: 2; display: flex; align-items: center; justify-content: center; height: 85px; padding: 14px 25px 7px 18px; border: 0; background: transparent; color: var(--uiowa-color-brand-black); font-family: sans-serif; font-size: 16px; font-weight: 700; line-height: 1.15; text-transform: uppercase; cursor: pointer;">
    <span aria-hidden="true" style="display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 35px; height: 35px; margin-right: 5px; padding: 5.2px;">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M15.5 15.5L22 22"/></svg>
    </span>
    Search
  </button>
</div>`,
}
