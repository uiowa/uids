import { className } from '../utlity';

const colors = [
  '',
  'black',
  'gold',
  'gray',
  'white',
];

const allBackgroundOptions = {
  'black': 'Black',
  'black--pattern--brain': 'Black - Brain pattern',
  'black--pattern--community': 'Black - Community pattern',
  'black--pattern--particle': 'Black - Particle pattern',
  'gold': 'Gold',
  'gold--pattern--brain': 'Gold - Brain pattern',
  'gold--pattern--community': 'Gold - Community pattern',
  'gold--pattern--particle': 'Gold - Particle pattern',
  'gray': 'Gray',
  'gray--pattern--brain': 'Gray - Brain pattern',
  'gray--pattern--community': 'Gray - Community pattern',
  'gray--pattern--particle': 'Gray - Particle pattern',
  'white': 'White',
  'white--pattern--brain': 'White - Brain pattern',
  'white--pattern--community': 'White - Community pattern',
  'white--pattern--particle': 'White - Particle pattern',
};

const props = {
  /**
   * Set the background color of the element.
   */
  background: {
    type: String,
    default: '',
    validator: function (value: string) {
      return colors.indexOf(value) !== -1;
    },
  },
};

const allBackgroundProps = {
  /**
   * Set the background color or pattern of the element.
   */
  background: {
    type: String,
    default: '',
    validator: function (value: string) {
      return value in allBackgroundOptions || value === '';
    },
  },
};

const argTypes = {
  background: {
    name: 'Background',
    table: {
      defaultValue: { summary: colors[0] },
      category: 'Display options',
    },
    options: colors,
    control: {
      type: 'select',
      labels: {
        '': 'none',
      },
    },
  },
};

const addBackgroundClass = (classes: Array<string>, props: Readonly<any>) => {
  if (props.background !== '') {
    classes.push(`bg--${className(props.background)}`);
  }
};

export default {
  props: props,
  argTypes: argTypes,
  addBackgroundClass: addBackgroundClass,
  allBackgroundOptions: allBackgroundOptions,
  allBackgroundProps: allBackgroundProps,
};
