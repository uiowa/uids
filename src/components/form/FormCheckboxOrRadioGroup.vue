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
    <div class="form-item" :class="'form-type-'+type" v-for="item in items" v-if="!$slots.default">
      <input
        :id="item.id"
        :type="type"
        :name="item.name"
        :value="item.value"
        :class="{
          error: item.error,
        }"
        :disabled="item.disabled"
        :checked="item.checked"
      >
      <label :for="item.id">
        {{ item.label }}
      </label>
    </div>
    <slot v-else></slot>
  </uids-form-fieldset>
</template>
