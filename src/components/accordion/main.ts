/*
import { defineCustomElement } from 'vue';
import Accordion from './Accordion.vue';
const AccordionElement = defineCustomElement(Accordion);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-accordion') === 'undefined') {
      ceRegistry.define('uids-accordion', AccordionElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-accordion') === 'undefined') {
    ceRegistry.define('uids-accordion', AccordionElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'AccordionElement': typeof AccordionElement
  }
}
console.log('hellow world');

export { Accordion, AccordionElement, loader };
 */
