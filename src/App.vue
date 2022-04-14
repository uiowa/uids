<script setup lang="ts">
import UidsBanner from '@/components/Banner.vue'
import banner_image from '@/assets/images/viewbook/sections/122.jpg'
</script>

<template>
  <uids-banner
    title="We did it!"
    :headline_settings="{

    }"
    :image="banner_image"
  >
    We love doing this stuff.
  </uids-banner>
  <uids-banner
    title="No, we don't want no text"
    :image="banner_image"
  ></uids-banner>
  <uids-banner
    title="No image"
  >
    We can have <a href="https://uiowa.edu">links</a>!
  </uids-banner>
</template>

<style>
@import './assets/base.css';
</style>
