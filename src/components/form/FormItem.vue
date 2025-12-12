<script setup lang="ts">
import { computed, useSlots } from 'vue';
import '../../scss/components/form.scss';

const slots = useSlots();
</script>
<template>
  <div class="form-item">
    <slot></slot>
    <div class="form-item__description" v-if="slots.description">
      <slot name="description"></slot>
    </div>
  </div>
</template>
