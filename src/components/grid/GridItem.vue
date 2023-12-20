<script setup lang="ts">
import './grid.scss'
</script>

<template>
  <div class="grid__column">
    <slot></slot>
  </div>
</template>

<style scoped lang='scss'>
  @use 'grid';
</style>
