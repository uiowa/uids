<script setup lang="ts">
import './grid.scss'
</script>
<template>
  <div class="grid--threecol--33-34-33">
    <div class="list-container">
      <div
        v-if="$slots.column_1"
        class="grid__column"
      >
        <slot name="column_1"></slot>
      </div>
      <div
        v-if="$slots.column_2"
        class="grid__column"
      >
        <slot name="column_2"></slot>
      </div>
      <div
        v-if="$slots.column_3"
        class="grid__column"
      >
        <slot name="column_3"></slot>
      </div>
    </div>
  </div>
</template>
