<script setup lang="ts">
import './alert.scss';
import {computed} from 'vue';
import {className} from '../utlity';
const name = 'uids-alert'
const props = defineProps({
  /**
   * Type of alert.
   */
  type: {
    type: String,
    default: 'hawk',
    // validator: (value: string) => {
    //   return ['hawk', 'success', 'warning', 'info', 'danger', 'dismissible'].indexOf(value) !== -1;
    // },
  },
});

const classes = computed(() => {
  let classes = ['alert'];
  console.log('text outside if statement');
  console.log(props.type);

  if (props.type) {
    console.log('text inside if statement');
    classes.push(`alert-${ className(props.type)}`);
    console.log(props.type);

  }

  // classes = ['alert-warning'];
  return classes;
});



</script>

<template>
  <div :class="classes">
    <div>
    <!-- @slot The default slot where the message will be displayed. -->
      <slot>Body</slot>
    </div>
  </div>
</template>
