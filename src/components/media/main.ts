import { defineCustomElement } from 'vue';
import Media from './Media.vue';
const MediaElement = defineCustomElement(Media);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-media') === 'undefined') {
      ceRegistry.define('uids-media', MediaElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-media') === 'undefined') {
    ceRegistry.define('uids-media', MediaElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'MediaElement': typeof MediaElement
  }
}
console.log('hellow world');

export { Media, MediaElement, loader };
