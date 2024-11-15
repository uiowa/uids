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
      <h2 :id="'accordion-heading-' + index" class="accordion__heading">
        <button
          class="accordion__button"
          :aria-expanded="activeIndexes.includes(index)"
          :aria-controls="'accordion-content-' + index"
          @click="toggleAccordion(index)"
        >
          {{ item.title }}
          <i aria-hidden="true" class="fas" :class="activeIndexes.includes(index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
      </h2>

      <div
        :id="'accordion-content-' + index"
        class="accordion__content"
        v-show="activeIndexes.includes(index)"
        :aria-labelledby="'accordion-heading-' + index"
      >
        <div v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>
