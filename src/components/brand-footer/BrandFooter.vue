<script lang="ts">
import '../../scss/components/brand-footer.scss'
import UidsLogo from '../logo/Logo.vue'

export default {
  name: 'uids-iowa-footer',
  components: { UidsLogo },
  props: {
    /**
     * Gates the parent_site_title slot: the slot only renders when this prop
     * is truthy. The prop's value itself is never rendered — content comes
     * from the slot. (Intentional; see contracts/brand-footer.json.)
     */
    parent_site_title: {
      type: String,
      default: '',
    },
    healthcare: {
      type: Boolean,
      default: false,
    },

  },
  setup() {
    const getYear = new Date().getFullYear();

    return {
      getYear,
    }
  }
}
</script>

<template>
  <footer class="footer">
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
              <a href="https://policy.uiowa.edu/community-policies/nondiscrimination-statement">UI Nondiscrimination Statement</a>
            </li>
            <li>
              <a href="https://accessibility.uiowa.edu/">Accessibility</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
