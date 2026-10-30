<script lang="ts">
import { computed } from "vue"
import '../../scss/components/brand-bar.scss'
import UidsLogo from '../logo/Logo.vue'

/**
 * The UIDS IOWA Bar is the visual starting point for all
 * branded websites and applications.
 */
export default {
  name: 'uids-iowa-bar',
  components: { UidsLogo },
  props: {
    /**
     * Determines whether to use the narrow version of the IOWA bar.
     */
    narrow: {
      type: Boolean,
      default: false,
    },
    healthcare: {
      type: Boolean,
      default: false,
    },
    /**
     * The site name, shown next to the logo.
     */
    site_name: {
      type: String,
      default: '',
    },
    /**
     * Optional URL that the site name links to.
     */
    site_url: {
      type: String,
      default: '',
    },
  },
  setup(props) {

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

    return {
      getClasses,
    }
  }
}
</script>

<template>
  <header :class="getClasses" data-uids-header>
    <div class="iowa-bar__container">
      <uids-logo :healthcare="healthcare" context="header"></uids-logo>
      <h1 v-if="site_name" class="site-name">
        <a v-if="site_url" :href="site_url">{{ site_name }}</a>
        <template v-else>{{ site_name }}</template>
      </h1>
      <!-- @slot Default slot shows content after the site name. -->
      <slot></slot>
    </div>
  </header>
</template>
