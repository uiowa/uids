<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  css: { type: String, required: true },
  markup: { type: String, required: true },
  defaults: { type: Boolean, default: false },
  defaultScope: { type: String, default: 'all' },
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
    .review-defaults--all .stat .stat__title,
    .review-defaults--title .stat .stat__title,
    .review-defaults--all .stat .stat__content,
    .review-defaults--supporting .stat .stat__content,
    .review-defaults--all .stat .stat__description,
    .review-defaults--supporting .stat .stat__description { color: var(--uiowa-color-text); }
    .review-defaults--all table tbody a { color: var(--uiowa-color-link); }
  `;
  const content = document.createElement('div');
  content.className = props.defaults ? `review-defaults--${props.defaultScope}` : '';
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
watch(() => [props.css, props.markup, props.defaults, props.defaultScope], render);
</script>

<template><div ref="host"></div></template>
