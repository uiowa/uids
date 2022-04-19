// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import brand_image from '../src/assets/images/uiowa-secondary.svg'

export default create({
  base: 'light',

  colorPrimary: '#FFCD00',
  colorSecondary: '#151515',

  // UI
  appBg: '#FFCD00',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Zilla Slab", serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#151515',
  textInverseColor: 'white',

  // Toolbar default and active colors
  barTextColor: '#FFCD00',
  barSelectedColor: 'white',
  barBg: '#151515',

  // Branding
  brandTitle: 'U of Iowa Design System (UIDS)',
  brandUrl: 'https://uids.brand.uiowa.edu',
  brandImage: brand_image,
});
