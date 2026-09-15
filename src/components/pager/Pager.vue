<script setup lang="ts">
import '../../scss/components/pager.scss';
import { computed } from 'vue';

// Markup mirrors uids_base's pager.html.twig (the production Drupal override):
// nav.pager > visually-hidden heading > ul.pager__items > li.pager__item variants,
// with visually-hidden + aria-hidden label spans inside each link. Links are
// presentational here (href="#..."); Drupal supplies real query-string hrefs.

const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 10,
  },
  // Max page links shown at once — Drupal's pager block defaults to 9.
  quantity: {
    type: Number,
    default: 9,
  },
  heading_id: {
    type: String,
    default: 'pagination-heading',
  },
});

// The visible window of page numbers, clamped like Drupal's template_preprocess_pager.
const pages = computed(() => {
  const q = Math.min(props.quantity, props.total);
  let start = Math.max(1, props.current - Math.floor((q - 1) / 2));
  const end = Math.min(props.total, start + q - 1);
  start = Math.max(1, end - q + 1);
  const list = [];
  for (let p = start; p <= end; p++) {
    list.push(p);
  }
  return list;
});

const showFirst = computed(() => props.current > 1);
const showPrevious = computed(() => props.current > 1);
const showNext = computed(() => props.current < props.total);
const showLast = computed(() => props.current < props.total);
const ellipsisPrevious = computed(() => pages.value[0] > 1);
const ellipsisNext = computed(() => pages.value[pages.value.length - 1] < props.total);
</script>

<template>
  <nav
    class="pager list-container__item--full"
    role="navigation"
    :aria-labelledby="props.heading_id"
  >
    <div :id="props.heading_id" class="visually-hidden">Pagination</div>
    <ul class="pager__items js-pager__items">
      <li v-if="showFirst" class="pager__item pager__item--first">
        <a href="#1" title="Go to first page">
          <span class="visually-hidden">First page</span>
          <span aria-hidden="true">« First</span>
        </a>
      </li>
      <li v-if="showPrevious" class="pager__item pager__item--previous">
        <a :href="'#' + (props.current - 1)" title="Go to previous page" rel="prev">
          <span class="visually-hidden">Previous page</span>
          <span aria-hidden="true">‹ Previous</span>
        </a>
      </li>
      <li v-if="ellipsisPrevious" class="pager__item pager__item--ellipsis" role="presentation">…</li>
      <li
        v-for="page in pages"
        :key="page"
        :class="['pager__item', { 'is-active': page === props.current }]"
      >
        <a
          :href="'#' + page"
          :title="page === props.current ? 'Current page' : 'Go to page ' + page"
          :aria-current="page === props.current ? 'page' : null"
        >
          <span class="visually-hidden">{{ page === props.current ? 'Current page' : 'Page' }}</span>
          {{ page }}
        </a>
      </li>
      <li v-if="ellipsisNext" class="pager__item pager__item--ellipsis" role="presentation">…</li>
      <li v-if="showNext" class="pager__item pager__item--next">
        <a :href="'#' + (props.current + 1)" title="Go to next page" rel="next">
          <span class="visually-hidden">Next page</span>
          <span aria-hidden="true">Next ›</span>
        </a>
      </li>
      <li v-if="showLast" class="pager__item pager__item--last">
        <a :href="'#' + props.total" title="Go to last page">
          <span class="visually-hidden">Last page</span>
          <span aria-hidden="true">Last »</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
