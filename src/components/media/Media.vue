<script setup lang="ts">
import './media.scss'
import { computed, useSlots } from "vue";
import { className } from "../utlity";

const name = 'uids-media'
const props = defineProps({

})

const slots = useSlots();

const classes = computed(() => {
  let classes = ['media'];

  return classes;
});

</script>

<template>
  <div :class="classes">
    <div v-if="$slots.media_markup">
      <!-- @slot Markup to be displayed in media component. -->
      <slot name="media_markup"></slot>
    </div>
  </div>
</template>
