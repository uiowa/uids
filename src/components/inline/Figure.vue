<script setup lang="ts">
import { computed } from 'vue'
import '../inline/inline.scss'
import Inline from '../inline/inline'

const name = 'uids-figure'
const props = defineProps({
  ...Inline.props,
});

const classes = computed(() => {
  let classes = [];
  Inline.addClass(classes, props);

  return classes;
});
</script>

<template>
  <figure :class="classes" role="group">
    <div>
      <img width="" height="" alt="Ernst, Erika" class=" lazyloaded" data-src="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w" data-srcset="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__384w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=3znFPZ72 384w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w 768w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1024w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=2afxzkLZ 1024w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1312w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=L-k1paKP 1312w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__2592w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=GmyW4wuT 1398w" data-sizes="(min-width: 1024px) calc(25vw - 5em), (min-width: 768px) calc(50vw - 3.75em), 100vw" sizes="(min-width: 1024px) calc(25vw - 5em), (min-width: 768px) calc(50vw - 3.75em), 100vw" srcset="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__384w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=3znFPZ72 384w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w 768w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1024w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=2afxzkLZ 1024w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__1312w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=L-k1paKP 1312w, https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__2592w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=GmyW4wuT 1398w" src="https://pharmacy.uiowa.edu/sites/pharmacy.uiowa.edu/files/styles/no_crop__768w/public/2021-04/2019_08_29-Ernst%2C%20Erika%20-krbaumert-004_0.jpg?itok=tlHZZT1w">
    </div>
    <figcaption>Erika Ernst</figcaption>
  </figure>
</template>
