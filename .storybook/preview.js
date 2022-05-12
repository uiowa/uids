import '../src/assets/scss/reset.scss';
import '../src/assets/scss/fonts.scss';
import '../src/assets/base.css';
import '../src/assets/scss/headings.scss';
import '../src/assets/scss/paragraph.scss';
import '../src/assets/scss/lists.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
