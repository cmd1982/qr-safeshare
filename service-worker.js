/* QR SafeShare Service Worker */
const VERSION = 'qrs-v1.0.0';
const RUNTIME_CACHE = 'runtime-' + VERSION;
const APP_SHELL = [
  './',
  './index.html',
  './index-en.html',
  './split.html',
  './split-en.html',
  './combine.html',
  './combine-en.html',
  './uitleg.html',
  './uitleg-en.html',
  './disclaimer.html',
  './disclaimer-en.html',
  './lib/tailwind.min.css',
  './lib/secrets.min.js',
  './lib/qrcode.min.js',
  './lib/html5-qrcode.min.js',
  './lib/jsqr.min.js',
  './logo.svg',
  './favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(RUNTIME_CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => {
      if (key !== RUNTIME_CACHE) return caches.delete(key);
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // HTML: network first (to get latest), fallback to cache
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Others: cache first, then network
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(RUNTIME_CACHE).then(cache => cache.put(req, copy));
      return resp;
    }))
  );
});
