const http = require('http');

const config = require('./config/app.js');
const router = require('./services/router.js')
const CreateEvent = require("./api/CreateEvent.js")
const Home = require("./api/Home.js")
const ListEvent = require("./api/ListEvent.js")

router.get("/", Home)
router.get("/event", ListEvent)
router.post("/event", CreateEvent)
router.assets("/public", __dirname + "/assets")

const server = http.createServer(router.handle);

server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
