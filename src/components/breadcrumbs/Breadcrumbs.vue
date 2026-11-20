<script setup lang="ts">
import '../../scss/components/breadcrumbs.scss';

// Markup mirrors Drupal core's breadcrumb template as SiteNow renders it:
// nav.breadcrumb > visually-hidden h2 + ol > li per crumb. A crumb with a url
// renders a link; without one it renders bare text (production does this for
// non-linked parents AND for the current page). The gold "/" separators come
// from CSS (li:not(:last-child)::after), not markup.

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
