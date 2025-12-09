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
  background: {
    type: String,
    default: '',
    required: false,
  },
  items: {
    type: Array,
    required: true,
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
    'accordion--gold' : props.background,
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
        <h2>
          {{ item.title }}
          <i aria-hidden="true" class="fas fa-chevron-up" role="presentation"></i>
        </h2>
      </summary>
      <div
        class="accordion__content bg--white"
        v-html="item.content"
      ></div>
    </details>
  </div>
</template>
