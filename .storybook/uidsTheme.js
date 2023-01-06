// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import brand_image from '../src/assets/images/uiowa-secondary.svg'

export default create({
  base: 'light',

  colorPrimary: '#FFCD00',
  colorSecondary: '#151515',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#151515',
  textInverseColor: 'white',

  // Toolbar default and active colors
  barTextColor: '#63666A',
  barSelectedColor: '#151515',
  barBg: '#FFCD00',

  // Branding
  brandTitle: 'U of Iowa Design System (UIDS)',
  brandUrl: 'https://uids.brand.uiowa.edu',
  brandImage: brand_image,
});
