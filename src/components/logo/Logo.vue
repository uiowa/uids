<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/logo.scss'

const props = defineProps({
  id: {
    type: String,
    default: 'logo',
  },
  healthcare: {
    type: Boolean,
    default: false,
  },
});

const logoLink = computed(() => {
  return props.healthcare ? 'https://uihealthcare.org' : 'https://uiowa.edu';
});

const fallbackPath = computed(() => {
  return props.healthcare ? '../../assets/images/healthcare.png' : '../../assets/images/uiowa-primary.png';
});

</script>
<template>
  <div :class="['logo', 'logo--tab', { 'logo--healthcare': healthcare }]">
    <a :href="logoLink">
      <div class="element-invisible">{{ healthcare ? 'The University of Iowa Health Care' : 'University of Iowa' }}</div>
      <template v-if="healthcare">
        <svg xmlns="http://www.w3.org/2000/svg" class="logo-icon" :aria-labelledby="id" role="img" viewBox="24.89 24.71 148.01 67.83">
          <path class="logo-text"  d="M34.64 82.25h-5.92v-6.5h-3.83v16.57h3.83v-6.88h5.92v6.88h3.83V75.75h-3.83zm10.25 3.11h6.35v-3.11h-6.35v-3.3h7.43v-3.2H41.06v16.57h11.28v-3.18h-7.45zm29.28-9.61h-3.83v16.57h10.85v-3.18h-7.02zm4.93 3.2h4.85v13.37h3.83V78.95h4.91v-3.2H79.1zm25.06 3.3h-5.93v-6.5h-3.82v16.57h3.82v-6.88h5.93v6.88h3.82V75.75h-3.82zm16.37-2.41c.5-.72 1.24-1.07 2.26-1.07.94 0 1.64.21 2.09.63s.71 1.12.78 2.08l.02.24h3.83l-.03-.29c-.18-1.85-.87-3.31-2.05-4.35-1.18-1.03-2.74-1.55-4.64-1.55-1.38 0-2.61.33-3.66.98s-1.87 1.6-2.43 2.82c-.56 1.2-.84 2.61-.84 4.19v.98c0 2.47.62 4.44 1.83 5.87 1.22 1.44 2.92 2.17 5.05 2.17 1.94 0 3.52-.52 4.71-1.55 1.2-1.03 1.87-2.47 2-4.26l.02-.28h-3.83l-.02.24c-.07.9-.33 1.57-.78 1.99s-1.16.63-2.11.63c-1.05 0-1.79-.35-2.27-1.08-.49-.75-.74-1.98-.74-3.66v-1.21c.03-1.6.3-2.78.81-3.52m18.82-4.09h-3.42l-6.17 16.56h4.08l1.01-3.03h5.6l1.02 3.03h4.08l-6.14-16.39zm.05 10.34h-3.49l1.74-5.45zm18.97-2.35c.5-.77.75-1.74.75-2.88 0-1.62-.55-2.89-1.64-3.78-1.07-.88-2.6-1.33-4.55-1.33h-6.22v16.56h3.83v-5.87h2.21l3.01 5.87h4.2l-3.61-6.85c.88-.44 1.56-1.01 2.02-1.72m-7.83-4.79h2.39c.81 0 1.42.19 1.79.57.38.38.57.92.57 1.6 0 .67-.2 1.18-.6 1.55-.41.38-.98.56-1.75.56h-2.4zm14.91 10.19v-3.78h6.34v-3.11h-6.34v-3.3h7.42v-3.2h-11.25v16.57h11.28v-3.18z"/>
          <path d="M43.91 33.67h-3.46v24.89h3.46v9.02H24.89v-9.02h3.46V33.67h-3.46v-8.96h19.02zm25.56 33.91H55.7c-5 0-8.28-3.27-8.28-8.65V33.37c0-5.31 3.33-8.65 8.28-8.65h13.77c5 0 8.28 3.34 8.28 8.65v25.57c-.01 5.3-3.34 8.64-8.28 8.64m-3.89-9.02V33.67h-5.99v24.89zm17.57-24.89h-3.03v-8.96h18.03v8.96h-3.4l3.09 20.63 6.42-29.58h9.14l6.85 29.58 2.47-20.63h-3.15v-8.96h17.79v8.96h-2.96l-5.37 33.91h-14.51l-5.62-25.26-5.74 25.26H89.21zm51.08 24.89h3.27l6.48-33.84h19.45l6.42 33.84h3.03v9.02h-14.51l-1.36-10.44h-7.23l-1.3 10.44h-14.27v-9.02zm22.05-9.26-2.78-17.29-2.84 17.29z"/>
          <path class="logo-text" d="M62.99 75.75h-3.42L53.4 92.32h4.08l1.01-3.03h5.6l1.02 3.03h4.08l-6.14-16.39zm.04 10.34h-3.49l1.74-5.45z"/>
          <image :src="fallbackPath">
            <title :id="id">University of Iowa Health Care</title>
          </image>
        </svg>
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" class="logo-icon" :aria-labelledby="id" role="img" viewBox="0 0 311.6 90.2">
          <path class="st0" d="M40 18.8h-7.3v52.4H40v19H0v-19h7.3V18.8H0V0h40V18.8z"/>
          <path class="st0" d="M93.8 90.2h-29c-10.5 0-17.4-6.9-17.4-18.2V18.2C47.4 7 54.4 0 64.8 0h29c10.5 0 17.4 7 17.4 18.2V72C111.2 83.2 104.2 90.2 93.8 90.2zM85.6 71.2V18.8H73v52.4H85.6z"/>
          <path class="st0" d="M122.6 18.8h-6.4V0h38v18.9H147l6.5 43.4L167 0h19.2l14.4 62.3 5.2-43.4h-6.6V0h37.5v18.9h-6.2l-11.3 71.4h-30.6l-11.8-53.2 -12.1 53.1h-29.4L122.6 18.8z"/>
          <path class="st0" d="M230.1 71.2h6.9L250.7 0h41l13.5 71.2h6.4v19H281l-2.9-22h-15.2l-2.7 22h-30L230.1 71.2 230.1 71.2zM276.5 51.7l-5.8-36.4 -6 36.4H276.5z"/>
          <image :src="fallbackPath">
            <title :id="id">University of Iowa</title>
          </image>
        </svg>
      </template>
    </a>
  </div>
</template>
