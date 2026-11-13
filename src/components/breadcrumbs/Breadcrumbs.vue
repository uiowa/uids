<script setup lang="ts">
import '../../scss/components/breadcrumbs.scss';

// The gold "/" separators come from CSS (li:not(:last-child)::after), not markup.

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heading_id: {
    type: String,
    default: 'system-breadcrumb',
  },
});
</script>

<template>
  <nav class="breadcrumb" role="navigation" :aria-labelledby="props.heading_id">
    <h2 :id="props.heading_id" class="visually-hidden">Breadcrumb</h2>
    <ol>
      <li v-for="(item, index) in props.items" :key="index">
        <a v-if="item.url" :href="item.url">{{ item.text }}</a>
        <template v-else>{{ item.text }}</template>
      </li>
    </ol>
  </nav>
</template>
