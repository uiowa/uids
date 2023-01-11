<template>
  <div :class="classes">
    <div class="list-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import './grid.scss'
import { computed } from 'vue';
import { className } from '@/components/utlity';

const props = defineProps({
  /**
   * Title style for the headline.
   */
  columns: {
    type: Array,
    default: () => [],
  },

  type: {
    type: String,
    default: 'threecol--33-34-33',
  },
})

const classes = computed(() => {
  let classes = [];

  classes.push(`grid--${ props.type }`);

  return classes;
});
</script>
