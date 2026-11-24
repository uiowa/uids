// Shared by the Tokens stories and the component token pages, so every token page
// looks the same.

export const TYPOGRAPHY_CHANNELS = [
  { name: 'font-family', property: 'fontFamily' },
  { name: 'font-weight', property: 'fontWeight' },
  { name: 'font-size', property: 'fontSize' },
  { name: 'letter-spacing', property: 'letterSpacing' },
  { name: 'line-height', property: 'lineHeight' },
];

/** A typography channel's name (font-size) to its CSS property in a style object (fontSize). */
export const CHANNEL_PROPERTY = Object.fromEntries(TYPOGRAPHY_CHANNELS.map(({ name, property }) => [name, property]));

/** A semantic token's declared value is a var() reference; the reader wants the primitive's name. */
export const primitiveOf = (declared) => declared.replace(/^var\(\s*/, '').replace(/\s*\)$/, '');

export const computedValue = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const css = `
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-font-family); }
  .tk h2 { margin-top: var(--uiowa-space-300); }
  .tk h3 { margin-top: var(--uiowa-space-200); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-typography-font-weight-medium); white-space: nowrap; }
  /* Column headings stay in view while a long table scrolls past. A sticky cell needs its
     own background, and a collapsed table's border scrolls away, so the rule under the
     headings is a shadow. */
  .tk thead th {
    position: sticky; top: 0; z-index: 1;
    background: var(--uiowa-color-background-white);
    box-shadow: inset 0 -1px 0 var(--uiowa-color-border-default);
  }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand-gold); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
  /* A form height's box. The row's token sets its height, inline. */
  .tk__box { display: inline-block; width: 3rem; background: var(--uiowa-color-brand-gold); vertical-align: middle; }
  /* A stroke width's line. The row's token sets border-top-width, inline. */
  .tk__line {
    display: block; width: 8rem;
    border-top-style: solid; border-top-color: var(--uiowa-color-brand-black);
  }
  .tk__corner {
    display: inline-block; width: 6rem; height: 2rem;
    background: var(--uiowa-color-neutral-100);
    border: var(--uiowa-stroke-width-default) solid var(--uiowa-color-border-default);
  }
  .tk__card {
    display: inline-block; width: 6rem; height: 3rem; margin: var(--uiowa-space-100);
    background: var(--uiowa-color-background-white);
  }
  /* Motion: the track a dot crosses. */
  .tk__track {
    display: block; position: relative; width: 12rem; height: 1rem;
    background: var(--uiowa-color-neutral-100);
  }
  /* The dot. The row's token sets its duration, inline, and on the easing table its curve
     too; standard easing is the default. Reduce motion stops it, through uids-core.scss. */
  .tk__dot {
    position: absolute; top: 0; left: 0; width: 1rem; height: 1rem;
    border-radius: var(--uiowa-radius-full); background: var(--uiowa-color-brand-black);
    transition-property: transform; transition-timing-function: var(--uiowa-easing-standard);
  }
  /* Pointing at the track plays the dot to the far end: the 12rem track less the 1rem dot. */
  .tk__track:hover .tk__dot { transform: translateX(11rem); }
  /* Component pages: a row for a value a breakpoint or variant swaps in, under its token. */
  .tk__override td:first-child { padding-left: var(--uiowa-space-300); }
`;
