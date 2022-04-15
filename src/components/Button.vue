<script setup lang="ts">
import './button.css';
import { computed } from 'vue';
const name = 'uids-button'
const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: function (value) {
      return ['small', 'medium', 'large'].indexOf(value) !== -1;
    },
  },
})

const classes = computed(() => ({
  'bttn': true,
  'bttn--primary': props.primary,
  'bttn--secondary': !props.primary,
  [`bttn--${props.size || 'medium'}`]: true,
}))
</script>

<template>
  <a :href="button_link" :class="classes">
    <slot></slot>
    <i v-if="button_icon" class="fas fa-arrow-right"></i>
  </a>
</template>

<style lang="scss">
@import '../assets/scss/components/button';
</style>
