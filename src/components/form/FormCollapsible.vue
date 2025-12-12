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
  <details>
    <summary role="button" aria-controls="edit-secondary" aria-expanded="true" v-html="label"></summary>
    <div class="details-wrapper">
      <slot></slot>
    </div>
  </details>
</template>
