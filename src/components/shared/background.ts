import { className } from "../utlity";

const props = {
  /**
   * Stack the card's contents on top of each other.
   */
  background: {
    type: String,
    default: '',
    validator: function (value) {
      return ['black', 'gray', 'white', 'yellow'].indexOf(value) !== -1;
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
  addBackgroundClass: addBackgroundClass,
}
