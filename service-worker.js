/* QR SafeShare Service Worker */
const VERSION = 'qrs-v1.0.0';
const RUNTIME_CACHE = 'runtime-' + VERSION;
const APP_SHELL = [
    "./apple-touch-icon.png",
    "./combine.html",
    "./disclaimer.html",
    "./favicon.ico",
    "./help.html",
    "./images/combine.png",
    "./images/shamir.png",
    "./images/split.png",
    "./index.html",
    "./lib/bip39-english.js",
    "./lib/html5-qrcode.min.js",
    "./lib/jsqr.min.js",
    "./lib/jszip.min.js",
    "./lib/qrcode.min.js",
    "./lib/qrcode3mf.js",
    "./lib/secrets.min.js",
    "./lib/tailwind.min.css",
    "./logo.svg",
    "./pwa-register.js",
    "./qr-safeshare-192.png",
    "./qr-safeshare-512.png",
    "./split.html",
    "./whatsapp.svg"
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
