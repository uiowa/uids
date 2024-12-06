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
});

const tableClasses = computed(() => {
  let classes = [];

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
  <div class="table-responsive" :class="{ 'table--sticky': props.sticky }">
    <table :class="tableClasses" class="table" :summary="summary">
      <caption>{{ caption }}</caption>
      <thead>
      <slot name="thead"></slot>
      </thead>
      <tbody>
      <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>
