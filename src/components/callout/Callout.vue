<script setup lang="ts">
import './callout.scss'
import { computed } from 'vue'
import '../background/background.scss'
import Background from '../shared/background'
import '../inline/inline.scss'
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
