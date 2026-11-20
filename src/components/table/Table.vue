<script setup lang="ts">
import '../../scss/components/tables.scss'
import { computed, useSlots } from "vue";

const props = defineProps({
  summary: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: 'Table',
  },
  caption_hidden: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'minimal'].includes(value),
  },
});

const tableClasses = computed(() => {
  let classes = [];

  if (props.variant && props.variant !== 'default') {
    classes.push(`table--${props.variant}`);
  }

  if (props.highlight) {
    classes.push('table--hover-highlight');
  }

  if (props.border) {
    classes.push('table--gray-borders');
  }

  return classes;
});
</script>

<template>
  <div class="table-responsive" :class="{ 'table-sticky': props.sticky }">
    <table :class="tableClasses" class="table" :summary="summary">
      <caption v-if="caption" :class="{ 'element-invisible': caption_hidden }">{{ caption }}</caption>
      <thead>
      <slot name="thead"></slot>
      </thead>
      <tbody>
      <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>
