import { defineCustomElement } from 'vue';
import Logo from './Logo.vue';
const LogoElement = defineCustomElement(Logo);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-logo') === 'undefined') {
      ceRegistry.define('uids-logo', LogoElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-logo') === 'undefined') {
    ceRegistry.define('uids-logo', LogoElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'LogoElement': typeof LogoElement
  }
}
console.log('hellow world');

export { Logo, LogoElement, loader };
