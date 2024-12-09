<script setup lang="ts">
import '../../scss/components/accordion.scss'
import '../../assets/js/accordion.js'
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  multiselectable: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
  },
  activeIndices: {
    type: Array,
    required: true,
  },
});

let activeIndexes = [];
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

const setActiveIndices = () => {
  activeIndexes = [];
  const indices = props.activeIndices;
  const numIndices = indices.length;

  if (numIndices < 1) {
    return null;
  }

  // If the accordion is not multiselectable...
  if (!props.multiselectable) {
    console.log('here');

    // Only let the first index be added to the list.
    activeIndexes.push(indices[0]);
  }
  else {
    activeIndexes = indices;
  }

  return null;
}

const accordionClasses = computed(() => {
  return {
    'accordion': true,
    'accordion--multi': props.multiselectable,
  };
});
</script>

<template>
  <div
    :class="accordionClasses"
    role="tablist"
    :aria-multiselectable="props.multiselectable"
    :aria-owns="ariaOwnsIds()"
    :active-indices="setActiveIndices()"
  >
  <div v-for="(item, index) in props.items" :key="index" class="accordion__item">
    <details
      class="accordion"
      aria-labelledby="system-requirements-heading"
      :name="!props.multiselectable ? 'accordion-collection' : null"
      :open="activeIndexes.includes(index) ? '' : null"
    >
      <summary :id="itemIds[index]" class="accordion__heading">
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
  </div>
</template>
