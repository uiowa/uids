<script setup lang="ts">
import './callout.scss'
import { computed, useSlots } from 'vue'
import { className } from '../utlity'
import '../background/background.scss'
import Background from "../shared/background";
import '../background/background.scss'


const name = 'uids-callout'
const props = defineProps({
  details: {
    type: String,
  },
  size: {
    type: String,
    default: 'medium',
    validator: function (value) {
      return ['small', 'medium', 'large'].indexOf(value) !== -1;
    },
  },
  ...Background.props,
});

const classes = computed(() => {
  let classes = ['callout'];
  Background.addBackgroundClass(classes, props);
  if (props.size) {
    classes.push(`callout--${ className(props.size)}`);
  }

  return classes;
});



</script>

<template>
  <div :class="classes">
    <slot name="details">{{ details }}</slot>
  </div>
</template>
