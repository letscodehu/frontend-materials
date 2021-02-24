const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3308,
    user: "root",
    password: "pass",
    database: "events"
})

// pool.query("INSERT INTO events (id, content, time) VALUES (?,?,?)", ["some-id", JSON.stringify({some: "value"}), new Date], (err, results) => {
//     if (err) throw err;
//     console.log(results)
// })
module.exports = pool
