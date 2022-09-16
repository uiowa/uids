<script setup lang="ts">
import './cta.scss'
import '../background/background.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
import Borderless from "../shared/borderless";
import { className } from "../utlity";

const name = 'uids-cta'
const props = defineProps({
  url: {
    type: String,
  },
  details: {
    type: String,
  },
  button_label: {
    type: String,
  },
  button_icon: {
    type: String,
    default: '',
  },
  ...Background.props,
});



const slots = useSlots();

const classes = computed(() => {
  let classes = ['cta__wrapper'];

  Background.addBackgroundClass(classes, props);

  return classes;
});


</script>

<template>
  <div :class="classes">
      <div class="cta__container">


          <uids-headline v-if="$slots.title" uppercase="true">
            <slot name="title"></slot>
          </uids-headline>


        <div class="cta__content" v-if="details" >
          <slot name="details">{{ details }}</slot>
        </div>

        <footer class="cta__link" v-if="button_label" >
          <uids-button :url="url" size="medium">
            <slot name="button_label">{{ button_label }}</slot>
            <slot name="button_icon"></slot>
          </uids-button>
        </footer>

      </div>
    </div>
</template>
