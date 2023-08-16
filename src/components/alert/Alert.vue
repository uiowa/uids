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
      return ['hawk', 'success', 'warning', 'info', 'danger'].indexOf(value) !== -1;
    },
  },
  /**
   * Alert is removable.
   */
  dismissible: {
    type: Boolean,
    default: false,
  },
  /**
   * Content alignment
   */
  centered: {
    type: Boolean,
    default: false,
  },
});

const classes = computed(() => {
  let classes = ['alert'];

  if (props.type) {
    classes.push(`alert-${ className(props.type)}`);
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
      <span class="fa-stack fa-1x"><span class="fas fa-circle fa-stack-2x"></span><span class="fa-link fas fa-stack-1x fa-inverse"></span></span>
    </div>
    <div class="alert__details">
      <uids-headline v-if="$slots.title" :text_style="'serif'" :level="'h2'">
        <!-- @slot The title of the card. HTML is allowed. -->
        <slot name="title">Title</slot>
      </uids-headline>
      <slot name="default">Body</slot>
    </div>
  </div>
</template>
