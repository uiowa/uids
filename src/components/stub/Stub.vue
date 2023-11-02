<script setup lang="ts">
import './stub.scss';
import {v3_URL} from '../utlity';
import UidsButton from '../button';

const name = 'uids-Stub'
const props = defineProps({
  /**
   * Path to component.
   */
  path: {
    type: String,
    default: '',
  },
  /**
   * Title of component.
   */
  title: {
    type: String,
    default: '',
  },

});4
</script>

<template>
  <h2>{{title}} - Not Implemented</h2>
  <p>This component has not been implemented in UIDS 4.</p>
  <uids-button
    :url="v3_URL + path"
    color="primary"
    size="medium"
    :borderless="false"
    :full="false"
    :transparent="false"
    :light_font="false"
  >
    <template #default >View {{title}} in UIDS 3</template>
    <template #icon ><i class='fas fa-arrow-right'></i></template>
  </uids-button>
</template>
