const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3308,
    user: "root",
    password: "pass",
    database: "events"
})

module.exports = pool
