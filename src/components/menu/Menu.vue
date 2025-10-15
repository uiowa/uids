<script setup lang="ts">
import '../../scss/components/menu.scss';
import { computed } from 'vue';
import { className } from "../utlity";
import MenuItem from './MenuItem.vue';

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
  top: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  }
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
  <nav :aria-label="label" v-if="top">
    <ul :class="classes">
        <MenuItem
          v-for="(item, index) in items"
          :key="index"
          v-bind="item"
        />
    </ul>
  </nav>
  <ul :class="classes" v-else>
    <MenuItem
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
    />
  </ul>
</template>
