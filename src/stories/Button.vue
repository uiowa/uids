<template>
  <a :href="href" :class="classes">
    {{ label }}
    <i v-if="icon" class="fas fa-arrow-right"></i>
  </a>
</template>

<script>
import './button.scss';
import { reactive, computed } from 'vue';

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      validator: function (value) {
        return ['primary', 'secondary', 'tertiary'].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'bttn': true,
        [`bttn--${props.background}`]: true,
        [`bttn--${props.size || 'medium'}`]: true,
      })),
      onClick() {
        emit('click');
      }
    }
  },
};
</script>
