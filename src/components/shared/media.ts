import { className } from '../utlity'

const sizes = [
  '',
  'small',
  'medium',
  'large',
]

const shapes = [
  'widescreen',
  'square',
  'circle',
]

const props = {
  /**
   * Set size on the media element.
   */
  media_size: {
    type: String,
    default: '',
    validator: function (value: string) {
      return sizes.indexOf(value) !== -1
    },
  },
  /**
   * Set shape on the media element.
   */
  media_shape: {
    type: String,
    default: 'widescreen',
    validator: function (value: string) {
      return shapes.indexOf(value) !== -1
    },
  },
  /**
   * Set a border on the media element.
   */
  media_border: {
    type: Boolean,
    default: false,
  },
}

const argTypes = {
  media_border: {
    name: 'Border',
    table: {
      defaultValue: { summary: false },
      category: 'Media',
    },
    control: 'boolean',
  },
  media_shape: {
    name: 'Shape',
    options: shapes,
    table: {
      defaultValue: { summary: shapes[0] },
      category: 'Media',
    },
    control: 'select',
    description: 'The shape of the media element',
  },
  media_size: {
    name: 'Size',
    options: sizes,
    table: {
      defaultValue: { summary: sizes[1] },
      category: 'Media',
    },
    control: {
      type: 'select',
      labels: {
        '': 'full width'
      },
    },
    description: 'Set the size of the media element.',
  },
}

const addMediaClasses = (classes: Array<string>, props: Readonly<any>) => {
  if (props.media_size !== '') {
    classes.push(`media--${className(props.media_size)}`)
  }
  if (props.media_shape !== '') {
    classes.push(`media--${className(props.media_shape)}`)
  }
  if (props.media_border) {
    classes.push(`media--border`)
  }
}

export default {
  props: props,
  argTypes: argTypes,
  addMediaClasses: addMediaClasses,
}
