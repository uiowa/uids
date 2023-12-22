import { defineCustomElement } from 'vue';
import Button from "./Button.vue";


const ButtonElement = defineCustomElement(Button);



function loader() {
  const ceRegistry = window.customElements
  if ( ceRegistry === null) {
    return;
  } else {
    if ( typeof(ceRegistry.get('uiowa-button') ) === 'undefined') {
      ceRegistry.define('uiowa-button', ButtonElement);
    }
    return;
  }
}


const ceRegistry = window.customElements;
console.log('registry is:', ceRegistry);
console.log('fake thing registered? ', ceRegistry.get('fake-thing'));
console.log('button element: ', ButtonElement);
if ( ceRegistry !== null) {
  console.log('button register? ', ceRegistry.get('uiowa-button'));
  if ( typeof(ceRegistry.get('uiowa-button') ) === 'undefined') {
    ceRegistry.define('uiowa-button', ButtonElement);
  }
}



declare module 'vue' {
  export interface GlobalComponents {
    'ButtonElement': typeof ButtonElement
  }
}

export {
  Button,
  ButtonElement,
  loader
}
