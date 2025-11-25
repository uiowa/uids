<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss';
import UidsButton from '../button/Button.vue';

const props = defineProps({
  label: {
    type: String,
  },
});

</script>
<template>
  <fieldset>
    <legend v-if="label" v-html="label"></legend>
    <slot></slot>
  </fieldset>
</template>
