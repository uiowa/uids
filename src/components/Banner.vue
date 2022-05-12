<script setup lang="ts">
import UidsHeadline from './Headline.vue';
import UidsButton from './Button.vue';
import { computed } from 'vue';

const name = 'uids-banner'

const props = defineProps({
  title: { type: String },
  image: { type: String },
  url: { type: String },
  text: { type: String },
  headline_settings: {
    type: Object,
  },
  button_text: {
    type: String,
  },
  // @todo Determine how best to handle these fields going forward.
  overlay_color: {
    type: String,
    default: 'gradient-dark',
  },
  overlay_to: {
    type: String,
    default: 'gradient-bottom',
  },
  // size?: string
  // classes?: string
  // vertical_alignment?: string
  // horizontal_alignment?: string
  // title_classes?: string
  // button_link?: string
  // button_text?: string
})

// Compose a string out of the classes passed to the component.
const classes = computed(() => {
  let classes = ["banner"];
  if (props.url) {
    classes.push('click-container')
  }
  // @todo Add classes.
  Array.prototype.forEach.call(['overlay_color', 'overlay_to', 'size', 'vertical_alignment', 'horizontal_alignment'], setting => {
      // @todo Check if the setting is set and then add a class for it.
      classes.push('banner--' + props[setting])
    }
  );
  return classes.join(" ");
})

const getHeadlineSettings = computed(() => {
  if (props.title) {
    let headline_settings = {
      level: 'h2',
      classes: 'headline',
    }
    if (props.headline_settings) {
      Array.prototype.forEach.call(['level', 'class'], setting => {
        if (props.headline_settings[setting]) {
          headline_settings[setting] = props.headline_settings[setting]
        }
      })
    }

    return headline_settings
  }
  return {}
})
</script>

<template>
  <div :class="classes">
    <div class="banner__image" v-if="image">
      <img :src="image" alt="" loading="lazy">
    </div>
    <div class="banner__container">
      <div class="banner__content">
        <slot name="headline">
          <uids-headline
            v-if="title"
            :level="getHeadlineSettings.level"
            :class="banner_title_classes"
            :href="url"
          >{{ title }}</uids-headline>
        </slot>
        <slot></slot>
        <uids-button
          v-if="url && button_text"
          :href="url"
          class="bttn--secondary bttn--caps"
          :arrow="true"
        >{{ button_text }}</uids-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/components/banner';
</style>
