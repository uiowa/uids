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
      return ['hawk', 'success', 'warning', 'info', 'danger', 'dismissible'].indexOf(value) !== -1;
    },
  },
});

const classes = computed(() => {
  let classes = ['alert'];

  if (props.type) {
    classes.push(`alert-${ className(props.type)}`);
  }

  return classes;
});

</script>

<template>
  <div :class="classes">
    <uids-headline v-if="$slots.title" :text_style="'serif'" :level="'h3'">
      <!-- @slot The title of the card. HTML is allowed. -->
      <slot name="title">Title</slot>
    </uids-headline>
    <div v-if="$slots.subtitle" class="alert__subtitle">
      <!-- @slot The subtitle of the card.. -->
      <slot name="subtitle">Subtitle</slot>
    </div>
    <div v-if="$slots.meta" class="alert__meta">
      <!-- @slot The meta of the card.. -->
      <slot name="meta">Meta</slot>
    </div>
    <slot name="default" class="alert__content">Body</slot>
  </div>
</template>
