<script setup lang="ts">
import './grid.scss'
</script>
<template>
  <div class="grid grid--3">
    <slot name="column_1"></slot>
    <slot name="column_2"></slot>
    <slot name="column_3"></slot>
  </div>
</template>
