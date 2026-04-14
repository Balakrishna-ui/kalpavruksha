import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global Navigation Shim for Migrated Pages
(window as any).showPage = (pageId: string) => {
  const path = pageId.startsWith('page-') ? pageId.replace('page-', '') : pageId;
  window.location.href = path === 'home' ? '/' : `/${path}`;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
