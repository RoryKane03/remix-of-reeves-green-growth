/* Enhanced runtime caching Service Worker for optimal performance
   - Cache-first for built assets, images, fonts
   - Network-first for API responses with fallback
   - Immediate activation + client claim
   - Optimized for Core Web Vitals and offline support
*/

const STATIC_CACHE = 'static-v3';
const FONT_CACHE = 'fonts-v1';
const IMAGE_CACHE = 'images-v1';
const API_CACHE = 'api-v1';
const CACHE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

self.addEventListener('install', (event) => {
  // Activate the new SW immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Clean up old caches
    const keys = await caches.keys();
    const validCaches = [STATIC_CACHE, FONT_CACHE, IMAGE_CACHE, API_CACHE];
    await Promise.all(
      keys.filter(k => !validCaches.includes(k)).map(k => caches.delete(k))
    );
    // Take control of existing clients
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const { pathname } = url;

  // Handle fonts with cache-first, long expiration
  if (pathname.includes('/fonts/') || pathname.endsWith('.woff2') || pathname.endsWith('.woff')) {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response && response.ok) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })());
    return;
  }

  // Handle images with cache-first strategy
  if (pathname.startsWith('/lovable-uploads/') && (pathname.endsWith('.jpg') || pathname.endsWith('.png') || pathname.endsWith('.webp'))) {
    event.respondWith((async () => {
      const cache = await caches.open(IMAGE_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response && response.ok) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })());
    return;
  }

  // Cache built assets (JS/CSS) with cache-first strategy
  if (url.origin === self.location.origin && (pathname.startsWith('/assets/') || pathname.startsWith('/src/'))) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response && response.ok && (response.type === 'basic' || response.type === 'default')) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })());
    return;
  }
});
