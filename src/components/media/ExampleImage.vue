<script setup>
import '../../scss/components/_media.scss';
const name = 'example-image'
const props = defineProps({
  src: {
    type: String,
    default: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-',
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
