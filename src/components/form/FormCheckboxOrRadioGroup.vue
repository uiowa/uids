<script setup lang="ts">
import UidsFormFieldset from './FormFieldset.vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'radio'
  },
  items: {
    type: Array,
  }
});
</script>

<template>
  <uids-form-fieldset :label="label">
    <div class="form-item" :class="'form-type-'+type" v-for="item in items">
      <input
        :id="item.id"
        :type="type"
        :name="item.name"
        :value="item.value"
      >
      <label :for="item.id">
        {{ item.label }}
      </label>
    </div>
  </uids-form-fieldset>
</template>
