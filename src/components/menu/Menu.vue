<script setup lang="ts">
import '../../scss/components/menu.scss';
import { computed } from 'vue';
import { className } from "../utlity";

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

  if (props.variant) {
    classes.push(`menu--${className(props.variant)}`);
  }

  return classes;
});
</script>

<template>
  <ul :class="classes">
    <li 
      v-for="(item, index) in items" 
      :key="index"
      :class="{
        'is-active': item.active,
        'is-expanded': item.expanded
      }"
    >
      <a v-if="item.url" :href="item.url" :class="{ 'is-active': item.active }">
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.label }}
        <i v-if="item.children && item.children.length" class="fas fa-chevron-down icon-after"></i>
      </a>
      <span v-else>
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.label }}
        <i v-if="item.children && item.children.length" class="fas fa-chevron-down icon-after"></i>
      </span>
      
      <!-- Recursive submenu -->
      <ul v-if="item.children && item.children.length">
        <li 
          v-for="(child, childIndex) in item.children" 
          :key="childIndex"
          :class="{
            'is-active': child.active,
            'is-expanded': child.expanded
          }"
        >
          <a v-if="child.url" :href="child.url" :class="{ 'is-active': child.active }">
            <i v-if="child.icon" :class="child.icon"></i>
            {{ child.label }}
            <i v-if="child.children && child.children.length" class="fas fa-chevron-down icon-after"></i>
          </a>
          <span v-else>
            <i v-if="child.icon" :class="child.icon"></i>
            {{ child.label }}
            <i v-if="child.children && child.children.length" class="fas fa-chevron-down icon-after"></i>
          </span>

          <!-- Third level -->
          <ul v-if="child.children && child.children.length">
            <li 
              v-for="(subchild, subchildIndex) in child.children" 
              :key="subchildIndex"
              :class="{
                'is-active': subchild.active
              }"
            >
              <a v-if="subchild.url" :href="subchild.url" :class="{ 'is-active': subchild.active }">
                {{ subchild.label }}
              </a>
              <span v-else>
                {{ subchild.label }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
