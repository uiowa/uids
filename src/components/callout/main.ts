import { defineCustomElement } from 'vue';
import Callout from './Callout.vue';
const CalloutElement = defineCustomElement(Callout);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-callout') === 'undefined') {
      ceRegistry.define('uids-callout', CalloutElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-callout') === 'undefined') {
    ceRegistry.define('uids-callout', CalloutElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'CalloutElement': typeof CalloutElement
  }
}
console.log('hellow world');

export { Callout, CalloutElement, loader };
