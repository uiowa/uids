<script lang="ts">
import { computed, Comment, Fragment, Text, type VNode } from "vue"
import '../../scss/components/brand-bar.scss'
import UidsLogo from '../logo/Logo.vue'

/**
 * Whether slot output has anything to show. A slot passed with only
 * comments, such as a false `v-if`, or blank text counts as empty.
 */
const hasContent = (nodes: VNode[]): boolean => nodes.some((node) => {
  if (node.type === Comment) {
    return false;
  }
  if (node.type === Text) {
    return String(node.children).trim() !== '';
  }
  if (node.type === Fragment) {
    return hasContent(node.children as VNode[]);
  }
  return true;
})

/**
 * The UIDS IOWA Bar is the visual starting point for all
 * branded websites and applications.
 */
export default {
  name: 'uids-iowa-bar',
  components: { UidsLogo },
  props: {
    /**
     * The site name, shown next to the logo.
     */
    site_name: {
      type: String,
      default: '',
    },
    /**
     * URL that the site name links to.
     */
    site_url: {
      type: String,
      default: '',
    },
    /**
     * Determines whether to use the narrow version of the IOWA bar.
     */
    narrow: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines whether to use the healthcare version of the IOWA Logo.
     */
    healthcare: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {

    /**
     * Get computed classes based on properties of the component.
     */
    const getClasses = computed(() => {
      let classes = ['iowa-bar']
      if (props.narrow) {
        classes.push('iowa-bar--narrow')
      }
      if (props.healthcare) {
        classes.push('iowa-bar--healthcare')
      }

      return classes;
    })

    /**
     * Check whether the default slot has content to render.
     */
    const hasDefaultSlot = () => !!slots.default && hasContent(slots.default())

    return {
      getClasses,
      hasDefaultSlot,
    }
  }
}
</script>

<template>
  <header :class="getClasses" data-uids-header>
    <div class="iowa-bar__container">
      <uids-logo :healthcare="healthcare" :url="healthcare ? 'https://uihealthcare.org' : 'https://uiowa.edu'" context="header"></uids-logo>
      <h1 v-if="site_name" class="site-name">
        <a v-if="site_url" :href="site_url">{{ site_name }}</a>
        <template v-else>{{ site_name }}</template>
      </h1>
      <div v-if="hasDefaultSlot()" class="iowa-bar__content">
        <!-- @slot Default slot shows content after the site name. -->
        <slot></slot>
      </div>
    </div>
  </header>
</template>
