<script setup>
import '../../scss/components/_media.scss';
const name = 'example-image'
const props = defineProps({
  src: {
    type: String,
    default: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg',
  },
  height: {
    type: Number,
    default: 432,
  },
  width: {
    type: Number,
    default: 768,
  },
});
</script>

<template>
  <div class="media media--image">
    <img :width="width" :height="height" alt="A" class="lazyloaded" :src="src" />
  </div>
</template>

<style scoped>

</style>
