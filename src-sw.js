importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.precacheAndRoute([]);
// workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
workbox.googleAnalytics.initialize();
workbox.routing.registerRoute(/https:\/\/fonts\.googleapis\.com/, workbox.strategies.cacheFirst({cacheName: 'google-font'}), 'GET')