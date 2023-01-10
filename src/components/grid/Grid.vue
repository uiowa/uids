<script setup lang="ts">
import './grid.scss'
</script>
<template>
  <div class="grid--threecol--33-34-33">
    <div class="list-container">
      <div>
        <slot name="column_1"></slot>
      </div>
      <div>
        <slot name="column_2"></slot>
      </div>
      <div>
        <slot name="column_3"></slot>
      </div>
    </div>
  </div>
</template>
