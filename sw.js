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
    
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
