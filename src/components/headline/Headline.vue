<script setup lang="ts">
import '../../assets/scss/headings.scss';
import './headline.scss';
import { computed } from 'vue';
const name = 'uids-headine'
const props = defineProps({
  level: {
    type: String,
    default: 'h2',
    validator: function (value) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(value) !== -1;
    },
  },
  class: {
    type: String,
  },
  href: {
    type: String,
  },
  aria_describedby: {
    type: [String, Boolean],
    default: false,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
  underline: {
    type: Boolean,
    default: false,
  },
});

const getClasses = computed(() => ({
  'headline': true,
  'headline--uppercase': props.uppercase,
  'headline--underline': props.underline,
  'headline--highlight': props.highlight,
}));
</script>

<template>
  <component :is="level" :class="getClasses">
    <a v-if="href" :href="href" :aria-describedby="aria_describedby">
      <slot></slot>
    </a>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>
