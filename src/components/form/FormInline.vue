<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss';
import UidsButton from '../button/Button.vue';


const props = defineProps({
  collapsible: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  flex: {
    type: Boolean,
    default: false,
  }
});

const filtersEl = computed(() => {
  if (props.collapsible) {
    return 'details';
  }
  return 'fieldset';
})

</script>
<template>
  <component :is="filtersEl" class="form--flex element--margin__bottom form--filter__filters--details">
    <template v-if="label">
      <summary role="button" aria-controls="edit-secondary" aria-expanded="true" v-if="collapsible" class="form--filter__filters--label" v-html="label"></summary>
      <legend v-else class="form--filter__filters--label" v-html="label"></legend>
    </template>
    <div class="details-wrapper" v-if="collapsible">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </component>
</template>
