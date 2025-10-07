<script setup lang="ts">
import '../../scss/components/menu.scss';
import { computed } from 'vue';
import { className } from "../utlity";
import MenuItems from './MenuItems.vue';

const name = 'uids-menu';

const props = defineProps({
  /**
   * Menu variant - horizontal or vertical
   */
  variant: {
    type: String,
    default: 'horizontal',
    validator: function (value) {
      return ['horizontal', 'vertical'].indexOf(value) !== -1;
    },
  },
  /**
   * Menu items data structure
   */
  items: {
    type: Array,
    required: true,
  },
});

const classes = computed(() => {
  let classes = ['menu'];

  if (props.variant === 'horizontal') {
    classes.push(`menu--${className(props.variant)}`);
  }

  return classes;
});
</script>

<template>
  <ul :class="classes">
    <MenuItems :items="items" />
  </ul>
</template>
