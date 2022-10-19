import { className } from '../utlity'

const colors = [
  '',
  'black',
  'gold',
  'gray',
  'white',
]

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
}
