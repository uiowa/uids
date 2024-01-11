<script setup lang="ts">
import './button.scss';
import { computed, useSlots } from 'vue';
import Borderless from '../shared/borderless';
import { ButtonBase } from './button-base.js'
import { className } from '../utlity';
const name = 'uids-button'
const props = defineProps(ButtonBase.properties)

const slots = useSlots();

const classes = computed(() => {
  let classes = ['bttn'];
  ['full', 'transparent', 'light_font'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`bttn--${ className(prop) }`);
    }
  });

  if (props.color) {
    classes.push(`bttn--${ className(props.color)}`);
  }

  if (props.size) {
    classes.push(`bttn--${ className(props.size)}`);
  }

  if (!slots.default) {
    classes.push(`bttn--no-text`);
  }

  Borderless.addBorderlessClass(classes, props);

  return classes;
});
</script>

<template>
  <a :class="classes" :href="url">
    <slot></slot>
    <slot name="icon"></slot>
  </a>
</template>
