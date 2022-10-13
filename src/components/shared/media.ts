import { className } from "../utlity";

const sizes = [
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
    default: "medium",
    validator: function (value) {
      return sizes.indexOf(value) !== -1;
    },
  },
  /**
   * Set shape on the media element.
   */
  media_shape: {
    type: String,
    default: "widescreen",
    validator: function (value) {
      return shapes.indexOf(value) !== -1;
    },
  },
  /**
   * Set a border on the media element.
   */
  media_border: {
    type: Boolean,
    default: false,
  },
  /**
   * Set object-fit cover on the media element.
   */
  media_cover: {
    type: Boolean,
    default: false,
  },
}

const argTypes = {
  media_size: {
    table: { defaultValue: sizes[1] },
    control: {
      type: 'select',
      options: sizes,
    },
  },
  media_shape: {
    table: { defaultValue: shapes[0] },
    control: {
      type: 'select',
      options: shapes,
    },
  },
  media_border: {
    table: { defaultValue: false },
    control: { type: 'boolean' },
  },
  media_cover: {
    table: { defaultValue: false },
    control: { type: 'boolean' },
  },
}

const addMediaClasses = (classes: Array<string>, props: Readonly<any>) => {
  if (props.media_size !== '') {
    classes.push(`media--${ className(props.media_size) }`)
  }
  if (props.media_shape !== '') {
    classes.push(`media--${ className(props.media_shape) }`)
  }
  if (props.media_border) {
    classes.push(`media--border`);
  }
  if (props.media_cover) {
    classes.push(`media--cover`);
  }
}

export default {
  props: props,
  argTypes: argTypes,
  addMediaClasses: addMediaClasses,
}
