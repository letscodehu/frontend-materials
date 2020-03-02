self.addEventListener('fetch', event => {

    if (event.request.method != 'GET' || event.request.url.endsWith('.js')) return;

    event.respondWith(async function() {
        const cache = await caches.open('letscode');
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            console.log("Cache hit for " + event.request.url);
            return cachedResponse;
        } else {
            console.log("Cache miss for " + event.request.url);
            event.waitUntil(cache.add(event.request));
        }
        return fetch(event.request);
    }());

});

self.addEventListener('message', event => {
    if (event.data === 'clear') {
        caches.delete('letscode')
        .then(() => self.clients.matchAll().then(all => all.forEach(client => client.postMessage('deleted'))));
    }
});