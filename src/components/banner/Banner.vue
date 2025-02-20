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
  headline_size: {
    type: String,
    default: '',
  },
  headline_style: {
    type: String,
    default: '',
  },
  headline_highlight: {
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
  gradient: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1;
    },
  },
  height: {
    type: String,
    default: '',
  },
  extra_padding: {
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

/**
 * Main banner classes.
 */
const classes = computed(() => {
  let classes = ['banner'];
  Background.addBackgroundClass(classes, props);

  if (props.buttons.length === 1) {
    classes.push('click-container')
  }

  if (props.gradient && props.background === '') {
    classes.push(`banner--gradient-${props.gradient}`);
  }

  if (props.height) {
    classes.push(`banner--${props.height}`);
  }

  if (props.extra_padding) {
    classes.push(`banner--extra-padding`);
  }

  if (props.mobile_content_below_image === true) {
    classes.push(`banner--stacked`);
  }

  // Horizontal alignment.
  if (props.horizontal_alignment) {
    classes.push(`banner--horizontal-${props.horizontal_alignment}`);
  }

  // Vertical alignment.
  if (props.vertical_alignment) {
    classes.push(`banner--vertical-${props.vertical_alignment}`);
  }

  return classes;
});

/**
 * Pre-title classes.
 */
const preTitleClasses = computed(() => {
  const classes = ['headline', 'banner__pre-title'];

  if (props.headline_size) {
    classes.push(`headline--${props.headline_size}`);
  }

  if (props.headline_style) {
    switch (props.headline_style) {
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
  <div :class="classes">
    <slot name="media"></slot>
    <div class="banner__content">
      <header class="banner__title" v-if="$slots.title || $slots.pre_title">
        <div :class="preTitleClasses" v-if="$slots.pre_title">
          <slot name="pre_title"></slot>
        </div>
        <uids-headline
          :text_style="headline_style"
          :highlight="headline_highlight"
          :class="`headline--${props.headline_size}`"
        >
          <a v-if="headlineLink" :href="headlineLink" class="click-target">
            <slot name="title"></slot>
          </a>
          <template v-else>
            <slot name="title"></slot>
          </template>
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
