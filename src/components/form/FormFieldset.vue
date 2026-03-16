<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss';

const props = defineProps({
  label: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  sideLegend: {
    type: Boolean,
    default: false,
  },
});

const fieldsetClasses = computed(() => {
  return {
    'form-fieldset--side-legend': props.sideLegend,
  };
});

</script>
<template>
  <fieldset :class="fieldsetClasses">
    <legend v-if="label" v-html="label" :class="{ 'form--required': required }"></legend>
    <div v-if="sideLegend" class="form-fieldset__content">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </fieldset>
</template>
