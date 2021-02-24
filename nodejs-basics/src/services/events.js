const pool = require("./db")

function list() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM events", (err, result) => {
            if (err) reject(err);
            else resolve(result)
        })
    })
}

module.exports = {
    list
}
