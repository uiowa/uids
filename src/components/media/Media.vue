<script setup lang="ts">
import './media.scss'
import { computed, useSlots } from "vue";
import { className } from "../utlity";

const name = 'uids-media'
const props = defineProps({
  /**
   * Text to display in a button.
   */
  link_text: {
    type: String,
  },
})

const slots = useSlots();

const classes = computed(() => {
  let classes = ['media media--circle'];

  return classes;
});

</script>

<template>
  <div :class="classes">
    <img alt="" class="" sizes="(min-width:1310px) 1310px, 100vw" srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/bg-image-square.jpg 384w,https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/bg-image-square.jpg 768w,https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/bg-image-square.jpg 1024w,https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/bg-image-square.jpg 1312w,https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/bg-image-square.jpg 1920w,https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/bg-image-square.jpg 2592w," src="" typeof="foaf:Image">
  </div>
</template>
