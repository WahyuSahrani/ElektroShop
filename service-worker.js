(function() {
  'use strict';

  var CACHE_NAME = 'static-cache';
  var urlsToCache = [
    '.',
    'index.html',
    'detail1.html',
    'detail2.html',
    'detail3.html',
    'detail4.html',
    'bootstrap-3.3.4-dist/css/bootstrap.css',
    'bootstrap-3.3.4-dist/css/custom.css',
    'bootstrap-3.3.4-dist/js/bootstrap.js',
    'bootstrap-3.3.4-dist/js/bootstrap.min.js',
    'bootstrap-3.3.4-dist/js/custom.js',
    'bootstrap-3.3.4-dist/js/jquery-1.11.3.min.js',
    'bootstrap-3.3.4-dist/js/npm.js'
  ];

  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        return response || fetchAndCache(event.request);
      })
    );
  });

  function fetchAndCache(url) {
    return fetch(url)
    .then(function(response) {
      // Check if we received a valid response
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.put(url, response.clone());
        return response;
      });
    })
    .catch(function(error) {
      console.log('Request failed:', error);
      // You could return a custom offline 404 page here
    });
  }

})();
