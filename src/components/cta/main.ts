import { defineCustomElement } from 'vue';
import Cta from './Cta.vue';
const CtaElement = defineCustomElement(Cta);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-cta') === 'undefined') {
      ceRegistry.define('uids-cta', CtaElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-cta') === 'undefined') {
    ceRegistry.define('uids-cta', CtaElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'CtaElement': typeof CtaElement
  }
}
console.log('hellow world');

export { Cta, CtaElement, loader };
