const events = require("../services/events")

function createEvent(req, res) {
    let rawEvent = "";
    req.on('data', chunk => {
        rawEvent += chunk;
    });
    req.on('end', () => {
        valid(rawEvent)
            .then(value => events.create(value))
            .then(value => {
            res.statusCode = 200
            res.end(JSON.stringify(value))
        }).catch(err => {
            console.log(err)
            res.statusCode = 400
            res.end("Invalid request")
        })
    })
}
function valid(rawEvent) {
    return new Promise((resolve, reject) => {
        try {
            let eventCreateRequest = JSON.parse(rawEvent);
            if (eventCreateRequest.constructor === Object) {
                resolve(eventCreateRequest)
            } else {
                reject("Missing content field")
            }
        } catch (err) {
            reject(err.message);
        }
    })
}
module.exports = createEvent;
