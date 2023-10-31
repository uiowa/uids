<script setup lang="ts">
import './stub.scss';
import {v3_URL} from '../utlity';
import UidsButton from '../button';

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
  <div>
    <iframe src="https://uids.brand.uiowa.edu/components/preview/accordion.html" title="accordion"></iframe>
    <uids-button
      :url="v3_URL + path"
      color="primary"
      size="medium"
      :borderless="false"
      :full="false"
      :transparent="false"
      :light_font="false"
    >
      <template #default >View in uids3</template>
      <template #icon ><i class='fas fa-arrow-right'></i></template>
    </uids-button>
  </div>
</template>
