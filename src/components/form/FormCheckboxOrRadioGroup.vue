<script setup lang="ts">
import UidsFormFieldset from './FormFieldset.vue';
import {useSlots} from "vue";

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'radio'
  },
  required: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
  },
});

const slots = useSlots();
</script>

<template>
  <uids-form-fieldset :label="label" :required="required">
    <template v-if="!$slots.default">
      <div class="form-item" :class="'form-item--'+type" v-for="item in items" :key="item.id">
        <input
          :id="item.id"
          :type="type"
          :name="item.name"
          :value="item.value"
          :class="{
            'form--error': item.error,
          }"
          :disabled="item.disabled"
          :checked="item.checked"
        >
        <label :for="item.id">
          {{ item.label }}
        </label>
      </div>
    </template>
    <slot v-else></slot>
  </uids-form-fieldset>
</template>
