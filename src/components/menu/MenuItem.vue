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
});
const liClasses = computed(() => {
  const classes = ['menu'];

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
    <a v-if="url" :href="url">
      <span v-if="icon" class="fa-li"><span role="presentation" class="fas fa-xs" :class="icon"></span></span>
      {{ label }}
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
