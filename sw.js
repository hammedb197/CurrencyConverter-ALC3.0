self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then(cache => {
                cache.addAll([
                    './',
                    './index.html',
                    './style.css',
                    './index.js',
                    'https://free.currencyconverterapi.com/api/v5/currencies'
                ])
        })
    );
});

self.addEventListener('activate', () => {
    
      // delete any caches that aren't in currencyCacheName
  // which will get rid of surrency-static-v2
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key != currencyCacheName) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V3 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
