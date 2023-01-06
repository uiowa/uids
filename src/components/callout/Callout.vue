<script setup lang="ts">
import './callout.scss'
import '../background/background.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
const name = 'uids-callout'
const props = defineProps({
  url: {
    type: String,
  },
  details: {
    type: String,
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
const slots = useSlots();
const classes = computed(() => {
  let classes = ['callout__wrapper'];
  Background.addBackgroundClass(classes, props);
  return classes;
});
</script>

<template>
  <div :class="classes">
    <div class="callout__container">


      <uids-headline v-if="$slots.title" uppercase="true">
        <slot name="title"></slot>
      </uids-headline>


      <div class="callout__content" v-if="details" >
        <slot name="details">{{ details }}</slot>
      </div>

      <footer class="callout__link" v-if="button_label" >
        <uids-button :url="url" size="medium">
          <slot name="button_label">{{ button_label }}</slot>
          <slot name="button_icon"></slot>
        </uids-button>
      </footer>

    </div>
  </div>
</template>
