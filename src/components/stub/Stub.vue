<script setup lang="ts">
import { V3_BASE_URL } from '../utlity';
import UidsButton from '../button';
import UidsHeadline from '../headline';

const name = 'uids-stub'
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

});
const V3_COMPONENT_PATH = 'components/detail/';
</script>

<template>
  <uids-headline
    level="h3"
  >{{title}}</uids-headline>
  <p>This component has not been implemented in UIDS 4.</p>
  <uids-button
    :url="V3_BASE_URL + V3_COMPONENT_PATH + path"
    color="primary"
    size="small"
    :borderless="false"
    :full="false"
    :transparent="false"
    :light_font="false"
  >
    <template #default >View {{title}} in UIDS 3</template>
    <template #icon ><i class='fas fa-arrow-right'></i></template>
  </uids-button>
</template>
