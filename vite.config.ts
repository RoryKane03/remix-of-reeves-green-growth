
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    viteStaticCopy({
      targets: [
        { src: 'public/sitemap.xml', dest: '' },
        { src: 'public/robots.txt', dest: '' },
        { src: 'public/llms.txt', dest: '' },
      ],
    }),
  ].filter(Boolean),
  // Ensure static files are served correctly
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react-router", "react-router-dom"],
  },
  build: {
    sourcemap: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      // manualChunks only applies to the browser build; the prerender server build skips it
      output: isSsrBuild ? {} : {
        manualChunks: {
          // Vendor chunk - React core libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Vendor chunk - React Query and Supabase
          'vendor-data': ['@tanstack/react-query', '@supabase/supabase-js'],
          // UI components chunk - Radix UI primitives
          'ui-components': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          // Form handling chunk
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Icons and utilities
          'vendor-utils': ['lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    }
  },
  ssr: {
    noExternal: ['react-helmet-async'],
    target: 'node'
  }
}));
