import UidsHeadline from './Headline.vue';

export default {
  title: 'Components/Headline',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsHeadline,
  argTypes: {
    default: {
      control: { type: 'text' },
    },
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    highlight: {
      control: { type: 'boolean' },
    },
    text_style: {
      type: Boolean,
      default: false,
      options: ['', 'uppercase', 'serif'],
      control: {
        type: 'select',
        labels: {
          '': 'default',
          'uppercase': 'Uppercase',
          'serif': 'Serif',
        },
      },
    },
    underline: {
      control: { type: 'boolean' },
    },
    url: {
      control: { type: 'text' },
    },
    aria_describedby: {
      control: { type: 'text' },
    },
    class: {
      control: { type: 'text' },
    },
  },
};

const Template = {
  render: (args) => ({
    components: { UidsHeadline },
    setup() {
      return { args };
    },
    template: `
    <uids-headline v-bind="args">
      <span class="headline__text">${args.text}</span>
    </uids-headline>
  `,
  }),
}

export const Default = {
  ...Template,
  args: {
    text: 'Your story starts here',
    level: 'h2',
    text_style: 'serif',
    size: 'large',
    highlight: false,
    underline: false,
    url: '',
  }
}

export const Uppercase = {
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase',
  }
}

export const Serif = {
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
  }
}

export const Underline = {
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    underline: true,
  }
}

export const Highlight = {
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    highlight: true,
    text: `<span>Start your story here</span>`,
  }
}

// @todo Figure out how to get this example working.
export const HighlightedSingleWord = {
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase',
    text: `Start your <span class="highlight">story</span> here`,
  }
}
