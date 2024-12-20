import { className } from '../utlity'

const colors = [
  '',
  'black',
  'gold',
  'gray',
  'white',
]

const allBackgroundOptions = {
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
}

const props = {
  /**
   * Set the background color of the element.
   */
  background: {
    type: String,
    default: '',
    validator: function (value: string) {
      return colors.indexOf(value) !== -1
    },
  },
}

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
}

const addBackgroundClass = (classes: Array<string>, props: Readonly<any>) => {
  if (props.background !== '') {
    classes.push(`bg--${className(props.background)}`)
  }
}

export default {
  props: props,
  argTypes: argTypes,
  addBackgroundClass: addBackgroundClass,
  allBackgroundOptions: allBackgroundOptions,
}
