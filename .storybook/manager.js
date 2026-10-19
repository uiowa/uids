// .storybook/manager.js

import { addons } from 'storybook/manager-api';
import uidsTheme from './uidsTheme';

// When the URL names no story, Storybook opens the first sidebar entry. Start on
// Introduction so the UIDS Docs entry, which leaves Storybook, never opens on load.
const url = new URL(window.location.href);
if (!url.searchParams.has('path') && !url.searchParams.has('id')) {
  url.searchParams.set('path', '/docs/introduction--docs');
  window.history.replaceState(null, '', url);
}

addons.setConfig({
  theme: uidsTheme,
});

// Machete "just-in-time" CSS overrides for accessibility.
const style = document.createElement('style');
style.textContent = `
  /* Zoom button text, color contrast fix. barTextColor does not reach this element. */
  .sb-bar [aria-label="Change zoom level"] { color: #151515 !important; }

  /* Boolean switch toggle color contrast fix. aria-hidden but still flagged.*/
  #storybook-panel-root label input:checked ~ span:first-of-type,
  #storybook-panel-root label input:not(:checked) ~ span:last-of-type {
    color: #595959 !important;
  }

  /* Override baby-blue rgb(219,236,255) badge background for consistency. */
  .css-tcngjc { background: #FFFFFF !important; }
`;
document.head.appendChild(style);
