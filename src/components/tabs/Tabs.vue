<script setup lang="ts">
import '../../scss/components/tabs.scss';
// Side-effect import: registers window.UidsTabs (the W3C tabs behavior production
// loads verbatim as uids_base's `tabs` library). The script's own page-load scan
// runs before this component mounts, so we instantiate explicitly below.
import '../../assets/js/tabs.js';
import { onMounted, ref } from 'vue';

// Markup mirrors production (uids_base tab paragraphs / building tabs):
// div.tabs-collection#id > div[role=tablist] with button.tab__button[role=tab]
// per item, then div.tab__content[role=tabpanel] per item — first tab selected,
// later panels hidden. tabs.js drives clicks, arrow keys, and #hash activation,
// which is why the root id is required (the script warns without one).

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
});

const root = ref(null);

onMounted(() => {
  const Tabs = (window as unknown as { UidsTabs?: new (el: Element) => unknown }).UidsTabs;
  if (Tabs && root.value) {
    new Tabs(root.value);
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
        :aria-selected="index === 0 ? 'true' : 'false'"
        :aria-controls="props.id + '__panel--' + index"
        :tabindex="index === 0 ? null : -1"
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
      :hidden="index !== 0"
      v-html="item.content"
    ></div>
  </div>
</template>
