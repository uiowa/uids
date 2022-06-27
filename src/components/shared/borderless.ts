import { className } from "../utlity";

const props = {
  /**
   * Set an outline on any element.
   */
  borderless: {
    type: Boolean,
    default: false,
  },
}

const argTypes = {
  borderless: {
    table: { defaultValue: false },
    control: { type: 'boolean' },
  },
}

const addBorderlessClass = (prefix: string, classes: Array<string>, props: Readonly<any>) => {
  if (props.borderless) {
    classes.push(`${ className(prefix) }--borderless`);
  }
}

export default {
  props: props,
  argTypes: argTypes,
  addBorderlessClass: addBorderlessClass,
}
