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
      <uids-logo :healthcare="healthcare" :url="healthcare ? 'https://uihealthcare.org' : 'https://uiowa.edu'" context="header"></uids-logo>
      <h1 v-if="site_name" class="site-name">
        <a v-if="site_url" :href="site_url">{{ site_name }}</a>
        <template v-else>{{ site_name }}</template>
      </h1>
      <div v-if="$slots.default" class="iowa-bar__content">
        <!-- @slot Default slot shows content after the site name. -->
        <slot></slot>
      </div>
    </div>
  </header>
</template>
