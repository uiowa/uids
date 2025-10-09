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
      <span class="fa-li"><span role="presentation" v-if="item.icon" :class="item.icon"></span></span>
      {{ item.label }}
      <span role="presentation" v-if="item.children && item.children.length" class="fas fa-chevron-down icon-after"></span>
    </a>
    <span v-else :class="{ 'is-active': item.active }">
      <span class="fa-li"><span role="presentation" v-if="item.icon" :class="item.icon"></span></span>
      {{ item.label }}
      <span role="presentation" v-if="item.children && item.children.length" class="fas fa-chevron-down icon-after"></span>
    </span>

    <!-- Recursively render children at any depth -->
    <Menu v-if="item.children && item.children.length"
      :items="item.children"
      variant="vertical"
    />

  </li>
</template>
