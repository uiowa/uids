<script setup lang="ts">
import './alert.scss';
import {computed} from 'vue';
import {className} from '../utlity';

const name = 'uids-alert'
const props = defineProps({
  /**
   * Type of alert.
   */
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => {
      return ['info', 'success', 'warning', 'danger'].indexOf(value) !== -1;
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

  /**
   * Vertically center icon.
   */
  centerIconVertically: {
    type: Boolean,
    default: false,
  }
});

let icon = 'link';

const classes = computed(() => {
  let classes = ['alert'];

  if (props.type) {
    classes.push(`alert-${ className(props.type)}`);
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
    <div class="alert__content">
      <slot name="default">Body</slot>
    </div>
  </div>
</template>
