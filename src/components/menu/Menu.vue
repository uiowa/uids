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
      <a v-if="item.url" :href="item.url">
        <span v-if="item.icon" class="menu__icon">
          <i :class="item.icon"></i>
        </span>
        <span>{{ item.label }}</span>
        <span v-if="item.children && item.children.length" class="menu__arrow">
          <i class="fas fa-chevron-down"></i>
        </span>
      </a>
      <span v-else>
        <span v-if="item.icon" class="menu__icon">
          <i :class="item.icon"></i>
        </span>
        <span>{{ item.label }}</span>
        <span v-if="item.children && item.children.length" class="menu__arrow">
          <i class="fas fa-chevron-down"></i>
        </span>
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
          <a v-if="child.url" :href="child.url">
            <span v-if="child.icon" class="menu__icon">
              <i :class="child.icon"></i>
            </span>
            <span>{{ child.label }}</span>
            <span v-if="child.children && child.children.length" class="menu__arrow">
              <i class="fas fa-chevron-down"></i>
            </span>
          </a>
          <span v-else>
            <span v-if="child.icon" class="menu__icon">
              <i :class="child.icon"></i>
            </span>
            <span>{{ child.label }}</span>
            <span v-if="child.children && child.children.length" class="menu__arrow">
              <i class="fas fa-chevron-down"></i>
            </span>
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
              <a v-if="subchild.url" :href="subchild.url">
                <span>{{ subchild.label }}</span>
              </a>
              <span v-else>
                <span>{{ subchild.label }}</span>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
