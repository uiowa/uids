<script setup lang="ts">
import Menu from "./Menu.vue";
import {computed} from "vue";
import {className} from "../utlity";

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
  /**
   * Marks a link to another site with an icon after the text
   */
  external: {
    type: Boolean,
    default: false,
  },
});
const liClasses = computed(() => {
  let classes = ['menu'];

  if (props.variant === 'horizontal') {
    classes.push(`menu--${className(props.variant)}`);
  }

  return {
    'is-active': props.active,
    'is-expanded': props.expanded,
    'has-icon': props.icon,
  };
});
</script>

<template>
  <li :class="liClasses">
    <a v-if="url" :href="url" :aria-current="active ? 'page' : undefined">
      <span v-if="icon" class="fa-li"><span role="presentation" class="fas fa-xs" :class="icon"></span></span>
      {{ label }}
      <span role="presentation" v-if="external" class="fas fa-arrow-up-right-from-square fa-xs icon-external"></span>
      <span role="presentation" v-if="children && children.length" class="fas fa-chevron-down fa-xs icon-after"></span>
    </a>
    <span v-else>
      <span v-if="icon" class="fa-li"><span role="presentation" class="fas fa-xs" :class="icon"></span></span>
      {{ label }}
      <span role="presentation" v-if="children && children.length" class="fas fa-chevron-down fa-xs icon-after"></span>
    </span>

    <!-- Recursively render children at any depth -->
    <Menu v-if="children && children.length"
      :items="children"
      variant="vertical"
    />

  </li>
</template>
