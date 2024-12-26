<script lang="ts">
import { computed } from "vue"
import '../../scss/components/brand-footer.scss'
import UidsLogo from '../logo/Logo.vue'

export default {
  name: 'uids-iowa-footer',
  components: { UidsLogo },
  props: {
    parent_site_title: {
      type: String,
      default: '',
    },
    contact_info: {
      type: String,
      default: '',
    },
    healthcare: {
      type: Boolean,
      default: false,
    },

  },
  setup(props, context) {
    /**
     * Get computed classes based on properties of the component.
     */
    const getYear = new Date().getFullYear();

    const getClasses = computed(() => {
      let classes = ['footer']
      return classes;
    })

    return {
      getClasses,
      getYear,
    }
  }
}
</script>

<template>
  <footer :class="getClasses">
    <div class="footer__container footer__container--flex">
      <div class="footer__links footer__links--contact">
        <uids-logo :healthcare="healthcare" context="footer"></uids-logo>
        <!-- @slot Default slot shows content next to the logo. -->
        <slot></slot>
        <div v-if="parent_site_title">
          <slot name="parent_site_title"></slot>
        </div>
          <slot name="contact_info"></slot>
        <div class="socket">
          <ul class="socket__menu">
            <li>© {{ getYear }} The University of Iowa</li>
            <li>
              <a href="https://uiowa.edu/privacy">Privacy Notice</a>
            </li>
            <li>
              <a href="https://opsmanual.uiowa.edu/community-policies/nondiscrimination-statement">UI Nondiscrimination Statement</a>
            </li>
            <li>
              <a href="https://uiowa.edu/accessibility">Accessibility</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
