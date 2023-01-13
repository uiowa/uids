<script setup lang="ts">
import './callout.scss'
import { computed, useSlots } from 'vue'
import { className } from '../utlity'
import '../background/background.scss'
import Background from "../shared/background";
import '../size/size.scss'
import Media from '../shared/media'

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
  alignment: {
    type: String,
    default: 'right',
    validator: function (value) {
      return ['left', 'right', 'center'].indexOf(value) !== -1;
    },
  },
  ...Background.props,
  ...Media.props,
});

const classes = computed(() => {
  let classes = ['callout'];
  Background.addBackgroundClass(classes, props);
  if (props.size) {
    classes.push(`element--size-${ className(props.size)}`);
  }

  if (props.alignment) {
    classes.push(`element--alignment-${ className(props.alignment)}`);
  }

  return classes;
});



</script>

<template>
  <div :class="classes">
    <slot name="details">{{ details }}</slot>
  </div>
</template>
