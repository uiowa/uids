import { defineCustomElement } from 'vue';

/***
 * only needed if creating a web app, not standalone components
 * import { createApp } from 'vue'
 * import App from './App.vue'
 */

// import the elements we are producing
import Alert from './components/alert/Alert.vue';
import Banner from './components/banner/Banner.vue';
import BrandBar from './components/brand-bar/BrandBar.vue';
import Button from './components/button/Button.vue';
import Callout from './components/callout/Callout.vue';
import Card from './components/card/Card.vue';
import Cta from './components/cta/Cta.vue';
import Grid from './components/grid/Grid.vue';
import Headline from './components/headline/Headline.vue';
import Logo from './components/logo/Logo.vue';
import Media from './components/media/Media.vue';

// create the elements
const AlertElement = defineCustomElement(Alert);
const BannerElement = defineCustomElement(Banner);
const BrandBarElement = defineCustomElement(BrandBar);
const ButtonElement = defineCustomElement(Button);
const CalloutElement = defineCustomElement(Callout);
const CardElement = defineCustomElement(Card);
const CtaElement = defineCustomElement(Cta);
const GridElement = defineCustomElement(Grid);
const HeadlineElement = defineCustomElement(Headline);
const LogoElement = defineCustomElement(Logo);
const MediaElement = defineCustomElement(Media);

// finally register the elements
customElements.define('uids-alert', AlertElement);
customElements.define('uids-banner', BannerElement);
customElements.define('uids-brandbar', BrandBarElement);
customElements.define('uids-button', ButtonElement);
customElements.define('uids-callout', CalloutElement);
customElements.define('uids-card', CardElement);
customElements.define('uids-cta', CtaElement);
customElements.define('uids-grid', GridElement);
customElements.define('uids-headline', HeadlineElement);
customElements.define('uids-logo', LogoElement);
customElements.define('uids-media', MediaElement);

function loader(): void {
  const ceRegistry = window.customElements
  if (ceRegistry !== null) {
    if (typeof (ceRegistry.get('uids-alert')) === 'undefined') {
      ceRegistry.define('uids-alert', AlertElement);
    }
    if (typeof (ceRegistry.get('uids-banner')) === 'undefined') {
      ceRegistry.define('uids-banner', BannerElement);
    }
    if (typeof (ceRegistry.get('uids-brandbar')) === 'undefined') {
      ceRegistry.define('uids-brandbar', BrandBarElement);
    }
    if (typeof (ceRegistry.get('uids-button')) === 'undefined') {
      ceRegistry.define('uids-button', ButtonElement);
    }
    if (typeof (ceRegistry.get('uids-callout')) === 'undefined') {
      ceRegistry.define('uids-callout', CalloutElement);
    }
    if (typeof (ceRegistry.get('uids-card')) === 'undefined') {
      ceRegistry.define('uids-card', CardElement);
    }
    if (typeof (ceRegistry.get('uids-cta')) === 'undefined') {
      ceRegistry.define('uids-cta', CtaElement);
    }
    if (typeof (ceRegistry.get('uids-grid')) === 'undefined') {
      ceRegistry.define('uids-grid', GridElement);
    }
    if (typeof (ceRegistry.get('uids-headline')) === 'undefined') {
      ceRegistry.define('uids-headline', HeadlineElement);
    }
    if (typeof (ceRegistry.get('uids-logo')) === 'undefined') {
      ceRegistry.define('uids-logo', LogoElement);
    }
    if (typeof (ceRegistry.get('uids-media')) === 'undefined') {
      ceRegistry.define('uids-media', MediaElement);
    }
  }
  console.log('window ceRegistry is now:', ceRegistry);
}
console.log('running loader');
loader();
// needed to import typings for each element
declare module 'vue' {
  export interface GlobalComponents {
    'AlertElement': typeof AlertElement,
    'BannerElement': typeof BannerElement,
    'BrandBarElement': typeof BrandBarElement,
    'ButtonElement': typeof ButtonElement,
    'CalloutElement': typeof CalloutElement,
    'CardElement': typeof CardElement,
    'CtaElement': typeof CtaElement,
    'GridElement': typeof GridElement,
    'HeadlineElement': typeof HeadlineElement,
    'LogoElement': typeof LogoElement,
    'MediaElement': typeof MediaElement
  }
}

export {
  loader,
  Alert,
  Banner,
  BrandBar,
  Button,
  Callout,
  Card,
  Cta,
  Grid,
  Headline,
  Logo,
  Media,
  AlertElement,
  BannerElement,
  BrandBarElement,
  ButtonElement,
  CalloutElement,
  CardElement,
  CtaElement,
  GridElement,
  HeadlineElement,
  LogoElement,
  MediaElement
}


/***
 * following are not currently implemented

 import Accordion from './components/accordion/Accordion.vue';
 import Background from './components/background/Background.vue';
 import Badge from './components/badge/Badge.vue';
 import Blockquote from './components/blockquote/Blockquote.vue';
 import Footer from './components/footer/Footer.vue';
 import Icons from './components/icons/Icons.vue';
 import Inline from './components/inline/Inline.vue';
 import Slider from './components/slider/Slider.vue';
 import Stat from './components/stat/Stat.vue';
 import Stub from './components/stub/Stub.vue';
 import Tables from './components/tables/Tables.vue';
 import Tabs from './components/tabs/Tabs.vue';
 */

// no need to create the app in index.html
// createApp(App).mount('#app')
