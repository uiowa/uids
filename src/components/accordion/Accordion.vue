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
});

const activeIndexes = ref<number[]>([]);

const toggleAccordion = (index: number) => {
  if (props.multiselectable) {
    if (activeIndexes.value.includes(index)) {
      activeIndexes.value = activeIndexes.value.filter(i => i !== index);
    } else {
      activeIndexes.value.push(index);
    }
  } else {
    if (activeIndexes.value.includes(index)) {
      activeIndexes.value = [];
    } else {
      activeIndexes.value = [index];
    }
  }
};

const accordionClasses = computed(() => {
  return {
    'accordion': true,
    'accordion--multi': props.multiselectable,
  };
});
</script>

<template>
  <div :class="accordionClasses" role="tablist" :aria-multiselectable="props.multiselectable">
  <div v-for="(item, index) in props.items" :key="index" class="accordion__item">
    <details
      class="accordion"
      aria-labelledby="system-requirements-heading"
      :name="props.multiselectable ? 'accordion-collection' : null"
    >
      <summary :id="'accordion-heading-' + index" class="accordion__heading">
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
