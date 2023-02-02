<script setup lang="ts">
import '../../assets/scss/headings.scss'
import './media.scss'
import { computed } from 'vue'
import Inline from "../inline/inline";

const name = 'uids-media'
const props = defineProps({
  ...Inline.props,
});

const classes = computed(() => {
  let classes: string[] = ['media'];
  Inline.addClass(classes, props);

  return classes;
});

</script>

<template>
  <div :class="classes">
    <img width="768" height="432" alt="A" class=" lazyloaded" data-src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-" data-srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__384_x_216/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=vaWWV7aq 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO- 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1024_x_576/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=CeFE5dp5 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1312_x_738/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=6GKIgefv 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1920_x_1080/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=SbNEbWvi 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__2592_x_1458/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=VVS7ioB7 2592w" data-sizes="(min-width: 768px) calc(50vw - 3.75em), 100vw" sizes="(min-width: 768px) calc(50vw - 3.75em), 100vw" srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__384_x_216/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=vaWWV7aq 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO- 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1024_x_576/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=CeFE5dp5 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1312_x_738/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=6GKIgefv 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1920_x_1080/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=SbNEbWvi 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__2592_x_1458/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=VVS7ioB7 2592w" src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-">
  </div>
</template>
