import { create } from 'storybook/theming/create';
import primitives from '../src/tokens/primitives/colors.json';

const color = (path) => {
  const { hex, alpha, components } = path.split('.').reduce((node, key) => node[key], primitives.color).$value;
  return alpha === undefined ? hex : `rgba(${components.map((c) => Math.round(c * 255)).join(', ')}, ${alpha})`;
};

const gold = color('gold');
const black = color('neutral.900');
const white = color('neutral.0');

const logo = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 311.6 90.2" height="20" aria-hidden="true" style="display:block;fill:${fill}"><path d="M40 18.8h-7.3v52.4H40v19H0v-19h7.3V18.8H0V0h40V18.8z"/><path d="M93.8 90.2h-29c-10.5 0-17.4-6.9-17.4-18.2V18.2C47.4 7 54.4 0 64.8 0h29c10.5 0 17.4 7 17.4 18.2V72C111.2 83.2 104.2 90.2 93.8 90.2zM85.6 71.2V18.8H73v52.4H85.6z"/><path d="M122.6 18.8h-6.4V0h38v18.9H147l6.5 43.4L167 0h19.2l14.4 62.3 5.2-43.4h-6.6V0h37.5v18.9h-6.2l-11.3 71.4h-30.6l-11.8-53.2 -12.1 53.1h-29.4L122.6 18.8z"/><path d="M230.1 71.2h6.9L250.7 0h41l13.5 71.2h6.4v19H281l-2.9-22h-15.2l-2.7 22h-30L230.1 71.2 230.1 71.2zM276.5 51.7l-5.8-36.4 -6 36.4H276.5z"/></svg>`;

const brand = ({ bar, tab, mark, name }) => `<span style="display:flex;align-items:center;gap:12px;background:${bar};padding-right:12px">
  <span style="display:grid;place-items:center;background:${tab};padding:10px 14px">${logo(mark)}</span>
  <span style="font:400 16px Roboto,sans-serif;color:${name};white-space:nowrap">UIDS Docs</span>
</span>`;

const shared = {
  colorPrimary: gold,
  appBorderRadius: 0,
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
  brandUrl: '../',
};

export const light = create({
  ...shared,
  base: 'light',
  colorSecondary: black,
  appBg: color('neutral.100'),
  appContentBg: white,
  appPreviewBg: white,
  appBorderColor: color('alpha.black-125'),
  textColor: black,
  textInverseColor: white,
  textMutedColor: color('neutral.500'),
  barTextColor: black,
  barHoverColor: color('neutral.700'),
  barSelectedColor: black,
  barBg: gold,
  // Color contrast fixes
  booleanBg: color('neutral.100'),
  brandTitle: brand({ bar: gold, tab: black, mark: gold, name: black }),
});

// Dark values are chosen by hand from the neutral ramp.
export const dark = create({
  ...shared,
  base: 'dark',
  colorSecondary: color('neutral.500'),
  appBg: color('neutral.800'),
  appContentBg: color('neutral.700'),
  appPreviewBg: white,
  appBorderColor: color('alpha.white-325'),
  textColor: white,
  textInverseColor: black,
  textMutedColor: color('neutral.200'),
  barTextColor: white,
  barHoverColor: gold,
  barSelectedColor: gold,
  barBg: black,
  booleanBg: color('neutral.800'),
  brandTitle: brand({ bar: black, tab: gold, mark: black, name: gold }),
});
