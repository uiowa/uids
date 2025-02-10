<script setup>
import '../../scss/components/_media.scss';
const name = 'example-image'
const props = defineProps({
  src: {
    type: String,
    //default: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg',
    default: 'https://default.prod.drupal.uiowa.edu/sites/default/files/styles/ultrawide__2592_x_1111/public/2020-10/Block-IOWA-GOLD-ffcd00_14_1.png',
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
  <div class="media--image">
    <img :width="width" :height="height" alt="A" class="lazyloaded" :src="src" />
  </div>
</template>

<style scoped>

</style>
