<script setup lang="ts">
import Menu from "./Menu.vue";

const props = defineProps({
  /**
   * Array of menu items
   */
  children: {
    type: Array,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: '',
    required: false,
  },
});
</script>

<template>
  <li
    :class="{
      'is-active': active,
      'is-expanded': expanded,
      'has-icon': icon
    }"
  >
    <a v-if="url" :href="url"><span role="presentation" v-if="icon" :class="icon"></span>
      {{ label }}
      <span role="presentation" v-if="children && children.length" class="fas fa-chevron-down icon-after"></span>
    </a>
    <span v-else>
      <span role="presentation" v-if="icon" :class="icon"></span>
      {{ label }}
      <span role="presentation" v-if="children && children.length" class="fas fa-chevron-down icon-after"></span>
    </span>

    <!-- Recursively render children at any depth -->
    <Menu v-if="children && children.length"
      :items="children"
      variant="vertical"
    />

  </li>
</template>
