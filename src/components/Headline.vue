<script setup lang="ts">
const name = 'uids-headine'
defineProps({
  text: { type: String, required: true },
  level: { type: String, default: 'h2' },
  headline_class: {
    type: String,
  },
  href: {
    type: String,
  },
  aria_describedby: { type: [String, Boolean], default: false },
})
</script>

<template>
  <component :is="level">
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
