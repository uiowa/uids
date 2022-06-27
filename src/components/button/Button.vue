<script setup lang="ts">
import './button.scss';
import { computed } from 'vue';
import Borderless from "../shared/borderless";
import { className } from "../utlity";
const name = 'uids-button'
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary','transparent'].indexOf(value) !== -1;
    },
  },
  size: {
    type: String,
    default: 'medium',
    validator: function (value) {
      return ['small', 'medium', 'large'].indexOf(value) !== -1;
    },
  },
  ...Borderless.props,
  full: {
    type: Boolean,
    default: false,
  },
  font: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  }
})

const classes = computed(() => {
  let classes = ['bttn'];
  ['full'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`bttn--${ className(prop) }`);
    }
  });

  if (props.color) {
    classes.push(`bttn--${ className(props.color)}`);
  }

  if (props.font && props.font != 'None') {
    classes.push(`bttn--${ className(props.font)}`);
  }

  if (props.size) {
    classes.push(`bttn--${ className(props.size)}`);
  }

  Borderless.addBorderlessClass('bttn', classes, props);

  return classes;
});





</script>

<template>
  <a :class="classes" :href="url">
    <slot></slot>
    <slot name="icon"></slot>
  </a>
</template>
