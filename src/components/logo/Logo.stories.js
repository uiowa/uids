import UidsLogo from './Logo.vue'
import logoTokens from '../../tokens/components/logo.json';
import { componentTokensStory } from '../tokens/componentTokens.js';

export default {
  title: 'Components/Branding/Logo',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsLogo,
  tags: ['autodocs'],
  argTypes: {
    healthcare: {
      control: { type: 'boolean' },
      name: 'Healthcare'
    },
    url: {
      control: { type: 'text' },
      name: 'URL'
    },
  },
};

// First, so it sits right under Docs.
export const Tokens = {
  ...componentTokensStory(logoTokens),
  tags: ['!autodocs', 'noAddonsDrawer'],
};

const Template = (args) => ({
  components: { UidsLogo },
  setup() {
    return { args }
  },
  template: `
    <uids-logo :healthcare="args.healthcare" :url="args.url"></uids-logo>
  `,
})

export const Iowa = Template.bind({})

Iowa.args = {
  healthcare: false,
  url: 'https://uiowa.edu',
}

export const IowaHealthCare = Template.bind({})

IowaHealthCare.args = {
  healthcare: true,
  url: 'https://uihealthcare.org',
}

export const Unlinked = Template.bind({})

Unlinked.args = {
  ...Iowa.args,
  url: '',
}
