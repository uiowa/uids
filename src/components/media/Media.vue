<script setup lang="ts">
import '../../scss/components/_media.scss';
import { computed } from 'vue'
import Inline from "../inline/inline";

const name = 'uids-media'
const props = defineProps({
  ...Inline.props,
  type: {
    type: String,
    default: 'image', // default type is 'image'
  },
  enable_autoplay: {
    type: Boolean,
    default: false,
  },
  aspect_ratio: {
    type: String,
    default: '',
  },
});

function getAspectRatio(aspectRatioKey: string) {
  switch (aspectRatioKey) {
    case 'default':
      return '';
    case 'ar_16_9':
      return 'media--16-9';
    case 'ar_21_9':
      return 'media--21-9';
  }
};

const classes = computed(() => {
  let classes: string[] = ['media'];
  let aspect_ratio = getAspectRatio(props.aspect_ratio);

  // Default videos to 16/9 if no aspect ratio is set
  if (props.type === 'video' && !aspect_ratio) {
    aspect_ratio = 'media--16-9';
  }

  if (aspect_ratio) {
    classes.push(aspect_ratio);
  }
  Inline.addClass(classes, props);

  return classes;
});

</script>

<template>
  <div :class="classes">
    <img v-if="type === 'image'" width="768" height="432" alt="A" class="lazyloaded" src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-" />

    <iframe v-else-if="type === 'video'" src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>

    <video v-else-if="type === 'vertical_video'" id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
      <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
      <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
      <p>Video is not Supporting</p>
    </video>

    <video  v-else-if="type === 'remote_video'" loop="loop" muted="muted" width="1300" height="730" poster="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4.png" playsinline="playsinline" autoplay="autoplay" id="video-container-0">
      <source src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4" type="video/mp4">
    </video>

    <div class="video-controls video" v-if="type === 'remote_video'">
      <button class="video-btn video-btn__pause" id="video-btn-pause" v-if="enable_autoplay">
        <span class="element-invisible">Pause</span>
      </button>
      <button class="video-btn video-btn__play" id="video-btn-play" v-else>
        <span class="element-invisible">Play</span>
      </button>
    </div>
  </div>
</template>
