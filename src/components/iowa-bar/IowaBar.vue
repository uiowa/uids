<script setup lang="ts">
import {computed} from "vue"
import './iowa-bar.scss'
import UidsLogo from '../logo/Logo.vue'

const name = 'uids-iowa-bar'
const props = defineProps({
  height: {
    type: String,
    default: 'full',
    validator: function(value) {
      return ['full', 'narrow'].indexOf(value) !== -1
    },
  },
  name_position: {
    type: String,
    default: 'inline',
    validator: function(value) {
      return ['below', 'inline'].indexOf(value) !== -1
    },
  },
})

const getClasses = computed(() => ({
  'iowa-bar': true,
  ['iowa-bar--' + props.height]: true,
}))
</script>

<template>
  <header :class="getClasses" data-uids-header>
    <div class="iowa-bar__container">
      <uids-logo></uids-logo>
      <h1 class="site-name" v-if="$slots.default">
        <slot></slot>
      </h1>
      <slot name="top-links"></slot>
    </div>
  </header>
</template>
