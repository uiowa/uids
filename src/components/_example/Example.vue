<script setup lang="ts">
import './example.scss';
const name = 'uids-example'
const props = defineProps({
  /**
   * A property to determine whether the message in the component is emphasized or not.
   */
  excited: {
    type: Boolean,
    default: false,
  },
  /**
   * You can add additional props here.
   */
})
</script>

<template>
  <div class="example">
    <!-- @slot The default slot where the message will be displayed. -->
    <slot>Howdy</slot><template v-if="excited">!</template>
  </div>
</template>
