// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import brand_image from '../src/assets/images/uiowa-secondary.svg'

export default create({
  base: 'light',
  brandTitle: 'U of Iowa Design System (UIDS)',
  brandUrl: 'https://uids.brand.uiowa.edu',
  brandImage: brand_image,
});
