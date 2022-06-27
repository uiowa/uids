import { className } from "../utlity";

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
    validator: function (value) {
      return colors.indexOf(value) !== -1;
    },
  },
}

const argTypes = {
  background: {
    table: { defaultValue: colors[0] },
    control: {
      type: 'select',
      options: colors,
    },
  },
}

const addBackgroundClass = (classes: Array<string>, props: Readonly<any>) => {
  if (props.background !== '') {
    classes.push(`bg--${ className(props.background) }`)
  }
}

export default {
  props: props,
  argTypes: argTypes,
  addBackgroundClass: addBackgroundClass,
}
