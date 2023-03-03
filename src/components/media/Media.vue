<script setup lang="ts">
import '../../assets/scss/headings.scss'
import './media.scss'
import { computed } from 'vue'
import Inline from "../inline/inline";

const name = 'uids-media'
const props = defineProps({
  ...Inline.props,
  type: {
    type: String,
    default: 'image',
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
      break;
    case 'ar_16_9':
      return 'media--16-9';
      break;
    case 'ar_21_9':
      return 'media--21-9';
      break;
  }
};

const classes = computed(() => {
  let classes: string[] = ['media'];
  let aspect_ratio = getAspectRatio(props.aspect_ratio);

  // Default videos to 16/9.
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
    <img v-if="type === 'image'" width="768" height="432" alt="A" class=" lazyloaded" data-src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-" data-srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__384_x_216/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=vaWWV7aq 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO- 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1024_x_576/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=CeFE5dp5 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1312_x_738/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=6GKIgefv 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1920_x_1080/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=SbNEbWvi 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__2592_x_1458/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=VVS7ioB7 2592w" data-sizes="(min-width: 768px) calc(50vw - 3.75em), 100vw" sizes="(min-width: 768px) calc(50vw - 3.75em), 100vw" srcset="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__384_x_216/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=vaWWV7aq 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO- 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1024_x_576/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=CeFE5dp5 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1312_x_738/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=6GKIgefv 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1920_x_1080/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=SbNEbWvi 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__2592_x_1458/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=VVS7ioB7 2592w" src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-">
    <iframe v-else-if="type === 'video'" src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    <video v-else-if="type === 'vertical_video'" id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls="">
      <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
      <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
      <p>Video is not Supporting</p>
    </video>
  </div>
</template>
