<script setup lang="ts">
import '../../scss/components/banner.scss'
import '../../scss/components/_background.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, onMounted, useSlots } from 'vue';
import UidsButton from "../button/Button.vue";
import Background from "../shared/background";
import Media from '../shared/media'
import Borderless from "../shared/borderless";
import { className } from "../utlity";
import { applyClickA11y } from '../../assets/js/click-a11y'
import UidsPseudoButton from '../button/PseudoButton.vue';

const name = 'uids-banner'
const props = defineProps({
  /**
   * Title style for the headline.
   */
  headline_size: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'large', 'medium', 'small'].includes(value)
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
  },
  content_position: {
    type: String,
    default: '',
  },
  gradient: {
    type: String,
    default: '',
    validator: (value: string) => ['dark', 'light'].includes(value),
  },
  headline_style: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  remove_margin: {
    type: Boolean,
    default: false,
  },
  mobile_content_below_image: {
    type: Boolean,
    default: false,
  },
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
  ...Background.props,
  ...Media.props,
});

const slots = useSlots();

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

  if (props.mobile_content_below_image === true) {
    classes.push(`banner--stacked`);
  }

  switch (props.content_position) {
    case 'center-center':
      classes.push('banner--vertical-center', 'banner--horizontal-center', 'banner--gradient-bottom');
      break;
    case 'center-bottom':
      classes.push('banner--vertical-bottom', 'banner--horizontal-center', 'banner--gradient-bottom');
      break;
    case 'left-center':
      classes.push('banner--vertical-center', 'banner--horizontal-left', 'banner--gradient-left');
      break;
    case 'left-bottom':
      classes.push('banner--vertical-bottom', 'banner--horizontal-left', 'banner--gradient-left');
      break;
    default:
      classes.push('banner--vertical-center', 'banner--horizontal-left', 'banner--gradient-left');
  }

  return classes;
});

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
 * Print the URL if it should be attached to the headline and false otherwise.
 */
const headlineLink = computed(() => {
  // If multiple URLs are present, do not link the headline.
  if (props.url && (props.url_2 || props.url_3)) {
    return false;
  }

  // If only the first URL is present, link the headline to it.
  if (props.url) {
    return props.url;
  }

  // If only the second URL is present, link the headline to it.
  if (props.url_2) {
    return props.url_2;
  }

  // If only the third URL is present, link the headline to it.
  if (props.url_3) {
    return props.url_3;
  }

  return false;
});


const buttonClasses = computed(() => {
  const classes = [];

  if (props.button_color) {
    classes.push(`bttn--${props.button_color}`);
  }

  return classes;
});

onMounted(() => {
  if (props.url || props.url_2) {
    applyClickA11y('.click-container:not([data-uids-no-link])');
  }
});

</script>

<template>
  <div :class="classes">
    <div class="banner__image">
      <slot name="media"></slot>
    </div>
    <div class="banner__container">
      <div class="banner__content">
        <header class="banner__title" v-if="$slots.title || title">
          <uids-headline
            :text_style="headline_style"
            :class="headlineClasses"
          >
            <a v-if="headlineLink" :href="headlineLink" class="click-target">
              <slot name="title">{{ title }}</slot>
            </a>
            <template v-else>
              <slot name="title">{{ title }}</slot>
            </template>
          </uids-headline>
        </header>

        <div class="banner__text" v-if="content" >
          <slot name="content">{{ content }}</slot>
        </div>

        <footer class="banner__action" v-if="button_label || button_label_2 || button_label_3" >
          <!-- Render buttons when multiple URLs are present -->
          <div v-if="url && (url_2 || url_3)" class="bttn--row">
            <uids-button
              :class="['bttn', ...buttonClasses]"
              :url="url"
              :no_default_classes="true"
              size="medium"
              v-if="url && button_label">
              <slot name="button_label">{{ button_label }}</slot>
              <slot name="button_icon"></slot>
            </uids-button>

            <uids-button
              :class="['bttn', ...buttonClasses]"
              :url="url_2"
              :no_default_classes="true"
              size="medium"
              v-if="url_2 && button_label_2">
              {{ button_label_2 }}
              <slot name="button_icon"></slot>
            </uids-button>

            <uids-button
              :class="['bttn', ...buttonClasses]"
              :url="url_3"
              :no_default_classes="true"
              size="medium"
              v-if="url_3 && button_label_3">
              {{ button_label_3 }}
              <slot name="button_icon"></slot>
            </uids-button>
          </div>

          <!-- Render pseudo button when only url is present -->
          <uids-pseudo-button
            :class="buttonClasses"
            v-else-if="url && !url_2 && !url_3">
            {{ button_label }}
          </uids-pseudo-button>
        </footer>
      </div>
    </div>
  </div>
</template>
