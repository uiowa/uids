import { defineCustomElement } from 'vue';
import Banner from './Banner.vue';
const BannerElement = defineCustomElement(Banner);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-banner') === 'undefined') {
      ceRegistry.define('uids-banner', BannerElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-banner') === 'undefined') {
    ceRegistry.define('uids-banner', BannerElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'BannerElement': typeof BannerElement
  }
}
console.log('hellow world');

export { Banner, BannerElement, loader };
