import { className } from '../utlity'

const sizes = [
  '',
  'small',
  'medium',
  'large',
]

const alignment = [
  '',
  'left',
  'right',
  'center'
]

const props = {
  /**
   * Set the alignment of an inline element.
   */
  inline_alignment: {
    type: String,
    default: 'left',
    validator: function (value: string) {
      return alignment.indexOf(value) !== -1;
    },
  },
  /**
   * Set the size of an inline element.
   */
  inline_size: {
    type: String,
    default: '',
    validator: function (value: string) {
      return sizes.indexOf(value) !== -1
    },
  },
}

const argTypes = {
  inline_alignment: {
    name: 'Alignment',
    table: {
      defaultValue: { summary: alignment[0] },
      category: 'Display options',
    },
    options: alignment,
    control: {
      type: 'select',
      labels: {
        '': 'full width',
      },
    },
  },
  inline_size: {
    name: 'Size',
    table: {
      defaultValue: { summary: sizes[0] },
      category: 'Display options',
    },
    options: sizes,
    control: {
      type: 'select',
      labels: {
        '': 'full width',
      },
    },
  },
}

const addClass = (classes: Array<string>, props: Readonly<any>) => {
  if (props.inline_size) {
    classes.push(`inline--size-${className(props.inline_size)}`);
  }

  if (props.inline_alignment) {
    classes.push(`inline--align-${className(props.inline_alignment)}`);
  }
}

export default {
  props: props,
  argTypes: argTypes,
  addClass: addClass,
}
