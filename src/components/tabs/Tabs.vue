<script setup lang="ts">
import '../../scss/components/tabs.scss';
// Registers window.UidsTabs. Its own page-load scan runs before this component
// mounts, so the component instantiates it below.
import '../../assets/js/tabs.js';
import { onMounted, ref } from 'vue';

// div.tabs-collection#id > div[role=tablist] of button.tab__button[role=tab], then a
// div.tab__content[role=tabpanel] per item; the selected tab (the first by default) is open. tabs.js drives
// clicks, arrow keys and #hash activation, so the root id is required.

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  aria_label: {
    type: String,
    default: 'Tabs',
  },
  items: {
    type: Array,
    required: true,
  },
  /**
   * Index of the tab that is open on load.
   */
  selected: {
    type: Number,
    default: 0,
  },
});

const root = ref(null);

onMounted(() => {
  const Tabs = (window as unknown as { UidsTabs?: new (el: Element) => unknown }).UidsTabs;
  if (Tabs && root.value) {
    new Tabs(root.value);
    // tabs.js opens the first panel; reopen the selected tab's (a #hash tab included).
    root.value.querySelectorAll('[role="tab"]').forEach((tab) => {
      document.getElementById(tab.getAttribute('aria-controls')).hidden = tab.getAttribute('aria-selected') !== 'true';
    });
  }
});
</script>

<template>
  <div :id="props.id" ref="root" class="tabs-collection">
    <div role="tablist" :aria-label="props.aria_label">
      <button
        v-for="(item, index) in props.items"
        :key="index"
        :id="props.id + '__tab--' + index"
        class="tab__button"
        role="tab"
        :aria-selected="index === props.selected ? 'true' : 'false'"
        :aria-controls="props.id + '__panel--' + index"
        :tabindex="index === props.selected ? null : -1"
      >
        {{ item.title }}
      </button>
    </div>
    <div
      v-for="(item, index) in props.items"
      :key="index"
      :id="props.id + '__panel--' + index"
      class="tab__content"
      role="tabpanel"
      tabindex="0"
      :aria-labelledby="props.id + '__tab--' + index"
      :hidden="index !== props.selected"
      v-html="item.content"
    ></div>
  </div>
</template>
