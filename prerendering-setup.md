# Prerendering Implementation Guide

## When Prerendering is Needed

Based on SEO test results, implement prerendering if:
- Critical content missing from crawled HTML
- Structured data not appearing in Google's version  
- Rendering takes >3 seconds for complete page
- Core Web Vitals fail due to JavaScript loading

## Option 1: Vite Static Site Generation (Recommended)

### Install Dependencies
```bash
npm install -D vite-plugin-ssr @vitejs/plugin-react
```

### Update vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
        }
      }
    }
  },
  // Add prerendering for key pages
  ssr: {
    noExternal: ['react-helmet-async']
  }
}));
```

### Create Prerender Script
```typescript
// scripts/prerender.ts
import { createServer } from 'vite';
import fs from 'fs/promises';
import path from 'path';

const routes = [
  '/',
  '/our-work',
  '/commercial-services',
  '/domestic-services',
  '/tree-work',
  '/hedge-cutting',
  '/stump-grinding',
  '/commercial-tree-work',
  '/commercial-hedge-cutting', 
  '/commercial-stump-grinding',
  '/commercial-site-clearance',
  '/about',
  '/privacy-policy'
];

async function prerender() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  for (const route of routes) {
    try {
      const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
      const html = await render(route);
      
      const filePath = path.join('dist', route === '/' ? 'index.html' : `${route}.html`);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, html);
      
      console.log(`✓ Prerendered ${route}`);
    } catch (error) {
      console.error(`✗ Failed to prerender ${route}:`, error);
    }
  }

  await server.close();
}

prerender();
```

## Option 2: React Helmet Async SSR

### Update main.tsx for SSR Support
```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
```

### Create Server Entry Point
```typescript
// src/entry-server.tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export function render(url: string) {
  const helmetContext = {};
  
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  const { helmet } = helmetContext as any;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${helmet.script.toString()}
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}
```

## Option 3: Third-Party Service (Fallback)

### Prerender.io Configuration
```javascript
// Add to index.html if using prerender.io
<script>
if (navigator.userAgent.indexOf('prerender') !== -1) {
  // Ensure all content is loaded for prerendering
  window.prerenderReady = false;
  
  // Set ready after all async content loads
  setTimeout(() => {
    window.prerenderReady = true;
  }, 3000);
}
</script>
```

## Deployment Integration

### Update Build Process
```bash
#!/bin/bash
# build-with-prerender.sh

echo "Building React app..."
npm run build

echo "Prerendering pages..."
node scripts/prerender.js

echo "Optimizing HTML..."
# Optional: minify prerendered HTML
npx html-minifier-terser --input-dir dist --output-dir dist --file-ext html

echo "Build complete with prerendering!"
```

### Nginx Configuration
```nginx
# nginx.conf for prerendered React app
server {
    listen 80;
    server_name staging.reevestreeservices.co.uk;
    root /var/www/dist;
    index index.html;

    # Serve prerendered pages to crawlers
    location / {
        try_files $uri $uri.html $uri/index.html /index.html;
        
        # Cache prerendered pages
        add_header Cache-Control "public, max-age=3600";
    }

    # API routes (if any)
    location /api/ {
        proxy_pass http://localhost:3001;
    }
}
```

## Testing Prerendered Version

### Validation Checklist
- [ ] All routes generate HTML files
- [ ] Meta tags present in prerendered HTML
- [ ] Structured data in HTML source
- [ ] Images have proper alt attributes
- [ ] Internal links are absolute URLs
- [ ] No broken JavaScript functionality after hydration
- [ ] Performance improved vs. client-only version

### GSC Re-testing
After prerendering implementation:
1. Deploy prerendered version to staging
2. Re-run all URL inspection tests
3. Compare crawled HTML vs. previous version
4. Verify all structured data now appears
5. Confirm performance improvements

## Production Deployment

Only deploy prerendering to production after:
- [ ] All staging tests pass
- [ ] No functionality regressions
- [ ] Performance metrics improved
- [ ] SEO validation successful
- [ ] Mobile experience maintained