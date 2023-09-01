<script setup lang="ts">
import './cta.scss'
import '../background/background.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
import Borderless from "../shared/borderless";
import { className } from "../utlity";

const name = 'uids-cta'
const props = defineProps({
  /**
   * Title style for the headline.
   */
  headline_style: {
    type: String,
    default: '',
  },
  url: {
    type: String,
  },
  details: {
    type: String,
  },
  orientation: {
    type: String,
    default: '',
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
  let classes = ['cta'];
  Background.addBackgroundClass(classes, props);

  if (props.orientation) {
    classes.push(`cta--${ className(props.orientation)}`);
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
    <div class="cta__container">
        <div class="cta__title" v-if="$slots.title">
        <uids-headline :text_style="headline_style">
          <!-- @slot The title of the card. HTML is allowed. -->
          <slot name="title">Title</slot>
        </uids-headline>
        </div>
        <div class="cta__content" v-if="details" >
          <slot name="details">{{ details }}</slot>
        </div>
    </div>
        <footer class="cta__link" v-if="button_label" >
          <uids-button :class="buttonClasses"  :url="url" size="medium">
            <slot name="button_label">{{ button_label }}</slot>
            <slot name="button_icon"></slot>
          </uids-button>
        </footer>
    </div>
</template>
