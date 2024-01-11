import { createApp } from 'vue'
import App from './App.vue'
import { ButtonBase } from '@/components/button/button-base.js'

window.customElements.define('uids-wc-button', ButtonBase);

createApp(App).mount('#app')
