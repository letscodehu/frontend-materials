const events = require("../services/events")
const errHandler = require("./ErrorResolver")
const toJson = require("../services/toJson")
function listEvent(req, res) {
    events.list()
    .then(toJson(res))
    .catch(errHandler(res))
}
module.exports = listEvent;
