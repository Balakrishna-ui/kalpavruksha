import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Root styles
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
