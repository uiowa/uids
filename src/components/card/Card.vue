<script setup lang="ts">
import './card.scss'
import '../media/media.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed } from "vue";
const name = 'uids-card'
const props = defineProps({
  /**
   * A link to the resource that the card represents.
   */
  link: {
    type: String,
  },
  /**
   * Determine the size of the media of the card.
   */

  // @todo: determine whether this is necessary.
  // media_size: {
  //   type: String,
  // },

  /**
   * Alignment of text content.
   */
  text_centered: {
    type: Boolean,
  },
  /**
   * Include an outline around the card.
   */
  outline: {
    type: Boolean,
    default: true,
  },
  /**
   * Stack the card's contents on top of each other.
   */
  stacked: {
    type: Boolean,
    default: true,
  },
  /**
   * Add padding around the entirety of the contents of the card.
   */
  full_padded: {
    type: Boolean,
    default: true,
  },
})

const classes = computed(() => ({
  'card': true,
  'card--outline': props.outline === true,
  'card--stacked': props.stacked === true,
  'card--full-padded': props.full_padded === true,
  'card--centered': props.text_centered === true,
}))
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.media" class="card__media">
      <slot name="media"></slot>
    </div>

    <header v-if="$slots.title" class="card__title">
      <uids-headline>
        <slot name="title">Title</slot>
      </uids-headline>
    </header>
    <div v-if="$slots.details" class="card__details">
      <slot name="details">Details</slot>
    </div>
    <!-- @slot The body of the card. -->
    <slot>Body</slot>
    <footer v-if="$slots.action"></footer>

  </div>
</template>
