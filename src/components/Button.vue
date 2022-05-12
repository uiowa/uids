<script setup lang="ts">
import '../assets/scss/components/button.scss';
import { computed } from 'vue';
const name = 'uids-button'
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  arrow: {
    type: Boolean,
    default: true,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  font: {
    type: String,
    default: '',
  },
})

const classes = computed(() => ({
  'bttn': true,
  'bttn--primary': props.color === 'primary',
  'bttn--secondary': props.color === 'secondary',
  'bttn--tertiary': props.color === 'tertiary',
  'bttn--link': props.color === 'link',
  'bttn--outline': props.outline,
  'bttn--font-serif': props.font === 'serif',
  'bttn--font-sans-serif': props.font === 'sans-serif',
}))
</script>

<template>
  <a :class="classes">
    <slot></slot>
    <i v-if="arrow" class="fas fa-arrow-right"></i>
  </a>
</template>
