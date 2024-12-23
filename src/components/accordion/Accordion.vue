<script setup lang="ts">
import '../../scss/components/accordion.scss'
import { applyAccordion } from "../../assets/js/accordion.js";
import '../../assets/js/accordion.js';
import {ref, computed, defineProps, onMounted} from 'vue';

const props = defineProps({
  multiselectable: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
  },
});

const itemIds = [];

const ariaOwnsIds = () =>{
  const items = props.items.length;
  if (items < 1) {
    return null;
  }

  for(let i = 0; i < props.items.length; i++) {
    itemIds.push('accordion-heading-' + i);
  }

  return itemIds.join(' ');
}

const accordionClasses = computed(() => {
  return {
    'accordion': true,
    'accordion--multi': props.multiselectable,
  };
});

onMounted(() => {
  applyAccordion('.accordion');
});

</script>

<template>
  <div
    :class="accordionClasses"
    role="tablist"
    :aria-owns="ariaOwnsIds()"
  >
    <details v-for="(item, index) in props.items"
      :key="index"
      class="accordion__item"
      :aria-labelledby="'accordion-heading-' + index"
      :name="!props.multiselectable ? 'accordion-collection' : null"
      :open="item.open"
      :id="'accordion-item-' + index"
    >
      <summary :id="'accordion-heading-' + index" class="accordion__heading"
        :aria-expanded="item.open ? 'true' : 'false'"
        :aria-selected="item.open ? 'true' : 'false'"
        role="tab"
      >
        <h2>
          {{ item.title }}
          <i aria-hidden="true" class="fas fa-chevron-up" role="presentation"></i>
        </h2>
      </summary>
      <div
        :id="'accordion-content-' + index"
        class="accordion__content"
        :aria-labelledby="'accordion-heading-' + index"
        v-html="item.content"
      ></div>
    </details>
  </div>
</template>
