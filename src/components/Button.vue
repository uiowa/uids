<script setup lang="ts">
import '../assets/scss/components/button.scss';
import { computed } from 'vue';
const name = 'uids-button'
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    validator: function (value: string) {
      return ['small', 'medium', 'large'].indexOf(value) !== -1;
    },
  },
  arrow: {
    type: Boolean,
    default: true,
  },
})

const classes = computed(() => ({
  'bttn': true,
  'bttn--primary': props.color === 'primary',
  'bttn--secondary': props.color === 'secondary',
  [`bttn--${props.size || 'medium'}`]: true,
}))
</script>

<template>
  <a :class="classes">
    <slot></slot>
    <i v-if="arrow" class="fas fa-arrow-right"></i>
  </a>
</template>
