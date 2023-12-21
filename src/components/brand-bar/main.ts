import { defineCustomElement } from 'vue';
import Brandbar from './Brandbar.vue';
const BrandbarElement = defineCustomElement(Brandbar);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-brandbar') === 'undefined') {
      ceRegistry.define('uids-brandbar', BrandbarElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-brandbar') === 'undefined') {
    ceRegistry.define('uids-brandbar', BrandbarElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'BrandbarElement': typeof BrandbarElement
  }
}
console.log('hellow world');

export { Brandbar, BrandbarElement, loader };
