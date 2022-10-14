<script setup lang="ts">
import './card.scss'
import '../background/background.scss'
import '../media/media.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";
import UidsPseudoButton from "../button/PseudoButton.vue";
import Background from "../shared/background";
import Borderless from "../shared/borderless";
import Media from "../shared/media";
import { className } from "../utlity";

const name = 'uids-card'
const props = defineProps({
  /**
   * A url to the resource that the card represents.
   */
  url: {
    type: String,
  },

  /**
   * Text to display in a button.
   */
  link_text: {
    type: String,
  },

  /**
   * Alignment of text content.
   */
  centered: {
    type: Boolean,
  },

  /**
   * Include an outline around the card.
   */
  ...Borderless.props,

  ...Background.props,

  ...Media.props,

  /**
   * Align media element to the left or right.
   */
  media_align: {
    type: String,
    default: '',
    validator: (value) => {
      return ['media-left', 'media-right'].indexOf(value) !== -1;
    },
  },

  /**
   * Add padding around the entirety of the contents of the card.
   * **Note** this has no effect when paired with the borderless option.
   */
  media_padded: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots();

const classes = computed(() => {
  let classes = ['card'];
  ['centered', 'media_padded'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`card--${ className(prop) }`);
    }
  });
  if (props.media_align) {
    classes.push(`card--${ className(props.media_align)}`);
  }

  Background.addBackgroundClass(classes, props);

  Borderless.addBorderlessClass(classes, props);

  if(props.url) {
    classes.push('click-container');
  }

  return classes;
});

const mediaClasses = computed(() => {
  let classes = ['media'];

  Media.addMediaClasses(classes, props);

  return classes;
});

/**
 * Determine the linked element.
 */
const linkedElement = computed(() => {
  // Do we have a url.
  if (!props.url) {
    return null;
  }
  // Do we have a title.
  if (!slots.title) {
    // Button is url.
    return 'button';
  }

  // Otherwise, title is url.
  return 'title';
});

/**
 * Print the URL if it should be attached to the headline and false otherwise.
 */
const headlineLink = computed(() => {
  if (linkedElement.value === 'title') {
    return props.url;
  }
  return false;
});

/**
 * Print card__details if details, subtitle or meta are available.
 */
const detailsElement = computed(() => {
  // Do we have details, subtitle or meta?
  if (slots.details || slots.subtitle || slots.meta) {
    return true;
  }
  return false;
});
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.media" :class="mediaClasses">
      <!-- @slot Media displayed at the top of the card. -->
      <slot name="media"></slot>
    </div>

    <div class="card__body">
      <header v-if="$slots.title">
        <uids-headline :url="headlineLink">
          <!-- @slot The title of the card. HTML is allowed. -->
          <slot name="title">Title</slot>
        </uids-headline>
      </header>
      <div v-if="detailsElement === true" class="card__details">
        <!-- @slot The callout details of the card.. -->
        <slot name="details"></slot>
        <div v-if="$slots.subtitle" class="card__subtitle">
          <!-- @slot The subtitle of the card.. -->
          <slot name="subtitle">Subtitle</slot>
        </div>
        <div v-if="$slots.meta" class="card__meta">
          <!-- @slot The meta of the card.. -->
          <slot name="meta">Meta</slot>
        </div>
      </div>
      <!-- @slot The body content of the card. -->
      <slot>Body</slot>
      <footer v-if="url && link_text">
        <uids-button :url="url" size="medium" v-if="linkedElement === 'button'">
          {{ link_text }}
        </uids-button>
        <uids-pseudo-button v-else>{{ link_text }}</uids-pseudo-button>
      </footer>
    </div>
  </div>
</template>
