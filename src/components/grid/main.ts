import { defineCustomElement } from 'vue';
import Grid from './Grid.vue';
const GridElement = defineCustomElement(Grid);
function loader() {
  const ceRegistry = window.customElements;
  if (ceRegistry === null) {
    return;
  } else {
    if (typeof ceRegistry.get('uids-grid') === 'undefined') {
      ceRegistry.define('uids-grid', GridElement);
    }
    return;
  }
}

const ceRegistry = window.customElements
if (ceRegistry !== null) {
  if (typeof ceRegistry.get('uids-grid') === 'undefined') {
    ceRegistry.define('uids-grid', GridElement);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'GridElement': typeof GridElement
  }
}
console.log('hellow world');

export { Grid, GridElement, loader };
