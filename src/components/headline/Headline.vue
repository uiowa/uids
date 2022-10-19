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
  url: {
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
  text_style: {
    type: String,
    default: '',
  },
  underline: {
    type: Boolean,
    default: false,
  },
});

const getClasses = computed(() => ({
  'headline': true,
  'headline--uppercase': props.text_style === 'uppercase' ,
  'headline--serif': props.text_style === 'serif' ,
  'headline--underline': props.underline,
  'headline--highlight': props.highlight,
}));
</script>

<template>
  <component :is="level" :class="getClasses">
    <a v-if="url" :href="url" :aria-describedby="aria_describedby">
      <slot></slot>
    </a>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>
