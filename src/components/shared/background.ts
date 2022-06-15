import { className } from "../utlity";

const colors = [
  'black',
  'gold',
  'gray',
  'white',
]

const props = {
  /**
   * Stack the card's contents on top of each other.
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
    control: {
      type: 'select',
      options: ['', ...colors],
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
