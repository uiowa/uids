<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss';
import UidsButton from '../button/Button.vue';


const props = defineProps({
  collapsible: {
    type: Boolean,
    default: false,
  },
});

const filtersEl = computed(() => {
  if (props.collapsible) {
    return 'details';
  }
  return 'div';
})

</script>
<template>
  <div class="form--filter__filters--wrapper element--margin__bottom">
    <div class="form--filter__filters--label" v-if="!collapsible"><span>Filters</span></div>
    <component :is="filtersEl" class="form--filter__filters">

      <summary role="button" aria-controls="edit-secondary" aria-expanded="true" v-if="collapsible">
        Filters
      </summary>

      <slot></slot>
    </component>
  </div>
</template>
