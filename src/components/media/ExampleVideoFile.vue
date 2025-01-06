<script setup>
import '../../scss/components/_media.scss';
const name = 'example-video-file'
</script>

<template>
  <div class="media--video">
    <video loop="loop" muted="muted" width="1300" height="730" poster="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4.png" playsinline="playsinline" autoplay="autoplay" id="video-container-0">
      <source src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4" type="video/mp4">
    </video>

    <div class="video-controls video">
      <button class="video-btn video-btn__pause" id="video-btn-pause" v-if="enable_autoplay">
        <span class="element-invisible">Pause</span>
      </button>
      <button class="video-btn video-btn__play" id="video-btn-play" v-else>
        <span class="element-invisible">Play</span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
