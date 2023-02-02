<script setup lang="ts">
import { computed } from 'vue'
import '../inline/inline.scss'
import Inline from '../inline/inline'

const name = 'uids-figure'
const props = defineProps({
  ...Inline.props,
});

const classes = computed(() => {
  let classes: string[] = [];
  Inline.addClass(classes, props);

  return classes;
});
</script>

<template>
  <figure :class="classes" role="group">
    <div>
      <div>
        <img width="1024" height="439" alt="Old capitol building with flowers" class=" lazyloaded" data-src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1024_x_439/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=dMS003nN" data-srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__384_x_165/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=DZJ6MDRp 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__768_x_329/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=gXTnlsnZ 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1024_x_439/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=dMS003nN 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1312_x_562/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=Go0E2OtS 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1920_x_823/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=EAmMF81e 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__2592_x_1111/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=UuayvW1l 2592w" data-sizes="(min-width:1310px) 1310px, 100vw" sizes="(min-width:1310px) 1310px, 100vw" srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__384_x_165/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=DZJ6MDRp 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__768_x_329/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=gXTnlsnZ 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1024_x_439/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=dMS003nN 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1312_x_562/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=Go0E2OtS 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1920_x_823/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=EAmMF81e 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__2592_x_1111/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=UuayvW1l 2592w" src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/ultrawide__1024_x_439/public/2020-09/2018_08_16-Old%20Capitol%20with%20Flowers-tschoon-004.jpg?h=c3635fa2&amp;itok=dMS003nN">
      </div>
    </div>
    <figcaption>Erika Ernst</figcaption>
  </figure>
</template>
