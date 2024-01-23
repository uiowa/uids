<script setup lang="ts">
import '../../scss/components/callout.scss'
import { computed } from 'vue'
import '../../scss/components/_background.scss'
import Background from '../shared/background'
import '../../scss/components/_inline.scss'
import Media from '../shared/media'
import Inline from '../inline/inline'

const name = 'uids-callout'
const props = defineProps({
  ...Inline.props,
  ...Background.props,
  ...Media.props,
});

const classes = computed(() => {
  let classes = ['callout'];
  Background.addBackgroundClass(classes, props);
  Inline.addClass(classes, props);

  return classes;
});
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
