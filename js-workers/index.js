let w;

function start() {
    if (typeof(Worker) !== 'undefined') {
        if (typeof(w) == 'undefined') {
            w = new Worker("worker.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        }
    } else {
        document.getElementById("result").innerHTML = "Sorry, no web worker support!";
    }
}

function stop() {
    w.terminate();
    w = undefined;
}


function calculate() {
    if (typeof(w) == 'undefined') {
        document.getElementById("result").innerHTML = "Sorry, web worker is not running.";    
    } else {
        w.postMessage(parseInt(document.getElementById("number").value));
    }
}