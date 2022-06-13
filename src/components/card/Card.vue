<script setup lang="ts">
import './card.scss'
import '../media/media.scss'
import UidsHeadline from '../headline/Headline.vue'
import { computed, useSlots } from "vue";
import UidsButton from "../button/Button.vue";

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
  text_centered: {
    type: Boolean,
  },

  /**
   * Include an outline around the card.
   */
  outline: {
    type: Boolean,
    default: true,
  },

  /**
   * Stack the card's contents on top of each other.
   */
  stacked: {
    type: Boolean,
    default: true,
  },

  /**
   * Stack the card's contents on top of each other.
   */
  background: {
    type: String,
    default: '',
    validator: function (value) {
      return ['black', 'gray', 'white', 'yellow'].indexOf(value) !== -1;
    },
  },
  /**
   * Add padding around the entirety of the contents of the card.
   */
  full_padded: {
    type: Boolean,
    default: true,
  },
})

const slots = useSlots();

const classes = computed(() => {
  let classes = ['card'];
  ['outline', 'stacked', 'full_padded', 'text_centered'].forEach((prop) => {
    if (props[prop] === true) {
      classes.push(`card--${prop}`);
    }
  });

  if (props.background !== '') {
    classes.push(`bg--${props.background}`)
  }

  if(props.url) {
    classes.push('click-container');
  }

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
})
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.media" class="card__media">
      <slot name="media"></slot>
    </div>

    <header v-if="$slots.title" class="card__title">
      <uids-headline :url="headlineLink">
        <slot name="title">Title</slot>
      </uids-headline>
    </header>
    <div v-if="$slots.details" class="card__details">
      <slot name="details">Details</slot>
    </div>
    <!-- @slot The body of the card. -->
    <slot>Body</slot>
    <footer v-if="url && link_text">
      <uids-button :url="url" size="medium" v-if="linkedElement === 'button'">
        {{ link_text }}
      </uids-button>
      <div v-else>{{ link_text }}</div>
    </footer>

  </div>
</template>
