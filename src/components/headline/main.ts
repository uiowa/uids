import { defineCustomElement } from 'vue';
import Headline from './Headline.vue';
const HeadlineElement = defineCustomElement(Headline);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-headline') === 'undefined') {
      ceRegistry.define('uids-headline', HeadlineElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-headline') === 'undefined') {
    ceRegistry.define('uids-headline', HeadlineElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'HeadlineElement': typeof HeadlineElement
  }
}
console.log('hellow world');

export { Headline, HeadlineElement, loader };
