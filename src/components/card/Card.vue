<script setup lang="ts">
import './card.scss';
const name = 'uids-card'
const props = defineProps({
  /**
   * A property to determine whether the message in the component is emphasized or not.
   */
  link: {
    type: String,
  },
  /**
   * You can add additional props here.
   */
})
</script>

<template>
  <div class="card">
    <slot name="image"></slot>
    <!-- @slot The default slot where the message will be displayed. -->
    <slot>Card body</slot>
    <slot name="details"></slot>
    <slot></slot>
  </div>
</template>
