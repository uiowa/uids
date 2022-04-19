<script setup lang="ts">
import { computed } from 'vue';
const name = 'uids-headine'
defineProps({
  level: { type: String, default: 'h2' },
  headline_class: {
    type: String,
  },
  href: {
    type: String,
  },
  aria_describedby: { type: [String, Boolean], default: false },
})

const getClasses = computed(() => {
  console.log('getting classes')
  let classes = ["headline"];
  // @todo Add other headline classes.
  return classes.join(" ");
})
</script>

<template>
  <component :is="level" :class="getClasses">
    <a v-if="href" :href="href" :aria-describedby="aria_describedby">
      <slot></slot>
    </a>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>

<style lang="scss">
@import '../assets/scss/headings';
@import '../assets/scss/components/headline';
//@import '../../node_modules/@uiowa/uids/src/components/headline/headline.scss';
//@import '../../node_modules/@uiowa/uids/src/components/typography/headings/headings.scss';
.headline__suffix {
  padding-left: .5rem;
}
.headline__prefix {
  padding-right: .5rem;
}
</style>
