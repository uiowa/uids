<script setup lang="ts">

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Boolean, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="form-type-radio form-item">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
    >
    <label :for="id" class="radio">
      {{ label }}
    </label>
  </div>
</template>
