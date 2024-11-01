// .storybook/manager.js

import { addons } from '@storybook/manager-api';
import uidsTheme from './uidsTheme';

addons.setConfig({
  theme: uidsTheme,
});
