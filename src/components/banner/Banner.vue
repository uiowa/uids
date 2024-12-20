<script setup lang="ts">
import { computed, onMounted, useSlots } from 'vue';
import UidsButton from "../button/Button.vue";
import UidsHeadline from '../headline/Headline.vue'
import UidsMedia from '../media/Media.vue'
import UidsPseudoButton from '../button/PseudoButton.vue';
import Background from "../shared/background";
import Media from '../shared/media'
import '../../scss/components/banner.scss'
import '../../scss/components/_background.scss'
import '../../assets/js/video.js'
import { applyClickA11y } from '../../assets/js/click-a11y'

const name = 'uids-banner'
const props = defineProps({
  url: {
    type: String,
  },
  url_2: {
    type: String,
  },
  url_3: {
    type: String,
  },
  button_label: {
    type: String,
  },
  button_label_2: {
    type: String,
  },
  button_label_3: {
    type: String,
  },
  button_icon: {
    type: String,
    default: '',
  },
  button_color: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary', 'transparent'].indexOf(value) !== -1;
    },
  },
  button_light_font: {
    type: Boolean,
    default: false,
  },
  headline_size: {
    type: String,
    default: '',
  },
  headline_style: {
    type: String,
    default: '',
  },
  horizontal_alignment: {
    type: String,
    default: '',
  },
  vertical_alignment: {
    type: String,
    default: '',
  },
  gradient: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  mobile_content_below_image: {
    type: Boolean,
    default: false,
  },
  enable_autoplay: {
    type: Boolean,
    default: false,
  },
  media_type: {
    type: String,
    default: '',
  },
  ...Background.props,
  ...Media.props,
});

const slots = useSlots();

/**
 * Main banner classes.
 */
const classes = computed(() => {
  let classes = ['banner'];
  Background.addBackgroundClass(classes, props);

  if (props.url || props.url_2) {
    classes.push('click-container')
  }

  if (props.gradient) {
    classes.push(`banner--gradient-${props.gradient}`);
  }

  if (props.height) {
    classes.push(`banner--${props.height}`);
  }

  if (props.media_type) {
    classes.push(`banner--${props.media_type}`);
  }

  if (props.mobile_content_below_image === true) {
    classes.push(`banner--stacked`);
  }

  // Horizontal alignment.
  if (props.horizontal_alignment === 'center') {
    classes.push('banner--horizontal-center');
  } else if (props.horizontal_alignment === 'left') {
    classes.push('banner--horizontal-left', 'banner--gradient-left');
  } else {
    classes.push('banner--gradient-bottom');
  }

  // Vertical alignment.
  if (props.vertical_alignment === 'center') {
    classes.push('banner--vertical-center');
  } else if (props.vertical_alignment === 'bottom') {
    classes.push('banner--vertical-bottom');
  }

  // Add gradient-bottom unless horizontal alignment is 'left'.
  if (props.horizontal_alignment !== 'left') {
    classes.push('banner--gradient-bottom');
  }

  return classes;
});

/**
 * Headline classes.
 */
const headlineClasses = computed(() => {
  const classes = [];

  if (props.headline_size) {
    classes.push(`headline--${props.headline_size}`);
  }

  if (props.gradient === 'dark') {
    classes.push('headline--negative');
  } else if (props.gradient === 'light') {
    classes.push('headline--positive');
  }

  if (props.headline_style) {
    switch (props.headline_style) {
      case 'uppercase-highlight':
        classes.push('headline--uppercase', 'headline--highlight');
        break;
      case 'serif-highlight':
        classes.push('headline--serif', 'headline--highlight');
        break;
      case 'uppercase':
        classes.push('headline--uppercase');
        break;
      case 'serif':
        classes.push('headline--serif');
        break;
    }
  }

  return classes;
});

/**
 * Determine the linked element.
 */
const linkedElement = computed(() => {
  if (!props.url && !props.url_2 && !props.url_3) {
    return null;
  }

  if (slots.title) {
    return 'title';
  }

  if (props.button_label) {
    return 'button';
  }

  if (slots.media) {
    return 'image';
  }

  return 'button';
});

/**
 * Determine if the headline should be linked.
 */
const headlineLink = computed(() => {
  // If multiple URLs are present, do not link the headline.
  if (props.url && (props.url_2 || props.url_3)) {
    return false;
  }

  if (props.url) {
    return props.url;
  }

  if (props.url_2) {
    return props.url_2;
  }

  if (props.url_3) {
    return props.url_3;
  }

  return false;
});

onMounted(() => {
  if (props.url || props.url_2) {
    applyClickA11y('.click-container:not([data-uids-no-link])');
  }

  // Initialize video.
  const videos = document.querySelectorAll('.banner__image.media--video');
  videos.forEach((video, index) => {
    new window.UidsVideo(video, index);
  });
});

</script>

<template>
  <div :class="classes">
    <div class="banner__image" :class="{ 'media--video': media_type === 'remote_video', 'media--image': media_type !== 'video'}">
      <uids-media
        :type="media_type"
        :enable_autoplay="enable_autoplay"
      >
        <slot name="media"></slot>
      </uids-media>

    </div>
    <div class="banner__container">
      <div class="banner__content">
        <header class="banner__title" v-if="$slots.title || $slots.pre_title">
          <div :class="[headlineClasses, 'banner__pre-title', 'headline']" v-if="$slots.pre_title">
            <slot name="pre_title"></slot>
          </div>
          <uids-headline
            :text_style="headline_style"
            :class="headlineClasses"
          >
            <a v-if="headlineLink" :href="headlineLink" class="click-target">
              <slot name="title"></slot>
            </a>
            <template v-else>
              <slot name="title"></slot>
            </template>
          </uids-headline>
        </header>

        <div class="banner__text" v-if="$slots.content" >
          <slot name="content"></slot>
        </div>

        <footer class="banner__action" v-if="button_label || button_label_2 || button_label_3" >
          <slot name="buttons">
            <!-- Render buttons when multiple URLs are present -->
            <div v-if="url && (url_2 || url_3)" class="bttn--row">
              <uids-button
                :url="url"
                :color="button_color"
                :light_font="button_light_font"
                size="medium"
                v-if="url && button_label">{{ button_label }}</uids-button>

              <uids-button
                :url="url_2"
                :color="button_color"
                :light_font="button_light_font"
                size="medium"
                v-if="url_2 && button_label_2">{{ button_label_2 }}</uids-button>

              <uids-button
                :url="url_3"
                :color="button_color"
                :light_font="button_light_font"
                size="medium"
                v-if="url_3 && button_label_3">{{ button_label_3 }}</uids-button>
            </div>

            <!-- Render pseudo button when only url is present -->
            <uids-pseudo-button
              :color="button_color"
              :light_font="button_light_font"
              size="medium"
              v-else-if="url && !url_2 && !url_3">
              {{ button_label }}
            </uids-pseudo-button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>
