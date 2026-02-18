<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss';
import '../../scss/components/accordion.scss';

const props = defineProps({
  label: {
    type: String,
  },
});

</script>
<template>
  <div class="accordion">
    <details
      class="accordion__item"
      role="none"
    >
      <summary class="accordion__heading"
               role="tab"
      >
        <h2>
          <i aria-hidden="true" class="fas fa-chevron-up" role="presentation"></i>
          {{ label }}
        </h2>
      </summary>
      <div
        class="accordion__content"
      >
        <div class="form--inline">
          <slot></slot>
        </div>
      </div>
    </details>
  </div>
</template>
