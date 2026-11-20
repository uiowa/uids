import { create } from 'storybook/theming/create';
import primitives from '../src/tokens/primitives/colors.json';

const color = (path) => {
  const { hex, alpha, components } = path.split('.').reduce((node, key) => node[key], primitives.color).$value;
  return alpha === undefined ? hex : `rgba(${components.map((c) => Math.round(c * 255)).join(', ')}, ${alpha})`;
};

const gold = color('gold');
const black = color('neutral.900');
const white = color('neutral.0');

const shared = {
  colorPrimary: gold,
  appBorderRadius: 0,
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
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
});
