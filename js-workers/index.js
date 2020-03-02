if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log("Success with scope: " + registration.scope);

            document.getElementById('clear').addEventListener('click', event => {
                navigator.serviceWorker.controller.postMessage('clear');
            });

            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data === 'deleted') {
                    document.getElementById('message').textContent = 'Cache purged';
                }
            })

        }, function(err) {
            console.log("Error: " + err);
        })
    });

    fetch('/something.json')
    .then(response => response.json())
    .then(r => console.log(r));
}