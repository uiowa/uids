/*import { defineCustomElement } from 'vue';
import Alert from './Alert.vue';
const AlertElement = defineCustomElement(Alert);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uiowa-alert') === 'undefined') {
      ceRegistry.define('uiowa-alert', AlertElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uiowa-alert') === 'undefined') {
    ceRegistry.define('uiowa-alert', AlertElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'AlertElement': typeof AlertElement
  }
}
console.log('hellow world');

export { Alert, AlertElement, loader };
*/
