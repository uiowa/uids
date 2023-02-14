<script setup lang="ts">
import { computed, onMounted, useSlots } from 'vue';
import { className } from '../utlity'
import UidsHeadline from '../headline/Headline.vue'
import UidsButton from '../button/Button.vue'
import UidsPseudoButton from '../button/PseudoButton.vue'
import Background from '../shared/background'
import Borderless from '../shared/borderless'
import Media from '../shared/media'
import './card.scss'
import '../background/background.scss'
import '../media/media.scss'
import { applyClickA11y } from '../../assets/js/click-a11y'

const name = 'uids-card'
const props = defineProps({
  /**
   * Title style for the headline.
   */
  headline_style: {
    type: String,
    default: '',
  },

  /**
   * A URL to the resource that the card represents.
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
   * Display a circle button when there is no button text.
   */
  link_indicator: {
    type: Boolean,
    default: true,
  },

  button_align_bottom: {
    type: Boolean,
    default: false,
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

  /**
   * How to lay out the content of the card. Default is stacked.
   */
  orientation: {
    type: String,
    default: '',
    validator: (value: string) => {
      return ['', 'left', 'right'].indexOf(value) !== -1;
    },
  },

  ...Media.props,

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

  ['centered', 'media_padded', 'button_align_bottom'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`card--${ className(prop) }`);
    }
  });

  if (props.orientation) {
    classes.push(`card--layout-${ className(props.orientation)}`);
  }

  Background.addBackgroundClass(classes, props);

  Borderless.addBorderlessClass(classes, props);

  if (props.url) {
    classes.push('click-container')
  }

  return classes;
});

const mediaClasses = computed(() => {
  let classes = ['media'];

  Media.addMediaClasses(classes, props);

  return classes;
});

const buttonClasses = computed(() => {
  let classes = ['bttn--transparent', 'bttn--light-font'];

  if (props.link_indicator && props.url && !props.link_text) {
    classes.push('bttn--circle')
    classes.push('bttn--no-text')
  }

  if (linkedElement.value === 'button') {
    classes.push('click-target')
  }

  return classes
})

/**
 * Determine the linked element.
 */
const linkedElement = computed(() => {
  // Do we have a URL?
  if (!props.url) {
    return null;
  }
  // Do we have a title.
  if (!slots.title) {

    if (!props.link_text && slots.media) {
      return 'image';
    }

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
 * Print card__details if subtitle or meta are available.
 */
const detailsElement = computed(() => {
  // Do we have subtitle or meta?
  if (slots.subtitle || slots.meta) {
    return true;
  }
  return false;
});

onMounted(() => {
  if (props.url) {
    applyClickA11y('.click-container:not([data-uids-no-link])');
  }
});

</script>

<template>
  <div :class="classes">
    <div
      v-if="$slots.media"
      :class="mediaClasses"
    >
      <div class="media__inner">
        <a
          v-if="linkedElement === 'image'"
          :href="url"
          class="click-target"
        >
          <!-- @slot Media displayed at the top of the card. -->
          <slot name="media"></slot>
        </a>
        <!-- @slot Media displayed at the top of the card. -->
        <slot
          name="media"
          v-else
        ></slot>
      </div>
    </div>

    <div class="card__body">
      <header v-if="$slots.title">
        <uids-headline :text_style="headline_style">
          <!-- @slot The title of the card. HTML is allowed. -->
          <a v-if="headlineLink" :href="headlineLink" class="click-target">
            <slot name="title">Title</slot>
          </a>
          <template v-else>
            <slot name="title">Title</slot>
          </template>
        </uids-headline>
      </header>
      <div
        v-if="detailsElement === true"
        class="card__details"
      >
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
      <footer v-if="url && (link_indicator || link_text)">
        <uids-button :class="buttonClasses" :url="url" size="medium" v-if="linkedElement === 'button'">
          {{ link_text }}
        </uids-button>
        <uids-pseudo-button :class="buttonClasses" v-else>{{ link_text }}</uids-pseudo-button>
      </footer>
    </div>
  </div>
</template>
