const pool = require("./db")
const Event = require('../models/Event')
const {nanoid} = require("nanoid")
const moment = require("moment")

function list() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM events", (err, result) => {
            if (err) reject(err);
            else resolve(mapResults(result))
        })
    })
}

function recentCount() {
    return new Promise((resolve, reject) => {
        const from = moment().subtract(60, 'minutes').toDate()
        pool.query("SELECT date_format(time, '%Y-%m-%d %H:%i') as minutes, count(id) as events FROM events WHERE time > ? GROUP BY minutes ORDER BY minutes DESC", [from],  (err, result) => {
            if (err) reject(err);
            else resolve(result)
        })
    })
}


function mapResults(result) {
    return result.map(r => new Event(r.id, JSON.parse(r.content), r.time));
}
function create(content) {
    const id = nanoid(15)
    const time = new Date;
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO events (id, content, time) VALUES (?, ?, ?)", [id, JSON.stringify(content), time], (err, result) => {
            if (err) reject(err)
            else resolve(new Event(id, content, time))
        })
    })
}

module.exports = {
    list, create, recentCount
}
