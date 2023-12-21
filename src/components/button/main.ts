import { defineCustomElement } from 'vue';
import Button from './Button.vue';
const ButtonElement = defineCustomElement(Button);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-button') === 'undefined') {
      ceRegistry.define('uids-button', ButtonElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-button') === 'undefined') {
    ceRegistry.define('uids-button', ButtonElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'ButtonElement': typeof ButtonElement
  }
}
console.log('hellow world');

export { Button, ButtonElement, loader };
