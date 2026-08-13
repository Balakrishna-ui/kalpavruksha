import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Root styles
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Global one-time cleanup for obsolete Local Storage data
try {
  localStorage.removeItem('admin_api_key');
  localStorage.removeItem('admin_email');
  localStorage.removeItem('kalpavruksha_submissions');
} catch (e) {
  // Ignore in environments where localStorage is not available
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
