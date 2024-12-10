<script setup lang="ts">
import '../../scss/components/banner.scss'
import '../../scss/components/_background.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
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
  },
  content_position: {
    type: String,
    default: '',
  },
  gradient: {
    type: String,
    default: '',
  },
  headline_options: {
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
  ...Background.props,
});





const classes = computed(() => {
  let classes = ['banner'];
  Background.addBackgroundClass(classes, props);

  ['button_align_right'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`banner--${ className(prop) }`);
    }
  });

  if (props.content_position) {
    classes.push(`banner--${ className(props.content_position)}`);
  }

  return classes;
});

const buttonClasses = computed(() => {
  let classes = [''];

  return classes
})

</script>

<template>
  <div :class="classes">
    <div class="banner__container">
      <div class="banner__title" v-if="$slots.title">
        <uids-headline :text_style="headline_size"> 
          <!-- @slot The title of the card. HTML is allowed. -->
          <slot name="title">Title</slot>
        </uids-headline>
      </div>
      <div class="banner__content" v-if="details" >
        <slot name="details">{{ details }}</slot>
      </div>
    </div>
    <footer class="banner__link" v-if="button_label" >
      <uids-button :class="buttonClasses"  :url="url" size="medium">
        <slot name="button_label">{{ button_label }}</slot>
        <slot name="button_icon"></slot>
      </uids-button>
    </footer>
  </div>
</template>