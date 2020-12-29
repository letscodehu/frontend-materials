const handlers = {
    "GET": {},
    "POST": {},
    "PUT": {},
    "DELETE": {}
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
    notFound(req, res)
}


function notFound(req, res) {
    res.statusCode = 404;
    res.end("The page does not exists.")
}


module.exports = {
    get, post, put, del, handle
}
