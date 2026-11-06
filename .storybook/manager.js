// .storybook/manager.js

import { addons } from 'storybook/manager-api';
import { light, dark } from './uidsTheme';

// When the URL names no story, Storybook opens the first sidebar entry. Start on
// Tokens so the UIDS Docs entry, which leaves Storybook, never opens on load.
const url = new URL(window.location.href);
if (!url.searchParams.has('path') && !url.searchParams.has('id')) {
  url.searchParams.set('path', '/story/tokens--colors');
  window.history.replaceState(null, '', url);
}

// The docs site's Display setting, saved by docs-shell.js under ais-docs-theme.
function prefersDark() {
  let saved = 'system';
  try { saved = localStorage.getItem('ais-docs-theme') ?? 'system'; } catch (e) { /* storage blocked */ }
  return saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function applyTheme() {
  addons.setConfig({ theme: prefersDark() ? dark : light });
}

applyTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
window.addEventListener('storage', (event) => {
  if (event.key === 'ais-docs-theme') applyTheme();
});

// The UIDS IOWA bar (components/brand-bar) across the top, above Storybook. Its
// stylesheets resolve only in the `yarn production` build, which writes www/dist/css.
for (const sheet of ['tokens.css', 'components/logo.css', 'components/brand-bar.css']) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `../dist/css/${sheet}`;
  document.head.appendChild(link);
}
document.body.insertAdjacentHTML('afterbegin', `<header class="iowa-bar iowa-bar--narrow" data-uids-header>
  <div class="iowa-bar__container">
    <div class="logo logo--tab">
      <a href="https://uiowa.edu">
        <div class="element-invisible">University of Iowa</div>
        <svg xmlns="http://www.w3.org/2000/svg" class="logo-icon" aria-hidden="true" viewBox="0 0 311.6 90.2"><path d="M40 18.8h-7.3v52.4H40v19H0v-19h7.3V18.8H0V0h40V18.8z"/><path d="M93.8 90.2h-29c-10.5 0-17.4-6.9-17.4-18.2V18.2C47.4 7 54.4 0 64.8 0h29c10.5 0 17.4 7 17.4 18.2V72C111.2 83.2 104.2 90.2 93.8 90.2zM85.6 71.2V18.8H73v52.4H85.6z"/><path d="M122.6 18.8h-6.4V0h38v18.9H147l6.5 43.4L167 0h19.2l14.4 62.3 5.2-43.4h-6.6V0h37.5v18.9h-6.2l-11.3 71.4h-30.6l-11.8-53.2 -12.1 53.1h-29.4L122.6 18.8z"/><path d="M230.1 71.2h6.9L250.7 0h41l13.5 71.2h6.4v19H281l-2.9-22h-15.2l-2.7 22h-30L230.1 71.2 230.1 71.2zM276.5 51.7l-5.8-36.4 -6 36.4H276.5z"/></svg>
      </a>
    </div>
    <h1 class="site-name"><a href="./">UIDS Storybook</a></h1>
  </div>
</header>`);

const header = document.querySelector('[data-uids-header]');
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--uids-bar-height', `${header.offsetHeight}px`);
}).observe(header);

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

  .element-invisible { position: absolute !important; clip: rect(1px, 1px, 1px, 1px); overflow: hidden; height: 1px; width: 1px; }
  #root { position: fixed; inset: var(--uids-bar-height, 0px) 0 0 0; height: auto; }
  #root > * { height: 100% !important; }
  /* Hides the sidebar brand; the settings button stays. */
  .sidebar-header > div:first-of-type { visibility: hidden; }

  /* Override baby-blue rgb(219,236,255) badge background for consistency. */
  .css-tcngjc { background: #FFFFFF !important; }
`;
document.head.appendChild(style);
