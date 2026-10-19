// .storybook/manager.js

import { addons } from 'storybook/manager-api';
import { light, dark } from './uidsTheme';

// When the URL names no story, Storybook opens the first sidebar entry. Start on
// Introduction so the UIDS Docs entry, which leaves Storybook, never opens on load.
const url = new URL(window.location.href);
if (!url.searchParams.has('path') && !url.searchParams.has('id')) {
  url.searchParams.set('path', '/docs/introduction--docs');
  window.history.replaceState(null, '', url);
}

// The docs site's Display setting, saved by docs-shell.js under ais-docs-theme.
function prefersDark() {
  let saved = 'system';
  try { saved = localStorage.getItem('ais-docs-theme') ?? 'system'; } catch (e) { /* storage blocked */ }
  return saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

addons.setConfig({
  theme: prefersDark() ? dark : light,
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

  /* The UIDS Docs entry leaves Storybook: show an outbound arrow, not the page icon. */
  [data-item-id="uids-docs--docs"] svg use { display: none; }
  [data-item-id="uids-docs--docs"] svg {
    background-color: currentColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M5 3h6v6M11 3 3 11' fill='none' stroke='black' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  }

  /* Override baby-blue rgb(219,236,255) badge background for consistency. */
  .css-tcngjc { background: #FFFFFF !important; }
`;
document.head.appendChild(style);
