<script setup lang="ts">
import '../../scss/components/badge.scss'
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => [
      'primary',
      'secondary',
      'cool-gray',
      'blue',
      'green',
      'orange'
    ].includes(value)
  },
  text: {
    type: String,
    required: true
  }
});

const classes = computed(() => {
  return [
    'badge',
    `badge--${props.type}`
  ];
});
</script>

<template>
  <span :class="classes">{{ text }}</span>
</template>
