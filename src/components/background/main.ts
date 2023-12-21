/*import { defineCustomElement } from 'vue';
import Background from './Background.vue';
const BackgroundElement = defineCustomElement(Background);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-background') === 'undefined') {
      ceRegistry.define('uids-background', BackgroundElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-background') === 'undefined') {
    ceRegistry.define('uids-background', BackgroundElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'BackgroundElement': typeof BackgroundElement
  }
}
console.log('hellow world');

export { Background, BackgroundElement, loader };
*/
