<script setup lang="ts">
import './callout.scss'
import { computed, useSlots } from 'vue'
import { className } from '../utlity'
import '../background/background.scss'
import Background from "../shared/background";
import '../size/size.scss'
import Media from '../shared/media'
import Inline from '../shared/inline'

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
