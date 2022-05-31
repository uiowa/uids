<script setup lang="ts">
import './card.scss'
import UidsHeadline from '../headline/Headline.vue'
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
    <div v-if="image" class="card__media">
      <img class="card__img" :src="image" alt="Alt">
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
