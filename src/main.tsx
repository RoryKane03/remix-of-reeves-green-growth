import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { seoAnalytics } from './utils/seoAnalytics';
import App from './App.tsx';
import './index.css';

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Always use createRoot to avoid hydration mismatches
createRoot(root).render(app);

// Register minimal service worker for long-lived caching of static assets
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
    
    // Initialize SEO analytics
    seoAnalytics.trackPageView('/');
  });
}

