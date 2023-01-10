<script setup lang="ts">
import './grid.scss'
</script>
<template>
  <div class="grid--threecol--33-34-33">
    <div class="list-container">
      <slot name="column_1"></slot>
      <slot name="column_2"></slot>
      <slot name="column_3"></slot>
    </div>
  </div>
</template>
