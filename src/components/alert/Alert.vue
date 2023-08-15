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
    <div class="alert__icon">
      <span class="fa-stack fa-1x"><span class="fas fa-circle fa-stack-2x"></span><span class="fa-link fas fa-stack-1x fa-inverse"></span></span>
    </div>
    <div class="alert__details">
      <uids-headline v-if="$slots.title" :text_style="'serif'" :level="'h2'">
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
      <slot name="default">Body</slot>
    </div>
  </div>
</template>
