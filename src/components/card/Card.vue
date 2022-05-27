<script setup lang="ts">
import './card.scss';
const name = 'uids-card'
const props = defineProps({
  /**
   * A link to the resource that the card represents.
   */
  link: {
    type: String,
  },
  /**
   * A relative or absolute URL to an image that should be displayed.
   */
  image: {
    type: String,
  },
})
</script>

<template>
  <div class="card">
    <div v-if="image" class="card__image"></div>
    <slot name="title"></slot>
    <slot name="details"></slot>
    <!-- @slot The default slot where the message will be displayed. -->
    <slot>Card body</slot>
  </div>
</template>
