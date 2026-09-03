<script setup lang="ts">
import '../../scss/components/button.scss';
import { computed } from 'vue';
import {className} from "../utlity";
const name = 'uids-button'
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary', 'link'].indexOf(value) !== -1;
    },
  },
  size: {
    type: String,
    default: 'medium',
    validator: function (value) {
      return ['small', 'medium', 'large'].indexOf(value) !== -1;
    },
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
  light_font: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => {
  const classes = ['bttn'];

  ['light_font', 'outline'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`bttn--${ className(prop) }`);
    }
  })

  if (props.color) {
    classes.push(`bttn--${ className(props.color)}`);
  }

  if (props.font) {
    classes.push(`bttn--font-${ className(props.font)}`);
  }

  if (props.size) {
    classes.push(`bttn--${ className(props.size)}`);
  }

  return classes;
})

</script>

<template>
  <div :class="classes">
    <slot></slot>
    <i v-if="arrow" class="fas fa-arrow-right"></i>
  </div>
</template>
