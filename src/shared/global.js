import { createGlobalStyle, css } from 'styled-components';

import { color, typography } from './styles';

export const bodyStyles = css`
  /* Same as before */
`;

export const GlobalStyle = createGlobalStyle`
 body {
   ${bodyStyles}
 }`;
