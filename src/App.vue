<script setup lang="ts">
import UidsBanner from '@/components/Banner.vue'
import UidsHeadline from '@/components/Headline.vue'
import banner_image from '@/assets/images/viewbook/sections/122.jpg'
</script>

<template>
  <uids-banner
    title="We did it!"
    url="https://uiowa.edu"
    :headline_settings="{
      class: ['headline--underline'],
    }"
    :image="banner_image"
    >We love doing this stuff.
  </uids-banner>

  <uids-banner
    title="No, we don't want no text"
    url="https://uiowa.edu"
    :image="banner_image"
    button_text="Read more"
  ></uids-banner>

  <uids-banner
    title="No image"
  >
    <template #headline>
      <uids-headline>No image</uids-headline>
    </template>
    We can have <a href="https://uiowa.edu">links</a>!
  </uids-banner>

  <!-- Prints out all headline levels -->
  <template v-for="n in 6" :key="n">
    <uids-headline
      :level="'h' + n"
      href="https://uiowa.edu"
      class="headline--uppercase"
    >I'm a headline</uids-headline>
  </template>
</template>

<style lang="scss">
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
@import './assets/base.css';
@import './assets/scss/headings.scss';
@import './assets/scss/paragraph.scss';
@import './assets/scss/lists.scss';
</style>
