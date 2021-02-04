const fs = require("fs").promises;
const handlers = {
    "GET": {},
    "POST": {},
    "PUT": {},
    "DELETE": {},
    "assets": {}
}

function assets(path, dir) {
    handlers.assets[path] = dir;
}
function get(path, handler) {
    handlers.GET[path] = handler;
}

function post(path, handler) {
    handlers.POST[path] = handler;
}
function put(path, handler) {
    handlers.PUT[path] = handler;
}
function del(path, handler) {
    handlers.DELETE[path] = handler;
}

function handle(req, res) {
    for (path in handlers[req.method]) {
        if (req.url === path) {
            return handlers[req.method][path](req, res)
        }
    }
    for (path in handlers.assets) {
        if (req.url.startsWith(path)) {
            return handleFile(req.url.slice(path.length), res, handlers.assets[path]);
        }
    }
    notFound(req, res)
}

function handleFile(url, res, dir) {
    fs.readFile(dir + url).then(data => {
        res.writeHead(200);
        res.end(data);
    }).catch(err => {
        res.writeHead(404);
        console.log(err);
        res.end("Not found!")
    })
}


function notFound(req, res) {
    res.statusCode = 404;
    res.end("The page does not exists.")
}


module.exports = {
    get, post, put, del, handle, assets
}
