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
   * Determine the size of the media of the card.
   */

  // @todo: determine whether this is necessary.
  // media_size: {
  //   type: String,
  // },

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
      return ['bg--white', 'bg--gray', 'bg--black', 'bg--yellow'].indexOf(value) !== -1;
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
      classes.push('card--' + prop);
    }
  });

  if (props.background !== '') {
    classes.push(props.background)
  }

  if(props.url) {
    classes.push('click-container');
  }

  return classes;
});

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

</script>

<template>
  <div :class="classes">
    <div v-if="$slots.media" class="card__media">
      <slot name="media"></slot>
    </div>

    <header v-if="$slots.title" class="card__title">
      <uids-headline>
        <slot name="title">Title</slot>
      </uids-headline>
    </header>
    <div v-if="$slots.details" class="card__details">
      <slot name="details">Details</slot>
    </div>
    <!-- @slot The body of the card. -->
    <slot>Body</slot>
    <footer v-if="url">
      <uids-button :url="url" size="medium">
        BUTTON TEXT
      </uids-button>
    </footer>

  </div>
</template>
