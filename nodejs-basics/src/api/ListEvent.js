const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "pass",
    database: "events"
})
connection.connect((error) => {
    if (error) {
        console.error("error connecting:" + error.stack)
        return
    }
    console.log("connected!")
})
function listEvent(req, res) {
    connection.query("SELECT * FROM events", (error, results, fields) => {
        if (error) res.end("error!");
        res.end(JSON.stringify(results))
    })
}
module.exports = listEvent;
