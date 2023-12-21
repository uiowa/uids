import { defineCustomElement } from 'vue';
import Figure from './Figure.vue';
const FigureElement = defineCustomElement(Figure);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-figure') === 'undefined') {
      ceRegistry.define('uids-figure', FigureElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-figure') === 'undefined') {
    ceRegistry.define('uids-figure', FigureElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'FigureElement': typeof FigureElement
  }
}
console.log('hellow world');

export { Figure, FigureElement, loader };
