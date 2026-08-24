import '../../scss/components/_background.scss'

export default {
  title: 'Components/Background',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
    options: {
      showPanel: false,
    },
  },
  argTypes: {
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
  },
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  template: `
    <div :class="args.section_background" style="min-height: 300px;">
    </div>
  `,
});

export const Background = {
  render: Template,
  args: {
    section_background: 'bg--black',
  },
}

// All 16 background treatments in one DOM so the computed-style regression
// harness (regression/config.json "background") can capture every swatch's
// background-color, foreground cascade, link color and border-color in a
// single story. Each swatch carries prose + a link because the system's
// public behavior includes the type-mapped foreground cascade and the
// white/gray link-color restoration.
const allBackgroundClasses = [
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
];

export const AllBackgrounds = {
  render: () => ({
    template: `
      <div>
        ${allBackgroundClasses.map((cls) => `
        <div class="${cls}" style="min-height: 120px; padding: 1rem;">
          <p>${cls} sample text with a <a href="#">sample link</a>.</p>
        </div>`).join('')}
      </div>
    `,
  }),
}
