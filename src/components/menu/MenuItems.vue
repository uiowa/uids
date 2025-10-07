<script setup lang="ts">
import Menu from "./Menu.vue";

const props = defineProps({
  /**
   * Array of menu items
   */
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <li
    v-for="(item, index) in items"
    :key="index"
    :class="{
      'is-active': item.active,
      'is-expanded': item.expanded,
      'has-icon': item.icon
    }"
  >
    <a v-if="item.url" :href="item.url">
      <i v-if="item.icon" :class="item.icon"></i>
      {{ item.label }}
      <i v-if="item.children && item.children.length" class="fas fa-chevron-down icon-after"></i>
    </a>
    <span v-else :class="{ 'is-active': item.active }">
      <i v-if="item.icon" :class="item.icon"></i>
      {{ item.label }}
      <i v-if="item.children && item.children.length" class="fas fa-chevron-down icon-after"></i>
    </span>

    <!-- Recursively render children at any depth -->
    <Menu v-if="item.children && item.children.length"
      :items="item.children"
      variant="vertical"
    />

  </li>
</template>
