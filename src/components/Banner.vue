<script setup lang="ts">
// import Headline from './Headline.vue';
// import linkButton from './linkButton.vue';

const name = 'uids-banner'

const props = defineProps({
  title: { type: String, required: true },
  image: { type: String },
  url: { type: String },
  text: { type: String },
  // @todo Determine how best to handle these fields going forward.
  // overlay?: string
  // size?: string
  // classes?: string
  // vertical_alignment?: string
  // horizontal_alignment?: string
  // title_classes?: string
  // button_link?: string
  // button_text?: string
})

// Compose a string out of the classes passed to the component.
function getClasses() {
  let classes = ["banner"];
  // @todo Add classes.
  Array.prototype.forEach.call(['overlay', 'size', 'vertical_alignment', 'horizontal_alignment'], setting => {
      // @todo Check if the setting is set and then add a class for it.
    }
  );
  return classes.join(" ");
}
// function getDefaultHeadlineSettings() {
//
// }
</script>

<template>
  <div :class="getClasses">
    <div class="banner__image" :if="image">
      <img :src="image" alt="" loading="lazy">
    </div>
    <div class="banner__container">
      <div class="banner__content">
        <h2 class="headline">{{ title }}</h2>
<!--        <Headline
          v-if="banner_title"
          headline_level="h2"
          :class="banner_title_classes"
          :headline="banner_title"
          :headline_url="link_url"
        />-->
        <slot></slot>
<!--        <linkButton
          v-if="button_text"
          :button_link="button_link"
          button_type="bttn bttn&#45;&#45;secondary bttn&#45;&#45;caps"
          :button_text="button_text"
          :button_icon="true"
        />-->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/components/banner';
</style>
