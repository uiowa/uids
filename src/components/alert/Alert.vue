<script setup lang="ts">
import './alert.scss';
import {computed} from 'vue';
import {className} from '../utlity';

import UidsHeadline from '../headline/Headline.vue'

const name = 'uids-alert'
const props = defineProps({
  /**
   * Type of alert.
   */
  type: {
    type: String,
    default: '',
    validator: (value: string) => {
      return ['', 'hawk', 'success', 'warning', 'info', 'danger'].indexOf(value) !== -1;
    },
  },

  /**
   * Displayable icon.
   */
  icon: {
    type: String,
    default: 'link',
    validator: (value: string) => {
      return ['link', 'times', 'exclamation'].indexOf(value) !== -1;
    },
  },

  /**
   * Content alignment.
   */
  centered: {
    type: Boolean,
    default: false,
  },

  /**
   * Alert is removable.
   */
  dismissible: {
    type: Boolean,
    default: false,
  },

  inheritColor: {
    type: Boolean,
    default: false,
  },

  centerIconVertically: {
    type: Boolean,
    default: false,
  }
});

const classes = computed(() => {
  let classes = ['alert'];

  if (props.type) {
    classes.push(`alert-${ className(props.type)}`);
  }

  if (props.inheritColor) {
    classes.push('alert__inherit-color');
  }

  if (props.centerIconVertically) {
    classes.push('alert__center-icon-vertically');
  }

  ['centered', 'dismissible'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`alert-${ className(prop) }`);
    }
  });

  return classes;
});

</script>

<template>
  <div :class="classes">
    <div class="alert__icon">
      <span class="fa-stack fa-1x"><span class="fas fa-circle fa-stack-2x"></span><span :class="'fas fa-stack-1x fa-inverse fa-' + props.icon"></span></span>
    </div>
    <div class="alert__details">
      <uids-headline v-if="$slots.title" :text_style="'serif'" :level="'h2'">
        <!-- @slot The title of the card. HTML is allowed. -->
        <slot name="title">Title</slot>
      </uids-headline>
      <div class="alert__body"><slot name="default">Body</slot></div>
    </div>
  </div>
</template>
