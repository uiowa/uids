<script setup lang="ts">

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  value: {
    type: [String, Boolean, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const checkboxClasses = () => {
  const classes = ['form-type-checkbox', 'form-item'];
  if (props.inline) {
    classes.push('form-type-checkbox--side');
  }
  return classes.join(' ');
};
</script>

<template>
  <div :class="checkboxClasses()">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="value"
    >
    <label :for="id" class="checkbox">
      {{ label }}
    </label>
  </div>
</template>
