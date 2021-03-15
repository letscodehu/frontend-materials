const http = require('http');
const Router = require('router')
const finalHandler = require('finalhandler')
const serve = require('serve-handler')

let router = Router()
const config = require('./config/app.js');
const CreateEvent = require("./api/CreateEvent.js")
const ListEvent = require("./api/ListEvent.js")
const RecentEvents = require("./api/RecentEvents")

const serveOptions = {
    "public": __dirname + "/assets",
    "rewrites": [{
        "source": "/", "destination": "home.html"
    }],
    "directoryListing": false
}


router.get("/", (req, res) => {
    serve(req, res, serveOptions)
})
router.get("/event", ListEvent)
router.get("/recent", RecentEvents)
router.post("/event", CreateEvent)
router.use("/public", (req, res) => {
    return serve(req, res, serveOptions)
})

const server = http.createServer((req, res) => {
    router(req, res, finalHandler(req, res))
});

server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
