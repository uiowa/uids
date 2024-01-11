<script setup lang="ts">
import './button.scss';
import { computed, useSlots } from 'vue';
import Borderless from '../shared/borderless';
import { ButtonBase } from './button-base.js';
import { className } from '../utlity';
const name = 'uids-v-button'
const props = defineProps(ButtonBase.properties)
window.customElements.define('uids-base-button', ButtonBase);
</script>

<template>
  <uids-base-button
    :url="url"
    :transparent="transparent"
    :size="size"
    :color="color"
    :full="full"
    :light_font="light_font"
    :icon="icon"
    :borderless="borderless"
  >
    <slot></slot>
    <span slot="icon"><slot name="icon"></slot></span>
  </uids-base-button>
</template>
