<script setup lang="ts">
import '../../scss/components/banner.scss'
import '../../scss/components/_background.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
import Media from '../shared/media'
import Borderless from "../shared/borderless";
import { className } from "../utlity";

const name = 'uids-banner'
const props = defineProps({
  /**
   * Title style for the headline.
   */
  headline_size: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'large', 'medium', 'small'].includes(value)
  },
  title: {
    type: String,
    default: '',
  },
  content_position: {
    type: String,
    default: '',
  },
  gradient: {
    type: String,
    default: '',
    validator: (value: string) => ['dark', 'light'].includes(value),
  },
  headline_style: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  remove_margin: {
    type: Boolean,
    default: false,
  },
  mobile_content_below_image: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
  button_align_right: {
    type: Boolean,
    default: false,
  },
  button_label: {
    type: String,
  },
  button_icon: {
    type: String,
    default: '',
  },
  button_color: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary', 'transparent'].indexOf(value) !== -1;
    },
  },
  ...Background.props,
  ...Media.props,
});


const classes = computed(() => {
  let classes = ['banner'];
  Background.addBackgroundClass(classes, props);

  ['button_align_right'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`banner--${ className(prop) }`);
    }
  });

  if (props.gradient) {
    classes.push(`banner--gradient-${props.gradient}`);
  }

  if (props.height) {
    classes.push(`banner--${props.height}`);
  }

  if (props.mobile_content_below_image === true) {
    classes.push(`banner--stacked`);
  }

  switch (props.content_position) {
    case 'center-center':
      classes.push('banner--vertical-center', 'banner--horizontal-center', 'banner--gradient-bottom');
      break;
    case 'center-bottom':
      classes.push('banner--vertical-bottom', 'banner--horizontal-center', 'banner--gradient-bottom');
      break;
    case 'left-center':
      classes.push('banner--vertical-center', 'banner--horizontal-left', 'banner--gradient-left');
      break;
    case 'left-bottom':
      classes.push('banner--vertical-bottom', 'banner--horizontal-left', 'banner--gradient-left');
      break;
    default:
      classes.push('banner--vertical-center', 'banner--horizontal-left', 'banner--gradient-left');
  }

  return classes;
});

const headlineClasses = computed(() => {
  const classes = [];

  if (props.headline_size) {
    classes.push(`headline--${props.headline_size}`);
  }

  if (props.gradient === 'dark') {
    classes.push('headline--negative');
  } else if (props.gradient === 'light') {
    classes.push('headline--positive');
  }

  if (props.headline_style) {
    switch (props.headline_style) {
      case 'uppercase-highlight':
        classes.push('headline--uppercase', 'headline--highlight');
        break;
      case 'serif-highlight':
        classes.push('headline--serif', 'headline--highlight');
        break;
      case 'uppercase':
        classes.push('headline--uppercase');
        break;
      case 'serif':
        classes.push('headline--serif');
        break;
    }
  }

  return classes;
});

const buttonClasses = computed(() => {
  const classes = [];

  if (props.button_color) {
    classes.push(`bttn--${props.button_color}`);
  }

  return classes;
});

</script>

<template>
  <div :class="classes">
    <div class="banner__image">
      <slot name="media"></slot>
    </div>
    <div class="banner__container">
      <div class="banner__content">
        <div class="banner__title">
          <uids-headline
            :text_style="headline_style"
            :class="headlineClasses"
          >
            <slot name="title">Title</slot>
          </uids-headline>
        </div>
        <footer class="banner__action" v-if="button_label" >
          <uids-button
            :class="['bttn', ...buttonClasses]"
            :url="url"
            :no_default_classes="true"
            size="medium"
          >
            <slot name="button_label">{{ button_label }}</slot>
            <slot name="button_icon"></slot>
          </uids-button>
        </footer>
      </div>
    </div>
  </div>
</template>
