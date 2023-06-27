const cacheName = "my-cache";
const filesToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "./calculator-512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // Cache the fetched response if it's a successful response
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          caches.open(cacheName).then(function (cache) {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(function () {
        // If the fetch fails, try to retrieve the response from the cache
        return caches.match(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            return name !== cacheName;
          })
          .map(function (name) {
            return caches.delete(name);
          })
      );
    })
  );
});
