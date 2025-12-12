<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss';
import UidsButton from '../button/Button.vue';

const props = defineProps({
  label: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const wrapperClasses = computed(() => {
  return {
    'form--inline': props.inline,
  };
});

</script>
<template>
  <fieldset>
    <legend v-if="label" v-html="label"></legend>
    <div :class="wrapperClasses">
    <slot></slot>
    </div>
  </fieldset>
</template>
