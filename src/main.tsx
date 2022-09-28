import React from 'react';
import { StrictMode } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';

import { HausThemeProvider } from '@daohaus/ui';
import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';
import ReactDOM from 'react-dom/client';
import Routes from './Routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <HausThemeProvider>
        {/* <HausConnectProvider> */}
        <Routes />
        {/* </HausConnectProvider> */}
      </HausThemeProvider>
    </HashRouter>
  </StrictMode>
);
