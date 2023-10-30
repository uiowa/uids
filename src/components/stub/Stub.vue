<script setup lang="ts">
import './Stub.scss';
import {computed} from 'vue';
import {v3_URL} from '../utlity';

const name = 'uids-Stub'
const props = defineProps({
  /**
   * Type of alert.
   */
  path: {
    type: String,
    default: '',
  },

});

</script>

<template>
  <a :href="v3_URL + path">Click</a>
</template>
