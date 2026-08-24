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
    alignment: {
      options: ['', 'center'],
      control: {
        type: 'select',
        labels: {
          '': 'default (inherit)',
          'center': 'Center',
        },
      },
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

// Centered, WITH the underline bar — the combination the option exists for.
// A container's text-align centers the text but leaves the bar hard left, because
// the bar is a display:block ::after with zero side margins; only .headline--center
// gives it margin-inline auto. The wide wrapper is what makes either visible.
export const Centered = {
  render: (args) => ({
    components: { UidsHeadline },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 100%; max-width: 40rem;">
      <uids-headline v-bind="args">
        <span class="headline__text">${args.text}</span>
      </uids-headline>
    </div>
  `,
  }),
  args: {
    ...Default.args,
    text: 'A centered section heading',
    text_style: 'serif',
    underline: true,
    alignment: 'center',
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

// Context flips — raw production markup (no props exist for these contexts).
// Exists so the regression harness pins the on-gold behaviors the headline
// tokens encode: uppercase weight drops to a declared 400 (renders Antonio's
// static 300 face), highlight colors invert, a bg--black nested inside
// bg--gold flips highlight back to the default pair, and the class-only
// .headline--negative (zero producers in either repo — see contract
// knownIssues) renders white text and links.
export const ContextFlips = {
  render: () => ({
    template: `
      <div>
        <div class="bg--gold" style="padding: 2rem;">
          <h2 class="headline headline--uppercase"><span class="headline__text">Uppercase <span>word</span> on gold</span></h2>
          <h2 class="headline headline--highlight"><span class="headline__text">Highlight on gold</span></h2>
          <div class="bg--black" style="padding: 1rem;">
            <h2 class="headline headline--uppercase"><span class="headline__text">Nested <span>flip-back</span></span></h2>
          </div>
        </div>
        <div class="bg--black" style="padding: 2rem;">
          <h2 class="headline headline--negative">Negative headline <a href="#">with link</a></h2>
        </div>
      </div>
    `,
  }),
}
