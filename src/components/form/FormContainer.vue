<script setup lang="ts">
import '../../scss/components/form.scss';

const props = defineProps({
  compact: {
    type: Boolean,
  },
  large: {
    type: Boolean,
  },
  flex: {
    type: Boolean,
  },
  inline: {
    type: Boolean,
  },
});
</script>
<template>
  <div :class="{
    'form--compact': compact,
    'form--large': large,
    'form--flex': flex,
    'form--inline': inline,
  }">
    <slot></slot>
  </div>
</template>
