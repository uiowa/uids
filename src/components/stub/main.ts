import { defineCustomElement } from 'vue';
import Stub from './Stub.vue';
const StubElement = defineCustomElement(Stub);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-stub') === 'undefined') {
      ceRegistry.define('uids-stub', StubElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-stub') === 'undefined') {
    ceRegistry.define('uids-stub', StubElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'StubElement': typeof StubElement
  }
}
console.log('hellow world');

export { Stub, StubElement, loader };
