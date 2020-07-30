import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../styles';

export const Layout: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>

    <GlobalStyle />

    <div>
      {children}
    </div>

  </ThemeProvider>
);
