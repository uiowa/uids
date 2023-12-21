import { defineCustomElement } from 'vue';
import Button from './Button.vue';
import { VueElement } from "@vue/test-utils/dist/types";
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

const ceRegistry: CustomElementRegistry = window.customElements;
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-button') === 'undefined') {
    ceRegistry.define('uids-button', ButtonElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    ButtonElement: typeof ButtonElement;
  }
}
console.log('hellow world');

export { Button, ButtonElement, loader };
export interface ButtonElementIV extends VueElement {

}
export interface ButtonElementIH extends HTMLElement {

}
