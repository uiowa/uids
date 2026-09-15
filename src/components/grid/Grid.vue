<template>
  <div :class="classes">
    <div class="list-container__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../scss/layout/_grid.scss'
import { computed } from 'vue';

const props = defineProps({
  /**
   * The type of grid to display, or `list` for the stacked-list arrangement.
   *
   * Every other value is a COLUMN RATIO and renders as `grid--{type}`. `list` is an
   * ARRANGEMENT rather than a ratio and is handled separately below.
   */
  type: {
    type: String,
    default: 'threecol--33-34-33',
  },
})

const classes = computed(() => {
  const classes = [];

  // `list` deliberately emits NO `grid--*` class. Production's row spacing is
  // `.list-container.list-container--list:not([class*="grid-"])` — added 2026-08-21 to
  // src/scss/layout/_grid.scss, mirroring uids_base/scss/components/grid.scss:6-12 —
  // and that `:not()` excludes EVERY `grid--` value, including `grid--onecol`, whose
  // name contains the substring `grid-`. So a one-column GRID and a LIST are not the
  // same thing: only the latter gets the 2rem gap between cards.
  //
  // Until this branch existed, Grid.vue could not produce a list at all: it pushed a
  // `grid--` class unconditionally, so its output was always excluded by that guard.
  // The class itself was supplied only downstream, by uiowa_core.module:1749 on Drupal
  // views — meaning UIDS mandated a pattern (contracts/rules.json
  // `item-list-is-stacked-cards`) that UIDS itself could not render.
  if (props.type === 'list') {
    classes.push('list-container list-container--list');
  }
  else {
    classes.push(`list-container grid--${ props.type }`);
  }

  return classes;
});
</script>
