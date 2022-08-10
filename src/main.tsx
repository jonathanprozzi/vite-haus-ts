import React from 'react'
import { HausThemeProvider, defaultDarkTheme } from '@daohaus/ui';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


console.log('hi',  HausThemeProvider)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HausThemeProvider defaultDark={defaultDarkTheme}>
      <App />
    </HausThemeProvider>
  </React.StrictMode>
)
