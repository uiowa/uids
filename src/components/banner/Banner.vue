<script setup lang="ts">
import { computed, onMounted, useSlots } from 'vue';
import UidsButton from "../button/Button.vue";
import UidsHeadline from '../headline/Headline.vue'
import UidsPseudoButton from '../button/PseudoButton.vue';
import Background from "../shared/background";
import '../../scss/components/banner.scss'
import '../../scss/components/_background.scss'
import '../../assets/js/video.js'
import { applyClickA11y } from '../../assets/js/click-a11y'

const name = 'uids-banner'
const props = defineProps({
  headline: {
    type: Object,
    default: () => ({
      text: '',
      level: 'h2',
      text_style: '',
      size: 'large',
      highlight: false,
      underline: false,
      url: ''
    }),
  },
  pre_title: {
    type: String,
    default: '',
  },
  buttons: {
    type: Array,
    default: () => [],
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
  horizontal_alignment: {
    type: String,
    default: '',
  },
  vertical_alignment: {
    type: String,
    default: '',
  },
  media_overlay_type: {
    type: String,
    default: '',
    validator: function (value) {
      return ['', 'btt', 'ttb', 'ltr'].indexOf(value) !== -1;
    },
  },
  media_overlay_light: {
    type: Boolean,
    default: false,
  },
  media_overlay_gradient_midpoint: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  narrow: {
    type: Boolean,
    default: false,
  },
  mobile_content_below_image: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String,
    default: '',
  },
});

const slots = useSlots();

/**
 * Set banner gradient midpoint percentage.
 */
const bannerStyle = computed(() => {
  const styles = {};
  if (props.media_overlay_gradient_midpoint) {
    styles['--banner-overlay-gradient-midpoint'] = props.media_overlay_gradient_midpoint;
  }
  return styles;
});

/**
 * Main banner classes.
 */
const classes = computed(() => {
  let classes = ['banner'];
  Background.addBackgroundClass(classes, props);

  if (props.buttons.length === 1) {
    classes.push('click-container')
  }

  if (props.height) {
    classes.push(`banner--${props.height}`);
  }

  if (props.mobile_content_below_image === true) {
    classes.push(`banner--stacked`);
  }

  // Narrow container.
  if (props.narrow) {
    classes.push(`banner--narrow`);
  }

  // Horizontal alignment.
  if (props.horizontal_alignment) {
    classes.push(`banner--horizontal-${props.horizontal_alignment}`);
  }

  // Vertical alignment.
  if (props.vertical_alignment) {
    classes.push(`banner--vertical-${props.vertical_alignment}`);
  }

  // Overlay light.
  if (props.media_overlay_light) {
    classes.push(`banner--overlay-light`);
  }

  if (slots.media) {
    if (props.media_overlay_type) {
      classes.push(`banner--overlay-${props.media_overlay_type}`);
    }
  }

  return classes;
});

/**
 * Pre-title classes.
 */
const preTitleClasses = computed(() => {
  const classes = ['headline', 'banner__pre-title'];

  if (props.headline.size) {
    classes.push(`headline--${props.headline.size}`);
  }

  if (props.headline.text_style) {
    switch (props.headline.text_style) {
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
 * Determine if the headline should be linked.
 */
const headlineLink = computed(() => {
  // If multiple URLs are present, do not link the headline.
  if (props.buttons.length > 1) {
    return false;
  }

  return props.buttons[0].url || false;
});

onMounted(() => {
  if (props.buttons.length > 0) {
    applyClickA11y('.click-container:not([data-uids-no-link])');
  }

  // Initialize video.
  const videos = document.querySelectorAll('.media--video');
  videos.forEach((video, index) => {
    new window.UidsVideo(video, index);
  });
});

</script>

<template>
  <div :class="classes":style="bannerStyle">
    <slot name="media"></slot>
    <div class="banner__content">
      <header class="banner__title" v-if="pre_title || headline.text">
        <div :class="preTitleClasses" v-if="pre_title">
          <span class="headline__heading" v-html="pre_title"></span>
        </div>
        <uids-headline
          :level="headline.level"
          :text_style="headline.text_style"
          :highlight="headline.highlight"
          :underline="headline.underline"
          :class="`headline--${headline.size}`"
        >
          <a v-if="headlineLink" :href="headlineLink" class="click-target">
            <span class="headline__heading" v-html="headline.text"></span>
          </a>
          <span v-else class="headline__heading" v-html="headline.text"></span>
        </uids-headline>
      </header>

      <div class="banner__text" v-if="$slots.default" >
        <slot></slot>
      </div>

      <footer class="banner__action" v-if="buttons.length > 0 || $slots.buttons">
        <slot name="buttons">
          <!-- Render pseudo button when only url is present -->
          <uids-pseudo-button
            v-if="buttons.length === 1"
            size="medium"
            :color="button_color"
            :light_font="button_light_font"
            v-html="buttons[0].label">
          </uids-pseudo-button>
          <div v-else-if="buttons.length > 0" class="bttn--row">
            <uids-button
              v-for="(button, i) in buttons"
              :url="button.url"
              size="medium"
              :color="button_color"
              :light_font="button_light_font"
              ><span v-html="button.label"></span>
            </uids-button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>
