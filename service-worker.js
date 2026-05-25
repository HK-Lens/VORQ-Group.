const CACHE_NAME = 'vorq-digital-v2';

const CORE_ASSETS = [
  './',
  './index.html',
  './projects.html',
  './impressum.html',
  './legal.html',
  './privacy.html',
  './terms.html',
  './cookie-policy.html',
  './notice-action.html',
  './404.html',
  './assets/styles.css',
  './assets/script.js',
  './pwa-register.js',
  './vorq-digital-logo.svg',
  './favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        CORE_ASSETS.map(asset => cache.add(asset).catch(() => null))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() =>
          caches.match(request)
            .then(cached => cached || caches.match('./404.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
