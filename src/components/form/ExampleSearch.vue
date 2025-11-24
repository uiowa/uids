<script setup lang="ts">
import UidsFormInline from './FormInline.vue';
import '../../scss/components/form.scss';
import '../../scss/components/button.scss';
import Form from "./Form.vue";

const props = defineProps({});

</script>
<template>
  <form class="form" method="POST" action="">
    <uids-form-inline>
      <div class="form-item">
        <label class="element-invisible" for="edit-search">Search</label>
        <input type="text" id="edit-search" name="search" value="" size="30" maxlength="128"
               placeholder="Search directory">
      </div>
      <button type="submit" name="search" value="Search" class="bttn bttn--primary">
        <span>Search</span>
      </button>
    </uids-form-inline>
  </form>
</template>
