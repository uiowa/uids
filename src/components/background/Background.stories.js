import UidsStub from "../../components/stub/Stub.vue";
import '../../scss/components/_background.scss'

export default {
  title: 'Components/Background',
  tags: ['!autodocs'],
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
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
  // Components used in your story `template` are defined in the `components` object
  components: { UidsStub },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
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
