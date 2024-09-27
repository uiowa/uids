<script lang="ts">
import { computed } from "vue"
import './brand-footer.scss'
import UidsLogo from '../logo/Logo.vue'

export default {
  name: 'uids-iowa-footer',
  components: { UidsLogo },
  props: {
    second_row_content: {
      type: String,
      default: '',
    },
    third_row_content: {
      type: String,
      default: '',
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
        <uids-logo></uids-logo>
        <!-- @slot Default slot shows content next to the logo. -->
        <slot></slot>
        <div v-if="second_row_content">
          <slot name="second_row_content"></slot>
        </div>
          <slot name="third_row_content"></slot>
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
            <li>
              <a href="https://nativeamericancouncil.org.uiowa.edu">UI Indigenous Land Acknowledgement</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
