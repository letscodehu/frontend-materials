const events = require("../services/events")
function listEvent(req, res) {
    events.list()
    .then(result => res.end(JSON.stringify(result)))
    .catch(err => res.end(err))
}
module.exports = listEvent;
