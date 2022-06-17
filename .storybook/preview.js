import '../src/assets/scss/reset.scss';
import '../src/assets/scss/fonts.scss';
import '../src/assets/base.css';
import '../src/assets/scss/headings.scss';
import '../src/assets/scss/paragraph.scss';
import '../src/assets/scss/lists.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'black',
        value: '#151515',
      },
      {
        name: 'black - brain pattern',
        value: 'url(../src/assets/images/brain-pattern-black.svg) #151515',
      },
      {
        name: 'black - community pattern',
        value: 'url(../src/assets/images/community-pattern--black.png) #151515',
      },
      {
        name: 'black - particle pattern',
        value: 'url(../src/assets/images/particle-pattern--black.png) #151515',
      },
      {
        name: 'gold',
        value: '#FFCD00',
      },
      {
        name: 'gold - brain pattern',
        value: 'url(../src/assets/images/brain-pattern-reversed.svg) #FFCD00',
      },
      {
        name: 'gold - community pattern',
        value: 'url(../src/assets/images/community-pattern--white.png) #FFCD00',
      },
      {
        name: 'gold - particle pattern',
        value: 'url(../src/assets/images/particle-pattern.png) #FFCD00',
      },
      {
        name: 'gray',
        value: '#f3f3f3',
      },
      {
        name: 'gray - brain pattern',
        value: 'url(../src/assets/images/brain-pattern-white.svg) #f3f3f3',
      },
      {
        name: 'gray - community pattern',
        value: 'url(../src/assets/images/community-pattern--gray.png) #f3f3f3',
      },
      {
        name: 'gray - particle pattern',
        value: 'url(../src/assets/images/particle-pattern--white.png) #f3f3f3',
      },
      {
        name: 'white',
        value: '#FFFFFF',
      },
      {
        name: 'white - brain pattern',
        value: 'url(../src/assets/images/brain-pattern.svg) #FFFFFF',
      },
      {
        name: 'white - community pattern',
        value: 'url(../src/assets/images/community-pattern--gray.png) #FFFFFF',
      },
      {
        name: 'white - particle pattern',
        value: 'url(../src/assets/images/particle-pattern--gold.png) #FFFFFF',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
