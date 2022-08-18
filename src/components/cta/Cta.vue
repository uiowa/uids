<script setup lang="ts">
import './cta.scss'
import '../background/background.scss'
import '../media/media.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
import Borderless from "../shared/borderless";
import { className } from "../utlity";

const name = 'uids-cta'
const props = defineProps({
  /**
   * A url to the resource that the card represents.
   */
  url: {
    type: String,
  },

  /**
   * Text to display in a button.
   */
  link_text: {
    type: String,
  },
});

const slots = useSlots();

const classes = computed(() => {
  let classes = ['cta__wrapper'];

  return classes;
});


</script>

<template>
  <div :class="classes">
      <div class="cta__container">

        <header class="cta__title">
          <uids-headline :url="url">
            <!-- @slot The title of the card. HTML is allowed. -->
            <slot name="title"></slot>
          </uids-headline>
        </header>

        <div class="cta__content">
          <!-- @slot The callout details of the card.. -->
          <slot name="details">Details</slot>
        </div>

        <footer class="cta__link" v-if="url">
          <uids-button :url="url" size="medium">
            <slot name="label">{{ link_text }}</slot>
          </uids-button>
        </footer>

      </div>
    </div>
</template>
