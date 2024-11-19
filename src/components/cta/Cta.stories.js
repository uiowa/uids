import UidsCta from './Cta.vue';
import Background from "../shared/background";


// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/CTA',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsCta,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // Props
    headline_style: {
      name: 'Title style',
      options: ['uppercase', 'serif',  ''],
      control: {
        type: 'select',
        labels: {
          'uppercase': 'Antonio (default)',
          'serif': 'Zilla Slab',
          '': 'Roboto',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    orientation: {
      name: 'Orientation',
      options: ['', 'left', 'inline'],
      control: {
        type: 'select',
        labels: {
          '': 'Centered (default)',
          'left': 'Left',
          'inline': 'Inline',
        },
      },
      table: {
        category: 'Display options',
      },
    },
    url: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    details: {
      control: { type: 'text' },
    },
    button_label: {
      control: { type: 'text' },
    },
    button_icon: {
      control: { type: 'text' },
    },
    button_align_right: {
      name: 'Align button to right',
      table: {
        category: 'Display options',
      },
    },
    section_background: {
      name: 'Section background',
      options: [
        '',
        'bg--black',
        'bg--black--pattern--brain',
        'bg--black--pattern--community',
        'bg--black--pattern--particle',
        'bg--gold',
        'bg--gold--pattern--brain',
        'bg--gold--pattern--community',
        'bg--gold--pattern--particle',
        'bg--gray',
        'bg--gray--pattern--brain',
        'bg--gray--pattern--community',
        'bg--gray--pattern--particle',
        'bg--white',
        'bg--white--pattern--brain',
        'bg--white--pattern--community',
        'bg--white--pattern--particle',
      ],
      control: {
        type: 'select',
        labels: {
          '': '- None -',
          'bg--black': 'Black',
          'bg--black--pattern--brain': 'Black - Brain pattern',
          'bg--black--pattern--community': 'Black - Community pattern',
          'bg--black--pattern--particle': 'Black - Particle pattern',
          'bg--gold': 'Gold',
          'bg--gold--pattern--brain': 'Gold - Brain pattern',
          'bg--gold--pattern--community': 'Gold - Community pattern',
          'bg--gold--pattern--particle': 'Gold - Particle pattern',
          'bg--gray': 'Gray',
          'bg--gray--pattern--brain': 'Gray - Brain pattern',
          'bg--gray--pattern--community': 'Gray - Community pattern',
          'bg--gray--pattern--particle': 'Gray - Particle pattern',
          'bg--white': 'White',
          'bg--white--pattern--brain': 'White - Brain pattern',
          'bg--white--pattern--community': 'White - Community pattern',
          'bg--white--pattern--particle': 'White - Particle pattern',
        },
      },
      table: {
        category: 'Container',
      },
    },
    ...Background.argTypes,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsCta },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
    </div>
  `,
});

export const Centered = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Centered.args = {
  url: 'https://uiowa.edu/',
  title: 'Be a Hawkeye',
  details: '<p>Iowa is where great stories begin. It\'s time to start yours. Find out how.</p>',
  button_label: 'Request Information',
  button_icon: '<i class="fas fa-arrow-right"></i>',
  button_align_right: false,
  headline_style: 'uppercase',
  background: 'gray',
  orientation: '',
};

export const Inline= Template.bind({});
Inline.args = {
  ...Centered.args,
  orientation: 'inline',
}

export const Left = Template.bind({});
Left.args = {
  ...Centered.args,
  orientation: 'left',
}
