<script setup lang="ts">
import '../../scss/components/blockquote.scss'
import '../../scss/components/_background.scss'
import '../../scss/components/_media.scss'
import { computed, useSlots } from "vue";
import Background from "../shared/background";
import { className } from "../utlity";

const name = 'uids-blockquote';
const props = defineProps({
  media_position_bottom: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
  },
  footer: {
    type: String,
  },
  url: {
    type: String,
  },
  cite_text: {
    type: String,
  },
  orientation: {
    type: String,
    default: '',
  },
  ...Background.props,
});

const classes = computed(() => {
  let classes = ['blockquote'];
  Background.addBackgroundClass(classes, props);

  if (props.orientation) {
    classes.push(`blockquote--${ className(props.orientation)}`);
  }
  return classes;
});

</script>

<template>
  <blockquote :class="[
    ...classes,
    { [`blockquote--img-${media_position_bottom ? 'below' : 'above'}`]: $slots.media }
  ]">
    <template v-if="!media_position_bottom">
      <div class="blockquote__media media--circle"  v-if="$slots.media">
        <slot name="media"></slot>
      </div>
    </template>
    <div class="blockquote__content">
      <div class="blockquote__paragraph" v-if="content">
        <slot name="content">{{ content }}</slot>
      </div>
      <footer>
        <template v-if="media_position_bottom">
          <div class="blockquote__media media--circle"  v-if="$slots.media">
            <slot name="media"></slot>
          </div>
        </template>
        <div>
          <slot name="footer">{{ footer }}</slot>
          <cite>
            <template v-if="url">
            <a href="{{ url }}">{{ cite_text }}</a>
            </template>
            <template v-else>
            {{ cite_text }}
            </template>
          </cite>
        </div>
      </footer>

    </div>
  </blockquote>
</template>
