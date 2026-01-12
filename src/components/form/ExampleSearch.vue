<script setup lang="ts">
import '../../scss/components/form.scss';
import '../../scss/components/button.scss';

const props = defineProps({});

</script>
<template>
  <form class="form form--flex" method="POST" action="">
    <div class="form-item">
      <label class="element-invisible" for="search">Search</label>
      <input type="text" id="search" name="search" value="" size="30" maxlength="128"
             placeholder="Search">
    </div>
    <button type="submit" name="submit" value="Search" class="bttn bttn--primary">Search</button>
  </form>
</template>
