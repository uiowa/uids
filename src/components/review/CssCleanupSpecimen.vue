<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  css: { type: String, required: true },
  markup: { type: String, required: true },
});
const emit = defineEmits(['measured']);
const host = ref();
let root;

function render() {
  if (!root) return;
  const style = document.createElement('style');
  style.textContent = props.css.replace(/:root\b/g, ':host') + `
    :host { display: block; font-family: var(--uiowa-typography-body-font-family, sans-serif); }
    .review-surface { padding: 1rem; }
  `;
  const content = document.createElement('div');
  content.innerHTML = props.markup;
  root.replaceChildren(style, content);
  const values = [...root.querySelectorAll('[data-measure]')].map(element => ({
    label: element.dataset.measure,
    color: getComputedStyle(element).color,
  }));
  emit('measured', values);
}

onMounted(() => {
  root = host.value.attachShadow({ mode: 'open' });
  render();
});
watch(() => [props.css, props.markup], render);
</script>

<template><div ref="host"></div></template>
