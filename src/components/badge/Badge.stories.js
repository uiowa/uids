import UidsBadge from './Badge.vue';

export default {
  title: 'Components/Badge',
  component: UidsBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      name: 'Type',
      options: ['primary', 'secondary', 'cool-gray', 'blue', 'green', 'orange'],
      description: 'The color type of the badge',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    text: {
      control: 'text',
      name: 'Text',
      description: 'The text to display in the badge',
    },
  },
};

const Template = (args) => ({
  components: { UidsBadge },
  setup() {
    return { args };
  },
  template: '<uids-badge v-bind="args" />',
});

// Individual types
export const Default = Template.bind({});
Default.args = {
  type: 'primary',
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  text: 'Secondary',
};

export const CoolGray = Template.bind({});
CoolGray.args = {
  type: 'cool-gray',
  text: 'Cool Gray',
};

export const Blue = Template.bind({});
Blue.args = {
  type: 'blue',
  text: 'Blue',
};

export const Green = Template.bind({});
Green.args = {
  type: 'green',
  text: 'Green',
};

export const Orange = Template.bind({});
Orange.args = {
  type: 'orange',
  text: 'Orange',
};

// Pins that the badge does NOT take its size from its parent. font-size is an absolute
// 0.75rem, so both contexts below must report the same 12px type / 9px padding / 12px
// radius. Before the 2026-08-20 de-flex change the --large row measured double the --body
// row (24px/18px/24px), which is exactly the behaviour the design system owner ruled out.
export const ContextSizes = {
  render: (args) => ({
    components: { UidsBadge },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div class="badge-context badge-context--body" style="font-size: 1rem; margin-bottom: 1rem">
          <uids-badge v-bind="args" text="Body context" />
        </div>
        <div class="badge-context badge-context--large" style="font-size: 2rem">
          <uids-badge v-bind="args" text="Large context" />
        </div>
      </div>
    `,
  }),
  args: {
    type: 'primary',
  },
};

// The de-flex ruling was specifically about HEADINGS, so pin that case directly rather
// than trusting a font-size:2rem div to stand in for one. These are real h1/h2 elements
// getting the real uids-core type ramp (preview.js imports uids-core.scss globally), and
// that ramp is a viewport-dependent clamp() — so under the OLD percentage sizing this
// fixture would have reported three different badge sizes at 375/980/1350. Reporting the
// same 12px at all three IS the proof that the badge no longer tracks its parent.
export const InHeading = {
  render: (args) => ({
    components: { UidsBadge },
    setup() {
      return { args };
    },
    template: `
      <div>
        <h1 class="badge-context badge-context--h1">
          Program title <uids-badge v-bind="args" text="New" />
        </h1>
        <h2 class="badge-context badge-context--h2">
          Section title <uids-badge v-bind="args" text="New" />
        </h2>
      </div>
    `,
  }),
  args: {
    type: 'primary',
  },
};
