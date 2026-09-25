import React from 'react';
// The ResizeObserver loop warning is a benign browser quirk fired by the carousel's
// resize observation — it can never be fully "delivered" and never affects rendering.
// Suppress it globally so it can't surface as a runtime error.
const suppressResizeObserverNoise = (event: ErrorEvent) => {
  const msg = event.message || '';
  if (
    msg === 'ResizeObserver loop completed with undelivered notifications.' ||
    msg === 'ResizeObserver loop limit exceeded'
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
};
window.addEventListener('error', suppressResizeObserverNoise);
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

