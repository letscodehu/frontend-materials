onmessage = function(e) {
    let fib = fibonacci(e.data);
    postMessage(fib);
}

function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num -1) + fibonacci(num -2);
}