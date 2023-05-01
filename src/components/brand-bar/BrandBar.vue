<script lang="ts">
import { computed } from "vue"
import './brand-bar.scss'
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

  },
  setup(props, context) {
    /**
     * Get computed classes based on properties of the component.
     */
    const getClasses = computed(() => {
      let classes = ['iowa-bar']
      if (props.narrow || context.slots.second_row_content) {
        classes.push('iowa-bar--narrow')
      }

      return classes;
    })

    const showBottomBar = computed(() => {
      return context.slots.parent_title && context.slots.parent_title().length || context.slots.bottom_content && context.slots.bottom_content().length
    })

    return {
      getClasses,
      showBottomBar,
    }
  }
}
</script>

<template>
  <header :class="getClasses" data-uids-header>
    <div class="iowa-bar__container">
      <uids-logo></uids-logo>
      <!-- @slot Default slot shows content next to the logo. -->
      <slot></slot>
      <slot name="top_link_content"></slot>
    </div>
    <div class="iowa-bar__below" v-if="$slots.second_row_content">
      <div class="iowa-bar__container">
        <slot name="second_row_content"></slot>
      </div>
    </div>
  </header>
</template>
