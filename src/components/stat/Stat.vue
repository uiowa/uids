<script setup lang="ts">
import '../../scss/components/stat.scss'
import '../../scss/components/_background.scss'
import { computed } from "vue";
import Background from "../shared/background";

const name = 'uids-stat';
const props = defineProps({
  stat_title: {
    type: String,
    default: '',
  },
  stat_summary: {
    type: String,
    default: '',
  },
  stat_content: {
    type: String,
    default: '',
  },
  stat_prefix: {
    type: String,
    default: '',
  },
  stat_suffix: {
    type: String,
    default: '',
  },
  stat_hover: {
    type: Boolean,
    default: true,
  },
  display: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'horizontal'].includes(value)
  },
  ...Background.props,
});

const classes = computed(() => {
  const classes = [];
  Background.addBackgroundClass(classes, props);

  if (props.display === 'horizontal') {
    classes.push('stat--horizontal', 'stat__grid');
  } else {
    classes.push('element--flex-center');
  }

  if (!props.stat_hover) {
    classes.push('stat--static');
  }

  return classes;
});
</script>

<template>
  <div :class="['stat', 'stat__grid', 'stat--transform', ...classes]">
    <div v-if="stat_title">
      <h2 class="stat__title">
        <span v-if="stat_prefix" class="headline__prefix">{{ stat_prefix }}</span>
        {{ stat_title }}
        <span v-if="stat_suffix" class="headline__suffix">{{ stat_suffix }}</span>
      </h2>
    </div>

    <span v-if="stat_summary" class="stat__description" v-html="stat_summary"></span>

    <p v-if="stat_content" class="stat__content" v-html="stat_content"></p>
  </div>
</template>
