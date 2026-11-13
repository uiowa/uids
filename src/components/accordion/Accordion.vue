<script setup lang="ts">
import '../../scss/components/accordion.scss'
import { applyAccordion } from "../../assets/js/accordion.js";
import '../../assets/js/accordion.js';
import '../../scss/components/_background.scss'
import {ref, computed, defineProps, onMounted} from 'vue';

const props = defineProps({
  multiselectable: {
    type: Boolean,
    default: false,
  },
  label_color: {
    type: String,
    default: '',
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  // The heading level of each summary, so the accordion sits in the page's outline.
  heading_level: {
    type: String,
    default: 'h2',
    validator: (value) => ['h2', 'h3', 'h4', 'h5', 'h6'].includes(value),
  },
});

const itemIds = [];

const ariaOwnsIds = () =>{
  const itemIds = [];
  props.items.forEach((item, index) => {
    itemIds.push(item.id);
  });

  return itemIds.join(' ');
}

const accordionClasses = computed(() => {
  return {
    'accordion': true,
    'accordion--multi': props.multiselectable,
    'accordion--white' : props.label_color,
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
    :aria-multiselectable="props.multiselectable ? 'true' : 'false'"
    :aria-owns="ariaOwnsIds()"
  >
    <details v-for="(item, index) in props.items"
      :key="index"
      class="accordion__item"
      :name="!props.multiselectable ? 'accordion-collection' : null"
      :open="item.open"
      role="none"
    >
      <summary :id="item.id" class="accordion__heading"
        role="tab"
      >
        <component :is="props.heading_level">
          <i aria-hidden="true" class="fas fa-chevron-up" role="presentation"></i>
          {{ item.title }}
        </component>
      </summary>
      <div
        class="accordion__content"
        v-html="item.content"
      ></div>
    </details>
  </div>
</template>
