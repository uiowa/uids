import '../src/scss/uids-core.scss';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import DocumentationTemplate from '../src/components/DocumentationTemplate.mdx';
import uidsTheme from "./uidsTheme.js";
import { styled } from '@storybook/theming';

const pStyles = styled.p(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.7",
}));

const liStyles = styled.li(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.7",
  '& a': {
    color: "#00558c",
    textDecoration: "underline",
  },
}));

const aStyles = styled.a(({ theme }) => ({
  color: "#00558c",
  textDecoration: "underline",
}));

const h1Styles = styled.h1(({ theme }) => ({
  fontSize: "2.5rem",
  position: "relative",
  '&:after': {
    content: '" "',
    display: "block",
    width: "75px",
    height: "6px",
    marginTop: "15px",
    background: "#ffcd00",
  },
}));

const h2Styles = styled.h2(({ theme }) => ({
  fontSize: "2.2rem",
  borderBottom: "none",
  fontWeight: "300",
}));

const h3Styles = styled.h3(({ theme }) => ({
  fontSize: "1.7rem",
  borderBottom: "none",
  fontWeight: "300",
}));

const customViewports = {
  // This is an example of a custom defined viewport.
  // horizontalCard: {
  //   name: 'Horizontal card',
  //   styles: {
  //     width: '780px',
  //     height: '350px',
  //   },
  // },
};

export default {
  parameters: {
    docs: {
      page: DocumentationTemplate,
      toc: true,
      theme: uidsTheme,
      components: {
        p: pStyles,
        li: liStyles,
        a: aStyles,
        h1: h1Styles,
        h2: h2Styles,
        h3: h3Styles,
      }
    },
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
    // More on viewports https://storybook.js.org/docs/react/essentials/viewport.
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
    options: {
      showPanel: true,
      storySort: {
        method: 'alphabetical',
      }
    },
  },
};
