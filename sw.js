/* Service Worker dla Neurologia V Hub */
const CACHE_NAME = 'neurologia-hub-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/hub.css',
  './css/clinical.css',
  './share.jpg',
  './fonts/cabinet-grotesk-700.woff2',
  './fonts/cabinet-grotesk-800.woff2',
  './fonts/satoshi-400.woff2',
  './fonts/satoshi-500.woff2',
  './fonts/satoshi-700.woff2',
  './atlasy/atlas-base.css',
  './atlasy/atlas-mobile.css',
  './atlasy/atlas-hub-sync.js',
  './atlasy/atlas-shared.js',
  './js/meta.js',
  './js/clinical-data.js',
  './js/articles-data.js',
  './js/questions.js',
  './js/questions_zaklad.js',
  './js/logic.js',
  './js/clinical-calc.js',
  './js/clinical-patient.js',
  './js/clinical-osce.js',
  './js/clinical-diagnostics.js',
  './js/app.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',

  // Moduł 1, 3: Stany nagłe i zaburzenia świadomości
  './atlasy/modul-1-3-stany-nagle/index.html',
  './atlasy/modul-1-3-stany-nagle/style.css',
  './atlasy/modul-1-3-stany-nagle/data.js',
  './atlasy/modul-1-3-stany-nagle/app.js',

  // Moduł 2: Choroby naczyniowe i udar mózgu
  './atlasy/modul-2-udar-naczyniowe/index.html',
  './atlasy/modul-2-udar-naczyniowe/style.css',
  './atlasy/modul-2-udar-naczyniowe/data.js',
  './atlasy/modul-2-udar-naczyniowe/app.js',

  // Moduł 4: Padaczka i stany drgawkowe
  './atlasy/modul-4-padaczka/index.html',
  './atlasy/modul-4-padaczka/style.css',
  './atlasy/modul-4-padaczka/data.js',
  './atlasy/modul-4-padaczka/app.js',

  // Moduł 5, 6: Badanie neurologiczne, nerwy czaszkowe i mowa
  './atlasy/modul-5-6-badanie-nerwy/index.html',
  './atlasy/modul-5-6-badanie-nerwy/style.css',
  './atlasy/modul-5-6-badanie-nerwy/data.js',
  './atlasy/modul-5-6-badanie-nerwy/app.js',

  // Moduł 7, 8: Bóle głowy, neuralgia V, bóle barku i krzyża
  './atlasy/modul-7-8-bole-glowy-kregoslup/index.html',
  './atlasy/modul-7-8-bole-glowy-kregoslup/style.css',
  './atlasy/modul-7-8-bole-glowy-kregoslup/data.js',
  './atlasy/modul-7-8-bole-glowy-kregoslup/app.js',

  // Moduł 9: Choroby autoimmunologiczne OUN (SM, NMOSD)
  './atlasy/modul-9-autoimmunologia/index.html',
  './atlasy/modul-9-autoimmunologia/style.css',
  './atlasy/modul-9-autoimmunologia/data.js',
  './atlasy/modul-9-autoimmunologia/app.js',

  // Moduł 10, 11: Obwodowy układ nerwowy i złącze nerwowo-mięśniowe
  './atlasy/modul-10-11-obwodowy-miesnie/index.html',
  './atlasy/modul-10-11-obwodowy-miesnie/style.css',
  './atlasy/modul-10-11-obwodowy-miesnie/data.js',
  './atlasy/modul-10-11-obwodowy-miesnie/app.js',

  // Moduł 13: Guzy ośrodkowego układu nerwowego
  './atlasy/modul-13-guzy-oun/index.html',
  './atlasy/modul-13-guzy-oun/style.css',
  './atlasy/modul-13-guzy-oun/data.js',
  './atlasy/modul-13-guzy-oun/app.js',

  // Moduł 14, 15: Choroby zwyrodnieniowe OUN i zespoły otępienne
  './atlasy/modul-14-15-zwyrodnienia-otepienia/index.html',
  './atlasy/modul-14-15-zwyrodnienia-otepienia/style.css',
  './atlasy/modul-14-15-zwyrodnienia-otepienia/data.js',
  './atlasy/modul-14-15-zwyrodnienia-otepienia/app.js',

  // Moduł 12, 16: Diagnostyka dodatkowa i zespoły w chorobach wewnętrznych
  './atlasy/modul-12-16-diagnostyka-interna/index.html',
  './atlasy/modul-12-16-diagnostyka-interna/style.css',
  './atlasy/modul-12-16-diagnostyka-interna/data.js',
  './atlasy/modul-12-16-diagnostyka-interna/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname.includes('fontshare.com') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com');

  if (isSameOrigin || isFont) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('./index.html').then(r => r || Response.error());
          }
          return Response.error();
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
