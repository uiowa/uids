import { defineCustomElement } from 'vue';
import Card from './Card.vue';
const CardElement = defineCustomElement(Card);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-card') === 'undefined') {
      ceRegistry.define('uids-card', CardElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-card') === 'undefined') {
    ceRegistry.define('uids-card', CardElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'CardElement': typeof CardElement
  }
}
console.log('hellow world');

export { Card, CardElement, loader };
